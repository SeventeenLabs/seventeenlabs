import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/notion-blog';

export const revalidate = 3600;

function buildQA(post: Awaited<ReturnType<typeof getAllPosts>>[number]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const focus = post.category || 'AI automation';

  return {
    slug: post.slug,
    title: post.title,
    url: `${baseUrl}/blog/${post.slug}`,
    localeUrls: {
      en: `${baseUrl}/blog/${post.slug}`,
    },
    qna: [
      {
        question: `What is "${post.title}" about?`,
        answer: post.description || `This article shares SeventeenLabs guidance on ${focus.toLowerCase()}.`,
      },
      {
        question: 'When should teams apply this guidance?',
        answer: `Use it when ${focus.toLowerCase()} is a priority or when similar tags (${post.tags?.slice(0, 3).join(', ') || 'automation readiness'}) surface in requests.`,
      },
      {
        question: 'What outcome can readers expect?',
        answer: 'Readers will leave with a practical playbook, KPIs to monitor, and tooling recommendations validated in client work.',
      },
    ],
  };
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts.map(buildQA);

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
