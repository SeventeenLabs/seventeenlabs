// n8n API client for direct integration capabilities
import { WorkflowData } from './workflow-db';

interface N8nConfig {
  baseUrl: string;
  apiKey: string;
}

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
  createdAt: string;
  updatedAt: string;
  tags?: Array<{
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  }>;
  shared?: Array<{
    projectId: string;
    role: string;
    workflowId: string;
    createdAt?: string;
    updatedAt?: string;
  }>;
}

export class N8nApiClient {
  private config: N8nConfig;

  constructor(config: N8nConfig) {
    this.config = config;
  }

  /**
   * Test the n8n API connection with different auth methods
   */
  async testConnection(): Promise<{ connected: boolean; user?: any; error?: string }> {
    try {
      // Method 1: X-N8N-API-KEY header (preferred method)
      try {
        const response = await fetch(`${this.config.baseUrl}/workflows`, {
          headers: {
            'X-N8N-API-KEY': this.config.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const workflows = await response.json();
          return { connected: true, user: { workflowCount: workflows.length } };
        }
      } catch (headerError) {
        console.log('X-N8N-API-KEY auth failed:', headerError);
      }

      // Method 2: Bearer token (fallback)
      try {
        const user = await this.makeRequest('/workflows'); // Using makeRequest which now uses X-N8N-API-KEY
        return { connected: true, user };
      } catch (bearerError) {
        console.log('Bearer token auth failed:', bearerError);
      }

      return { connected: false, error: 'All authentication methods failed' };
    } catch (error) {
      return { connected: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'X-N8N-API-KEY': this.config.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`n8n API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  // Get all workflows from n8n (filtered by tag if specified)
  async getAllWorkflows(tagName?: string): Promise<N8nWorkflow[]> {
    const response = await this.makeRequest('/workflows');
    const workflows = response.data || response; // Handle both {data: [...]} and [...] responses
    
    // If tag name is specified, filter workflows by tag
    if (tagName) {
      return workflows.filter((workflow: N8nWorkflow) => {
        // Check if workflow has the specified tag
        const tags = workflow.tags || [];
        const hasTag = tags.some(tag => 
          tag.name?.toLowerCase() === tagName.toLowerCase()
        );
        
        return hasTag;
      });
    }
    
    return workflows;
  }

  // Get SeventeenLabs workflows specifically (by tag)
  async getSeventeenLabsWorkflows(): Promise<N8nWorkflow[]> {
    // Return workflows tagged with "SeventeenLabs_Workflow"
    return this.getAllWorkflows('SeventeenLabs_Workflow');
  }

  // Get specific workflow by ID
  async getWorkflow(id: string): Promise<N8nWorkflow> {
    return this.makeRequest(`/workflows/${id}`);
  }

  // Get workflow execution statistics
  async getWorkflowStats(id: string) {
    return this.makeRequest(`/executions?workflowId=${id}&limit=100`);
  }

  // Validate workflow exists and is accessible
  async validateWorkflow(id: string): Promise<boolean> {
    try {
      await this.getWorkflow(id);
      return true;
    } catch {
      return false;
    }
  }

  // Sync single workflow
  async syncWorkflow(n8nId: string): Promise<Partial<WorkflowData> | null> {
    try {
      const n8nWorkflow = await this.getWorkflow(n8nId);
      
      // Convert to our format (similar to webhook sync)
      return {
        n8nId: n8nWorkflow.id,
        n8nVersionId: n8nWorkflow.versionId || '',
        title: n8nWorkflow.name,
        category: 'Automation', // Default - will be overridden by marketplace data
        description: `Workflow: ${n8nWorkflow.name}`,
        difficulty: 'Intermediate' as const,
        time: '30 min',
        price: 0,
        isFree: true,
        users: 0,
        rating: 0,
        integrations: this.extractIntegrations(n8nWorkflow.nodes),
        features: [],
        requirements: [],
        videoUrl: '',
        mermaidChart: '',
        lastSyncAt: new Date().toISOString(),
        n8nData: {
          nodes: n8nWorkflow.nodes,
          connections: n8nWorkflow.connections,
          settings: n8nWorkflow.settings,
          staticData: n8nWorkflow.staticData,
          pinData: n8nWorkflow.pinData,
        }
      };
    } catch (error) {
      console.error('Failed to sync workflow from n8n:', error);
      return null;
    }
  }

  // Bulk sync all workflows (SeventeenLabs folder only)
  async syncAllWorkflows(): Promise<Partial<WorkflowData>[]> {
    try {
      // Only get workflows from SeventeenLabs folder
      const n8nWorkflows = await this.getSeventeenLabsWorkflows();
      const synced: Partial<WorkflowData>[] = [];

      for (const workflow of n8nWorkflows) {
        const syncedWorkflow = await this.syncWorkflow(workflow.id);
        if (syncedWorkflow) {
          synced.push(syncedWorkflow);
        }
      }

      return synced;
    } catch (error) {
      console.error('Failed to sync SeventeenLabs workflows from n8n:', error);
      return [];
    }
  }

  private extractIntegrations(nodes: any[]): string[] {
    const integrations = new Set<string>();
    
    nodes.forEach(node => {
      if (node.type && !node.type.includes('start') && !node.type.includes('noOp')) {
        const serviceName = node.type.split('.').pop();
        if (serviceName) {
          integrations.add(serviceName.charAt(0).toUpperCase() + serviceName.slice(1));
        }
      }
    });
    
    return Array.from(integrations);
  }
}

// Singleton instance
let n8nClient: N8nApiClient | null = null;

export function getN8nClient(): N8nApiClient {
  if (!n8nClient) {
    const config = {
      baseUrl: (process.env.N8N_API_BASE_URL || 'http://localhost:5678') + '/api/v1',
      apiKey: process.env.N8N_API_KEY || 'your-n8n-api-key',
    };
    n8nClient = new N8nApiClient(config);
  }
  return n8nClient;
}

// Health check
export async function checkN8nConnection(): Promise<{connected: boolean, seventeenLabsWorkflows?: number, totalWorkflows?: number, error?: string}> {
  try {
    const client = getN8nClient();
    
    // First test basic connection
    const connectionTest = await client.testConnection();
    if (!connectionTest.connected) {
      return { 
        connected: false, 
        error: connectionTest.error 
      };
    }
    
    // If connection works, try to get workflows
    try {
      const allWorkflows = await client.getAllWorkflows();
      const seventeenLabsWorkflows = await client.getSeventeenLabsWorkflows();
      
      return {
        connected: true,
        totalWorkflows: allWorkflows.length,
        seventeenLabsWorkflows: seventeenLabsWorkflows.length
      };
    } catch (workflowError) {
      // Connection works but workflow access fails
      return {
        connected: true,
        totalWorkflows: 0,
        seventeenLabsWorkflows: 0,
        error: workflowError instanceof Error ? workflowError.message : 'Workflow access error'
      };
    }
  } catch (error) {
    console.error('n8n connection check failed:', error);
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}