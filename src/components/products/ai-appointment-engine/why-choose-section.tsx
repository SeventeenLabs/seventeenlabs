"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WhyChooseSection() {
  const benefits = [
    "Eliminate 23+ hours monthly spent on manual data pulling and report creation",
    "Automated platform connections fetch all metrics without human intervention",
    "AI-powered insights generate professional summaries and recommendations",
    "Consistent, branded reports delivered automatically to every client",
    "Improved client satisfaction through reliable, timely communication",
    "Universal solution works for ads, SEO, content, social media agencies",
    "Complete system deployed professionally within 5-7 business days",
    "Risk-free guarantee: $75 refund per hour under 23 monthly savings",
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-zinc-900">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-16"
        >
          <span className="text-sm font-light text-white/60 tracking-wider uppercase mb-4 block">
            Why This Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            Why Automated Client Reporting <span className="font-medium">Transforms Agencies</span>
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            Unlike generic tools, this is a complete system designed specifically for agencies to eliminate manual reporting while improving client satisfaction and retention.
          </p>

          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-light text-white mb-2">
                  {benefit}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}