"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

interface ProcessStep {
  key: string;
  icon: LucideIcon;
  number: string;
}

interface AgencyProcessProps {
  steps: ProcessStep[];
}

export default function AgencyProcess({ steps }: AgencyProcessProps) {
  const { t } = useTranslations();

  return (
    <section className="relative py-32 px-4 sm:px-5 lg:px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
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
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/20">
              Our Process
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t("agency.process.title")}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t("agency.process.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Connection line - visible only on large screens */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-16 left-full w-full h-0.5 -translate-x-4 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    style={{ transformOrigin: "left" }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-slate-700 via-slate-600 to-transparent" />
                  </motion.div>
                )}
                
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 hover:border-slate-700/50 transition-all duration-500 h-full hover:transform hover:scale-105">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-3xl transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg shadow-purple-500/20"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-full h-full text-white" />
                      </motion.div>
                      <span className="text-6xl font-bold text-slate-800/80 group-hover:text-slate-700 transition-colors">
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {t(`agency.process.steps.${step.key}.title`)}
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {t(`agency.process.steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Visual flow indicator for mobile */}
        <div className="lg:hidden mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
