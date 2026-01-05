import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getAllAuthors, getPostsByAuthor, getAuthorSlug, getAuthorBySlug } from '@/lib/notion-blog';
import { BlogPageClient } from '../../BlogPageClient';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generatePersonSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { BASE_URL } from '@/lib/seo/config';
import { AutoBreadcrumb } from '@/components/seo/breadcrumb';

interface AuthorPageProps {
  params: Promise<{
    author: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { author } = await params;
  const decodedAuthor = decodeURIComponent(author);
  
  const authorName = await getAuthorBySlug(decodedAuthor);
  if (!authorName) {
    return {};
  }
  
  const authorPosts = await getPostsByAuthor(authorName);
  const postCount = authorPosts.length;

  return generatePageMetadata({
    title: `${authorName} - Author at SeventeenLabs`,
    description: `Read ${postCount} article${postCount !== 1 ? 's' : ''} by ${authorName} on AI automation, workflows, and business optimization.`,
    path: `/blog/author/${author}`,
    locale: 'en',
    keywords: [authorName, 'author', 'AI automation articles', 'blog'],
  });
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ 
    author: getAuthorSlug(author), 
    locale: 'en' 
  }));
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author, locale } = await params;
  
  // Blog is English-only for now
  if (locale === 'de') {
    redirect(`/blog/author/${author}`);
  }
  
  const decodedAuthor = decodeURIComponent(author);
  const authorName = await getAuthorBySlug(decodedAuthor);
  
  if (!authorName) {
    notFound();
  }
  
  const authorPosts = await getPostsByAuthor(authorName);

  if (authorPosts.length === 0) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  // Person structured data for E-E-A-T
  const personSchema = generatePersonSchema({
    name: authorName,
    jobTitle: 'AI Automation Expert',
    description: `${authorName} writes about AI automation, workflow optimization, and business process improvements at SeventeenLabs.`,
    url: `${baseUrl}/blog/author/${author}`,
  });

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: authorName },
  ]);

  // Collection page schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Articles by ${authorName}`,
    description: `Browse ${authorPosts.length} articles written by ${authorName}`,
    url: `${baseUrl}/blog/author/${author}`,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: authorPosts.length,
      itemListElement: authorPosts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <AutoBreadcrumb
            path={`/blog/author/${author}`}
            locale="en"
            labels={{ [author]: authorName }}
          />
        </div>
      </div>
      
      {/* Author Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{authorName}</h1>
              <p className="text-gray-600 mt-1">
                {authorPosts.length} article{authorPosts.length !== 1 ? 's' : ''} published
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <BlogPageClient
        allPosts={authorPosts}
        featuredPost={null}
        pageTitle={`Articles by ${authorName}`}
        pageDescription={`Browse all articles written by ${authorName}`}
      />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour
