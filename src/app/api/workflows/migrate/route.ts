import { NextRequest, NextResponse } from 'next/server';
import { migrateWorkflowsToDatabase, forceMigrateWorkflowsToDatabase } from '@/lib/migrate-workflows';

// POST /api/workflows/migrate - Migrate workflows from static data to database
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin users
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';
    
    let result;
    if (force) {
      result = await forceMigrateWorkflowsToDatabase();
    } else {
      result = await migrateWorkflowsToDatabase();
    }
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Error in migration API:', error);
    return NextResponse.json(
      { success: false, error: 'Migration API failed' },
      { status: 500 }
    );
  }
}