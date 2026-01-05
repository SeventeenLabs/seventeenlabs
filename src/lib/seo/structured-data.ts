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

// Video Object Schema (for blog posts with embedded videos)
export interface VideoSchemaOptions {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 format e.g. "PT10M30S"
  contentUrl?: string;
  embedUrl?: string;
  locale?: Locale;
}

export function generateVideoSchema(options: VideoSchemaOptions) {
  const {
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    locale = 'en',
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith('http') 
      ? thumbnailUrl 
      : `${BASE_URL}${thumbnailUrl}`,
    uploadDate,
    ...(duration ? { duration } : {}),
    ...(contentUrl ? { contentUrl } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: siteConfig.name,
    },
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
  };
}

// Review Schema (for testimonials)
export interface ReviewSchemaOptions {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  itemReviewed: {
    type: 'Service' | 'Product' | 'Organization';
    name: string;
  };
}

export function generateReviewSchema(options: ReviewSchemaOptions) {
  const { author, reviewBody, ratingValue, datePublished, itemReviewed } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished,
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      ...(itemReviewed.type === 'Organization' ? {
        '@id': `${BASE_URL}/#organization`,
      } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
  };
}

// Course Schema (for educational content)
export interface CourseSchemaOptions {
  name: string;
  description: string;
  url: string;
  provider?: string;
  price?: string;
  priceCurrency?: string;
  hasCourseInstance?: {
    startDate?: string;
    endDate?: string;
    courseMode?: 'online' | 'onsite' | 'blended';
  };
}

export function generateCourseSchema(options: CourseSchemaOptions) {
  const {
    name,
    description,
    url,
    provider = siteConfig.name,
    price,
    priceCurrency = 'USD',
    hasCourseInstance,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider,
      '@id': `${BASE_URL}/#organization`,
    },
    ...(price ? {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability: 'https://schema.org/InStock',
        url,
      },
    } : {}),
    ...(hasCourseInstance ? {
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: hasCourseInstance.courseMode || 'online',
        ...(hasCourseInstance.startDate ? { startDate: hasCourseInstance.startDate } : {}),
        ...(hasCourseInstance.endDate ? { endDate: hasCourseInstance.endDate } : {}),
      },
    } : {}),
  };
}

// Event Schema (for webinars, workshops)
export interface EventSchemaOptions {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    type: 'VirtualLocation' | 'Place';
    name?: string;
    url?: string;
    address?: string;
  };
  image?: string;
  url?: string;
  price?: string;
  priceCurrency?: string;
  eventStatus?: 'Scheduled' | 'Cancelled' | 'Postponed' | 'Rescheduled';
  eventAttendanceMode?: 'Online' | 'Offline' | 'Mixed';
}

export function generateEventSchema(options: EventSchemaOptions) {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    image,
    url,
    price,
    priceCurrency = 'USD',
    eventStatus = 'Scheduled',
    eventAttendanceMode = 'Online',
  } = options;

  const attendanceModeMap = {
    Online: 'https://schema.org/OnlineEventAttendanceMode',
    Offline: 'https://schema.org/OfflineEventAttendanceMode',
    Mixed: 'https://schema.org/MixedEventAttendanceMode',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: `https://schema.org/Event${eventStatus}`,
    eventAttendanceMode: attendanceModeMap[eventAttendanceMode],
    ...(location ? {
      location: location.type === 'VirtualLocation' 
        ? {
            '@type': 'VirtualLocation',
            url: location.url || BASE_URL,
          }
        : {
            '@type': 'Place',
            name: location.name,
            address: location.address,
          },
    } : {
      location: {
        '@type': 'VirtualLocation',
        url: BASE_URL,
      },
    }),
    organizer: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: siteConfig.name,
    },
    ...(image ? {
      image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    } : {}),
    ...(url ? { url } : {}),
    ...(price ? {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability: 'https://schema.org/InStock',
        url: url || BASE_URL,
      },
    } : {}),
  };
}

// Person Schema (for author pages)
export interface PersonSchemaOptions {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}

export function generatePersonSchema(options: PersonSchemaOptions) {
  const { name, jobTitle, description, image, url, sameAs = [] } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(jobTitle ? { jobTitle } : {}),
    ...(description ? { description } : {}),
    ...(image ? {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
      },
    } : {}),
    ...(url ? { url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    worksFor: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: siteConfig.name,
    },
  };
}
