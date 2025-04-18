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

class AdminAuthController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $admin = Admin::where('Email', $request->email)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'We will send a reset link if this email exists in our system.'
            ], 200);
        }

        // Generate reset token
        $token = Str::random(64);

        // Store the token
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        // Send reset email
        try {
            // For now, just log the token since email is not set up
            Log::info("Password reset token for {$request->email}: {$token}");

            return response()->json([
                'message' => 'We will send a reset link if this email exists in our system.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unable to send reset email. Please try again later.'
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('Email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->Password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Check if 2FA is enabled
        $requires2FA = !empty($admin->{'2FASecret'});

        if ($requires2FA) {
            // Store temporary login state for 2FA
            $tempToken = $admin->createToken('temp_2fa', ['2fa.pending'])->plainTextToken;
            
            return response()->json([
                'message' => '2FA verification required',
                'requires_2fa' => true,
                'temp_token' => $tempToken,
                'admin' => [
                    'email' => $admin->Email,
                ]
            ]);
        }

        // If 2FA is not required, generate full access token
        $token = $admin->createToken('admin_token')->plainTextToken;

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
            return response()->json([
                'message' => 'Invalid email'
            ], 404);
        }

        if ($admin->verify2FACode($request->code)) {
            // Delete temporary token
            if ($request->bearerToken()) {
                $admin->tokens()->where('token', hash('sha256', $request->bearerToken()))->delete();
            }

            // Create new token with full access
            $token = $admin->createToken('admin_token')->plainTextToken;

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
            'password' => 'required|string|min:8',
            'phoneNumber' => 'required|string|max:20'
        ]);

        $admin = Admin::create([
            'FirstName' => $request->firstName,
            'LastName' => $request->lastName,
            'Email' => $request->email,
            'Password' => Hash::make($request->password),
            'PhoneNumber' => $request->phoneNumber
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
} 