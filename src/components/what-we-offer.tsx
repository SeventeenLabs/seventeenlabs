import Link from "next/link";
import { AppWindow, Handshake, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const offerings = [
  {
    title: "Automation Workflows",
    description: "Pre-built n8n workflows that connect your favorite tools. Save hours on repetitive tasks and focus on what matters most.",
    href: "https://n8nworkflows.seventeenlabs.io",
    external: true,
    icon: Workflow,
  },
  {
    title: "Apps & Tools",
    description: "AI-powered SaaS applications designed specifically for small businesses. From analytics to customer management.",
    href: "/apps",
    external: false,
    icon: AppWindow,
  },
  {
    title: "Agency Services",
    description: "Expert implementation and custom development. We handle the technical setup while you focus on growing your business.",
    href: "/agency",
    external: false,
    icon: Handshake,
  },
];

export default function WhatWeOffer() {
  return (
    <section className="px-6 py-24 bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Three powerful pillars that work together to transform your business operations and accelerate growth.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {offerings.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group relative block overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-500/10"
                >
                  <div className="inline-flex size-14 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-slate-300 shadow-lg">
                    <Icon className="size-7" aria-hidden />
                  </div>
                  
                  <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-white">
                    {item.title}
                  </h3>
                  
                  <p className="mt-4 text-base text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-slate-200 group-hover:text-white">
                    <span>Explore {item.title.toLowerCase()}</span>
                    <span
                      aria-hidden
                      className="ml-2 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
