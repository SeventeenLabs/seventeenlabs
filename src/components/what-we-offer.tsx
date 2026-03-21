"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function WhatWeOffer() {
  const locale = useLocale();
  const isGerman = locale === "de";

  const ownerQuestions = [
    {
      title: isGerman ? "Wo entsteht messbarer Nutzen?" : "Where is the measurable upside?",
      description: isGerman
        ? "In wiederkehrenden, entscheidungsnahen Prozessen: Planung, Freigaben, Übergaben, Reporting und Ausführung im Tagesbetrieb."
        : "In recurring, decision-heavy operations: planning, approvals, handoffs, reporting, and daily execution.",
      icon: Gauge,
    },
    {
      title: isGerman ? "Wie bleibt Risiko steuerbar?" : "How is risk kept under control?",
      description: isGerman
        ? "Mit klarer Governance: Rollen, Freigabestufen, Eskalationswege und nachvollziehbaren Entscheidungslogs."
        : "With clear governance: role ownership, approval thresholds, escalation paths, and traceable decision logs.",
      icon: ShieldCheck,
    },
    {
      title: isGerman ? "Wie aufwendig ist die Einführung?" : "How hard is implementation?",
      description: isGerman
        ? "Starten Sie fokussiert mit einem priorisierten Betriebsprozess, validieren Sie Wirkung und erweitern Sie danach kontrolliert."
        : "Start with one prioritized operating workflow, prove impact, then scale in controlled phases.",
      icon: CalendarCheck,
    },
  ];

  const valueBlocks = [
    {
      title: isGerman ? "Praktische Systeme statt KI-Demos" : "Practical systems, not AI demos",
      description: isGerman
        ? "SeventeenLabs baut Operator-Systeme für echte Verantwortung im Betrieb, nicht nur assistierende Features."
        : "SeventeenLabs builds operator systems for real operational accountability, not just assistive AI features.",
    },
    {
      title: isGerman ? "Menschliche Kontrolle bleibt zentral" : "Human control stays central",
      description: isGerman
        ? "KI kann vorbereiten und ausführen, aber kritische Schritte bleiben an menschliche Freigabe gebunden."
        : "AI can prepare and execute, but critical actions remain bound to explicit human approval.",
    },
    {
      title: isGerman ? "Verantwortbare Ausführung im Team" : "Accountable execution across teams",
      description: isGerman
        ? "Jede Entscheidung, Aktion und Übergabe bleibt sichtbar, damit Führungskräfte Steuerbarkeit behalten."
        : "Every decision, action, and handoff stays visible so leaders keep operational control.",
    },
  ];

  const rolloutSteps = [
    {
      title: isGerman ? "Betriebsprozess auswahlen" : "Select one operating workflow",
      description: isGerman
        ? "Wir priorisieren den Prozess mit dem größten Hebel auf Zeit, Qualität oder Marge."
        : "We prioritize the workflow with the highest impact on time, quality, or margin.",
    },
    {
      title: isGerman ? "Governance und Freigaben modellieren" : "Model governance and approvals",
      description: isGerman
        ? "Rollen, Freigabegrenzen und Eskalationen werden vor produktiver Ausführung klar definiert."
        : "Roles, approval boundaries, and escalation routes are defined before production execution.",
    },
    {
      title: isGerman ? "Wirkung messen und skalieren" : "Measure impact and scale",
      description: isGerman
        ? "Nach stabiler Ausführung wird auf weitere Prozesse erweitert, mit identischen Kontrollstandards."
        : "After stable execution, scale to additional workflows with the same control standards.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto w-full max-w-[94rem] px-2.5 py-28 sm:px-3 lg:px-4 lg:py-32">
        <div className="w-full space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              <Sparkles className="size-3.5" />
              {isGerman ? "Was Eigentumer wissen wollen" : "What owners need to know"}
            </p>
            <h2
              className="text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {isGerman ? "KI im Tagesbetrieb: Wirkung, Risiko, Kontrolle" : "AI in daily operations: upside, risk, control"}
            </h2>
            <p
              className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-white/68 sm:text-xl"
              style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
            >
              {isGerman
                ? "Wenn Sie KI ernsthaft integrieren wollen, brauchen Sie messbare Wirkung und klare Steuerbarkeit. Genau darauf ist SeventeenLabs ausgerichtet."
                : "If you are integrating AI seriously, you need measurable upside and clear operational control. That is exactly what SeventeenLabs is built for."}
            </p>
          </motion.div>

          <div className="grid gap-10 border-y border-white/10 py-8 md:grid-cols-3">
            {ownerQuestions.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <article className="h-full">
                    <div className="inline-flex items-center gap-2 text-white/85">
                      <Icon className="size-5" aria-hidden />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                        {isGerman ? "Kernfrage" : "Core question"}
                      </p>
                    </div>
                    <h3 className="mt-3 text-2xl font-light text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {item.title}
                    </h3>

                    <p
                      className="mt-4 flex-grow text-base font-light leading-relaxed text-white/70"
                      style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
                    >
                      {item.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-xs text-emerald-200/75">
                      <CheckCircle2 className="size-4" />
                      <span>{isGerman ? "Direkt beantwortet" : "Answered directly"}</span>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-8 border-b border-t border-white/10 py-8 lg:grid-cols-[1fr,1.2fr]"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                <Users className="size-3.5" />
                {isGerman ? "Entscheidungssicherheit" : "Decision confidence"}
              </p>
              <h3 className="mt-4 text-2xl font-medium text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                {isGerman
                  ? "Was Sie als Unternehmensleitung brauchen, ist kein weiterer Chatbot, sondern ein steuerbares Betriebssystem für KI-Ausführung."
                  : "What leadership needs is not another chatbot, but a controllable operating system for AI execution."}
              </h3>
            </div>

            <div className="space-y-0">
              {valueBlocks.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-start justify-between border-b border-white/10 py-4"
                >
                  <div>
                    <p
                      className="mt-1 text-sm text-white/85"
                      style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
                    >
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs text-white/60">{item.description}</p>
                  </div>
                  <BookOpen className="mt-1 size-4 text-white/50" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-b border-white/10 py-8"
          >
            <h3 className="text-2xl font-medium text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              {isGerman ? "Wie der Einstieg typischerweise aussieht" : "How rollout typically works"}
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {rolloutSteps.map((step, index) => (
                <article key={step.title} className="border-l border-white/20 pl-4">
                  <p className="text-[11px] uppercase tracking-wide text-white/50">{isGerman ? "Schritt" : "Step"} {index + 1}</p>
                  <h4 className="mt-2 text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/65">{step.description}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-medium text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                  {isGerman ? "Relay im eigenen Betrieb konkret bewerten" : "Evaluate Relay in your real operating model"}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base"
                  style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
                >
                  {isGerman
                    ? "Sie sehen, wie Governance, menschliche Freigabe und nachvollziehbare Ausführung in Ihre bestehenden Prozesse integriert werden."
                    : "See how governance, human approval, and accountable execution map into your existing workflows."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={getLocalizedPath(locale, "/products/relay")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isGerman ? "Relay entdecken" : "Explore Relay"}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={getLocalizedPath(locale, "/about")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isGerman ? "Ansatz verstehen" : "See how we work"}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
