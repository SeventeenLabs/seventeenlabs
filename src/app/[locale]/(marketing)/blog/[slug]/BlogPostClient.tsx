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
  locale: 'en' | 'de';
}

export function BlogPostClient({ post, relatedPosts, locale }: BlogPostClientProps) {
  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const blogPath = locale === 'de' ? '/de/blog' : '/blog';
  const postUrl = `${baseUrl}${blogPath}/${post.slug}`;
  
  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: post.description,
        image: {
          '@type': 'ImageObject',
          url: post.featured_image ? 
            (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image) :
            `${baseUrl}/images/blog/default-og.png`,
          width: 1200,
          height: 630,
        },
        author: {
          '@type': 'Person',
          name: post.author_name,
          url: `${baseUrl}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SeventeenLabs',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo_dark.png`,
          },
        },
        datePublished: post.published_at,
        dateModified: post.updated_at,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
        articleSection: post.category,
        keywords: post.tags?.join(', '),
        wordCount: Math.ceil(post.content.length / 5), // Rough word count
        timeRequired: `PT${post.reading_time}M`,
        inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': postUrl,
        url: postUrl,
        name: post.title,
        description: post.description,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'SeventeenLabs',
          url: baseUrl,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: post.featured_image ? 
            (post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image) :
            `${baseUrl}/images/blog/default-og.png`,
        },
        datePublished: post.published_at,
        dateModified: post.updated_at,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${baseUrl}${blogPath}`,
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
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href={locale === 'de' ? '/de' : '/'} className="group flex items-center gap-3" aria-label="Go to SeventeenLabs homepage">
              <Image
                src="/logo_dark.png"
                alt="SeventeenLabs"
                width={180}
                height={42}
                className="w-[27px] sm:w-[30px] md:w-[33px] lg:w-[37px] h-auto transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Back to Blog Link - Hidden on very small screens */}
              <Link 
                href={locale === 'de' ? '/de/blog' : '/blog'} 
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Return to blog listing page"
              >
                <span className="text-sm font-medium">← Back to Blog</span>
              </Link>
              
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className={`px-2 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
                    locale === 'en' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View this article in English"
                >
                  EN
                </Link>
                <Link
                  href={`/de/blog/${post.slug}`}
                  className={`px-2 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
                    locale === 'de' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="View this article in German"
                >
                  DE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <article className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center text-sm font-semibold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="space-y-4 pb-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
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
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 5).map((tag) => (
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

        {/* Content */}
        <div className="max-w-4xl mx-auto mt-12 px-6 sm:px-8 lg:px-12">
          <div className="notion-content prose prose-lg max-w-none
            prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:scroll-mt-24
            prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:font-bold prose-h1:leading-tight
            prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:font-semibold prose-h2:leading-tight
            prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-h3:font-medium prose-h3:leading-tight
            prose-h4:text-base md:prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2 prose-h4:font-medium
            prose-p:text-gray-800 prose-p:leading-7 prose-p:mb-3 prose-p:text-base prose-p:font-normal
            prose-a:text-blue-600 prose-a:font-medium prose-a:underline prose-a:decoration-blue-300 prose-a:underline-offset-2 hover:prose-a:text-blue-700 hover:prose-a:decoration-blue-500 prose-a:transition-colors
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
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium underline decoration-blue-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-500 transition-colors duration-200"
                  >
                    {children}
                  </a>
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
                  <ul className="my-3 pl-6 space-y-1 list-disc [&>li]:list-item">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-3 pl-6 space-y-1 list-decimal [&>li]:list-item">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-800 leading-6 pl-1">
                    {children}
                  </li>
                ),
                img: ({ src, alt }) => (
                  <>
                    <img 
                      src={src} 
                      alt={alt} 
                      className="rounded-lg shadow-sm w-full my-8 block"
                    />
                    {alt && (
                      <span className="text-sm text-gray-500 text-center mt-2 italic block">
                        {alt}
                      </span>
                    )}
                  </>
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
                    href={`${locale === 'de' ? '/de/blog' : '/blog'}?tag=${encodeURIComponent(tag)}`}
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
        <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gray-50/50">
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
                <BlogCard key={relatedPost.id} post={relatedPost} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative bg-black py-24 lg:py-32">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
                Ready to Transform Your Business with AI?
              </h2>
              
              <p className="text-lg text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                From strategy to implementation—we help you harness the power of AI automation to streamline operations and accelerate growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/services/ai-audit"
                  className="group relative px-8 py-4 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 inline-flex items-center gap-2 justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start with Free AI Audit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2 justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Schedule Consultation
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-white/40 mb-4">Trusted by forward-thinking businesses</p>
                <div className="flex justify-center items-center gap-8 text-white/30">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs">Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">No Long-term Commitment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">Expert Guidance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
