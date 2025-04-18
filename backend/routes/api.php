<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\AdminAuthController;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Admin Authentication routes
Route::get('admin/check', [AdminAuthController::class, 'checkAdmins']);
Route::post('admin/register', [AdminAuthController::class, 'registerFirstAdmin']);
Route::post('admin/verify-2fa', [AdminAuthController::class, 'verify2FA']);
Route::post('admin/forgot-password', [AdminAuthController::class, 'forgotPassword']);

// Registration routes
Route::get('registrations/confirm/{token}', [RegistrationController::class, 'confirm']);
Route::apiResource('registrations', RegistrationController::class);

// Other routes
Route::resource('donations', DonationController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin Authentication Routes
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/login/verify-2fa', [AdminAuthController::class, 'verifyLogin2FA']);
