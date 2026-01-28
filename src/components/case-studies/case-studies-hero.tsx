"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface CaseStudiesHeroProps {
  locale: string;
}

export default function CaseStudiesHero({ locale }: CaseStudiesHeroProps) {
  const isGerman = locale === "de";

  const content = {
    en: {
      badge: "Success Stories",
      title: "Real Results from Real Businesses",
      subtitle: "See how companies like yours are saving time, cutting costs, and scaling faster with AI automation",
      stats: {
        hoursSaved: "1,200+",
        hoursSavedLabel: "Hours Saved",
        avgEfficiency: "65%",
        avgEfficiencyLabel: "Avg. Efficiency Gain",
        roi: "380%",
        roiLabel: "Average ROI",
      },
    },
    de: {
      badge: "Erfolgsgeschichten",
      title: "Echte Ergebnisse von echten Unternehmen",
      subtitle: "Sehen Sie, wie Unternehmen wie Ihres Zeit sparen, Kosten senken und mit KI-Automatisierung schneller skalieren",
      stats: {
        hoursSaved: "1.200+",
        hoursSavedLabel: "Stunden gespart",
        avgEfficiency: "65%",
        avgEfficiencyLabel: "Ø Effizienzsteigerung",
        roi: "380%",
        roiLabel: "Durchschnittlicher ROI",
      },
    },
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-black to-black" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium uppercase tracking-wider mb-6">
            <TrendingUp className="w-4 h-4" />
            {t.badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6 tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-12">
            {t.subtitle}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {Object.entries(t.stats).filter((_, i) => i % 2 === 0).map(([key, value], index) => {
              const labelKey = `${key}Label` as keyof typeof t.stats;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                    {value}
                  </div>
                  <div className="text-sm text-white/50 font-light">
                    {t.stats[labelKey]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
