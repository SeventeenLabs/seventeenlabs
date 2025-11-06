"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import { Mail, Linkedin } from "lucide-react";

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
      workflows: 'Workflows',
      agencyBlueprint: 'Agency Automation Blueprint',
      company: 'Company',
      about: 'About',
      contact: 'Contact',
      tagline: 'Transform your business with AI audits, strategic consulting, and custom development solutions',
      copyright: 'SeventeenLabs. All rights reserved.',
    },
    de: {
      services: 'Services',
      aiAudit: 'KI-Audit',
      aiConsulting: 'Strategische Beratung',
      aiDevelopment: 'Individuelle Entwicklung',
      industries: 'Branchen',
      marketingAgencies: 'Marketing-Agenturen',
      products: 'Produkte',
      workflows: 'Workflows',
      agencyBlueprint: 'Agentur-Automatisierungs-Blueprint',
      company: 'Unternehmen',
      about: 'Über uns',
      contact: 'Kontakt',
      tagline: 'Transformieren Sie Ihr Unternehmen mit KI-Audits, strategischer Beratung und maßgeschneiderten Entwicklungslösungen',
      copyright: 'SeventeenLabs. Alle Rechte vorbehalten.',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <footer className="bg-black border-t border-white/10">
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
                href={getLocalizedPath(locale, '/products/ai-workflow-audit')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {locale === 'de' ? 'Kostenlose AI Audits' : 'Free AI Audits'}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/workflows', { skipLocale: true })}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.workflows}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/agency-automation-blueprint')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.agencyBlueprint}
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
              <a
                href="mailto:hello@seventeenlabs.io"
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.contact}
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="text-xs text-white/40 font-light">
            © {new Date().getFullYear()} {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
