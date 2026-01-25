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
  href: getLocalizedPath(locale, "/services/ai-audit"),
      color: "blue",
    },
    {
      icon: MessageSquare,
      title: t("whatWeDo.consulting.title"),
      description: t("whatWeDo.consulting.description"),
  href: getLocalizedPath(locale, "/services/ai-consulting"),
      color: "orange",
    },
    {
      icon: Code2,
      title: t("whatWeDo.development.title"),
      description: t("whatWeDo.development.description"),
  href: getLocalizedPath(locale, "/services/ai-development"),
      color: "emerald",
    },
  ];

  return (
    <section id="what-we-do" className="relative bg-black py-24 lg:py-32">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none"></div>
      
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium uppercase tracking-wider mb-6">
            {locale === 'de' ? 'Was wir anbieten' : 'What We Offer'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t("whatWeDo.title")}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl font-light leading-relaxed">
            {t("whatWeDo.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = {
              blue: {
                border: "border-blue-500/10 hover:border-blue-500/30",
                bg: "bg-blue-500/5 hover:bg-blue-500/10",
                iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20 border-blue-500/20",
                iconColor: "text-blue-400",
                accent: "from-blue-500/0 via-blue-500/50 to-blue-500/0",
              },
              orange: {
                border: "border-orange-500/10 hover:border-orange-500/30",
                bg: "bg-orange-500/5 hover:bg-orange-500/10",
                iconBg: "bg-orange-500/10 group-hover:bg-orange-500/20 border-orange-500/20",
                iconColor: "text-orange-400",
                accent: "from-orange-500/0 via-orange-500/50 to-orange-500/0",
              },
              emerald: {
                border: "border-emerald-500/10 hover:border-emerald-500/30",
                bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
                iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20 border-emerald-500/20",
                iconColor: "text-emerald-400",
                accent: "from-emerald-500/0 via-emerald-500/50 to-emerald-500/0",
              },
            };
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <Link href={service.href}>
                  <div className={`flex flex-col items-start p-8 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300 h-full cursor-pointer`}>
                    <div className={`inline-flex p-4 rounded-xl ${colors.iconBg} border mb-6 group-hover:scale-110 transition-all duration-300`}>
                      <Icon className={`w-7 h-7 ${colors.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-light text-white mb-4 group-hover:text-white/90 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    {/* Learn more link */}
                    <div className={`mt-6 flex items-center gap-2 text-sm ${colors.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <span>{locale === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {/* Hover accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>
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
