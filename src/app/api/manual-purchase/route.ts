import { NextRequest, NextResponse } from 'next/server';
import { addPurchase } from '@/lib/purchases-db';

export async function POST(request: NextRequest) {
  try {
    const { email, workflowId, paymentIntentId } = await request.json();

    console.log('🧪 Manual purchase creation test:', { email, workflowId, paymentIntentId });

    // Create purchase directly
    const purchase = await addPurchase({
      workflow_id: parseInt(workflowId) || 21,
      user_email: email || 'christian.lutz.privat@gmail.com',
      stripe_payment_intent_id: paymentIntentId || 'pi_manual_test_' + Date.now(),
      stripe_customer_id: 'cus_manual_test',
      amount: 2900,
      currency: 'usd',
      status: 'completed',
      metadata: { manual: true }
    });

    if (purchase) {
      console.log('✅ Manual purchase created:', purchase.id);
      return NextResponse.json({
        success: true,
        message: 'Manual purchase created',
        purchase: purchase
      });
    } else {
      console.error('❌ Failed to create manual purchase');
      return NextResponse.json({
        success: false,
        error: 'Failed to create purchase'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Manual purchase error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}