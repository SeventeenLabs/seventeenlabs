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
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {t.relatedPosts}
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link
            key={post.id || post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200 h-full">
              {post.coverImage?.url && (
                <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-md">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h4>
                
                {post.excerpt && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors pt-2">
                  <span className="font-medium">{t.readMore}</span>
                  <svg 
                    className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}