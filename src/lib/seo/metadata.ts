/**
 * SEO Metadata Generators
 * 
 * Centralized metadata generation functions for consistent SEO
 * across all pages with programmatic SEO support.
 */

import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getLocalizedPath } from '@/lib/i18n/utils';
import { BASE_URL, siteConfig, getLocaleContent, getServicePageConfig } from './config';

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  keywords?: string[];
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

/**
 * Generate complete metadata for any page
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    locale = 'en',
    keywords = [],
    noIndex = false,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors = [],
    section,
    tags = [],
    image,
  } = options;

  const localeContent = getLocaleContent(locale);
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonicalPath = getLocalizedPath(locale, path);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  
  // Generate alternate language URLs
  const alternates: Metadata['alternates'] = {
    canonical: canonicalUrl,
    languages: {
      'en': `${BASE_URL}${getLocalizedPath('en', path)}`,
      'de': `${BASE_URL}${getLocalizedPath('de', path)}`,
      'x-default': `${BASE_URL}${getLocalizedPath('en', path)}`,
    },
  };

  const imageData = image || siteConfig.defaultImage;
  const imageUrl = imageData.url.startsWith('http') 
    ? imageData.url 
    : `${BASE_URL}${imageData.url}`;

  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: authors.length > 0 
      ? authors.map((name) => ({ name, url: `${BASE_URL}/about` }))
      : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates,
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: localeContent.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{
        url: imageUrl,
        width: imageData.width || 1200,
        height: imageData.height || 630,
        alt: imageData.alt,
      }],
      ...(type === 'article' && publishedTime ? {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors,
        section,
        tags,
      } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: [{
        url: imageUrl,
        alt: imageData.alt,
      }],
    },
  };

  return metadata;
}

/**
 * Generate metadata for service pages using config
 */
export function generateServicePageMetadata(
  slug: string,
  locale: Locale = 'en'
): Metadata {
  const config = getServicePageConfig(slug);
  
  if (!config) {
    return generatePageMetadata({
      title: 'Service',
      description: 'SeventeenLabs professional services',
      path: `/${slug}`,
      locale,
    });
  }

  return generatePageMetadata({
    title: config.title[locale],
    description: config.description[locale],
    path: `/${slug}`,
    locale,
    keywords: config.keywords[locale],
  });
}

/**
 * Generate metadata for blog posts
 */
export interface BlogPostMetadataOptions {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  image?: {
    url: string;
    alt: string;
  };
  metaTitle?: string;
  metaDescription?: string;
}

export function generateBlogPostMetadata(options: BlogPostMetadataOptions): Metadata {
  const {
    title,
    description,
    slug,
    author,
    publishedAt,
    updatedAt,
    category,
    tags = [],
    image,
    metaTitle,
    metaDescription,
  } = options;

  const pageTitle = metaTitle || title;
  const pageDescription = metaDescription || description;

  return generatePageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: `/blog/${slug}`,
    locale: 'en', // Blog is English-only for now
    keywords: tags,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: updatedAt || publishedAt,
    authors: [author],
    section: category,
    tags,
    image: image ? {
      url: image.url,
      alt: image.alt,
      width: 1200,
      height: 630,
    } : undefined,
  });
}

/**
 * Generate metadata for category pages
 */
export function generateCategoryMetadata(
  category: string,
  postCount: number
): Metadata {
  const title = `${category} Articles`;
  const description = `Discover ${postCount} expert articles about ${category.toLowerCase()}. AI automation guides, case studies, and best practices.`;

  return generatePageMetadata({
    title,
    description,
    path: `/blog/category/${encodeURIComponent(category)}`,
    locale: 'en',
    keywords: [category, 'AI automation', 'guides', 'tutorials'],
  });
}

/**
 * Generate metadata for tag pages
 */
export function generateTagMetadata(
  tag: string,
  postCount: number
): Metadata {
  const title = `Posts tagged "${tag}"`;
  const description = `Browse ${postCount} articles tagged with ${tag}. Expert insights on AI automation and workflow optimization.`;

  return generatePageMetadata({
    title,
    description,
    path: `/blog/tag/${encodeURIComponent(tag)}`,
    locale: 'en',
    keywords: [tag, 'AI automation', 'articles'],
  });
}

/**
 * Generate pagination metadata
 */
export function generatePaginationMetadata(
  basePath: string,
  page: number,
  totalPages: number,
  locale: Locale = 'en'
): Partial<Metadata> {
  const links: Record<string, string> = {};
  
  if (page > 1) {
    links.prev = `${BASE_URL}${getLocalizedPath(locale, basePath)}${page === 2 ? '' : `?page=${page - 1}`}`;
  }
  
  if (page < totalPages) {
    links.next = `${BASE_URL}${getLocalizedPath(locale, basePath)}?page=${page + 1}`;
  }

  return {
    other: links,
  };
}
