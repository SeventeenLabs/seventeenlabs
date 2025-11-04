import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const currentDate = new Date();
  
  // Main marketing pages with priorities and change frequencies
  // Priority: 1.0 = most important, 0.0 = least important
  // Higher priority pages are crawled more frequently by search engines
  const marketingPages = [
    // Homepage - highest priority, updated daily
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    
    // Core landing pages - high priority
    { path: '/agency', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/marketing-agencies', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/agency-automation-blueprint', priority: 0.9, changeFreq: 'weekly' as const },
    
    // Solutions pages - medium-high priority
    { path: '/solutions/marketing-agencies', priority: 0.85, changeFreq: 'weekly' as const },
    
    // Service pages - medium priority
    { path: '/services/automation-consulting', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/automation/ai-workflow-automation', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/automation/custom-development', priority: 0.8, changeFreq: 'weekly' as const },
    
    // Apps and tools - medium priority
    { path: '/apps', priority: 0.8, changeFreq: 'weekly' as const },
    
    // About page - lower priority, changes infrequently
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
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

  // Add workflow app pages (lower priority, dynamic content)
  sitemapEntries.push({
    url: `${baseUrl}/workflows`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.7,
  });

  // Add admin app page (lower priority)
  sitemapEntries.push({
    url: `${baseUrl}/admin`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.5,
  });

  return sitemapEntries;
}

