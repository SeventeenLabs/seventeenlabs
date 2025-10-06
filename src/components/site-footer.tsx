"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "@/lib/i18n/context";

export default function SiteFooter() {
  const { t } = useTranslations();
  const locale = useLocale();

  const mainLinks = [
    { label: t("footer.mainLinks.workflows"), href: "/workflows", external: true },
    { label: t("footer.mainLinks.apps"), href: `/${locale}/apps`, external: false },
    { label: t("footer.mainLinks.agency"), href: `/${locale}/agency`, external: false },
  ];

  const supportLinks = [
    { label: t("footer.contactUs"), href: "mailto:hello@seventeenlabs.io", external: true },
    { label: t("footer.documentation"), href: "/docs", external: false },
    { label: t("footer.community"), href: "https://discord.gg/seventeenlabs", external: true },
  ];

  const companyLinks = [
    { label: t("footer.about"), href: `/${locale}/about`, external: false },
    { label: t("footer.blog"), href: `/${locale}/blog`, external: false },
    { label: t("footer.privacy"), href: `/${locale}/privacy`, external: false },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700 px-6 py-16 text-slate-200">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand & Contact */}
          <div className="space-y-4 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo_anim.svg"
                alt="SeventeenLabs"
                width={140}
                height={20}
                className="h-6 w-auto"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 text-slate-400" />
              <a 
                href="mailto:hello@seventeenlabs.io" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                hello@seventeenlabs.io
              </a>
            </div>
          </div>

          {/* Main Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.products")}
            </h3>
            <nav className="space-y-3">
              {mainLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.external && <ExternalLink className="size-3" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.support")}
            </h3>
            <nav className="space-y-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.external && <ExternalLink className="size-3" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.company")}
            </h3>
            <nav className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} SeventeenLabs. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span>Made with ❤️ for small businesses</span>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-slate-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
