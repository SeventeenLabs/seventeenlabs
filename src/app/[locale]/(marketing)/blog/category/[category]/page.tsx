import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getAllCategories } from '@/lib/notion-blog';
import { BlogPageClient } from '../../BlogPageClient';
import { BlogSEO } from '@/components/blog/blog-seo';
import { generateCategoryMetadata } from '@/lib/seo/metadata';
import { AutoBreadcrumb } from '@/components/seo/breadcrumb';

interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  
  const allPosts = await getAllPosts();
  const categoryPosts = allPosts.filter(post => 
    post.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return generateCategoryMetadata(decodedCategory, categoryPosts.length);
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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 pt-8">
          <AutoBreadcrumb
            path={`/blog/category/${category}`}
            locale="en"
            labels={{ [category]: decodedCategory }}
          />
        </div>
      </div>
      <BlogPageClient 
        allPosts={categoryPosts}
        featuredPost={null}
        pageTitle={decodedCategory}
        pageDescription={`${categoryPosts.length} articles in the ${decodedCategory} category`}
      />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour