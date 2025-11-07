import { BlogPost, BlogPostMetadata } from '@/lib/notion-blog';

interface BlogStructuredDataProps {
  posts: (BlogPost | BlogPostMetadata)[];
}

export function BlogStructuredData({ posts }: BlogStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seventeenlabs.com';
  
  // Handle empty or undefined posts
  if (!posts || posts.length === 0) {
    return null;
  }
  
  // If single post, create article structured data
  if (posts.length === 1) {
    const post = posts[0];
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const imageUrl = post.featured_image ? `${siteUrl}${post.featured_image}` : `${siteUrl}/images/blog/default-og.jpg`;
    const wordCount = 'content' in post ? post.content.split(/\s+/).length : 500; // Default word count for metadata

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${postUrl}#article`,
          headline: post.title,
          description: post.description,
          image: imageUrl,
          author: {
            '@type': 'Person',
            name: post.author_name,
            url: `${siteUrl}/about`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'SeventeenLabs',
            url: siteUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/logo.png`,
              width: 200,
              height: 60,
            },
          },
          datePublished: post.published_at || post.created_at,
          dateModified: post.updated_at,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
          },
          articleSection: post.category,
          keywords: post.tags.join(', '),
          wordCount: wordCount,
          inLanguage: 'en-US',
        },
        {
          '@type': 'WebPage',
          '@id': postUrl,
          url: postUrl,
          name: post.title,
          description: post.description,
          isPartOf: {
            '@id': `${siteUrl}#website`,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            '@id': `${imageUrl}#primaryimage`,
          },
          datePublished: post.published_at || post.created_at,
          dateModified: post.updated_at,
          breadcrumb: {
            '@id': `${postUrl}#breadcrumb`,
          },
          inLanguage: 'en-US',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${postUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${siteUrl}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: postUrl,
            },
          ],
        },
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }

  // For blog listing page, create blog structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SeventeenLabs Blog',
    description: 'Expert insights on workflow automation, AI integration, and business process optimization.',
    url: `${siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'SeventeenLabs',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.published_at || post.created_at,
      author: {
        '@type': 'Person',
        name: post.author_name,
      },
      image: post.featured_image ? `${siteUrl}${post.featured_image}` : `${siteUrl}/images/blog/default-og.jpg`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}