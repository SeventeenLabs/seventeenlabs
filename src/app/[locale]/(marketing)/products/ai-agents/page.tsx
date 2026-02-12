import type { Metadata } from "next";
import AIAgentsHero from "@/components/products/ai-agents/ai-agents-hero";
import AIAgentsProblem from "@/components/products/ai-agents/ai-agents-problem";
import AIAgentsSolution from "@/components/products/ai-agents/ai-agents-solution";
import AIAgentsHowItWorks from "@/components/products/ai-agents/ai-agents-how-it-works";
import AIAgentsPricing from "@/components/products/ai-agents/ai-agents-pricing";
import AIAgentsTestimonials from "@/components/products/ai-agents/ai-agents-testimonials";
import AIAgentsFAQ from "@/components/products/ai-agents/ai-agents-faq";
import AIAgentsFooterCTA from "@/components/products/ai-agents/ai-agents-footer-cta";
import SiteFooter from "@/components/site-footer";
import AIAgentsPageClient from "./AIAgentsPageClient";
import { generateServicePageMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const isGerman = locale === "de";
  
  return {
    title: isGerman 
      ? "KI-Agenten für Agenturen | 3 AI Agenten vermieten" 
      : "AI Agents for Agencies | Rent AI Agents for Your Team",
    description: isGerman
      ? "Mieten Sie 3 KI-Agenten für Ihre Agentur. Research, Writing, Social Media – geliefert in 48 Stunden. Keine Einstellung, keine Schulung. Ab €1.500/Monat."
      : "Rent 3 AI agents for your agency. Research, writing, social media capacity delivered in 48 hours. No hiring, no training. From €1,500/month.",
    keywords: isGerman
      ? "KI-Agenten, Content-Erstellung, Automatisierung, Agentur-Tools, Freelancer Alternative"
      : "AI agents, content creation, automation, agency tools, freelancer alternative",
    openGraph: {
      title: isGerman
        ? "KI-Agenten für Agenturen – Rent AI Agents"
        : "AI Agents for Agencies – Rent AI Agents",
      description: isGerman
        ? "3 KI-Agenten (Research, Writing, Social Media) für €1.500-€5.500/Monat. Unbegrenzte Projekte, 24-48h Lieferung."
        : "3 AI agents (research, writing, social media) from €1,500-€5,500/month. Unlimited projects, 24-48h delivery.",
      url: isGerman
        ? `${baseUrl}/de/products/ai-agents`
        : `${baseUrl}/products/ai-agents`,
      type: "website",
    },
    canonical: isGerman
      ? `${baseUrl}/de/products/ai-agents`
      : `${baseUrl}/products/ai-agents`,
  };
}

export default async function AIAgentsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <AIAgentsPageClient locale={locale} />
      <SiteFooter />
    </>
  );
}
