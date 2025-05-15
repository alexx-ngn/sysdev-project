<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run()
    {
        // General settings
        $generalSettings = [
            'organizationName' => 'MilesForHope',
            'eventName' => 'MilesForHope',
            'contactEmail' => 'info@milesforhope.org',
            'contactPhone' => '(555) 123-4567',
            'address' => "456 Community Lane\nHopeville, State 12345",
            'aboutOrganization' => 'MilesForHope is dedicated to empowering communities through sustainable development, education, and healthcare initiatives. Our annual charity run brings together participants of all levels to support vital community projects.',
        ];

        foreach ($generalSettings as $key => $value) {
            Setting::setValue($key, $value, gettype($value), 'general');
        }

        // Social media settings
        $socialSettings = [
            'facebook' => 'https://facebook.com/milesforhope',
            'instagram' => 'https://instagram.com/milesforhope',
            'twitter' => 'https://twitter.com/milesforhope',
        ];

        foreach ($socialSettings as $key => $value) {
            Setting::setValue($key, $value, gettype($value), 'social');
        }

        // Appearance settings
        $appearanceSettings = [
            'primaryColor' => '#A5D8FF',
            'secondaryColor' => '#FFF4CC',
            'logo' => '',
            'favicon' => '',
        ];

        foreach ($appearanceSettings as $key => $value) {
            Setting::setValue($key, $value, gettype($value), 'appearance');
        }

        // Layout settings
        $layoutSettings = [
            'showHeroSection' => true,
            'showFeaturedSections' => true,
            'showRegistrationCTA' => true,
            'showSponsorsHighlight' => true,
        ];

        foreach ($layoutSettings as $key => $value) {
            Setting::setValue($key, $value, gettype($value), 'layout');
        }

        // Notification settings
        $notificationSettings = [
            'sendRegistrationConfirmation' => true,
            'sendDonationReceipt' => true,
            'sendEventReminders' => true,
            'sendAdminNotifications' => true,
            'notificationEmail' => 'admin@milesforhope.org',
        ];

        foreach ($notificationSettings as $key => $value) {
            Setting::setValue($key, $value, gettype($value), 'notifications');
        }
    }
} 