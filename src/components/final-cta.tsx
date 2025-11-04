"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import ContactModal from "./contact-modal";

export default function FinalCta() {
  const { t } = useTranslations();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <section className="relative bg-black py-24 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("finalCta.title")}
          </h2>
          
          <p className="text-lg text-white/60 font-light leading-relaxed mb-12 max-w-2xl">
            {t("finalCta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setContactModalOpen(true)}
              className="group relative px-8 py-4 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {t("finalCta.primaryCta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="#what-we-do"
              className="group relative px-8 py-4 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
            >
              {t("finalCta.secondaryCta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </section>
  );
}
