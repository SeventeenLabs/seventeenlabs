"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LucideIcon } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";
import { getTranslations } from "@/lib/i18n/translations";
import { Locale } from "@/lib/i18n/config";

interface Service {
  key: string;
  icon: LucideIcon;
  color: string;
}

interface AgencyServicesProps {
  services: Service[];
  locale: string;
}

export default function AgencyServices({ services, locale }: AgencyServicesProps) {
  const { t } = useTranslations();
  const translations = getTranslations(locale as Locale);

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/20">
              What We Offer
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t("agency.services.title")}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t("agency.services.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 p-8 hover:border-slate-700/50 transition-all duration-500 h-full">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-5 blur-2xl`} />
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 shadow-lg shadow-${service.color.split('-')[1]}-500/20`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-full h-full text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                      {t(`agency.services.items.${service.key}.title`)}
                    </h3>
                    
                    <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                      {t(`agency.services.items.${service.key}.description`)}
                    </p>
                    
                    <ul className="space-y-4">
                      {(translations.agency.services.items[service.key as keyof typeof translations.agency.services.items].features as string[]).map((feature: string, i: number) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3 text-slate-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                        >
                          <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
