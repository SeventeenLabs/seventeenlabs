'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPostMetadata } from '@/lib/notion-blog';
import { BlogCard } from '@/components/blog/blog-card';
import { FeaturedPost } from '@/components/blog/featured-post';
import { Button } from '@/components/ui/button';

interface BlogPageClientProps {
  allPosts: BlogPostMetadata[];
  featuredPost: BlogPostMetadata | null;
  categories: string[];
}

export function BlogPageClient({ allPosts, featuredPost, categories }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter posts based on category
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesCategory;
    });
  }, [allPosts, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-lg font-semibold text-gray-900">Blog</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI Automation Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest trends, best practices, and actionable insights to transform your business with AI automation.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <FeaturedPost post={featuredPost} />
            </div>
          )}
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
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
                  All
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how AI automation can help you achieve your goals.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-8 h-12 text-base font-semibold"
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
