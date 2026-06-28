import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RelayCodexUiMock } from "@/components/products/relay-codex-ui-mock";
import { RelayCardMock, RelaySectionMock } from "@/components/products/relay-section-mocks";

interface PageProps {
	params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale } = await params;
	const isGerman = locale === "de";
	const pagePath = isGerman ? "/de/products/relay" : "/products/relay";

	const title = isGerman
		? "Relay by SeventeenLabs | KI Operator fur Planung, Freigaben und Ausfuhrung"
		: "Relay by SeventeenLabs | AI Operator for Planning, Approvals, and Execution";

	const description = isGerman
		? "Relay ist das Flaggschiffprodukt von SeventeenLabs. Planen, freigeben und ausfuhren Sie echte Arbeit mit klarer Sichtbarkeit und menschlicher Kontrolle."
		: "Relay is the flagship product from SeventeenLabs. Plan, approve, and execute real work with clear visibility and human control.";

	return {
		title,
		description,
		keywords: isGerman
			? [
					"Relay by SeventeenLabs",
					"KI Operator Software",
					"lokal-first KI",
					"Freigabegetriebene KI Operationen",
					"AI Workflows mit Governance",
					"Menschliche Kontrolle bei KI",
				]
			: [
					"Relay by SeventeenLabs",
					"AI operator software",
					"local-first AI",
					"approval-driven AI operations",
					"governed AI workflows",
					"human-controlled AI execution",
				],
		alternates: {
			canonical: `${baseUrl}${pagePath}`,
			languages: {
				en: `${baseUrl}/products/relay`,
				de: `${baseUrl}/de/products/relay`,
				"x-default": `${baseUrl}/products/relay`,
			},
		},
		openGraph: {
			title,
			description,
			url: `${baseUrl}${pagePath}`,
			type: "website",
			siteName: "SeventeenLabs",
			locale: isGerman ? "de_DE" : "en_US",
			images: [
				{
					url: `${baseUrl}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: "Relay by SeventeenLabs",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [`${baseUrl}/opengraph-image`],
		},
	};
}

export default async function RelayPage({ params }: PageProps) {
	const { locale } = await params;
	const isGerman = locale === "de";
	const pageUrl = isGerman ? `${baseUrl}/de/products/relay` : `${baseUrl}/products/relay`;
	const pageContainer = "mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8";

	const t = isGerman
		? {
				eyebrow: "Relay",
				title: "Relay",
				subtitle: "Dein Workspace fur dein AI-Backend, um dein Unternehmen im AI-Zeitalter zu steuern.",
				primaryCta: "Fur Windows herunterladen",
				secondaryCta: "GitHub ansehen",
				sectionTitle: "Die beste Art, mit Agenten zu arbeiten",
				agentTitle: "Derselbe Agent, uberall wo du arbeitest",
				testimonialTitle: "Was Teams sagen",
				footerTitle: "Relay jetzt ausprobieren",
				features: [
					{
						title: "Entwickeln und Umsetzung beschleunigen",
						description: "Relay kombiniert Projektkontext, Planung und Ausfuhrung in einem Operator-Desk statt in mehreren getrennten Tools.",
						mock: 1 as const,
					},
					{
						title: "Fur Multi-Agenten-Workflows gebaut",
						description: "Von Research bis Umsetzung: Relay halt Kontext und Freigaben stabil, auch wenn mehrere Agents beteiligt sind.",
						mock: 2 as const,
					},
					{
						title: "Passt sich an dein Team an",
						description: "Safety Scopes, Rollen und Freigaben lassen sich an euer Risikoprofil und euren Workflow anpassen.",
						mock: 3 as const,
					},
					{
						title: "Fur Dauerbetrieb konzipiert",
						description: "Aktivitat, Dateien und Entscheidungen bleiben nachvollziehbar, damit langfristige AI-Workflows kontrollierbar bleiben.",
						mock: 4 as const,
					},
				],
				agentCards: ["In der Relay-App arbeiten", "In einen lokalen Kontext wechseln", "Im Terminal weitermachen"],
				testimonials: [
					"Relay gibt uns Governance ohne die Geschwindigkeit zu verlieren.",
					"Wir konnen endlich AI-Tasks mit klaren Freigabepunkten an Teams ubergeben.",
					"Projektgebundener Kontext hat unsere Fehlruns deutlich reduziert.",
					"Das Aktivitatsprotokoll spart uns jede Woche Review-Zeit.",
					"Model-Routing uber OpenClaw macht uns viel flexibler.",
					"Die Operator-Oberflache ist genau das, was uns in Chat-Tools gefehlt hat.",
				],
			}
		: {
				eyebrow: "Relay",
				title: "Relay",
				subtitle: "Your workspace for your AI backend to run your business in the age of AI.",
				primaryCta: "Download for Windows",
				secondaryCta: "View on GitHub",
				sectionTitle: "The best way to build with agents",
				agentTitle: "The same agent, wherever you work",
				testimonialTitle: "What teams are saying",
				footerTitle: "Try Relay now",
				features: [
					{
						title: "Move development work faster",
						description: "Relay combines project context, planning, and execution in one operator desk instead of fragmented tools.",
						mock: 1 as const,
					},
					{
						title: "Built for multi-agent workflows",
						description: "From research to execution, Relay keeps context and approval control stable across multiple agents.",
						mock: 2 as const,
					},
					{
						title: "Fits your team setup",
						description: "Safety scopes, role boundaries, and approvals adapt to your risk profile and operating model.",
						mock: 3 as const,
					},
					{
						title: "Designed for continuous operations",
						description: "Activity, files, and decisions remain reviewable so long-running AI workflows stay controlled.",
						mock: 4 as const,
					},
				],
				agentCards: ["Work in Relay app", "Switch into local context", "Continue in terminal"],
				testimonials: [
					"Relay gives us governance without slowing execution.",
					"We can finally hand off AI tasks with clear approval points.",
					"Project-bound context cut our failed runs significantly.",
					"The activity trail saves review time every week.",
					"OpenClaw model routing made our stack much more flexible.",
					"This operator surface is exactly what chat-only tools were missing.",
				],
			};

	const logos = ["Rakuten", "WHOOP", "Cisco", "Instacart", "Miro", "Linear"];

	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Relay by SeventeenLabs",
		description: isGerman
			? "Relay ist eine lokal-first KI-Operator-Software fur Planung, Freigaben und sichere Ausfuhrung echter Workflows."
			: "Relay is local-first AI operator software for planning, approvals, and safe execution of real workflows.",
		provider: {
			"@type": "Organization",
			name: "SeventeenLabs",
			url: baseUrl,
		},
		serviceType: isGerman ? "KI Operations Software" : "AI Operations Software",
		areaServed: "Worldwide",
		url: pageUrl,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
			<main className="min-h-screen bg-black text-white">
				<section className="relative overflow-hidden">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(167,197,255,0.36),transparent_40%),radial-gradient(circle_at_86%_14%,rgba(113,124,255,0.34),transparent_38%),radial-gradient(circle_at_50%_98%,rgba(24,86,255,0.35),transparent_54%)]" />
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black sm:h-40" />
					<div className={`${pageContainer} relative py-20 sm:py-24 lg:py-28`}>
						<div className="mx-auto mt-6 mb-10 max-w-4xl text-center sm:mt-8 sm:mb-12">
							<div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-2 shadow-[0_16px_40px_rgba(35,66,160,0.35)]">
								<Image src="/images/relay-logo.png" alt="Relay logo" width={60} height={60} className="h-14 w-14 rounded-2xl object-cover" priority />
							</div>
							<h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl" style={{ fontFamily: "var(--font-sans)" }}>
								{t.title}
							</h1>
							<p className="mx-auto mt-5 whitespace-nowrap text-sm font-light text-white/82 sm:text-base" style={{ fontFamily: "var(--font-sans)" }}>
								{t.subtitle}
							</p>
							<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
								<Link href="/hub" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
									{t.primaryCta}
								</Link>
								<Link href="https://github.com/SeventeenLabs/relay" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 bg-black/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
									{t.secondaryCta}
								</Link>
							</div>
						</div>

						<RelayCodexUiMock />

						<div className="mt-10 grid grid-cols-2 gap-5 border-t border-white/10 pt-8 text-center text-sm text-white/72 sm:grid-cols-3 lg:grid-cols-6">
							{logos.map((logo) => (
								<span key={logo} className="font-medium tracking-wide">{logo}</span>
							))}
						</div>
					</div>
				</section>

				<section className={`${pageContainer} py-16 sm:py-20`}>
					<h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-sans)" }}>
						{t.sectionTitle}
					</h2>
				</section>

				{t.features.map((feature, index) => {
					const reverse = index % 2 === 1;
					return (
						<section key={feature.title} className="pb-12 sm:pb-16">
							<div
								className={`${pageContainer} grid items-center gap-8 md:gap-10 ${
									reverse
										? "lg:[grid-template-columns:minmax(0,1fr)_900px]"
										: "lg:[grid-template-columns:900px_minmax(0,1fr)]"
								}`}
							>
								<RelaySectionMock variant={feature.mock} />
								<div className={`w-full text-left ${reverse ? "lg:order-first" : ""}`}>
									<h3 className="text-2xl font-semibold sm:text-3xl">{feature.title}</h3>
									<p className="mt-4 text-base leading-relaxed text-white/76">{feature.description}</p>
								</div>
							</div>
						</section>
					);
				})}

				<section className={`${pageContainer} py-14 sm:py-18`}>
					<h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-sans)" }}>
						{t.agentTitle}
					</h2>
					<div className="mt-8 grid gap-4 md:grid-cols-3">
						{t.agentCards.filter((_, index) => index !== 1).map((card, index) => (
							<div key={card}>
								<RelayCardMock variant={([2, 3, 5] as const)[index % 3]} />
								<p className="mt-3 text-sm text-white/84">{card}</p>
							</div>
						))}
					</div>
				</section>

				<section className={`${pageContainer} py-10 sm:py-14`}>
					<h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-sans)" }}>
						{t.testimonialTitle}
					</h2>
					<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{t.testimonials.map((quote) => (
							<blockquote key={quote} className="rounded-2xl border border-white/14 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/82">
								{quote}
							</blockquote>
						))}
					</div>
				</section>

				<section className="relative mt-10 overflow-hidden border-t border-white/10">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(167,197,255,0.3),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(113,124,255,0.3),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(24,86,255,0.28),transparent_58%)]" />
					<div className={`${pageContainer} relative py-20 text-center`}>
						<h2 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-sans)" }}>
							{t.footerTitle}
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-base text-white/80" style={{ fontFamily: "var(--font-sans)" }}>
							{t.subtitle}
						</p>
						<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
							<Link href="/hub" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
								{t.primaryCta}
							</Link>
							<Link href="https://github.com/SeventeenLabs/relay" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 bg-black/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
								{t.secondaryCta}
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
