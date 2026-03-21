"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

interface Stat {
  key: string;
  icon: LucideIcon;
}

interface AgencyResultsProps {
  stats: Stat[];
}

export default function AgencyResults({ stats }: AgencyResultsProps) {
  const { t } = useTranslations();

  return (
    <section className="relative py-32 px-4 sm:px-5 lg:px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
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
            <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/20">
              Proven Results
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            {t("agency.results.title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-10 text-center hover:border-slate-700/50 transition-all duration-500 hover:transform hover:scale-105 h-full">
                  {/* Gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 rounded-3xl transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 mb-6 shadow-lg shadow-purple-500/30"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-slate-300 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    >
                      {t(`agency.results.stats.${stat.key}.value`)}
                    </motion.div>
                    
                    <div className="text-slate-400 font-medium text-lg group-hover:text-slate-300 transition-colors">
                      {t(`agency.results.stats.${stat.key}.label`)}
                    </div>
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
