<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::with(['participant', 'user'])->get();
        return response()->json($registrations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:participants,Email',
            'PhoneNumber' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
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

            // Create registration
            $registration = Registration::create([
                'ParticipantID' => $participant->ParticipantID,
                'RegistrationDate' => now(),
                'RegistrationStatus' => 'pending',
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Registration created successfully',
                'data' => [
                    'participant' => $participant,
                    'registration' => $registration
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create registration',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $registration = Registration::with(['participant', 'user'])->findOrFail($id);
        return response()->json($registration);
    }
}
