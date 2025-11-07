import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/notion-blog';
import { BlogPostClient } from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.meta_title || `${post.title} | SeventeenLabs Blog`,
    description: post.meta_description || post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
      images: post.featured_image ? [post.featured_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.featured_image ? [post.featured_image] : [],
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
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
