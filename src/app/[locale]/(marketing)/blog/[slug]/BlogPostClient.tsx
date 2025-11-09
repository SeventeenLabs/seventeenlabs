'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { BlogPost, BlogPostMetadata } from '@/lib/notion-blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { ReadingProgressBar } from '@/components/blog/reading-progress-bar';
import { TextSelectionPopup } from '@/components/blog/text-selection-popup';
import { FloatingShareSidebar } from '@/components/blog/floating-share-sidebar';
import { BlogHeader } from '@/components/blog/blog-header';
import { MobileHeaderBar } from '@/components/blog/mobile-header-bar';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { NewsletterCTA } from '@/components/blog/newsletter-cta';
import { ShareSection } from '@/components/blog/share-section';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ArticleContent } from '@/components/blog/article-content';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPostMetadata[];
  locale: 'en' | 'de';
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function BlogPostClient({ post, relatedPosts, locale }: BlogPostClientProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const [showTitle, setShowTitle] = useState(false);
  
  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const blogPath = locale === 'de' ? '/de/blog' : '/blog';
  const postUrl = `${baseUrl}${blogPath}/${post.slug}`;

  // Enhanced related posts algorithm
  const enhancedRelatedPosts = relatedPosts
    .map(relatedPost => {
      let score = 0;
      
      // Same category gets higher score
      if (relatedPost.category && post.category && relatedPost.category === post.category) {
        score += 3;
      }
      
      // Common tags increase score
      if (post.tags && relatedPost.tags && Array.isArray(post.tags) && Array.isArray(relatedPost.tags)) {
        const commonTags = post.tags.filter(tag => relatedPost.tags?.includes(tag));
        score += commonTags.length * 2;
      }
      
      return { ...relatedPost, relevanceScore: score };
    })
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 3);

  // Extract headings for TOC
  const generateTOC = () => {
    if (!post.content || typeof post.content !== 'string') {
      setTocItems([]);
      return;
    }

    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(post.content)) !== null) {
      const level = match[1]?.length || 1;
      const title = match[2]?.trim() || 'Untitled';
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `heading-${toc.length}`;
      
      toc.push({ id, title, level });
    }

    setTocItems(toc);
  };

  useEffect(() => {
    generateTOC();
  }, [post.content]);

  // Handle scroll progress and visibility
  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          
          // Show progress bar when scrolling
          setIsScrolling(true);
          
          // Clear existing timeout and set new one
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 1500);
          
          // Show title when scrolled past the hero section (roughly 400px)
          setShowTitle(scrollTop > 400);
          
          // Calculate reading progress
          const contentElement = document.querySelector('.notion-content') as HTMLElement;
          if (contentElement) {
            const contentTop = contentElement.getBoundingClientRect().top + window.pageYOffset;
            const contentHeight = contentElement.offsetHeight;
            const windowHeight = window.innerHeight;
            
            const progressStart = contentTop;
            const progressEnd = contentTop + contentHeight - windowHeight;
            
            if (scrollTop < progressStart) {
              setReadingProgress(0);
            } else if (scrollTop > progressEnd) {
              setReadingProgress(100);
            } else {
              const progress = ((scrollTop - progressStart) / (progressEnd - progressStart)) * 100;
              setReadingProgress(Math.max(0, Math.min(100, progress)));
            }
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Handle text selection
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        const contentElement = document.querySelector('.notion-content');
        
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
          setSelectedText('');
          setSelectionRect(null);
          return;
        }

        const text = selection.toString().trim();
        if (text.length < 5) {
          setSelectedText('');
          setSelectionRect(null);
          return;
        }

        // Check if selection is within content
        const range = selection.getRangeAt(0);
        if (!contentElement || !contentElement.contains(range.commonAncestorContainer)) {
          setSelectedText('');
          setSelectionRect(null);
          return;
        }

        const rect = range.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setSelectedText(text);
          setSelectionRect(rect);
        }
      }, 100);
    };

    const handleClickAway = (e: MouseEvent) => {
      const popup = document.querySelector('.selection-quote-popup');
      const content = document.querySelector('.notion-content');
      
      if (popup?.contains(e.target as Node)) {
        return;
      }

      if (!content?.contains(e.target as Node)) {
        clearSelection();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickAway);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, []);

  const clearSelection = () => {
    setSelectedText('');
    setSelectionRect(null);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  // Translations
  const t = {
    newsletter: {
      title: locale === 'de' ? 'Bleiben Sie auf dem Laufenden' : 'Stay Updated',
      description: locale === 'de' 
        ? 'Erhalten Sie die neuesten Insights zu Workflow-Automatisierung und AI-Technologien direkt in Ihr Postfach.'
        : 'Get the latest insights on workflow automation and AI technologies delivered straight to your inbox.',
      placeholder: locale === 'de' ? 'Ihre E-Mail-Adresse' : 'Your email address',
      button: locale === 'de' ? 'Abonnieren' : 'Subscribe',
      success: locale === 'de' ? 'Erfolgreich abonniert!' : 'Successfully subscribed!',
      error: locale === 'de' ? 'Etwas ist schiefgelaufen. Versuchen Sie es erneut.' : 'Something went wrong. Please try again.'
    },
    relatedPosts: locale === 'de' ? 'Ähnliche Artikel' : 'Related Posts',
    readMore: locale === 'de' ? 'Mehr lesen' : 'Read more'
  };

  // Transform posts for RelatedPosts component
  const transformedPosts = enhancedRelatedPosts.map(relatedPost => ({
    id: relatedPost.slug,
    slug: relatedPost.slug,
    title: relatedPost.title,
    excerpt: relatedPost.description || '',
    coverImage: relatedPost.featured_image ? { url: relatedPost.featured_image } : undefined,
    date: relatedPost.published_at || relatedPost.created_at
  }));

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={readingProgress} isVisible={isScrolling || readingProgress > 0} />

      {/* Text Selection Popup */}
      <TextSelectionPopup 
        selectedText={selectedText}
        selectionRect={selectionRect}
        postTitle={post.title}
        postUrl={postUrl}
        onClear={clearSelection}
      />

      {/* Floating Share Sidebar */}
      <FloatingShareSidebar postTitle={post.title} postUrl={postUrl} />

      {/* Blog Header */}
      <BlogHeader 
        post={post}
        locale={locale}
        showTitle={showTitle}
      />

      {/* Mobile Header Bar */}
      <MobileHeaderBar 
        post={post}
        postUrl={postUrl}
        showTitle={showTitle}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <main className="flex-1 max-w-4xl mx-auto lg:mx-0">
              {/* Hero Section */}
              <div className="pt-24">
                {/* Category */}
                {post.category && (
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Title and Description */}
                <div className="mb-8">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {post.title}
                  </h1>
                  {post.description && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </div>

                {/* Author info and meta */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {post.author_name?.charAt(0)?.toUpperCase() || 'S'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{post.author_name}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <time dateTime={post.published_at || post.created_at}>
                        {formattedDate}
                      </time>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.reading_time || Math.ceil((post.content?.length || 0) / 200)} min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.slice(0, 4).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Featured Image */}
                {post.featured_image && (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>
                )}
              </div>

              {/* Table of Contents - Mobile/Tablet */}
              <div className="xl:hidden mb-8">
                <TableOfContents items={tocItems} />
              </div>

              {/* Article Content */}
              <div className="pt-4 pb-8">
                <ArticleContent>
                  <div className="notion-content max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Headings with proper hierarchy and IDs for TOC
                        h1: ({ children, ...props }) => {
                          const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <h1 id={id} className="text-5xl font-bold text-gray-900 leading-tight mb-8 mt-12 first:mt-0 scroll-mt-24" {...props}>
                              {children}
                            </h1>
                          );
                        },
                        h2: ({ children, ...props }) => {
                          const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <h2 id={id} className="text-4xl font-bold text-gray-900 leading-tight mb-6 mt-12 scroll-mt-24" {...props}>
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children, ...props }) => {
                          const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <h3 id={id} className="text-3xl font-semibold text-gray-900 leading-tight mb-5 mt-10 scroll-mt-24" {...props}>
                              {children}
                            </h3>
                          );
                        },
                        h4: ({ children, ...props }) => {
                          const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <h4 id={id} className="text-2xl font-semibold text-gray-900 leading-tight mb-4 mt-8 scroll-mt-24" {...props}>
                              {children}
                            </h4>
                          );
                        },
                        h5: ({ children, ...props }) => {
                          const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <h5 id={id} className="text-xl font-medium text-gray-900 mb-3 mt-6 scroll-mt-24" {...props}>
                              {children}
                            </h5>
                          );
                        },
                        h6: ({ children, ...props }) => {
                          const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <h6 id={id} className="text-lg font-medium text-gray-900 mb-3 mt-6 scroll-mt-24" {...props}>
                              {children}
                            </h6>
                          );
                        },

                        // Text elements
                        p: ({ children, ...props }) => {
                          return (
                            <p className="mb-6 text-gray-700 leading-relaxed text-lg" {...props}>
                              {children}
                            </p>
                          );
                        },
                        
                        // Text formatting
                        strong: ({ children, ...props }) => {
                          return (
                            <strong className="font-bold text-gray-900" {...props}>
                              {children}
                            </strong>
                          );
                        },
                        em: ({ children, ...props }) => {
                          return (
                            <em className="italic text-gray-700" {...props}>
                              {children}
                            </em>
                          );
                        },
                        del: ({ children, ...props }) => {
                          return (
                            <del className="line-through text-gray-500" {...props}>
                              {children}
                            </del>
                          );
                        },
                        mark: ({ children, ...props }) => {
                          return (
                            <mark className="bg-yellow-200 text-gray-900 px-1 rounded" {...props}>
                              {children}
                            </mark>
                          );
                        },
                        sub: ({ children, ...props }) => {
                          return (
                            <sub className="text-xs align-sub" {...props}>
                              {children}
                            </sub>
                          );
                        },
                        sup: ({ children, ...props }) => {
                          return (
                            <sup className="text-xs align-super" {...props}>
                              {children}
                            </sup>
                          );
                        },

                        // Lists
                        ul: ({ children, ...props }) => {
                          return (
                            <ul className="mb-8 space-y-3" {...props}>
                              {children}
                            </ul>
                          );
                        },
                        ol: ({ children, ...props }) => {
                          return (
                            <ol className="mb-8 space-y-3 list-decimal list-outside ml-8" {...props}>
                              {children}
                            </ol>
                          );
                        },
                        li: ({ children, node, ...props }) => {
                          const isOrderedList = node?.parent?.tagName === 'ol';
                          
                          if (isOrderedList) {
                            return (
                              <li className="text-lg text-gray-700 leading-relaxed pl-2" {...props}>
                                {children}
                              </li>
                            );
                          }
                          
                          return (
                            <li className="text-lg text-gray-700 leading-relaxed ml-6 relative list-none" {...props}>
                              <span className="absolute -left-6 top-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                              {children}
                            </li>
                          );
                        },
                        
                        // Task lists (checkboxes)
                        input: ({ type, checked, ...props }) => {
                          if (type === 'checkbox') {
                            return (
                              <input 
                                type="checkbox" 
                                checked={checked}
                                disabled
                                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                {...props} 
                              />
                            );
                          }
                          return <input type={type} {...props} />;
                        },

                        // Links
                        a: ({ children, href, ...props }) => {
                          const isExternal = href?.startsWith('http');
                          const isEmail = href?.startsWith('mailto:');
                          
                          return (
                            <a 
                              href={href} 
                              className="text-gray-900 underline hover:text-gray-700 transition-colors inline-flex items-center gap-1"
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                              {...props}
                            >
                              {children}
                              {isExternal && (
                                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              )}
                              {isEmail && (
                                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              )}
                            </a>
                          );
                        },

                        // Quotes and citations
                        blockquote: ({ children, ...props }) => {
                          return (
                            <blockquote className="border-l-4 border-gray-300 pl-8 my-8 text-gray-600 italic text-lg" {...props}>
                              {children}
                            </blockquote>
                          );
                        },

                        // Code
                        code: ({ children, inline, className, ...props }) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const language = match ? match[1] : '';
                          
                          if (inline) {
                            return (
                              <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm font-mono border" {...props}>
                                {children}
                              </code>
                            );
                          }
                          
                          return (
                            <div className="my-8">
                              {language && (
                                <div className="bg-gray-100 text-gray-600 text-xs font-mono px-4 py-2 border border-b-0 rounded-t-lg">
                                  {language.toUpperCase()}
                                </div>
                              )}
                              <pre className={`bg-gray-50 border text-gray-800 p-6 overflow-x-auto text-sm font-mono ${language ? 'rounded-t-none rounded-b-lg' : 'rounded-lg'}`} {...props}>
                                <code>{children}</code>
                              </pre>
                            </div>
                          );
                        },

                        // Images with captions and different layouts
                        img: ({ src, alt, title, ...props }) => {
                          const isSmall = title?.includes('small');
                          const isLeft = title?.includes('left');
                          const isRight = title?.includes('right');
                          
                          const containerClass = isSmall ? 'max-w-md mx-auto' : 
                                               isLeft ? 'float-left mr-6 mb-4 max-w-sm' :
                                               isRight ? 'float-right ml-6 mb-4 max-w-sm' : '';
                          
                          return (
                            <div className={`my-10 ${containerClass}`}>
                              <img 
                                src={src} 
                                alt={alt || ''} 
                                title={title}
                                className="w-full h-auto rounded-lg shadow-sm"
                                {...props}
                              />
                              {alt && (
                                <p className="text-center text-sm text-gray-500 mt-3 italic">
                                  {alt}
                                </p>
                              )}
                            </div>
                          );
                        },

                        // Dividers
                        hr: ({ ...props }) => {
                          return (
                            <div className="my-12 border-t border-gray-200" {...props}></div>
                          );
                        },

                        // Tables
                        table: ({ children, ...props }) => {
                          return (
                            <div className="my-8 overflow-x-auto">
                              <table className="w-full border-collapse border border-gray-200 text-sm" {...props}>
                                {children}
                              </table>
                            </div>
                          );
                        },
                        thead: ({ children, ...props }) => {
                          return (
                            <thead className="bg-gray-50" {...props}>
                              {children}
                            </thead>
                          );
                        },
                        tbody: ({ children, ...props }) => {
                          return (
                            <tbody className="bg-white" {...props}>
                              {children}
                            </tbody>
                          );
                        },
                        tr: ({ children, ...props }) => {
                          return (
                            <tr className="border-b border-gray-200 hover:bg-gray-50/50" {...props}>
                              {children}
                            </tr>
                          );
                        },
                        th: ({ children, ...props }) => {
                          return (
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900" {...props}>
                              {children}
                            </th>
                          );
                        },
                        td: ({ children, ...props }) => {
                          return (
                            <td className="border border-gray-200 px-4 py-3 text-gray-700" {...props}>
                              {children}
                            </td>
                          );
                        },

                        // Definition lists
                        dl: ({ children, ...props }) => {
                          return (
                            <dl className="my-8 space-y-4" {...props}>
                              {children}
                            </dl>
                          );
                        },
                        dt: ({ children, ...props }) => {
                          return (
                            <dt className="font-semibold text-gray-900 mb-1" {...props}>
                              {children}
                            </dt>
                          );
                        },
                        dd: ({ children, ...props }) => {
                          return (
                            <dd className="text-gray-700 ml-4 mb-3" {...props}>
                              {children}
                            </dd>
                          );
                        },

                        // Keyboard shortcuts
                        kbd: ({ children, ...props }) => {
                          return (
                            <kbd className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs font-mono shadow-sm" {...props}>
                              {children}
                            </kbd>
                          );
                        },

                        // Abbreviations
                        abbr: ({ children, title, ...props }) => {
                          return (
                            <abbr className="border-b border-dotted border-gray-400 cursor-help" title={title} {...props}>
                              {children}
                            </abbr>
                          );
                        },

                        // Details/Summary (collapsible content)
                        details: ({ children, ...props }) => {
                          return (
                            <details className="my-6 border border-gray-200 rounded-lg" {...props}>
                              {children}
                            </details>
                          );
                        },
                        summary: ({ children, ...props }) => {
                          return (
                            <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-900 select-none" {...props}>
                              {children}
                            </summary>
                          );
                        },

                        // Footnotes
                        section: ({ children, ...props }) => {
                          return (
                            <section className="mt-12 pt-8 border-t border-gray-200" {...props}>
                              {children}
                            </section>
                          );
                        }
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </ArticleContent>
              </div>

              {/* Share Section */}
              <ShareSection postTitle={post.title} postUrl={postUrl} />

              {/* Newsletter CTA */}
              <NewsletterCTA />

              {/* Related Posts */}
              <RelatedPosts 
                currentPostSlug={post.slug}
                posts={transformedPosts}
                t={{
                  relatedPosts: t.relatedPosts,
                  readMore: t.readMore
                }}
              />
            </main>

            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
