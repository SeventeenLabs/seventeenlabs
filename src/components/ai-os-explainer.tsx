"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import { ArrowRight, CheckCircle2, Layers, Workflow, ShieldCheck, TrendingUp, Scale } from "lucide-react";

export default function AiOsExplainer() {
  const locale = useLocale();
  const isGerman = locale === "de";
  const [activePyramidLayer, setActivePyramidLayer] = useState<"functions" | "data" | "context">("context");

  const researchCards = isGerman
    ? [
        {
          title: "Nutzung steigt schnell",
          detail:
            "Laut Stanford AI Index 2025 berichten 78% der Unternehmen von AI-Nutzung (Vorjahr 55%).",
          sourceLabel: "Stanford AI Index 2025",
          sourceHref: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
        },
        {
          title: "Wert entsteht in Operations",
          detail:
            "PwC zeigt für AI-exponierte Branchen 3x höheres Wachstum beim Umsatz pro Mitarbeiter.",
          sourceLabel: "PwC AI Jobs Barometer 2025",
          sourceHref: "https://www.pwc.com/gx/en/issues/artificial-intelligence/ai-jobs-barometer.html",
        },
        {
          title: "Governance wird Pflicht",
          detail:
            "NIST AI RMF, EU AI Act und ISO/IEC 42001 verlangen nachvollziehbare, kontrollierte AI-Ausführung.",
          sourceLabel: "NIST / EU / ISO",
          sourceHref: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
      ]
    : [
        {
          title: "Adoption is accelerating",
          detail:
            "Stanford AI Index 2025 reports 78% of organizations using AI (up from 55% the year before).",
          sourceLabel: "Stanford AI Index 2025",
          sourceHref: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
        },
        {
          title: "Value is operational",
          detail:
            "PwC reports AI-exposed industries showing 3x higher growth in revenue per employee.",
          sourceLabel: "PwC AI Jobs Barometer 2025",
          sourceHref: "https://www.pwc.com/gx/en/issues/artificial-intelligence/ai-jobs-barometer.html",
        },
        {
          title: "Governance is non-optional",
          detail:
            "NIST AI RMF, the EU AI Act, and ISO/IEC 42001 all reinforce controlled, traceable AI execution.",
          sourceLabel: "NIST / EU / ISO",
          sourceHref: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
      ];

  const usagePatterns = isGerman
    ? [
        "Planung und Priorisierung mit AI-gestützten Handlungsvorschlägen",
        "Freigabe-Workflows für kritische Entscheidungen und Aktionen",
        "Ausführung wiederkehrender Prozesse mit klaren Leitplanken",
        "Live-Reporting für Geschwindigkeit, Qualität und Risiko",
      ]
    : [
        "Planning and prioritization with AI-supported action proposals",
        "Approval workflows for critical decisions and actions",
        "Execution of recurring operations with clear policy boundaries",
        "Live reporting on speed, quality, and risk",
      ];

  const pyramid = isGerman
    ? {
        title: "Das AI OS Fundament (Bottom -> Top)",
        contextTitle: "Context",
        contextText: "Ziele, Rollen, Regeln, Verantwortlichkeiten und Entscheidungslogik des Unternehmens.",
        dataTitle: "Data",
        dataText: "Operative Unternehmensdaten: CRM, Finance, Kommunikation, SOPs, Historie.",
        functionsTitle: "Functions",
        functionsText: "Agenten, Workflows und Automationen, die mit Governance echte Arbeit ausführen.",
      }
    : {
        title: "AI OS foundation (bottom -> top)",
      contextTitle: "Context",
        contextText: "Business goals, roles, rules, ownership, and decision logic.",
      dataTitle: "Data",
        dataText: "Operational enterprise data: CRM, finance, communications, SOPs, and history.",
      functionsTitle: "Functions",
        functionsText: "Agents, workflows, and automations that execute real work with governance.",
      };

  const pyramidDetails = {
    functions: { title: pyramid.functionsTitle, text: pyramid.functionsText },
    data: { title: pyramid.dataTitle, text: pyramid.dataText },
    context: { title: pyramid.contextTitle, text: pyramid.contextText },
  };

  return (
    <section className="relative border-t border-white/10 bg-black py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_85%_12%,rgba(255,255,255,0.04),transparent_35%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            <TrendingUp className="h-3.5 w-3.5" />
            {isGerman ? "Warum Unternehmen jetzt handeln" : "Why companies need this now"}
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            {isGerman
              ? "AI wird Teil des Betriebsmodells, nicht nur ein Tool"
              : "AI is becoming an operating model, not just a tool"}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/72 sm:text-lg" style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}>
            {isGerman
              ? "Die Frage ist nicht mehr ob AI genutzt wird, sondern wie Unternehmen AI sicher, messbar und teamfähig in den Alltag integrieren."
              : "The question is no longer whether AI will be used, but how to integrate it into daily operations safely, measurably, and across teams."}
          </p>
        </motion.div>

        <div className="mt-12 border-y border-white/10 py-7">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {researchCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="lg:border-l lg:border-white/10 lg:pl-6"
            >
              <h3 className="text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/68">{card.detail}</p>
              <a
                href={card.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs text-white/70 transition hover:text-white"
              >
                {card.sourceLabel}
                <ArrowRight className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pr-0 lg:pr-6"
          >
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              <Workflow className="h-3.5 w-3.5" />
              {isGerman ? "Wie AI im Unternehmen genutzt wird" : "How AI will be used in business"}
            </p>
            <ul className="mt-5 space-y-3">
              {usagePatterns.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300/85" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l border-white/20 pl-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                <Scale className="h-3.5 w-3.5" />
                {isGerman ? "Warum ein AI OS gebraucht wird" : "Why an AI OS is needed"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {isGerman
                  ? "Einzelne Copilots liefern punktuelle Hilfe. Ein AI OS verbindet Kontext, Daten und Ausführung mit Governance auf Prozessebene."
                  : "Standalone copilots provide isolated assistance. An AI OS connects context, data, and execution with governance at workflow level."}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="border-l border-white/10 pl-0 lg:pl-8"
          >
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              <Layers className="h-3.5 w-3.5" />
              {pyramid.title}
            </p>

            <div className="mt-5 p-0">
              <div className="mx-auto w-full max-w-2xl">
                <p className="mb-3 text-center text-[11px] uppercase tracking-wide text-white/55">
                  {isGerman ? "Hover auf einer Ebene zeigt die Erklärung" : "Hover a layer to reveal the explanation"}
                </p>
                <div className="mx-auto w-full max-w-xl">
                  <svg
                    viewBox="0 0 720 620"
                    role="img"
                    aria-label={pyramid.title}
                    className="h-auto w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseLeave={() => setActivePyramidLayer("context")}
                  >
                    <polygon
                      points="360,32 272,196 448,196"
                      fill={activePyramidLayer === "functions" ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.14)"}
                      stroke="rgba(255,255,255,0.38)"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setActivePyramidLayer("functions")}
                    />
                    <polygon
                      points="272,196 448,196 548,386 172,386"
                      fill={activePyramidLayer === "data" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}
                      stroke="rgba(255,255,255,0.34)"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setActivePyramidLayer("data")}
                    />
                    <polygon
                      points="172,386 548,386 646,570 74,570"
                      fill={activePyramidLayer === "context" ? "rgba(255,255,255,0.17)" : "rgba(255,255,255,0.08)"}
                      stroke="rgba(255,255,255,0.3)"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setActivePyramidLayer("context")}
                    />

                    <text x="360" y="136" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="var(--font-display)">
                      {pyramid.functionsTitle}
                    </text>
                    <text x="360" y="312" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="var(--font-display)">
                      {pyramid.dataTitle}
                    </text>
                    <text x="360" y="494" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="var(--font-display)">
                      {pyramid.contextTitle}
                    </text>
                  </svg>
                </div>

                <div className="mt-6 border-l border-white/20 pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60" style={{ fontFamily: "var(--font-display)" }}>
                    {pyramidDetails[activePyramidLayer].title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">{pyramidDetails[activePyramidLayer].text}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-l border-white/20 pl-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                <ShieldCheck className="h-3.5 w-3.5" />
                {isGerman ? "Relay + AI OS" : "Relay + AI OS"}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {isGerman
                  ? "Relay ist die Oberfläche für Teams. Das AI OS (business-optimiertes OpenClaw) liefert Orchestrierung, Richtlinien und kontrollierte Ausführung."
                  : "Relay is the team-facing experience. The AI OS (business-optimized OpenClaw) provides orchestration, policy enforcement, and controlled execution."}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href={getLocalizedPath(locale, "/products/relay")}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isGerman ? "Relay entdecken" : "Explore Relay"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={getLocalizedPath(locale, "/about")}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isGerman ? "Wie SeventeenLabs arbeitet" : "How SeventeenLabs works"}
          </Link>
        </div>

        <p className="mt-4 text-xs text-white/50">
          {isGerman
            ? "Quellen: Stanford AI Index 2025, PwC AI Jobs Barometer 2025, NIST AI RMF, EU AI Act, ISO/IEC 42001."
            : "Sources: Stanford AI Index 2025, PwC AI Jobs Barometer 2025, NIST AI RMF, EU AI Act, ISO/IEC 42001."}
        </p>
      </div>
    </section>
  );
}
