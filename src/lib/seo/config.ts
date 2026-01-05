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
    slug: 'services/ai-audit',
    priority: 0.9,
    changeFrequency: 'weekly',
    keywords: {
      en: ['AI audit', 'automation assessment', 'AI opportunity analysis', 'process audit'],
      de: ['KI-Audit', 'Automatisierungspotenzial', 'KI-Analyse', 'Prozessaudit'],
    },
    title: {
      en: 'AI Audit & Automation Opportunity Assessment',
      de: 'KI-Audit & Automatisierungspotenzial-Analyse',
    },
    description: {
      en: 'Identify automation opportunities with a comprehensive AI audit. We analyze processes, systems, and data to deliver an actionable roadmap.',
      de: 'Identifizieren Sie Automatisierungspotenziale mit einem umfassenden KI-Audit. Wir analysieren Prozesse, Systeme und Daten für einen umsetzbaren Fahrplan.',
    },
  },
  {
    slug: 'services/ai-consulting',
    priority: 0.9,
    changeFrequency: 'weekly',
    keywords: {
      en: ['AI consulting', 'AI strategy', 'automation strategy', 'digital transformation'],
      de: ['KI-Beratung', 'KI-Strategie', 'Automatisierungsstrategie', 'Digitale Transformation'],
    },
    title: {
      en: 'AI Consulting & Strategic Advisory',
      de: 'KI-Beratung & Strategische Beratung',
    },
    description: {
      en: 'Expert AI consulting to define your automation strategy. Get a clear roadmap for AI adoption and digital transformation.',
      de: 'Experten-KI-Beratung zur Definition Ihrer Automatisierungsstrategie. Erhalten Sie einen klaren Fahrplan für KI-Adoption und digitale Transformation.',
    },
  },
  {
    slug: 'services/ai-development',
    priority: 0.9,
    changeFrequency: 'weekly',
    keywords: {
      en: ['AI development', 'custom AI solutions', 'automation development', 'AI integration'],
      de: ['KI-Entwicklung', 'Maßgeschneiderte KI-Lösungen', 'Automatisierungsentwicklung', 'KI-Integration'],
    },
    title: {
      en: 'Custom AI Development & Integration',
      de: 'Individuelle KI-Entwicklung & Integration',
    },
    description: {
      en: 'Custom AI development and integration services. Build scalable automation solutions tailored to your business needs.',
      de: 'Individuelle KI-Entwicklung und Integrationsservices. Erstellen Sie skalierbare Automatisierungslösungen für Ihre Geschäftsanforderungen.',
    },
  },
  {
    slug: 'products/reportflow-engine',
    priority: 0.9,
    changeFrequency: 'weekly',
    keywords: {
      en: ['ReportFlow Engine', 'automated reporting', 'report automation', 'business intelligence'],
      de: ['ReportFlow Engine', 'Automatisierte Berichterstattung', 'Report-Automatisierung', 'Business Intelligence'],
    },
    title: {
      en: 'ReportFlow Engine™ - Automated Business Reporting',
      de: 'ReportFlow Engine™ - Automatisierte Geschäftsberichte',
    },
    description: {
      en: 'Transform your reporting with ReportFlow Engine™. Automated data collection, analysis, and beautiful report generation.',
      de: 'Transformieren Sie Ihre Berichterstattung mit ReportFlow Engine™. Automatisierte Datenerfassung, Analyse und schöne Berichtgenerierung.',
    },
  },
  {
    slug: 'industries/marketing-agencies',
    priority: 0.85,
    changeFrequency: 'weekly',
    keywords: {
      en: ['marketing agency automation', 'agency workflow automation', 'marketing AI tools'],
      de: ['Marketing-Agentur-Automatisierung', 'Agentur-Workflow-Automatisierung', 'Marketing-KI-Tools'],
    },
    title: {
      en: 'AI Automation for Marketing Agencies',
      de: 'KI-Automatisierung für Marketing-Agenturen',
    },
    description: {
      en: 'Streamline your marketing agency operations with AI automation. Client reporting, content workflows, and campaign management automation.',
      de: 'Optimieren Sie Ihre Marketing-Agentur-Operationen mit KI-Automatisierung. Kundenberichte, Content-Workflows und Kampagnenmanagement-Automatisierung.',
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
    href: '/services/ai-audit',
    label: { en: 'AI Audit', de: 'KI-Audit' },
    description: {
      en: 'Comprehensive AI opportunity assessment',
      de: 'Umfassende KI-Potenzialanalyse',
    },
    priority: 10,
    category: 'service',
  },
  {
    href: '/services/ai-consulting',
    label: { en: 'AI Consulting', de: 'KI-Beratung' },
    description: {
      en: 'Strategic AI advisory services',
      de: 'Strategische KI-Beratung',
    },
    priority: 9,
    category: 'service',
  },
  {
    href: '/services/ai-development',
    label: { en: 'Custom AI Development', de: 'Individuelle KI-Entwicklung' },
    description: {
      en: 'Tailored AI solutions development',
      de: 'Maßgeschneiderte KI-Lösungsentwicklung',
    },
    priority: 9,
    category: 'service',
  },
  {
    href: '/products/reportflow-engine',
    label: { en: 'ReportFlow Engine', de: 'ReportFlow Engine' },
    description: {
      en: 'Automated business reporting platform',
      de: 'Automatisierte Berichtsplattform',
    },
    priority: 8,
    category: 'product',
  },
  {
    href: '/industries/marketing-agencies',
    label: { en: 'Marketing Agencies', de: 'Marketing-Agenturen' },
    description: {
      en: 'AI solutions for agencies',
      de: 'KI-Lösungen für Agenturen',
    },
    priority: 7,
    category: 'industry',
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
