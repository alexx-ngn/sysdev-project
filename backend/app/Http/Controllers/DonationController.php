<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\User;
use App\Events\NewDonationEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::with('user')->orderBy('DonationDate', 'desc')->get();
        return response()->json($donations);
    }

    public function create()
    {
        return view('donations.create');
    }

    public function store(Request $request)
    {
        Log::info('Received donation request:', $request->all());

        $validator = Validator::make($request->all(), [
            'UserID' => 'required|exists:users,UserID',
            'Amount' => 'required|numeric|min:0.01|max:25000',
            'DonationDate' => 'required|date',
            'ConfirmationID' => 'required|string'
        ]);

        if ($validator->fails()) {
            Log::warning('Donation validation failed:', ['errors' => $validator->errors()->toArray()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $donation = Donation::create([
                'UserID' => $request->UserID,
                'Amount' => $request->Amount,
                'DonationDate' => $request->DonationDate,
                'ConfirmationID' => $request->ConfirmationID
            ]);

            Log::info('Donation created successfully:', ['donation_id' => $donation->DonationID]);

            // Load the user relationship
            $donation->load('user');

            // Try to broadcast the event, but don't let it fail the donation
            try {
                event(new NewDonationEvent($donation));
            } catch (\Exception $e) {
                Log::warning('Failed to broadcast donation event:', [
                    'error' => $e->getMessage(),
                    'donation_id' => $donation->DonationID
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Donation created successfully',
                'data' => $donation
            ], 201);

        } catch (\Exception $e) {
            Log::error('Failed to create donation:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create donation: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $donation = Donation::with('user')->findOrFail($id);
        return response()->json($donation);
    }

    public function update(Request $request, $id)
    {
        try {
            $donation = Donation::findOrFail($id);
            $user = User::where('Email', $request->Email)->first();

            if (!$user) {
                $user = User::create([
                    'FirstName' => $request->FirstName,
                    'LastName' => $request->LastName,
                    'Email' => $request->Email
                ]);
            } else {
                $user->update([
                    'FirstName' => $request->FirstName,
                    'LastName' => $request->LastName
                ]);
            }

            $donation->update([
                'UserID' => $user->UserID,
                'Amount' => $request->Amount,
                'DonationDate' => $request->DonationDate,
                'ConfirmationID' => $request->ConfirmationID
            ]);

            // Reload the donation with user relationship
            $donation->load('user');

            return response()->json([
                'status' => 'success',
                'message' => 'Donation updated successfully',
                'data' => $donation
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update donation:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update donation: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $donation = Donation::findOrFail($id);
            $donation->delete();
            return response()->json(['message' => 'Donation deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete donation'], 500);
        }
    }
}
