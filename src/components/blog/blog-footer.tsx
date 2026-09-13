'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, Rss } from 'lucide-react';

export function BlogFooter() {
  return (
    <footer className="bg-gray-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="SeventeenLabs"
                width={120}
                height={18}
                className="h-4 w-auto"
              />
            </Link>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              AI automation insights for modern teams.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@seventeenlabs.io"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/seventeenlabs-io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <Link
                href="/rss"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
              Blog
            </h3>
            <nav className="space-y-2">
              <Link
                href="/blog"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                All Articles
              </Link>
              <Link
                href="/rss"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                RSS Feed
              </Link>
              <Link
                href="/feed"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                JSON Feed
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
              Products
            </h3>
            <nav className="space-y-2">
              <Link
                href="/products/relay"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                Relay
              </Link>
              <Link
                href="/products/core"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                Core
              </Link>
              <Link
                href="/frame"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                All Products
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
              Company
            </h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                About
              </Link>
              <a
                href="mailto:hello@seventeenlabs.io"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} SeventeenLabs. All rights reserved.
            </p>
            <nav className="flex items-center gap-4 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
