import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { hasUserPurchased, addPurchase, findPurchaseByStripeId } from '@/lib/purchase-db';
import { workflows } from '@/lib/workflows-data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { action, email, workflowId, paymentIntentId } = await request.json();

    if (action === 'verify-purchase') {
      // Verify if user has purchased a workflow
      if (!email || !workflowId) {
        return NextResponse.json(
          { error: 'Email and workflowId are required' },
          { status: 400 }
        );
      }

      const hasPurchased = hasUserPurchased(email, parseInt(workflowId));
      const workflow = workflows.find(w => w.id === parseInt(workflowId));

      return NextResponse.json({
        hasPurchased,
        workflow: workflow ? {
          id: workflow.id,
          title: workflow.title,
          isFree: workflow.isFree,
        } : null,
      });
    }

    if (action === 'confirm-purchase') {
      // Confirm a purchase using Stripe Payment Intent
      if (!email || !workflowId || !paymentIntentId) {
        return NextResponse.json(
          { error: 'Email, workflowId, and paymentIntentId are required' },
          { status: 400 }
        );
      }

      // Check if we already have this purchase recorded
      const existingPurchase = findPurchaseByStripeId(paymentIntentId);
      if (existingPurchase) {
        return NextResponse.json({
          success: true,
          message: 'Purchase already confirmed',
          purchase: existingPurchase,
        });
      }

      // Verify with Stripe that the payment was successful
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        if (paymentIntent.status !== 'succeeded') {
          return NextResponse.json(
            { error: 'Payment not completed' },
            { status: 400 }
          );
        }

        // Verify the payment is for the correct workflow
        const paymentWorkflowId = paymentIntent.metadata.workflowId;
        if (paymentWorkflowId !== workflowId.toString()) {
          return NextResponse.json(
            { error: 'Payment does not match workflow' },
            { status: 400 }
          );
        }

        const workflow = workflows.find(w => w.id === parseInt(workflowId));
        if (!workflow) {
          return NextResponse.json(
            { error: 'Workflow not found' },
            { status: 404 }
          );
        }

        // Record the purchase
        const purchase = addPurchase({
          workflowId: parseInt(workflowId),
          userEmail: email,
          stripePaymentIntentId: paymentIntentId,
          stripeCustomerId: paymentIntent.customer as string,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: 'completed',
          metadata: paymentIntent.metadata,
        });

        return NextResponse.json({
          success: true,
          message: 'Purchase confirmed',
          purchase: {
            id: purchase.id,
            workflowId: purchase.workflowId,
            purchaseDate: purchase.purchaseDate,
          },
        });

      } catch (stripeError) {
        console.error('Error verifying payment with Stripe:', stripeError);
        return NextResponse.json(
          { error: 'Failed to verify payment' },
          { status: 500 }
        );
      }
    }

    if (action === 'list-purchases') {
      // List all purchases for a user
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      const purchases = hasUserPurchased(email, 0); // This will be updated to get all purchases
      // For now, let's check each workflow individually
      const userPurchases = [];
      
      for (const workflow of workflows) {
        if (hasUserPurchased(email, workflow.id)) {
          userPurchases.push({
            workflowId: workflow.id,
            title: workflow.title,
            purchaseDate: new Date().toISOString(), // You'd get this from the actual purchase record
          });
        }
      }

      return NextResponse.json({
        purchases: userPurchases,
        total: userPurchases.length,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "verify-purchase", "confirm-purchase", or "list-purchases"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in purchase verification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check purchase status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const workflowId = searchParams.get('workflowId');

  if (!email || !workflowId) {
    return NextResponse.json(
      { error: 'Email and workflowId query parameters are required' },
      { status: 400 }
    );
  }

  try {
    const hasPurchased = hasUserPurchased(email, parseInt(workflowId));
    const workflow = workflows.find(w => w.id === parseInt(workflowId));

    return NextResponse.json({
      hasPurchased,
      workflow: workflow ? {
        id: workflow.id,
        title: workflow.title,
        isFree: workflow.isFree,
      } : null,
    });
  } catch (error) {
    console.error('Error checking purchase:', error);
    return NextResponse.json(
      { error: 'Failed to check purchase' },
      { status: 500 }
    );
  }
}