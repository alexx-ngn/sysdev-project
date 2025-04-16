<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'amount' => 'required|numeric|min:0.01',
            'type' => 'required|string',
            'donationDate' => 'required|date'
        ]);

        if ($validator->fails()) {
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
                'Amount' => $request->amount,
                'DonationDate' => $request->donationDate,
                'type' => $request->type,
                'ConfirmationID' => Str::random(10)
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Donation created successfully',
                'data' => $donation
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create donation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $donation = Donation::findOrFail($id);
        return response()->json($donation);
    }
}
