import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllCategories } from '@/lib/notion-blog';
import { BlogPageClient } from '../../BlogPageClient';
import { getLocaleFromString } from '@/lib/i18n/config';
import { BlogSEO } from '@/components/blog/blog-seo';

interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category, locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  const decodedCategory = decodeURIComponent(category);
  const blogPath = isGerman ? '/de/blog' : '/blog';
  const categoryUrl = `${baseUrl}${blogPath}/category/${category}`;
  
  const title = isGerman 
    ? `${decodedCategory} Posts | SeventeenLabs KI-Automatisierung Blog`
    : `${decodedCategory} Posts | SeventeenLabs AI Automation Blog`;
    
  const description = isGerman
    ? `Entdecken Sie alle Artikel in der Kategorie ${decodedCategory}. Expertenleitfäden und Fallstudien zur KI-Automatisierung.`
    : `Discover all posts in the ${decodedCategory} category. Expert guides and case studies for AI automation.`;

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
      locale: isGerman ? 'de_DE' : 'en_US',
      url: categoryUrl,
      siteName: 'SeventeenLabs',
    },
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const params = [];
  
  for (const category of categories) {
    params.push({ category: encodeURIComponent(category), locale: 'en' });
    params.push({ category: encodeURIComponent(category), locale: 'de' });
  }
  
  return params;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const decodedCategory = decodeURIComponent(category);
  
  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

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
        locale={validLocale}
        type="category"
        category={decodedCategory}
      />
      <BlogPageClient 
        allPosts={categoryPosts}
        featuredPost={null}
        categories={categories}
        locale={validLocale}
        pageTitle={decodedCategory}
      />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour