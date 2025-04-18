<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use PragmaRX\Google2FA\Google2FA;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'AdminID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'FirstName',
        'LastName',
        'PhoneNumber',
        'Email',
        'Password',
        '2FASecret'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'Password',
        '2FASecret',
        'remember_token',
    ];

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'AdminID';
    }

    /**
     * Generate a new 2FA secret
     */
    public function generate2FASecret()
    {
        $google2fa = new Google2FA();
        $this->{'2FASecret'} = $google2fa->generateSecretKey();
        $this->save();
        return $this->{'2FASecret'};
    }

    /**
     * Get the QR code for 2FA setup
     */
    public function get2FAQRCode()
    {
        $google2fa = new Google2FA();
        return $google2fa->getQRCodeUrl(
            config('app.name'),
            $this->Email,
            $this->{'2FASecret'}
        );
    }

    /**
     * Verify the 2FA code
     */
    public function verify2FACode($code)
    {
        $google2fa = new Google2FA();
        return $google2fa->verifyKey($this->{'2FASecret'}, $code);
    }

    /**
     * Check if 2FA is enabled for this admin
     */
    public function is2FAEnabled()
    {
        return !empty($this->{'2FASecret'});
    }
} 