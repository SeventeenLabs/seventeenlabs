import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { hasUserPurchased, addPurchase, findPurchaseByStripeId, getUserPurchases } from '@/lib/purchases-db';
import { getWorkflowById } from '@/lib/supabase-workflow-db';

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

      console.log(`Verifying purchase for email: ${email}, workflowId: ${workflowId}`);
      const hasPurchased = await hasUserPurchased(email, parseInt(workflowId));
      const workflow = await getWorkflowById(parseInt(workflowId));
      
      console.log(`Purchase verification result: ${hasPurchased}`);

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
      const existingPurchase = await findPurchaseByStripeId(paymentIntentId);
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
        console.log('🔍 Comparing workflow IDs:', {
          fromPayment: paymentWorkflowId,
          fromRequest: workflowId.toString(),
          match: paymentWorkflowId === workflowId.toString()
        });
        
        if (paymentWorkflowId !== workflowId.toString()) {
          console.error('❌ Payment workflow ID mismatch:', {
            expected: workflowId.toString(),
            actual: paymentWorkflowId,
            metadata: paymentIntent.metadata
          });
          return NextResponse.json(
            { error: 'Payment does not match workflow' },
            { status: 400 }
          );
        }

        const workflow = await getWorkflowById(parseInt(workflowId));
        if (!workflow) {
          return NextResponse.json(
            { error: 'Workflow not found' },
            { status: 404 }
          );
        }

        // Record the purchase
        console.log('🔍 About to add purchase to database:', {
          workflow_id: parseInt(workflowId),
          user_email: email,
          stripe_payment_intent_id: paymentIntentId,
          amount: paymentIntent.amount
        });
        
        const purchase = await addPurchase({
          workflow_id: parseInt(workflowId),
          user_email: email,
          stripe_payment_intent_id: paymentIntentId,
          stripe_customer_id: paymentIntent.customer as string,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: 'completed',
          metadata: paymentIntent.metadata,
        });

        console.log('💾 Purchase add result:', purchase);

        if (!purchase) {
          console.error('❌ Failed to add purchase to database');
          return NextResponse.json(
            { error: 'Failed to record purchase' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Purchase confirmed',
          purchase: {
            id: purchase?.id,
            workflowId: purchase?.workflow_id,
            purchaseDate: purchase?.created_at,
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

      console.log(`Listing purchases for email: ${email}`);
      
      try {
        const userPurchases = await getUserPurchases(email);
        console.log(`Found ${userPurchases.length} purchases for user`);
        
        const purchasesWithWorkflowData = await Promise.all(
          userPurchases.map(async purchase => {
            const workflow = await getWorkflowById(purchase.workflow_id);
            return {
              workflowId: purchase.workflow_id,
              title: workflow?.title || 'Unknown Workflow',
              purchaseDate: purchase.created_at,
            };
          })
        );

        console.log(`Found ${purchasesWithWorkflowData.length} purchases for ${email}`);
        return NextResponse.json({
          purchases: purchasesWithWorkflowData,
          total: purchasesWithWorkflowData.length,
        });
      } catch (error) {
        console.error('Error fetching user purchases:', error);
        return NextResponse.json(
          { error: 'Failed to fetch purchases' },
          { status: 500 }
        );
      }
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
    const hasPurchased = await hasUserPurchased(email, parseInt(workflowId));
    const workflow = await getWorkflowById(parseInt(workflowId));

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