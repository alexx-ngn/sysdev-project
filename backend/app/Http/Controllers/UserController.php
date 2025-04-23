<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function findOrCreate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'PhoneNumber' => 'required|string',
            'Email' => 'required|email'
        ]);

        if ($validator->fails()) {
            Log::warning('User validation failed:', ['errors' => $validator->errors()->toArray()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Try to find existing user by email
            $user = User::where('Email', $request->Email)->first();

            if (!$user) {
                // Create new user if not found
                $user = User::create([
                    'FirstName' => $request->FirstName,
                    'LastName' => $request->LastName,
                    'PhoneNumber' => $request->PhoneNumber,
                    'Email' => $request->Email
                ]);
            }

            return response()->json([
                'status' => 'success',
                'UserID' => $user->UserID
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to find or create user:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to find or create user: ' . $e->getMessage()
            ], 500);
        }
    }
} 