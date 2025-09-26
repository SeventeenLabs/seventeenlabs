import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { addPurchase } from '@/lib/purchases-db';
import { getWorkflowById } from '@/lib/supabase-workflow-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  console.log('🔔 Stripe webhook received');
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!signature || !webhookSecret) {
    console.error('❌ Missing signature or webhook secret');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Webhook verified, event type:', event.type);
  } catch (error) {
    console.error('❌ Webhook verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log('💳 Processing checkout session completed');
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('📊 Session details:', {
      id: session.id,
      metadata: session.metadata,
      customerEmail: session.customer_email || session.customer_details?.email,
      paymentIntentId: session.payment_intent,
      amountTotal: session.amount_total
    });
    
    const workflowId = parseInt(session.metadata?.workflowId || '0');
    const customerEmail = session.customer_email || session.customer_details?.email || '';
    const paymentIntentId = session.payment_intent as string;
    
    console.log('🔍 Extracted values:', { workflowId, customerEmail, paymentIntentId });
    
    if (workflowId && customerEmail && paymentIntentId) {
      const workflow = await getWorkflowById(workflowId);
      if (workflow) {
        console.log('✅ Workflow found:', workflow.title);
        try {
          console.log('💾 Creating purchase record...');
          const purchase = await addPurchase({
            workflow_id: workflowId,
            user_email: customerEmail,
            stripe_payment_intent_id: paymentIntentId,
            stripe_session_id: session.id,
            stripe_customer_id: session.customer as string,
            amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'completed',
            metadata: session.metadata || {},
          });
          
          if (purchase) {
            console.log('✅ Purchase created successfully:', purchase.id);
          } else {
            console.error('❌ Purchase creation returned null');
          }
        } catch (error) {
          console.error('❌ Error creating purchase:', error);
        }
      } else {
        console.error('❌ Workflow not found for ID:', workflowId);
      }
    } else {
      console.error('❌ Missing required data:', { workflowId, customerEmail, paymentIntentId });
    }
  } else {
    console.log('ℹ️ Unhandled event type:', event.type);
  }

  return NextResponse.json({ received: true });
}