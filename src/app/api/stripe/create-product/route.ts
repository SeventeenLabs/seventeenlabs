import { NextRequest, NextResponse } from 'next/server';
import { createStripeProduct } from '@/lib/stripe-products';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflowId, title, description, price, category, difficulty, integrations } = body;

    // Validate required fields
    if (!title || !description || !price || price <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, description, and valid price'
      }, { status: 400 });
    }

    // Create the workflow product object
    const workflowProduct = {
      id: workflowId || 0, // Use 0 for new workflows
      title,
      description,
      price: parseFloat(price),
      isFree: false,
      category: category || 'Automation',
      difficulty: difficulty || 'Intermediate',
      integrations: Array.isArray(integrations) ? integrations : []
    };

    // Create Stripe product and price
    const { productId, priceId } = await createStripeProduct(workflowProduct);

    return NextResponse.json({
      success: true,
      productId,
      priceId,
      message: 'Stripe product created successfully'
    });

  } catch (error) {
    console.error('Error creating Stripe product:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Stripe product'
    }, { status: 500 });
  }
}