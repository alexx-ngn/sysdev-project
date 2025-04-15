<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ExampleController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Example route
Route::get('/example', [ExampleController::class, 'index']);

// Task routes
Route::apiResource('tasks', TaskController::class);

// Category routes
Route::apiResource('categories', CategoryController::class);

// Nested routes
Route::get('categories/{category}/tasks', [TaskController::class, 'tasksByCategory']); 