"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import LanguageSwitcher from "./language-switcher";

export default function SiteFooter() {
  const locale = useLocale();
  const isGerman = locale === "de";

  const t = isGerman
    ? {
        title: "AI production for movies, pilots, and serialized worlds.",
        description:
          "SeventeenLabs helps creators, brands, and studios turn concepts into cinematic AI film assets with story, character, scene, and launch support.",
        sections: "Sections",
        company: "Company",
        resources: "Resources",
        updatesBody: "Notes on AI filmmaking, production workflows, and creative systems.",
        updates: "Read updates",
        contact: "Join private build",
        rights: "All rights reserved.",
      }
    : {
        title: "AI production for movies, pilots, and serialized worlds.",
        description:
          "SeventeenLabs helps creators, brands, and studios turn concepts into cinematic AI film assets with story, character, scene, and launch support.",
        sections: "Sections",
        company: "Company",
        resources: "Resources",
        updatesBody: "Notes on AI filmmaking, production workflows, and creative systems.",
        updates: "Read updates",
        contact: "Join private build",
        rights: "All rights reserved.",
      };

  const homeHref = getLocalizedPath(locale, "/");
  const earlyAccessHref = `${homeHref}#early-access`;
  const sectionLinks = [
    { label: isGerman ? "Product" : "Product", href: `${homeHref}#studio` },
    { label: "Workflow", href: `${homeHref}#workflow` },
    { label: isGerman ? "Outputs" : "Outputs", href: `${homeHref}#formats` },
    { label: isGerman ? "Private Build" : "Private build", href: `${homeHref}#early-access` },
  ] as const;

  const companyLinks = [
    { label: isGerman ? "Uber uns" : "About", href: getLocalizedPath(locale, "/about") },
    { label: "News", href: getLocalizedPath(locale, "/blog") },
  ] as const;

  const legalLinks = [
    { label: isGerman ? "Datenschutz" : "Privacy Policy", href: getLocalizedPath(locale, "/privacy") },
    { label: isGerman ? "AGB" : "Terms & Conditions", href: getLocalizedPath(locale, "/terms") },
  ] as const;

  return (
    <footer className="border-t border-[oklch(0.22_0.015_270)] bg-[oklch(0.08_0.012_270)] text-[oklch(0.76_0.012_270)]">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-[oklch(0.22_0.015_270)] pb-12 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="SeventeenLabs" width={24} height={24} className="h-6 w-6 rounded-md object-contain" />
              <span className="text-sm font-semibold text-[oklch(0.96_0.006_270)]">SeventeenLabs</span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight text-[oklch(0.96_0.006_270)] sm:text-3xl">
              {t.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6">{t.description}</p>
            <Link
              href={earlyAccessHref}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[oklch(0.9_0.22_128)] px-5 text-sm font-semibold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)]"
            >
              {t.contact}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[oklch(0.58_0.05_285)]">{t.sections}</p>
              <div className="grid gap-y-2.5">
                {sectionLinks.map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm transition hover:text-[oklch(0.96_0.006_270)]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[oklch(0.58_0.05_285)]">{t.company}</p>
              <div className="grid gap-y-2.5">
                {companyLinks.map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm transition hover:text-[oklch(0.96_0.006_270)]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[oklch(0.58_0.05_285)]">{t.resources}</p>
              <p className="text-sm leading-6">{t.updatesBody}</p>
              <Link
                href={getLocalizedPath(locale, "/blog")}
                className="mt-3 inline-flex text-sm font-semibold text-[oklch(0.96_0.006_270)] transition hover:text-[oklch(0.9_0.2_128)]"
              >
                {t.updates}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} SeventeenLabs. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSwitcher />
            <span className="hidden h-3.5 w-px bg-[oklch(0.24_0.014_270)] sm:inline-block" />
            <div className="flex items-center gap-5">
              {legalLinks.map((item) => (
                <Link key={item.label} href={item.href} className="transition hover:text-[oklch(0.96_0.006_270)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
