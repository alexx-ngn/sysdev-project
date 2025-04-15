<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donation extends Model
{
    use HasFactory;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'DonationID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string, mixed>
     */
    protected $fillable = [
        'UserID',
        'Amount',
        'DonationDate',
        'ConfirmationID'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'Amount' => 'double',
        'DonationDate' => 'datetime'
    ];

    /**
     * Get the user that made the donation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'UserID');
    }
}
