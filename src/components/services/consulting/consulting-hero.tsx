"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Lightbulb, ArrowRight, Users, Target, Zap } from "lucide-react";

export default function ConsultingHero() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-black to-black" />
      
      {/* Animated radial pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(249 115 22 / 0.3) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Glowing orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[100px]"
      />

      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          <div className="px-6 sm:px-12 lg:px-16 xl:px-20 py-32 lg:py-40 w-full">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm mb-8"
              >
                <Lightbulb className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-light">
                  {t("services.consulting.hero.badge")}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]"
              >
                {t("services.consulting.hero.title")}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-10"
              >
                {t("services.consulting.hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <button className="group px-8 py-4 text-sm font-medium text-black bg-orange-500 rounded-lg hover:bg-orange-400 transition-all duration-300 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2">
                  {t("services.consulting.hero.primaryCta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300">
                  {t("services.consulting.hero.secondaryCta")}
                </button>
              </motion.div>

              {/* Value props */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-1">Strategic</div>
                    <div className="text-white/50 text-xs">Vision to execution</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-1">Expert-Led</div>
                    <div className="text-white/50 text-xs">Proven track record</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm mb-1">Actionable</div>
                    <div className="text-white/50 text-xs">Immediate impact</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Roadmap visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="space-y-4">
                {[
                  { phase: "Discovery", duration: "Week 1-2", status: "active", color: "orange" },
                  { phase: "Strategy", duration: "Week 3-4", status: "pending", color: "orange" },
                  { phase: "Implementation", duration: "Week 5-8", status: "pending", color: "orange" },
                  { phase: "Optimization", duration: "Ongoing", status: "pending", color: "orange" }
                ].map((item, idx) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className={`relative bg-gradient-to-br ${
                      item.status === 'active' 
                        ? 'from-orange-500/20 to-orange-500/10 border-orange-500/40' 
                        : 'from-white/5 to-white/[0.02] border-white/10'
                    } backdrop-blur-xl border rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-orange-500/30`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-medium ${
                          item.status === 'active' ? 'text-orange-400' : 'text-white'
                        }`}>
                          {item.phase}
                        </h3>
                        <span className="text-white/50 text-sm">{item.duration}</span>
                      </div>
                      
                      {/* Progress indicator */}
                      {item.status === 'active' && (
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Connector line */}
                    {idx < 3 && (
                      <div className="absolute left-8 top-full h-4 w-0.5 bg-gradient-to-b from-orange-500/30 to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 bg-orange-500 text-black px-6 py-4 rounded-xl shadow-2xl"
              >
                <div className="text-3xl font-light mb-1">3-6 months</div>
                <div className="text-sm opacity-80">To full AI adoption</div>
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
