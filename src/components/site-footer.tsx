"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function SiteFooter() {
  const locale = useLocale();

  const content = {
    en: {
      solutions: 'Solutions',
      marketingAgencies: 'Marketing Agencies',
      services: 'Services',
      softwareDevelopment: 'Software Development',
      automationConsulting: 'Automation Consulting',
      products: 'Products',
      workflows: 'Workflows',
      company: 'Company',
      about: 'About',
      contact: 'Contact',
      tagline: 'AI-powered automation and custom development for modern businesses',
      copyright: 'SeventeenLabs. All rights reserved.',
    },
    de: {
      solutions: 'Lösungen',
      marketingAgencies: 'Marketing-Agenturen',
      services: 'Services',
      softwareDevelopment: 'Software-Entwicklung',
      automationConsulting: 'Automatisierungs-Beratung',
      products: 'Produkte',
      workflows: 'Workflows',
      company: 'Unternehmen',
      about: 'Über uns',
      contact: 'Kontakt',
      tagline: 'KI-gestützte Automatisierung und maßgeschneiderte Entwicklung für moderne Unternehmen',
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
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.solutions}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/solutions/marketing-agencies')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.marketingAgencies}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-light text-white/40 uppercase tracking-wider mb-4">
              {t.services}
            </h3>
            <nav className="space-y-3">
              <Link
                href={getLocalizedPath(locale, '/agency')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.softwareDevelopment}
              </Link>
              <Link
                href={getLocalizedPath(locale, '/services/automation-consulting')}
                className="block text-sm text-white/70 hover:text-white transition-colors font-light"
              >
                {t.automationConsulting}
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
