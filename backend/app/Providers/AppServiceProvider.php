<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\File;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            $tmpViewPath = '/tmp/storage/views';
            $tmpCachePath = '/tmp/storage/cache';
    
            File::makeDirectory($tmpViewPath, 0755, true, true);
            File::makeDirectory($tmpCachePath, 0755, true, true);
    
            View::addLocation($tmpViewPath);
            config([
                'view.compiled' => $tmpCachePath,
            ]);
        }
    }
} 