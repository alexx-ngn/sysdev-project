<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Donation;
use App\Events\NewDonationEvent;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Log::info('Received checkout session request:', $request->all());

        // Debug: Check if Stripe key is configured
        $stripeKey = config('services.stripe.secret');
        Log::info('Stripe key status:', ['is_configured' => !empty($stripeKey)]);

        try {
            if (empty($stripeKey)) {
                Log::error('Stripe secret key not found in configuration. Check your .env file.');
                return response()->json([
                    'error' => 'Stripe secret key is not configured. Check your .env file.'
                ], 500);
            }

            Stripe::setApiKey($stripeKey);
            
            if (!$request->has('amount') || !is_numeric($request->amount)) {
                Log::error('Invalid amount provided:', ['amount' => $request->amount]);
                return response()->json([
                    'error' => 'Invalid amount provided'
                ], 400);
            }

            Log::info('Creating Stripe session with data:', [
                'amount' => $request->amount,
                'email' => $request->email,
                'name' => $request->name
            ]);

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'cad',
                        'unit_amount' => (int)($request->amount * 100), // Convert to cents and ensure integer
                        'product_data' => [
                            'name' => 'Charity Run Donation',
                            'description' => 'Thank you for your donation!',
                        ],
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => env('FRONTEND_URL') . '/donate/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => env('FRONTEND_URL') . '/donate/cancel',
                'customer_email' => $request->email,
                'metadata' => [
                    'donor_email' => $request->email,
                    'donor_name' => $request->name,
                    'donor_phone' => $request->phoneNumber,
                ],
            ]);

            Log::info('Checkout session created successfully:', ['session_id' => $session->id]);
            return response()->json(['sessionId' => $session->id]);
            
        } catch (\Exception $e) {
            Log::error('Stripe checkout session creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'error' => 'Failed to create checkout session: ' . $e->getMessage()
            ], 500);
        }
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            Log::error('Invalid payload:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Invalid signature:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            Log::info('Processing checkout.session.completed event:', [
                'session_id' => $session->id,
                'amount' => $session->amount_total,
                'metadata' => $session->metadata
            ]);

            try {
                // Find or create user
                $user = User::firstOrCreate(
                    ['Email' => $session->metadata->donor_email],
                    [
                        'FirstName' => explode(' ', $session->metadata->donor_name)[0],
                        'LastName' => explode(' ', $session->metadata->donor_name)[1] ?? '',
                        'PhoneNumber' => $session->metadata->donor_phone ?? '0000000000',
                    ]
                );

                Log::info('User found/created:', [
                    'user_id' => $user->UserID,
                    'email' => $user->Email
                ]);

                // Create donation
                $donation = Donation::create([
                    'UserID' => $user->UserID,
                    'Amount' => $session->amount_total / 100, // Convert from cents
                    'DonationDate' => now(),
                    'ConfirmationID' => 'DON-' . time() . '-' . substr(md5(uniqid()), 0, 8),
                ]);

                Log::info('Donation created successfully:', [
                    'donation_id' => $donation->DonationID,
                    'amount' => $donation->Amount,
                    'user_id' => $user->UserID
                ]);

                // Send confirmation email
                try {
                    Mail::send('emails.donation-confirmation', ['donation' => $donation], function ($message) use ($donation) {
                        $message->to($donation->user->Email)
                               ->subject('Thank You for Your Donation - Miles for Hope');
                    });
                    Log::info('Donation confirmation email sent successfully', [
                        'donation_id' => $donation->DonationID,
                        'user_email' => $donation->user->Email
                    ]);
                } catch (\Exception $e) {
                    Log::warning('Failed to send donation confirmation email:', [
                        'error' => $e->getMessage(),
                        'donation_id' => $donation->DonationID
                    ]);
                }

                event(new NewDonationEvent($donation));
            } catch (\Exception $e) {
                Log::error('Failed to process donation after successful payment:', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'session_id' => $session->id
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }

    public function verifyPayment(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $sessionId = $request->query('session_id');
            if (!$sessionId) {
                return response()->json(['error' => 'Session ID is required'], 400);
            }

            $session = \Stripe\Checkout\Session::retrieve($sessionId);
            
            if (!$session) {
                return response()->json(['error' => 'Invalid session ID'], 404);
            }

            return response()->json([
                'status' => $session->status,
                'payment_status' => $session->payment_status,
            ]);
        } catch (\Exception $e) {
            Log::error('Payment verification failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Failed to verify payment'
            ], 500);
        }
    }
} 