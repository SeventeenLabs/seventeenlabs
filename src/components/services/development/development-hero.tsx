"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Code2, ArrowRight, Sparkles, Cpu, Boxes } from "lucide-react";

export default function DevelopmentHero() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-black" />
      
      {/* Tech grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(16 185 129 / 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(16 185 129 / 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
        }} />
      </div>

      {/* Glowing orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[100px]"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm mb-8"
              >
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-light">
                  {t("services.development.hero.badge")}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]"
              >
                {t("services.development.hero.title")}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-10"
              >
                {t("services.development.hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <button className="group px-8 py-4 text-sm font-medium text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
                  {t("services.development.hero.primaryCta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300">
                  {t("services.development.hero.secondaryCta")}
                </button>
              </motion.div>

              {/* Tech stack preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: Sparkles, label: "AI Integration" },
                  { icon: Cpu, label: "Automation" },
                  { icon: Boxes, label: "Custom Apps" }
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <item.icon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-white/70">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Code preview mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              {/* Terminal-style code preview */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                {/* Terminal header */}
                <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">custom-ai-solution.ts</span>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm space-y-3">
                  {[
                    { text: "import { AI } from '@ai/core';", delay: 0.6 },
                    { text: "import { Workflow } from '@n8n/api';", delay: 0.7 },
                    { text: "", delay: 0.8 },
                    { text: "const solution = AI.create({", delay: 0.9 },
                    { text: "  model: 'gpt-4',", delay: 1.0, indent: true },
                    { text: "  automation: true,", delay: 1.1, indent: true },
                    { text: "  custom: 'tailored',", delay: 1.2, indent: true },
                    { text: "});", delay: 1.3 },
                  ].map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: line.text ? 1 : 0.3, x: 0 }}
                      transition={{ duration: 0.3, delay: line.delay }}
                      className={`${line.indent ? 'ml-6' : ''}`}
                    >
                      <span className={line.text.includes('import') ? 'text-purple-400' : 
                                     line.text.includes('const') ? 'text-blue-400' :
                                     line.text.includes("'") ? 'text-emerald-400' :
                                     'text-white/70'}>
                        {line.text || '//'}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Status bar */}
                <div className="bg-emerald-500/10 border-t border-emerald-500/20 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 text-xs">Ready to build</span>
                  </div>
                  <span className="text-white/50 text-xs">TypeScript</span>
                </div>
              </div>

              {/* Floating metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-emerald-400 text-2xl font-light">100%</div>
                  <div className="text-xs">
                    <div className="text-white/90">Custom Code</div>
                    <div className="text-white/50">No templates</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="absolute -top-6 -right-6 bg-emerald-500 text-black px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
              >
                ⚡ Fast Delivery
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
