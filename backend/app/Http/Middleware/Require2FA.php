<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Require2FA
{
    public function handle(Request $request, Closure $next)
    {
        $admin = Auth::guard('admin')->user();

        if ($admin && $admin->is2FAEnabled() && !$request->session()->get('2fa_verified')) {
            return redirect()->route('admin.2fa.verify');
        }

        return $next($request);
    }
} 