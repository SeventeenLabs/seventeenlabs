import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/notion-blog';

export const revalidate = 3600;

const intentMap: Record<string, string> = {
  'AI Audit': 'ai_audit_readiness',
  'Workflow': 'workflow_orchestration',
  'RevOps': 'revenue_operations',
  'Marketing': 'marketing_automation',
  'Strategy': 'automation_strategy',
};

function deriveIntent(category?: string, tags?: string[]) {
  if (category && intentMap[category]) {
    return intentMap[category];
  }

  if (category) {
    return category.toLowerCase().replace(/\s+/g, '_');
  }

  const firstTag = tags?.[0];
  if (firstTag) {
    return firstTag.toLowerCase().replace(/\s+/g, '_');
  }

  return 'ai_automation';
}

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  const topics = posts.map((post) => {
    const primaryIntent = deriveIntent(post.category, post.tags);
    const secondaryIntents = (post.tags || [])
      .map((tag) => tag.toLowerCase().replace(/\s+/g, '_'))
      .filter((intent) => intent !== primaryIntent);

    return {
      slug: post.slug,
      title: post.title,
      category: post.category,
      summary: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      intents: [primaryIntent, ...secondaryIntents],
      tags: post.tags,
    };
  });

  return NextResponse.json({
    updated: new Date().toISOString(),
    topics,
  }, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
