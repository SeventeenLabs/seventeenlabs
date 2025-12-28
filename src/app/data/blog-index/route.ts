import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/notion-blog';

export const revalidate = 3600;

function buildPostRecord(post: Awaited<ReturnType<typeof getAllPosts>>[number]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const canonical = `${baseUrl}/blog/${post.slug}`;

  return {
    id: post.id,
    slug: post.slug,
    urls: {
      en: canonical,
    },
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    featured: post.featured,
    featured_image: post.featured_image || null,
    published_at: post.published_at,
    updated_at: post.updated_at,
    reading_time: post.reading_time,
  };
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts.map(buildPostRecord);

  return NextResponse.json({
    updated: new Date().toISOString(),
    count: items.length,
    items,
  }, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
