'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { BlogPostMetadata } from '@/lib/notion-blog';
import { BlogCard } from '@/components/blog/blog-card';
import { FeaturedPost } from '@/components/blog/featured-post';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/contact-modal';
import { useTranslations } from '@/lib/i18n/context';
import { I18nProvider } from '@/lib/i18n/context';
import { Locale } from '@/lib/i18n/config';

interface BlogPageClientProps {
  allPosts: BlogPostMetadata[];
  featuredPost: BlogPostMetadata | null;
  categories: string[];
  locale: Locale;
}

function BlogPageContent({ allPosts, featuredPost, categories, locale }: BlogPageClientProps) {
  const { t } = useTranslations();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const blogUrl = locale === 'de' ? `${baseUrl}/de/blog` : `${baseUrl}/blog`;

  // Structured Data for Blog Listing Page
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        url: blogUrl,
        name: locale === 'de' ? 'SeventeenLabs KI-Automatisierung Blog' : 'SeventeenLabs AI Automation Blog',
        description: locale === 'de' 
          ? 'Expertenleitfäden und Fallstudien zur KI-Automatisierung für Unternehmen'
          : 'Expert guides and case studies for AI automation in business',
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
        inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
        blogPost: allPosts.slice(0, 10).map(post => ({
          '@type': 'BlogPosting',
          '@id': `${baseUrl}${locale === 'de' ? '/de' : ''}/blog/${post.slug}#article`,
          url: `${baseUrl}${locale === 'de' ? '/de' : ''}/blog/${post.slug}`,
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
        name: locale === 'de' ? 'Blog - SeventeenLabs' : 'Blog - SeventeenLabs',
        description: locale === 'de' 
          ? 'Entdecken Sie Expertenleitfäden zur KI-Automatisierung'
          : 'Explore expert guides for AI automation',
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
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesCategory;
    });
  }, [allPosts, selectedCategory]);

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
                className="w-[140px] sm:w-[160px] lg:w-[180px] h-auto transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Link
                href="/blog"
                className={`px-2 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  locale === 'en' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Switch to English blog"
              >
                EN
              </Link>
              <Link
                href="/de/blog"
                className={`px-2 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  locale === 'de' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Switch to German blog"
              >
                DE
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <FeaturedPost post={featuredPost} locale={locale} />
            </div>
          )}
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex justify-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="rounded-lg px-4"
                >
                  {t('blog.categories.all')}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-lg px-4"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-6 text-sm text-gray-600 text-center">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('blog.noArticles.title')}</h3>
              <p className="text-gray-600">{t('blog.noArticles.subtitle')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              {t('blog.cta.title')}
            </h2>
            
            <p className="text-lg text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              {t('blog.cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-8 py-4 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t('blog.cta.primaryButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                href={locale === 'de' ? '/de' : '/'}
                className="group relative px-8 py-4 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
                aria-label={locale === 'de' ? 'Go to German homepage' : 'Go to English homepage'}
              >
                {t('blog.cta.secondaryButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </section>
    </div>
  );
}

export function BlogPageClient({ allPosts, featuredPost, categories, locale }: BlogPageClientProps) {
  return (
    <I18nProvider locale={locale}>
      <BlogPageContent 
        allPosts={allPosts}
        featuredPost={featuredPost}
        categories={categories}
        locale={locale}
      />
    </I18nProvider>
  );
}
