"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import LanguageSwitcher from "./language-switcher";

export default function SiteFooter() {
  const locale = useLocale();

  const t = locale === "de"
    ? {
        title: "AI systems for companies that need control and flexibility.",
        description:
          "SeventeenLabs entwickelt produktionsreife AI-Systeme mit Modellfreiheit, Governance und messbarer Umsetzung.",
        platform: "Plattform",
        company: "Unternehmen",
        resources: "Ressourcen",
        updatesBody: "Produkt-Updates, Implementierungsnotizen und neue Releases.",
        subscribe: "Updates lesen",
        talk: "Kontakt aufnehmen",
        rights: "Alle Rechte vorbehalten.",
        legal: "Rechtliches",
      }
    : {
        title: "AI systems for companies that need control and flexibility.",
        description:
          "SeventeenLabs builds production-grade AI systems with model flexibility, governance, and measurable execution.",
        platform: "Platform",
        company: "Company",
        resources: "Resources",
        updatesBody: "Product updates, implementation notes, and new releases.",
        subscribe: "Read updates",
        talk: "Talk to us",
        rights: "All rights reserved.",
        legal: "Legal",
      };

  const platformLinks = [
    { label: "Relay", href: getLocalizedPath(locale, "/products/relay") },
    { label: locale === "de" ? "Produkte" : "Products", href: getLocalizedPath(locale, "/products") },
    { label: locale === "de" ? "Losungen" : "Solutions", href: getLocalizedPath(locale, "/solutions") },
  ] as const;

  const companyLinks = [
    { label: locale === "de" ? "Uber uns" : "About", href: getLocalizedPath(locale, "/about") },
    { label: locale === "de" ? "News" : "News", href: getLocalizedPath(locale, "/blog") },
  ] as const;

  const legalLinks = [
    { label: locale === "de" ? "Datenschutz" : "Privacy Policy", href: getLocalizedPath(locale, "/privacy") },
    { label: locale === "de" ? "AGB" : "Terms & Conditions", href: getLocalizedPath(locale, "/terms") },
  ] as const;

  return (
    <footer className="border-t border-[#23252a] bg-[#010102]">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-[#23252a] pb-12 lg:grid-cols-[1.2fr,1.8fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <Image src="/logo-white.svg" alt="SeventeenLabs" width={20} height={20} className="h-5 w-5 object-contain" />
              <span className="text-sm font-semibold tracking-[0.01em] text-[#f7f8f8]">SeventeenLabs</span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#f7f8f8] sm:text-3xl">
              {t.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#d0d6e0]">{t.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getLocalizedPath(locale, "/products/relay")}
                className="inline-flex items-center justify-center rounded-md bg-[#5e6ad2] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#828fff]"
              >
                Try Relay
              </Link>
              <Link
                href={getLocalizedPath(locale, "/about")}
                className="inline-flex items-center justify-center rounded-md border border-[#2b2e34] bg-[#0f1011] px-5 py-2.5 text-sm font-medium text-[#d0d6e0] transition hover:text-[#f7f8f8]"
              >
                {t.talk}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8f98]">{t.platform}</p>
              <div className="grid gap-y-2.5">
                {platformLinks.map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm text-[#d0d6e0] transition hover:text-[#f7f8f8]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8f98]">{t.company}</p>
              <div className="grid gap-y-2.5">
                {companyLinks.map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm text-[#d0d6e0] transition hover:text-[#f7f8f8]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8f98]">{t.resources}</p>
              <p className="text-sm leading-6 text-[#d0d6e0]">{t.updatesBody}</p>
              <Link
                href={getLocalizedPath(locale, "/blog")}
                className="mt-3 inline-flex text-sm font-medium text-[#f7f8f8] transition hover:text-white/80"
              >
                {t.subscribe}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} SeventeenLabs. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#8a8f98]">
            <LanguageSwitcher />
            <span className="hidden h-3.5 w-px bg-[#2b2e34] sm:inline-block" />
            <div className="flex items-center gap-5">
              {legalLinks.map((item) => (
                <Link key={item.label} href={item.href} className="transition-colors hover:text-[#f7f8f8]">
                  {item.label}
                </Link>
              ))}
            </div>
            <span className="hidden h-3.5 w-px bg-[#2b2e34] sm:inline-block" />
            <a href="https://github.com/SeventeenLabs/relay" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f7f8f8]">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
