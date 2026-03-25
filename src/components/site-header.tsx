"use client";

import * as React from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const locale = useLocale();
  const homeHref = getLocalizedPath(locale, "/");
  const aboutHref = getLocalizedPath(locale, "/about");
  const relayHref = getLocalizedPath(locale, "/products/relay");
  const navItems = [
    { name: "Relay", href: relayHref },
    { name: "Products", href: "/workflows" },
    { name: "Blog", href: getLocalizedPath(locale, "/blog") },
    { name: "About", href: aboutHref },
  ];

  return (
    <Navbar>
      <NavBody>
        {/* Brand */}
        <Link href={homeHref} className="group flex items-center gap-2 relative z-20">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-slate-900 to-slate-500 transition-transform duration-300 ease-out group-hover:scale-150" />
          <span className="text-sm font-semibold tracking-tight text-slate-900">SeventeenLabs</span>
        </Link>

        <NavItems
          items={navItems.map((item) => ({
            name: item.name,
            link: item.href.startsWith('#') ? item.href : item.href,
          }))}
        />

        <div className="flex items-center space-x-2">
          <NavbarButton href={relayHref} variant="primary">
            Explore Relay
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          {/* Brand */}
          <Link href={homeHref} className="group flex items-center gap-2 relative z-20">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-slate-900 to-slate-500 transition-transform duration-300 ease-out group-hover:scale-150" />
            <span className="text-sm font-semibold tracking-tight text-slate-900">SeventeenLabs</span>
          </Link>
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            item.href.startsWith('#') ? (
              <a
                key={idx}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
          <NavbarButton href={relayHref} variant="primary" className="mt-4">
            Explore Relay
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
