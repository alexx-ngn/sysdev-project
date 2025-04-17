<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

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
            \Log::info("Password reset token for {$request->email}: {$token}");

            return response()->json([
                'message' => 'We will send a reset link if this email exists in our system.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unable to send reset email. Please try again later.'
            ], 500);
        }
    }
} 