"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import ContactModal from "./contact-modal";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { t } = useTranslations();
  const locale = useLocale();

  const navigation = [
    { name: t("common.whatWeDo"), href: `/${locale}#what-we-do` },
    { name: t("common.products"), href: `/workflows` },
    { name: t("common.services"), href: `/${locale}/agency` },
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
            <Link href={`/${locale}`} className="-m-1.5 p-1.5 flex items-center gap-2">
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
            <div className="hidden lg:flex lg:gap-x-10">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    delay: 0.1 + index * 0.05
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium leading-6 text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
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
          <div className="hidden lg:flex">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.3
              }}
            >
              <button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-6 py-2.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">{t("common.getInTouch")}</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </button>
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
                <Link href={`/${locale}`} className="-m-1.5 p-1.5">
                  <Image
                    src="/logo_anim.svg"
                    alt="SeventeenLabs Logo"
                    width={140}
                    height={26}
                    className="h-7 w-auto"
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
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setContactModalOpen(true);
                      }}
                      className="w-full px-6 py-2.5 text-sm font-medium text-black bg-white rounded-md hover:bg-white/90 transition-all duration-200"
                    >
                      {t("common.getInTouch")}
                    </button>
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