<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Events\NewDonationEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::orderBy('DonationDate', 'desc')->get();
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
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'Amount' => 'required|numeric|min:0.01',
            'DonationDate' => 'required|date',
            'type' => 'required|string',
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
                'name' => $request->name,
                'email' => $request->email,
                'Amount' => $request->Amount,
                'DonationDate' => $request->DonationDate,
                'type' => $request->type,
                'ConfirmationID' => $request->ConfirmationID
            ]);

            Log::info('Donation created successfully:', ['donation_id' => $donation->DonationID]);

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
        $donation = Donation::findOrFail($id);
        return response()->json($donation);
    }
}
