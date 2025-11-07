import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Check for authorization (you should add proper auth here)
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATE_SECRET;
    
    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Revalidate blog cache
    revalidateTag('blog-posts');
    
    return NextResponse.json({ 
      message: 'Blog cache revalidated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revalidating blog cache:', error);
    return NextResponse.json(
      { message: 'Error revalidating cache' },
      { status: 500 }
    );
  }
}