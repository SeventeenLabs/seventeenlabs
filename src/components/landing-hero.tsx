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
    <div className="relative w-full min-h-screen overflow-hidden bg-black/70">

      {/* Prism Background */}
        <div className="absolute w-full h-full transparent">
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
            className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-20"
          >
            <div className="max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="mb-6 sm:mb-8"
              >
                <span className="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-relaxed">
                  YOUR AI GROWTH PARTNER FOR FAST-MOVING B2B COMPANIES
                </span>
              </motion.div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight"
                >
                  Transform Your Business with AI<br />Strategic Consulting & Development
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-full sm:max-w-4xl mb-8 sm:mb-12"
              >
                The future belongs to businesses that move beyond AI curiosity to become AI-native. 
                <br />
                We build the automations, systems, and strategic foundations that don't just improve your operations—they redefine how your teams create value and compete.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <button
                  onClick={() => handlePrimaryCTA("I'm interested in exploring how AI can transform my business operations and drive growth. Let's discuss a strategic implementation plan.")}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white text-black font-medium text-sm sm:text-base hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] shadow-lg w-full sm:w-auto"
                >
                  <span className="relative">Start Your AI Journey</span>
                </button>
                
                <button
                  onClick={() => handlePrimaryCTA("I'd like to learn more about your AI transformation methodology and see case studies of successful implementations.")}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/40 text-white font-medium text-sm sm:text-base hover:border-white/60 hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="relative">Explore Our Approach</span>
                </button>
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
