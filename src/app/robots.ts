import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const hostname = new URL(baseUrl).hostname;
  
  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/_vercel/',
          '/.*',  // Hide dotfiles
        ],
        crawlDelay: 0.5, // Faster crawling for better indexing
      },
      // Allow faster crawling for major search engines
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
