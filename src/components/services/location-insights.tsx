"use client";

import { motion } from "framer-motion";
import { Target, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

interface LocationInsightsProps {
  location: {
    name: string;
    isMunich: boolean;
  };
  service: {
    type: "consulting" | "development" | "audit";
    color: "orange" | "emerald" | "blue";
  };
  isGerman: boolean;
}

export default function LocationInsights({ location, service, isGerman }: LocationInsightsProps) {
  const colorClasses = {
    orange: {
      badge: "border-orange-500/30 bg-orange-500/10",
      icon: "text-orange-400",
      hover: "hover:border-orange-500/50",
    },
    emerald: {
      badge: "border-emerald-500/30 bg-emerald-500/10",
      icon: "text-emerald-400",
      hover: "hover:border-emerald-500/50",
    },
    blue: {
      badge: "border-blue-500/30 bg-blue-500/10",
      icon: "text-blue-400",
      hover: "hover:border-blue-500/50",
    },
  };

  const colors = colorClasses[service.color];

  const content = isGerman ? {
    consulting: {
      munich: {
        title: "KI-Beratung für Münchner Unternehmen",
        intro: "München vereint Startup-Dynamik mit etablierten Unternehmen. Wir entwickeln KI-Strategien, die in diesem anspruchsvollen Markt funktionieren.",
        challenges: {
          title: "Herausforderungen in München",
          items: [
            { icon: Target, text: "Hohe Betriebskosten erfordern schnellen ROI" },
            { icon: Zap, text: "Intensiver Wettbewerb um Fachkräfte" },
            { icon: TrendingUp, text: "Komplexe IT-Landschaften bei etablierten Unternehmen" },
          ],
        },
        opportunities: {
          title: "Unser Ansatz",
          items: [
            "Quick-Win-Fokus: Projekte mit messbarem ROI",
            "DSGVO-konform: Datenschutz von Anfang an",
            "System-Integration: Anbindung an bestehende Tools",
            "Transparente Planung: Klare Kosten, Zeitrahmen und Ergebnisse",
          ],
        },
        results: {
          title: "Was Sie erwarten können",
          items: [
            { value: "5-10", label: "Use Cases identifiziert" },
            { value: "4-8 Wochen", label: "Strategie-Phase" },
            { value: "ROI", label: "Fokussiert" },
          ],
        },
      },
      bavaria: {
        title: "KI-Beratung für bayerische Unternehmen",
        intro: "Bayerische Unternehmen schätzen langfristige Partnerschaften und nachhaltige Lösungen. Wir entwickeln Strategien, die zu dieser Unternehmenskultur passen.",
        challenges: {
          title: "Regionale Besonderheiten",
          items: [
            { icon: Target, text: "Langfristige Strategie statt kurzfristiger Trends" },
            { icon: Zap, text: "Integration in gewachsene Strukturen" },
            { icon: TrendingUp, text: "Verteilte Standorte und Prozesse" },
          ],
        },
        opportunities: {
          title: "Unser regionaler Ansatz",
          items: [
            "Pragmatische Umsetzung: Messbare Ergebnisse statt Buzzwords",
            "Branchenverständnis: Industrie, Handel, Dienstleistungen",
            "Pilotprojekte: Beweisen vor Roll-out",
            "Lokale Betreuung: Persönlicher Kontakt, kurze Wege",
          ],
        },
        results: {
          title: "Projektergebnisse",
          items: [
            { value: "5-10", label: "Use Cases pro Projekt" },
            { value: "6-12 Wochen", label: "Bis zur Umsetzung" },
            { value: "Nachhaltig", label: "ROI-orientiert" },
          ],
        },
      },
    },
    development: {
      munich: {
        title: "AI-Entwicklung für Münchner Unternehmen",
        intro: "Wir entwickeln produktionsreife AI-Systeme mit hohen Qualitätsstandards. DSGVO-konform, skalierbar und wartbar.",
        challenges: {
          title: "Technische Anforderungen",
          items: [
            { icon: Target, text: "Integration in bestehende Enterprise-Systeme" },
            { icon: Zap, text: "DSGVO-Konformität und Datenschutz" },
            { icon: TrendingUp, text: "Skalierung von Prototyp zu Produktivsystem" },
          ],
        },
        opportunities: {
          title: "Unser Tech-Ansatz",
          items: [
            "Moderne Automation: n8n für robuste Workflows",
            "AI-Integration: OpenAI, Anthropic – DSGVO-konform",
            "Web-Entwicklung: Next.js, React, TypeScript",
            "Lokales Hosting: Deutsche Rechenzentren verfügbar",
          ],
        },
        results: {
          title: "Entwicklungsziele",
          items: [
            { value: "6-12 Wochen", label: "Entwicklungszeit" },
            { value: "99.9%", label: "Uptime-Ziel" },
            { value: "DSGVO", label: "Konform" },
          ],
        },
      },
      bavaria: {
        title: "AI-Entwicklung für bayerische Unternehmen",
        intro: "Robuste Lösungen für komplexe Anforderungen. Wir entwickeln Systeme, die in gewachsenen Strukturen funktionieren.",
        challenges: {
          title: "Industrie-Anforderungen",
          items: [
            { icon: Target, text: "Integration mit Legacy-Systemen" },
            { icon: Zap, text: "Hohe Verfügbarkeit im Produktivbetrieb" },
            { icon: TrendingUp, text: "Multi-Standort-Fähigkeit" },
          ],
        },
        opportunities: {
          title: "Unser Entwicklungsansatz",
          items: [
            "Staged Rollout: Pilotierung vor Ausrollung",
            "Flexible Architektur: Cloud oder On-Premise",
            "Wartbarkeit: Dokumentation und Support",
            "Langfristig: Updates und Weiterentwicklung",
          ],
        },
        results: {
          title: "Qualitätsziele",
          items: [
            { value: "8-16 Wochen", label: "Projekt-Laufzeit" },
            { value: "99.9%", label: "Verfügbarkeit" },
            { value: "Langfristig", label: "Supportiert" },
          ],
        },
      },
    },
    audit: {
      munich: {
        title: "AI-Audit für Münchner Unternehmen",
        intro: "In 1-2 Wochen analysieren wir Ihre Prozesse systematisch und identifizieren konkrete Automatisierungs-Potenziale mit ROI-Fokus.",
        challenges: {
          title: "Was wir analysieren",
          items: [
            { icon: Target, text: "Zeitintensive manuelle Prozesse" },
            { icon: Zap, text: "System-Brüche und Doppelerfassungen" },
            { icon: TrendingUp, text: "Ungenutzte Automatisierungs-Potenziale" },
          ],
        },
        opportunities: {
          title: "Audit-Deliverables",
          items: [
            "Priorisierte Use Cases: 15-30 konkrete Möglichkeiten",
            "ROI-Einschätzung: Aufwand vs. Nutzen für jedes Projekt",
            "Quick-Win-Liste: Was Sie sofort umsetzen können",
            "Tool-Empfehlungen: Konkrete Lösungsvorschläge",
          ],
        },
        results: {
          title: "Audit-Ergebnisse",
          items: [
            { value: "15-30", label: "Use Cases" },
            { value: "€50k-300k", label: "Potenzial p.a." },
            { value: "1-2 Wochen", label: "Dauer" },
          ],
        },
      },
      bavaria: {
        title: "Gründliches AI-Audit für Bayern",
        intro: "Detaillierte Analyse mit realistischen Business Cases. Wir liefern fundierte Entscheidungsgrundlagen für Ihre Automatisierungsstrategie.",
        challenges: {
          title: "Audit-Schwerpunkte",
          items: [
            { icon: Target, text: "Geschäftsprozesse und Workflows" },
            { icon: Zap, text: "Dokumenten-Management und Datenflüsse" },
            { icon: TrendingUp, text: "Vertriebs- und Service-Prozesse" },
          ],
        },
        opportunities: {
          title: "Umfassendes Audit-Paket",
          items: [
            "Detailanalyse: Prozess-Dokumentation und Bottlenecks",
            "ROI-Kalkulation: Konservative und optimistische Szenarien",
            "Roadmap: Gestaffelte Umsetzung über 12-18 Monate",
            "Priorisierung: Nach Impact, Aufwand und Risiko",
          ],
        },
        results: {
          title: "Audit-Outcomes",
          items: [
            { value: "20-30", label: "Dokumentierte Use Cases" },
            { value: "€80k-400k", label: "Geschätztes Potenzial" },
            { value: "2-3 Wochen", label: "Gründliche Analyse" },
          ],
        },
      },
    },
  } : {
    consulting: {
      munich: {
        title: "AI Consulting for Munich Businesses",
        intro: "Munich combines startup dynamics with established companies. We develop AI strategies that work in this demanding market.",
        challenges: {
          title: "Munich Challenges",
          items: [
            { icon: Target, text: "High operating costs require fast ROI" },
            { icon: Zap, text: "Intense competition for talent" },
            { icon: TrendingUp, text: "Complex IT landscapes at established companies" },
          ],
        },
        opportunities: {
          title: "Our Approach",
          items: [
            "Quick-win focus: Projects with measurable ROI",
            "GDPR-compliant: Data protection from the start",
            "System integration: Connection to existing tools",
            "Transparent planning: Clear costs, timelines, and results",
          ],
        },
        results: {
          title: "What to Expect",
          items: [
            { value: "5-10", label: "Use cases identified" },
            { value: "4-8 weeks", label: "Strategy phase" },
            { value: "ROI", label: "Focused" },
          ],
        },
      },
      bavaria: {
        title: "AI Consulting for Bavarian Businesses",
        intro: "Bavarian companies value long-term partnerships and sustainable solutions. We develop strategies that fit this business culture.",
        challenges: {
          title: "Regional Characteristics",
          items: [
            { icon: Target, text: "Long-term strategy over short-term trends" },
            { icon: Zap, text: "Integration into established structures" },
            { icon: TrendingUp, text: "Distributed locations and processes" },
          ],
        },
        opportunities: {
          title: "Our Regional Approach",
          items: [
            "Pragmatic implementation: Measurable results over buzzwords",
            "Industry understanding: Manufacturing, retail, services",
            "Pilot projects: Prove before rollout",
            "Local support: Personal contact, short distances",
          ],
        },
        results: {
          title: "Project Results",
          items: [
            { value: "5-10", label: "Use cases per project" },
            { value: "6-12 weeks", label: "To implementation" },
            { value: "Sustainable", label: "ROI-oriented" },
          ],
        },
      },
    },
    development: {
      munich: {
        title: "AI Development for Munich Businesses",
        intro: "We build production-ready AI systems with high quality standards. GDPR-compliant, scalable, and maintainable.",
        challenges: {
          title: "Technical Requirements",
          items: [
            { icon: Target, text: "Integration with existing enterprise systems" },
            { icon: Zap, text: "GDPR compliance and data protection" },
            { icon: TrendingUp, text: "Scaling from prototype to production" },
          ],
        },
        opportunities: {
          title: "Our Tech Approach",
          items: [
            "Modern automation: n8n for robust workflows",
            "AI integration: OpenAI, Anthropic – GDPR-compliant",
            "Web development: Next.js, React, TypeScript",
            "Local hosting: German data centers available",
          ],
        },
        results: {
          title: "Development Goals",
          items: [
            { value: "6-12 weeks", label: "Development time" },
            { value: "99.9%", label: "Uptime goal" },
            { value: "GDPR", label: "Compliant" },
          ],
        },
      },
      bavaria: {
        title: "AI Development for Bavarian Businesses",
        intro: "Robust solutions for complex requirements. We build systems that work in established structures.",
        challenges: {
          title: "Industrial Requirements",
          items: [
            { icon: Target, text: "Integration with legacy systems" },
            { icon: Zap, text: "High availability in production" },
            { icon: TrendingUp, text: "Multi-location capability" },
          ],
        },
        opportunities: {
          title: "Our Development Approach",
          items: [
            "Staged rollout: Pilot before deployment",
            "Flexible architecture: Cloud or on-premise",
            "Maintainability: Documentation and support",
            "Long-term: Updates and enhancements",
          ],
        },
        results: {
          title: "Quality Goals",
          items: [
            { value: "8-16 weeks", label: "Project duration" },
            { value: "99.9%", label: "Availability" },
            { value: "Long-term", label: "Supported" },
          ],
        },
      },
    },
    audit: {
      munich: {
        title: "AI Audit for Munich Businesses",
        intro: "In 1-2 weeks, we systematically analyze your processes and identify concrete automation potentials with ROI focus.",
        challenges: {
          title: "What We Analyze",
          items: [
            { icon: Target, text: "Time-intensive manual processes" },
            { icon: Zap, text: "System breaks and duplicate entries" },
            { icon: TrendingUp, text: "Unused automation potentials" },
          ],
        },
        opportunities: {
          title: "Audit Deliverables",
          items: [
            "Prioritized use cases: 15-30 concrete opportunities",
            "ROI assessment: Effort vs. benefit for each project",
            "Quick-win list: What you can implement immediately",
            "Tool recommendations: Specific solution proposals",
          ],
        },
        results: {
          title: "Audit Results",
          items: [
            { value: "15-30", label: "Use cases" },
            { value: "€50k-300k", label: "Potential p.a." },
            { value: "1-2 weeks", label: "Duration" },
          ],
        },
      },
      bavaria: {
        title: "Thorough AI Audit for Bavaria",
        intro: "Detailed analysis with realistic business cases. We provide solid decision-making foundations for your automation strategy.",
        challenges: {
          title: "Audit Focus",
          items: [
            { icon: Target, text: "Business processes and workflows" },
            { icon: Zap, text: "Document management and data flows" },
            { icon: TrendingUp, text: "Sales and service processes" },
          ],
        },
        opportunities: {
          title: "Comprehensive Audit Package",
          items: [
            "Detailed analysis: Process documentation and bottlenecks",
            "ROI calculation: Conservative and optimistic scenarios",
            "Roadmap: Staged implementation over 12-18 months",
            "Prioritization: By impact, effort, and risk",
          ],
        },
        results: {
          title: "Audit Outcomes",
          items: [
            { value: "20-30", label: "Documented use cases" },
            { value: "€80k-400k", label: "Estimated potential" },
            { value: "2-3 weeks", label: "Thorough analysis" },
          ],
        },
      },
    },
  };

  const serviceContent = content[service.type];
  const locationContent = location.isMunich ? serviceContent.munich : serviceContent.bavaria;

  return (
    <section className="relative bg-black/95 py-20 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Title & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {locationContent.title}
          </h2>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            {locationContent.intro}
          </p>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-light text-white mb-8">{locationContent.challenges.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {locationContent.challenges.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all ${colors.hover}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.badge} mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <p className="text-white/80 font-light text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-light text-white mb-8">{locationContent.opportunities.title}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {locationContent.opportunities.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all"
              >
                <CheckCircle2 className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                <p className="text-white/70 font-light text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light text-white mb-8">{locationContent.results.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {locationContent.results.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-4xl font-light text-white mb-2">{item.value}</div>
                <div className="text-sm text-white/60 font-light">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
