import { getAllPosts, BlogPostMetadata } from '@/lib/notion-blog';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  let publishedPosts: BlogPostMetadata[] = [];
  
  try {
    const posts = await getAllPosts();
    publishedPosts = posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 50);
  } catch (error) {
    console.error('Error fetching posts for JSON feed:', error);
    // Continue with empty posts array
  }

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'SeventeenLabs AI Automation Blog',
    description: 'Expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
    home_page_url: `${baseUrl}/blog`,
    feed_url: `${baseUrl}/feed.json`,
    language: 'en',
    icon: `${baseUrl}/favicon.ico`,
    favicon: `${baseUrl}/favicon.ico`,
    authors: [
      {
        name: 'SeventeenLabs',
        url: `${baseUrl}/about`,
        avatar: `${baseUrl}/logo-white.svg`
      }
    ],
    items: publishedPosts.length > 0 ? publishedPosts.map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const imageUrl = post.featured_image 
        ? (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image)
        : `${baseUrl}/images/blog/default-og.png`;
      
      return {
        id: postUrl,
        url: postUrl,
        title: post.title || 'Untitled Post',
        content_html: `<p>${post.description || 'No description available'}</p><img src="${imageUrl}" alt="${post.image_alt || post.title || 'Blog post image'}" style="max-width: 100%; height: auto;" />`,
        content_text: post.description || 'No description available',
        summary: post.description || 'No description available',
        image: imageUrl,
        banner_image: imageUrl,
        date_published: post.published_at || new Date().toISOString(),
        date_modified: post.updated_at || post.published_at || new Date().toISOString(),
        authors: [
          {
            name: post.author_name || 'SeventeenLabs',
            url: `${baseUrl}/about`
          }
        ],
        tags: post.tags || [],
        language: 'en'
      };
    }) : [{
      id: `${baseUrl}/blog`,
      url: `${baseUrl}/blog`,
      title: 'Welcome to SeventeenLabs Blog',
      content_html: '<p>Expert insights on AI automation coming soon. Stay tuned for valuable content on business transformation and workflow optimization.</p>',
      content_text: 'Expert insights on AI automation coming soon. Stay tuned for valuable content on business transformation and workflow optimization.',
      summary: 'Expert insights on AI automation coming soon.',
      date_published: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      authors: [{
        name: 'SeventeenLabs',
        url: `${baseUrl}/about`
      }],
      tags: ['AI', 'Automation', 'Business'],
      language: 'en'
    }]
  };

  return new Response(JSON.stringify(jsonFeed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export const revalidate = 3600; // Revalidate every hour