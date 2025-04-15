<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::all();
        return view('donations.index', compact('donations'));
    }

    public function create()
    {
        return view('donations.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|regex:/^[\pL\s]+$/u',
            'amount' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        Donation::create([
            'name' => $request->name,
            'amount' => $request->amount,
        ]);

        return redirect()->route('donations.index')
            ->with('success', 'Donation created successfully.');
    }
}
