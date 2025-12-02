import { BlogPost, BlogPostMetadata } from '@/lib/notion-blog';

interface BlogSEOProps {
  post?: BlogPost;
  posts?: BlogPostMetadata[];
  locale: 'en' | 'de';
  type: 'blog-index' | 'blog-post' | 'category' | 'tag';
  category?: string;
  tag?: string;
}

export function BlogSEO({ post, posts, locale, type, category, tag }: BlogSEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const isGerman = locale === 'de';
  const blogPath = isGerman ? '/de/blog' : '/blog';
  const blogUrl = `${baseUrl}${blogPath}`;

  // Blog index structured data
  if (type === 'blog-index' && posts) {
    const blogStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${blogUrl}#blog`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': blogUrl,
      },
      name: isGerman ? 'SeventeenLabs KI-Automatisierung Blog' : 'SeventeenLabs AI Automation Blog',
      description: isGerman
        ? 'Expertenleitfäden und Fallstudien zur KI-Automatisierung für Unternehmen.'
        : 'Expert guides and case studies for AI automation in business.',
      url: blogUrl,
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'SeventeenLabs',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo-white.svg`,
        },
      },
      inLanguage: isGerman ? 'de-DE' : 'en-US',
      blogPost: posts.slice(0, 10).map(blogPost => ({
        '@type': 'BlogPosting',
        '@id': `${blogUrl}/${blogPost.slug}#article`,
        headline: blogPost.title,
        description: blogPost.description,
        url: `${blogUrl}/${blogPost.slug}`,
        datePublished: blogPost.published_at,
        dateModified: blogPost.updated_at || blogPost.published_at,
        author: {
          '@type': 'Person',
          name: blogPost.author_name,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
    );
  }

  // Individual blog post structured data  
  if (type === 'blog-post' && post) {
    const canonicalUrl = `${blogUrl}/${post.slug}`;
    const imageUrl = post.featured_image 
      ? (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image)
      : `${baseUrl}/images/blog/default-og.png`;

    const articleStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      headline: post.meta_title || post.title,
      alternativeHeadline: post.title !== (post.meta_title || post.title) ? post.title : undefined,
      description: post.meta_description || post.description,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.image_alt || post.title,
      },
      author: {
        '@type': 'Person',
        name: post.author_name,
        url: `${baseUrl}/about`,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'SeventeenLabs',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo-white.svg`,
          width: 400,
          height: 100,
        },
      },
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      inLanguage: isGerman ? 'de-DE' : 'en-US',
      url: canonicalUrl,
      keywords: post.tags?.join(', '),
      articleSection: post.category,
      wordCount: post.content?.split(/\s+/).length || 0,
      timeRequired: `PT${post.reading_time || Math.ceil((post.content?.split(/\s+/).length || 500) / 200)}M`,
      about: {
        '@type': 'Thing',
        name: post.category || 'AI Automation',
      },
      isPartOf: {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        name: isGerman ? 'SeventeenLabs KI-Automatisierung Blog' : 'SeventeenLabs AI Automation Blog',
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
    );
  }

  // Category or tag archive structured data
  if ((type === 'category' || type === 'tag') && posts) {
    const archiveUrl = type === 'category' 
      ? `${blogUrl}/category/${category}` 
      : `${blogUrl}/tag/${tag}`;
    
    const collectionStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${archiveUrl}#collection`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': archiveUrl,
      },
      name: type === 'category' 
        ? `${category} Posts - ${isGerman ? 'SeventeenLabs Blog' : 'SeventeenLabs Blog'}`
        : `${tag} Posts - ${isGerman ? 'SeventeenLabs Blog' : 'SeventeenLabs Blog'}`,
      description: type === 'category'
        ? `Browse all posts in the ${category} category.`
        : `Browse all posts tagged with ${tag}.`,
      url: archiveUrl,
      isPartOf: {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        name: isGerman ? 'SeventeenLabs KI-Automatisierung Blog' : 'SeventeenLabs AI Automation Blog',
      },
      hasPart: posts.map(blogPost => ({
        '@type': 'BlogPosting',
        '@id': `${blogUrl}/${blogPost.slug}#article`,
        headline: blogPost.title,
        description: blogPost.description,
        url: `${blogUrl}/${blogPost.slug}`,
        datePublished: blogPost.published_at,
        dateModified: blogPost.updated_at || blogPost.published_at,
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
      />
    );
  }

  return null;
}