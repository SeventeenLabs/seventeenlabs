/**
 * SEO Configuration
 * 
 * Centralized configuration for SEO-related settings, keywords,
 * and programmatic SEO page definitions.
 */

import { Locale } from '@/lib/i18n/config';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

// Site-wide SEO configuration
export const siteConfig = {
  name: 'SeventeenLabs',
  domain: 'seventeenlabs.io',
  twitterHandle: '@seventeenlabs',
  linkedIn: 'https://www.linkedin.com/company/seventeenlabs-io',
  email: 'hello@seventeenlabs.io',
  foundingDate: '2023',
  logo: {
    url: `${BASE_URL}/logo-white.svg`,
    width: 200,
    height: 60,
  },
  defaultImage: {
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: 'SeventeenLabs - AI Automation Agency',
  },
};

// Locale-specific content
export const localeContent = {
  en: {
    siteName: 'SeventeenLabs',
    tagline: 'AI Automation Agency',
    description: 'AI automation agency specializing in custom workflow automation and intelligent process optimization. Transform your business with AI-powered solutions.',
    locale: 'en_US',
    hreflang: 'en',
  },
  de: {
    siteName: 'SeventeenLabs',
    tagline: 'KI-Automatisierungsagentur',
    description: 'KI-Automatisierungsagentur für maßgeschneiderte Workflow-Automatisierung und intelligente Prozessoptimierung. Transformieren Sie Ihr Unternehmen mit KI-gestützten Lösungen.',
    locale: 'de_DE',
    hreflang: 'de',
  },
} as const;

// Primary keyword clusters for programmatic SEO
export const keywordClusters = {
  aiAutomation: {
    primary: ['AI automation', 'artificial intelligence automation', 'AI-powered automation'],
    secondary: ['workflow automation', 'process automation', 'business automation'],
    longTail: [
      'AI automation for small business',
      'enterprise AI automation solutions',
      'custom AI automation development',
    ],
  },
  workflowAutomation: {
    primary: ['workflow automation', 'n8n workflows', 'automation workflows'],
    secondary: ['business process automation', 'automated workflows', 'workflow optimization'],
    longTail: [
      'workflow automation for marketing agencies',
      'n8n workflow templates',
      'custom workflow development',
    ],
  },
  aiConsulting: {
    primary: ['AI consulting', 'AI strategy', 'AI audit'],
    secondary: ['AI roadmap', 'automation consulting', 'digital transformation'],
    longTail: [
      'AI readiness assessment',
      'AI implementation strategy',
      'AI consulting for enterprises',
    ],
  },
} as const;

// Service pages configuration for programmatic SEO
export interface ServicePageConfig {
  slug: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  keywords: {
    en: string[];
    de: string[];
  };
  title: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
}

export const servicePages: ServicePageConfig[] = [
  {
    slug: 'products',
    priority: 0.9,
    changeFrequency: 'weekly',
    keywords: {
      en: ['SeventeenLabs products', 'AI products', 'Relay and Core', 'AI systems'],
      de: ['SeventeenLabs Produkte', 'KI-Produkte', 'Relay und Core', 'KI-Systeme'],
    },
    title: {
      en: 'Products | SeventeenLabs',
      de: 'Produkte | SeventeenLabs',
    },
    description: {
      en: 'Explore Relay and Core by SeventeenLabs.',
      de: 'Entdecken Sie Relay und Core von SeventeenLabs.',
    },
  },
  {
    slug: 'products/relay',
    priority: 0.9,
    changeFrequency: 'weekly',
    keywords: {
      en: ['Relay', 'AI operator software', 'approval-driven workflows', 'business automation'],
      de: ['Relay', 'KI-Operator-Software', 'Freigabegetriebene Workflows', 'Geschaftsautomatisierung'],
    },
    title: {
      en: 'Relay by SeventeenLabs - AI Operator Software',
      de: 'Relay by SeventeenLabs - KI-Operator-Software',
    },
    description: {
      en: 'Plan, approve, and execute real work with Relay by SeventeenLabs, the flagship AI operator platform.',
      de: 'Planen, freigeben und ausfuhren Sie echte Arbeit mit Relay by SeventeenLabs, der KI-Operator-Plattform.',
    },
  },
  {
    slug: 'products/core',
    priority: 0.88,
    changeFrequency: 'weekly',
    keywords: {
      en: ['Core', 'AI platform', 'AI governance', 'agent orchestration'],
      de: ['Core', 'KI-Plattform', 'KI-Governance', 'Agenten-Orchestrierung'],
    },
    title: {
      en: 'Core by SeventeenLabs - AI Platform Layer',
      de: 'Core by SeventeenLabs - KI-Plattformschicht',
    },
    description: {
      en: 'Core provides context, governance, and agent orchestration for daily business operations.',
      de: 'Core bietet Kontext, Governance und Agenten-Orchestrierung für tägliche Geschäftsabläufe.',
    },
  },
];

