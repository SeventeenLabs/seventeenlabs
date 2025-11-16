import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      email,
      teamSize,
      industry,
      mainChallenge,
      currentTools,
      addStrategySession,
      locale,
    } = body;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

    // Create line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Agency Automation Blueprint',
            description: '3 high-impact automation opportunities custom-built for your agency',
            images: [`${baseUrl}/opengraph-image`],
            metadata: {
              type: 'blueprint',
            },
          },
          unit_amount: 49900, // $499.00
        },
        quantity: 1,
      },
    ];

    // Add strategy session if selected
    if (addStrategySession) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: '30-min Strategy Session',
            description: 'Walk through your automation roadmap with our expert',
            metadata: {
              type: 'strategy_session',
            },
          },
          unit_amount: 25000, // $250.00
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: email,
      client_reference_id: `blueprint_${Date.now()}`,
      metadata: {
        companyName,
        teamSize,
        industry,
        mainChallenge,
        currentTools: currentTools || 'Not provided',
        addStrategySession: addStrategySession.toString(),
        locale,
        product_type: 'blueprint',
      },
      success_url: `${baseUrl}/${locale === 'de' ? 'de/' : ''}blueprint-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale === 'de' ? 'de/' : ''}services/ai-consulting?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    // Track in your database if needed
    // await saveCheckoutSession({
    //   sessionId: session.id,
    //   companyName,
    //   email,
    //   ...metadata
    // });

    return NextResponse.json({ 
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
