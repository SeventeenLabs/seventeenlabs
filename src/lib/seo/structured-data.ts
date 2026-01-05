/**
 * Structured Data Generators
 * 
 * Type-safe JSON-LD structured data generators for various
 * Schema.org types used across the site.
 */

import { Locale } from '@/lib/i18n/config';
import { getLocalizedPath } from '@/lib/i18n/utils';
import { BASE_URL, siteConfig, getLocaleContent } from './config';

// Organization Schema
export function generateOrganizationSchema(locale: Locale = 'en') {
  const content = getLocaleContent(locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: siteConfig.name,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logo.url,
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
    },
    description: content.description,
    sameAs: [
      'https://twitter.com/seventeenlabs',
      siteConfig.linkedIn,
      'https://www.youtube.com/@seventeenlabs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: siteConfig.email,
      areaServed: 'Worldwide',
      availableLanguage: ['en', 'de'],
    },
    foundingDate: siteConfig.foundingDate,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 10,
    },
  };
}

// Website Schema with SearchAction
export function generateWebsiteSchema(locale: Locale = 'en') {
  const content = getLocaleContent(locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: siteConfig.name,
    url: BASE_URL,
    description: content.description,
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: content.locale.replace('_', '-'),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  locale: Locale = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

// Blog Posting Schema
export interface BlogPostSchemaOptions {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  wordCount?: number;
  readingTime?: number;
}

export function generateBlogPostSchema(options: BlogPostSchemaOptions) {
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
    imageAlt,
    wordCount,
    readingTime,
  } = options;

  const canonicalUrl = `${BASE_URL}/blog/${slug}`;
  const imageUrl = image 
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : `${BASE_URL}/images/blog/default-og.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: title,
    description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: imageAlt || title,
    },
    author: {
      '@type': 'Person',
      name: author,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: siteConfig.name,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo.url,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    inLanguage: 'en-US',
    url: canonicalUrl,
    keywords: tags.join(', '),
    articleSection: category || 'AI Automation',
    ...(wordCount ? { wordCount } : {}),
    ...(readingTime ? { timeRequired: `PT${readingTime}M` } : {}),
    about: {
      '@type': 'Thing',
      name: category || 'AI Automation',
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${BASE_URL}/blog#blog`,
      name: `${siteConfig.name} Blog`,
    },
  };
}

// Service Schema
export interface ServiceSchemaOptions {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  price?: string;
  priceCurrency?: string;
  locale?: Locale;
}

export function generateServiceSchema(options: ServiceSchemaOptions) {
  const {
    name,
    description,
    url,
    serviceType,
    price,
    priceCurrency = 'USD',
    locale = 'en',
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: siteConfig.name,
      url: BASE_URL,
    },
    serviceType,
    areaServed: 'Worldwide',
    url,
    ...(price ? {
      offers: {
        '@type': 'Offer',
        url,
        availability: 'https://schema.org/InStock',
        price,
        priceCurrency,
      },
    } : {}),
  };
}

// FAQ Schema
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Product Schema
export interface ProductSchemaOptions {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  price?: string;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export function generateProductSchema(options: ProductSchemaOptions) {
  const {
    name,
    description,
    url,
    image,
    brand = siteConfig.name,
    price,
    priceCurrency = 'USD',
    availability = 'InStock',
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    ...(image ? {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
      },
    } : {}),
    ...(price ? {
      offers: {
        '@type': 'Offer',
        url,
        price,
        priceCurrency,
        availability: `https://schema.org/${availability}`,
      },
    } : {}),
  };
}

// Software Application Schema
export function generateSoftwareSchema(locale: Locale = 'en') {
  const content = getLocaleContent(locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${siteConfig.name} Workflows`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: locale === 'de'
      ? 'Automatisieren Sie Ihre Geschäftsprozesse mit KI-gestützten Workflows'
      : 'Automate your business processes with AI-powered workflows',
  };
}

// How-To Schema for process pages
export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
      ...(step.image ? {
        image: {
          '@type': 'ImageObject',
          url: step.image.startsWith('http') ? step.image : `${BASE_URL}${step.image}`,
        },
      } : {}),
    })),
  };
}

// Local Business Schema (for contact/about pages)
export function generateLocalBusinessSchema(locale: Locale = 'en') {
  const content = getLocaleContent(locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: siteConfig.name,
    description: content.description,
    url: BASE_URL,
    logo: siteConfig.logo.url,
    email: siteConfig.email,
    sameAs: [
      'https://twitter.com/seventeenlabs',
      siteConfig.linkedIn,
    ],
    priceRange: '$$$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.2082,
        longitude: 16.3738,
      },
      geoRadius: '10000',
    },
  };
}

// Aggregate Rating Schema (for testimonials/reviews pages)
export interface AggregateRatingOptions {
  ratingValue: number;
  ratingCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function generateAggregateRatingSchema(
  itemName: string,
  options: AggregateRatingOptions
) {
  const { ratingValue, ratingCount, bestRating = 5, worstRating = 1 } = options;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating,
      worstRating,
    },
  };
}
