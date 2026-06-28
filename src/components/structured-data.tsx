import Script from 'next/script';
import { getLocalizedPath } from '@/lib/i18n/utils';
import { Locale } from '@/lib/i18n/config';

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  locale?: string;
  type?: 'home' | 'agency' | 'product';
  faqItems?: FAQItem[];
}

export default function StructuredData({ locale = 'en', type = 'home', faqItems }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const isGerman = locale === 'de';

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'SeventeenLabs',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 200,
      height: 60,
    },
    description: isGerman
      ? 'Führende Plattform für KI-gestützte Workflow-Automatisierung und maßgeschneiderte Softwareentwicklung'
      : 'Leading platform for AI-powered workflow automation and custom software development',
    sameAs: [
      'https://twitter.com/seventeenlabs',
      'https://www.linkedin.com/company/seventeenlabs-io',
      'https://www.youtube.com/@seventeenlabs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'Worldwide',
      availableLanguage: ['en', 'de'],
    },
    foundingDate: '2023',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 10,
    },
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'SeventeenLabs',
    url: baseUrl,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: isGerman ? 'de-DE' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/workflows?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Software Application schema for workflow platform
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SeventeenLabs Workflows',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: isGerman
      ? 'Automatisieren Sie Ihre Geschäftsprozesse mit KI-gestützten Workflows'
      : 'Automate your business processes with AI-powered workflows',
  };

  // Professional Service schema for agency
  const serviceSchema = type === 'agency' ? {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SeventeenLabs Agency',
    url: `${baseUrl}${getLocalizedPath(locale as Locale, '/products')}`,
    description: isGerman
      ? 'Maßgeschneiderte Softwareentwicklung, KI-Integration und Workflow-Automatisierung'
      : 'Custom software development, AI integration, and workflow automation services',
    serviceType: ['Software Development', 'AI Integration', 'Workflow Automation', 'Consulting'],
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'SeventeenLabs',
    },
  } : null;

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {type === 'home' && (
        <Script
          id="software-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      )}
      {type === 'agency' && serviceSchema && (
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      )}
      {faqItems && faqItems.length > 0 && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((faq: FAQItem) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
