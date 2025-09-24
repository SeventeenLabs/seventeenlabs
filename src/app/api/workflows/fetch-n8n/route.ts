import { NextRequest, NextResponse } from 'next/server';
import { getN8nClient, checkN8nConnection } from '@/lib/n8n-api';
import { getAllWorkflows, addWorkflow, updateWorkflow } from '@/lib/supabase-workflow-db';

// GET /api/workflows/fetch-n8n - Fetch workflows from n8n with SeventeenLabs_Workflow tag
export async function GET(request: NextRequest) {
  try {
    // Check n8n connection
    const connectionStatus = await checkN8nConnection();
    if (!connectionStatus.connected) {
      return NextResponse.json({
        success: false,
        error: 'Cannot connect to n8n API',
        details: connectionStatus.error,
        troubleshooting: [
          'Verify N8N_API_BASE_URL environment variable',
          'Verify N8N_API_KEY environment variable', 
          'Ensure n8n instance is running and accessible'
        ]
      }, { status: 503 });
    }

    const n8nClient = getN8nClient();
    
    // Fetch workflows with SeventeenLabs_Workflow tag
    const seventeenLabsWorkflows = await n8nClient.getSeventeenLabsWorkflows();
    
    // Also get all workflows for comparison
    const allWorkflows = await n8nClient.getAllWorkflows();
    
    // Format the response with detailed information
    const workflowDetails = seventeenLabsWorkflows.map(workflow => {
      // Extract integrations from nodes
      const integrations = new Set<string>();
      if (workflow.nodes) {
        workflow.nodes.forEach(node => {
          if (node.type && !node.type.includes('start') && !node.type.includes('noOp')) {
            const serviceName = node.type.split('.').pop();
            if (serviceName) {
              integrations.add(serviceName.charAt(0).toUpperCase() + serviceName.slice(1));
            }
          }
        });
      }

      return {
        id: workflow.id,
        name: workflow.name,
        active: workflow.active,
        nodeCount: workflow.nodes ? workflow.nodes.length : 0,
        integrations: Array.from(integrations),
        tags: workflow.tags ? workflow.tags.map(tag => tag.name) : [],
        versionId: workflow.versionId,
        createdAt: workflow.createdAt,
        updatedAt: workflow.updatedAt,
        // Check if already exists in our database
        existsInDatabase: false // Will be populated below
      };
    });

    // Check which workflows already exist in our database
    const existingWorkflows = await getAllWorkflows();
    const existingN8nIds = new Set(existingWorkflows.filter(w => w.n8nId).map(w => w.n8nId));

    workflowDetails.forEach(workflow => {
      workflow.existsInDatabase = existingN8nIds.has(workflow.id);
    });

    return NextResponse.json({
      success: true,
      connection: {
        status: 'connected',
        totalWorkflowsInN8n: allWorkflows.length,
        seventeenLabsWorkflowsFound: seventeenLabsWorkflows.length
      },
      workflows: workflowDetails,
      summary: {
        total: workflowDetails.length,
        alreadyInDatabase: workflowDetails.filter(w => w.existsInDatabase).length,
        needsSync: workflowDetails.filter(w => !w.existsInDatabase).length,
        activeWorkflows: workflowDetails.filter(w => w.active).length,
        inactiveWorkflows: workflowDetails.filter(w => !w.active).length
      },
      instructions: {
        tagRequired: 'SeventeenLabs_Workflow',
        howToTag: [
          'Open workflow in n8n editor',
          'Click on workflow name/settings',
          'Add tag "SeventeenLabs_Workflow"',
          'Save workflow'
        ],
        syncEndpoint: '/api/workflows/enhanced-sync?method=api'
      }
    });

  } catch (error) {
    console.error('Error fetching n8n workflows:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch n8n workflows',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/workflows/fetch-n8n - Sync workflows from n8n to database
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const apiKey = request.headers.get('x-api-key');
    
    const expectedApiKey = process.env.N8N_WEBHOOK_API_KEY || 'your-secret-api-key';
    let isAuthenticated = false;
    
    if (apiKey === expectedApiKey) {
      isAuthenticated = true;
    } else if (authHeader?.startsWith('Bearer ') && authHeader.substring(7) === expectedApiKey) {
      isAuthenticated = true;
    }
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please provide a valid API key via x-api-key header or Authorization: Bearer <key>' },
        { status: 401 }
      );
    }

    // Check n8n connection
    const connectionStatus = await checkN8nConnection();
    if (!connectionStatus.connected) {
      return NextResponse.json({
        success: false,
        error: 'Cannot connect to n8n API',
        details: connectionStatus.error
      }, { status: 503 });
    }

    const n8nClient = getN8nClient();
    const existingWorkflows = await getAllWorkflows();

    // Get SeventeenLabs workflows from n8n
    const n8nWorkflows = await n8nClient.syncAllWorkflows();

    const results = {
      processed: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[]
    };

    // Map existing workflows by n8nId
    const existingN8nIds = new Map(
      existingWorkflows
        .filter(w => w.n8nId)
        .map(w => [w.n8nId!, w])
    );

    for (const n8nWorkflow of n8nWorkflows) {
      try {
        results.processed++;

        if (!n8nWorkflow.n8nId) {
          results.errors.push(`Workflow missing n8nId: ${n8nWorkflow.title}`);
          continue;
        }

        const existing = existingN8nIds.get(n8nWorkflow.n8nId);

        if (existing) {
          // Update existing workflow
          const updated = await updateWorkflow(existing.id, {
            ...n8nWorkflow,
            updatedAt: new Date().toISOString()
          });

          if (updated) {
            results.updated++;
          } else {
            results.errors.push(`Failed to update workflow: ${n8nWorkflow.title}`);
          }
        } else {
          // Create new workflow
          const created = await addWorkflow({
            title: n8nWorkflow.title || 'Untitled Workflow',
            description: n8nWorkflow.description || `Automated workflow from n8n`,
            longDescription: n8nWorkflow.longDescription,
            category: n8nWorkflow.category || 'Automation',
            difficulty: n8nWorkflow.difficulty || 'Intermediate',
            time: n8nWorkflow.time || '30 min',
            users: n8nWorkflow.users || 0,
            rating: n8nWorkflow.rating || 0,
            integrations: n8nWorkflow.integrations || [],
            price: n8nWorkflow.price || 0,
            isFree: n8nWorkflow.isFree !== false,
            features: n8nWorkflow.features || [],
            requirements: n8nWorkflow.requirements || [],
            videoUrl: n8nWorkflow.videoUrl || '',
            mermaidChart: n8nWorkflow.mermaidChart || '',
            previewChart: n8nWorkflow.previewChart,
            stripeProductId: n8nWorkflow.stripeProductId,
            stripePriceId: n8nWorkflow.stripePriceId,
            tags: n8nWorkflow.tags || [],
            author: n8nWorkflow.author || 'SeventeenLabs',
            version: n8nWorkflow.version || '1.0',
            n8nId: n8nWorkflow.n8nId,
            n8nVersionId: n8nWorkflow.n8nVersionId,
            lastSyncAt: n8nWorkflow.lastSyncAt,
            n8nData: n8nWorkflow.n8nData
          });

          if (created) {
            results.created++;
          } else {
            results.errors.push(`Failed to create workflow: ${n8nWorkflow.title}`);
          }
        }
      } catch (error) {
        console.error(`Error processing workflow ${n8nWorkflow.n8nId}:`, error);
        results.errors.push(`Processing error for ${n8nWorkflow.title}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} SeventeenLabs workflows`,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error syncing n8n workflows:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to sync n8n workflows',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}