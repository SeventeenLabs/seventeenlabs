"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { SearchCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AuditHero() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-black" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
      </div>

      {/* Glowing orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px]"
      />

      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-32 lg:py-40 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8"
              >
                <SearchCheck className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-light">
                  {t("services.audit.hero.badge")}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]"
              >
                {t("services.audit.hero.title")}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-10"
              >
                {t("services.audit.hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <button className="group px-8 py-4 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                  {t("services.audit.hero.primaryCta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300">
                  {t("services.audit.hero.secondaryCta")}
                </button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-wrap gap-6 text-sm text-white/50"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>2-3 weeks delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>No obligations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Free consultation</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Visual element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <SearchCheck className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">AI Opportunity Analysis</h3>
                        <p className="text-white/50 text-sm">Comprehensive Process Review</p>
                      </div>
                    </div>
                    
                    {/* Progress bars */}
                    <div className="space-y-4">
                      {[
                        { label: "Process Analysis", value: 95, delay: 0.6 },
                        { label: "AI Potential Score", value: 88, delay: 0.7 },
                        { label: "ROI Projection", value: 92, delay: 0.8 }
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/70">{item.label}</span>
                            <span className="text-blue-400 font-medium">{item.value}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: item.delay, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <div className="text-2xl font-light text-white mb-1">12+</div>
                        <div className="text-xs text-white/50">Opportunities</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-white mb-1">40%</div>
                        <div className="text-xs text-white/50">Time Saved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-white mb-1">€50k</div>
                        <div className="text-xs text-white/50">Avg ROI</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -top-6 -right-6 bg-blue-500 text-black px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
                >
                  ✓ Expert Analysis
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-4 -left-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
                >
                  🎯 Actionable Insights
                </motion.div>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
