<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DonationController;
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

// Registration routes
Route::post('registrations', [RegistrationController::class, 'store']);
Route::get('registrations', [RegistrationController::class, 'index']);
Route::get('registrations/{id}', [RegistrationController::class, 'show']);

// Other routes
Route::resource('donations', DonationController::class);
