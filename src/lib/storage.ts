import { supabaseAdmin } from './supabase';

// Storage bucket name for workflow files
export const WORKFLOW_FILES_BUCKET = 'workflow-files';

/**
 * Upload a workflow JSON file to Supabase Storage
 */
export async function uploadWorkflowJson(workflowId: number, jsonData: any): Promise<string | null> {
  try {
    const fileName = `workflow-${workflowId}-${Date.now()}.json`;
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    const { data, error } = await supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .upload(fileName, jsonString, {
        contentType: 'application/json',
        upsert: false
      });

    if (error) {
      console.error('Error uploading workflow JSON:', error);
      return null;
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading workflow JSON:', error);
    return null;
  }
}

/**
 * Update an existing workflow JSON file in Supabase Storage
 */
export async function updateWorkflowJson(currentJsonUrl: string, jsonData: any): Promise<string | null> {
  try {
    // Extract the file path from the URL
    const urlParts = currentJsonUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    const { data, error } = await supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .update(fileName, jsonString, {
        contentType: 'application/json',
        upsert: true
      });

    if (error) {
      console.error('Error updating workflow JSON:', error);
      return null;
    }

    return currentJsonUrl; // Return the same URL since we're updating in place
  } catch (error) {
    console.error('Error updating workflow JSON:', error);
    return null;
  }
}

/**
 * Download and parse a workflow JSON file from Supabase Storage
 */
export async function downloadWorkflowJson(jsonUrl: string): Promise<any | null> {
  try {
    const response = await fetch(jsonUrl);
    
    if (!response.ok) {
      console.error('Failed to fetch workflow JSON:', response.statusText);
      return null;
    }
    
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error downloading workflow JSON:', error);
    return null;
  }
}

/**
 * Delete a workflow JSON file from Supabase Storage
 */
export async function deleteWorkflowJson(jsonUrl: string): Promise<boolean> {
  try {
    // Extract the file path from the URL
    const urlParts = jsonUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    const { error } = await supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting workflow JSON:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting workflow JSON:', error);
    return false;
  }
}

/**
 * List all workflow JSON files in the bucket
 */
export async function listWorkflowJsonFiles() {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .list();

    if (error) {
      console.error('Error listing workflow JSON files:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error listing workflow JSON files:', error);
    return [];
  }
}

/**
 * Initialize the storage bucket (call this during setup)
 */
export async function initializeWorkflowStorage() {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === WORKFLOW_FILES_BUCKET);
    
    if (!bucketExists) {
      // Create the bucket
      const { data, error: createError } = await supabaseAdmin.storage.createBucket(
        WORKFLOW_FILES_BUCKET,
        {
          public: true,
          allowedMimeTypes: ['application/json'],
          fileSizeLimit: 50 * 1024 * 1024 // 50MB limit
        }
      );
      
      if (createError) {
        console.error('Error creating workflow files bucket:', createError);
        return false;
      }
      
      console.log('Created workflow files bucket successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing workflow storage:', error);
    return false;
  }
}

/**
 * Generate a workflow JSON file from n8n data
 */
export function generateWorkflowJsonFromN8nData(workflow: {
  n8nId?: string;
  n8nVersionId?: string;
  title: string;
  n8nData?: any;
}): any {
  if (workflow.n8nData) {
    return {
      name: workflow.title,
      nodes: workflow.n8nData.nodes || [],
      connections: workflow.n8nData.connections || {},
      settings: workflow.n8nData.settings || { executionOrder: 'v1' },
      staticData: workflow.n8nData.staticData || null,
      pinData: workflow.n8nData.pinData || {},
      versionId: workflow.n8nVersionId,
      meta: {
        templateCredsSetupCompleted: false,
        instanceId: undefined
      },
      id: workflow.n8nId,
      tags: []
    };
  }
  
  // Fallback for workflows without n8n data
  return {
    name: workflow.title,
    nodes: [
      {
        parameters: {},
        type: "n8n-nodes-base.start",
        typeVersion: 1,
        position: [240, 300],
        id: "start-node",
        name: "Start"
      }
    ],
    connections: {},
    settings: { executionOrder: 'v1' },
    staticData: null,
    pinData: {},
    tags: []
  };
}