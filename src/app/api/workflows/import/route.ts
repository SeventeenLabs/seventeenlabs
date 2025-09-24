import { NextRequest, NextResponse } from 'next/server';
import { bulkImportWorkflows } from '@/lib/supabase-workflow-db';

// POST /api/workflows/import - Bulk import workflows (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin users
    const { workflows } = await request.json();
    
    if (!Array.isArray(workflows)) {
      return NextResponse.json(
        { success: false, error: 'Workflows must be an array' },
        { status: 400 }
      );
    }
    
    const importedWorkflows = await bulkImportWorkflows(workflows);
    
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${importedWorkflows.length} workflows`,
      workflows: importedWorkflows
    }, { status: 201 });
  } catch (error) {
    console.error('Error importing workflows:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import workflows' },
      { status: 500 }
    );
  }
}