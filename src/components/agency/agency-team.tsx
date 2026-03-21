"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { getTranslations } from "@/lib/i18n/translations";
import { Locale } from "@/lib/i18n/config";

interface AgencyTeamProps {
  locale: string;
}

export default function AgencyTeam({ locale }: AgencyTeamProps) {
  const { t } = useTranslations();
  const translations = getTranslations(locale as Locale);

  return (
    <section className="relative py-32 px-4 sm:px-5 lg:px-6 bg-slate-950">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/20">
              Our Expertise
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t("agency.team.title")}
          </h2>
          
          <p className="text-xl text-slate-300 mb-16 leading-relaxed max-w-3xl mx-auto">
            {t("agency.team.description")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {(translations.agency.team.expertise as string[]).map((expertise: string, index: number) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                className="group relative px-8 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-full text-slate-300 font-medium hover:border-slate-600/50 transition-all duration-300 cursor-default"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 rounded-full transition-all duration-300" />
                
                {/* Text */}
                <span className="relative z-10 group-hover:text-white transition-colors">
                  {expertise}
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
