import { NextRequest, NextResponse } from 'next/server';
import { addPurchase } from '@/lib/purchases-db';

export async function POST(request: NextRequest) {
  try {
    const { email, workflowId } = await request.json();

    console.log('🧪 Testing direct database insert:', { email, workflowId });

    const testPurchase = {
      workflow_id: parseInt(workflowId) || 1,
      user_email: email || 'test@example.com',
      stripe_payment_intent_id: 'pi_test_' + Date.now(),
      stripe_customer_id: 'cus_test_' + Date.now(),
      amount: 2900,
      currency: 'usd',
      status: 'completed' as const,
      metadata: { test: true }
    };

    console.log('📝 Creating test purchase:', testPurchase);

    const result = await addPurchase(testPurchase);

    if (result) {
      console.log('✅ Test purchase created successfully:', result);
      return NextResponse.json({
        success: true,
        message: 'Test purchase created',
        purchase: result
      });
    } else {
      console.error('❌ Failed to create test purchase');
      return NextResponse.json({
        success: false,
        error: 'Failed to create purchase'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Test purchase error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
