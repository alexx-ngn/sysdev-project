<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use App\Notifications\AdminResetPasswordNotification;

class AdminAuthController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $admin = Admin::where('Email', $request->email)->first();

        if (!$admin) {
            // Return same response even if admin not found to prevent email enumeration
            return response()->json([
                'message' => 'We will send a reset link if this email exists in our system.'
            ], 200);
        }

        // Delete any existing tokens for this email
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        // Generate a secure random token
        $token = Str::random(64);

        // Store the token
        DB::table('password_reset_tokens')->insert(
            [
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]
        );

        // Send the notification
        $admin->notify(new AdminResetPasswordNotification($token));

        return response()->json([
            'message' => 'We will send a reset link if this email exists in our system.'
        ], 200);
    }

    public function verifyResetToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string'
        ]);

        $resetToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetToken) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid or expired reset token'
            ], 400);
        }

        // Check if token is expired (1 hour)
        if (Carbon::parse($resetToken->created_at)->addHour()->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json([
                'valid' => false,
                'message' => 'Password reset token has expired'
            ], 400);
        }

        return response()->json([
            'valid' => true,
            'message' => 'Token is valid'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => [
                'required',
                'string',
                'min:12',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
                'confirmed'
            ],
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'password.min' => 'Password must be at least 12 characters long.'
        ]);

        $resetToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetToken) {
            return response()->json([
                'message' => 'Invalid or expired reset token'
            ], 400);
        }

        // Check if token is expired (1 hour)
        if (Carbon::parse($resetToken->created_at)->addHour()->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json([
                'message' => 'Password reset token has expired'
            ], 400);
        }

        $admin = Admin::where('Email', $request->email)->first();
        
        // Update password
        $admin->Password = Hash::make($request->password, [
            'rounds' => 12
        ]);
        
        // Generate new 2FA secret
        $secret = $admin->generate2FASecret();
        $qrCodeUrl = $admin->get2FAQRCode();
        
        $admin->save();

        // Delete the token
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Password has been reset successfully. Please set up your 2FA again.',
            'requires_2fa_setup' => true,
            'qr_code_url' => $qrCodeUrl,
            'secret' => $secret
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('Email', $request->email)->first();

        // Add delay to prevent timing attacks
        if (!$admin || !Hash::check($request->password, $admin->Password)) {
            sleep(random_int(1, 3));
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Check if password needs rehash (in case hash settings changed)
        if (Hash::needsRehash($admin->Password)) {
            $admin->Password = Hash::make($request->password);
            $admin->save();
        }

        // Check if 2FA is enabled
        $requires2FA = !empty($admin->{'2FASecret'});

        if ($requires2FA) {
            // Store temporary login state for 2FA with short expiration
            $tempToken = $admin->createToken('temp_2fa', ['2fa.pending'], now()->addMinutes(5));
            
            return response()->json([
                'message' => '2FA verification required',
                'requires_2fa' => true,
                'temp_token' => $tempToken->plainTextToken,
                'admin' => [
                    'email' => $admin->Email,
                ]
            ]);
        }

        // If 2FA is not required, generate full access token with expiration
        $token = $admin->createToken('admin_token', [], now()->addDays(1))->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'requires_2fa' => false,
            'token' => $token,
            'admin' => [
                'id' => $admin->AdminID,
                'email' => $admin->Email,
                'name' => $admin->FirstName . ' ' . $admin->LastName,
            ],
        ]);
    }

    public function verifyLogin2FA(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        $admin = Admin::where('Email', $request->email)->first();

        if (!$admin) {
            sleep(random_int(1, 3)); // Add delay to prevent timing attacks
            return response()->json([
                'message' => 'Invalid email'
            ], 404);
        }

        if ($admin->verify2FACode($request->code)) {
            // Delete temporary token
            if ($request->bearerToken()) {
                $admin->tokens()->where('token', hash('sha256', $request->bearerToken()))->delete();
            }

            // Create new token with full access and expiration
            $token = $admin->createToken('admin_token', [], now()->addDays(1))->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'admin' => [
                    'id' => $admin->AdminID,
                    'email' => $admin->Email,
                    'name' => $admin->FirstName . ' ' . $admin->LastName
                ]
            ]);
        }

        return response()->json([
            'message' => 'Invalid verification code'
        ], 400);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        if ($request->bearerToken()) {
            $request->user()->currentAccessToken()->delete();
        }
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function checkAdmins()
    {
        try {
            $adminCount = Admin::count();
            return response()->json([
                'has_admins' => $adminCount > 0,
                'count' => $adminCount
            ]);
        } catch (\Exception $e) {
            Log::error('Error checking admin count: ' . $e->getMessage());
            return response()->json([
                'has_admins' => false,
                'error' => 'Failed to check admin status'
            ], 500);
        }
    }

    public function registerFirstAdmin(Request $request)
    {
        $adminCount = Admin::count();
        if ($adminCount > 0) {
            return response()->json([
                'message' => 'Admin registration is closed'
            ], 403);
        }

        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,Email',
            'password' => [
                'required',
                'string',
                'min:12',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
                'confirmed'
            ],
            'phoneNumber' => 'required|string|max:20'
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'password.min' => 'Password must be at least 12 characters long.'
        ]);

        // Hash the password with a strong cost factor
        $hashedPassword = Hash::make($request->password, [
            'rounds' => 12
        ]);

        $admin = Admin::create([
            'FirstName' => $request->firstName,
            'LastName' => $request->lastName,
            'Email' => $request->email,
            'Password' => $hashedPassword,
            'PhoneNumber' => $request->phoneNumber,
            'LastPasswordChange' => now()
        ]);

        // Generate 2FA secret and QR code
        $secret = $admin->generate2FASecret();
        $qrCodeUrl = $admin->get2FAQRCode();

        return response()->json([
            'message' => 'Admin registered successfully',
            'admin' => [
                'id' => $admin->AdminID,
                'email' => $admin->Email,
                'name' => $admin->FirstName . ' ' . $admin->LastName,
            ],
            'qr_code_url' => $qrCodeUrl,
            'secret' => $secret
        ]);
    }

    public function verify2FA(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        $admin = Admin::where('Email', $request->email)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Invalid email'
            ], 404);
        }

        if ($admin->verify2FACode($request->code)) {
            return response()->json([
                'message' => '2FA setup complete',
                'admin' => [
                    'id' => $admin->AdminID,
                    'email' => $admin->Email,
                    'name' => $admin->FirstName . ' ' . $admin->LastName
                ]
            ]);
        }

        return response()->json([
            'message' => 'Invalid verification code'
        ], 400);
    }

    public function listAdmins(Request $request)
    {
        $admins = Admin::select('AdminID', 'FirstName', 'LastName', 'Email', 'PhoneNumber', '2FASecret', 'updated_at')->get();
        return response()->json(['admins' => $admins]);
    }

    public function updateAdmin(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $validated = $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:admins,Email,' . $admin->AdminID . ',AdminID',
            'PhoneNumber' => 'required|string|max:20',
        ]);
        $admin->update($validated);
        return response()->json(['message' => 'Admin updated successfully', 'admin' => $admin]);
    }

    public function deleteAdmin(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        // Prevent deleting the currently authenticated admin
        if ($request->user()->AdminID == $admin->AdminID) {
            return response()->json(['error' => 'You cannot delete your own admin account.'], 403);
        }
        $admin->delete();
        return response()->json(['message' => 'Admin deleted successfully']);
    }

    public function createAdmin(Request $request)
    {
        $validated = $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:admins,Email',
            'PhoneNumber' => 'required|string|max:20',
            'Password' => 'required|string|min:12|confirmed',
        ]);

        $hashedPassword = Hash::make($validated['Password'], ['rounds' => 12]);
        $admin = Admin::create([
            'FirstName' => $validated['FirstName'],
            'LastName' => $validated['LastName'],
            'Email' => $validated['Email'],
            'PhoneNumber' => $validated['PhoneNumber'],
            'Password' => $hashedPassword,
        ]);

        // Generate 2FA secret and QR code
        $secret = $admin->generate2FASecret();
        $qrCodeUrl = $admin->get2FAQRCode();

        return response()->json([
            'message' => 'Admin created successfully',
            'admin' => $admin,
            'qr_code_url' => $qrCodeUrl,
            'secret' => $secret
        ], 201);
    }

    public function verify2FAForAdmin(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $request->validate([
            'code' => 'required|string|size:6',
        ]);
        if ($admin->verify2FACode($request->code)) {
            return response()->json([
                'message' => '2FA setup complete',
                'admin' => [
                    'id' => $admin->AdminID,
                    'email' => $admin->Email,
                    'name' => $admin->FirstName . ' ' . $admin->LastName
                ]
            ]);
        }
        return response()->json([
            'message' => 'Invalid verification code'
        ], 400);
    }

    public function resetPasswordForAdmin(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        if ($request->user()->AdminID == $admin->AdminID) {
            return response()->json(['error' => 'You cannot reset your own password from here.'], 403);
        }
        $newPassword = Str::random(16);
        $admin->Password = Hash::make($newPassword, ['rounds' => 12]);
        $admin->save();
        // Optionally, you could email the new password to the admin here
        return response()->json(['message' => 'Password reset successfully', 'new_password' => $newPassword]);
    }

    public function reset2FAForAdmin(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        if ($request->user()->AdminID == $admin->AdminID) {
            return response()->json(['error' => 'You cannot reset your own 2FA from here.'], 403);
        }
        // Generate new 2FA secret and QR code
        $secret = $admin->generate2FASecret();
        $qrCodeUrl = $admin->get2FAQRCode();
        $admin->save();

        return response()->json([
            'message' => '2FA reset successfully. Please set up new 2FA.',
            'qr_code_url' => $qrCodeUrl,
            'secret' => $secret
        ]);
    }
} 