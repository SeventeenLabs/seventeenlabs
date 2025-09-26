import { supabaseAdmin, WorkflowRow, WorkflowUpdate } from './supabase';
import { uploadWorkflowJson, updateWorkflowJson, deleteWorkflowJson, generateWorkflowJsonFromN8nData } from './storage';

// Interface for the complete workflow data structure
export interface WorkflowData {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  users: number;
  rating: number;
  integrations: string[];
  price: number;
  isFree: boolean;
  features?: string[];
  requirements?: string[];
  videoUrl?: string;
  mermaidChart?: string;
  previewChart?: string;
  stripeProductId?: string;
  stripePriceId?: string;
  tags?: string[];
  author?: string;
  version?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  // n8n integration fields
  n8nId?: string;
  n8nVersionId?: string;
  lastSyncAt?: string;
  n8nJsonUrl?: string;
  n8nData?: {
    nodes: any[];
    connections: any;
    settings?: any;
    staticData?: any;
    pinData?: any;
  };
}

/**
 * Convert database row to WorkflowData format
 */
function convertRowToWorkflowData(row: WorkflowRow): WorkflowData {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description || undefined,
    category: row.category,
    difficulty: row.difficulty,
    time: row.time,
    users: row.users,
    rating: row.rating,
    integrations: row.integrations || [],
    price: row.price,
    isFree: row.is_free,
    features: row.features || [],
    requirements: row.requirements || [],
    videoUrl: row.video_url || undefined,
    mermaidChart: row.mermaid_chart || undefined,
    previewChart: row.preview_chart || undefined,
    stripeProductId: row.stripe_product_id || undefined,
    stripePriceId: row.stripe_price_id || undefined,
    tags: row.tags || [],
    author: row.author,
    version: row.version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    isActive: row.is_active,
    n8nId: row.n8n_id || undefined,
    n8nVersionId: row.n8n_version_id || undefined,
    lastSyncAt: row.last_sync_at || undefined,
    n8nJsonUrl: row.n8n_json_url || undefined,
  };
}

/**
 * Get all workflows (active by default)
 */
export async function getAllWorkflows(activeOnly: boolean = true): Promise<WorkflowData[]> {
  try {
    let query = supabaseAdmin
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching workflows:', error);
      return [];
    }
    
    return data.map(convertRowToWorkflowData);
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return [];
  }
}

/**
 * Get a single workflow by ID
 */
export async function getWorkflowById(id: number): Promise<WorkflowData | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching workflow:', error);
      return null;
    }
    
    return convertRowToWorkflowData(data);
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return null;
  }
}

/**
 * Get workflows by category
 */
export async function getWorkflowsByCategory(category: string): Promise<WorkflowData[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching workflows by category:', error);
      return [];
    }
    
    return data.map(convertRowToWorkflowData);
  } catch (error) {
    console.error('Error fetching workflows by category:', error);
    return [];
  }
}

/**
 * Search workflows
 */
export async function searchWorkflows(query: string): Promise<WorkflowData[]> {
  try {
    const searchQuery = `%${query.toLowerCase()}%`;
    
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select('*')
      .eq('is_active', true)
      .or(`title.ilike.${searchQuery},description.ilike.${searchQuery},long_description.ilike.${searchQuery}`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching workflows:', error);
      return [];
    }
    
    return data.map(convertRowToWorkflowData);
  } catch (error) {
    console.error('Error searching workflows:', error);
    return [];
  }
}

/**
 * Add a new workflow
 */
