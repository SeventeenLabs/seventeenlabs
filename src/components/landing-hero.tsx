"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import ColorBends from "./ColorBends";
import ContactModal from "./contact-modal";
import SuccessModal from "./success-modal";

type BlueprintTemplate = {
  title: string;
  description: string;
  steps: string[];
};

const SAMPLE_PROMPTS = [
  "turn my Zoom transcripts into client updates",
  "reconcile Shopify <-> QuickBooks every night",
  "summarize my inbox every morning in Slack",
  "generate weekly performance reports from GA4 data",
];

const BLUEPRINT_TEMPLATES: BlueprintTemplate[] = [
  {
    title: "Automation that replaces {idea}",
    description:
      "I route the raw inputs into an agentic workflow, let the LLM reason over context, then push the finished work where your team already lives.",
    steps: [
      "Listen to every source system for new signals",
      "Enrich the context and let the AI decide the next best action",
      "Send the output into Slack, Notion, CRM, or email with zero manual steps",
    ],
  },
  {
    title: "10-second build for {idea}",
    description:
      "This blueprint pairs retrieval, structured prompts, and deterministic actions so {idea} runs the same way every time without supervision.",
    steps: [
      "Ingest the data stream and store clean snapshots",
      "Use guardrailed prompts to interpret what needs to happen",
      "Trigger downstream updates, reports, or payments instantly",
    ],
  },
  {
    title: "Operator-grade agent for {idea}",
    description:
      "The build keeps humans in the loop only when needed while the AI owns the boring delivery for {idea} end to end.",
    steps: [
      "Watch for new tasks, tickets, or transcripts automatically",
      "Map the request to the right workflow using retrieval-augmented reasoning",
      "Close the loop with documentation, approvals, and alerts",
    ],
  },
];

const createBlueprint = (idea: string): BlueprintTemplate => {
  const sanitizedIdea = idea.trim();
  const template = BLUEPRINT_TEMPLATES[Math.floor(Math.random() * BLUEPRINT_TEMPLATES.length)];

  const injectIdea = (text: string) => text.replaceAll("{idea}", sanitizedIdea);

  return {
    title: injectIdea(template.title),
    description: injectIdea(template.description),
    steps: template.steps.map(injectIdea),
  };
};

function AnimatedPlaceholder() {
  const placeholders = [
    "Automate my customer support emails...",
    "Process invoices and update my CRM...",
    "Generate weekly sales reports automatically...",
    "Schedule social media posts from my content...",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentText = placeholders[currentIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < currentText.length) {
        // Typing forward
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        // Deleting backward
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === currentText.length) {
        // Finished typing, wait then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length === 0) {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
      }
    }, isDeleting ? 30 : 80); // Faster deletion than typing
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, placeholders]);
  
  return (
    <span className="text-sm">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 text-blue-500"
      >
        |
      </motion.span>
    </span>
  );
}

export default function LandingHero() {
  const { t } = useTranslations();
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState("");
  const [taskIdea, setTaskIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [submittedInput, setSubmittedInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeBlueprint, setActiveBlueprint] = useState<BlueprintTemplate | null>(null);
  const [activeIdea, setActiveIdea] = useState("");
  const generationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (generationTimeoutRef.current) {
        clearTimeout(generationTimeoutRef.current);
      }
    };
  }, []);

  const handlePrimaryCTA = (prefill?: string) => {
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'Homepage',
        event_label: 'Hero Primary CTA - Start Your Project',
        cta_location: 'hero_section',
        cta_position: 'top',
        cta_type: 'primary',
        page_path: window.location.pathname,
        page_location: window.location.href,
        user_language: locale,
        page_title: document.title,
        viewport_width: window.innerWidth,
        scroll_depth: 0,
      });
    }
    setPrefillMessage(prefill ?? (activeIdea ? `I want to automate "${activeIdea}".` : ""));
    setContactModalOpen(true);
  };

  const buildPreview = (ideaOverride?: string) => {
    if (isGenerating || isLoading) return;

    const rawIdea = ideaOverride ?? taskIdea;
    const normalizedIdea = rawIdea.trim().length > 0 ? rawIdea.trim() : SAMPLE_PROMPTS[0];

    if (ideaOverride) {
      setTaskIdea(ideaOverride);
    } else if (rawIdea !== normalizedIdea) {
      setTaskIdea(normalizedIdea);
    }

    setActiveIdea(normalizedIdea);
    setSubmittedInput(normalizedIdea);
    setIsLoading(true);
    setActiveBlueprint(null);

    // Show loading for 8-12 seconds as specified
    generationTimeoutRef.current = window.setTimeout(() => {
      setActiveBlueprint(createBlueprint(normalizedIdea));
      setIsLoading(false);
      setSuccessModalOpen(true);
      setTaskIdea(""); // Clear input after submission
    }, 8000 + Math.random() * 4000); // 8-12 seconds
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">

      {/* Prism Background */}
        <div className="absolute w-full h-full transparent opacity-80">
          <ColorBends
            colors={["#ff6b35ff", "#2c5aa0"]}
            rotation={10}
            speed={0.08}
            scale={1.5}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.6}
            noise={0.08}
          />
        </div>
    
      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          {/* Left-aligned content container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-12 sm:py-20"
          >
            <div className="max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="mb-6 sm:mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium uppercase tracking-wider">
                  {locale === 'de' ? 'KI-Automatisierung für B2B' : 'AI Automation for B2B'}
                </span>
              </motion.div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight"
                >
                  {locale === 'de' 
                    ? <>Gewinnen Sie 20+ Stunden pro Woche zurück.<br />Ohne zusätzliche Mitarbeiter.</>
                    : <>Win Back 20+ Hours a Week.<br />Without Hiring.</>}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-full sm:max-w-4xl mb-8 sm:mb-12"
              >
                {locale === 'de' 
                  ? <>Wir bauen KI-Workflows, die Ihre wiederkehrenden Aufgaben übernehmen – Lead-Qualifizierung, Reporting, Support-Tickets, Dateneingabe. Sie konzentrieren sich auf Wachstum. Die Systeme erledigen den Rest.</>
                  : <>We build AI workflows that handle your recurring tasks – lead qualification, reporting, support tickets, data entry. You focus on growth. The systems handle the rest.</>}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <a
                  href="https://cal.com/christian-lutz-pw2nn4/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 rounded-xl bg-white text-black font-medium text-base hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/>
                  </svg>
                  <span className="relative">{locale === 'de' ? 'Gratis Gespräch – 15 Min' : 'Free Chat – 15 Min'}</span>
                </a>
                
                <a
                  href="#results"
                  className="group relative px-8 py-4 rounded-xl border border-white/20 text-white font-medium text-base hover:border-white/40 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <span className="relative">{locale === 'de' ? 'Beispiele ansehen' : 'See Examples'}</span>
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </motion.div>

              {/* Quick trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/50"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>{locale === 'de' ? 'Kostenlose Erstberatung' : 'Free initial consultation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>{locale === 'de' ? 'Kein Risiko, keine Verpflichtung' : 'No risk, no commitment'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>{locale === 'de' ? 'Antwort innerhalb von 24h' : 'Response within 24h'}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>


      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-6">
              <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-xl text-white font-medium">Building your project...</p>
            <p className="text-white/70 mt-2">This takes 8-12 seconds</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        userInput={submittedInput}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => {
          setContactModalOpen(false);
          setPrefillMessage("");
        }}
        prefillMessage={prefillMessage}
      />
    </div>
  );
}
