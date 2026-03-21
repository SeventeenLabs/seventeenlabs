import type { Metadata } from "next";
import Link from "next/link";
import RelayScrollytelling from "@/components/products/relay-scrollytelling";
import RelayModernShowcase from "@/components/products/relay-modern-showcase";

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
				eyebrow: "Product / Relay",
				title: "Delegate Real Work. Keep Human Control.",
			subtitle:
					"Relay is the SeventeenLabs AI operator for planning, approvals, and execution across your business stack. Teams move faster because every critical action stays reviewable and governed.",
				primaryCta: "Download Relay",
				secondaryCta: "See Use Cases",
				availability: "Built for operations, finance, and delivery teams that need execution speed without black-box risk",
			panelTitle: "Live Operating Model",
			panelStatus: "Human-governed",
				taskPromptLabel: "Task prompt",
				executionPlanLabel: "Execution plan",
				stepLabel: "Step",
				taskBoardPrompt: "Build a weekly operations briefing from Slack, Notion, CRM, and finance updates. Show me the plan first. Only execute after approval.",
				taskBoardPlan: [
					"Collect context from connected systems",
					"Draft briefing structure and priority list",
					"Request approval before publishing and notifying owners",
				],
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
				highlights: ["Context-aware planning", "Approval-driven execution", "Persistent decision memory"],
				demoActions: ["Create a briefing", "Crunch numbers", "Draft a plan", "Prep updates", "Review tasks", "Notify team"],
				demoPrompt: "Summarize this week across Slack, Notion, CRM, and finance updates. Build an action plan and wait for approval before sending.",
				demoFolderLabel: "Work in workspace",
				demoButton: "Run task",
				mediaLabel: "Product Preview",
				mediaHint: "Place image or video here",
				workflowTitle: "How Relay runs work",
				workflowSubtitle: "A clear operator loop inspired by modern coworking AI systems, adapted for governed business execution.",
				workflowSteps: [
					{
						title: "Share what needs to happen",
						description:
							"Describe the outcome, grant scoped access, and provide context from files, tools, and operating constraints.",
					},
					{
						title: "Relay plans and executes",
						description:
							"Relay breaks work into steps, tracks progress, and executes only where permissions and policy allow.",
					},
					{
						title: "You approve and steer",
						description:
							"For high-impact actions, teams review the plan, approve changes, and keep a full audit trail of what happened.",
					},
				],
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
					eyebrow: "Produkt / Relay",
					title: "Echte Arbeit delegieren. Menschliche Kontrolle behalten.",
			subtitle:
						"Relay ist der SeventeenLabs KI-Operator fur Planung, Freigaben und Ausfuhrung uber Ihren gesamten Stack. Teams werden schneller, weil kritische Aktionen kontrollierbar und nachvollziehbar bleiben.",
					primaryCta: "Relay herunterladen",
					secondaryCta: "Use Cases ansehen",
					availability: "Fur Operations-, Finance- und Delivery-Teams, die Geschwindigkeit ohne Black-Box-Risiko brauchen",
			panelTitle: "Live-Betriebsmodell",
			panelStatus: "Menschlich governet",
				taskPromptLabel: "Aufgaben-Prompt",
				executionPlanLabel: "Ausfuehrungsplan",
				stepLabel: "Schritt",
					taskBoardPrompt: "Erstelle ein woechentliches Operations-Briefing aus Slack, Notion, CRM und Finance-Updates. Zeig mir zuerst den Plan. Erst nach Freigabe ausfuehren.",
					taskBoardPlan: [
						"Kontext aus verbundenen Systemen sammeln",
						"Briefing-Struktur und Prioritaeten entwerfen",
						"Vor Veroeffentlichung und Benachrichtigung Freigabe einholen",
					],
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
					highlights: ["Kontextbasiert planen", "Freigabegetrieben ausfuehren", "Persistente Entscheidungs-Historie"],
					demoActions: ["Briefing erstellen", "Zahlen auswerten", "Plan entwerfen", "Updates vorbereiten", "Aufgaben pruefen", "Team informieren"],
					demoPrompt: "Fasse diese Woche aus Slack, Notion, CRM und Finance-Updates zusammen. Erstelle einen Aktionsplan und warte vor dem Senden auf Freigabe.",
					demoFolderLabel: "Im Workspace arbeiten",
					demoButton: "Aufgabe starten",
					mediaLabel: "Produktvorschau",
					mediaHint: "Platz fuer Bild oder Video",
					workflowTitle: "So laeuft Arbeit mit Relay",
					workflowSubtitle: "Ein klarer Operator-Loop, inspiriert von modernen Cowork-AI-Systemen und fuer governte Geschaeftsausfuehrung optimiert.",
					workflowSteps: [
						{
							title: "Ziel und Kontext teilen",
							description:
								"Beschreiben Sie das Ergebnis, geben Sie gezielten Zugriff frei und liefern Sie Kontext aus Dateien, Tools und Regeln.",
						},
						{
							title: "Relay plant und fuehrt aus",
							description:
								"Relay zerlegt Aufgaben in Schritte, verfolgt den Fortschritt und fuehrt nur aus, was Rechte und Richtlinien erlauben.",
						},
						{
							title: "Sie geben frei und steuern nach",
							description:
								"Bei kritischen Aktionen pruift Ihr Team den Plan, gibt gezielt frei und behaelt volle Nachvollziehbarkeit.",
						},
					],
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
	const pageContainer = "mx-auto w-full max-w-[94rem] px-2.5 sm:px-3 lg:px-4";
	const heroContainer = "mx-auto w-full max-w-[94rem] pl-2.5 pr-0 sm:pl-3 sm:pr-0 lg:pl-4 lg:pr-0";
	const eyebrowPrimary = isGerman ? "Produkt" : "Product";
	const journeyTitle = isGerman
		? "Von Intent zu governter Ausfuhrung"
		: "From Intent To Governed Execution";
	const journeySubtitle = isGerman
		? "Scrollen Sie durch den Operator-Flow. Rechts bleibt die Live-Ansicht fixiert und aktualisiert sich pro Schritt."
		: "Scroll through the operator flow. The live panel on the right stays fixed and updates for each step.";
	const journeyEyebrow = isGerman ? "Relay Operator Loop" : "Relay Operator Loop";
	const showcaseEyebrow = isGerman ? "Operator System" : "Operator System";
	const showcaseTitle = isGerman
		? "Ein modernes KI-Betriebssystem fur echte Teams"
		: "A modern AI operating system for real teams";
	const showcaseSubtitle = isGerman
		? "Relay verbindet Kontext, Daten, Funktion und Governance in einer klaren Steueroberflaeche statt in verstreuten Tools."
		: "Relay unifies context, data, function, and governance in one clear operating surface instead of scattered tools.";
	const showcasePillars = [
		{
			id: "context",
			label: isGerman ? "Kontext" : "Context",
			title: isGerman ? "Intent in klare Operator-Ziele" : "Intent into clear operator goals",
			description: isGerman
				? "Relay ubersetzt rohe Anfragen in strukturierte Ziele mit Rollen, Grenzen und Prioritaeten."
				: "Relay translates raw requests into structured goals with ownership, constraints, and priorities.",
			bullets: isGerman
				? [
					"Rollen und Verantwortlichkeiten automatisch zuordnen",
					"Abhangigkeiten fruh sichtbar machen",
					"Freigaben an Risikoklasse koppeln",
					"Priorisierung auf Outcome statt Aktivitat",
				]
				: [
					"Auto-map owners and responsibilities",
					"Expose dependencies early",
					"Tie approvals to risk class",
					"Prioritize by outcome, not activity",
				],
		},
		{
			id: "data",
			label: isGerman ? "Daten" : "Data",
			title: isGerman ? "Unternehmenswissen als aktive Memory-Layer" : "Company knowledge as an active memory layer",
			description: isGerman
				? "CRM, Finance, SOPs und Kommunikation werden in laufende Entscheidungen integriert statt nur abgefragt."
				: "CRM, finance, SOPs, and communications become part of every decision instead of separate lookups.",
			bullets: isGerman
				? [
					"Kontext aus mehreren Systemen zusammenfuhren",
					"Historische Entscheidungen wiederverwenden",
					"Datengrenzen pro Team einhalten",
					"Quellen fur Audits nachvollziehbar halten",
				]
				: [
					"Merge context from multiple systems",
					"Reuse historical decisions",
					"Enforce team-level data boundaries",
					"Keep traceable source lineage",
				],
		},
		{
			id: "function",
			label: isGerman ? "Funktion" : "Function",
			title: isGerman ? "Agenten, die echte Arbeit ausfuhren" : "Agents that execute real work",
			description: isGerman
				? "Von Plan bis Ausfuhrung wird jeder Schritt orchestriert, gemessen und auf Team-Workflows abgestimmt."
				: "From plan to execution, every step is orchestrated, measured, and adapted to how your team actually works.",
			bullets: isGerman
				? [
					"Task-Orchestrierung uber den gesamten Stack",
					"Status, Blocker und Eskalation in Echtzeit",
					"Wiederholbare Playbooks statt Ad-hoc-Chaos",
					"Rollbacks und Retries fur stabile Ausfuhrung",
				]
				: [
					"Task orchestration across your stack",
					"Real-time status, blockers, and escalation",
					"Repeatable playbooks over ad-hoc chaos",
					"Retries and rollbacks for stable delivery",
				],
		},
		{
			id: "governance",
			label: isGerman ? "Governance" : "Governance",
			title: isGerman ? "Kontrolle ohne Tempoverlust" : "Control without slowing teams down",
			description: isGerman
				? "Freigaben, Richtlinien und Audit-Trails sind eingebaut, damit Autonomie sicher wachsen kann."
				: "Approvals, policy checks, and audit logs are built in so autonomy can scale safely.",
			bullets: isGerman
				? [
					"Mensch-in-der-Schleife bei kritischen Aktionen",
					"Policy-Gates je Workflow und Risiko",
					"Volle Historie jeder Entscheidung",
					"Klare Verantwortlichkeit pro Schritt",
				]
				: [
					"Human-in-the-loop for critical actions",
					"Policy gates per workflow and risk tier",
					"Full history for every decision",
					"Clear accountability per step",
				],
		},
	] as const;
	const showcaseOutcomeTitle = isGerman ? "Operator Outcomes" : "Operator Outcomes";
	const showcaseOutcomes = [
		{ label: isGerman ? "Cycle Time" : "Cycle Time", value: isGerman ? "-37%" : "-37%" },
		{ label: isGerman ? "Freigabequote" : "Approval Rate", value: isGerman ? "94%" : "94%" },
		{ label: isGerman ? "Audit Readiness" : "Audit Readiness", value: isGerman ? "100%" : "100%" },
		{ label: isGerman ? "Operator Focus" : "Operator Focus", value: isGerman ? "+2.3x" : "+2.3x" },
	] as const;
	const journeySteps = [
		{
			id: "intake",
			title: t.workflowSteps[0].title,
			description: t.workflowSteps[0].description,
			icon: "message",
			mediaSrc: "/images/relay-step-01.svg",
			mediaAlt: isGerman ? "Relay Intake Ansicht" : "Relay intake view",
			visualLabel: isGerman ? "Anfrage" : "Intake",
			bullets: [t.useCases[0], t.useCases[1]],
		},
		{
			id: "planning",
			title: t.sections[0].title,
			description: t.sections[0].description,
			icon: "list",
			mediaSrc: "/images/relay-step-02.svg",
			mediaAlt: isGerman ? "Relay Planungsansicht" : "Relay planning view",
			visualLabel: isGerman ? "Plan" : "Plan",
			bullets: [t.futureNeeds[0], t.futureNeeds[1]],
		},
		{
			id: "automation",
			title: t.workflowSteps[1].title,
			description: t.workflowSteps[1].description,
			icon: "bot",
			mediaSrc: "/images/relay-step-03.svg",
			mediaAlt: isGerman ? "Relay Ausfuhrungsansicht" : "Relay execution view",
			visualLabel: isGerman ? "Ausfuehrung" : "Execution",
			bullets: [t.useCases[2], t.useCases[3]],
		},
		{
			id: "approval",
			title: t.sections[1].title,
			description: t.sections[1].description,
			icon: "check",
			mediaSrc: "/images/relay-step-04.svg",
			mediaAlt: isGerman ? "Relay Freigabeansicht" : "Relay approval view",
			visualLabel: isGerman ? "Freigabe" : "Approval",
			bullets: [t.governancePoints[0], t.governancePoints[1]],
		},
		{
			id: "governance",
			title: t.workflowSteps[2].title,
			description: t.workflowSteps[2].description,
			icon: "shield",
			mediaSrc: "/images/relay-step-05.svg",
			mediaAlt: isGerman ? "Relay Governance Ansicht" : "Relay governance view",
			visualLabel: isGerman ? "Governance" : "Governance",
			bullets: [t.governancePoints[1], t.governancePoints[2]],
		},
		{
			id: "delivery",
			title: t.sections[2].title,
			description: t.sections[2].description,
			icon: "play",
			mediaSrc: "/images/relay-step-06.svg",
			mediaAlt: isGerman ? "Relay Lieferansicht" : "Relay delivery view",
			visualLabel: isGerman ? "Lieferung" : "Delivery",
			bullets: [t.futureNeeds[2], t.futureNeeds[3]],
		},
	] as const;

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
				<section className="relative flex min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-white/10 lg:min-h-[calc(100svh-5rem)]">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(255,255,255,0.13),transparent_30%),radial-gradient(circle_at_90%_4%,rgba(163,230,53,0.14),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
					<div className={`${heroContainer} relative flex w-full min-h-[calc(100svh-4.5rem)] items-center py-8 sm:py-10 lg:min-h-[calc(100svh-5rem)] lg:py-12`}>
						<div className="grid gap-12 md:grid-cols-2 md:gap-14 lg:grid-cols-[0.86fr,1.14fr] lg:gap-20 lg:items-center">
							<div>
								<p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
									{eyebrowPrimary} <span className="text-lime-300">/</span> Relay
								</p>
								<h1 className="max-w-2xl text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-7xl">{t.title}</h1>
								<p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-[1.15rem]">{t.subtitle}</p>

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
							</div>

							<aside className="relative w-full overflow-hidden rounded-[2rem] border border-black/10 bg-[#f2f1ed] p-4 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.8)] sm:p-6 lg:ml-auto lg:justify-self-end lg:translate-x-2">
								<div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white">
									<div className="aspect-[16/9] w-full bg-[linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.02))]" />
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="rounded-xl border border-black/15 bg-white/85 px-4 py-3 text-center">
											<p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{t.mediaLabel}</p>
											<p className="mt-1 text-sm text-zinc-700">{t.mediaHint}</p>
										</div>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</section>

				<section className={`${pageContainer} py-16 lg:py-24`}>
					<RelayModernShowcase
						eyebrow={showcaseEyebrow}
						title={showcaseTitle}
						subtitle={showcaseSubtitle}
						pillars={showcasePillars}
						outcomeTitle={showcaseOutcomeTitle}
						outcomes={showcaseOutcomes}
					/>
				</section>

				<section className={`${pageContainer} py-16 lg:py-24`}>
					<RelayScrollytelling
						eyebrow={journeyEyebrow}
						title={journeyTitle}
						subtitle={journeySubtitle}
						steps={journeySteps}
					/>
				</section>

				<section className={`${pageContainer} border-t border-white/10 py-16 lg:py-20`}>
					<div className="mb-8 flex flex-col gap-3 sm:mb-10">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.suiteTitle}</h2>
						<p className="max-w-3xl text-sm text-white/70 sm:text-base">{t.suiteSubtitle}</p>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{t.suite.map((item) => (
							<article key={item.title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lime-300/35 hover:bg-white/[0.06]">
								<h3 className="text-lg font-medium text-white">{item.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
								<Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-lime-200 transition group-hover:text-lime-100">
									{item.cta}
								</Link>
							</article>
						))}
					</div>
				</section>

				<section className={`${pageContainer} py-16`}>
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

				<section className={`${pageContainer} grid gap-6 py-16 lg:grid-cols-2`}>
					<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.useCasesTitle}</h2>
						<ul className="mt-6 space-y-3">
							{t.useCases.map((item) => (
								<li key={item} className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
									<span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-lime-200/80" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-2xl border border-lime-300/25 bg-gradient-to-b from-lime-300/[0.08] to-white/[0.02] p-6 sm:p-7">
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
					<div className={`${pageContainer} flex flex-col gap-5 py-14 lg:flex-row lg:items-center lg:justify-between`}>
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
