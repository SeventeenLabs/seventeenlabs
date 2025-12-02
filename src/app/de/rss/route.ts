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
    console.error('Error fetching posts for German RSS feed:', error);
    // Continue with empty posts array
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>SeventeenLabs KI-Automatisierung Blog</title>
    <description>Expertenleitfäden und Fallstudien zur KI-Automatisierung für Unternehmen. Lernen Sie bewährte Strategien zur Workflow-Optimierung und Geschäftstransformation.</description>
    <link>${baseUrl}/de/blog</link>
    <atom:link href="${baseUrl}/de/rss" rel="self" type="application/rss+xml"/>
    <language>de-de</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@seventeenlabs.io (SeventeenLabs)</managingEditor>
    <webMaster>hello@seventeenlabs.io (SeventeenLabs)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} SeventeenLabs</copyright>
    <category>Technologie</category>
    <category>Business</category>
    <category>KI-Automatisierung</category>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo-white.svg</url>
      <title>SeventeenLabs KI-Automatisierung Blog</title>
      <link>${baseUrl}/de/blog</link>
      <width>400</width>
      <height>100</height>
    </image>
${publishedPosts.length > 0 ? publishedPosts.map(post => {
  const postUrl = `${baseUrl}/de/blog/${post.slug}`;
  const imageUrl = post.featured_image 
    ? (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image)
    : `${baseUrl}/images/blog/default-og.png`;
  
  return `    <item>
      <title><![CDATA[${post.title || 'Untitled Post'}]]></title>
      <description><![CDATA[${post.description || 'Keine Beschreibung verfügbar'}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.published_at || new Date()).toUTCString()}</pubDate>
      <author>hello@seventeenlabs.io (${post.author_name || 'SeventeenLabs'})</author>
      <category><![CDATA[${post.category || 'Allgemein'}]]></category>
${post.tags?.map((tag: string) => `      <category><![CDATA[${tag}]]></category>`).join('\n') || ''}
      <enclosure url="${imageUrl}" type="image/jpeg" length="0"/>
      <content:encoded><![CDATA[
        <p>${post.description || 'Keine Beschreibung verfügbar'}</p>
        <img src="${imageUrl}" alt="${post.image_alt || post.title || 'Blog-Artikel Bild'}" style="max-width: 100%; height: auto;" />
        <p><a href="${postUrl}" target="_blank">Lesen Sie den vollständigen Artikel auf SeventeenLabs</a></p>
      ]]></content:encoded>
    </item>`;
}).join('\n') : `    <item>
      <title><![CDATA[Willkommen beim SeventeenLabs Blog]]></title>
      <description><![CDATA[Experteneinblicke in die KI-Automatisierung kommen bald. Bleiben Sie dran für wertvolle Inhalte zur Geschäftstransformation und Workflow-Optimierung.]]></description>
      <link>${baseUrl}/de/blog</link>
      <guid isPermaLink="true">${baseUrl}/de/blog</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <author>hello@seventeenlabs.io (SeventeenLabs)</author>
      <category><![CDATA[Allgemein]]></category>
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