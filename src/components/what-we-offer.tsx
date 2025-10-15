"use client";

import Link from "next/link";
import { AppWindow, Handshake, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function WhatWeOffer() {
  const { t } = useTranslations();
  const locale = useLocale();

  const offerings = [
    {
      title: t("whatWeOffer.workflows.title"),
      description: t("whatWeOffer.workflows.description"),
      href: `/workflows`,
      external: true,
      icon: Workflow,
      key: "workflows"
    },
    {
      title: t("whatWeOffer.aiTools.title"),
      description: t("whatWeOffer.aiTools.description"),
      href: getLocalizedPath(locale, '/apps'),
      external: false,
      icon: AppWindow,
      key: "aiTools"
    },
    {
      title: t("whatWeOffer.agency.title"),
      description: t("whatWeOffer.agency.description"),
      href: getLocalizedPath(locale, '/agency'),
      external: false,
      icon: Handshake,
      key: "agency"
    },
  ];

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }} className="bg-black">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30"></div>
      
      <div style={{ height: '100%', overflowY: 'auto', padding: '6rem 1.5rem' }}>
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-light tracking-tight text-white md:text-5xl">
              {t("whatWeOffer.title")}
            </h2>
            <p className="mt-4 text-xl text-white/70 font-light max-w-3xl mx-auto">
              {t("whatWeOffer.subtitle")}
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {offerings.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group relative flex flex-col w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10"
                  >
                    <div className="inline-flex size-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white shadow-lg flex-shrink-0">
                      <Icon className="size-7" aria-hidden />
                    </div>
                    
                    <h3 className="mt-6 text-2xl font-light text-white group-hover:text-white">
                      {item.title}
                    </h3>
                    
                    <p className="mt-4 text-base text-white/70 font-light leading-relaxed flex-grow">
                      {item.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-sm font-light text-white/70 group-hover:text-white">
                      <span>{t(`whatWeOffer.${item.key}.cta`)}</span>
                      <span
                        aria-hidden
                        className="ml-2 text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-white"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
