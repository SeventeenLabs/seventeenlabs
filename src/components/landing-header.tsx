"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslations();
  const locale = useLocale();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productsItems = [
    {
      title: locale === 'de' ? 'Relay by SeventeenLabs' : 'Relay by SeventeenLabs',
      description: locale === 'de' 
        ? 'Praktisches KI-System für Planung, Freigaben und verantwortbare Ausführung im Tagesbetrieb'
        : 'Practical AI system for planning, approvals, and accountable daily execution',
      href: getLocalizedPath(locale, '/products/relay'),
    },
  ];

  const platformItems = [
    {
      title: locale === 'de' ? "Produktbibliothek" : "Product Library",
      description: locale === 'de' 
        ? "Workflows, Patterns und Ressourcen für kontrollierte KI-Operationen"
        : "Workflows, patterns, and resources for governed AI operations",
      href: '/workflows',
    },
    {
      title: locale === 'de' ? "Blog" : "Blog",
      description: locale === 'de'
        ? "Praktische Insights zur sicheren KI-Integration in den Betriebsalltag"
        : "Practical insights for safely integrating AI into daily operations",
      href: getLocalizedPath(locale, '/blog'),
    },
    {
      title: locale === 'de' ? "Unternehmen" : "Company",
      description: locale === 'de'
        ? "Mission, Positionierung und Roadmap von SeventeenLabs"
        : "Mission, positioning, and roadmap of SeventeenLabs",
      href: getLocalizedPath(locale, '/about'),
    },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        isScrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-[84rem] px-4 py-4 sm:px-6 lg:px-8 xl:px-10"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <nav className="flex items-center justify-between" aria-label="Global">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href={getLocalizedPath(locale)} className="-m-1.5 p-1.5 flex items-center gap-2">
              <Image
                src="/logo_anim.svg"
                alt="SeventeenLabs Logo"
                width={110}
                height={20}
                className="h-5 w-auto"
              />
            </Link>
            
            {/* Divider */}
            <div className="hidden lg:block h-8 w-px bg-white/20" />
            
            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:items-center">
              <NavigationMenu>
                <NavigationMenuList className="space-x-6">
                  {/* Products Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium tracking-wide text-white/70 hover:text-white">
                      {t("common.products")}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                        {productsItems.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Platform Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium tracking-wide text-white/70 hover:text-white">
                      {locale === 'de' ? 'Plattform' : 'Platform'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                        {platformItems.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* About Link - No dropdown */}
                  <NavigationMenuItem>
                    <Link
                      href={getLocalizedPath(locale, '/about')}
                      className="px-4 py-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white"
                    >
                      {locale === 'de' ? 'Über uns' : 'About'}
                    </Link>
                  </NavigationMenuItem>

                  {/* Blog Link */}
                  <NavigationMenuItem>
                    <Link
                      href={getLocalizedPath(locale, '/blog')}
                      className="px-4 py-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white"
                    >
                      Blog
                    </Link>
                  </NavigationMenuItem>


                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.3
              }}
            >
              <Link
                href={getLocalizedPath(locale, '/products/relay')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="relative z-10">{locale === 'de' ? 'Relay entdecken' : 'Explore Relay'}</span>
              </Link>
            </motion.div>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link href={getLocalizedPath(locale)} className="-m-1.5 p-1.5">
                  <Image
                    src="/logo_anim.svg"
                    alt="SeventeenLabs Logo"
                    width={110}
                    height={20}
                    className="h-5 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/20">
                  <div className="space-y-2 py-6">
                    {/* Services */}
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold text-white/50 mb-2">
                        {t("common.products")}
                      </div>
                      {productsItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-white/60 mt-0.5">{item.description}</div>
                        </Link>
                      ))}
                    </div>

                    {/* Products */}
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold text-white/50 mb-2">
                        {locale === 'de' ? 'Plattform' : 'Platform'}
                      </div>
                      {platformItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-white/60 mt-0.5">{item.description}</div>
                        </Link>
                      ))}
                    </div>

                  </div>
                  
                  {/* About & Blog Links */}
                  <div className="py-6 border-y border-white/20 space-y-2">
                    <Link
                      href={getLocalizedPath(locale, '/about')}
                      className="block rounded-lg px-6 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {locale === 'de' ? 'Über uns' : 'About'}
                    </Link>
                    <Link
                      href={getLocalizedPath(locale, '/blog')}
                      className="block rounded-lg px-6 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </div>
                  
                  <div className="py-6 space-y-4">
                    <Link
                      href={getLocalizedPath(locale, '/products/relay')}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {locale === 'de' ? 'Relay entdecken' : 'Explore Relay'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || "#"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/60">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";