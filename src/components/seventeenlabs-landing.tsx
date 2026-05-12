"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/utils";

type SeventeenLabsLandingProps = {
  locale?: Locale;
};

const outcomes = [
  {
    title: "Choose the right model for each workflow",
    text: "Use the providers and models that fit each task instead of being locked into a single vendor stack.",
  },
  {
    title: "Operate with governance from day one",
    text: "Add approvals, safety scopes, and auditability so AI execution stays controllable in real business operations.",
  },
  {
    title: "Deploy practical systems, not demos",
    text: "Turn AI into repeatable workflows tied to measurable outcomes across operations, delivery, and internal execution.",
  },
] as const;

const customerSegments = [
  {
    title: "Operations and delivery leaders",
    text: "Standardize high-friction workflows with AI while keeping clear ownership, approvals, and execution visibility.",
  },
  {
    title: "Service businesses and agencies",
    text: "Scale client delivery quality with governed AI workflows that reduce bottlenecks without sacrificing reliability.",
  },
  {
    title: "Product and engineering organizations",
    text: "Integrate AI into production processes with model flexibility and controls that match enterprise risk requirements.",
  },
  {
    title: "Founders modernizing operations",
    text: "Move from ad-hoc prompting to a structured operating layer that supports growth without vendor dependency.",
  },
] as const;

const deliveryModel = [
  "Map high-impact workflows where AI can create immediate operational leverage",
  "Design execution paths with model flexibility, clear controls, and owner accountability",
  "Launch governed AI systems into production with measurable performance targets",
  "Scale proven workflows across teams while preserving consistency and oversight",
] as const;

export default function SeventeenLabsLanding({ locale = "en" }: SeventeenLabsLandingProps) {
  const relayHref = getLocalizedPath(locale, "/products/relay");
  const heroAnim = {
    hidden: { opacity: 0, y: 26 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
  } as const;

  return (
    <main className="min-h-screen bg-[#010102] text-[#f7f8f8]">
      <section className="relative min-h-[74vh] overflow-hidden md:min-h-[80vh]">
        <div className="absolute inset-0">
          <Image
            src="/hero-lone-walker.png"
            alt=""
            fill
            priority
            className="object-cover object-[center_84%]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(1,1,2,0.72)_14%,rgba(1,1,2,0.52)_44%,rgba(1,1,2,0.66)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(94,106,210,0.2),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#010102]/55 to-[#010102]" />

        <div className="relative mx-auto flex min-h-[74vh] w-full max-w-[88rem] items-center px-5 md:min-h-[80vh] md:px-8">
          <div className="w-full">
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <motion.h1
                  initial="hidden"
                  animate="show"
                  custom={0.2}
                  variants={heroAnim}
                  className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[4.4rem]"
                >
                  AI systems for companies that need control and flexibility.
                </motion.h1>
              </div>

              <div className="md:pb-1 md:pl-2">
                <motion.p
                  initial="hidden"
                  animate="show"
                  custom={0.35}
                  variants={heroAnim}
                  className="max-w-xl text-base leading-7 text-[#d0d6e0] text-left"
                >
                  We help companies deploy AI in core operations with model freedom, governance controls, and production-ready workflows built for measurable results.
                </motion.p>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              custom={0.45}
              variants={heroAnim}
              className="mt-8"
            >
              <Link
                href={relayHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#5e6ad2] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#828fff]"
              >
                Try Relay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="-mt-14 border-b border-[#23252a] pt-14">
        <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-5 py-18 md:px-8 md:py-22 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#8a8f98]">Outcomes we deliver</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              Flexibility, control, and measurable execution.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {outcomes.map((item) => (
              <article key={item.title} className="rounded-lg border border-[#23252a] bg-[#0f1011] p-6">
                <h3 className="text-xl font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#d0d6e0]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#23252a]">
        <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-5 py-18 md:px-8 md:py-22 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#8a8f98]">Who benefits most</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              Built for businesses that want AI without lock-in.
            </h2>
          </div>
          <div className="space-y-3">
            {customerSegments.map((segment) => (
              <article key={segment.title} className="rounded-lg border border-[#23252a] bg-[#0f1011] p-5">
                <h3 className="text-xl font-medium tracking-[-0.02em]">{segment.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d0d6e0]">{segment.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#23252a]">
        <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-5 py-18 md:px-8 md:py-22 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#8a8f98]">How we create results</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              From first workflow to governed AI operating system.
            </h2>
          </div>

          <div className="rounded-xl border border-[#23252a] bg-[#0f1011] p-6">
            <div className="space-y-3">
              {deliveryModel.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#5e6ad2]" />
                  <p className="text-sm leading-6 text-[#d0d6e0]">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col items-start justify-between gap-8 rounded-xl border border-[#23252a] bg-[#0f1011] p-8 md:flex-row md:items-end md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#8a8f98]">Ready to improve outcomes?</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              Build AI systems your team can control, trust, and scale.
            </h2>
          </div>
          <Link
            href={relayHref}
            className="inline-flex flex-none items-center justify-center gap-2 rounded-md bg-[#5e6ad2] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#828fff]"
          >
            Try Relay
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
