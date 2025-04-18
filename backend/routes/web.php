<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\Admin2FAController;
use App\Http\Controllers\AdminRegistrationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Only keep this if you really need to redirect from the API domain
Route::get('/', function () {
    return redirect(env('FRONTEND_URL', 'http://localhost:3000'));
});

// Admin Registration Routes
Route::post('/admin/register', [AdminRegistrationController::class, 'register']);
Route::post('/admin/verify-2fa', [AdminRegistrationController::class, 'verify2FA']);

Route::middleware(['auth:admin'])->group(function () {
    // 2FA Routes
    Route::get('/2fa/setup', [Admin2FAController::class, 'showSetupForm'])->name('admin.2fa.setup');
    Route::post('/2fa/setup', [Admin2FAController::class, 'setup'])->name('admin.2fa.setup.post');
    Route::get('/2fa/verify', [Admin2FAController::class, 'showVerifyForm'])->name('admin.2fa.verify');
    Route::post('/2fa/verify', [Admin2FAController::class, 'verify'])->name('admin.2fa.verify.post');
    Route::post('/2fa/disable', [Admin2FAController::class, 'disable'])->name('admin.2fa.disable');
});
