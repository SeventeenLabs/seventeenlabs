/**
 * Breadcrumb Component
 * 
 * SEO-friendly breadcrumb navigation with structured data.
 */

import Link from 'next/link';
import { generateBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/structured-data';
import { BASE_URL } from '@/lib/seo/config';
import { Locale } from '@/lib/i18n/config';
import { getLocalizedPath } from '@/lib/i18n/utils';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
  locale?: Locale;
  className?: string;
  homeLabel?: string;
}

export function Breadcrumb({
  items,
  locale = 'en',
  className,
  homeLabel,
}: BreadcrumbProps) {
  const defaultHomeLabel = locale === 'de' ? 'Startseite' : 'Home';
  const homePath = getLocalizedPath(locale, '/');

  // Build full breadcrumb items with home
  const fullItems: Array<{ label: string; href?: string }> = [
    { label: homeLabel || defaultHomeLabel, href: homePath },
    ...items,
  ];

  // Generate structured data
  const schemaItems: BreadcrumbItem[] = fullItems.map((item, index) => ({
    name: item.label,
    url: item.href ? `${BASE_URL}${item.href}` : undefined,
  }));

  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn('flex items-center text-sm text-gray-500', className)}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-1 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLast || !item.href ? (
                  <span
                    className={cn(
                      isLast ? 'text-gray-900 font-medium' : 'text-gray-500'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// Minimal breadcrumb for dark backgrounds
export function BreadcrumbDark({
  items,
  locale = 'en',
  className,
  homeLabel,
}: BreadcrumbProps) {
  const defaultHomeLabel = locale === 'de' ? 'Startseite' : 'Home';
  const homePath = getLocalizedPath(locale, '/');

  const fullItems: Array<{ label: string; href?: string }> = [
    { label: homeLabel || defaultHomeLabel, href: homePath },
    ...items,
  ];

  const schemaItems: BreadcrumbItem[] = fullItems.map((item) => ({
    name: item.label,
    url: item.href ? `${BASE_URL}${item.href}` : undefined,
  }));

  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn('flex items-center text-sm text-white/60', className)}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-white/40">/</span>
                )}
                {isLast || !item.href ? (
                  <span
                    className={cn(
                      isLast ? 'text-white font-medium' : 'text-white/60'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// Auto-generate breadcrumbs from path
interface AutoBreadcrumbProps {
  path: string;
  locale?: Locale;
  className?: string;
  labels?: Record<string, string>;
}

const defaultLabels: Record<string, { en: string; de: string }> = {
  services: { en: 'Services', de: 'Services' },
  'ai-audit': { en: 'AI Audit', de: 'KI-Audit' },
  'ai-consulting': { en: 'AI Consulting', de: 'KI-Beratung' },
  'ai-development': { en: 'AI Development', de: 'KI-Entwicklung' },
  products: { en: 'Products', de: 'Produkte' },
  'reportflow-engine': { en: 'ReportFlow Engine', de: 'ReportFlow Engine' },
  industries: { en: 'Industries', de: 'Branchen' },
  'marketing-agencies': { en: 'Marketing Agencies', de: 'Marketing-Agenturen' },
  blog: { en: 'Blog', de: 'Blog' },
  category: { en: 'Category', de: 'Kategorie' },
  tag: { en: 'Tag', de: 'Tag' },
  about: { en: 'About', de: 'Über uns' },
  privacy: { en: 'Privacy', de: 'Datenschutz' },
  terms: { en: 'Terms', de: 'AGB' },
};

export function AutoBreadcrumb({
  path,
  locale = 'en',
  className,
  labels = {},
}: AutoBreadcrumbProps) {
  // Remove locale prefix and split path
  const cleanPath = path.replace(/^\/de/, '').replace(/^\/en/, '');
  const segments = cleanPath.split('/').filter(Boolean);

  const items: Array<{ label: string; href?: string }> = [];
  let currentPath = '';

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    const isLast = i === segments.length - 1;
    const label = labels[segment] || 
                  defaultLabels[segment]?.[locale] || 
                  segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    items.push({
      label,
      href: isLast ? undefined : getLocalizedPath(locale, currentPath),
    });
  }

  if (items.length === 0) return null;

  return <Breadcrumb items={items} locale={locale} className={className} />;
}
