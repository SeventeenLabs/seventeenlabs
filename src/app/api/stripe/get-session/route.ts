import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: 'Session ID is required'
      }, { status: 400 });
    }

    console.log('🔍 Retrieving session:', sessionId);

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'Session not found'
      }, { status: 404 });
    }

    console.log('📋 Session retrieved:', {
      id: session.id,
      paymentStatus: session.payment_status,
      paymentIntentId: session.payment_intent
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      paymentIntentId: session.payment_intent,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email || session.customer_details?.email,
      metadata: session.metadata
    });

  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to retrieve session'
    }, { status: 500 });
  }
}