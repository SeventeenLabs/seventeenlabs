import { NextRequest, NextResponse } from 'next/server';

interface N8nNode {
  id: string;
  name: string;
  type: string;
  typeVersion?: number;
  position: [number, number];
  parameters?: any;
  credentials?: any;
}

interface N8nWorkflow {
  name: string;
  nodes: N8nNode[];
  connections: any;
  createdAt?: string;
  updatedAt?: string;
  versionId?: string;
  id?: string;
  settings?: any;
  meta?: any;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided'
      }, { status: 400 });
    }
    
    if (!file.name.endsWith('.json')) {
      return NextResponse.json({
        success: false,
        error: 'Only JSON files are supported'
      }, { status: 400 });
    }
    
    // Read and validate the file
    const fileContent = await file.text();
    let workflow: N8nWorkflow;
    
    try {
      workflow = JSON.parse(fileContent);
    } catch (parseError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid JSON file'
      }, { status: 400 });
    }
    
    // Basic validation
    if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid n8n workflow format - missing nodes array'
      }, { status: 400 });
    }
    
    // Forward to external n8n workflow analyzer
    const analyzeFormData = new FormData();
    analyzeFormData.append('workflow', fileContent);
    
    const response = await fetch('https://n8n.srv1010269.hstgr.cloud/webhook/workflow-analyzer', {
      method: 'POST',
      body: analyzeFormData,
    });
    
    if (!response.ok) {
      throw new Error(`External analyzer failed: ${response.status}`);
    }
    
    const analysisResult = await response.json();
    
    // Extract the actual data from the n8n response format
    let workflowData;
    if (Array.isArray(analysisResult) && analysisResult.length > 0 && analysisResult[0].output) {
      workflowData = analysisResult[0].output;
    } else {
      // Fallback if the format is different
      workflowData = analysisResult;
    }
    
    // Normalize difficulty values to match database constraints
    if (workflowData && workflowData.difficulty) {
      const difficultyMap: { [key: string]: string } = {
        'Easy': 'Beginner',
        'Medium': 'Intermediate', 
        'Hard': 'Advanced',
        'Simple': 'Beginner',
        'Complex': 'Advanced'
      };
      
      // Apply mapping if needed, otherwise keep original if it's valid
      const normalizedDifficulty = difficultyMap[workflowData.difficulty] || workflowData.difficulty;
      
      // Ensure it's one of the valid values
      if (['Beginner', 'Intermediate', 'Advanced'].includes(normalizedDifficulty)) {
        workflowData.difficulty = normalizedDifficulty;
      } else {
        // Default to Beginner if unrecognized
        workflowData.difficulty = 'Beginner';
      }
    }
    
    return NextResponse.json({
      success: true,
      data: workflowData
    });
    
  } catch (error) {
    console.error('Error analyzing workflow:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze workflow file'
    }, { status: 500 });
  }
}