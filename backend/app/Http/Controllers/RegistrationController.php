<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::with(['participant', 'user'])->get();
        return response()->json($registrations);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:participants,Email',
            'PhoneNumber' => [
                'required',
                'string',
                'regex:/^(\+1)?\d{10}$/',
                'unique:participants,PhoneNumber'
            ],
            'RegistrationStatus' => 'required|in:pending,confirmed,cancelled'
        ], [
            'PhoneNumber.regex' => 'Please enter a valid 10-digit phone number (e.g., 1234567890 or +11234567890)',
            'PhoneNumber.unique' => 'This phone number is already registered'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Create participant
            $participant = Participant::create([
                'FirstName' => $request->FirstName,
                'LastName' => $request->LastName,
                'Email' => $request->Email,
                'PhoneNumber' => $request->PhoneNumber,
            ]);

            // Generate confirmation token
            $confirmationToken = Str::random(32);

            // Create registration
            $registration = Registration::create([
                'ParticipantID' => $participant->ParticipantID,
                'RegistrationDate' => now(),
                'RegistrationStatus' => 'pending', // Always start as pending
                'confirmation_token' => $confirmationToken,
            ]);

            // Send confirmation email
            $confirmationUrl = env('FRONTEND_URL', 'http://localhost:3000') . "/registration/confirm/{$confirmationToken}";
            Mail::send('emails.registration-confirmation', [
                'participant' => $participant,
                'confirmationUrl' => $confirmationUrl
            ], function ($message) use ($participant) {
                $message->to($participant->Email)
                       ->subject('Confirm Your Registration');
            });

            DB::commit();

            // Load the participant relationship
            $registration->load('participant');

            return response()->json($registration, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Registration creation failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create registration'], 500);
        }
    }

    public function confirm($token)
    {
        try {
            $registration = Registration::where('confirmation_token', $token)->firstOrFail();
            
            if ($registration->confirmed_at) {
                return response()->json(['message' => 'Registration already confirmed'], 200);
            }

            $registration->update([
                'RegistrationStatus' => 'confirmed',
                'confirmed_at' => now()
            ]);

            return response()->json(['message' => 'Registration confirmed successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid confirmation token'], 404);
        }
    }

    public function show($id)
    {
        $registration = Registration::with(['participant', 'user'])->findOrFail($id);
        return response()->json($registration);
    }

    public function update(Request $request, $id)
    {
        $registration = Registration::findOrFail($id);
        $participant = $registration->participant;

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:participants,Email,' . $participant->ParticipantID . ',ParticipantID',
            'PhoneNumber' => [
                'required',
                'string',
                'regex:/^(\+1)?\d{10}$/',
                'unique:participants,PhoneNumber,' . $participant->ParticipantID . ',ParticipantID'
            ],
            'RegistrationStatus' => 'required|in:pending,confirmed,cancelled'
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

            // Update participant
            $participant->update([
                'FirstName' => $request->FirstName,
                'LastName' => $request->LastName,
                'Email' => $request->Email,
                'PhoneNumber' => $request->PhoneNumber,
            ]);

            // Update registration
            $registration->update([
                'RegistrationStatus' => $request->RegistrationStatus,
            ]);

            DB::commit();

            // Load the participant relationship
            $registration->load('participant');

            return response()->json($registration);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update registration'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $registration = Registration::findOrFail($id);
            $participant = $registration->participant;

            // Delete registration first (due to foreign key constraint)
            $registration->delete();
            
            // Delete associated participant
            $participant->delete();

            DB::commit();
            return response()->json(['message' => 'Registration deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to delete registration'], 500);
        }
    }
}
