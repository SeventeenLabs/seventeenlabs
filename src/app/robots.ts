import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const restrictedPaths = ['/admin/', '/api/', '/private/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: restrictedPaths,
        crawlDelay: 0.5,
      },
      // Allow faster crawling for major search engines without blocking the site
      {
        userAgent: 'Googlebot',
        disallow: ['/admin/', '/api/', '/private/'],
        crawlDelay: 0.1,
      },
      {
        userAgent: 'Bingbot',
        disallow: ['/admin/', '/api/', '/private/'],
        crawlDelay: 0.2,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/rss`,
      `${baseUrl}/de/rss`,
    ],
  };
}
