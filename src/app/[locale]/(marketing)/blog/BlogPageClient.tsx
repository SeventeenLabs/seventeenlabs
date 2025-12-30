'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { BlogPostMetadata } from '@/lib/notion-blog';
import { BlogCard } from '@/components/blog/blog-card';
import { FeaturedPost } from '@/components/blog/featured-post';
import { SubscribeModal } from '@/components/blog/subscribe-modal';
import ContactModal from '@/components/contact-modal';

interface BlogPageClientProps {
  allPosts: BlogPostMetadata[];
  featuredPost: BlogPostMetadata | null;
  pageTitle?: string;
}

const SUBSCRIBE_MODAL_STORAGE_KEY = 'sl_blog_subscribe_prompt_v1';

const blogCopy = {
  title: 'SeventeenLabs AI Automation Blog',
  subtitle: 'Field-tested playbooks, teardown notes, and technical guidance for operators automating revenue, marketing, and operations teams.',
  noArticlesTitle: 'Fresh stories incoming',
  noArticlesSubtitle: 'We are preparing new automation field notes. Check back soon or subscribe to the RSS feed for the latest drops.',
  ctaTitle: 'Need an automation roadmap or build partner?',
  ctaSubtitle: 'Share your priorities and we will map the workflows, tooling, and launch plan to hit them in weeks—not quarters.',
  ctaPrimaryButton: 'Book a working session',
  ctaSecondaryButton: 'Explore services',
};

function BlogPageContent({ allPosts, featuredPost, pageTitle }: BlogPageClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const blogUrl = `${baseUrl}/blog`;

  const headerNavItems = useMemo(
    () => ([
      { label: 'Highlights', href: '#hero' },
      { label: 'Articles', href: '#articles' },
      { label: 'Contact', href: '#cta' },
    ]),
    [],
  );

  // Structured Data for Blog Listing Page
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        url: blogUrl,
        name: 'SeventeenLabs AI Automation Blog',
        description: 'Expert guides and case studies for AI automation in business',
        publisher: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
          name: 'SeventeenLabs',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo_dark.png`,
          },
        },
        inLanguage: 'en-US',
        blogPost: allPosts.slice(0, 10).map(post => ({
          '@type': 'BlogPosting',
          '@id': `${baseUrl}/blog/${post.slug}#article`,
          url: `${baseUrl}/blog/${post.slug}`,
          headline: post.title,
          description: post.description,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: {
            '@type': 'Person',
            name: post.author_name,
          },
          image: post.featured_image ? {
            '@type': 'ImageObject',
            url: post.featured_image.startsWith('/') ? `${baseUrl}${post.featured_image}` : post.featured_image,
          } : undefined,
        })),
      },
      {
        '@type': 'WebPage',
        '@id': blogUrl,
        url: blogUrl,
        name: 'Blog - SeventeenLabs',
        description: 'Explore expert guides for AI automation',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'SeventeenLabs',
          url: baseUrl,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
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
              item: blogUrl,
            },
          ],
        },
      },
    ],
  };

  // Filter posts based on category
  const filteredPosts = allPosts;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const hasSeenPrompt = window.localStorage.getItem(SUBSCRIBE_MODAL_STORAGE_KEY);
      if (!hasSeenPrompt) {
        setSubscribeModalOpen(true);
      }
    } catch (error) {
      console.warn('Subscribe modal localStorage unavailable', error);
    }
  }, []);

  const markPromptState = (state: 'dismissed' | 'subscribed') => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(SUBSCRIBE_MODAL_STORAGE_KEY, state);
    } catch (error) {
      console.warn('Unable to persist subscribe modal preference', error);
    }
  };

  const handleSubscribeModalClose = () => {
    markPromptState('dismissed');
    setSubscribeModalOpen(false);
  };

  const handleSubscribeSuccess = () => {
    markPromptState('subscribed');
    setSubscribeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Navigation Header */}
      <header className="bg-transparent">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-4" aria-label="Go to SeventeenLabs homepage">
              <Image
                src="/logo_dark.png"
                alt="SeventeenLabs"
                width={180}
                height={42}
                className="w-[140px] sm:w-[160px] lg:w-[180px] h-auto transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <div className="flex items-center gap-3 text-gray-700">
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-[0.3em]">Blog</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600" aria-label="Blog navigation">
              {headerNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-gray-900 transition-colors" prefetch={false}>
                  {item.label}
                </Link>
              ))}
              <Link
                href="/rss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-700 hover:border-gray-300"
                aria-label="Open RSS feed"
              >
                RSS
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-50 via-white to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-0 w-96 h-96 bg-purple-200/60 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-100/50 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-gray-200 bg-white/70 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-gray-400" />
                Insights for modern teams
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
                {pageTitle || blogCopy.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                {blogCopy.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div id="featured" className="mt-16">
              <FeaturedPost post={featuredPost} />
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section id="articles" className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent to-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10 text-sm text-gray-600" aria-live="polite">
            <span className="uppercase tracking-[0.3em] text-gray-500">Library</span>
            <span>{`Showing ${filteredPosts.length} ${filteredPosts.length === 1 ? 'article' : 'articles'}`}</span>
          </div>
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div 
                key="empty"
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <div className="max-w-md mx-auto rounded-3xl border border-dashed border-gray-200 bg-white/80 p-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{blogCopy.noArticlesTitle}</h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{blogCopy.noArticlesSubtitle}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="all-posts"
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.08,
                      type: 'spring',
                      stiffness: 120
                    }}
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative bg-gray-950 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 via-gray-950 to-black" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid lg:grid-cols-[1.3fr_0.9fr] gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 mb-6">
                <span className="w-2 h-2 bg-white rounded-full" />
                Next step
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white tracking-tight mb-6 leading-tight">
                {blogCopy.ctaTitle}
              </h2>
              <p className="text-lg text-white/70 font-light leading-relaxed mb-10 max-w-2xl">
                {blogCopy.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="group relative px-8 py-4 text-base font-medium text-black bg-white rounded-xl hover:bg-white/90 transition-all duration-300 shadow-xl shadow-indigo-500/20 inline-flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  {blogCopy.ctaPrimaryButton}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/"
                  className="group relative px-8 py-4 text-base font-medium text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
                  aria-label="Go to homepage"
                >
                  {blogCopy.ctaSecondaryButton}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
                What you get
              </p>
              <ul className="space-y-4 text-base text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Handpicked automation playbooks tailored to your use case
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-sky-400" />
                  Short-term roadmap with measurable outcomes
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-purple-400" />
                  Toolchain recommendations proven in production
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />

        <SubscribeModal
          isOpen={subscribeModalOpen}
          onClose={handleSubscribeModalClose}
          onSubscribed={handleSubscribeSuccess}
        />
      </section>
    </div>
  );
}

export function BlogPageClient({ allPosts, featuredPost, pageTitle }: BlogPageClientProps) {
  return (
    <BlogPageContent
      allPosts={allPosts}
      featuredPost={featuredPost}
      pageTitle={pageTitle}
    />
  );
}