"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Clock, CheckCircle2, ArrowRight, Zap, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import ContactModal from "./contact-modal";

export default function BetaPilotProgramModal() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
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

  useEffect(() => {
    // Don't show if already shown in this session
    if (hasShown) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 800; // Show after scrolling 800px down
      
      if (scrollY > triggerPoint && !hasShown) {
        console.log('🎯 Beta Modal Triggered! Scroll position:', scrollY);
        setIsOpen(true);
        setHasShown(true);
        
        // Track GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'modal_shown', {
            event_category: 'Engagement',
            event_label: 'Beta Pilot Program Modal - Scroll Trigger',
            scroll_position: scrollY,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Log that listener is attached
    console.log('📌 Beta Modal scroll listener attached');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('🔌 Beta Modal scroll listener removed');
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'modal_closed', {
        event_category: 'Engagement',
        event_label: 'Beta Pilot Program Modal - User Closed',
      });
    }
  };

  const handleCTA = () => {
    setContactModalOpen(true);
    
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'Beta Program',
        event_label: 'Beta Pilot Program Modal CTA',
        cta_location: 'scroll_modal',
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] overflow-y-auto z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-black to-blue-500/5 p-6 lg:p-12 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Animated glow effect */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium uppercase tracking-wider mb-6"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t.badge}
                  </motion.div>

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left side - Content */}
                    <div>
                      <h2 className="text-2xl lg:text-4xl font-light text-white mb-3 tracking-tight">
                        {t.title}
                      </h2>
                      <p className="text-base lg:text-lg text-orange-400/80 font-medium mb-4 lg:mb-6">
                        {t.subtitle}
                      </p>
                      
                      <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed mb-4 lg:mb-6">
                        {t.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 lg:space-y-3">
                        {t.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                            className="flex items-start gap-3 text-sm lg:text-base text-white/80"
                          >
                            <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
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
                          <span className="text-4xl lg:text-5xl font-light text-white">{t.price}</span>
                          <span className="text-lg lg:text-xl text-white/40 line-through">{t.originalPrice}</span>
                        </div>
                        <p className="text-emerald-400 text-sm font-medium mb-4 lg:mb-6">{t.discount}</p>
                        
                        {/* Urgency */}
                        <div className="flex items-center gap-2 text-orange-400 text-sm mb-4 lg:mb-6">
                          <Clock className="w-4 h-4" />
                          <span>{t.spotsLeft}</span>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={handleCTA}
                          className="group w-full px-6 py-3 lg:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                        >
                          <Zap className="w-4 h-4 lg:w-5 lg:h-5" />
                          <span className="text-sm lg:text-base">{t.cta}</span>
                          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <p className="text-white/40 text-xs text-center mt-3 lg:mt-4 font-light">
                          {t.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefillMessage="I'm interested in the Beta Pilot Program. I'd like to discuss my automation needs and see if I'm a good fit."
      />
    </>
  );
}
