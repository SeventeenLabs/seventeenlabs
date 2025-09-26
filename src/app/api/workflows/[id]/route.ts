import { NextRequest, NextResponse } from 'next/server';
import { getWorkflowById, updateWorkflow, deleteWorkflow } from '@/lib/supabase-workflow-db';

// GET /api/workflows/[id] - Get workflow by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid workflow ID' },
        { status: 400 }
      );
    }
    
    const workflow = await getWorkflowById(id);
    
    if (!workflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      workflow
    });
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflow' },
      { status: 500 }
    );
  }
}

// PUT /api/workflows/[id] - Update workflow (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin users
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid workflow ID' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    
    // Handle isFree and price logic
    if ('isFree' in updateData) {
      if (updateData.isFree) {
        updateData.price = 0;
      }
    } else if ('price' in updateData) {
      updateData.isFree = updateData.price === 0;
    }
    
    const updatedWorkflow = await updateWorkflow(id, updateData);
    
    if (!updatedWorkflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow not found or failed to update' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      workflow: updatedWorkflow
    });
  } catch (error) {
    console.error('Error updating workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update workflow' },
      { status: 500 }
    );
  }
}

// DELETE /api/workflows/[id] - Delete workflow (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin users
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid workflow ID' },
        { status: 400 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const hard = searchParams.get('hard') === 'true';
    
    let success;
    if (hard) {
      // Hard delete - remove from database completely
      const { hardDeleteWorkflow } = await import('@/lib/supabase-workflow-db');
      success = await hardDeleteWorkflow(id);
    } else {
      // Soft delete - set isActive to false
      success = await deleteWorkflow(id);
    }
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Workflow not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Workflow ${hard ? 'permanently deleted' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error deleting workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete workflow' },
      { status: 500 }
    );
  }
}