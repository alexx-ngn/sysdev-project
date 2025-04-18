<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Support\Facades\Crypt;

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
     * Get the decrypted 2FA secret
     */
    public function getDecrypted2FASecret()
    {
        return $this->{'2FASecret'} ? Crypt::decryptString($this->{'2FASecret'}) : null;
    }

    /**
     * Set the encrypted 2FA secret
     */
    public function setEncrypted2FASecret($value)
    {
        $this->{'2FASecret'} = $value ? Crypt::encryptString($value) : null;
        return $this;
    }

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
        $secret = $google2fa->generateSecretKey();
        $this->setEncrypted2FASecret($secret);
        $this->save();
        return $secret;
    }

    /**
     * Get the QR code for 2FA setup
     */
    public function get2FAQRCode()
    {
        $google2fa = new Google2FA();
        $secret = $this->getDecrypted2FASecret();
        if (!$secret) {
            return null;
        }
        return $google2fa->getQRCodeUrl(
            'MilesForHope',
            $this->Email,
            $secret
        );
    }

    /**
     * Verify the 2FA code
     */
    public function verify2FACode($code)
    {
        $google2fa = new Google2FA();
        $secret = $this->getDecrypted2FASecret();
        if (!$secret) {
            return false;
        }
        return $google2fa->verifyKey($secret, $code);
    }

    /**
     * Check if 2FA is enabled for this admin
     */
    public function is2FAEnabled()
    {
        return !empty($this->{'2FASecret'});
    }
} 