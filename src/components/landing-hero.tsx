"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      {/* page-level ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06),transparent_60%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* hero surface */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 px-6 py-12 backdrop-blur sm:px-10 sm:py-16">
          {/* soft grid background masked to center */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          {/* corner accents */}
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06),transparent_60%)] blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06),transparent_60%)] blur-2xl" />

          {/* eyebrow chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-700">AI engineering studio</span>
            <span className="rounded-full border border-slate-200 bg-white/60 px-2.5 py-1 text-xs text-slate-600">Founder-led</span>
            <span className="rounded-full border border-slate-200 bg-white/60 px-2.5 py-1 text-xs text-slate-600">Remote-first</span>
          </div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-5 text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl lg:text-7xl"
          >
            We build thoughtful AI systems for real teams
          </motion.h1>

          {/* subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="mt-6 max-w-2xl text-lg text-slate-600"
          >
            We’re a small, hands-on studio. You’ll work directly with the engineers who design, build, and automate your workflows—cleanly, reliably, and with measurable impact.
          </motion.p>

          {/* links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Link href="#" className="group text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-slate-700">
              <span>Get started</span>
              <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="#" className="text-slate-600 hover:text-slate-900">
              How it works
            </Link>
          </motion.div>

          {/* minimal stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3"
          >
            {[ 
              { k: "> 10", v: "systems shipped" }, 
              { k: "24h", v: "response SLA" }, 
              { k: "EU/US", v: "friendly timezones" },
            ].map((s) => (
              <div key={s.k} className="space-y-1">
                <div className="text-base font-semibold text-slate-900">{s.k}</div>
                <div className="text-sm text-slate-600">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
