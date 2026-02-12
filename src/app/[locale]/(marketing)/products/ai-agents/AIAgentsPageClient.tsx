"use client";

import { useState } from "react";
import LandingHeader from "@/components/landing-header";
import ContactModal from "@/components/contact-modal";
import AIAgentsHero from "@/components/products/ai-agents/ai-agents-hero";
import AIAgentsProblem from "@/components/products/ai-agents/ai-agents-problem";
import AIAgentsSolution from "@/components/products/ai-agents/ai-agents-solution";
import AIAgentsHowItWorks from "@/components/products/ai-agents/ai-agents-how-it-works";
import AIAgentsPricing from "@/components/products/ai-agents/ai-agents-pricing";
import AIAgentsTestimonials from "@/components/products/ai-agents/ai-agents-testimonials";
import AIAgentsFAQ from "@/components/products/ai-agents/ai-agents-faq";
import AIAgentsFooterCTA from "@/components/products/ai-agents/ai-agents-footer-cta";

interface AIAgentsPageClientProps {
  locale: string;
}

export default function AIAgentsPageClient({ locale }: AIAgentsPageClientProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactType, setContactType] = useState<"demo" | "trial" | "general">("demo");

  const handleCtaClick = (type: string) => {
    setContactType(type === "demo" ? "demo" : type === "trial" ? "trial" : "general");
    setShowContactModal(true);
  };

  const modalTitles: Record<string, { en: string; de: string }> = {
    demo: {
      en: "Book Your 15-Minute Demo",
      de: "Demo buchen (15 Minuten)"
    },
    trial: {
      en: "Start Your Free Trial",
      de: "Kostenlos testen"
    },
    general: {
      en: "Get Started with AI Agents",
      de: "Mit KI-Agenten beginnen"
    }
  };

  const isGerman = locale === "de";
  const currentTitle = modalTitles[contactType];

  return (
    <>
      <LandingHeader />
      <AIAgentsHero locale={locale} onCtaClick={handleCtaClick} />
      <AIAgentsProblem locale={locale} />
      <AIAgentsSolution locale={locale} />
      <AIAgentsHowItWorks locale={locale} />
      <AIAgentsPricing locale={locale} onCtaClick={handleCtaClick} />
      <AIAgentsTestimonials locale={locale} />
      <AIAgentsFAQ locale={locale} />
      <AIAgentsFooterCTA
        locale={locale}
        onBookDemo={() => handleCtaClick("demo")}
        onStartTrial={() => handleCtaClick("trial")}
      />

      {showContactModal && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title={isGerman ? currentTitle.de : currentTitle.en}
          context="AI Agents for Agencies"
          preSelectedService={
            isGerman
              ? contactType === "demo"
                ? "KI-Agenten Demo buchen"
                : "KI-Agenten kostenlos testen"
              : contactType === "demo"
                ? "Book AI Agents Demo"
                : "Start AI Agents Free Trial"
          }
        />
      )}
    </>
  );
}
