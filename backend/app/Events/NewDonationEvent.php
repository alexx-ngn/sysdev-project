<?php

namespace App\Events;

use App\Models\Donation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewDonationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $donation;

    public function __construct(Donation $donation)
    {
        $this->donation = $donation;
    }

    public function broadcastOn()
    {
        return new Channel('donations');
    }

    public function broadcastAs()
    {
        return 'new-donation';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->donation->DonationID,
            'user' => [
                'firstName' => $this->donation->user->FirstName,
                'lastName' => $this->donation->user->LastName
            ],
            'amount' => $this->donation->Amount,
            'date' => $this->donation->DonationDate
        ];
    }
} 