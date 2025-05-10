<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmission extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Contact Form Submission: ' . $this->data['subject'],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-form',
            with: [
                'data' => $this->data,
            ],
        );
    }
} 