export async function addWorkflow(workflowData: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<WorkflowData | null> {
  try {
    // Upload JSON file if n8nData exists
    let jsonUrl: string | null = null;
    if (workflowData.n8nData) {
      // We'll update this after getting the workflow ID
      jsonUrl = 'placeholder';
    }
    
    const { data: workflow, error } = await supabaseAdmin
      .from('workflows')
      .insert({
        title: workflowData.title,
        description: workflowData.description,
        long_description: workflowData.longDescription || null,
        category: workflowData.category,
        difficulty: workflowData.difficulty || 'Intermediate',
        time: workflowData.time,
        users: workflowData.users || 0,
        rating: workflowData.rating || 0,
        integrations: workflowData.integrations || [],
        features: workflowData.features || [],
        requirements: workflowData.requirements || [],
        tags: workflowData.tags || [],
        price: workflowData.price || 0,
        is_free: workflowData.isFree ?? true,
        stripe_product_id: workflowData.stripeProductId || null,
        stripe_price_id: workflowData.stripePriceId || null,
        video_url: workflowData.videoUrl || null,
        mermaid_chart: workflowData.mermaidChart || null,
        preview_chart: workflowData.previewChart || null,
        n8n_id: workflowData.n8nId || null,
        n8n_version_id: workflowData.n8nVersionId || null,
        n8n_json_url: workflowData.n8nJsonUrl || null, // Handle direct n8nJsonUrl
        last_sync_at: workflowData.lastSyncAt || null,
        author: workflowData.author || 'SeventeenLabs',
        version: workflowData.version || '1.0',
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating workflow:', error);
      return null;
    }
    
    // Upload JSON file with actual workflow ID
    if (workflowData.n8nData && workflow) {
      const jsonData = generateWorkflowJsonFromN8nData({
        n8nId: workflowData.n8nId,
        n8nVersionId: workflowData.n8nVersionId,
        title: workflowData.title,
        n8nData: workflowData.n8nData,
      });
      
      jsonUrl = await uploadWorkflowJson(workflow.id, jsonData);
      
      if (jsonUrl) {
        // Update the workflow with the JSON URL
        await supabaseAdmin
          .from('workflows')
          .update({ n8n_json_url: jsonUrl })
          .eq('id', workflow.id);
        
        workflow.n8n_json_url = jsonUrl;
      }
    }
    
    return convertRowToWorkflowData(workflow);
  } catch (error) {
    console.error('Error adding workflow:', error);
    return null;
  }
}

/**
 * Update a workflow
 */
export async function updateWorkflow(id: number, updates: Partial<Omit<WorkflowData, 'id' | 'createdAt'>>): Promise<WorkflowData | null> {
  try {
    // Prepare the update object
    const updateData: Partial<WorkflowUpdate> = {};
    
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.longDescription !== undefined) updateData.long_description = updates.longDescription;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.difficulty !== undefined) updateData.difficulty = updates.difficulty;
    if (updates.time !== undefined) updateData.time = updates.time;
    if (updates.users !== undefined) updateData.users = updates.users;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.integrations !== undefined) updateData.integrations = updates.integrations;
    if (updates.features !== undefined) updateData.features = updates.features;
    if (updates.requirements !== undefined) updateData.requirements = updates.requirements;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.isFree !== undefined) updateData.is_free = updates.isFree;
    if (updates.stripeProductId !== undefined) updateData.stripe_product_id = updates.stripeProductId;
    if (updates.stripePriceId !== undefined) updateData.stripe_price_id = updates.stripePriceId;
    if (updates.videoUrl !== undefined) updateData.video_url = updates.videoUrl;
    if (updates.mermaidChart !== undefined) updateData.mermaid_chart = updates.mermaidChart;
    if (updates.previewChart !== undefined) updateData.preview_chart = updates.previewChart;
    if (updates.n8nId !== undefined) updateData.n8n_id = updates.n8nId;
    if (updates.n8nVersionId !== undefined) updateData.n8n_version_id = updates.n8nVersionId;
    if (updates.n8nJsonUrl !== undefined) updateData.n8n_json_url = updates.n8nJsonUrl;
    if (updates.lastSyncAt !== undefined) updateData.last_sync_at = updates.lastSyncAt;
    if (updates.author !== undefined) updateData.author = updates.author;
    if (updates.version !== undefined) updateData.version = updates.version;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
    
    // Handle JSON file update if n8nData is provided
    if (updates.n8nData) {
      const currentWorkflow = await getWorkflowById(id);
      if (currentWorkflow) {
        const jsonData = generateWorkflowJsonFromN8nData({
          n8nId: updates.n8nId || currentWorkflow.n8nId,
          n8nVersionId: updates.n8nVersionId || currentWorkflow.n8nVersionId,
          title: updates.title || currentWorkflow.title,
          n8nData: updates.n8nData,
        });
        
        let jsonUrl: string | null = null;
        if (currentWorkflow.n8nJsonUrl) {
          jsonUrl = await updateWorkflowJson(currentWorkflow.n8nJsonUrl, jsonData);
        } else {
          jsonUrl = await uploadWorkflowJson(id, jsonData);
        }
        
        if (jsonUrl) {
          updateData.n8n_json_url = jsonUrl;
        }
      }
    }
    
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating workflow:', error);
      return null;
    }
    
    return convertRowToWorkflowData(data);
  } catch (error) {
    console.error('Error updating workflow:', error);
    return null;
  }
}

