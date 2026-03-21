import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/solutions" : "/solutions";

  const title = isGerman
    ? "Lösungen | SeventeenLabs"
    : "Solutions | SeventeenLabs";

  const description = isGerman
    ? "SeventeenLabs Lösungen für founder-geführte Unternehmen: governte Ausführung, Decision Intelligence und branchenspezifische AI-Operations-Patterns."
    : "SeventeenLabs solutions for founder-led companies: governed execution, decision intelligence, and industry-specific AI operations patterns.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/solutions`,
        de: `${baseUrl}/de/solutions`,
        "x-default": `${baseUrl}/solutions`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${pagePath}`,
      type: "website",
      siteName: "SeventeenLabs",
      locale: isGerman ? "de_DE" : "en_US",
    },
  };
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";

  const cards = isGerman
    ? [
        {
          title: "Founder Briefings",
          description: "Tägliche, kontextreiche Briefings für Prioritäten, Risiken und nächste Entscheidungen.",
          href: "/de/solutions/founder-briefings",
        },
        {
          title: "Governed Execution",
          description: "Rollenbasierte Freigaben und steuerbare AI-Ausführung für kritische Workflows.",
          href: "/de/solutions/governed-execution",
        },
        {
          title: "Decision Intelligence",
          description: "Entscheidungsverläufe erfassen, Muster lernen und bessere Vorschläge im Tagesbetrieb liefern.",
          href: "/de/solutions/decision-intelligence",
        },
        {
          title: "Industries",
          description: "Sechs fokussierte Industry Plays für Agencies, Education, SaaS und mehr.",
          href: "/de/solutions/agencies",
        },
      ]
    : [
        {
          title: "Founder Briefings",
          description: "Daily context-rich briefings for priorities, risks, and next decisions.",
          href: "/solutions/founder-briefings",
        },
        {
          title: "Governed Execution",
          description: "Role-based approvals and controlled AI execution for critical workflows.",
          href: "/solutions/governed-execution",
        },
        {
          title: "Decision Intelligence",
          description: "Capture decision history, learn patterns, and improve recommendations over time.",
          href: "/solutions/decision-intelligence",
        },
        {
          title: "Industries",
          description: "Six focused industry plays for agencies, education, SaaS teams, and more.",
          href: "/solutions/agencies",
        },
      ];

  return (
    <main className="bg-black pb-24 pt-36 text-white">
      <section className="mx-auto w-full max-w-[94rem] px-2.5 sm:px-3 lg:px-4">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">
          {isGerman ? "Lösungen" : "Solutions"}
        </p>
        <h1 className="max-w-4xl text-4xl font-light tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          {isGerman ? "AI-Operations-Lösungen für reale Geschäftsprozesse" : "AI operations solutions for real business execution"}
        </h1>
        <p className="mt-5 max-w-3xl text-white/70" style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}>
          {isGerman
            ? "SeventeenLabs verbindet Kontext, Governance und Ausführung in Lösungen, die Teams täglich nutzen können."
            : "SeventeenLabs combines context, governance, and execution into solutions teams can use every day."}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-white/15 bg-white/[0.02] p-7">
              <h2 className="text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{card.description}</p>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                {isGerman ? "Öffnen" : "Open"}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
