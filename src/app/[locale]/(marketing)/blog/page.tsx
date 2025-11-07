import { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/notion-blog';
import { BlogPageClient } from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | SeventeenLabs - AI Automation Insights',
  description: 'Explore insights, tutorials, and best practices for AI automation, workflow optimization, and business transformation.',
  openGraph: {
    title: 'Blog | SeventeenLabs',
    description: 'Explore insights, tutorials, and best practices for AI automation, workflow optimization, and business transformation.',
    type: 'website',
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
    />
  );
}
