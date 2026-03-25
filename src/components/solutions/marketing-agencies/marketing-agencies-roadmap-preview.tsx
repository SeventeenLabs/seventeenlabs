"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import RoadmapModal from "@/components/roadmap-modal";
import Image from "next/image";

interface MarketingAgenciesRoadmapPreviewProps {
  locale: string;
}

export default function MarketingAgenciesRoadmapPreview({ locale }: MarketingAgenciesRoadmapPreviewProps) {
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "Your Personalized Roadmap",
      title: "Get Your Free AI Automation Roadmap",
      description: "Tell us about your challenges and we'll send you a tailored roadmap showing where automation can save you the most time and cost — delivered instantly to your inbox.",
      cta: "Get My Free Roadmap"
    },
    de: {
      eyebrow: "Ihre personalisierte Roadmap",
      title: "Erhalten Sie Ihre kostenlose KI-Automatisierungs-Roadmap",
      description: "Erzählen Sie uns von Ihren Herausforderungen und wir senden Ihnen eine maßgeschneiderte Roadmap, die zeigt, wo Automatisierung Ihnen die meiste Zeit und Kosten sparen kann – sofort in Ihren Posteingang geliefert.",
      cta: "Meine kostenlose Roadmap erhalten"
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-black">
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-light text-white/60 tracking-wider uppercase">
                {t.eyebrow}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                {t.title}
              </h2>
              <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
                {t.description}
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setRoadmapModalOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all shadow-lg shadow-white/10"
                >
                  {t.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right: Roadmap Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 sm:p-6">
                {/* Placeholder for roadmap image - replace with your actual image */}
                <div className="relative aspect-[4/3] bg-zinc-900 rounded-lg overflow-hidden">
                  {/* Add your roadmap image here */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/40">
                    <div className="text-center">
                      <p className="text-sm font-light">Roadmap Preview</p>
                      <p className="text-xs mt-2">Replace with actual roadmap image</p>
                    </div>
                  </div>
                  {/* Uncomment and use when you have the image:
                  <Image
                    src="/path-to-your-roadmap-image.png"
                    alt="AI Automation Roadmap Preview"
                    fill
                    className="object-contain"
                  />
                  */}
                </div>
                
                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RoadmapModal
        isOpen={roadmapModalOpen}
        onClose={() => setRoadmapModalOpen(false)}
      />
    </>
  );
}
