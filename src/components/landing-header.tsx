"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import ContactModal from "./contact-modal";
import LanguageSwitcher from "./language-switcher";
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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { t } = useTranslations();
  const locale = useLocale();

  // Industries - What problems we solve (industry-specific)
  const industriesItems = [
    {
      title: locale === 'de' ? "Marketing-Agenturen" : "Marketing Agencies",
      description: locale === 'de' 
        ? "Lead-Management, Social Media Automatisierung & Client Reporting"
        : "Lead management, social media automation & client reporting",
      href: getLocalizedPath(locale, '/industries/marketing-agencies'),
    },
    // Add more industry solutions here later
  ];

  // Products - Ready-to-use tools
  const productsItems = [
    {
      title: locale === 'de' ? 'ReportFlow Engine™' : 'ReportFlow Engine™',
      description: locale === 'de' 
        ? '23+ Stunden monatlich sparen mit automatisierten Client-Berichten'
        : 'Save 23+ hours monthly with automated client reporting',
      href: getLocalizedPath(locale, '/products/reportflow-engine'),
    },
  ];

  // Services - Custom development
  const servicesItems = [
    {
      title: locale === 'de' ? "AI Audit" : "AI Audit",
      description: locale === 'de' 
        ? "Potenzialanalyse für AI-Integration in Ihrem Unternehmen"
        : "Potential analysis for AI integration in your business",
      href: getLocalizedPath(locale, '/services/ai-audit'),
    },
    {
      title: locale === 'de' ? "Strategische Beratung" : "Strategic Consulting",
      description: locale === 'de'
        ? "Maßgeschneiderte AI-Strategie und Implementierungsplanung"
        : "Custom AI strategy and implementation planning",
      href: getLocalizedPath(locale, '/services/ai-consulting'),
    },
    {
      title: locale === 'de' ? "Individuelle Entwicklung" : "Custom Development",
      description: locale === 'de'
        ? "Maßgeschneiderte AI-Lösungen und Automatisierungen"
        : "Custom AI solutions and automations tailored to your needs",
      href: getLocalizedPath(locale, '/services/ai-development'),
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-6"
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
                  {/* Services Dropdown - Custom work */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white">
                      {t("common.services")}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                        {servicesItems.map((item) => (
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

                  {/* Products Dropdown - Ready-to-use tools */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white">
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

                  {/* Industries Dropdown - Industry-specific */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white">
                      {locale === 'de' ? 'Branchen' : 'Industries'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                        {industriesItems.map((item) => (
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
                      className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2"
                    >
                      {locale === 'de' ? 'Über uns' : 'About'}
                    </Link>
                  </NavigationMenuItem>

                  {/* Blog Link */}
                  <NavigationMenuItem>
                    <Link
                      href={getLocalizedPath(locale, '/blog')}
                      className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2"
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
          
          {/* CTA Button and Language Switcher */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <LanguageSwitcher />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.3
              }}
            >
              <a
                href="https://cal.com/christian-lutz-pw2nn4/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-2.5 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 overflow-hidden inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/>
                </svg>
                <span className="relative z-10">{locale === 'de' ? 'Termin buchen' : 'Book a Call'}</span>
              </a>
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
                        {t("common.services")}
                      </div>
                      {servicesItems.map((item) => (
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

                    {/* Industries - Industry-specific */}
                    <div className="px-3 py-2">
                      <div className="text-sm font-semibold text-white/50 mb-2">
                        {locale === 'de' ? 'Branchen' : 'Industries'}
                      </div>
                      {industriesItems.map((item) => (
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
                    <div className="px-3">
                      <LanguageSwitcher />
                    </div>
                    <a
                      href="https://cal.com/christian-lutz-pw2nn4/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full px-6 py-2.5 text-sm font-medium text-black bg-white rounded-md hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                        <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/>
                      </svg>
                      {locale === 'de' ? 'Termin buchen' : 'Book a Call'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
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