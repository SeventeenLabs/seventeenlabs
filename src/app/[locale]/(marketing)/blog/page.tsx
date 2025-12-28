import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAllPosts, getFeaturedPosts } from '@/lib/notion-blog';
import { BlogPageClient } from './BlogPageClient';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const blogUrl = `${baseUrl}/blog`;

  return {
    metadataBase: new URL(baseUrl),
    title: 'Blog | SeventeenLabs - AI Automation for Business',
    description:
      'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
    keywords: 'AI automation, business processes, workflow optimization, digital transformation, machine learning, enterprise software',
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
    },
    openGraph: {
      title: 'Blog | SeventeenLabs - AI Automation for Business',
      description:
        'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
      type: 'website',
      locale: 'en_US',
      url: blogUrl,
      siteName: 'SeventeenLabs',
      images: [{
        url: `${baseUrl}/images/blog/blog-og.png`,
        width: 1200,
        height: 630,
        alt: 'SeventeenLabs AI Automation Blog',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | SeventeenLabs - AI Automation for Business',
      description:
        'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
      creator: '@seventeenlabs',
      site: '@seventeenlabs',
      images: [{
        url: `${baseUrl}/images/blog/blog-og.png`,
        alt: 'SeventeenLabs AI Automation Blog',
      }],
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  if (locale === 'de') {
    redirect('/blog');
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const blogUrl = `${baseUrl}/blog`;

  const [allPosts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(1),
  ]);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: blogUrl,
      },
    ],
  };

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
    name: 'SeventeenLabs AI Automation Blog',
    description: 'Explore expert guides and case studies for AI automation in business.',
    url: blogUrl,
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'SeventeenLabs',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-white.svg`,
      },
    },
    inLanguage: 'en-US',
    blogPost: allPosts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${blogUrl}/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      url: `${blogUrl}/${post.slug}`,
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      author: {
        '@type': 'Person',
        name: post.author_name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPageClient
        allPosts={allPosts}
        featuredPost={featuredPosts[0] || null}
      />
    </>
  );
}
