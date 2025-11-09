import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: {
    id?: string;
    url?: string;
  };
  date?: string;
}

interface RelatedPostsProps {
  currentPostSlug: string;
  posts: BlogPost[];
  t: {
    relatedPosts: string;
    readMore: string;
  };
}

export function RelatedPosts({ currentPostSlug, posts, t }: RelatedPostsProps) {
  // Filter out the current post and limit to 2 related posts
  const relatedPosts = posts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, 2);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-900 mb-8">
        {t.relatedPosts}
      </h3>
      
      <div className="grid gap-8 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <article
            key={post.id || post.slug}
            className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            {post.coverImage?.url && (
              <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h4>
              
              {post.excerpt && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                aria-label={`Read more about ${post.title}`}
              >
                {t.readMore}
                <svg 
                  className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}