/**
 * Internal Linking Utilities
 * 
 * Smart internal linking for SEO, including contextual link suggestions,
 * related content detection, and link audit tools.
 */

import { Locale } from '@/lib/i18n/config';
import { getLocalizedPath } from '@/lib/i18n/utils';
import { internalLinks, servicePages, BASE_URL } from './config';

export interface ContextualLink {
  href: string;
  text: string;
  title?: string;
  relevanceScore: number;
}

// Keywords to page mapping for contextual linking
const keywordToPageMap: Record<string, { path: string; anchor: string }> = {
  // Services
  'ai audit': { path: '/services/ai-audit', anchor: 'AI Audit' },
  'automation audit': { path: '/services/ai-audit', anchor: 'automation assessment' },
  'ai consulting': { path: '/services/ai-consulting', anchor: 'AI Consulting' },
  'ai strategy': { path: '/services/ai-consulting', anchor: 'AI strategy consulting' },
  'ai development': { path: '/services/ai-development', anchor: 'AI Development' },
  'custom ai': { path: '/services/ai-development', anchor: 'custom AI solutions' },
  'workflow automation': { path: '/services/ai-development', anchor: 'workflow automation' },
  
  // Products
  'ai appointment engine': { path: '/products/relay', anchor: 'Relay' },
  'automated reporting': { path: '/products/relay', anchor: 'Relay' },
  'report automation': { path: '/products/relay', anchor: 'Relay' },
  'relay': { path: '/products/relay', anchor: 'Relay' },
  
  // Industries
  'marketing agency': { path: '/industries/marketing-agencies', anchor: 'marketing agency automation' },
  'agency automation': { path: '/industries/marketing-agencies', anchor: 'agency automation' },
  
  // General
  'n8n': { path: '/workflows', anchor: 'n8n workflows' },
  'workflows': { path: '/workflows', anchor: 'automation workflows' },
};

/**
 * Find contextual internal links based on content keywords
 */
export function findContextualLinks(
  content: string,
  currentPath: string,
  locale: Locale = 'en',
  maxLinks: number = 5
): ContextualLink[] {
  const links: ContextualLink[] = [];
  const contentLower = content.toLowerCase();
  const seenPaths = new Set<string>();

  // Don't link to current page
  seenPaths.add(currentPath);

  for (const [keyword, { path, anchor }] of Object.entries(keywordToPageMap)) {
    if (seenPaths.has(path)) continue;
    
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = contentLower.match(regex);
    
    if (matches && matches.length > 0) {
      seenPaths.add(path);
      links.push({
        href: getLocalizedPath(locale, path),
        text: anchor,
        relevanceScore: matches.length,
      });
    }
  }

  return links
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxLinks);
}

/**
 * Get related pages based on current page path
 */
export function getRelatedPages(
  currentPath: string,
  locale: Locale = 'en',
  limit: number = 4
): Array<{ href: string; label: string; description?: string }> {
  // Determine category of current page
  let currentCategory: string | null = null;
  
  if (currentPath.includes('/services/')) {
    currentCategory = 'service';
  } else if (currentPath.includes('/products/')) {
    currentCategory = 'product';
  } else if (currentPath.includes('/industries/')) {
    currentCategory = 'industry';
  } else if (currentPath.includes('/blog')) {
    currentCategory = 'resource';
  }

  // Get links from related categories
  const relatedCategories = getRelatedCategories(currentCategory);
  
  return internalLinks
    .filter((link) => {
      // Don't include current page
      if (currentPath.includes(link.href)) return false;
      // Include links from related categories
      return relatedCategories.includes(link.category);
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
    .map((link) => ({
      href: getLocalizedPath(locale, link.href),
      label: link.label[locale],
      description: link.description?.[locale],
    }));
}

function getRelatedCategories(category: string | null): string[] {
  switch (category) {
    case 'service':
      return ['service', 'product', 'industry'];
    case 'product':
      return ['product', 'service', 'resource'];
    case 'industry':
      return ['industry', 'service', 'product'];
    case 'resource':
      return ['resource', 'service', 'product'];
    default:
      return ['service', 'product', 'industry', 'resource'];
  }
}

/**
 * Generate footer navigation links grouped by category
 */
export function getFooterNavigation(locale: Locale = 'en') {
  const grouped: Record<string, Array<{ href: string; label: string }>> = {
    services: [],
    products: [],
    industries: [],
    resources: [],
    company: [],
  };

  for (const link of internalLinks) {
    const categoryKey = link.category === 'resource' ? 'resources' : 
                       link.category === 'service' ? 'services' :
                       link.category === 'product' ? 'products' :
                       link.category === 'industry' ? 'industries' : 'company';
    
    grouped[categoryKey].push({
      href: getLocalizedPath(locale, link.href),
      label: link.label[locale],
    });
  }

  return grouped;
}

/**
 * Generate sitemap-friendly list of all internal links
 */
export function getAllSitemapUrls(): Array<{
  url: string;
  priority: number;
  changeFrequency: string;
}> {
  const urls: Array<{ url: string; priority: number; changeFrequency: string }> = [];

  // Add service pages with their priorities
  for (const page of servicePages) {
    urls.push({
      url: `${BASE_URL}/${page.slug}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    });
    urls.push({
      url: `${BASE_URL}/de/${page.slug}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    });
  }

  // Add internal link pages
  for (const link of internalLinks) {
    const priority = link.priority / 10;
    urls.push({
      url: `${BASE_URL}${link.href}`,
      priority,
      changeFrequency: 'weekly',
    });
    // Skip locale prefix for non-localized pages
    if (!link.href.includes('/blog') && !link.href.includes('/workflows')) {
      urls.push({
        url: `${BASE_URL}/de${link.href}`,
        priority,
        changeFrequency: 'weekly',
      });
    }
  }

  return urls;
}

/**
 * Check if a URL is internal
 */
export function isInternalLink(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('#')) return true;
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'seventeenlabs.io' || 
           parsed.hostname === 'www.seventeenlabs.io' ||
           parsed.hostname === 'localhost';
  } catch {
    return false;
  }
}

/**
 * Get canonical URL for a path
 */
export function getCanonicalUrl(path: string, locale: Locale = 'en'): string {
  const localizedPath = getLocalizedPath(locale, path);
  return `${BASE_URL}${localizedPath}`;
}

/**
 * Generate hreflang links for a page
 */
export function getHreflangLinks(path: string): Array<{
  hrefLang: string;
  href: string;
}> {
  const enPath = getLocalizedPath('en', path);
  const dePath = getLocalizedPath('de', path);

  return [
    { hrefLang: 'en', href: `${BASE_URL}${enPath}` },
    { hrefLang: 'de', href: `${BASE_URL}${dePath}` },
    { hrefLang: 'x-default', href: `${BASE_URL}${enPath}` },
  ];
}
