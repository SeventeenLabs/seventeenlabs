"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function LandingHeader() {
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = getLocalizedPath(locale, "/");
  const relayHref = getLocalizedPath(locale, "/products/relay");
  const productsHref = getLocalizedPath(locale, "/products");
  const solutionsHref = getLocalizedPath(locale, "/solutions");
  const blogHref = getLocalizedPath(locale, "/blog");
  const aboutHref = getLocalizedPath(locale, "/about");

  const solutionsItems = [
    { label: locale === "de" ? "AI Agents" : "AI agents", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Coding" : "Coding", href: `${solutionsHref}/marketing-agencies` },
  ] as const;

  const solutionsDepartmentItems = [
    { label: locale === "de" ? "Security" : "Security", href: `${solutionsHref}/marketing-agencies` },
  ] as const;

  const solutionsIndustryItems = [
    { label: locale === "de" ? "Customer Support" : "Customer support", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Education" : "Education", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Financial Services" : "Financial services", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Government" : "Government", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Healthcare" : "Healthcare", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Life Sciences" : "Life sciences", href: `${solutionsHref}/marketing-agencies` },
    { label: locale === "de" ? "Nonprofits" : "Nonprofits", href: `${solutionsHref}/marketing-agencies` },
  ] as const;

  const productsItems = [
    { label: "Relay", href: relayHref },
    { label: "Core", href: `${productsHref}/core` },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-[#23252a]/90 bg-[#010102]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex w-full max-w-[88rem] items-center justify-between px-5 py-4 md:px-8">
        <Link href={homeHref} className="flex items-center gap-3 text-[#f7f8f8]">
          <Image src="/logo-white.svg" alt="SeventeenLabs" width={20} height={20} className="h-5 w-5 object-contain" />
          <span className="text-base font-semibold tracking-[-0.02em]">SeventeenLabs</span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1 space-x-0">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] data-[state=open]:text-[#f7f8f8]">
                    {locale === "de" ? "Losungen" : "Solutions"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="w-[36rem] rounded-md bg-[#121214] p-4">
                      <div className="grid grid-cols-[0.95fr_2fr] gap-4">
                        <div className="border-r border-[#2a2d31] pr-4">
                          <p className="mb-2 text-xs uppercase tracking-[0.12em] text-[#8a8f98]">{locale === "de" ? "Use Cases" : "Use cases"}</p>
                          <div className="space-y-1">
                            {solutionsItems.map((item) => (
                              <NavigationMenuLink asChild key={`use-${item.label}`}>
                                <Link href={item.href} className="block rounded-md px-2 py-1.5 text-sm font-semibold text-[#f3f4f6] hover:bg-[#1b1d20]">
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                          <p className="mb-2 mt-4 text-xs uppercase tracking-[0.12em] text-[#8a8f98]">{locale === "de" ? "Departments" : "Departments"}</p>
                          <div className="space-y-1">
                            {solutionsDepartmentItems.map((item) => (
                              <NavigationMenuLink asChild key={`dept-${item.label}`}>
                                <Link href={item.href} className="block rounded-md px-2 py-1.5 text-sm font-semibold text-[#f3f4f6] hover:bg-[#1b1d20]">
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.12em] text-[#8a8f98]">{locale === "de" ? "Industries" : "Industries"}</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {solutionsIndustryItems.map((item) => (
                              <NavigationMenuLink asChild key={`ind-${item.label}`}>
                                <Link href={item.href} className="rounded-md px-2 py-1.5 text-sm font-semibold text-[#f3f4f6] hover:bg-[#1b1d20]">
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] data-[state=open]:text-[#f7f8f8]">
                    {locale === "de" ? "Produkte" : "Products"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="w-48 rounded-md bg-[#121214] p-2">
                      {productsItems.map((item) => (
                        <NavigationMenuLink asChild key={`prod-${item.label}`}>
                          <Link href={item.href} className="block rounded-md px-3 py-2 text-sm text-[#d0d6e0] hover:bg-[#1b1d20] hover:text-[#f7f8f8]">
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={blogHref} className="inline-flex h-9 items-center px-3 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8]">
                    News
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={aboutHref} className="inline-flex h-9 items-center px-3 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8]">
                    About
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Link
            href={relayHref}
            className="hidden rounded-md bg-[#5e6ad2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#828fff] md:inline-flex"
          >
            {locale === "de" ? "Relay testen" : "Try Relay"}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#23252a] bg-[#0f1011] text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-[#23252a] bg-[#010102] px-5 pb-6 pt-3 lg:hidden">
          <div className="space-y-2">
            <div className="rounded-md border border-[#23252a] bg-[#0f1011] p-2">
              <p className="px-2 py-1 text-xs uppercase tracking-[0.14em] text-[#8a8f98]">{locale === "de" ? "Losungen" : "Solutions"}</p>
              {[...solutionsItems, ...solutionsDepartmentItems, ...solutionsIndustryItems].map((item) => (
                <Link
                  key={`m-sol-${item.label}`}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-[#d0d6e0] transition-colors hover:bg-[#17191b] hover:text-[#f7f8f8]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="rounded-md border border-[#23252a] bg-[#0f1011] p-2">
              <p className="px-2 py-1 text-xs uppercase tracking-[0.14em] text-[#8a8f98]">{locale === "de" ? "Produkte" : "Products"}</p>
              {productsItems.map((item) => (
                <Link
                  key={`m-prod-${item.label}`}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-[#d0d6e0] transition-colors hover:bg-[#17191b] hover:text-[#f7f8f8]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href={blogHref} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2.5 text-sm text-[#d0d6e0] hover:bg-[#0f1011] hover:text-[#f7f8f8]">
              News
            </Link>
            <Link href={aboutHref} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2.5 text-sm text-[#d0d6e0] hover:bg-[#0f1011] hover:text-[#f7f8f8]">
              About
            </Link>
          </div>
          <Link
            href={relayHref}
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#5e6ad2] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#828fff]"
          >
            {locale === "de" ? "Relay testen" : "Try Relay"}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
