<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExampleController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Welcome to Laravel API',
            'status' => 'success'
        ]);
    }
}
