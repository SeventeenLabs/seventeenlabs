"use client";

import HeroWorkflow from "@/components/hero-workflow";

export default function ProcessLanesBand() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm">
          <HeroWorkflow className="mx-auto aspect-[21/9] max-w-5xl" />
        </div>
      </div>
    </section>
  );
}
