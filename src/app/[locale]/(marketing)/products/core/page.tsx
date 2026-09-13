import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/products/core" : "/products/core";

  const title = isGerman
    ? "Core by SeventeenLabs | Plattform für governte KI-Operationen"
    : "Core by SeventeenLabs | Platform for Governed AI Operations";

  const description = isGerman
    ? "Core ist die Plattformschicht von SeventeenLabs für Kontext, Governance und agentische Orchestrierung in täglichen Geschäftsprozessen."
    : "Core is SeventeenLabs' platform layer for context, governance, and agent orchestration in daily business operations.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/products/core`,
        de: `${baseUrl}/de/products/core`,
        "x-default": `${baseUrl}/products/core`,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CoreProductPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const productsHref = isGerman ? "/de/products" : "/frame";

  const content = isGerman
    ? {
        eyebrow: "Plattformprodukt",
        title: "Core",
        subtitle:
          "Die Core-Plattform verbindet Unternehmenskontext, Governance und agentische Ausführung zu einem steuerbaren Betriebssystem für KI.",
        points: [
          "Kontextschicht über Teams, Datenquellen und Prozesse",
          "Governance mit Freigaben, Rollen und Audit-Historie",
          "Orchestrierung für agentische Workflows in Produktion",
        ],
        back: "Zur Produktübersicht",
      }
    : {
        eyebrow: "Platform Product",
        title: "Core",
        subtitle:
          "The Core platform unifies company context, governance, and agentic execution into a controllable operating layer for AI.",
        points: [
          "Context layer across teams, data, and workflows",
          "Governance with approvals, roles, and audit trails",
          "Orchestration for agentic workflows in production",
        ],
        back: "Back to Products",
      };

  return (
    <main className="bg-black pb-24 pt-36 text-white">
      <section className="px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">{content.eyebrow}</p>
          <h1 className="text-5xl font-light tracking-tight sm:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            {content.title}
          </h1>
          <p className="mt-6 max-w-3xl text-white/70" style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}>
            {content.subtitle}
          </p>

          <ul className="mt-10 space-y-3 text-sm text-white/80">
            {content.points.map((point) => (
              <li key={point} className="rounded-lg border border-white/15 bg-white/[0.02] px-4 py-3">
                {point}
              </li>
            ))}
          </ul>

          <Link
            href={productsHref}
            className="mt-10 inline-flex items-center rounded-lg border border-white/25 px-5 py-2 text-sm text-white transition-colors hover:bg-white/10"
          >
            {content.back}
          </Link>
        </div>
      </section>
    </main>
  );
}
