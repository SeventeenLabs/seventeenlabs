"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Clock, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import ContactModal from "./contact-modal";

export default function BetaPilotProgram() {
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const content = {
    en: {
      badge: "EXCLUSIVE OFFER",
      title: "Save 20+ Hours Every Week",
      subtitle: "Your First AI Workflow at 50% Off",
      price: "€990",
      originalPrice: "€1,980",
      discount: "50% off launch rate",
      description: "Stop losing hours to tasks that could run themselves. Get a fully working AI automation in weeks—not months. Includes discovery, one custom workflow, and ongoing support.",
      spotsLeft: "Only 5 spots left for January 2026",
      features: [
        "Find your biggest time-wasters (free audit)",
        "Get one automation live & running (n8n)",
        "30 days of tweaks & support included",
        "Early access to new solutions",
      ],
      cta: "Apply for Beta Program",
      note: "No commitment until we've discussed your specific needs",
    },
    de: {
      badge: "EXKLUSIVES ANGEBOT",
      title: "Sparen Sie 20+ Stunden pro Woche",
      subtitle: "Ihr erstes KI-Workflow mit 50% Rabatt",
      price: "€990",
      originalPrice: "€1.980",
      discount: "50% Rabatt zum Launch",
      description: "Hören Sie auf, Stunden mit Aufgaben zu verlieren, die von selbst laufen könnten. Bekommen Sie eine voll funktionsfähige KI-Automatisierung in Wochen—nicht Monaten. Inklusive Analyse, einem maßgeschneiderten Workflow und laufendem Support.",
      spotsLeft: "Nur noch 5 Plätze für Januar 2026",
      features: [
        "Finden Sie Ihre größten Zeitfresser (kostenlose Analyse)",
        "Eine Automatisierung live & laufend (n8n)",
        "30 Tage Anpassungen & Support inklusive",
        "Frühzugang zu neuen Lösungen",
      ],
      cta: "Für Beta-Programm bewerben",
      note: "Keine Verpflichtung, bis wir Ihre spezifischen Bedürfnisse besprochen haben",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
      
      <div className="relative w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-black to-blue-500/5 p-8 lg:p-12">
            {/* Animated glow effect */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium uppercase tracking-wider mb-6"
              >
                <Sparkles className="w-4 h-4" />
                {t.badge}
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-light text-white mb-3 tracking-tight">
                    {t.title}
                  </h2>
                  <p className="text-lg text-orange-400/80 font-medium mb-6">
                    {t.subtitle}
                  </p>
                  
                  <p className="text-white/60 font-light leading-relaxed mb-6">
                    {t.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {t.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-white/80"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="font-light">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Right side - Pricing card */}
                <div className="flex flex-col justify-center">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8">
                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-5xl font-light text-white">{t.price}</span>
                      <span className="text-xl text-white/40 line-through">{t.originalPrice}</span>
                    </div>
                    <p className="text-emerald-400 text-sm font-medium mb-6">{t.discount}</p>
                    
                    {/* Urgency */}
                    <div className="flex items-center gap-2 text-orange-400 text-sm mb-6">
                      <Clock className="w-4 h-4" />
                      <span>{t.spotsLeft}</span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => setContactModalOpen(true)}
                      className="group w-full px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                    >
                      <Zap className="w-5 h-5" />
                      {t.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-white/40 text-xs text-center mt-4 font-light">
                      {t.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefillMessage="I'm interested in the Beta Pilot Program. I'd like to discuss my automation needs and see if I'm a good fit."
      />
    </section>
  );
}
