import type { Metadata } from "next";
import Link from "next/link";

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
	const content = {
		en: {
			eyebrow: "Flagship Product",
			title: "AI Operating Systems for Governed Business Execution",
			subtitle:
				"The SeventeenLabs AI operator for planning, approvals, and real execution. Built local-first with human governance at every critical step.",
			primaryCta: "Request a Relay Walkthrough",
			secondaryCta: "Read Operator Notes",
			availability: "For operations, finance, and delivery teams that need speed without risk",
			panelTitle: "Live Operating Model",
			panelStatus: "Human-governed",
			panelItems: [
				"Relay drafts executable plans from requests and context",
				"Approvals are enforced before high-impact actions",
				"Audit-ready logs capture every decision and action",
			],
			metrics: [
				{ label: "Critical action gating", value: "Required" },
				{ label: "Decision visibility", value: "Full trail" },
				{ label: "Deployment model", value: "Local-first" },
			],
			highlights: ["Plan with context", "Approve with control", "Execute with accountability"],
			suiteTitle: "Product suite",
			suiteSubtitle: "A focused operator stack for governed AI execution in production teams.",
			suite: [
				{
					title: "Relay",
					description: "AI operator software for governed planning, approvals, and execution.",
					href: "/products/relay",
					cta: "Current product",
				},
				{
					title: "Governance Patterns",
					description: "Implementation patterns for approvals, audit trails, and operational controls.",
					href: "/blog",
					cta: "Explore",
				},
				{
					title: "Insights",
					description: "Implementation notes, strategy articles, and product guidance for operating teams.",
					href: "/blog",
					cta: "Read",
				},
			],
			sectionsTitle: "How Relay works",
			sections: [
				{
					title: "Plan",
					description:
						"Relay turns goals into structured action plans with constraints, dependencies, and ownership before execution starts.",
				},
				{
					title: "Approve",
					description:
						"Approval checkpoints ensure people stay in control of risk, budget, and quality while preserving team velocity.",
				},
				{
					title: "Execute",
					description:
						"After approval, Relay executes workflows with status tracking, evidence capture, and clear accountability.",
				},
			],
			futureTitle: "Future of enterprise AI",
			futureSubtitle:
				"Teams are moving from isolated copilots to governed agent systems that can run real workflows with human oversight.",
			futureCards: [
				{
					title: "What companies want",
					description:
						"Faster decisions, less context switching, higher execution consistency, and automation that improves margin instead of adding risk.",
				},
				{
					title: "What companies need",
					description:
						"A clear context layer, unified operational data, policy-gated agent orchestration, and measurable KPI impact per workflow.",
				},
				{
					title: "How autonomy should scale",
					description:
						"Inform, recommend, confirm, then constrained autonomy. High-risk actions stay human-approved until trust is proven.",
				},
			],
			futureNeedsTitle: "Operating requirements for production AI",
			futureNeeds: [
				"Governance by default: approvals, ownership, traceable decision logs",
				"Enterprise memory: CRM, finance, comms, transcripts, SOPs, and policies",
				"Execution fabric: tool-connected agents with retries, rollback, and escalation",
				"Observability: quality, drift, latency, and business-outcome telemetry",
			],
			useCasesTitle: "Built for real business workflows",
			useCases: [
				"Campaign planning and launch operations",
				"Cross-functional reporting and stakeholder updates",
				"Client delivery runbooks with approval guardrails",
				"Internal SOP execution with compliance traces",
			],
			governanceTitle: "Governance by default",
			governanceDescription:
				"Relay is designed for organizations that want AI leverage without black-box execution. Every step can be reviewed, approved, and traced.",
			governancePoints: [
				"Human-in-the-loop controls on critical actions",
				"Role-aware approvals and decision ownership",
				"Persistent event logs for audits and retrospectives",
			],
			finalTitle: "Deploy Relay in your operating model",
			finalDescription:
				"See how Relay maps to your existing processes, control requirements, and team workflows.",
			finalPrimary: "Book a Demo",
			finalSecondary: "Contact Team",
		},
		de: {
			eyebrow: "Flaggschiffprodukt",
			title: "KI-Betriebssysteme fur governte Geschaftsausfuhrung",
			subtitle:
				"Der KI-Operator von SeventeenLabs fur Planung, Freigaben und echte Ausfuhrung. Lokal-first gebaut, mit menschlicher Governance an jedem kritischen Schritt.",
			primaryCta: "Relay Walkthrough anfragen",
			secondaryCta: "Operator-Notizen lesen",
			availability: "Fur Operations-, Finance- und Delivery-Teams mit hohem Kontrollanspruch",
			panelTitle: "Live-Betriebsmodell",
			panelStatus: "Menschlich governet",
			panelItems: [
				"Relay erstellt aus Anforderungen ausfuhrbare Plane",
				"Freigaben werden vor wirkungskritischen Aktionen erzwungen",
				"Auditfahige Logs erfassen jede Entscheidung und Aktion",
			],
			metrics: [
				{ label: "Kritische Aktionsfreigabe", value: "Verpflichtend" },
				{ label: "Entscheidungssichtbarkeit", value: "Volle Historie" },
				{ label: "Bereitstellungsmodell", value: "Lokal-first" },
			],
			highlights: ["Mit Kontext planen", "Mit Kontrolle freigeben", "Verantwortlich ausfuhren"],
			suiteTitle: "Produktsuite",
			suiteSubtitle: "Ein fokussierter Operator-Stack fur governte KI-Ausfuhrung in produktiven Teams.",
			suite: [
				{
					title: "Relay",
					description: "KI-Operator-Software fur governte Planung, Freigaben und Ausfuhrung.",
					href: "/de/products/relay",
					cta: "Aktuelles Produkt",
				},
				{
					title: "Governance Patterns",
					description: "Umsetzungsmuster fur Freigaben, Audit-Trails und operative Kontrolle.",
					href: "/de/blog",
					cta: "Entdecken",
				},
				{
					title: "Insights",
					description: "Umsetzungswissen, Strategieartikel und Produktleitfaden fur operative Teams.",
					href: "/de/blog",
					cta: "Lesen",
				},
			],
			sectionsTitle: "So funktioniert Relay",
			sections: [
				{
					title: "Planen",
					description:
						"Relay wandelt Ziele in strukturierte Aktionsplane mit Abhangigkeiten, Einschrankungen und Verantwortlichkeiten um.",
				},
				{
					title: "Freigeben",
					description:
						"Freigabe-Checkpoints halten Menschen bei Risiko, Budget und Qualitat in Kontrolle, ohne die Geschwindigkeit zu bremsen.",
				},
				{
					title: "Ausfuhren",
					description:
						"Nach Freigabe fuhrt Relay Workflows mit Status-Tracking, Evidenz-Erfassung und klarer Verantwortlichkeit aus.",
				},
			],
			futureTitle: "Zukunft von Enterprise-KI",
			futureSubtitle:
				"Teams bewegen sich von isolierten Copilots zu governter Agenten-Orchestrierung mit menschlicher Aufsicht.",
			futureCards: [
				{
					title: "Was Unternehmen wollen",
					description:
						"Schnellere Entscheidungen, weniger Kontextwechsel, konsistentere Ausfuhrung und Automation mit echtem Ergebnisbeitrag.",
				},
				{
					title: "Was Unternehmen brauchen",
					description:
						"Eine klare Kontextschicht, vereinheitlichte Betriebsdaten, policy-gesteuerte Agenten und messbare KPI-Wirkung pro Workflow.",
				},
				{
					title: "Wie Autonomie skaliert",
					description:
						"Informieren, empfehlen, bestaetigen, dann begrenzte Autonomie. Kritische Aktionen bleiben menschlich freigegeben.",
				},
			],
			futureNeedsTitle: "Betriebsanforderungen fur produktive KI",
			futureNeeds: [
				"Governance als Standard: Freigaben, Rollenverantwortung, nachvollziehbare Entscheidungslogs",
				"Enterprise Memory: CRM, Finance, Kommunikation, Transkripte, SOPs und Richtlinien",
				"Execution Layer: tool-verbundene Agenten mit Retry, Rollback und Eskalation",
				"Observability: Qualitat, Drift, Latenz und Wirkung auf Business-KPIs",
			],
			useCasesTitle: "Fur echte Business-Workflows gebaut",
			useCases: [
				"Kampagnenplanung und Launch-Operations",
				"Cross-funktionales Reporting und Stakeholder-Updates",
				"Client-Delivery-Runbooks mit Freigabe-Leitplanken",
				"Interne SOP-Ausfuhrung mit Compliance-Nachweisen",
			],
			governanceTitle: "Governance als Standard",
			governanceDescription:
				"Relay ist fur Organisationen gebaut, die KI-Hebel ohne Black-Box-Ausfuhrung wollen. Jeder Schritt kann gepruft, freigegeben und nachvollzogen werden.",
			governancePoints: [
				"Mensch-in-der-Schleife-Kontrollen fur kritische Aktionen",
				"Rollenbasierte Freigaben und klare Entscheidungsverantwortung",
				"Persistente Event-Logs fur Audits und Retrospektiven",
			],
			finalTitle: "Relay in Ihr Betriebsmodell integrieren",
			finalDescription:
				"Sehen Sie, wie Relay auf Ihre Prozesse, Kontrollanforderungen und Team-Workflows gemappt wird.",
			finalPrimary: "Demo buchen",
			finalSecondary: "Team kontaktieren",
		},
	} as const;
	const t = isGerman ? content.de : content.en;

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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
			/>
			<main className="min-h-screen bg-neutral-950 text-white">
				<section className="relative overflow-hidden border-b border-white/10">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.13),transparent_38%),radial-gradient(circle_at_88%_2%,rgba(255,255,255,0.08),transparent_34%)]" />
					<div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 lg:px-6 lg:py-24">
						<div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
							<div>
								<p className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
									{t.eyebrow}
								</p>
								<h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{t.title}</h1>
								<p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{t.subtitle}</p>

								<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
									<Link
										href="/hub"
										className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
									>
										{t.primaryCta}
									</Link>
									<Link
										href={isGerman ? "/de/blog" : "/blog"}
										className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
									>
										{t.secondaryCta}
									</Link>
								</div>

								<p className="mt-4 text-xs font-medium uppercase tracking-wide text-white/55">{t.availability}</p>

								<div className="mt-8 flex flex-wrap gap-2.5">
									{t.highlights.map((item) => (
										<span key={item} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-white/75">
											{item}
										</span>
									))}
								</div>
							</div>

							<aside className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)] sm:p-6">
								<div className="flex items-center justify-between border-b border-white/10 pb-4">
									<h2 className="text-sm font-semibold tracking-wide text-white/90">{t.panelTitle}</h2>
									<span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
										{t.panelStatus}
									</span>
								</div>

								<ul className="mt-5 space-y-3">
									{t.panelItems.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80">
											<span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
											<span>{item}</span>
										</li>
									))}
								</ul>

								<dl className="mt-6 grid gap-3 sm:grid-cols-3">
									{t.metrics.map((metric) => (
										<div key={metric.label} className="rounded-xl border border-white/10 bg-black/30 px-3 py-3">
											<dt className="text-[10px] uppercase tracking-wide text-white/55">{metric.label}</dt>
											<dd className="mt-1 text-sm font-semibold text-white">{metric.value}</dd>
										</div>
									))}
								</dl>
							</aside>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 lg:px-6">
					<div className="mb-8 flex flex-col gap-3 sm:mb-10">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.suiteTitle}</h2>
						<p className="max-w-3xl text-sm text-white/70 sm:text-base">{t.suiteSubtitle}</p>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{t.suite.map((item) => (
							<article key={item.title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.05]">
								<h3 className="text-lg font-medium text-white">{item.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
								<Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-white/90 transition group-hover:text-white">
									{item.cta}
								</Link>
							</article>
						))}
					</div>
				</section>

				<section className="mx-auto max-w-7xl border-y border-white/10 px-4 py-16 sm:px-5 lg:px-6">
					<h2 className="text-2xl font-semibold sm:text-3xl">{t.sectionsTitle}</h2>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						{t.sections.map((section) => (
							<article key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
								<h3 className="text-xl font-medium">{section.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/70">{section.description}</p>
							</article>
						))}
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 lg:px-6">
					<div className="mb-8 flex flex-col gap-3 sm:mb-10">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.futureTitle}</h2>
						<p className="max-w-3xl text-sm text-white/70 sm:text-base">{t.futureSubtitle}</p>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{t.futureCards.map((card) => (
							<article key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
								<h3 className="text-lg font-medium text-white">{card.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/70">{card.description}</p>
							</article>
						))}
					</div>

					<div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
						<h3 className="text-xl font-semibold sm:text-2xl">{t.futureNeedsTitle}</h3>
						<ul className="mt-5 grid gap-3 sm:grid-cols-2">
							{t.futureNeeds.map((item) => (
								<li key={item} className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
									<span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300/80" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-5 lg:grid-cols-[0.95fr,1.05fr] lg:px-6">
					<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.useCasesTitle}</h2>
						<ul className="mt-6 space-y-3">
							{t.useCases.map((item) => (
								<li key={item} className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
									<span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-white/70" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-6 sm:p-7">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.governanceTitle}</h2>
						<p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{t.governanceDescription}</p>
						<ul className="mt-6 space-y-3">
							{t.governancePoints.map((item) => (
								<li key={item} className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
									<span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300/80" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="border-t border-white/10 bg-white/[0.02]">
					<div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-14 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
						<div>
							<h2 className="text-2xl font-semibold sm:text-3xl">{t.finalTitle}</h2>
							<p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">{t.finalDescription}</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
								href="/hub"
								className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
							>
								{t.finalPrimary}
							</Link>
							<Link
								href={isGerman ? "/de/about" : "/about"}
								className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
							>
								{t.finalSecondary}
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
