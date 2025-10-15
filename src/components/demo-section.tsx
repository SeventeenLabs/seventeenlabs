"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "@/lib/i18n/context";

export default function DemoSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslations();

  const workflowSteps = [
    t("demo.steps.leadForm"),
    t("demo.steps.syncCrm"),
    t("demo.steps.emailSequence"),
    t("demo.steps.followUp"),
    t("demo.steps.analytics"),
  ];

  const stats = [
    { label: t("demo.stats.hoursSaved"), value: "15+" },
    { label: t("demo.stats.efficiency"), value: "40%" },
    { label: t("demo.stats.setupTime"), value: "< 1 Day" },
  ];

  return (
    <section className="bg-black px-6 py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black"></div>
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {t("demo.workflowTitle")}
          </h2>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            {t("demo.workflowSubtitle")}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Visual Demo Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black"></div>
              
              {/* Mock Workflow Interface */}
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3, scale: 0.95 }}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.3,
                        scale: index <= currentStep ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        index <= currentStep ? 'bg-slate-800/80' : 'bg-slate-800/40'
                      }`}
                    >
                      <div className={`size-6 rounded-full flex items-center justify-center ${
                        index <= currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        {index <= currentStep ? (
                          <CheckCircle className="size-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        index <= currentStep ? 'text-white' : 'text-slate-400'
                      }`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Play Button */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      const interval = setInterval(() => {
                        setCurrentStep(prev => {
                          if (prev >= workflowSteps.length - 1) {
                            clearInterval(interval);
                            return prev;
                          }
                          return prev + 1;
                        });
                      }, 800);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-medium transition-colors"
                  >
                    <Play className="size-4" />
                    {t("demo.watchDemo")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("demo.contentTitle")}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {t("demo.contentDescription")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-slate-300 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="/workflows"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
              >
                {t("demo.browseWorkflows")}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}