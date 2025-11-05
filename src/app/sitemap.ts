import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const currentDate = new Date();
  
  // Main marketing pages with priorities and change frequencies
  // Priority: 1.0 = most important, 0.0 = least important
  // Higher priority pages are crawled more frequently by search engines
  const marketingPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/agency', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/agency-automation-blueprint', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/apps', priority: 0.85, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.75, changeFreq: 'monthly' as const },
    { path: '/industries/marketing-agencies', priority: 0.85, changeFreq: 'weekly' as const },
    { path: '/services/ai-audit', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/ai-consulting', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/ai-development', priority: 0.8, changeFreq: 'weekly' as const },
  ];

  // Generate sitemap entries for all locale combinations
  const sitemapEntries: MetadataRoute.Sitemap = [];

  marketingPages.forEach(({ path, priority, changeFreq }) => {
    // English pages (root)
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
      alternates: {
        languages: {
          'en': `${baseUrl}${path}`,
          'de': `${baseUrl}/de${path}`,
        },
      },
    });
    
    // German pages (/de/)
    sitemapEntries.push({
      url: `${baseUrl}/de${path}`,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority: priority,
      alternates: {
        languages: {
          'en': `${baseUrl}${path}`,
          'de': `${baseUrl}/de${path}`,
        },
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

  return sitemapEntries;
}

