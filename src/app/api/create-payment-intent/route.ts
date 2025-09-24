import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { formatAmountForStripe } from '@/lib/stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(secretKey, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, workflowId, workflowTitle } = await request.json();

    // Validate required fields
    if (!amount || !workflowId || !workflowTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount, 'usd'),
      currency: 'usd',
      metadata: {
        workflowId: workflowId.toString(),
        workflowTitle,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}