/**
 * Soft delete workflow (set isActive to false)
 */
export async function deleteWorkflow(id: number): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('workflows')
      .update({ is_active: false })
      .eq('id', id);
    
    if (error) {
      console.error('Error soft deleting workflow:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error soft deleting workflow:', error);
    return false;
  }
}

/**
 * Hard delete workflow (remove from database and storage)
 */
export async function hardDeleteWorkflow(id: number): Promise<boolean> {
  try {
    // Get the workflow to check for JSON file
    const workflow = await getWorkflowById(id);
    
    // Delete JSON file from storage if it exists
    if (workflow?.n8nJsonUrl) {
      await deleteWorkflowJson(workflow.n8nJsonUrl);
    }
    
    // Delete the workflow (cascade will handle related records)
    const { error } = await supabaseAdmin
      .from('workflows')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error hard deleting workflow:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error hard deleting workflow:', error);
    return false;
  }
}

/**
 * Get workflow statistics
 */
export async function getWorkflowStats() {
  try {
    const { data: totalData, error: totalError } = await supabaseAdmin
      .from('workflows')
      .select('id', { count: 'exact', head: true });
    
    const { data: activeData, error: activeError } = await supabaseAdmin
      .from('workflows')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);
    
    const { data: categoryData, error: categoryError } = await supabaseAdmin
      .from('workflows')
      .select('category')
      .eq('is_active', true);
    
    if (totalError || activeError || categoryError) {
      console.error('Error fetching workflow stats:', { totalError, activeError, categoryError });
      return {
        total: 0,
        active: 0,
        inactive: 0,
        categories: [],
        categoryStats: [],
      };
    }
    
    const total = totalData?.length || 0;
    const active = activeData?.length || 0;
    const inactive = total - active;
    
    // Calculate category stats
    const categories = [...new Set(categoryData?.map(w => w.category) || [])];
    const categoryStats = categories.map(category => ({
      category,
      count: categoryData?.filter(w => w.category === category).length || 0,
    }));
    
    return {
      total,
      active,
      inactive,
      categories,
      categoryStats,
    };
  } catch (error) {
    console.error('Error fetching workflow stats:', error);
    return {
      total: 0,
      active: 0,
      inactive: 0,
      categories: [],
      categoryStats: [],
    };
  }
}

/**
 * Get workflow by n8n ID
 */
export async function getWorkflowByN8nId(n8nId: string): Promise<WorkflowData | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select('*')
      .eq('n8n_id', n8nId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching workflow by n8n ID:', error);
      return null;
    }
    
    return convertRowToWorkflowData(data);
  } catch (error) {
    console.error('Error fetching workflow by n8n ID:', error);
    return null;
  }
}

/**
 * Bulk import workflows
 */
export async function bulkImportWorkflows(workflows: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>[]): Promise<WorkflowData[]> {
  const imported: WorkflowData[] = [];
  
  for (const workflowData of workflows) {
    const imported_workflow = await addWorkflow(workflowData);
    if (imported_workflow) {
      imported.push(imported_workflow);
    }
  }
  
  return imported;
}