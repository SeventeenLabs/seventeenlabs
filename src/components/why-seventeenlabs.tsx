import { BrainCircuit, Clock3, Sparkles } from "lucide-react";

const bullets = [
  {
    title: "Save time with automation",
    description: "Automated workflows keep marketing initiatives running while your team focuses on strategy.",
    icon: Clock3,
  },
  {
    title: "Grow smarter with AI",
    description: "Purpose-built AI models help your business make better decisions and personalize outreach at scale.",
    icon: BrainCircuit,
  },
  {
    title: "Easy-to-use tools for small businesses",
    description: "Simple onboarding, clear pricing, and friendly support designed for growing teams.",
    icon: Sparkles,
  },
];

export default function WhySeventeenLabs() {
  return (
    <section className="bg-slate-900 px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Why SeventeenLabs</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Automation expertise without the agency overhead
            </h2>
            <p className="mt-4 text-base text-slate-300">
              We combine marketing experience with technical rigor so you can experiment faster, extract insights, and scale what works.
            </p>
          </div>
          <div className="space-y-6">
            {bullets.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
