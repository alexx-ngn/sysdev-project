<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Participant extends Model
{
    use HasFactory;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ParticipantID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'FirstName',
        'LastName',
        'PhoneNumber',
        'Email'
    ];

    /**
     * Get the registrations for the participant.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'ParticipantID');
    }

    /**
     * Get the donations for the participant.
     */
    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class, 'ParticipantID');
    }
} 