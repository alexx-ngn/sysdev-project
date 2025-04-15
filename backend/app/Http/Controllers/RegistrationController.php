<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::all();
        return view('registrations.index', compact('registrations'));
    }

    public function create()
    {
        return view('registrations.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|regex:/^[\pL\s]+$/u',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        Registration::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->route('registrations.index')
            ->with('success', 'Registration created successfully.');
    }
}
