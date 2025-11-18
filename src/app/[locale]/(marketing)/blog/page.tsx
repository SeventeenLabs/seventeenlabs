import { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/notion-blog';
import { BlogPageClient } from './BlogPageClient';
import { getLocaleFromString } from '@/lib/i18n/config';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  const title = isGerman 
    ? 'Blog | SeventeenLabs - KI-Automatisierung für Unternehmen'
    : 'Blog | SeventeenLabs - AI Automation for Business';
    
  const description = isGerman
    ? 'Entdecken Sie Expertenleitfäden und Fallstudien zur KI-Automatisierung für Unternehmen. Lernen Sie bewährte Strategien zur Workflow-Optimierung und Geschäftstransformation.'
    : 'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.';

  const keywords = isGerman
    ? 'KI Automatisierung, Geschäftsprozesse, Workflow Optimierung, Digitale Transformation, Machine Learning, Unternehmenssoftware'
    : 'AI automation, business processes, workflow optimization, digital transformation, machine learning, enterprise software';

  const blogUrl = isGerman ? `${baseUrl}/de/blog` : `${baseUrl}/blog`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: isGerman ? `${baseUrl}/de` : baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: blogUrl,
      },
    ],
  };

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    authors: [{ name: 'SeventeenLabs', url: baseUrl }],
    creator: 'SeventeenLabs',
    publisher: 'SeventeenLabs',
    category: 'Technology',
    classification: 'Business, Technology, AI, Automation',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: blogUrl,
      languages: {
        'en': `${baseUrl}/blog`,
        'de': `${baseUrl}/de/blog`,
          'x-default': `${baseUrl}/blog`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: blogUrl,
      siteName: 'SeventeenLabs',
      images: [{
        url: `${baseUrl}/images/blog/blog-og.png`,
        width: 1200,
        height: 630,
        alt: isGerman ? 'SeventeenLabs KI-Automatisierung Blog' : 'SeventeenLabs AI Automation Blog',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@seventeenlabs',
      site: '@seventeenlabs',
      images: [{
        url: `${baseUrl}/images/blog/blog-og.png`,
        alt: isGerman ? 'SeventeenLabs KI-Automatisierung Blog' : 'SeventeenLabs AI Automation Blog',
      }],
    },
    other: {
      'script:type:application/ld+json': JSON.stringify(breadcrumbJsonLd),
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  
  const [allPosts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(1),
    getAllCategories(),
  ]);

  return (
    <BlogPageClient 
      allPosts={allPosts}
      featuredPost={featuredPosts[0] || null}
      categories={categories}
      locale={validLocale}
    />
  );
}
