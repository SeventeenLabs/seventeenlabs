"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = "/";
  const earlyAccessHref = `${homeHref}#pricing`;
  const navItems = [
    { label: "Product", href: `${homeHref}#studio` },
    { label: "Workflow", href: `${homeHref}#workflow` },
    { label: "Pricing", href: earlyAccessHref },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-[oklch(0.24_0.014_270)] bg-[oklch(0.08_0.012_270_/_0.86)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-5 py-4 md:px-8">
        <Link href={homeHref} className="flex items-center gap-3 text-[oklch(0.96_0.006_270)]" onClick={() => setMobileOpen(false)}>
          <Image src="/logo.png" alt="SeventeenLabs" width={24} height={24} className="h-6 w-6 rounded-md object-contain" />
          <span className="text-base font-semibold">SeventeenLabs</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-[oklch(0.76_0.012_270)] transition hover:text-[oklch(0.96_0.006_270)]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={earlyAccessHref}
            className="hidden min-h-10 items-center justify-center gap-2 rounded-md bg-[oklch(0.9_0.22_128)] px-4 text-sm font-semibold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)] md:inline-flex"
          >
            Choose a plan
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[oklch(0.26_0.014_270)] bg-[oklch(0.11_0.012_270)] text-[oklch(0.96_0.006_270)] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-[oklch(0.24_0.014_270)] bg-[oklch(0.08_0.012_270)] px-5 pb-6 pt-3 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.label}`}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-[oklch(0.78_0.012_270)] transition hover:bg-[oklch(0.13_0.012_270)] hover:text-[oklch(0.96_0.006_270)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={earlyAccessHref}
            onClick={() => setMobileOpen(false)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[oklch(0.9_0.22_128)] px-4 text-sm font-semibold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)]"
          >
            Choose a plan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
