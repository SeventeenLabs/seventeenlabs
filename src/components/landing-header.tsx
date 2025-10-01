"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n/context";

import GlassSurface from "./GlassSurface";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslations();
  const locale = useLocale();

  const navigation = [
    { name: t("common.home"), href: `/${locale}` },
    { name: t("common.workflows"), href: `/${locale}/workflows` },
    { name: t("common.apps"), href: `/${locale}/apps` },
    { name: t("common.agency"), href: `/${locale}/agency` },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-6 py-6 lg:px-8"
      >
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Image
                src="/logo_anim.svg"
                alt="SeventeenLabs Logo"
                width={140}
                height={26}
                className="h-6 w-auto"
              />
            </Link>
          </div>
          
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
          
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 1.0 + index * 0.1 // Start sooner with stagger
                }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 1.4 // After all menu items
              }}
            >
              <GlassSurface 
                width={120} 
                height={36}
                borderRadius={6}
                brightness={60}
                opacity={0.8}
                blur={12}
                className="hover:scale-[1.02] transition-transform duration-200"
              >
                <Link 
                  href="/workflows"
                  className="inline-flex items-center justify-center px-4 py-2 text-white hover:text-white/90 transition-colors w-full h-full text-sm font-medium whitespace-nowrap"
                >
                  {t("common.getStarted")}
                </Link>
              </GlassSurface>
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
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-950/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-white">SeventeenLabs</span>
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
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="py-6">
                    <Link
                      href="/workflows"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("common.getStarted")}
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