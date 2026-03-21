import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

const solutionMap = {
  "founder-briefings": {
    en: {
      title: "Founder Briefings",
      description: "Daily executive briefings that merge priorities, risks, and operating signals across your stack.",
      points: [
        "Cross-tool summaries from Slack, CRM, and finance systems",
        "Priority detection and escalation suggestions",
        "Approval-aware actions for next steps",
      ],
    },
    de: {
      title: "Founder Briefings",
      description: "Tägliche Executive-Briefings, die Prioritäten, Risiken und Betriebssignale aus Ihrem Stack bündeln.",
      points: [
        "Cross-Tool-Zusammenfassungen aus Slack, CRM und Finance",
        "Prioritäten-Erkennung und Eskalationsvorschläge",
        "Freigabegeführte Aktionen für nächste Schritte",
      ],
    },
  },
  "governed-execution": {
    en: {
      title: "Governed Execution",
      description: "Move from ad hoc automation to reliable execution with role-based controls and human approvals.",
      points: [
        "Role-aware approval policies",
        "Traceable execution logs",
        "Constrained autonomy per workflow risk",
      ],
    },
    de: {
      title: "Governed Execution",
      description: "Wechseln Sie von ad hoc Automatisierung zu verlässlicher Ausführung mit rollenbasierten Kontrollen.",
      points: [
        "Rollenbasierte Freigabe-Policies",
        "Nachvollziehbare Ausführungs-Logs",
        "Begrenzte Autonomie je Workflow-Risiko",
      ],
    },
  },
  "decision-intelligence": {
    en: {
      title: "Decision Intelligence",
      description: "Capture decision history, learn patterns, and improve operational recommendations over time.",
      points: [
        "Decision memory from prior approvals",
        "Pattern recognition across recurring choices",
        "Higher quality recommendations with context",
      ],
    },
    de: {
      title: "Decision Intelligence",
      description: "Erfassen Sie Entscheidungshistorien, erkennen Sie Muster und verbessern Sie Empfehlungen im Tagesbetrieb.",
      points: [
        "Decision Memory aus vergangenen Freigaben",
        "Mustererkennung bei wiederkehrenden Entscheidungen",
        "Bessere Empfehlungen durch Kontext",
      ],
    },
  },
  agencies: {
    en: {
      title: "Solutions for Agencies",
      description: "Reduce founder dependence and improve execution consistency across client delivery operations.",
      points: [
        "Campaign and delivery workflow governance",
        "Standardized approval checkpoints",
        "Faster reporting and stakeholder updates",
      ],
    },
    de: {
      title: "Lösungen für Agencies",
      description: "Reduzieren Sie Founder-Abhängigkeit und erhöhen Sie die Ausführungskonsistenz in der Client Delivery.",
      points: [
        "Governance für Kampagnen- und Delivery-Workflows",
        "Standardisierte Freigabe-Checkpoints",
        "Schnelleres Reporting und Stakeholder-Updates",
      ],
    },
  },
  "education-companies": {
    en: {
      title: "Solutions for Education Companies",
      description: "Operationalize content, support, and program workflows with clear control and repeatability.",
      points: [
        "Program operations briefings",
        "Learner communication orchestration",
        "Quality and compliance checkpoints",
      ],
    },
    de: {
      title: "Lösungen für Education Companies",
      description: "Operationalisieren Sie Content-, Support- und Programm-Workflows mit klarer Steuerung.",
      points: [
        "Programm-Operations-Briefings",
        "Orchestrierung von Teilnehmer-Kommunikation",
        "Qualitäts- und Compliance-Checkpoints",
      ],
    },
  },
  "saas-teams": {
    en: {
      title: "Solutions for SaaS Teams",
      description: "Unify product, support, and GTM operations into one governed execution layer.",
      points: [
        "Cross-functional execution tracking",
        "Issue-to-action orchestration",
        "Continuous team briefing loops",
      ],
    },
    de: {
      title: "Lösungen für SaaS Teams",
      description: "Vereinheitlichen Sie Produkt-, Support- und GTM-Operationen in einer governen Ausführungsschicht.",
      points: [
        "Cross-funktionales Ausführungstracking",
        "Issue-to-Action-Orchestrierung",
        "Kontinuierliche Team-Briefing-Loops",
      ],
    },
  },
  "portfolio-operators": {
    en: {
      title: "Solutions for Portfolio Operators",
      description: "Create shared operating visibility and consistent execution standards across multiple businesses.",
      points: [
        "Portfolio-wide operating briefings",
        "Standardized KPI and risk checks",
        "Reusable execution playbooks",
      ],
    },
    de: {
      title: "Lösungen für Portfolio Operators",
      description: "Schaffen Sie gemeinsame Betriebssichtbarkeit und konsistente Standards über mehrere Unternehmen hinweg.",
      points: [
        "Portfolio-weite Operations-Briefings",
        "Standardisierte KPI- und Risiko-Checks",
        "Wiederverwendbare Execution-Playbooks",
      ],
    },
  },
  "financial-services": {
    en: {
      title: "Solutions for Financial Services",
      description: "Run faster with controlled execution and stronger governance in high-sensitivity workflows.",
      points: [
        "Approval chains for critical actions",
        "Audit-ready process traces",
        "Policy-aware execution boundaries",
      ],
    },
    de: {
      title: "Lösungen für Financial Services",
      description: "Arbeiten Sie schneller mit kontrollierter Ausführung und stärkerer Governance in sensitiven Workflows.",
      points: [
        "Freigabe-Ketten für kritische Aktionen",
        "Audit-fähige Prozessnachweise",
        "Policy-gesteuerte Ausführungsgrenzen",
      ],
    },
  },
  "healthcare-operations": {
    en: {
      title: "Solutions for Healthcare Operations",
      description: "Improve operational consistency and speed while keeping human oversight at critical moments.",
      points: [
        "Standardized operational runbooks",
        "Escalation-first governance patterns",
        "Role-based coordination workflows",
      ],
    },
    de: {
      title: "Lösungen für Healthcare Operations",
      description: "Verbessern Sie Konsistenz und Geschwindigkeit bei gleichzeitiger menschlicher Aufsicht in kritischen Momenten.",
      points: [
        "Standardisierte Operations-Runbooks",
        "Governance mit Eskalationsfokus",
        "Rollenbasierte Koordinations-Workflows",
      ],
    },
  },
} as const;

