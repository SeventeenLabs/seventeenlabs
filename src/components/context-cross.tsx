"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

export default function ContextCross() {
  const locale = useLocale();
  const isGerman = locale === "de";
  const topLabelLength = isGerman ? 320 : 260;

  const copy = isGerman
    ? {
        eyebrow: "Kontextmodell",
        title: "Kontext verbindet die vier Ebenen der Ausführung",
        subtitle:
          "Wir bauen Systeme, in denen persönlicher Fokus, Teamabläufe, Geschäftsziele und Strategie in einer gemeinsamen Kontextschicht zusammenlaufen.",
        center: "KONTEXT",
        top: "PERSÖNLICH",
        left: "TEAM",
        right: "BUSINESS",
        bottom: "STRATEGIE",
      }
    : {
        eyebrow: "Context Model",
        title: "Context connects the four execution layers",
        subtitle:
          "We design systems where personal focus, team workflows, business goals, and strategy converge in one shared context layer.",
        center: "CONTEXT",
        top: "PERSONAL",
        left: "TEAM",
        right: "BUSINESS",
        bottom: "STRATEGY",
      };

  return (
    <section className="relative border-t border-white/10 bg-black py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.05),transparent_36%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.04),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-[94rem] px-2.5 sm:px-3 lg:px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{copy.eyebrow}</p>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            {copy.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/72" style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}>
            {copy.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/12 bg-white/[0.02] p-4 sm:p-8"
        >
          <div className="mx-auto w-full max-w-[620px]">
            <svg
              viewBox="0 0 900 900"
              className="h-auto w-full"
              role="img"
              aria-label={copy.title}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <line x1="450" y1="150" x2="450" y2="320" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="170" y1="450" x2="320" y2="450" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="580" y1="450" x2="730" y2="450" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="450" y1="580" x2="450" y2="750" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />

              <rect
                x="320"
                y="330"
                width="260"
                height="240"
                rx="8"
                fill="rgba(0,0,0,0.7)"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2.5"
              />

              <text
                x="450"
                y="450"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.97)"
                fontSize="46"
                fontWeight="600"
                letterSpacing="2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.center}
              </text>

              <text
                x="450"
                y="95"
                textAnchor="middle"
                fill="rgba(255,255,255,0.92)"
                fontSize="36"
                fontWeight="600"
                letterSpacing="1.5"
                textLength={topLabelLength}
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.top}
              </text>

              <text
                x="70"
                y="462"
                textAnchor="start"
                fill="rgba(255,255,255,0.92)"
                fontSize="34"
                fontWeight="600"
                letterSpacing="1.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.left}
              </text>

              <text
                x="830"
                y="462"
                textAnchor="end"
                fill="rgba(255,255,255,0.92)"
                fontSize="34"
                fontWeight="600"
                letterSpacing="1.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.right}
              </text>

              <text
                x="450"
                y="840"
                textAnchor="middle"
                fill="rgba(255,255,255,0.92)"
                fontSize="36"
                fontWeight="600"
                letterSpacing="1.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.bottom}
              </text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
