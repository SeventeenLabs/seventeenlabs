import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogPostMetadata } from '@/lib/notion-blog';
import { useState } from 'react';

interface BlogCardProps {
  post: BlogPostMetadata;
  locale?: 'en' | 'de';
}

export function BlogCard({ post, locale = 'en' }: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMM dd, yyyy');

  const blogPath = locale === 'de' ? '/de/blog' : '/blog';

  // Debug logging for featured image
  console.log(`🎴 BlogCard for "${post.title}":`, {
    id: post.id,
    title: post.title,
    featured_image: post.featured_image,
    image_alt: post.image_alt,
    hasImage: !!post.featured_image
  });

  return (
    <Link href={`${blogPath}/${post.slug}`} className="group block" aria-label={`Read article: ${post.title}`}>
      <article className="relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full min-h-[520px] flex flex-col group-hover:-translate-y-1" itemScope itemType="https://schema.org/BlogPosting">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          {/* Always show fallback first */}
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-white text-lg font-semibold leading-tight line-clamp-3">
                {post.title}
              </h3>
              <div className="mt-3 w-12 h-0.5 bg-white/30 mx-auto"></div>
              <span className="text-white/70 text-sm mt-2 block">
                {post.category}
              </span>
            </div>
          </div>
          
          {/* Show image only after successful load */}
          {post.featured_image && (
            <Image
              src={post.featured_image}
              alt={post.image_alt || post.title}
              fill
              className={`object-cover group-hover:scale-105 transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          )}
          
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-3 left-3">
              <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                Featured
              </div>
            </div>
          )}
          
          {/* Reading Time Badge */}
          {post.reading_time > 0 && (
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium shadow-sm">
                {post.reading_time}m read
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Category */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight line-clamp-2" itemProp="headline">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow" itemProp="description">
            {post.description}
          </p>

          {/* Author and Date */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                {post.author_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{post.author_name}</span>
                </span>
                <time className="text-xs text-gray-500" itemProp="datePublished" dateTime={new Date(post.published_at || post.created_at).toISOString()}>
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs px-2 py-1 text-gray-400 bg-gray-50 rounded">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}