// Industry pages for programmatic SEO expansion
export const industryPages = [
  'marketing-agencies',
  'e-commerce',
  'healthcare',
  'finance',
  'manufacturing',
  'professional-services',
] as const;

// Use case pages for programmatic SEO
export const useCasePages = [
  'client-reporting',
  'lead-generation',
  'customer-onboarding',
  'data-synchronization',
  'content-generation',
  'invoice-processing',
] as const;

// Internal linking structure
export interface InternalLink {
  href: string;
  label: {
    en: string;
    de: string;
  };
  description?: {
    en: string;
    de: string;
  };
  priority: number; // 1-10, higher = more important for linking
  category: 'service' | 'product' | 'industry' | 'resource' | 'company';
}

export const internalLinks: InternalLink[] = [
  {
    href: '/products',
    label: { en: 'Products', de: 'Produkte' },
    description: {
      en: 'SeventeenLabs product portfolio',
      de: 'SeventeenLabs Produktportfolio',
    },
    priority: 10,
    category: 'product',
  },
  {
    href: '/products/relay',
    label: { en: 'Relay', de: 'Relay' },
    description: {
      en: 'Approval-driven AI operator platform',
      de: 'Freigabegetriebene KI-Operator-Plattform',
    },
    priority: 8,
    category: 'product',
  },
  {
    href: '/products/core',
    label: { en: 'Core', de: 'Core' },
    description: {
      en: 'Platform layer for governed AI operations',
      de: 'Plattformschicht für governte KI-Operationen',
    },
    priority: 8,
    category: 'product',
  },
  {
    href: '/blog',
    label: { en: 'Blog', de: 'Blog' },
    description: {
      en: 'AI automation insights and guides',
      de: 'KI-Automatisierung Einblicke und Anleitungen',
    },
    priority: 6,
    category: 'resource',
  },
  {
    href: '/about',
    label: { en: 'About Us', de: 'Über uns' },
    description: {
      en: 'Learn about SeventeenLabs',
      de: 'Erfahren Sie mehr über SeventeenLabs',
    },
    priority: 5,
    category: 'company',
  },
  {
    href: '/workflows',
    label: { en: 'Workflows Library', de: 'Workflow-Bibliothek' },
    description: {
      en: 'Pre-built automation templates',
      de: 'Vorgefertigte Automatisierungsvorlagen',
    },
    priority: 7,
    category: 'resource',
  },
];

// Get localized content helper
export function getLocaleContent(locale: Locale) {
  return localeContent[locale] || localeContent.en;
}

// Get service page config by slug
export function getServicePageConfig(slug: string): ServicePageConfig | undefined {
  return servicePages.find((page) => page.slug === slug);
}

// Get internal links by category
export function getInternalLinksByCategory(
  category: InternalLink['category'],
  locale: Locale = 'en'
): Array<{ href: string; label: string; description?: string }> {
  return internalLinks
    .filter((link) => link.category === category)
    .sort((a, b) => b.priority - a.priority)
    .map((link) => ({
      href: link.href,
      label: link.label[locale],
      description: link.description?.[locale],
    }));
}

// Get all internal links sorted by priority
export function getAllInternalLinks(locale: Locale = 'en') {
  return internalLinks
    .sort((a, b) => b.priority - a.priority)
    .map((link) => ({
      href: link.href,
      label: link.label[locale],
      description: link.description?.[locale],
      category: link.category,
    }));
}
