<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->bearerToken() || !$request->user() || !$request->user()->currentAccessToken()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Check if token has 2fa.pending ability (temporary token)
        if ($request->user()->currentAccessToken()->can('2fa.pending')) {
            return response()->json(['message' => '2FA verification required'], 403);
        }

        return $next($request);
    }
} 