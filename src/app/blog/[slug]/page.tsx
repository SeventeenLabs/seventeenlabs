import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/notion-blog';
import { BlogPostClient } from '../../[locale]/(marketing)/blog/[slug]/BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: post.meta_title || `${post.title} | SeventeenLabs Blog`,
    description: post.meta_description || post.description,
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
        en: canonicalUrl,
        de: `${baseUrl}/de/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      publishedTime: post.published_time,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.description,
      images: post.featured_image ? [post.featured_image] : undefined,
      creator: '@seventeenlabs',
      site: '@seventeenlabs',
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale="en" />;
}