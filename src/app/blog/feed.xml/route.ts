import { getAllPosts } from '@/lib/notion-blog';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const posts = await getAllPosts();
  
  const rssItems = posts.slice(0, 20).map(post => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.published_at || post.created_at).toUTCString();
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author_name}</author>
      <category>${post.category}</category>
      ${post.featured_image ? `<enclosure url="${post.featured_image}" type="image/jpeg" />` : ''}
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>SeventeenLabs Blog - AI Automation for Business</title>
    <description>Expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <managingEditor>hello@seventeenlabs.io (SeventeenLabs)</managingEditor>
    <webMaster>hello@seventeenlabs.io (SeventeenLabs)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>1440</ttl>
    <image>
      <url>${baseUrl}/logo_dark.png</url>
      <title>SeventeenLabs Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}