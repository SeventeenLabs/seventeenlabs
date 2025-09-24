import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { workflows } from '@/lib/workflows-data';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(secretKey, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { workflowId } = await request.json();

    // Find the workflow
    const workflow = workflows.find(w => w.id === parseInt(workflowId));
    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    // Check if it's a free workflow
    if (workflow.isFree) {
      return NextResponse.json(
        { error: 'This workflow is free' },
        { status: 400 }
      );
    }

    // Check if workflow has Stripe product (preferred) or allow fallback
    let useStripeProduct = false;
    if (workflow.stripeProductId && workflow.stripePriceId) {
      useStripeProduct = true;
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(workflow.price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        workflowId: workflow.id.toString(),
        workflowTitle: workflow.title,
        ...(useStripeProduct && {
          stripeProductId: workflow.stripeProductId!,
          stripePriceId: workflow.stripePriceId!,
        }),
        syncedWithStripe: useStripeProduct.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      workflow: {
        id: workflow.id,
        title: workflow.title,
        price: workflow.price,
        stripeProductId: workflow.stripeProductId || null,
        stripePriceId: workflow.stripePriceId || null,
        syncedWithStripe: useStripeProduct,
      },
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}