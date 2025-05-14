<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\SettingsController;

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

// Add this route for user creation/finding
Route::post('users', [UserController::class, 'findOrCreate']);

Route::get('test', function () {
    return [
        'request_uri' => $_SERVER['REQUEST_URI'] ?? null,
        'route' => $_GET['route'] ?? null,
        'API is working!'
    ];
});

Route::get('test-db', function () {
    try {
        $db_config = config('database.connections.mysql');
        $ssl_ca = env('DB_SSL_CA');
        $ssl_ca_path = $db_config['options'][PDO::MYSQL_ATTR_SSL_CA] ?? null;
        
        // Try to get PDO connection
        $pdo = DB::connection()->getPdo();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Database connection successful',
            'database' => DB::connection()->getDatabaseName(),
            'debug_info' => [
                'db_config' => [
                    'host' => $db_config['host'],
                    'port' => $db_config['port'],
                    'database' => $db_config['database'],
                    'username' => $db_config['username'],
                    'ssl_options' => array_map(function($value) {
                        return is_string($value) ? '***' : $value;
                    }, $db_config['options']),
                ],
                'ssl_ca_length' => $ssl_ca ? strlen($ssl_ca) : 0,
                'ssl_ca_path' => $ssl_ca_path,
                'ssl_ca_path_exists' => $ssl_ca_path ? file_exists($ssl_ca_path) : false,
                'ssl_ca_path_readable' => $ssl_ca_path ? is_readable($ssl_ca_path) : false,
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Database connection failed',
            'error' => $e->getMessage(),
            'debug_info' => [
                'db_config' => [
                    'host' => $db_config['host'] ?? null,
                    'port' => $db_config['port'] ?? null,
                    'database' => $db_config['database'] ?? null,
                    'username' => $db_config['username'] ?? null,
                    'ssl_options' => isset($db_config['options']) ? array_map(function($value) {
                        return is_string($value) ? '***' : $value;
                    }, $db_config['options']) : null,
                ],
                'ssl_ca_length' => $ssl_ca ? strlen($ssl_ca) : 0,
                'ssl_ca_path' => $ssl_ca_path ?? null,
                'ssl_ca_path_exists' => $ssl_ca_path ? file_exists($ssl_ca_path) : false,
                'ssl_ca_path_readable' => $ssl_ca_path ? is_readable($ssl_ca_path) : false,
                'trace' => $e->getTraceAsString()
            ]
        ], 500);
    }
});

Route::get('/', function () {
    return response()->json(['status' => 'ok']);
});

// Settings routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::post('/settings', [SettingsController::class, 'update']);
    Route::get('/settings/{group}', [SettingsController::class, 'getGroup']);
    Route::get('/settings/value/{key}', [SettingsController::class, 'getValue']);
});
