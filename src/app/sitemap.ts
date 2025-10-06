import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const locales = ['en-US', 'de-DE'];
  
  // Main marketing pages
  const marketingPages = [
    '',
    '/agency',
    '/apps',
  ];

  // Generate sitemap entries for all locale combinations
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    marketingPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            'en-US': `${baseUrl}/en-US${page}`,
            'de-DE': `${baseUrl}/de-DE${page}`,
          },
        },
      });
    });
  });

  // Add workflow app pages (lower priority)
  sitemapEntries.push({
    url: `${baseUrl}/workflows`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  });

  // Add root redirect
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  return sitemapEntries;
}
