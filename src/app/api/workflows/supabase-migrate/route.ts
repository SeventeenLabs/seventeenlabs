import { NextRequest, NextResponse } from 'next/server';
import { migrateWorkflowsToSupabase, verifyMigration, createSupabaseBackup } from '@/lib/supabase-migration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, options } = body;
    
    switch (action) {
      case 'migrate':
        const migrationResult = await migrateWorkflowsToSupabase(options || {});
        return NextResponse.json(migrationResult);
      
      case 'verify':
        const verificationResult = await verifyMigration();
        return NextResponse.json(verificationResult);
      
      case 'backup':
        const backupResult = await createSupabaseBackup();
        return NextResponse.json(backupResult);
      
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action. Use: migrate, verify, or backup' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Migration API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `API error: ${error instanceof Error ? error.message : String(error)}` 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Workflow Migration API',
    endpoints: {
      'POST /api/workflows/supabase-migrate': {
        description: 'Migrate workflows from JSON to Supabase',
        actions: {
          migrate: {
            description: 'Migrate workflows to Supabase',
            options: {
              force: 'boolean - Force migration even if workflows exist',
              dryRun: 'boolean - Show what would be migrated without actually migrating'
            }
          },
          verify: {
            description: 'Verify migration by comparing file and Supabase data'
          },
          backup: {
            description: 'Create a backup of current Supabase data'
          }
        },
        example: {
          action: 'migrate',
          options: {
            force: false,
            dryRun: false
          }
        }
      }
    }
  });
}