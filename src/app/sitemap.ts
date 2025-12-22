import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion-blog';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const localizedPages: Array<{ path: string; priority: number; changeFreq: ChangeFrequency }> = [
  { path: '', priority: 1.0, changeFreq: 'daily' },
  { path: '/about', priority: 0.75, changeFreq: 'monthly' },
  { path: '/products/reportflow-engine', priority: 0.9, changeFreq: 'daily' },
  { path: '/industries/marketing-agencies', priority: 0.85, changeFreq: 'weekly' },
  { path: '/ai-assistants', priority: 0.65, changeFreq: 'monthly' },
  { path: '/ai-ingestion', priority: 0.55, changeFreq: 'monthly' },
  { path: '/services/ai-audit', priority: 0.8, changeFreq: 'weekly' },
  { path: '/services/ai-consulting', priority: 0.8, changeFreq: 'weekly' },
  { path: '/services/ai-development', priority: 0.8, changeFreq: 'weekly' },
  { path: '/privacy', priority: 0.4, changeFreq: 'yearly' },
  { path: '/terms', priority: 0.4, changeFreq: 'yearly' },
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

  // Blog index pages (localized)
  const blogAlternates = {
    languages: {
      en: `${baseUrl}/blog`,
      de: `${baseUrl}/de/blog`,
      'x-default': `${baseUrl}/blog`,
    },
  } as const;

  pushEntry({
    url: `${baseUrl}/blog`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
    alternates: blogAlternates,
  });

  pushEntry({
    url: `${baseUrl}/de/blog`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
    alternates: blogAlternates,
  });

  // Feeds
  pushEntry({
    url: `${baseUrl}/rss`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.8,
  });

  pushEntry({
    url: `${baseUrl}/de/rss`,
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

  categories.forEach((category) => {
    const encodedCategory = encodeURIComponent(category);
    const englishCategoryUrl = `${baseUrl}/blog/category/${encodedCategory}`;
    const germanCategoryUrl = `${baseUrl}/de/blog/category/${encodedCategory}`;

    const alternates = {
      languages: {
        en: englishCategoryUrl,
        de: germanCategoryUrl,
        'x-default': englishCategoryUrl,
      },
    } as const;

    pushEntry({
      url: englishCategoryUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates,
    });

    pushEntry({
      url: germanCategoryUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates,
    });
  });

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

