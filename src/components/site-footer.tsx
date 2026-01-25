"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import { Mail, Linkedin, Calendar, Twitter, ArrowRight } from "lucide-react";

export default function SiteFooter() {
  const locale = useLocale();

  const content = {
    en: {
      services: 'Services',
      aiAudit: 'AI Audit',
      aiConsulting: 'Strategic Consulting',
      aiDevelopment: 'Custom Development',
      industries: 'Industries',
      marketingAgencies: 'Marketing Agencies',
      products: 'Products',
      workflows: 'Workflows Library',
      company: 'Company',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      tagline: 'Transform your business with AI audits, strategic consulting, and custom development solutions',
      copyright: 'SeventeenLabs. All rights reserved.',
      ctaTitle: 'Ready to Get Started?',
      ctaSubtitle: 'Book a free 15-minute discovery call to discuss your automation needs.',
      ctaButton: 'Book Free Call',
      builtWith: 'Built with',
    },
    de: {
      services: 'Services',
      aiAudit: 'KI-Audit',
      aiConsulting: 'Strategische Beratung',
      aiDevelopment: 'Individuelle Entwicklung',
      industries: 'Branchen',
      marketingAgencies: 'Marketing-Agenturen',
      products: 'Produkte',
      workflows: 'Workflows-Bibliothek',
      company: 'Unternehmen',
      about: 'Über uns',
      blog: 'Blog',
      contact: 'Kontakt',
      tagline: 'Transformieren Sie Ihr Unternehmen mit KI-Audits, strategischer Beratung und maßgeschneiderten Entwicklungslösungen',
      copyright: 'SeventeenLabs. Alle Rechte vorbehalten.',
      ctaTitle: 'Bereit loszulegen?',
      ctaSubtitle: 'Buchen Sie ein kostenloses 15-minütiges Erstgespräch, um Ihre Automatisierungsbedürfnisse zu besprechen.',
      ctaButton: 'Kostenlos buchen',
      builtWith: 'Gebaut mit',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <footer className="bg-black border-t border-white/10">
      {/* CTA Section before footer */}
      <div className="border-b border-white/10">
        <div className="px-6 sm:px-12 lg:px-16 xl:px-20 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-light text-white mb-3">
              {t.ctaTitle}
            </h3>
            <p className="text-white/60 font-light mb-6">
              {t.ctaSubtitle}
            </p>
            <a
              href="https://cal.com/christian-lutz-pw2nn4/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              {t.ctaButton}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="px-6 sm:px-12 lg:px-16 xl:px-20 py-16">
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
            <p className="text-sm text-white/60 font-light leading-relaxed max-w-sm">
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
            
            {/* Trust Badges */}
            <div className="pt-4">
              <p className="text-xs text-white/40 mb-3">{t.builtWith}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 text-xs text-white/50 bg-white/5 border border-white/10 rounded-md">n8n</span>
                <span className="px-3 py-1.5 text-xs text-white/50 bg-white/5 border border-white/10 rounded-md">OpenAI</span>
                <span className="px-3 py-1.5 text-xs text-white/50 bg-white/5 border border-white/10 rounded-md">Next.js</span>
                <span className="px-3 py-1.5 text-xs text-white/50 bg-white/5 border border-white/10 rounded-md">Supabase</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.services}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/services/ai-audit')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.aiAudit}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/services/ai-consulting')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.aiConsulting}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/services/ai-development')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.aiDevelopment}
              </Link>
            </nav>
          </div>

          {/* Products & Industries */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.products}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/products/reportflow-engine')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {locale === 'de' ? 'ReportFlow Engine™' : 'ReportFlow Engine™'}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/workflows', { skipLocale: true })}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.workflows}
              </Link>
            </nav>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4 mt-6">
              {t.industries}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/industries/marketing-agencies')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.marketingAgencies}
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
                href="/blog"
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-white/40 font-light">
              © {new Date().getFullYear()} {t.copyright}
            </div>
            <nav className="flex items-center gap-4 text-xs text-white/40">
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
    </footer>
  );
}
