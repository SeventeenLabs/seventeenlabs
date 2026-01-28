"use client";

import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ProblemItem {
  text: string;
  impact?: string;
}

interface ProblemSectionProps {
  title?: string;
  subtitle?: string;
  problems: ProblemItem[];
  className?: string;
}

export default function ProblemSection({ 
  title = "Sound Familiar?", 
  subtitle,
  problems, 
  className = "" 
}: ProblemSectionProps) {
  return (
    <section className={`relative bg-gradient-to-b from-black via-red-950/5 to-black py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
            <AlertCircle className="w-4 h-4" />
            The Problem
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-lg text-white/60 font-light">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Problems grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-red-500/5 to-red-500/[0.02] border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-colors group"
            >
              {/* X icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <X className="w-4 h-4 text-red-400" />
              </div>

              {/* Problem text */}
              <p className="text-white/80 font-light leading-relaxed pr-10 mb-3">
                {problem.text}
              </p>

              {/* Impact */}
              {problem.impact && (
                <div className="text-sm text-red-400/80 font-medium">
                  → {problem.impact}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white/50 text-lg font-light mt-12 max-w-2xl mx-auto"
        >
          These problems don't fix themselves. But they can be automated.
        </motion.p>
      </div>
    </section>
  );
}
