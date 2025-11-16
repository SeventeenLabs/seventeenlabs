import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/notion-blog';
import { BlogPostClient } from './BlogPostClient';
import { getLocaleFromString } from '@/lib/i18n/config';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const post = await getPostBySlug(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const blogPath = validLocale === 'de' ? '/de/blog' : '/blog';

  const imageUrl = post.featured_image 
    ? (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image)
    : `${baseUrl}/images/blog/default-og.png`;

  const canonicalUrl = `${baseUrl}${blogPath}/${post.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: post.meta_title || post.title,
    description: post.meta_description || post.description,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author_name,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SeventeenLabs',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-white.svg`,
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    inLanguage: validLocale === 'de' ? 'de-DE' : 'en-US',
    url: canonicalUrl,
    keywords: post.tags,
    articleSection: post.category,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: post.meta_title || `${post.title} | SeventeenLabs Blog`,
    description: post.meta_description || post.description,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author_name, url: `${baseUrl}/about` }],
    creator: post.author_name,
    publisher: 'SeventeenLabs',
    category: post.category,
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
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/blog/${post.slug}`,
        'de': `${baseUrl}/de/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.description,
      type: 'article',
      locale: validLocale === 'de' ? 'de_DE' : 'en_US',
      url: canonicalUrl,
      siteName: 'SeventeenLabs',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      section: post.category,
      tags: post.tags,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.image_alt || post.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.description,
      creator: '@seventeenlabs',
      site: '@seventeenlabs',
      images: [{
        url: imageUrl,
        alt: post.image_alt || post.title,
      }],
    },
    other: {
      ...{
        'article:author': post.author_name,
        'article:published_time': post.published_at,
        'article:modified_time': post.updated_at,
        'article:section': post.category,
        'article:tag': post.tags?.join(','),
      },
      'script:type:application/ld+json': JSON.stringify(articleJsonLd),
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  // Generate paths for both locales
  const paths = [];
  for (const post of posts) {
    paths.push({ slug: post.slug, locale: 'en' });
    paths.push({ slug: post.slug, locale: 'de' });
  }
  
  return paths;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const validLocale = getLocaleFromString(locale);
  
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale={validLocale} />;
}
