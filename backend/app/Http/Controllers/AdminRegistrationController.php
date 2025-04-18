<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use PragmaRX\Google2FA\Google2FA;

class AdminRegistrationController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:admins,Email',
            'PhoneNumber' => [
                'required',
                'string',
                'regex:/^(\+1)?\d{10}$/',
                'unique:admins,PhoneNumber'
            ],
            'Password' => 'required|string|min:8|confirmed',
        ], [
            'PhoneNumber.regex' => 'Please enter a valid 10-digit phone number (e.g., 1234567890 or +11234567890)',
            'PhoneNumber.unique' => 'This phone number is already registered',
            'Email.unique' => 'This email is already registered'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Generate 2FA secret
            $google2fa = new Google2FA();
            $secret = $google2fa->generateSecretKey();

            // Create admin
            $admin = Admin::create([
                'FirstName' => $request->FirstName,
                'LastName' => $request->LastName,
                'Email' => $request->Email,
                'PhoneNumber' => $request->PhoneNumber,
                'Password' => Hash::make($request->Password),
                '2FASecret' => $secret,
            ]);

            // Generate QR code URL
            $qrCodeUrl = $google2fa->getQRCodeUrl(
                config('app.name'),
                $admin->Email,
                $secret
            );

            DB::commit();

            return response()->json([
                'message' => 'Admin registered successfully',
                'admin' => $admin,
                'qr_code_url' => $qrCodeUrl,
                'secret' => $secret
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Admin registration failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create admin account'], 500);
        }
    }

    public function verify2FA(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:admins,Email',
            'code' => 'required|string|size:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('Email', $request->email)->first();
        $google2fa = new Google2FA();

        if ($google2fa->verifyKey($admin->{'2FASecret'}, $request->code)) {
            return response()->json([
                'message' => '2FA verification successful',
                'admin' => $admin
            ]);
        }

        return response()->json([
            'error' => 'Invalid verification code'
        ], 422);
    }
} 