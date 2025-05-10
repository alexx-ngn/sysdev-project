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
        // Ensure /tmp/framework/views exists
        $compiledPath = '/tmp/framework/views';
        if (!file_exists($compiledPath)) {
            mkdir($compiledPath, 0777, true);
        }

        $this->app->bind('path.storage', function () {
            return '/tmp';
        });

        // Laravel uses this binding to find compiled view path
        $this->app->bind('path.storage.framework.views', function () use ($compiledPath) {
            return $compiledPath;
        });
    }
} 