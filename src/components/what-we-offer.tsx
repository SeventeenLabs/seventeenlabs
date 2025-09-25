import Link from "next/link";
import { AppWindow, Handshake, Workflow } from "lucide-react";

const offerings = [
  {
    title: "Automation Workflows",
    description: "Ready-to-use n8n workflows to speed up your marketing.",
    href: "https://n8nworkflows.seventeenlabs.io",
    external: true,
    icon: Workflow,
  },
  {
    title: "Apps & Tools",
    description: "Custom AI-powered SaaS products from SeventeenLabs.",
    href: "/apps",
    external: false,
    icon: AppWindow,
  },
  {
    title: "Agency Services",
    description: "Hands-on help implementing automation in your business.",
    href: "/agency",
    external: false,
    icon: Handshake,
  },
];

export default function WhatWeOffer() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            What We Offer
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Plug into AI experiences tailored for marketing teams and small businesses.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {offerings.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur transition-transform hover:-translate-y-1 hover:border-slate-300"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900">
                  Learn more
                  <span
                    aria-hidden
                    className="ml-1 text-slate-500 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
