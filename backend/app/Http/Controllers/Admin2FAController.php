<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class Admin2FAController extends Controller
{
    public function showSetupForm()
    {
        $admin = Auth::guard('admin')->user();
        
        if ($admin->is2FAEnabled()) {
            return redirect()->route('admin.dashboard');
        }

        $secret = $admin->generate2FASecret();
        $qrCode = $admin->get2FAQRCode();

        return view('admin.2fa.setup', compact('secret', 'qrCode'));
    }

    public function setup(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $admin = Auth::guard('admin')->user();

        if ($admin->verify2FACode($request->code)) {
            Session::put('2fa_verified', true);
            return redirect()->route('admin.dashboard')
                ->with('success', '2FA has been successfully enabled.');
        }

        return back()->withErrors(['code' => 'Invalid verification code.']);
    }

    public function showVerifyForm()
    {
        return view('admin.2fa.verify');
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $admin = Auth::guard('admin')->user();

        if ($admin->verify2FACode($request->code)) {
            Session::put('2fa_verified', true);
            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors(['code' => 'Invalid verification code.']);
    }

    public function disable()
    {
        $admin = Auth::guard('admin')->user();
        $admin->{'2FASecret'} = null;
        $admin->save();

        Session::forget('2fa_verified');
        
        return redirect()->route('admin.dashboard')
            ->with('success', '2FA has been disabled.');
    }
} 