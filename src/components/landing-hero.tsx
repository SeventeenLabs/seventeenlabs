"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/utils";
import ColorBends from "./ColorBends";

export default function LandingHero() {
  const locale = useLocale();
  const isGerman = locale === "de";
  const relayHref = getLocalizedPath(locale, "/products/relay");
  const aboutHref = getLocalizedPath(locale, "/about");

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <div className="absolute w-full h-full opacity-40">
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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.09),transparent_32%),radial-gradient(circle_at_92%_8%,rgba(255,255,255,0.07),transparent_34%)]" />

      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto w-full max-w-[94rem] px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-20 lg:pt-36"
          >
            <div className="w-full">
              <div className="text-left">
                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="lg:col-span-8 max-w-4xl text-2xl font-semibold leading-[1.06] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {isGerman
                      ? (
                        <span className="flex flex-col gap-1 sm:gap-1.5">
                          <span className="block">Praktische KI-Systeme</span>
                          <span className="block">für Unternehmen, die KI</span>
                          <span className="block">in operative Abläufe integrieren</span>
                        </span>
                      ) : (
                        <span className="flex flex-col gap-1 sm:gap-1.5">
                          <span className="block">Practical AI systems</span>
                          <span className="block">for companies integrating AI</span>
                          <span className="block">into daily business operations</span>
                        </span>
                      )}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="lg:col-span-4 lg:self-end max-w-md text-base leading-relaxed text-white/82 sm:text-xl"
                    style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}
                  >
                    {isGerman
                      ? "KI wird die Arbeitsweise von Unternehmen grundlegend verändern. SeventeenLabs hilft Unternehmen, den Nutzen sicher zu realisieren und Risiken mit klarer Governance, menschlicher Freigabe und nachvollziehbarer Ausführung zu begrenzen."
                      : "AI will reshape how every business operates. SeventeenLabs helps companies capture the upside while reducing risk through clear governance, human approval, and accountable execution."}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mt-9 mb-4 flex flex-col items-stretch gap-3 sm:mb-6 sm:flex-row sm:items-center"
                >
                  <Link
                    href={aboutHref}
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 transition-all duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <span>{isGerman ? "Über SeventeenLabs" : "About SeventeenLabs"}</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <Link
                    href={relayHref}
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <span>{isGerman ? "Relay entdecken" : "Explore Relay"}</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
