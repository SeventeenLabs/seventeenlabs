/**
 * Migration script to move workflows from file-based storage to Supabase
 * This script will:
 * 1. Read existing workflows from data/workflows.json
 * 2. Upload workflow JSON data to Supabase Storage
 * 3. Insert workflow metadata into Supabase database
 * 4. Preserve all existing data and relationships
 */

import { getAllWorkflows as getFileBasedWorkflows } from './workflow-db';
import { 
  addWorkflow,
  getAllWorkflows as getSupabaseWorkflows
} from './supabase-workflow-db';
import { initializeWorkflowStorage } from './storage';

export interface MigrationResult {
  success: boolean;
  message: string;
  migratedCount?: number;
  errors?: string[];
  skippedCount?: number;
}

/**
 * Check if Supabase is properly configured
 */
function checkSupabaseConfig(): boolean {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    return false;
  }
  
  return true;
}

/**
 * Migrate workflows from JSON file to Supabase
 */
export async function migrateWorkflowsToSupabase(options: {
  force?: boolean;
  dryRun?: boolean;
} = {}): Promise<MigrationResult> {
  const { force = false, dryRun = false } = options;
  
  try {
    console.log('🚀 Starting workflow migration to Supabase...');
    
    // Check Supabase configuration
    if (!checkSupabaseConfig()) {
      return {
        success: false,
        message: 'Supabase configuration is incomplete. Please set all required environment variables.'
      };
    }
    
    // Initialize storage bucket
    console.log('📦 Initializing Supabase storage...');
    const storageInitialized = await initializeWorkflowStorage();
    if (!storageInitialized) {
      return {
        success: false,
        message: 'Failed to initialize Supabase storage bucket.'
      };
    }
    
    // Load existing workflows from JSON file
    console.log('📖 Loading workflows from JSON file...');
    const fileBasedWorkflows = getFileBasedWorkflows(false); // Get all, including inactive
    
    if (fileBasedWorkflows.length === 0) {
      return {
        success: false,
        message: 'No workflows found in JSON file to migrate.'
      };
    }
    
    console.log(`Found ${fileBasedWorkflows.length} workflows in JSON file`);
    
    // Check if Supabase already has workflows
    console.log('🔍 Checking existing workflows in Supabase...');
    const existingSupabaseWorkflows = await getSupabaseWorkflows(false);
    
    if (!force && existingSupabaseWorkflows.length > 0) {
      return {
        success: false,
        message: `Supabase already contains ${existingSupabaseWorkflows.length} workflows. Use force=true to migrate anyway.`
      };
    }
    
    if (dryRun) {
      console.log('🏃 Dry run mode - no actual migration will be performed');
      return {
        success: true,
        message: `Dry run: Would migrate ${fileBasedWorkflows.length} workflows to Supabase.`,
        migratedCount: 0
      };
    }
    
    // Transform file-based workflows to Supabase format
    console.log('🔄 Transforming workflow data...');
    const workflowsToMigrate = fileBasedWorkflows.map(workflow => ({
      title: workflow.title,
      description: workflow.description,
      longDescription: workflow.longDescription,
      category: workflow.category,
      difficulty: workflow.difficulty,
      time: workflow.time,
      users: workflow.users,
      rating: workflow.rating,
      integrations: workflow.integrations || [],
      price: workflow.price,
      isFree: workflow.isFree,
      features: workflow.features,
      requirements: workflow.requirements,
      videoUrl: workflow.videoUrl,
      mermaidChart: workflow.mermaidChart,
      previewChart: workflow.previewChart,
      stripeProductId: workflow.stripeProductId,
      stripePriceId: workflow.stripePriceId,
      tags: workflow.tags || [],
      author: workflow.author || 'SeventeenLabs',
      version: workflow.version || '1.0',
      n8nId: workflow.n8nId,
      n8nVersionId: workflow.n8nVersionId,
      lastSyncAt: workflow.lastSyncAt,
      n8nData: workflow.n8nData,
      // Preserve timestamps if they exist
      ...(workflow.createdAt && { createdAt: workflow.createdAt }),
      ...(workflow.updatedAt && { updatedAt: workflow.updatedAt }),
      isActive: workflow.isActive ?? true
    }));
    
    // Migrate workflows one by one for better error handling
    console.log('💾 Migrating workflows to Supabase...');
    const errors: string[] = [];
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (let i = 0; i < workflowsToMigrate.length; i++) {
      const workflow = workflowsToMigrate[i];
      console.log(`Migrating ${i + 1}/${workflowsToMigrate.length}: ${workflow.title}`);
      
      try {
        // Check if workflow with same n8nId already exists (if n8nId is present)
        if (workflow.n8nId) {
          const existingWorkflow = existingSupabaseWorkflows.find(w => w.n8nId === workflow.n8nId);
          if (existingWorkflow && !force) {
            console.log(`  ⏭️  Skipping: Workflow with n8nId ${workflow.n8nId} already exists`);
            skippedCount++;
            continue;
          }
        }
        
        const migratedWorkflow = await addWorkflow(workflow);
        
        if (migratedWorkflow) {
          console.log(`  ✅ Successfully migrated: ${workflow.title} (ID: ${migratedWorkflow.id})`);
          migratedCount++;
        } else {
          const error = `Failed to migrate workflow: ${workflow.title}`;
          console.log(`  ❌ ${error}`);
          errors.push(error);
        }
      } catch (error) {
        const errorMessage = `Error migrating workflow "${workflow.title}": ${error instanceof Error ? error.message : String(error)}`;
        console.log(`  ❌ ${errorMessage}`);
        errors.push(errorMessage);
      }
    }
    
    // Summary
    console.log('\n📊 Migration Summary:');
    console.log(`  ✅ Successfully migrated: ${migratedCount}`);
    console.log(`  ⏭️  Skipped: ${skippedCount}`);
    console.log(`  ❌ Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
    
    return {
      success: errors.length === 0 || migratedCount > 0,
      message: `Migration completed. ${migratedCount} workflows migrated successfully.`,
      migratedCount,
      skippedCount,
      errors: errors.length > 0 ? errors : undefined
    };
    
  } catch (error) {
    const errorMessage = `Migration failed: ${error instanceof Error ? error.message : String(error)}`;
    console.error('💥', errorMessage);
    
    return {
      success: false,
      message: errorMessage
    };
  }
}

/**
 * Verify migration by comparing data between file and Supabase
 */
export async function verifyMigration(): Promise<{
  success: boolean;
  message: string;
  fileCount: number;
  supabaseCount: number;
  discrepancies?: string[];
}> {
  try {
    console.log('🔍 Verifying migration...');
    
    const fileWorkflows = getFileBasedWorkflows(false);
    const supabaseWorkflows = await getSupabaseWorkflows(false);
    
    console.log(`File-based workflows: ${fileWorkflows.length}`);
    console.log(`Supabase workflows: ${supabaseWorkflows.length}`);
    
    const discrepancies: string[] = [];
    
    // Check if all file workflows exist in Supabase
    for (const fileWorkflow of fileWorkflows) {
      const matchingSupabaseWorkflow = supabaseWorkflows.find(sw => 
        sw.title === fileWorkflow.title && 
        sw.description === fileWorkflow.description
      );
      
      if (!matchingSupabaseWorkflow) {
        discrepancies.push(`Workflow "${fileWorkflow.title}" not found in Supabase`);
      }
    }
    
    const success = discrepancies.length === 0;
    
    return {
      success,
      message: success 
        ? 'Migration verification passed. All workflows successfully migrated.' 
        : `Migration verification found ${discrepancies.length} discrepancies.`,
      fileCount: fileWorkflows.length,
      supabaseCount: supabaseWorkflows.length,
      discrepancies: discrepancies.length > 0 ? discrepancies : undefined
    };
    
  } catch (error) {
    return {
      success: false,
      message: `Verification failed: ${error instanceof Error ? error.message : String(error)}`,
      fileCount: 0,
      supabaseCount: 0
    };
  }
}

/**
 * Create a backup of current Supabase data before migration
 */
export async function createSupabaseBackup(): Promise<{
  success: boolean;
  message: string;
  backupData?: any;
}> {
  try {
    console.log('💾 Creating Supabase backup...');
    
    const workflows = await getSupabaseWorkflows(false);
    
    const backup = {
      timestamp: new Date().toISOString(),
      workflowCount: workflows.length,
      workflows: workflows
    };
    
    // In a real implementation, you might want to save this to a file
    // For now, we'll just return the data
    
    return {
      success: true,
      message: `Backup created successfully with ${workflows.length} workflows`,
      backupData: backup
    };
    
  } catch (error) {
    return {
      success: false,
      message: `Backup failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}