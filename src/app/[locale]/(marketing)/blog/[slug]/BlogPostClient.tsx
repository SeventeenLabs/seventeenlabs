'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost, BlogPostMetadata } from '@/lib/notion-blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect, useMemo, useCallback } from 'react';
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
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const [showTitle, setShowTitle] = useState(false);
  const clearSelection = useCallback(() => {
    setSelectedText('');
    setSelectionRect(null);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  }, []);

  const formattedDate = format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const homePath = '/';
  const contactHref = `${homePath}#contact`;
  const blogPath = '/blog';
  const postUrl = `${baseUrl}${blogPath}/${post.slug}`;
  const questionHighlights = useMemo(() => {
    const fallback = 'This post documents SeventeenLabs workflows and lessons learned.';

    const audience = post.tags && post.tags.length > 0
      ? `Best for ${post.tags.slice(0, 2).join(', ')}`
      : 'Relevant for revenue & ops teams';

    return [
      {
        question: 'What will you learn?',
        answer: post.description || fallback,
      },
      {
        question: 'When should you apply it?',
        answer: post.category
          ? `Use it when ${post.category.toLowerCase()} is a top priority.`
          : fallback,
      },
      {
        question: 'Who is it for?',
        answer: audience,
      },
    ];
  }, [post.category, post.description, post.tags]);

  const tldrItems = useMemo(() => {
    const audience = post.tags && post.tags.length > 0
      ? post.tags.slice(0, 3).join(', ')
      : 'Ops and revenue teams';

    const timeframe = post.reading_time
      ? `${post.reading_time} min`
      : `${Math.ceil((post.content?.length || 800) / 200)} min`;

    return [
      post.description || 'Article covering proven automation playbooks and lessons learned.',
      `Focus: ${post.category || 'AI automation'}`,
      `Recommended for: ${audience}`,
      `Reading time: ${timeframe}`,
    ];
  }, [post.category, post.content, post.description, post.reading_time, post.tags]);


  useEffect(() => {
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
    
    generateTOC();
  }, [post.content]);

  // Handle scroll progress and visibility
  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    let contentElement: HTMLElement | null = null;
    let contentTop: number = 0;
    let contentHeight: number = 0;
    
    // Cache DOM elements and measurements
    const initializeElements = () => {
      contentElement = document.querySelector('.notion-content') as HTMLElement;
      if (contentElement) {
        contentTop = contentElement.getBoundingClientRect().top + window.pageYOffset;
        contentHeight = contentElement.offsetHeight;
      }
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          
          // Throttle state updates
          const currentTime = Date.now();
          
          // Show progress bar when scrolling (less frequent updates)
          setIsScrolling(true);
          
          // Clear existing timeout and set new one
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 1000); // Reduced timeout
          
          // Show title when scrolled past the hero section (less frequent updates)
          const shouldShowTitle = scrollTop > 400;
          setShowTitle(prev => prev !== shouldShowTitle ? shouldShowTitle : prev);
          
          // Calculate reading progress (use cached values)
          if (contentElement && contentHeight > 0) {
            const windowHeight = window.innerHeight;
            const progressStart = contentTop;
            const progressEnd = contentTop + contentHeight - windowHeight;
            
            let progress: number;
            if (scrollTop < progressStart) {
              progress = 0;
            } else if (scrollTop > progressEnd) {
              progress = 100;
            } else {
              progress = ((scrollTop - progressStart) / (progressEnd - progressStart)) * 100;
              progress = Math.max(0, Math.min(100, progress));
            }
            
            // Only update if progress changed significantly (reduce re-renders)
            setReadingProgress(prev => Math.abs(prev - progress) > 1 ? progress : prev);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Initialize on mount and resize
    initializeElements();
    const handleResize = () => {
      initializeElements();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
  }, [clearSelection]);

  // Translations
  const t = {
    newsletter: {
      title: 'Stay Updated',
      description: 'Get the latest insights on workflow automation and AI technologies delivered straight to your inbox.',
      placeholder: 'Your email address',
      button: 'Subscribe',
      success: 'Successfully subscribed!',
      error: 'Something went wrong. Please try again.'
    },
    relatedPosts: 'Related Posts',
    readMore: 'Read more'
  };

  // Enhanced related posts algorithm (kept near usage for clarity)
  const enhancedRelatedPosts = relatedPosts
    .map(relatedPost => {
      let score = 0;

      if (relatedPost.category && post.category && relatedPost.category === post.category) {
        score += 3;
      }

      if (post.tags && relatedPost.tags && Array.isArray(post.tags) && Array.isArray(relatedPost.tags)) {
        const commonTags = post.tags.filter(tag => relatedPost.tags?.includes(tag));
        score += commonTags.length * 2;
      }

      return { ...relatedPost, relevanceScore: score };
    })
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 3);

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
    <div style={{ isolation: 'isolate' }}>
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
        showTitle={showTitle}
      />

      {/* Mobile Header Bar */}
      <MobileHeaderBar 
        post={post}
        postUrl={postUrl}
        showTitle={showTitle}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
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
                    <p className="text-xl text-gray-600 leading-relaxed speakable-intro">
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

                {/* TL;DR snippet */}
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 mb-8 ai-tldr" data-ai-snippet="tldr">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                    TL;DR
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {tldrItems.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Speakable Highlights */}
                <div className="grid gap-4 md:grid-cols-3 mb-8 speakable-takeaway">
                  {questionHighlights.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">{item.question}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>

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
                    {useMemo(() => (
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
                          // Check if paragraph contains only images
                          const childrenArray = React.Children.toArray(children);
                          const hasOnlyImages = childrenArray.length > 0 && childrenArray.every(child => {
                            if (React.isValidElement(child)) {
                              return child.type === 'img' || 
                                     ((child.props as any)?.src) ||
                                     (typeof child.type === 'function' && (child.type as any).name === 'Image');
                            }
                            return false;
                          });

                          // If paragraph contains only images, render as div to avoid invalid HTML
                          if (hasOnlyImages) {
                            return (
                              <div className="mb-6" {...props}>
                                {children}
                              </div>
                            );
                          }

                          // Regular paragraph
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
                          // Type assertion to access parent property
                          const isOrderedList = (node as any)?.parent?.tagName === 'ol';
                          
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
                        code: ({ children, className, ...props }: any) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const language = match ? match[1] : '';
                          const inline = props.inline;
                          
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
                              <pre className={`bg-gray-50 border text-gray-800 p-6 overflow-x-auto text-sm font-mono ${language ? 'rounded-t-none rounded-b-lg' : 'rounded-lg'}`}>
                                <code>{children}</code>
                              </pre>
                            </div>
                          );
                        },

                        // Images with captions and different layouts
                        img: ({ src, alt, title }) => {
                          const isSmall = title?.includes('small');
                          const isLeft = title?.includes('left');
                          const isRight = title?.includes('right');
                          
                          const containerClass = isSmall ? 'max-w-md mx-auto' : 
                                               isLeft ? 'float-left mr-6 mb-4 max-w-sm' :
                                               isRight ? 'float-right ml-6 mb-4 max-w-sm' : '';
                          
                          if (!src || typeof src !== 'string') return null;

                          const width = isSmall ? 800 : 1200;
                          const height = isSmall ? 600 : 675;
                          
                          return (
                            <div className={`my-10 ${containerClass}`}>
                              <Image 
                                src={src}
                                alt={alt || ''}
                                title={title}
                                width={width}
                                height={height}
                                className="w-full h-auto rounded-lg shadow-sm"
                                sizes="(max-width: 768px) 100vw, 768px"
                                unoptimized
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
                    ), [post.content])}
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
            <aside className="hidden xl:block w-80 shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
            <div className="py-12">
              {/* Main Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Company Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      S
                    </div>
                    <span className="text-xl font-semibold text-gray-900">SeventeenLabs</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    We automate business processes with AI-driven solutions for agencies and enterprises.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Quick Links
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href={blogPath} className="text-gray-600 hover:text-gray-900 transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href={contactHref} className="text-gray-600 hover:text-gray-900 transition-colors">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Contact
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:hello@seventeenlabs.io" className="hover:text-gray-900 transition-colors">
                        hello@seventeenlabs.io
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span>seventeenlabs.io</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  © {new Date().getFullYear()} SeventeenLabs. All rights reserved.
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <Link href="/privacy" className="hover:text-gray-700 transition-colors">
                    Privacy
                  </Link>
                  <Link href="/terms" className="hover:text-gray-700 transition-colors">
                    Terms
                  </Link>
                  <div className="flex items-center gap-3">
                    <a href="https://twitter.com/seventeenlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="https://linkedin.com/company/seventeenlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
