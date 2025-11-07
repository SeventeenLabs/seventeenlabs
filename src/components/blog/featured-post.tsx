import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogPostMetadata } from '@/lib/notion-blog';

interface FeaturedPostProps {
  post: BlogPostMetadata;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy');

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
        <div className="lg:flex">
          {/* Image Section */}
          <div className="relative h-80 lg:h-auto lg:w-1/2 overflow-hidden">
            {post.featured_image ? (
              <Image
                src={post.featured_image}
                alt={post.image_alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-7xl font-light">
                  {post.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-8 lg:p-10 lg:w-1/2 flex flex-col justify-center">
            {/* Category */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {post.author_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {post.author_name}
                  </span>
                  <time className="text-sm text-gray-500">{formattedDate}</time>
                </div>
              </div>
              
              {post.reading_time && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.reading_time}m read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
