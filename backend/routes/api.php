<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StripeController;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormSubmission;

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
    Route::post('admin', [AdminAuthController::class, 'createAdmin']);
    Route::match(['put', 'patch'], 'admin/{id}', [AdminAuthController::class, 'updateAdmin']);
    Route::delete('admin/{id}', [AdminAuthController::class, 'deleteAdmin']);
    Route::post('admin/{id}/verify-2fa', [AdminAuthController::class, 'verify2FAForAdmin']);
    Route::post('admin/{id}/reset-password', [AdminAuthController::class, 'resetPasswordForAdmin']);
    Route::post('admin/{id}/reset-2fa', [AdminAuthController::class, 'reset2FAForAdmin']);
    // Add other protected admin routes here
});

// Registration routes
Route::get('registrations/confirm/{token}', [RegistrationController::class, 'confirm']);
Route::apiResource('registrations', RegistrationController::class);

// Other routes
Route::resource('donations', DonationController::class);

// Contact form route
Route::post('contact', [ContactController::class, 'submit']);

// Stripe payment routes
Route::post('/create-checkout-session', [StripeController::class, 'createCheckoutSession']);
Route::post('/stripe/webhook', [StripeController::class, 'handleWebhook']);
Route::get('/verify-payment', [StripeController::class, 'verifyPayment']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('users/find-or-create', [UserController::class, 'findOrCreate']);

// Test email route (remove this in production)
Route::get('/test-email', function () {
    $testData = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'subject' => 'Test Email',
        'message' => 'This is a test email from the API.'
    ];

    Mail::to(config('mail.from.address'))
        ->send(new ContactFormSubmission($testData));

    return response()->json(['message' => 'Test email sent!']);
});
