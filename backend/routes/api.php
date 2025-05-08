<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\AdminAuthController;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StripeController;

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

// Public admin routes
Route::post('admin/login', [AdminAuthController::class, 'login']);
Route::post('admin/login/verify-2fa', [AdminAuthController::class, 'verifyLogin2FA']);
Route::post('admin/register', [AdminAuthController::class, 'registerFirstAdmin']);
Route::post('admin/verify-2fa', [AdminAuthController::class, 'verify2FA']);
Route::get('admin/check', [AdminAuthController::class, 'checkAdmins']);

// Password Reset Routes
Route::post('admin/forgot-password', [AdminAuthController::class, 'forgotPassword'])->name('password.email');
Route::post('admin/reset-password', [AdminAuthController::class, 'resetPassword'])->name('password.reset');
Route::post('admin/verify-reset-token', [AdminAuthController::class, 'verifyResetToken'])->name('password.verify');

// Protected admin routes
Route::middleware(['auth:sanctum', 'admin.auth'])->group(function () {
    Route::post('admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('admin', [AdminAuthController::class, 'listAdmins']);
    // Add other protected admin routes here
});

// Registration routes
Route::get('registrations/confirm/{token}', [RegistrationController::class, 'confirm']);
Route::apiResource('registrations', RegistrationController::class);

// Other routes
Route::resource('donations', DonationController::class);

Route::post('/create-checkout-session', [StripeController::class, 'createCheckoutSession']);
Route::post('/stripe/webhook', [StripeController::class, 'handleWebhook']);
Route::get('/verify-payment', [StripeController::class, 'verifyPayment']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('users/find-or-create', [UserController::class, 'findOrCreate']);
