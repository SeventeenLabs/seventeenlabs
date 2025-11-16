import { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/notion-blog';
import { BlogPageClient } from '../[locale]/(marketing)/blog/BlogPageClient';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Blog | SeventeenLabs - AI Automation for Business',
  description:
    'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
  alternates: {
    canonical: `${baseUrl}/blog`,
    languages: {
      en: `${baseUrl}/blog`,
      de: `${baseUrl}/de/blog`,
    },
  },
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
  openGraph: {
    title: 'Blog | SeventeenLabs - AI Automation for Business',
    description:
      'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
    type: 'website',
    url: `${baseUrl}/blog`,
    siteName: 'SeventeenLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | SeventeenLabs - AI Automation for Business',
    description:
      'Explore expert guides and case studies for AI automation in business. Learn proven strategies for workflow optimization and business transformation.',
    creator: '@seventeenlabs',
    site: '@seventeenlabs',
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
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
      locale="en"
    />
  );
}