import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion-blog';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily

export default async function imageSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const entries: MetadataRoute.Sitemap = [];

  // Get all blog posts with images
  const blogPosts = await getAllPosts();
  
  for (const post of blogPosts) {
    if (post.featured_image) {
      entries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || post.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
        // Note: Next.js sitemap doesn't directly support image tags,
        // but Google will crawl images from the page itself
      });
    }
  }

  // Static pages with images
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/services/ai-audit', priority: 0.9 },
    { url: '/services/ai-consulting', priority: 0.9 },
    { url: '/services/ai-development', priority: 0.9 },
    { url: '/products/reportflow-engine', priority: 0.9 },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page.priority,
    });
  }

  return entries;
}
