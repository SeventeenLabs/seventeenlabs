"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { BlogPostMetadata } from "@/lib/notion-blog";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { useState } from "react";

interface LatestBlogPostsProps {
  posts: BlogPostMetadata[];
}

export default function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  const locale = useLocale();

  const content = {
    en: {
      title: "Latest from the Blog",
      viewAll: "View all",
    },
    de: {
      title: "Neueste Beiträge",
      viewAll: "Alle anzeigen",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;
  const dateLocale = locale === "de" ? de : enUS;

  if (!posts || posts.length === 0) {
    return null;
  }

  const featured = posts[0];
  const rest = posts.slice(1, 3);

  return (
    <section className="py-20 lg:py-24 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white">
            {t.title}
          </h2>
          <Link
            href="/blog"
            className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid: Featured + 2 smaller */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedCard post={featured} dateLocale={dateLocale} />
          </motion.div>

          {/* Two smaller posts */}
          <div className="flex flex-col gap-6">
            {rest.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <SmallCard post={post} dateLocale={dateLocale} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ post, dateLocale }: { post: BlogPostMetadata; dateLocale: typeof de | typeof enUS }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="relative h-full min-h-[280px] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
        
        {/* Image */}
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.image_alt || post.title}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-30" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <time className="text-xs text-white/40">
              {format(new Date(post.published_at || post.created_at), "MMM d, yyyy", { locale: dateLocale })}
            </time>
          </div>
          
          <h3 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-white/90 transition-colors leading-tight">
            {post.title}
          </h3>
          
          <p className="text-white/50 text-sm line-clamp-2 mb-3">
            {post.description}
          </p>
          
          <div className="flex items-center gap-2 text-white/60 text-sm group-hover:text-white/80 transition-colors">
            <span>Read article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SmallCard({ post, dateLocale }: { post: BlogPostMetadata; dateLocale: typeof de | typeof enUS }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex gap-5 p-5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all">
        {/* Thumbnail */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.image_alt || post.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-xs">{post.category}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-white/20">·</span>
            <time className="text-[10px] text-white/30">
              {format(new Date(post.published_at || post.created_at), "MMM d", { locale: dateLocale })}
            </time>
          </div>
          
          <h3 className="text-white/90 font-medium line-clamp-2 group-hover:text-white transition-colors text-sm leading-snug">
            {post.title}
          </h3>
        </div>
        
        {/* Arrow */}
        <div className="flex items-center">
          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}
