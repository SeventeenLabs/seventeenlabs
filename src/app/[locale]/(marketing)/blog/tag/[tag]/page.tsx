import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getAllTags } from '@/lib/notion-blog';
import { BlogPageClient } from '../../BlogPageClient';
import { generateTagMetadata } from '@/lib/seo/metadata';
import { AutoBreadcrumb } from '@/components/seo/breadcrumb';

interface TagPageProps {
  params: Promise<{
    tag: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  const allPosts = await getAllPosts();
  const tagPosts = allPosts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  );

  return generateTagMetadata(decodedTag, tagPosts.length);
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag), locale: 'en' }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag, locale } = await params;
  
  // Blog is English-only for now
  if (locale === 'de') {
    redirect(`/blog/tag/${tag}`);
  }
  
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getAllPosts();

  const tagPosts = allPosts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  );

  if (tagPosts.length === 0) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  // Structured data for tag collection
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Posts tagged "${decodedTag}"`,
    description: `Browse ${tagPosts.length} articles tagged with ${decodedTag}`,
    url: `${baseUrl}/blog/tag/${tag}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tagPosts.length,
      itemListElement: tagPosts.slice(0, 10).map((post, index) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 pt-8">
          <AutoBreadcrumb
            path={`/blog/tag/${tag}`}
            locale="en"
            labels={{ [tag]: decodedTag }}
          />
        </div>
      </div>
      <BlogPageClient
        allPosts={tagPosts}
        featuredPost={null}
        pageTitle={`Tagged: ${decodedTag}`}
        pageDescription={`${tagPosts.length} articles tagged with "${decodedTag}"`}
      />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour
