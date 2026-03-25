"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import { Mail, Linkedin, Calendar, Twitter, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./language-switcher";

export default function SiteFooter() {
  const locale = useLocale();

  const content = {
    en: {
      productsNav: 'Products',
      platform: 'Platform',
      relay: 'Relay by SeventeenLabs',
      core: 'Core by SeventeenLabs',
      workflows: 'Product Library',
      blogNav: 'Blog',
      products: 'Products',
      company: 'Company',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      tagline: 'SeventeenLabs builds practical AI systems for companies integrating AI into daily business operations.',
      copyright: 'SeventeenLabs. All rights reserved.',
      ctaTitle: 'Integrate AI into daily operations with control',
      ctaSubtitle: 'Capture AI upside while reducing risk through governance, human approval, and accountable execution.',
      ctaButton: 'View Products',
    },
    de: {
      productsNav: 'Produkte',
      platform: 'Plattform',
      relay: 'Relay by SeventeenLabs',
      core: 'Core by SeventeenLabs',
      workflows: 'Produktbibliothek',
      blogNav: 'Blog',
      products: 'Produkte',
      company: 'Unternehmen',
      about: 'Über uns',
      blog: 'Blog',
      contact: 'Kontakt',
      tagline: 'SeventeenLabs baut praktische KI-Systeme für Unternehmen, die KI in tägliche Geschäftsprozesse integrieren.',
      copyright: 'SeventeenLabs. Alle Rechte vorbehalten.',
      ctaTitle: 'KI kontrolliert in tägliche Abläufe integrieren',
      ctaSubtitle: 'Nutzen Sie KI-Upside und reduzieren Sie Risiko durch Governance, menschliche Freigabe und nachvollziehbare Ausführung.',
      ctaButton: 'Produkte ansehen',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(255,255,255,0.05),transparent_36%)]" />
      {/* CTA Section before footer */}
      <div className="relative border-b border-white/10">
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="mb-3 text-2xl font-light text-white lg:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              {t.ctaTitle}
            </h3>
            <p
              className="mb-6 font-light text-white/60"
              style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
            >
              {t.ctaSubtitle}
            </p>
            <Link
              href={getLocalizedPath(locale, '/products')}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-black transition-all duration-300 hover:bg-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Calendar className="w-5 h-5" />
              {t.ctaButton}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="relative px-4 py-16 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Image
                src="/logo_anim.svg"
                alt="SeventeenLabs"
                width={140}
                height={20}
                className="h-5 w-auto"
              />
            </div>
            <p
              className="max-w-sm text-sm font-light leading-relaxed text-white/60"
              style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
            >
              {t.tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@seventeenlabs.io"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                aria-label="Email"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/seventeenlabs-io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                aria-label="LinkedIn"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Linkedin className="w-4 h-4" />
                </div>
              </a>
              <a
                href="https://twitter.com/chrislutzxy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                aria-label="X (Twitter)"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Twitter className="w-4 h-4" />
                </div>
              </a>
            </div>
            
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.productsNav}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/products/relay')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.relay}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/products/core')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.core}
              </Link>
            </nav>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.platform}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/workflows', { skipLocale: true })}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.workflows}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/blog')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.blogNav}
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.company}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/about')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.about}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/blog')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.blog}
              </Link>
              <a
                href="mailto:hello@seventeenlabs.io"
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.contact}
              </a>
              <Link
                href={getLocalizedPath(locale, '/privacy')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {locale === 'de' ? 'Datenschutz' : 'Privacy Policy'}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/terms')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {locale === 'de' ? 'AGB' : 'Terms of Service'}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="text-xs text-white/40 font-light">
              © {new Date().getFullYear()} {t.copyright}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              <LanguageSwitcher />
              <nav className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/40 sm:justify-end">
                <Link
                  href="/rss"
                  className="hover:text-white transition-colors"
                  title="RSS Feed"
                >
                  RSS
                </Link>
                <Link
                  href="/feed"
                  className="hover:text-white transition-colors"
                  title="JSON Feed"
                >
                  JSON Feed
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="hover:text-white transition-colors"
                  title="Sitemap"
                >
                  Sitemap
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
