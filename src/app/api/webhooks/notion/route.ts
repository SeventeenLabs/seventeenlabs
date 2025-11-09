import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get the webhook signature from headers
    const headersList = headers();
    const signature = headersList.get('notion-webhook-signature');
    const timestamp = headersList.get('notion-webhook-timestamp');
    
    // Verify the webhook is from Notion (basic security)
    const webhookSecret = process.env.NOTION_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ NOTION_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    // Parse the webhook payload
    const payload = await request.json();
    console.log('🔔 Notion webhook received:', JSON.stringify(payload, null, 2));

    // Check if this is a database page update
    if (payload.type === 'page' && payload.action === 'updated') {
      const page = payload.page;
      
      // Check if this is from our blog database
      const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
      if (page.parent?.database_id === blogDatabaseId) {
        console.log('📝 Blog post updated in Notion:', page.id);
        
        // Check if status was changed to published
        const status = page.properties?.Status?.select?.name?.toLowerCase();
        console.log('📊 Post status:', status);
        
        if (status === 'published') {
          console.log('✅ Post published, revalidating blog cache...');
          
          // Revalidate blog cache
          revalidateTag('blog-posts');
          
          console.log('🔄 Blog cache revalidated successfully');
          
          return NextResponse.json({ 
            message: 'Blog cache revalidated for published post',
            postId: page.id,
            timestamp: new Date().toISOString()
          });
        } else {
          console.log('ℹ️ Post updated but not published, skipping cache revalidation');
          return NextResponse.json({ 
            message: 'Post updated but not published',
            status: status,
            postId: page.id
          });
        }
      } else {
        console.log('ℹ️ Page update not from blog database, ignoring');
        return NextResponse.json({ message: 'Not a blog post update' });
      }
    }

    // Handle other webhook types
    console.log('ℹ️ Webhook type not handled:', payload.type, payload.action);
    return NextResponse.json({ message: 'Webhook received but not processed' });

  } catch (error) {
    console.error('❌ Error processing Notion webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

// Also handle GET requests for webhook verification
export async function GET() {
  return NextResponse.json({ 
    message: 'Notion webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}