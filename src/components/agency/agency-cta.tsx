"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

interface AgencyCTAProps {
  onContactClick: () => void;
}

export default function AgencyCTA({ onContactClick }: AgencyCTAProps) {
  const { t } = useTranslations();

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-950/30 via-slate-950 to-purple-950/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-8"
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">Let's Work Together</span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              {t("agency.cta.title")}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("agency.cta.description")}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={onContactClick}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 inline-flex items-center gap-3 text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
            >
              <span className="relative z-10">{t("agency.cta.button")}</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform relative z-10" />
              
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  background: [
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 50%, transparent 100%)",
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 50%, transparent 100%)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>No Commitment Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Quick Response</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
