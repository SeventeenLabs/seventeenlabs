import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getWorkflowById } from '@/lib/supabase-workflow-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { workflowId, customerEmail, successUrl, cancelUrl } = await request.json();

    // Validate required fields
    if (!workflowId || !customerEmail) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: workflowId and customerEmail'
      }, { status: 400 });
    }

    // Get workflow details
    const workflow = await getWorkflowById(workflowId);
    
    if (!workflow) {
      return NextResponse.json({
        success: false,
        error: 'Workflow not found'
      }, { status: 404 });
    }

    // Check if workflow is free
    if (workflow.isFree || workflow.price === 0) {
      return NextResponse.json({
        success: false,
        error: 'Cannot create checkout for free workflow'
      }, { status: 400 });
    }

    // Check if workflow has Stripe product configured
    if (!workflow.stripeProductId || !workflow.stripePriceId) {
      return NextResponse.json({
        success: false,
        error: 'Workflow not configured for payments. Please contact support.'
      }, { status: 400 });
    }

    // Get base URL - use environment variable or construct from request
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: workflow.stripePriceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        workflowId: workflowId.toString(),
        workflowTitle: workflow.title,
      },
      payment_intent_data: {
        metadata: {
          workflowId: workflowId.toString(),
          workflowTitle: workflow.title,
        },
      },
      success_url: successUrl || `${baseUrl}/workflows/${workflowId}?payment=success&email=${encodeURIComponent(customerEmail)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/workflows/${workflowId}?payment=cancelled`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url
    });

  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout session'
    }, { status: 500 });
  }
}