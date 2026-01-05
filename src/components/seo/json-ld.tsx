/**
 * JSON-LD Components
 * 
 * React components for rendering structured data with proper
 * server-side rendering support.
 */

import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBlogPostSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateProductSchema,
  generateSoftwareSchema,
  type BlogPostSchemaOptions,
  type ServiceSchemaOptions,
  type FAQItem,
  type ProductSchemaOptions,
} from '@/lib/seo/structured-data';
import { Locale } from '@/lib/i18n/config';

// Generic JSON-LD component
interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema Component
interface OrganizationJsonLdProps {
  locale?: Locale;
}

export function OrganizationJsonLd({ locale = 'en' }: OrganizationJsonLdProps) {
  const schema = generateOrganizationSchema(locale);
  return <JsonLd data={schema} />;
}

// Website Schema Component
interface WebsiteJsonLdProps {
  locale?: Locale;
}

export function WebsiteJsonLd({ locale = 'en' }: WebsiteJsonLdProps) {
  const schema = generateWebsiteSchema(locale);
  return <JsonLd data={schema} />;
}

// Article/Blog Post Schema Component
interface ArticleJsonLdProps extends BlogPostSchemaOptions {}

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  const schema = generateBlogPostSchema(props);
  return <JsonLd data={schema} />;
}

// Service Schema Component
interface ServiceJsonLdProps extends ServiceSchemaOptions {}

export function ServiceJsonLd(props: ServiceJsonLdProps) {
  const schema = generateServiceSchema(props);
  return <JsonLd data={schema} />;
}

// FAQ Schema Component
interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schema = generateFAQSchema(faqs);
  return <JsonLd data={schema} />;
}

// Product Schema Component
interface ProductJsonLdProps extends ProductSchemaOptions {}

export function ProductJsonLd(props: ProductJsonLdProps) {
  const schema = generateProductSchema(props);
  return <JsonLd data={schema} />;
}

// Software Application Schema Component
interface SoftwareJsonLdProps {
  locale?: Locale;
}

export function SoftwareJsonLd({ locale = 'en' }: SoftwareJsonLdProps) {
  const schema = generateSoftwareSchema(locale);
  return <JsonLd data={schema} />;
}

// Combined Schema Component for common page types
interface PageJsonLdProps {
  type: 'home' | 'service' | 'product' | 'blog' | 'about';
  locale?: Locale;
  // Additional props for specific types
  serviceData?: ServiceSchemaOptions;
  productData?: ProductSchemaOptions;
  articleData?: BlogPostSchemaOptions;
  faqs?: FAQItem[];
}

export function PageJsonLd({
  type,
  locale = 'en',
  serviceData,
  productData,
  articleData,
  faqs,
}: PageJsonLdProps) {
  return (
    <>
      {/* Always include Organization and Website schema */}
      <OrganizationJsonLd locale={locale} />
      <WebsiteJsonLd locale={locale} />
      
      {/* Type-specific schemas */}
      {type === 'home' && <SoftwareJsonLd locale={locale} />}
      {type === 'service' && serviceData && <ServiceJsonLd {...serviceData} />}
      {type === 'product' && productData && <ProductJsonLd {...productData} />}
      {type === 'blog' && articleData && <ArticleJsonLd {...articleData} />}
      
      {/* FAQ schema if provided */}
      {faqs && faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
    </>
  );
}
