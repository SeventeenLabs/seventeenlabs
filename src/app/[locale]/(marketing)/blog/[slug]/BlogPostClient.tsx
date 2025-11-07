'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost, BlogPostMetadata } from '@/lib/notion-blog';
import { BlogCard } from '@/components/blog/blog-card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPostMetadata[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <article className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{post.title}</li>
            </ol>
          </nav>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center text-sm font-semibold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-semibold">
                {post.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {post.author_name}
                </div>
                <div className="text-sm text-gray-600">{formattedDate}</div>
              </div>
            </div>

            {post.reading_time && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.reading_time} min read</span>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.featured_image}
                alt={post.image_alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="notion-content prose prose-lg max-w-none
            prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:scroll-mt-24
            prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:font-bold prose-h1:leading-tight
            prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:font-semibold prose-h2:leading-tight
            prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-h3:font-medium prose-h3:leading-tight
            prose-h4:text-base md:prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2 prose-h4:font-medium
            prose-p:text-gray-800 prose-p:leading-7 prose-p:mb-3 prose-p:text-base prose-p:font-normal
            prose-a:text-blue-600 prose-a:underline prose-a:decoration-blue-200 prose-a:underline-offset-2 hover:prose-a:decoration-blue-400
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-em:text-gray-700 prose-em:italic
            prose-code:text-red-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
            prose-pre:code:text-gray-800 prose-pre:code:bg-transparent prose-pre:code:p-0
            prose-ul:my-3 prose-ul:pl-6
            prose-ol:my-3 prose-ol:pl-6
            prose-li:text-gray-800 prose-li:leading-6 prose-li:my-1 prose-li:pl-1
            prose-li:marker:text-gray-500
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-6
            prose-blockquote:text-gray-700 prose-blockquote:bg-gray-50 prose-blockquote:italic prose-blockquote:font-normal
            prose-img:rounded-lg prose-img:shadow-sm prose-img:my-8
            prose-hr:border-gray-200 prose-hr:my-8
            prose-table:text-sm prose-table:my-6
            prose-thead:bg-gray-50 prose-thead:border-b prose-thead:border-gray-200
            prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:px-3 prose-th:py-2
            prose-td:text-gray-800 prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-gray-100
            [&_.notion-callout]:bg-blue-50 [&_.notion-callout]:border [&_.notion-callout]:border-blue-200 [&_.notion-callout]:rounded-lg [&_.notion-callout]:p-4 [&_.notion-callout]:my-6
            [&_.notion-callout-icon]:text-blue-600 [&_.notion-callout-icon]:mr-2
            [&_.notion-toggle]:cursor-pointer [&_.notion-toggle]:select-none
            [&_.notion-toggle-content]:ml-4 [&_.notion-toggle-content]:mt-2"
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom components for better Notion-like styling
                h1: ({ children }) => (
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3 first:mt-0 leading-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 mt-6 mb-2 first:mt-0 leading-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-800 leading-7 mb-3 text-base font-normal">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <div className="border-l-3 border-gray-300 pl-4 py-3 my-4 bg-gray-50/50 rounded-r-md">
                    <div className="text-gray-700 font-normal">
                      {children}
                    </div>
                  </div>
                ),
                code: ({ children, ...props }: any) => {
                  const inline = !props.className?.includes('language-');
                  if (inline) {
                    return (
                      <code className="text-red-600 bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 font-mono text-sm overflow-x-auto">
                      {children}
                    </code>
                  );
                },
                ul: ({ children }) => (
                  <ul className="my-3 pl-6 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-3 pl-6 space-y-1 list-decimal">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-800 leading-6 pl-1 relative">
                    <span className="absolute -left-5 top-0 text-gray-500">•</span>
                    {children}
                  </li>
                ),
                img: ({ src, alt }) => (
                  <div className="my-8">
                    <img 
                      src={src} 
                      alt={alt} 
                      className="rounded-lg shadow-sm w-full"
                    />
                    {alt && (
                      <p className="text-sm text-gray-500 text-center mt-2 italic">
                        {alt}
                      </p>
                    )}
                  </div>
                ),
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50 border-b border-gray-200">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="text-left font-semibold text-gray-900 px-3 py-2 border-r border-gray-200 last:border-r-0">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="text-gray-800 px-3 py-2 border-b border-gray-100 border-r border-gray-200 last:border-r-0">
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600">
                Continue exploring AI automation insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Implement AI Automation?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you transform your business with AI automation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-8 h-12 text-base font-semibold transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
