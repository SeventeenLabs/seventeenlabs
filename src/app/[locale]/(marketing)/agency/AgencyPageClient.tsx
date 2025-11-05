"use client";

import { useState } from "react";
import { Code2, Workflow, Brain, Lightbulb, CheckCircle2, TrendingUp, Users, Clock, Target } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import ContactModal from "@/components/contact-modal";
import AgencyHero from "@/components/agency/agency-hero";
import AgencyServices from "@/components/agency/agency-services";
import AgencyProcess from "@/components/agency/agency-process";
import AgencyResults from "@/components/agency/agency-results";
import AgencyTeam from "@/components/agency/agency-team";
import AgencyCTA from "@/components/agency/agency-cta";

interface AgencyPageClientProps {
  locale: string;
}

export default function AgencyPageClient({ locale }: AgencyPageClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const services = [
    { key: "customDev", icon: Code2, color: "from-blue-500 to-cyan-500" },
    { key: "automation", icon: Workflow, color: "from-purple-500 to-pink-500" },
    { key: "aiIntegration", icon: Brain, color: "from-green-500 to-emerald-500" },
    { key: "consulting", icon: Lightbulb, color: "from-orange-500 to-red-500" }
  ];

  const processSteps = [
    { key: "discovery", icon: Target, number: "01" },
    { key: "planning", icon: Lightbulb, number: "02" },
    { key: "implementation", icon: Code2, number: "03" },
    { key: "support", icon: TrendingUp, number: "04" }
  ];

  const stats = [
    { key: "timeSaved", icon: Clock },
    { key: "projects", icon: CheckCircle2 },
    { key: "satisfaction", icon: Users },
    { key: "roi", icon: TrendingUp }
  ];

  return (
    <div className="bg-slate-950">
      <LandingHeader />

      <AgencyHero onContactClick={() => setContactModalOpen(true)} locale={locale} />
      <AgencyServices services={services} locale={locale} />
      <AgencyProcess steps={processSteps} />
      <AgencyResults stats={stats} />
      <AgencyTeam locale={locale} />
      <AgencyCTA onContactClick={() => setContactModalOpen(true)} />

      <SiteFooter />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}
