"use client";

import { motion } from "framer-motion";
import { Calendar, Search, FileText } from "lucide-react";

interface AuditProcessProps {
  locale: string;
  t: any;
}

const processSteps = [
  {
    number: "01",
    icon: Calendar,
  },
  {
    number: "02",
    icon: Search,
  },
  {
    number: "03",
    icon: FileText,
  }
];

export default function AuditProcess({ locale, t }: AuditProcessProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-zinc-950">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-light text-white/60 tracking-wider uppercase">
              {t.audit.process.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.audit.process.title}
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const stepKey = `step${index + 1}` as 'step1' | 'step2' | 'step3';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-white/10 p-8 bg-black/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white/60" />
                  </div>
                  <span className="text-5xl font-light text-white/20">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-light text-white mb-4">
                  {t.audit.process.steps[stepKey].title}
                </h3>
                
                <p className="text-white/60 font-light leading-relaxed">
                  {t.audit.process.steps[stepKey].description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
