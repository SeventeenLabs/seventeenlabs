import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  // Main marketing pages
  const marketingPages = [
    '',
    '/agency',
    '/apps',
    '/about',
    '/solutions/marketing-agencies',
    '/services/automation-consulting',
  ];

  // Generate sitemap entries for all locale combinations
  const sitemapEntries: MetadataRoute.Sitemap = [];

  marketingPages.forEach((page) => {
    // English pages (root)
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'en': `${baseUrl}${page}`,
          'de': `${baseUrl}/de${page}`,
        },
      },
    });
    
    // German pages (/de/)
    sitemapEntries.push({
      url: `${baseUrl}/de${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'en': `${baseUrl}${page}`,
          'de': `${baseUrl}/de${page}`,
        },
      },
    });
  });

  // Add workflow app pages (lower priority)
  sitemapEntries.push({
    url: `${baseUrl}/workflows`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  });

  return sitemapEntries;
}
