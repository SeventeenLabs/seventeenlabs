import { NextRequest, NextResponse } from 'next/server';
import { getUserPurchases } from '@/lib/purchases-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email query parameter is required' },
      { status: 400 }
    );
  }

  try {
    console.log(`🔍 Debug: Looking for purchases for email: ${email}`);
    const purchases = await getUserPurchases(email);
    
    console.log(`🔍 Debug: Found ${purchases.length} purchases:`, purchases);
    
    return NextResponse.json({
      email,
      purchaseCount: purchases.length,
      purchases: purchases.map(p => ({
        id: p.id,
        workflowId: p.workflow_id,
        email: p.user_email,
        createdAt: p.created_at,
        stripePaymentIntentId: p.stripe_payment_intent_id
      }))
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}