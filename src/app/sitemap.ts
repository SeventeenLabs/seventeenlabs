import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion-blog';
import { servicePages } from '@/lib/seo/config';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

// Core pages with SEO priorities
const localizedPages: Array<{ path: string; priority: number; changeFreq: ChangeFrequency }> = [
  // Homepage - highest priority
  { path: '', priority: 1.0, changeFreq: 'daily' },
  
  // Service pages - high priority (from config)
  ...servicePages.map((page) => ({
    path: `/${page.slug}`,
    priority: page.priority,
    changeFreq: page.changeFrequency,
  })),
  
  // Company pages
  { path: '/about', priority: 0.75, changeFreq: 'monthly' },
  
  // Additional product pages
  { path: '/ai-assistants', priority: 0.65, changeFreq: 'monthly' },
  { path: '/ai-ingestion', priority: 0.55, changeFreq: 'monthly' },
  
  // Legal pages - low priority
  { path: '/privacy', priority: 0.3, changeFreq: 'yearly' },
  { path: '/terms', priority: 0.3, changeFreq: 'yearly' },
];

const getPathForLocale = (locale: 'en' | 'de', path: string) => {
  if (path === '') {
    return locale === 'de' ? '/de' : '/';
  }
  return locale === 'de' ? `/de${path}` : path;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const pushEntry = (entry: MetadataRoute.Sitemap[number]) => {
    if (seenUrls.has(entry.url)) {
      return;
    }
    seenUrls.add(entry.url);
    sitemapEntries.push(entry);
  };

  localizedPages.forEach(({ path, priority, changeFreq }) => {
    const englishPath = getPathForLocale('en', path);
    const germanPath = getPathForLocale('de', path);
    const englishUrl = `${baseUrl}${englishPath}`;
    const germanUrl = `${baseUrl}${germanPath}`;

    const alternates = {
      languages: {
        en: englishUrl,
        de: germanUrl,
        'x-default': englishUrl,
      },
    } as const;

    pushEntry({
      url: englishUrl,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority,
      alternates,
    });

    pushEntry({
      url: germanUrl,
      lastModified: currentDate,
      changeFrequency: changeFreq,
      priority,
      alternates,
    });
  });

  // Blog index page (English only)
  pushEntry({
    url: `${baseUrl}/blog`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // Feeds
  pushEntry({
    url: `${baseUrl}/rss`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.8,
  });

  pushEntry({
    url: `${baseUrl}/feed`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.7,
  });

  const blogPosts = await getAllPosts();
  const categories = [...new Set(blogPosts.map((post) => post.category).filter(Boolean))];
  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags || []).filter(Boolean))];
  const allAuthors = [...new Set(blogPosts.map((post) => post.author_name).filter(Boolean))];

  // Category pages
  categories.forEach((category) => {
    const encodedCategory = encodeURIComponent(category);
    const englishCategoryUrl = `${baseUrl}/blog/category/${encodedCategory}`;

    pushEntry({
      url: englishCategoryUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  // Tag pages for programmatic SEO
  allTags.forEach((tag) => {
    const encodedTag = encodeURIComponent(tag);
    const tagUrl = `${baseUrl}/blog/tag/${encodedTag}`;

    pushEntry({
      url: tagUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  });

  // Author pages for E-E-A-T
  allAuthors.forEach((author) => {
    const authorSlug = author.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const authorUrl = `${baseUrl}/blog/author/${authorSlug}`;

    pushEntry({
      url: authorUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.55,
    });
  });

  // Individual blog posts

  blogPosts.forEach((post) => {
    const postLastModified = new Date(post.updated_at || post.published_at || post.created_at);
    const postPriority = post.featured ? 0.8 : 0.7;
    const englishPostUrl = `${baseUrl}/blog/${post.slug}`;

    pushEntry({
      url: englishPostUrl,
      lastModified: postLastModified,
      changeFrequency: 'weekly',
      priority: postPriority,
    });
  });

  return sitemapEntries;
}

