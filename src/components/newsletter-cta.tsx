"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";

import { Button } from "@/components/ui/button";

export default function NewsletterCta() {
  const { t } = useTranslations();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <section className="bg-slate-950 px-6 py-24 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-slate-700 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-t from-slate-700 to-transparent"></div>
      
      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-6">
            {t("newsletter.title")}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            {t("newsletter.subtitle")}
          </p>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-12 backdrop-blur"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("newsletter.cta.title")}
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              {t("newsletter.cta.description")}
            </p>
            
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-6 text-base group"
            >
              {t("newsletter.cta.button")}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
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
