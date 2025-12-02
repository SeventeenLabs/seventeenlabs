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

  // Pages that exist in both locales
  const bilingualPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.75, changeFreq: 'monthly' as const },
    { path: '/products/reportflow-engine', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/industries/marketing-agencies', priority: 0.85, changeFreq: 'weekly' as const },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const },
  ];

  // English-only pages (services might not have German translations)
  const englishOnlyPages = [
    { path: '/services/ai-audit', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/ai-consulting', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/ai-development', priority: 0.8, changeFreq: 'weekly' as const },
  ];

  // Location-based service pages for local SEO
  const locations = [
    'new-york', 'san-francisco', 'london', 'berlin', 'toronto', 
    'sydney', 'tokyo', 'singapore', 'amsterdam', 'paris'
  ];
  const services = ['ai-audit', 'ai-consulting', 'ai-development'];
  
  const locationPages: Array<{ path: string; priority: number; changeFreq: 'weekly' }> = [];
  services.forEach(service => {
    locations.forEach(location => {
      locationPages.push({
        path: `/services/${service}/${location}`,
        priority: 0.7,
        changeFreq: 'weekly' as const,
      });
    });
  });

  // Add bilingual pages with alternates
  bilingualPages.forEach(({ path, priority, changeFreq }) => {
    const englishUrl = `${baseUrl}${path}`;
    const germanUrl = `${baseUrl}/de${path}`;
    
    // English version
    sitemapEntries.push({
      url: englishUrl,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
      alternates: {
        languages: {
          'en': englishUrl,
          'de': germanUrl,
          'x-default': englishUrl,
        },
      },
    });
    
    // German version
    sitemapEntries.push({
      url: germanUrl,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
      alternates: {
        languages: {
          'en': englishUrl,
          'de': germanUrl,
          'x-default': englishUrl,
        },
      },
    });
  });

  // Add English-only pages without alternates
  englishOnlyPages.forEach(({ path, priority, changeFreq }) => {
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
    });
  });

  // Add location-based service pages
  locationPages.forEach(({ path, priority, changeFreq }) => {
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
    });
  });

  // Add workflow app page (single language)
  sitemapEntries.push({
    url: `${baseUrl}/workflows`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  });

  // Add blog index pages
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

  // Add blog posts (assuming most content is English-only for now)
  const blogPosts = await getAllPosts();
  blogPosts.forEach((post) => {
    const postLastModified = new Date(post.updated_at || post.published_at || post.created_at);
    const postPriority = post.featured ? 0.8 : 0.7;
    
    const englishPostUrl = `${baseUrl}/blog/${post.slug}`;
    
    // Only add English version unless we have confirmed German translations
    // TODO: Check if post has German translation before adding /de/ version
    sitemapEntries.push({
      url: englishPostUrl,
      lastModified: postLastModified,
      changeFrequency: 'weekly',
      priority: postPriority,
      // Remove alternates until German translations are confirmed
    });
  });

  return sitemapEntries;
}

