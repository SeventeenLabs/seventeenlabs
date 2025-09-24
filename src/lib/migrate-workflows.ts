/**
 * Migration script to move workflows from static data to database
 * Run this script to import all existing workflows from workflows-data.ts into the database
 */

import { workflows } from '@/lib/workflows-data';
import { bulkImportWorkflows, getAllWorkflows } from '@/lib/workflow-db';

export async function migrateWorkflowsToDatabase() {
  try {
    console.log('Starting workflow migration...');
    
    // Check if workflows already exist in database
    const existingWorkflows = getAllWorkflows(false); // Get all including inactive
    if (existingWorkflows.length > 0) {
      console.log(`Database already contains ${existingWorkflows.length} workflows.`);
      console.log('Skipping migration. Use force migration if you want to re-import.');
      return {
        success: false,
        message: 'Database already contains workflows',
        existingCount: existingWorkflows.length
      };
    }
    
    // Transform static workflows to database format
    const workflowsToImport = workflows.map(workflow => ({
      title: workflow.title,
      description: workflow.description,
      longDescription: workflow.longDescription,
      category: workflow.category,
      difficulty: workflow.difficulty,
      time: workflow.time,
      users: workflow.users,
      rating: workflow.rating,
      integrations: workflow.integrations,
      price: workflow.price,
      isFree: workflow.isFree,
      features: workflow.features,
      requirements: workflow.requirements,
      videoUrl: workflow.videoUrl,
      mermaidChart: workflow.mermaidChart,
      previewChart: workflow.previewChart,
      stripeProductId: workflow.stripeProductId,
      stripePriceId: workflow.stripePriceId,
      tags: [], // Add empty tags array for new workflows
      author: 'SeventeenLabs', // Set default author
      version: '1.0' // Set default version
    }));
    
    // Import workflows
    const importedWorkflows = bulkImportWorkflows(workflowsToImport);
    
    console.log(`Successfully migrated ${importedWorkflows.length} workflows to database`);
    
    return {
      success: true,
      message: `Successfully migrated ${importedWorkflows.length} workflows`,
      importedWorkflows
    };
  } catch (error) {
    console.error('Error during migration:', error);
    return {
      success: false,
      message: 'Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Force migration - will import even if workflows exist
export async function forceMigrateWorkflowsToDatabase() {
  try {
    console.log('Starting FORCE workflow migration...');
    
    const existingWorkflows = getAllWorkflows(false);
    if (existingWorkflows.length > 0) {
      console.log(`Warning: Database contains ${existingWorkflows.length} workflows. Force migration will add duplicates.`);
    }
    
    // Transform static workflows to database format
    const workflowsToImport = workflows.map(workflow => ({
      title: workflow.title,
      description: workflow.description,
      longDescription: workflow.longDescription,
      category: workflow.category,
      difficulty: workflow.difficulty,
      time: workflow.time,
      users: workflow.users,
      rating: workflow.rating,
      integrations: workflow.integrations,
      price: workflow.price,
      isFree: workflow.isFree,
      features: workflow.features,
      requirements: workflow.requirements,
      videoUrl: workflow.videoUrl,
      mermaidChart: workflow.mermaidChart,
      previewChart: workflow.previewChart,
      stripeProductId: workflow.stripeProductId,
      stripePriceId: workflow.stripePriceId,
      tags: [],
      author: 'SeventeenLabs',
      version: '1.0'
    }));
    
    const importedWorkflows = bulkImportWorkflows(workflowsToImport);
    
    console.log(`Successfully force migrated ${importedWorkflows.length} workflows to database`);
    
    return {
      success: true,
      message: `Successfully force migrated ${importedWorkflows.length} workflows`,
      importedWorkflows,
      previousCount: existingWorkflows.length
    };
  } catch (error) {
    console.error('Error during force migration:', error);
    return {
      success: false,
      message: 'Force migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}