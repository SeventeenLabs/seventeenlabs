"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

export default function DataHubMap() {
  const locale = useLocale();
  const isGerman = locale === "de";

  const copy = isGerman
    ? {
        eyebrow: "Datenebene",
        title: "Unternehmenswissen wird in einer Datenbasis verbunden",
        subtitle:
          "Core bündelt operative Signale aus Tools, Gesprächen und Entscheidungen in einer gemeinsamen, abfragbaren Kontextschicht.",
        centerTop: "DATA",
        centerBottom: "(VECTOR DB)",
        nodes: [
          { label: "CALL\nTRANSKRIPTE", x: 450, y: 100, tx: 450, ty: 58, anchor: "middle" as const },
          { label: "SALES\nDATA", x: 560, y: 165, tx: 675, ty: 102, anchor: "start" as const },
          { label: "FINANCE\nP&L", x: 610, y: 315, tx: 745, ty: 300, anchor: "start" as const },
          { label: "EMAIL", x: 585, y: 455, tx: 720, ty: 500, anchor: "start" as const },
          { label: "DECISIONS", x: 500, y: 540, tx: 585, ty: 620, anchor: "start" as const },
          { label: "SLACK", x: 450, y: 575, tx: 450, ty: 660, anchor: "middle" as const },
          { label: "COMMUNITY", x: 350, y: 540, tx: 225, ty: 620, anchor: "end" as const },
          { label: "SOP\nLIBRARY", x: 290, y: 335, tx: 145, ty: 315, anchor: "end" as const },
          { label: "TRAINING", x: 310, y: 180, tx: 175, ty: 140, anchor: "end" as const },
        ],
      }
    : {
        eyebrow: "Data Layer",
        title: "Company knowledge converges in one data layer",
        subtitle:
          "Core consolidates signals from tools, conversations, and decisions into one shared, queryable context foundation.",
        centerTop: "DATA",
        centerBottom: "(VECTOR DB)",
        nodes: [
          { label: "CALL\nTRANSCRIPTS", x: 450, y: 100, tx: 450, ty: 58, anchor: "middle" as const },
          { label: "SALES\nDATA", x: 560, y: 165, tx: 675, ty: 102, anchor: "start" as const },
          { label: "FINANCE\nP&L", x: 610, y: 315, tx: 745, ty: 300, anchor: "start" as const },
          { label: "EMAIL", x: 585, y: 455, tx: 720, ty: 500, anchor: "start" as const },
          { label: "DECISIONS", x: 500, y: 540, tx: 585, ty: 620, anchor: "start" as const },
          { label: "SLACK", x: 450, y: 575, tx: 450, ty: 660, anchor: "middle" as const },
          { label: "COMMUNITY", x: 350, y: 540, tx: 225, ty: 620, anchor: "end" as const },
          { label: "SOP\nLIBRARY", x: 290, y: 335, tx: 145, ty: 315, anchor: "end" as const },
          { label: "TRAINING", x: 310, y: 180, tx: 175, ty: 140, anchor: "end" as const },
        ],
      };

  return (
    <section className="relative border-t border-white/10 bg-black py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_85%_12%,rgba(255,255,255,0.04),transparent_35%)]" />

      <div className="relative mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{copy.eyebrow}</p>
          <h2 className="text-2xl font-medium tracking-tight text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
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
          className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/12 bg-white/[0.02] p-4 sm:p-8"
        >
          <div className="mx-auto w-full max-w-[700px]">
            <svg
              viewBox="0 0 900 740"
              className="h-auto w-full"
              role="img"
              aria-label={copy.title}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              {copy.nodes.map((node) => (
                <line
                  key={`line-${node.label}`}
                  x1={node.x}
                  y1={node.y}
                  x2={node.tx}
                  y2={node.ty + 8}
                  stroke="rgba(255,255,255,0.42)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ))}

              <path
                d="M300 220 L600 220 L625 260 L625 470 L600 520 L300 520 L275 470 L275 260 Z"
                fill="rgba(0,0,0,0.72)"
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <text
                x="450"
                y="352"
                textAnchor="middle"
                fill="rgba(255,255,255,0.97)"
                fontSize="70"
                fontWeight="600"
                letterSpacing="2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.centerTop}
              </text>
              <text
                x="450"
                y="413"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="36"
                fontWeight="500"
                letterSpacing="1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {copy.centerBottom}
              </text>

              {copy.nodes.map((node) => {
                const lines = node.label.split("\\n");
                return (
                  <text
                    key={node.label}
                    x={node.tx}
                    y={node.ty}
                    textAnchor={node.anchor}
                    fill="rgba(255,255,255,0.93)"
                    fontSize="34"
                    fontWeight="600"
                    letterSpacing="1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {lines.map((line, i) => (
                      <tspan key={`${node.label}-${line}-${i}`} x={node.tx} dy={i === 0 ? 0 : 38}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
