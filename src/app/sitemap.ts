import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion-blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const currentDate = new Date();
  
  // Main marketing pages with priorities and change frequencies
  // Priority: 1.0 = most important, 0.0 = least important
  // Higher priority pages are crawled more frequently by search engines
  const marketingPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    // Deprecated agency blueprint route removed; main offer is consulting
    { path: '/about', priority: 0.75, changeFreq: 'monthly' as const },
    // Main product currently promoted
    { path: '/products/reportflow-engine', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/industries/marketing-agencies', priority: 0.85, changeFreq: 'weekly' as const },
    { path: '/services/ai-audit', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/ai-consulting', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/ai-development', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const },
  ];

  // Generate sitemap entries for all locale combinations
  const sitemapEntries: MetadataRoute.Sitemap = [];

  marketingPages.forEach(({ path, priority, changeFreq }) => {
    const englishUrl = `${baseUrl}${path}`;
    const germanUrl = `${baseUrl}/de${path}`;
    const alternateLanguages = {
      'en': englishUrl,
      'de': germanUrl,
      'x-default': englishUrl,
    };

    // English pages (root)
    sitemapEntries.push({
      url: englishUrl,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
      alternates: {
        languages: alternateLanguages,
      },
    });
    
    // German pages (/de/)
    sitemapEntries.push({
      url: germanUrl,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
      alternates: {
        languages: alternateLanguages,
      },
    });
  });

  // Add workflow app page (single language)
  sitemapEntries.push({
    url: `${baseUrl}/workflows`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  });

  // Add blog sections for both languages
  sitemapEntries.push({
    url: `${baseUrl}/blog`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
    alternates: {
      languages: {
        'en': `${baseUrl}/blog`,
        'de': `${baseUrl}/de/blog`,
        'x-default': `${baseUrl}/blog`,
      },
    },
  });

  sitemapEntries.push({
    url: `${baseUrl}/de/blog`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
    alternates: {
      languages: {
        'en': `${baseUrl}/blog`,
        'de': `${baseUrl}/de/blog`,
        'x-default': `${baseUrl}/blog`,
      },
    },
  });

  // Add blog posts for both languages
  const blogPosts = await getAllPosts();
  blogPosts.forEach((post) => {
    const postLastModified = new Date(post.updated_at || post.published_at || post.created_at);
    const postPriority = post.featured ? 0.8 : 0.7; // Featured posts get higher priority

    const englishPostUrl = `${baseUrl}/blog/${post.slug}`;
    const germanPostUrl = `${baseUrl}/de/blog/${post.slug}`;
    const postAlternates = {
      'en': englishPostUrl,
      'de': germanPostUrl,
      'x-default': englishPostUrl,
    };

    // English blog post
    sitemapEntries.push({
      url: englishPostUrl,
      lastModified: postLastModified,
      changeFrequency: 'weekly',
      priority: postPriority,
      alternates: {
        languages: postAlternates,
      },
    });

    // German blog post
    sitemapEntries.push({
      url: germanPostUrl,
      lastModified: postLastModified,
      changeFrequency: 'weekly',
      priority: postPriority,
      alternates: {
        languages: postAlternates,
      },
    });
  });

  return sitemapEntries;
}

