import { NextRequest, NextResponse } from 'next/server';
import { getAllWorkflows, addWorkflow, updateWorkflow, getWorkflowByN8nId } from '@/lib/supabase-workflow-db';

// Type for n8n workflow data
interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  nodes: any[];
  connections: any;
  settings?: any;
  staticData?: any;
  pinData?: any;
  versionId?: string;
  meta?: {
    templateCredsSetupCompleted?: boolean;
    instanceId?: string;
  };
  // Our custom fields that will be added in n8n
  marketplaceData?: {
    category?: string;
    description?: string;
    longDescription?: string;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    time?: string;
    price?: number;
    integrations?: string[];
    features?: string[];
    requirements?: string[];
    videoUrl?: string;
    mermaidChart?: string;
  };
}

interface N8nSyncPayload {
  workflows: N8nWorkflow[];
  timestamp: string;
  instanceId?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const authHeader = request.headers.get('authorization');
    const apiKey = request.headers.get('x-api-key');
    
    // Check for API key in header or as bearer token
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

    const body: N8nSyncPayload = await request.json();
    
    // Basic validation
    if (!body.workflows || !Array.isArray(body.workflows)) {
      return NextResponse.json(
        { error: 'Invalid payload: workflows array is required' },
        { status: 400 }
      );
    }

    const results = {
      processed: 0,
      created: 0,
      updated: 0,
      errors: [] as string[]
    };

    // Get existing workflows to check for updates
    const existingWorkflows = await getAllWorkflows();
    const existingN8nIds = new Map(
      existingWorkflows
        .filter(w => w.n8nId)
        .map(w => [w.n8nId!, w])
    );

    for (const n8nWorkflow of body.workflows) {
      try {
        // Convert n8n workflow to our format
        const workflowData = {
          n8nId: n8nWorkflow.id,
          n8nVersionId: n8nWorkflow.versionId || '',
          title: n8nWorkflow.name,
          category: n8nWorkflow.marketplaceData?.category || 'Automation',
          description: n8nWorkflow.marketplaceData?.description || `Automated workflow: ${n8nWorkflow.name}`,
          longDescription: n8nWorkflow.marketplaceData?.longDescription || '',
          difficulty: n8nWorkflow.marketplaceData?.difficulty || 'Intermediate',
          time: n8nWorkflow.marketplaceData?.time || '30 min',
          price: n8nWorkflow.marketplaceData?.price || 0,
          isFree: (n8nWorkflow.marketplaceData?.price || 0) === 0,
          users: 0, // Will be tracked separately
          rating: 0, // Will be tracked separately
          integrations: n8nWorkflow.marketplaceData?.integrations || extractIntegrationsFromNodes(n8nWorkflow.nodes),
          features: n8nWorkflow.marketplaceData?.features || [],
          requirements: n8nWorkflow.marketplaceData?.requirements || [],
          videoUrl: n8nWorkflow.marketplaceData?.videoUrl || '',
          mermaidChart: n8nWorkflow.marketplaceData?.mermaidChart || generateMermaidFromWorkflow(n8nWorkflow),
          lastSyncAt: new Date().toISOString(),
          n8nData: {
            nodes: n8nWorkflow.nodes,
            connections: n8nWorkflow.connections,
            settings: n8nWorkflow.settings,
            staticData: n8nWorkflow.staticData,
            pinData: n8nWorkflow.pinData
          }
        };

        // Check if workflow already exists
        const existingWorkflow = existingN8nIds.get(n8nWorkflow.id);
        
        if (existingWorkflow) {
          // Update existing workflow
          await updateWorkflow(existingWorkflow.id, workflowData);
          results.updated++;
        } else {
          // Create new workflow
          await addWorkflow(workflowData);
          results.created++;
        }
        
        results.processed++;
      } catch (error) {
        console.error(`Error processing workflow ${n8nWorkflow.id}:`, error);
        results.errors.push(`Failed to process workflow ${n8nWorkflow.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} workflows`,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('n8n sync error:', error);
    return NextResponse.json(
      { error: 'Failed to process n8n sync', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to extract integrations from n8n nodes
function extractIntegrationsFromNodes(nodes: any[]): string[] {
  const integrations = new Set<string>();
  
  nodes.forEach(node => {
    if (node.type && node.type !== 'n8n-nodes-base.start' && node.type !== 'n8n-nodes-base.noOp') {
      // Extract service name from node type (e.g., 'n8n-nodes-base.gmail' -> 'Gmail')
      const serviceName = node.type.split('.').pop();
      if (serviceName) {
        // Capitalize first letter
        const formattedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        integrations.add(formattedName);
      }
    }
  });
  
  return Array.from(integrations);
}

// Helper function to generate a basic Mermaid chart from n8n workflow
function generateMermaidFromWorkflow(workflow: N8nWorkflow): string {
  try {
    const nodes = workflow.nodes || [];
    const connections = workflow.connections || {};
    
    if (nodes.length === 0) return '';
    
    let mermaid = 'flowchart TD\n';
    
    // Add nodes
    nodes.forEach(node => {
      const label = node.name || node.type?.split('.').pop() || 'Node';
      mermaid += `    ${node.name?.replace(/\s+/g, '_')}["${label}"]\n`;
    });
    
    // Add connections
    Object.entries(connections).forEach(([fromNode, nodeConnections]) => {
      Object.entries(nodeConnections as any).forEach(([outputIndex, connections]) => {
        (connections as any[]).forEach(connection => {
          const fromNodeId = fromNode.replace(/\s+/g, '_');
          const toNodeId = connection.node.replace(/\s+/g, '_');
          mermaid += `    ${fromNodeId} --> ${toNodeId}\n`;
        });
      });
    });
    
    return mermaid;
  } catch (error) {
    console.error('Error generating Mermaid chart:', error);
    return '';
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    endpoint: 'n8n-sync',
    status: 'ready',
    timestamp: new Date().toISOString(),
    description: 'Webhook endpoint for syncing workflows from n8n'
  });
}