import { NextRequest, NextResponse } from 'next/server';
import { getAllWorkflows, getWorkflowById, addWorkflow, searchWorkflows, getWorkflowsByCategory } from '@/lib/supabase-workflow-db';

// GET /api/workflows - Get all workflows with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const popular = searchParams.get('popular');
    const highly_rated = searchParams.get('highly_rated');
    const limit = searchParams.get('limit');
    
    let workflows;
    
    if (search) {
      workflows = await searchWorkflows(search);
    } else if (category && category !== 'All Workflows') {
      workflows = await getWorkflowsByCategory(category);
    } else {
      workflows = await getAllWorkflows(true); // Only active workflows
      
      // Apply additional filters
      if (popular === 'true') {
        workflows = workflows
          .sort((a, b) => b.users - a.users)
          .slice(0, limit ? parseInt(limit) : 10);
      } else if (highly_rated === 'true') {
        const minRating = parseFloat(searchParams.get('min_rating') || '4.5');
        workflows = workflows
          .filter(w => w.rating >= minRating)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, limit ? parseInt(limit) : 10);
      }
    }
    
    return NextResponse.json({
      success: true,
      workflows,
      count: workflows.length
    });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflows' },
      { status: 500 }
    );
  }
}

// POST /api/workflows - Add a new workflow (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin users
    const workflowData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'difficulty', 'time', 'integrations', 'price'];
    for (const field of requiredFields) {
      if (!workflowData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Set defaults
    const workflowToAdd = {
      ...workflowData,
      users: workflowData.users || 0,
      rating: workflowData.rating || 0,
      isFree: workflowData.price === 0,
      features: workflowData.features || [],
      requirements: workflowData.requirements || [],
      tags: workflowData.tags || [],
      // Ensure n8nJsonUrl is passed through if provided
      n8nJsonUrl: workflowData.n8nJsonUrl || undefined
    };
    
    const newWorkflow = await addWorkflow(workflowToAdd);
    
    if (!newWorkflow) {
      return NextResponse.json(
        { success: false, error: 'Failed to create workflow' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      workflow: newWorkflow
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create workflow' },
      { status: 500 }
    );
  }
}