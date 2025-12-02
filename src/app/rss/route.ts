import { getAllPosts, BlogPostMetadata } from '@/lib/notion-blog';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  let publishedPosts: BlogPostMetadata[] = [];
  
  try {
    const posts = await getAllPosts();
    publishedPosts = posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 20);
  } catch (error) {
    console.error('Error fetching posts for RSS feed:', error);
    // Continue with empty posts array
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>SeventeenLabs AI Automation Blog</title>
    <description>Expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@seventeenlabs.io (SeventeenLabs)</managingEditor>
    <webMaster>hello@seventeenlabs.io (SeventeenLabs)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} SeventeenLabs</copyright>
    <category>Technology</category>
    <category>Business</category>
    <category>AI Automation</category>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo-white.svg</url>
      <title>SeventeenLabs AI Automation Blog</title>
      <link>${baseUrl}/blog</link>
      <width>400</width>
      <height>100</height>
    </image>
${publishedPosts.length > 0 ? publishedPosts.map(post => {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.featured_image 
    ? (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image)
    : `${baseUrl}/images/blog/default-og.png`;
  
  return `    <item>
      <title><![CDATA[${post.title || 'Untitled Post'}]]></title>
      <description><![CDATA[${post.description || 'No description available'}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.published_at || new Date()).toUTCString()}</pubDate>
      <author>hello@seventeenlabs.io (${post.author_name || 'SeventeenLabs'})</author>
      <category><![CDATA[${post.category || 'General'}]]></category>
${post.tags?.map((tag: string) => `      <category><![CDATA[${tag}]]></category>`).join('\n') || ''}
      <enclosure url="${imageUrl}" type="image/jpeg" length="0"/>
      <content:encoded><![CDATA[
        <p>${post.description || 'No description available'}</p>
        <img src="${imageUrl}" alt="${post.image_alt || post.title || 'Blog post image'}" style="max-width: 100%; height: auto;" />
        <p><a href="${postUrl}" target="_blank">Read the full article on SeventeenLabs</a></p>
      ]]></content:encoded>
    </item>`;
}).join('\n') : `    <item>
      <title><![CDATA[Welcome to SeventeenLabs Blog]]></title>
      <description><![CDATA[Expert insights on AI automation coming soon. Stay tuned for valuable content on business transformation and workflow optimization.]]></description>
      <link>${baseUrl}/blog</link>
      <guid isPermaLink="true">${baseUrl}/blog</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <author>hello@seventeenlabs.io (SeventeenLabs)</author>
      <category><![CDATA[General]]></category>
    </item>`}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export const revalidate = 3600; // Revalidate every hour