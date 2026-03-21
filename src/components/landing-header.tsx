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
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ContactModal from "@/components/contact-modal";
import { cn } from "@/lib/utils";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
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
    {
      title: locale === 'de' ? 'Core by SeventeenLabs' : 'Core by SeventeenLabs',
      description: locale === 'de'
        ? 'Plattformschicht für Kontext, Governance und agentische Orchestrierung im Unternehmen'
        : 'Platform layer for company context, governance, and agent orchestration',
      href: getLocalizedPath(locale, '/products/core'),
    },
  ];

  const productQuickLinks = [
    {
      title: locale === 'de' ? 'Operator Notes' : 'Operator notes',
      href: getLocalizedPath(locale, '/blog'),
    },
  ];

  const solutionsUseCases = [
    {
      title: locale === 'de' ? 'Founder Briefings' : 'Founder Briefings',
      href: getLocalizedPath(locale, '/solutions/founder-briefings'),
    },
    {
      title: locale === 'de' ? 'Governed Execution' : 'Governed Execution',
      href: getLocalizedPath(locale, '/solutions/governed-execution'),
    },
    {
      title: locale === 'de' ? 'Decision Intelligence' : 'Decision Intelligence',
      href: getLocalizedPath(locale, '/solutions/decision-intelligence'),
    },
  ];

  const solutionsIndustries = [
    {
      title: locale === 'de' ? 'Agencies' : 'Agencies',
      href: getLocalizedPath(locale, '/solutions/agencies'),
    },
    {
      title: locale === 'de' ? 'Education companies' : 'Education companies',
      href: getLocalizedPath(locale, '/solutions/education-companies'),
    },
    {
      title: locale === 'de' ? 'SaaS teams' : 'SaaS teams',
      href: getLocalizedPath(locale, '/solutions/saas-teams'),
    },
    {
      title: locale === 'de' ? 'Portfolio operators' : 'Portfolio operators',
      href: getLocalizedPath(locale, '/solutions/portfolio-operators'),
    },
    {
      title: locale === 'de' ? 'Financial services' : 'Financial services',
      href: getLocalizedPath(locale, '/solutions/financial-services'),
    },
    {
      title: locale === 'de' ? 'Healthcare operations' : 'Healthcare operations',
      href: getLocalizedPath(locale, '/solutions/healthcare-operations'),
    },
  ];

  const resourcesItems = [
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

  const resourcesLearn = resourcesItems.slice(0, 1);
  const resourcesCompany = resourcesItems.slice(1);

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
        className="mx-auto w-full max-w-[94rem] px-2.5 py-4 sm:px-3 lg:px-4"
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
                <NavigationMenuList className="flex flex-row items-center gap-6 !space-x-0">
                  {/* Products Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium tracking-wide text-white/70 hover:text-white">
                      {locale === 'de' ? 'Produkte' : 'Products'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[640px] p-4">
                        <div className="flex items-start gap-8">
                          <div className="w-[58%] border-r border-white/10 pr-6">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                              {locale === 'de' ? 'Produkte' : 'Products'}
                            </p>
                            <ul className="space-y-1.5">
                              {productsItems.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-md px-2.5 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    <p className="font-medium">{item.title}</p>
                                    <p className="mt-0.5 text-xs text-white/55">{item.description}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="w-[42%]">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                              {locale === 'de' ? 'Schnellzugriff' : 'Quick links'}
                            </p>
                            <ul className="space-y-1.5">
                              {productQuickLinks.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-md px-2.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Solutions Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium tracking-wide text-white/70 hover:text-white">
                      {locale === 'de' ? 'Lösungen' : 'Solutions'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[680px] p-4">
                        <div className="flex items-start gap-8">
                          <div className="w-[42%] border-r border-white/10 pr-6">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                              {locale === 'de' ? 'Use cases' : 'Use cases'}
                            </p>
                            <ul className="space-y-1.5">
                              {solutionsUseCases.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-md px-2.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="w-[58%]">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                              {locale === 'de' ? 'Industries' : 'Industries'}
                            </p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                              {solutionsIndustries.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-md px-2.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium tracking-wide text-white/70 hover:text-white">
                      {locale === 'de' ? 'Ressourcen' : 'Ressources'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-4">
                        <div className="flex items-start gap-8">
                          <div className="w-1/2 border-r border-white/10 pr-6">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                              {locale === 'de' ? 'Ressourcen' : 'Resources'}
                            </p>
                            <ul className="space-y-1.5">
                              {resourcesLearn.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-md px-2.5 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    <p className="font-medium">{item.title}</p>
                                    <p className="mt-0.5 text-xs text-white/55">{item.description}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="w-1/2">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                              {locale === 'de' ? 'Unternehmen' : 'Company'}
                            </p>
                            <ul className="space-y-1.5">
                              {resourcesCompany.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-md px-2.5 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                                  >
                                    <p className="font-medium">{item.title}</p>
                                    <p className="mt-0.5 text-xs text-white/55">{item.description}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
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
              className="flex items-center gap-3"
            >
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center rounded-lg border border-white/25 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/45 hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {locale === 'de' ? 'Vertrieb kontaktieren' : 'Contact Sales'}
              </button>
              <Link
                href={getLocalizedPath(locale, '/products')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="relative z-10">{locale === 'de' ? 'Produkte ansehen' : 'View Products'}</span>
              </Link>
            </motion.div>
          </div>
        </nav>

        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
        
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
                    {/* Products */}
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold text-white/50 mb-2">
                        {locale === 'de' ? 'Produkte' : 'Products'}
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

                    {/* Solutions */}
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold text-white/50 mb-2">
                        {locale === 'de' ? 'Lösungen' : 'Solutions'}
                      </div>
                      {[...solutionsUseCases, ...solutionsIndustries].map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="font-medium">{item.title}</div>
                          {'description' in item && item.description ? (
                            <div className="text-xs text-white/60 mt-0.5">{item.description}</div>
                          ) : null}
                        </Link>
                      ))}
                    </div>

                    {/* Resources */}
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold text-white/50 mb-2">
                        {locale === 'de' ? 'Ressourcen' : 'Ressources'}
                      </div>
                      {resourcesItems.map((item) => (
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
                  
                  <div className="py-6 space-y-4">
                    <Link
                      href={getLocalizedPath(locale, '/products')}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {locale === 'de' ? 'Produkte ansehen' : 'View Products'}
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