const slugs = Object.keys(solutionMap);

type SolutionSlug = keyof typeof solutionMap;

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isGerman = locale === "de";

  if (!(slug in solutionMap)) {
    return {};
  }

  const localized = solutionMap[slug as SolutionSlug][isGerman ? "de" : "en"];
  const pagePath = isGerman ? `/de/solutions/${slug}` : `/solutions/${slug}`;

  return {
    title: `${localized.title} | SeventeenLabs`,
    description: localized.description,
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/solutions/${slug}`,
        de: `${baseUrl}/de/solutions/${slug}`,
        "x-default": `${baseUrl}/solutions/${slug}`,
      },
    },
    openGraph: {
      title: `${localized.title} | SeventeenLabs`,
      description: localized.description,
      url: `${baseUrl}${pagePath}`,
      type: "website",
      siteName: "SeventeenLabs",
      locale: isGerman ? "de_DE" : "en_US",
    },
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const isGerman = locale === "de";

  if (!(slug in solutionMap)) {
    notFound();
  }

  const localized = solutionMap[slug as SolutionSlug][isGerman ? "de" : "en"];
  const solutionsHref = isGerman ? "/de/solutions" : "/solutions";

  return (
    <main className="bg-black pb-24 pt-36 text-white">
      <section className="mx-auto w-full max-w-[94rem] px-2.5 sm:px-3 lg:px-4">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">
          {isGerman ? "Lösung" : "Solution"}
        </p>
        <h1 className="max-w-4xl text-4xl font-light tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          {localized.title}
        </h1>
        <p className="mt-5 max-w-3xl text-white/70" style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}>
          {localized.description}
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {localized.points.map((point) => (
            <li key={point} className="rounded-xl border border-white/15 bg-white/[0.02] p-4 text-sm text-white/80">
              {point}
            </li>
          ))}
        </ul>

        <Link
          href={solutionsHref}
          className="mt-10 inline-flex items-center rounded-lg border border-white/25 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          {isGerman ? "Zurück zu Lösungen" : "Back to Solutions"}
        </Link>
      </section>
    </main>
  );
}
