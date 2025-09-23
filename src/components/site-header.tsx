"use client";

import * as React from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const compute = () => {
      const y = window.scrollY || 0;
      const doc = document.documentElement;
      const full = Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const p = full > 0 ? Math.min(1, Math.max(0, y / full)) : 0;
      setScrolled(y > 2);
      setProgress(p);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div
          className={
            `relative my-2 flex h-12 items-center justify-between rounded-xl border px-3 sm:px-4 backdrop-blur ` +
            (scrolled
              ? "border-slate-200/70 bg-white/85 shadow-sm ring-1 ring-slate-900/5"
              : "border-slate-200/60 bg-white/70")
          }
        >
          {/* micro scroll progress */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-slate-900/60 via-slate-700/40 to-slate-400/20"
            style={{ width: `${progress * 100}%` }}
          />

          {/* subtle personal glow near brand */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-3 top-1/2 -z-10 -translate-y-1/2 h-14 w-14 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06),transparent_60%)] blur-lg"
          />

          {/* Brand */}
          <a href="#" className="group flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-slate-900 to-slate-500 transition-transform duration-300 ease-out group-hover:scale-150" />
            <span className="text-sm font-semibold tracking-tight text-slate-900">SeventeenLabs</span>
          </a>

          {/* Minimal text-only links */}
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            <a href="#work" className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:underline">Work</a>
            <a href="#services" className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:underline">Services</a>
            <a href="#about" className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:underline">About</a>
            <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:underline">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
