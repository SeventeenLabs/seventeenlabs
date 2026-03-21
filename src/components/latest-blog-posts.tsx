"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
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
      title: "Practical guides for governed AI operations",
      viewAll: "Browse all insights",
      readItem: "Read insight",
    },
    de: {
      title: "Praktische Guides für governte KI-Operationen",
      viewAll: "Alle Insights ansehen",
      readItem: "Insight lesen",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;
  const dateLocale = locale === "de" ? de : enUS;
  const blogIndexHref = getLocalizedPath(locale, "/blog");

  if (!posts || posts.length === 0) {
    return null;
  }

  const featured = posts[0];
  const rest = posts.slice(1, 3);

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.04),transparent_36%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex items-end justify-between"
        >
          <h2 className="max-w-2xl text-3xl font-light text-white md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            {t.title}
          </h2>
          <Link
            href={blogIndexHref}
            className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid gap-10 border-y border-white/10 py-8 lg:grid-cols-[1.2fr,0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedCard post={featured} dateLocale={dateLocale} locale={locale} readLabel={t.readItem} />
          </motion.div>

          <div className="flex flex-col divide-y divide-white/10">
            {rest.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="pt-5 first:pt-0"
              >
                <SmallCard post={post} dateLocale={dateLocale} locale={locale} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  post,
  dateLocale,
  locale,
  readLabel,
}: {
  post: BlogPostMetadata;
  dateLocale: typeof de | typeof enUS;
  locale: string;
  readLabel: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const href = getLocalizedPath(locale, `/blog/${post.slug}`);
  
  return (
    <Link href={href} className="group block h-full">
      <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
        
        {/* Image */}
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.image_alt || post.title}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-[1.03] ${
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
          
          <h3
            className="mb-2 text-2xl font-medium leading-tight text-white transition-colors group-hover:text-white/90 md:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h3>
          
          <p
            className="mb-3 line-clamp-2 text-sm text-white/55"
            style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
          >
            {post.description}
          </p>
          
          <div className="flex items-center gap-2 text-white/60 text-sm group-hover:text-white/80 transition-colors">
            <span>{readLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SmallCard({ post, dateLocale, locale }: { post: BlogPostMetadata; dateLocale: typeof de | typeof enUS; locale: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const href = getLocalizedPath(locale, `/blog/${post.slug}`);
  
  return (
    <Link href={href} className="group block">
      <div className="flex gap-5 py-1 transition-all">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
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
          
          <h3
            className="line-clamp-2 text-base font-medium leading-snug text-white/90 transition-colors group-hover:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h3>
        </div>
        
        <div className="flex items-center">
          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}
