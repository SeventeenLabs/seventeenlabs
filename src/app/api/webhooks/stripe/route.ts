import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { addPurchase, updatePurchaseStatus } from '@/lib/purchase-db';
import { workflows } from '@/lib/workflows-data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Extract workflow information from metadata
        const workflowId = parseInt(paymentIntent.metadata.workflowId);
        
        // Get customer email from payment method or customer object
        let customerEmail = '';
        
        // Try to get email from payment method billing details
        if (paymentIntent.payment_method) {
          try {
            const paymentMethod = await stripe.paymentMethods.retrieve(
              paymentIntent.payment_method as string
            );
            customerEmail = paymentMethod.billing_details?.email || '';
          } catch (error) {
            console.error('Error fetching payment method:', error);
          }
        }

        // If no email in payment method, try to get from customer
        if (!customerEmail && paymentIntent.customer) {
          try {
            const customer = await stripe.customers.retrieve(paymentIntent.customer as string);
            if (!customer.deleted && customer.email) {
              customerEmail = customer.email;
            }
          } catch (error) {
            console.error('Error fetching customer:', error);
          }
        }

        if (!customerEmail) {
          console.error('No customer email found for payment:', paymentIntent.id);
          break;
        }

        // Verify workflow exists
        const workflow = workflows.find(w => w.id === workflowId);
        if (!workflow) {
          console.error('Workflow not found:', workflowId);
          break;
        }

        // Check if purchase already exists
        const existingPurchase = await import('@/lib/purchase-db').then(db => 
          db.findPurchaseByStripeId(paymentIntent.id)
        );

        if (existingPurchase) {
          // Update status to completed
          updatePurchaseStatus(existingPurchase.id, 'completed');
          console.log('Updated existing purchase to completed:', existingPurchase.id);
        } else {
          // Create new purchase record
          const purchase = addPurchase({
            workflowId,
            userEmail: customerEmail,
            stripePaymentIntentId: paymentIntent.id,
            stripeCustomerId: paymentIntent.customer as string,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: 'completed',
            metadata: paymentIntent.metadata,
          });

          console.log('New purchase recorded:', purchase.id);
        }

        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        
        // You could update purchase status to failed here if needed
        break;

      case 'charge.dispute.created':
        const dispute = event.data.object as Stripe.Dispute;
        console.log('Dispute created for charge:', dispute.charge);
        
        // Handle disputes by marking purchases as disputed
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}