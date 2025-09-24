import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export interface WorkflowProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  category: string;
  difficulty: string;
  integrations: string[];
  stripeProductId?: string;
  stripePriceId?: string;
}

export async function createStripeProduct(workflow: WorkflowProduct): Promise<{ productId: string; priceId: string }> {
  try {
    // Create the product in Stripe
    const product = await stripe.products.create({
      name: workflow.title,
      description: workflow.description,
      metadata: {
        workflowId: workflow.id.toString(),
        category: workflow.category,
        difficulty: workflow.difficulty,
        integrations: workflow.integrations.join(','),
        isFree: workflow.isFree.toString(),
      },
      images: [], // You can add product images later
    });

    let priceId = '';
    
    // Create price only for paid workflows
    if (!workflow.isFree && workflow.price > 0) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(workflow.price * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          workflowId: workflow.id.toString(),
        },
      });
      priceId = price.id;
    }

    return {
      productId: product.id,
      priceId: priceId,
    };
  } catch (error) {
    console.error('Error creating Stripe product:', error);
    throw error;
  }
}

export async function updateStripeProduct(workflow: WorkflowProduct): Promise<{ productId: string; priceId: string }> {
  if (!workflow.stripeProductId) {
    throw new Error('No Stripe product ID found for workflow');
  }

  try {
    // Update the product
    await stripe.products.update(workflow.stripeProductId, {
      name: workflow.title,
      description: workflow.description,
      metadata: {
        workflowId: workflow.id.toString(),
        category: workflow.category,
        difficulty: workflow.difficulty,
        integrations: workflow.integrations.join(','),
        isFree: workflow.isFree.toString(),
      },
    });

    let priceId = workflow.stripePriceId || '';

    // Handle price updates
    if (!workflow.isFree && workflow.price > 0) {
      // If price changed, create a new price (Stripe prices are immutable)
      const existingPrices = await stripe.prices.list({
        product: workflow.stripeProductId,
        active: true,
      });

      const currentPrice = existingPrices.data.find(p => p.unit_amount === Math.round(workflow.price * 100));
      
      if (!currentPrice) {
        // Create new price
        const newPrice = await stripe.prices.create({
          product: workflow.stripeProductId,
          unit_amount: Math.round(workflow.price * 100),
          currency: 'usd',
          metadata: {
            workflowId: workflow.id.toString(),
          },
        });

        // Deactivate old prices
        for (const oldPrice of existingPrices.data) {
          await stripe.prices.update(oldPrice.id, { active: false });
        }

        priceId = newPrice.id;
      } else {
        priceId = currentPrice.id;
      }
    } else if (workflow.isFree) {
      // Deactivate all prices for free workflows
      const existingPrices = await stripe.prices.list({
        product: workflow.stripeProductId,
        active: true,
      });

      for (const price of existingPrices.data) {
        await stripe.prices.update(price.id, { active: false });
      }
      priceId = '';
    }

    return {
      productId: workflow.stripeProductId,
      priceId: priceId,
    };
  } catch (error) {
    console.error('Error updating Stripe product:', error);
    throw error;
  }
}

export async function getStripeProduct(productId: string) {
  try {
    const product = await stripe.products.retrieve(productId);
    return product;
  } catch (error) {
    console.error('Error retrieving Stripe product:', error);
    throw error;
  }
}

export async function syncWorkflowToStripe(workflow: WorkflowProduct): Promise<WorkflowProduct> {
  try {
    let productId: string;
    let priceId: string;

    if (workflow.stripeProductId) {
      // Update existing product
      const result = await updateStripeProduct(workflow);
      productId = result.productId;
      priceId = result.priceId;
    } else {
      // Create new product
      const result = await createStripeProduct(workflow);
      productId = result.productId;
      priceId = result.priceId;
    }

    return {
      ...workflow,
      stripeProductId: productId,
      stripePriceId: priceId,
    };
  } catch (error) {
    console.error('Error syncing workflow to Stripe:', error);
    throw error;
  }
}

export async function listStripeProducts() {
  try {
    const products = await stripe.products.list({
      limit: 100,
      active: true,
    });
    return products.data;
  } catch (error) {
    console.error('Error listing Stripe products:', error);
    throw error;
  }
}