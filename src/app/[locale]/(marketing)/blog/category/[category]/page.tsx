import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getAllCategories } from '@/lib/notion-blog';
import { BlogPageClient } from '../../BlogPageClient';
import { BlogSEO } from '@/components/blog/blog-seo';

interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  const decodedCategory = decodeURIComponent(category);
  const categoryUrl = `${baseUrl}/blog/category/${category}`;
  
  const title = `${decodedCategory} Posts | SeventeenLabs AI Automation Blog`;
  const description = `Discover all posts in the ${decodedCategory} category. Expert guides and case studies for AI automation.`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: categoryUrl,
      siteName: 'SeventeenLabs',
    },
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category: encodeURIComponent(category), locale: 'en' }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = await params;
  if (locale === 'de') {
    redirect(`/blog/category/${category}`);
  }
  const decodedCategory = decodeURIComponent(category);
  
  const allPosts = await getAllPosts();

  const categoryPosts = allPosts.filter(post => 
    post.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <>
      <BlogSEO 
        posts={categoryPosts}
        type="category"
        category={decodedCategory}
      />
      <BlogPageClient 
        allPosts={categoryPosts}
        featuredPost={null}
        pageTitle={decodedCategory}
      />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour