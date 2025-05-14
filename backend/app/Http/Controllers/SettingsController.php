<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class SettingsController extends Controller
{
    public function index()
    {
        try {
            $settings = [
                'general' => Setting::getGroup('general'),
                'social' => Setting::getGroup('social'),
                'appearance' => Setting::getGroup('appearance'),
                'layout' => Setting::getGroup('layout'),
                'notifications' => Setting::getGroup('notifications'),
            ];

            return response()->json($settings);
        } catch (\Exception $e) {
            Log::error('Failed to fetch settings: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch settings'], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'settings' => 'required|array',
                'settings.*' => 'required|array',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            foreach ($request->settings as $group => $settings) {
                foreach ($settings as $key => $value) {
                    // Skip null values
                    if ($value === null) {
                        continue;
                    }
                    
                    // Determine the type
                    $type = gettype($value);
                    if ($type === 'double') {
                        $type = 'float';
                    }
                    
                    Setting::setValue($key, $value, $type, $group);
                }
            }

            return response()->json(['message' => 'Settings updated successfully']);
        } catch (\Exception $e) {
            Log::error('Failed to update settings: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update settings: ' . $e->getMessage()], 500);
        }
    }

    public function getGroup($group)
    {
        try {
            $settings = Setting::getGroup($group);
            return response()->json($settings);
        } catch (\Exception $e) {
            Log::error('Failed to fetch settings group: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch settings group'], 500);
        }
    }

    public function getValue($key)
    {
        try {
            $value = Setting::getValue($key);
            return response()->json(['value' => $value]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch setting value: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch setting value'], 500);
        }
    }
} 