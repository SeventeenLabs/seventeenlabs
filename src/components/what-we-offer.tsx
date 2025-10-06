"use client";

import Link from "next/link";
import { AppWindow, Handshake, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "@/lib/i18n/context";

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
      href: `/${locale}/apps`,
      external: false,
      icon: AppWindow,
      key: "aiTools"
    },
    {
      title: t("whatWeOffer.agency.title"),
      description: t("whatWeOffer.agency.description"),
      href: `/${locale}/agency`,
      external: false,
      icon: Handshake,
      key: "agency"
    },
  ];

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }} className="bg-slate-900">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent z-30"></div>
      
      <div style={{ height: '100%', overflowY: 'auto', padding: '6rem 1.5rem' }}>
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t("whatWeOffer.title")}
            </h2>
            <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
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
                    className="group relative flex flex-col w-full overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-500/10"
                  >
                    <div className="inline-flex size-14 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-slate-300 shadow-lg flex-shrink-0">
                      <Icon className="size-7" aria-hidden />
                    </div>
                    
                    <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-white">
                      {item.title}
                    </h3>
                    
                    <p className="mt-4 text-base text-slate-300 leading-relaxed flex-grow">
                      {item.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-sm font-medium text-slate-200 group-hover:text-white">
                      <span>{t(`whatWeOffer.${item.key}.cta`)}</span>
                      <span
                        aria-hidden
                        className="ml-2 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white"
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
