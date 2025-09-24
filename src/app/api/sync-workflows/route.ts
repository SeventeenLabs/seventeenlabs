import { NextRequest, NextResponse } from 'next/server';
import { syncWorkflowToStripe, WorkflowProduct } from '@/lib/stripe-products';
import { workflows } from '@/lib/workflows-data';

export async function POST(request: NextRequest) {
  try {
    const { workflowId, action } = await request.json();

    if (action === 'sync-all') {
      // Sync all workflows to Stripe
      const results = [];
      
      for (const workflow of workflows) {
        try {
          const workflowProduct: WorkflowProduct = {
            id: workflow.id,
            title: workflow.title,
            description: workflow.description,
            price: workflow.price,
            isFree: workflow.isFree,
            category: workflow.category,
            difficulty: workflow.difficulty,
            integrations: workflow.integrations,
            stripeProductId: workflow.stripeProductId,
            stripePriceId: workflow.stripePriceId,
          };

          const synced = await syncWorkflowToStripe(workflowProduct);
          results.push({
            workflowId: workflow.id,
            title: workflow.title,
            success: true,
            stripeProductId: synced.stripeProductId,
            stripePriceId: synced.stripePriceId,
          });
        } catch (error) {
          results.push({
            workflowId: workflow.id,
            title: workflow.title,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      return NextResponse.json({
        message: 'Sync completed',
        results,
        total: workflows.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
      });
    }

    if (action === 'sync-one' && workflowId) {
      // Sync single workflow
      const workflow = workflows.find(w => w.id === parseInt(workflowId));
      
      if (!workflow) {
        return NextResponse.json(
          { error: 'Workflow not found' },
          { status: 404 }
        );
      }

      const workflowProduct: WorkflowProduct = {
        id: workflow.id,
        title: workflow.title,
        description: workflow.description,
        price: workflow.price,
        isFree: workflow.isFree,
        category: workflow.category,
        difficulty: workflow.difficulty,
        integrations: workflow.integrations,
        stripeProductId: workflow.stripeProductId,
        stripePriceId: workflow.stripePriceId,
      };

      const synced = await syncWorkflowToStripe(workflowProduct);

      return NextResponse.json({
        message: 'Workflow synced successfully',
        workflow: {
          id: synced.id,
          title: synced.title,
          stripeProductId: synced.stripeProductId,
          stripePriceId: synced.stripePriceId,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "sync-all" or "sync-one"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in sync workflow:', error);
    return NextResponse.json(
      { error: 'Failed to sync workflow(s)' },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const syncStatus = workflows.map(workflow => ({
      id: workflow.id,
      title: workflow.title,
      price: workflow.price,
      isFree: workflow.isFree,
      hasStripeProduct: !!workflow.stripeProductId,
      hasStripePrice: !!workflow.stripePriceId,
      stripeProductId: workflow.stripeProductId || null,
      stripePriceId: workflow.stripePriceId || null,
    }));

    const total = workflows.length;
    const synced = syncStatus.filter(s => s.hasStripeProduct).length;
    const unsynced = total - synced;

    return NextResponse.json({
      summary: {
        total,
        synced,
        unsynced,
      },
      workflows: syncStatus,
    });
  } catch (error) {
    console.error('Error checking sync status:', error);
    return NextResponse.json(
      { error: 'Failed to check sync status' },
      { status: 500 }
    );
  }
}