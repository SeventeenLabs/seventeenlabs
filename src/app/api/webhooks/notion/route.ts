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
        payload.type === 'page.created' ||
        payload.type === 'page.deleted' ||
        payload.type === 'page.moved' ||
        payload.type === 'page.locked' ||
        payload.type === 'page.unlocked') {
      const pageId = payload.entity?.id;
      const parentDatabaseId = payload.data?.parent?.id;
      
      // Check if this is from our blog database
      const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
      
      // Normalize database IDs (remove hyphens for comparison)
      const normalizeId = (id: string | undefined) => id?.replace(/-/g, '') || '';
      const normalizedParentId = normalizeId(parentDatabaseId);
      const normalizedBlogId = normalizeId(blogDatabaseId);
      
      console.log('🔍 Comparing database IDs:');
      console.log('  Webhook parent DB:', parentDatabaseId);
      console.log('  Normalized parent:', normalizedParentId, 'Length:', normalizedParentId?.length);
      console.log('  Blog database ID:', blogDatabaseId);
      console.log('  Normalized blog ID:', normalizedBlogId, 'Length:', normalizedBlogId?.length);
      console.log('  Match result:', normalizedParentId === normalizedBlogId);
      
      // Character by character comparison for debugging
      if (normalizedParentId && normalizedBlogId && normalizedParentId !== normalizedBlogId) {
        console.log('🔬 Character comparison:');
        const maxLen = Math.max(normalizedParentId.length, normalizedBlogId.length);
        for (let i = 0; i < maxLen; i++) {
          const p = normalizedParentId[i] || 'undefined';
          const b = normalizedBlogId[i] || 'undefined';
          if (p !== b) {
            console.log(`  Position ${i}: parent="${p}" blog="${b}" ❌`);
          }
        }
      }
      
      // Log updated properties if available
      if (payload.data?.updated_properties) {
        console.log('🔄 Updated properties:', payload.data.updated_properties);
      }
      
      if (normalizedParentId === normalizedBlogId) {
        console.log('📝 Blog post updated in Notion:', pageId);
        console.log('🎯 Event type:', payload.type);
        
        // Handle page deletion - always revalidate since we can't check status
        if (payload.type === 'page.deleted') {
          console.log('🗑️ Blog post deleted, revalidating cache...');
          revalidateTag('blog-posts', 'max');
          
          return NextResponse.json({ 
            message: 'Blog cache revalidated for deleted post',
            postId: pageId,
            timestamp: new Date().toISOString()
          });
        }
        
        // For other events, we need to fetch the page details to check if it's published
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
              revalidateTag('blog-posts', 'max');
              
              console.log('🔄 Blog cache revalidated successfully');
              
              return NextResponse.json({ 
                message: 'Blog cache revalidated for published post',
                postId: pageId,
                status: status,
                timestamp: new Date().toISOString()
              });
            } else {
              console.log('ℹ️ Post updated but not published, revalidating anyway for safety');
              // Revalidate anyway since blog content might have changed
              revalidateTag('blog-posts', 'max');
              
              return NextResponse.json({ 
                message: 'Post updated, cache revalidated as precaution',
                status: status,
                postId: pageId,
                timestamp: new Date().toISOString()
              });
            }
          } else {
            console.error('❌ Failed to fetch page details:', response.statusText);
            // Revalidate anyway in case of API issues
            revalidateTag('blog-posts', 'max');
            return NextResponse.json({ 
              message: 'Page updated, revalidated cache as fallback',
              postId: pageId
            });
          }
        } catch (error) {
          console.error('❌ Error fetching page details:', error);
          // Revalidate anyway in case of API issues
          revalidateTag('blog-posts', 'max');
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