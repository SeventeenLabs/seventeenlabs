import { NextRequest, NextResponse } from 'next/server';
import { getWorkflowStats } from '@/lib/supabase-workflow-db';

// GET /api/workflows/stats - Get workflow statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await getWorkflowStats();
    
    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching workflow stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflow statistics' },
      { status: 500 }
    );
  }
}