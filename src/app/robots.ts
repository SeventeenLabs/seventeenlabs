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
      // AI/LLM crawlers - allow access to llms.txt
      {
        userAgent: 'GPTBot',
        allow: ['/llms.txt', '/blog/', '/'],
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/llms.txt', '/blog/', '/'],
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/llms.txt', '/blog/', '/'],
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: ['/llms.txt', '/blog/', '/'],
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/rss`,
    ],
    // Additional metadata for AI crawlers
    host: baseUrl,
  };
}
