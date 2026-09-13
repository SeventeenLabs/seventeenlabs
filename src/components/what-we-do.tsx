"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/lib/i18n/context";
import { SearchCheck, MessageSquare, Code2 } from "lucide-react";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function WhatWeDo() {
  const { t } = useTranslations();
  const locale = useLocale();

  const services = [
    {
      icon: SearchCheck,
      title: t("whatWeDo.audit.title"),
      description: t("whatWeDo.audit.description"),
  href: getLocalizedPath(locale, "/products/relay"),
      color: "blue",
    },
    {
      icon: MessageSquare,
      title: t("whatWeDo.consulting.title"),
      description: t("whatWeDo.consulting.description"),
  href: getLocalizedPath(locale, "/products/core"),
      color: "orange",
    },
    {
      icon: Code2,
      title: t("whatWeDo.development.title"),
      description: t("whatWeDo.development.description"),
  href: getLocalizedPath(locale, "/frame"),
      color: "emerald",
    },
  ];

  return (
    <section id="what-we-do" className="relative bg-black py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t("whatWeDo.title")}
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
            {t("whatWeDo.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={service.href}>
                  <div className="flex flex-col p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 h-full cursor-pointer">
                    <Icon className="w-8 h-8 text-white/60 mb-6 group-hover:text-white transition-colors" />
                    <h3 className="text-2xl font-light text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed mb-4 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                      <span>{locale === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
