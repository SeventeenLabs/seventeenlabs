import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/products" : "/products";

  const title = isGerman
    ? "Produkte | SeventeenLabs"
    : "Products | SeventeenLabs";

  const description = isGerman
    ? "Entdecken Sie die SeventeenLabs Produkte: Relay und Core. Praktische KI-Systeme für kontrollierte tägliche Geschäftsprozesse."
    : "Explore SeventeenLabs products: Relay and Core. Practical AI systems for governed daily business operations.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/products`,
        de: `${baseUrl}/de/products`,
        "x-default": `${baseUrl}/products`,
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

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";

  const content = isGerman
    ? {
        eyebrow: "Produkte",
        title: "Produktportfolio von SeventeenLabs",
        subtitle:
          "AI-native Systeme für Unternehmen, die KI sicher in tägliche Abläufe integrieren.",
        relayTitle: "Relay",
        relayDescription:
          "KI-Operator für Planung, Freigaben und verantwortbare Ausführung in produktiven Teams.",
        relayCta: "Relay ansehen",
        coreTitle: "Core",
        coreDescription:
          "Die Plattformschicht für Kontext, Governance und agentische Orchestrierung über Geschäftsprozesse hinweg.",
        coreCta: "Core ansehen",
      }
    : {
        eyebrow: "Products",
        title: "SeventeenLabs Product Portfolio",
        subtitle:
          "AI-native systems for companies integrating AI into daily operations with governance and control.",
        relayTitle: "Relay",
        relayDescription:
          "AI operator for planning, approvals, and accountable execution in production teams.",
        relayCta: "View Relay",
        coreTitle: "Core",
        coreDescription:
          "Platform layer for context, governance, and agent orchestration across business operations.",
        coreCta: "View Core",
      };

  const relayHref = isGerman ? "/de/products/relay" : "/products/relay";
  const coreHref = isGerman ? "/de/products/core" : "/products/core";

  return (
    <main className="bg-black pb-24 pt-36 text-white">
      <section className="px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">{content.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-light tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl text-white/70" style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }}>
            {content.subtitle}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-7">
              <h2 className="text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>
                {content.relayTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{content.relayDescription}</p>
              <Link
                href={relayHref}
                className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                {content.relayCta}
              </Link>
            </article>

            <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-7">
              <h2 className="text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>
                {content.coreTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{content.coreDescription}</p>
              <Link
                href={coreHref}
                className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                {content.coreCta}
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
