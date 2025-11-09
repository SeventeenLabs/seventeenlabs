import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get the webhook signature from headers
    const headersList = await headers();
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
    
    // Handle webhook verification (this happens when setting up the webhook)
    if (payload.type === 'url_verification') {
      console.log('🔍 Webhook verification request received');
      const challenge = payload.challenge;
      
      if (challenge) {
        console.log('✅ Responding to webhook verification challenge');
        return NextResponse.json({ challenge });
      } else {
        console.error('❌ No challenge found in verification request');
        return NextResponse.json({ error: 'No challenge provided' }, { status: 400 });
      }
    }
    console.log('🔔 Notion webhook received:', JSON.stringify(payload, null, 2));

    // Check if this is any page-related update
    if (payload.type === 'page.properties_updated' || 
        payload.type === 'page.content_updated' || 
        payload.type === 'page.created') {
      const pageId = payload.entity?.id;
      const parentDatabaseId = payload.data?.parent?.id;
      
      // Check if this is from our blog database
      const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
      console.log('🔍 Comparing database IDs:');
      console.log('  Webhook parent DB:', parentDatabaseId);
      console.log('  Blog database ID:', blogDatabaseId);
      
      if (parentDatabaseId === blogDatabaseId) {
        console.log('📝 Blog post updated in Notion:', pageId);
        
        // Since we can't get the status from the webhook payload directly,
        // we need to fetch the page details to check if it's published
        try {
          const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
            headers: {
              'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
              'Content-Type': 'application/json',
              'Notion-Version': '2022-06-28',
            },
          });
          
          if (response.ok) {
            const pageData = await response.json();
            const status = pageData.properties?.Status?.select?.name?.toLowerCase();
            console.log('📊 Post status:', status);
            
            if (status === 'published') {
              console.log('✅ Post published, revalidating blog cache...');
              
              // Revalidate blog cache
              revalidateTag('blog-posts');
              
              console.log('🔄 Blog cache revalidated successfully');
              
              return NextResponse.json({ 
                message: 'Blog cache revalidated for published post',
                postId: pageId,
                status: status,
                timestamp: new Date().toISOString()
              });
            } else {
              console.log('ℹ️ Post updated but not published, skipping cache revalidation');
              return NextResponse.json({ 
                message: 'Post updated but not published',
                status: status,
                postId: pageId
              });
            }
          } else {
            console.error('❌ Failed to fetch page details:', response.statusText);
            // Revalidate anyway in case of API issues
            revalidateTag('blog-posts');
            return NextResponse.json({ 
              message: 'Page updated, revalidated cache as fallback',
              postId: pageId
            });
          }
        } catch (error) {
          console.error('❌ Error fetching page details:', error);
          // Revalidate anyway in case of API issues
          revalidateTag('blog-posts');
          return NextResponse.json({ 
            message: 'Page updated, revalidated cache as fallback',
            postId: pageId
          });
        }
      } else {
        console.log('ℹ️ Page update not from blog database, ignoring');
        return NextResponse.json({ message: 'Not a blog post update' });
      }
    }

    // Handle other webhook types
    console.log('ℹ️ Webhook type not handled:', payload.type);
    return NextResponse.json({ 
      message: 'Webhook received but not processed',
      type: payload.type,
      timestamp: new Date().toISOString()
    });

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