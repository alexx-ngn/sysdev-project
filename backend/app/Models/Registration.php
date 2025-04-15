<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Registration extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'registrations';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'RegistrationID';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'UserID',
        'ParticipantID',
        'RegistrationDate',
        'RegistrationStatus'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'RegistrationDate' => 'datetime',
    ];

    /**
     * Get the user that owns the registration.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'UserID');
    }

    /**
     * Get the participant associated with the registration.
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'ParticipantID');
    }
}
