import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/notion-blog';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  // Get all blog posts with images
  const blogPosts = await getAllPosts();
  
  // Build image sitemap XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Blog posts with featured images
  for (const post of blogPosts) {
    if (post.featured_image) {
      const imageUrl = post.featured_image.startsWith('http') 
        ? post.featured_image 
        : `${baseUrl}${post.featured_image}`;
      
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      ${post.image_alt ? `<image:caption>${escapeXml(post.image_alt)}</image:caption>` : ''}
    </image:image>
  </url>`;
    }
  }

  // Static pages with known images
  const staticPages = [
    { url: '/', images: ['/opengraph-image'] },
    { url: '/about', images: ['/opengraph-image'] },
    { url: '/products', images: ['/opengraph-image'] },
    { url: '/products/relay', images: ['/opengraph-image'] },
    { url: '/products/core', images: ['/opengraph-image'] },
  ];

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>`;
    for (const image of page.images) {
      xml += `
    <image:image>
      <image:loc>${baseUrl}${image}</image:loc>
    </image:image>`;
    }
    xml += `
  </url>`;
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
