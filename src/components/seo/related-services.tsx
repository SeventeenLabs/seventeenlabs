/**
 * Related Services Component
 * 
 * Shows related services based on the current content context.
 * Used for cross-linking from blog posts and other content pages.
 */

'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';
import { getLocalizedPath } from '@/lib/i18n/utils';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface Service {
  slug: string;
  title: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    slug: 'services/ai-audit',
    title: { en: 'AI Audit', de: 'KI-Audit' },
    description: {
      en: 'Identify automation opportunities in your business',
      de: 'Identifizieren Sie Automatisierungspotenziale',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    slug: 'services/ai-consulting',
    title: { en: 'AI Consulting', de: 'KI-Beratung' },
    description: {
      en: 'Strategic advisory for your AI journey',
      de: 'Strategische Beratung für Ihre KI-Reise',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    slug: 'services/ai-development',
    title: { en: 'AI Development', de: 'KI-Entwicklung' },
    description: {
      en: 'Custom AI solutions built for your needs',
      de: 'Maßgeschneiderte KI-Lösungen für Ihre Bedürfnisse',
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

interface RelatedServicesProps {
  /** Exclude service slugs from display */
  exclude?: string[];
  /** Title to display above services */
  title?: string;
  /** Maximum number of services to show */
  limit?: number;
  /** Visual variant */
  variant?: 'default' | 'compact' | 'dark';
  className?: string;
}

export function RelatedServices({
  exclude = [],
  title,
  limit = 3,
  variant = 'default',
  className,
}: RelatedServicesProps) {
  const locale = useLocale();
  
  const filteredServices = services
    .filter((service) => !exclude.some((e) => service.slug.includes(e)))
    .slice(0, limit);

  if (filteredServices.length === 0) return null;

  const defaultTitle = locale === 'de' ? 'Unsere Services' : 'Our Services';

  if (variant === 'compact') {
    return (
      <div className={cn('', className)}>
        {title !== null && (
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            {title || defaultTitle}
          </h3>
        )}
        <div className="flex flex-wrap gap-2">
          {filteredServices.map((service) => (
            <Link
              key={service.slug}
              href={getLocalizedPath(locale, `/${service.slug}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-colors"
            >
              {service.title[locale]}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className={cn('bg-slate-900 rounded-2xl p-8', className)}>
        {title !== null && (
          <h3 className="text-lg font-semibold text-white mb-6">
            {title || defaultTitle}
          </h3>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          {filteredServices.map((service) => (
            <Link
              key={service.slug}
              href={getLocalizedPath(locale, `/${service.slug}`)}
              className="group block p-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3 text-blue-400 mb-2">
                {service.icon}
                <span className="font-medium text-white group-hover:text-blue-300 transition-colors">
                  {service.title[locale]}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                {service.description[locale]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('', className)}>
      {title !== null && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title || defaultTitle}
        </h3>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        {filteredServices.map((service) => (
          <Link
            key={service.slug}
            href={getLocalizedPath(locale, `/${service.slug}`)}
            className="group flex flex-col p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-blue-600">
                {service.icon}
              </div>
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {service.title[locale]}
              </h4>
            </div>
            <p className="text-sm text-gray-500 flex-grow">
              {service.description[locale]}
            </p>
            <div className="mt-3 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
              {locale === 'de' ? 'Mehr erfahren' : 'Learn more'}
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
