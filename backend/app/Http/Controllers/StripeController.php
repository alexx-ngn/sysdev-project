<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Donation;
use App\Events\NewDonationEvent;
use Illuminate\Support\Facades\Log;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'unit_amount' => $request->amount * 100, // Convert to cents
                        'product_data' => [
                            'name' => 'Charity Run Donation',
                        ],
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => url('/donate/success?session_id={CHECKOUT_SESSION_ID}'),
                'cancel_url' => url('/donate/cancel'),
                'customer_email' => $request->email,
                'metadata' => [
                    'donor_name' => $request->name,
                    'donor_email' => $request->email,
                ],
            ]);

            return response()->json(['sessionId' => $session->id]);
        } catch (\Exception $e) {
            Log::error('Stripe checkout session creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Failed to create checkout session'
            ], 500);
        }
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sigHeader, $endpointSecret
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            try {
                $donation = Donation::create([
                    'name' => $session->metadata->donor_name,
                    'email' => $session->metadata->donor_email,
                    'Amount' => $session->amount_total / 100, // Convert from cents
                    'DonationDate' => now(),
                    'type' => 'One-time donation',
                    'ConfirmationID' => 'DON-' . time() . '-' . substr(md5(uniqid()), 0, 8),
                ]);

                event(new NewDonationEvent($donation));

                Log::info('Donation processed successfully:', [
                    'donation_id' => $donation->DonationID,
                    'amount' => $donation->Amount
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to process donation after successful payment:', [
                    'error' => $e->getMessage(),
                    'session_id' => $session->id
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }
} 