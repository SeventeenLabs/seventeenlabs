/**
 * Internal Links Component
 * 
 * Smart internal linking component for SEO that provides
 * contextual navigation and related content suggestions.
 */

'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';
import { getRelatedPages } from '@/lib/seo/internal-links';
import { cn } from '@/lib/utils';

interface RelatedLinksProps {
  currentPath: string;
  title?: string;
  limit?: number;
  variant?: 'default' | 'compact' | 'card';
  className?: string;
}

export function RelatedLinks({
  currentPath,
  title,
  limit = 4,
  variant = 'default',
  className,
}: RelatedLinksProps) {
  const locale = useLocale();
  const relatedPages = getRelatedPages(currentPath, locale, limit);

  if (relatedPages.length === 0) return null;

  const defaultTitle = locale === 'de' ? 'Weitere Inhalte' : 'Related Content';

  if (variant === 'compact') {
    return (
      <nav className={cn('space-y-2', className)} aria-label="Related pages">
        {title !== null && (
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {title || defaultTitle}
          </h3>
        )}
        <ul className="flex flex-wrap gap-2">
          {relatedPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  if (variant === 'card') {
    return (
      <nav className={cn('', className)} aria-label="Related pages">
        {title !== null && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {title || defaultTitle}
          </h3>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {relatedPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {page.label}
              </h4>
              {page.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {page.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // Default variant
  return (
    <nav className={cn('space-y-3', className)} aria-label="Related pages">
      {title !== null && (
        <h3 className="text-lg font-semibold text-gray-900">
          {title || defaultTitle}
        </h3>
      )}
      <ul className="space-y-2">
        {relatedPages.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              className="group flex items-start gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5 mt-0.5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>
                <span className="font-medium">{page.label}</span>
                {page.description && (
                  <span className="block text-sm text-gray-500">
                    {page.description}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Inline contextual link component for within content
interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function InlineLink({ href, children, className }: InlineLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-blue-600 hover:text-blue-800 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-500 transition-colors',
        className
      )}
    >
      {children}
    </Link>
  );
}

// Service links component for CTAs
interface ServiceLinksProps {
  exclude?: string[];
  className?: string;
}

export function ServiceLinks({ exclude = [], className }: ServiceLinksProps) {
  const locale = useLocale();
  
  const services = [
    {
      href: locale === 'de' ? '/de/services/ai-audit' : '/services/ai-audit',
      label: locale === 'de' ? 'KI-Audit' : 'AI Audit',
      description: locale === 'de' 
        ? 'Identifizieren Sie Automatisierungspotenziale'
        : 'Identify automation opportunities',
    },
    {
      href: locale === 'de' ? '/de/services/ai-consulting' : '/services/ai-consulting',
      label: locale === 'de' ? 'KI-Beratung' : 'AI Consulting',
      description: locale === 'de'
        ? 'Strategische KI-Beratung'
        : 'Strategic AI advisory',
    },
    {
      href: locale === 'de' ? '/de/services/ai-development' : '/services/ai-development',
      label: locale === 'de' ? 'KI-Entwicklung' : 'AI Development',
      description: locale === 'de'
        ? 'Maßgeschneiderte KI-Lösungen'
        : 'Custom AI solutions',
    },
  ].filter((service) => !exclude.some((e) => service.href.includes(e)));

  return (
    <div className={cn('grid gap-4 sm:grid-cols-3', className)}>
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="group block p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all"
        >
          <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
            {service.label}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {service.description}
          </p>
          <span className="mt-4 inline-flex items-center text-sm text-blue-400 group-hover:text-blue-300">
            {locale === 'de' ? 'Mehr erfahren' : 'Learn more'}
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}

// Quick links for sidebar/footer
interface QuickLinksProps {
  category?: 'service' | 'product' | 'industry' | 'resource' | 'company';
  className?: string;
}

export function QuickLinks({ category, className }: QuickLinksProps) {
  const locale = useLocale();
  const allLinks = getRelatedPages('/', locale, 10);
  
  const links = category 
    ? allLinks.filter((_, idx) => idx < 5) // Simplified - in real impl would filter by category
    : allLinks.slice(0, 5);

  return (
    <nav className={cn('space-y-1', className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
