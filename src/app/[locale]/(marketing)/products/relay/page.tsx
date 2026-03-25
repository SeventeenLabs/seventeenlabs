import type { Metadata } from "next";
import Link from "next/link";
import RelayScrollytelling from "@/components/products/relay-scrollytelling";

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
					"Relay gives operators a self-hosted, model-agnostic control plane to dispatch tasks, review outcomes, approve risky actions, and keep work grounded in project context.",
				primaryCta: "Download Relay",
				secondaryCta: "See Features",
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
				workflowSubtitle: "A governed operator loop that keeps humans in control while AI handles practical execution.",
				workflowSteps: [
					{
						title: "Define the outcome and context",
						description:
							"Start from a project with a clear folder boundary, objective, and connector access so execution stays grounded.",
					},
					{
						title: "Relay plans and prepares execution",
						description:
							"Relay builds a step-by-step plan, maps actions to risk scopes, and prepares the run with full visibility.",
					},
					{
						title: "Approve, run, and review artifacts",
						description:
							"High-risk actions wait for approval, then Relay executes and records outcomes, file changes, and decision traces.",
					},
				],
			suiteTitle: "Shipping now",
			suiteSubtitle: "Core Relay capabilities available today for governed operator workflows.",
			suite: [
				{
					title: "Desktop operator interface",
					description: "One desktop surface for Cowork, Files, Activity, Memory, Schedule, Safety, and Settings.",
					href: "#how-relay-works",
					cta: "See workflow",
				},
				{
					title: "Chat and cowork task execution",
					description: "Move from conversation to execution with task states, run feedback, and recents in one loop.",
					href: "#how-relay-works",
					cta: "Explore loop",
				},
				{
					title: "Project-based context",
					description: "Bind each cowork run to a named project and root folder to reduce context drift and file mistakes.",
					href: "#how-relay-works",
					cta: "View project model",
				},
				{
					title: "File operations and browsing",
					description: "Review project files and local files with preview, metadata, and direct file actions from the same desk.",
					href: "#governance-and-workspace",
					cta: "Inspect workspace",
				},
				{
					title: "Safety policy and approvals",
					description: "Use low, medium, high, and critical scopes with per-scope approval requirements for risky actions.",
					href: "#governance-and-workspace",
					cta: "Review controls",
				},
				{
					title: "Connector foundation",
					description: "Run policy-aware actions through connectors with File System active and Shell/Web Fetch available.",
					href: "#shipping-now",
					cta: "See connectors",
				},
				{
					title: "Schedule and memory visibility",
					description: "Track scheduled jobs and reusable memory context so operators reduce repeated prompting.",
					href: "#roadmap",
					cta: "See roadmap",
				},
				{
					title: "Endpoint routing",
					description: "Connect Relay to local, VPS, or custom OpenClaw endpoints without changing operator workflow.",
					href: "https://github.com/SeventeenLabs/relay",
					cta: "Star on GitHub",
					external: true,
				},
			],
			sectionsTitle: "Feature highlights",
			sections: [
				{
					title: "Project-bound execution",
					description:
						"Every run stays tied to a project and folder boundary so context remains stable across planning and execution.",
				},
				{
					title: "Approval-first risk control",
					description:
						"High-risk scopes require operator approval before sensitive actions proceed, preserving speed without losing oversight.",
				},
				{
					title: "Local-first file operations",
					description:
						"Inspect, create, and update artifacts where work happens so outputs stay visible and reviewable.",
				},
			],
			futureTitle: "In build and near-term roadmap",
			futureSubtitle:
				"These items are in active development and should be positioned as coming next, not as current core claims.",
			futureCards: [
				{
					title: "Dispatch mode and background queue",
					description:
						"Persisted result delivery for background task runs so operators can delegate and return with full context.",
				},
				{
					title: "Server-side persistent threads",
					description:
						"A stronger shared source of truth for session continuity and long-running operational workflows.",
				},
				{
					title: "Expanded connector ecosystem",
					description:
						"Slack, GitHub, Notion, Drive, and Calendar connectors to extend execution while preserving policy controls.",
				},
				{
					title: "Deeper governance and audit",
					description:
						"Richer audit tooling and stronger schedule authoring flows for teams with stricter operating requirements.",
				},
			],
			futureNeedsTitle: "Claim guardrails for product copy",
			futureNeeds: [
				"Use confidently: desktop operator desk for AI work",
				"Use confidently: self-hosted, local-first friendly, model-agnostic through OpenClaw",
				"Avoid unqualified claims: fully autonomous unattended operations",
				"Avoid unqualified claims: complete compliance certification out of the box",
			],
			useCasesTitle: "FAQ",
			useCases: [
				"Is Relay the AI model? No. Relay is the operator interface and control plane.",
				"Can Relay run self-hosted? Yes. Relay is designed for local-first and self-hosted operation models.",
				"Is Relay tied to one provider? No. Relay is model-agnostic through OpenClaw routing.",
				"How are risky actions handled? Safety scopes and approval requirements gate sensitive actions.",
			],
			governanceTitle: "Why teams switch to Relay",
			governanceDescription:
				"Relay is built for teams that need execution governance, data control, and model flexibility without giving up operator velocity.",
			governancePoints: [
				"We already use chat tools -> Relay governs execution, not just prompting",
				"We need strict approvals -> Relay supports scope-based approval controls",
				"We cannot lock into one model vendor -> Relay is model-agnostic via OpenClaw",
			],
			finalTitle: "Run your first governed task",
			finalDescription:
				"Start local-first with Relay, connect your endpoint, and execute AI work with approval controls from day one.",
			finalPrimary: "Download Relay",
			finalSecondary: "Star on GitHub",
		},
		de: {
					eyebrow: "Produkt / Relay",
					title: "Echte Arbeit delegieren. Menschliche Kontrolle behalten.",
			subtitle:
						"Relay ist eine self-hosted, modell-agnostische Operator-Oberflaeche, mit der Teams Aufgaben starten, Ergebnisse pruefen und riskante Aktionen gezielt freigeben.",
					primaryCta: "Relay herunterladen",
					secondaryCta: "Features ansehen",
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
					workflowSubtitle: "Ein governter Operator-Loop mit menschlicher Kontrolle bei kritischen Schritten.",
					workflowSteps: [
						{
							title: "Outcome und Kontext definieren",
							description:
								"Starten Sie im richtigen Projekt mit klarem Ordnerbezug, Ziel und Connector-Zugriff.",
						},
						{
							title: "Relay plant und bereitet aus",
							description:
								"Relay erstellt einen Schrittplan, ordnet Risiken zu und bereitet die Ausfuehrung transparent vor.",
						},
						{
							title: "Freigeben, ausfuehren, Ergebnisse pruefen",
							description:
								"Kritische Aktionen warten auf Freigabe. Danach dokumentiert Relay Entscheidungen und Artefakte nachvollziehbar.",
						},
					],
			suiteTitle: "Jetzt verfuegbar",
			suiteSubtitle: "Aktuelle Relay-Funktionen fuer governte Operator-Workflows.",
			suite: [
				{
					title: "Desktop Operator Interface",
					description: "Eine zentrale Oberflaeche fur Cowork, Files, Activity, Memory, Schedule, Safety und Settings.",
					href: "#how-relay-works",
					cta: "Workflow ansehen",
				},
				{
					title: "Chat und Cowork Ausfuehrung",
					description: "Von Unterhaltung zu Task-Ausfuehrung mit Status, Run-Feedback und Recents.",
					href: "#how-relay-works",
					cta: "Loop ansehen",
				},
				{
					title: "Projektbasierter Kontext",
					description: "Jeder Run bleibt an Projekt und Root-Ordner gebunden, damit Kontextdrift reduziert wird.",
					href: "#how-relay-works",
					cta: "Projektmodell ansehen",
				},
				{
					title: "Dateioperationen und Browsing",
					description: "Projekt- und lokale Dateien inklusive Vorschau, Metadaten und direkter Aktionen.",
					href: "#governance-and-workspace",
					cta: "Workspace pruefen",
				},
				{
					title: "Safety Policy und Freigaben",
					description: "Risikostufen low bis critical mit konfigurierter Freigabepflicht fur sensible Aktionen.",
					href: "#governance-and-workspace",
					cta: "Kontrollen ansehen",
				},
				{
					title: "Connector Foundation",
					description: "Policy-aware Connector-Aktionen mit aktivem File System und optionalem Shell/Web Fetch.",
					href: "#shipping-now",
					cta: "Connectoren ansehen",
				},
				{
					title: "Schedule und Memory Sichtbarkeit",
					description: "Geplante Jobs und wiederverwendbarer Kontext in einer Bedienoberflaeche.",
					href: "#roadmap",
					cta: "Roadmap ansehen",
				},
				{
					title: "Endpoint Routing",
					description: "Relay verbindet lokale, VPS- oder benutzerdefinierte OpenClaw-Endpunkte ohne Workflow-Bruch.",
					href: "https://github.com/SeventeenLabs/relay",
					cta: "GitHub Star",
					external: true,
				},
			],
			sectionsTitle: "Feature Highlights",
			sections: [
				{
					title: "Projektgebundene Ausfuehrung",
					description:
						"Jeder Run bleibt an Projekt- und Ordnergrenzen gebunden, damit der Kontext stabil bleibt.",
				},
				{
					title: "Freigabeorientierte Risikokontrolle",
					description:
						"Sensible Aktionen werden erst nach Operator-Freigabe ausgefuehrt.",
				},
				{
					title: "Local-first Dateioperationen",
					description:
						"Artefakte lassen sich dort einsehen und bearbeiten, wo die Arbeit entsteht.",
				},
			],
			futureTitle: "In Build und naechste Schritte",
			futureSubtitle:
				"Diese Punkte sind in aktiver Entwicklung und sollten als Roadmap kommuniziert werden.",
			futureCards: [
				{
					title: "Dispatch Mode und Background Queue",
					description:
						"Persistente Ergebniszustellung fuer asynchrone Task-Ausfuehrung.",
				},
				{
					title: "Serverseitige persistente Threads",
					description:
						"Staerkere Session-Kontinuitaet als zentrale Quelle fuer laufende Workflows.",
				},
				{
					title: "Erweiterte Connectoren",
					description:
						"Slack, GitHub, Notion, Drive und Calendar Connectoren in Arbeit.",
				},
				{
					title: "Tiefere Governance und Audit",
					description:
						"Ausbau von Audit-Werkzeugen und staerkeren Schedule-Flows.",
				},
			],
			futureNeedsTitle: "Claim Guardrails",
			futureNeeds: [
				"Sicher verwendbar: Desktop Operator Desk fuer AI Work",
				"Sicher verwendbar: self-hosted, local-first, modell-agnostisch ueber OpenClaw",
				"Vermeiden ohne Nachweis: vollautonomer unbeaufsichtigter Betrieb",
				"Vermeiden ohne Nachweis: vollstaendige Compliance-Zertifizierung out of the box",
			],
			useCasesTitle: "FAQ",
			useCases: [
				"Ist Relay das Modell? Nein. Relay ist Interface und Kontrolloberflaeche.",
				"Kann Relay self-hosted laufen? Ja, Relay ist local-first und self-hosted ausgelegt.",
				"Ist Relay an einen Modellanbieter gebunden? Nein, Routing laeuft modell-agnostisch ueber OpenClaw.",
				"Wie werden riskante Aktionen gesteuert? Ueber Safety Scopes und Freigabepflichten.",
			],
			governanceTitle: "Warum Teams zu Relay wechseln",
			governanceDescription:
				"Relay passt fuer Teams, die Ausfuehrungsgeschwindigkeit wollen, aber dabei Governance, Datensouveraenitaet und Modellfreiheit behalten muessen.",
			governancePoints: [
				"Wir nutzen bereits Chat-Tools -> Relay steuert Ausfuehrung statt nur Prompts",
				"Wir brauchen strikte Freigaben -> Relay bietet scope-basierte Freigabegrenzen",
				"Wir wollen keinen Vendor Lock-in -> Relay ist modell-agnostisch via OpenClaw",
			],
			finalTitle: "Starten Sie Ihren ersten governten Task",
			finalDescription:
				"Starten Sie local-first, verbinden Sie Ihren Endpoint und fuehren Sie AI Work mit Freigabekontrolle aus.",
			finalPrimary: "Relay herunterladen",
			finalSecondary: "GitHub Star",
		},
	} as const;
	const t = isGerman ? content.de : content.en;
	const pageContainer = "mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8";
	const heroContainer = "mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8";
	const eyebrowPrimary = isGerman ? "Produkt" : "Product";
	const journeyTitle = isGerman
		? "Von Intent zu governter Ausfuehrung"
		: "From Intent to Governed Execution";
	const journeySubtitle = isGerman
		? "Scrollen Sie durch den Operator-Flow. Rechts bleibt die Live-Ansicht fixiert und aktualisiert sich pro Schritt."
		: "Scroll through the operator flow. The live panel on the right stays fixed and updates for each step.";
	const journeyEyebrow = isGerman ? "Relay Operator Loop" : "Relay Operator Loop";
	const firstSection = isGerman
		? {
				eyebrow: "Operator Desk",
				title: "Ein governter Operator Desk statt Tool-Chaos",
				subtitle:
					"Relay reduziert Kontextwechsel und Entscheidungsstress, indem Planung, Freigaben und Ausfuehrung in einer Oberflaeche zusammenlaufen.",
				positioning: [
					"Self-hosted",
					"Modell-agnostisch",
					"Human-in-the-loop",
					"Projektgebunden",
					"Operator-first",
				],
				beforeTitle: "Vor Relay",
				beforeItems: [
					"Arbeit verteilt sich auf Tabs, Terminal und Einzelloesungen",
					"Ordner- und Projektkontext driftet zwischen Tasks",
					"Riskante Aktionen laufen ohne klare Freigabegrenzen",
					"Operatoren verlieren Sichtbarkeit ueber Aenderungen und Entscheidungen",
				],
				afterTitle: "Mit Relay",
				afterItems: [
					"Ein Desk fuer Dispatch, Review und Aufsicht",
					"Projektgebundene Ausfuehrung reduziert Kontextfehler",
					"Safety Scopes und Freigaben steuern sensible Aktionen",
					"Aktivitaet und Artefakte bleiben durchgehend nachvollziehbar",
				],
				fitLabel: "Best fit fuer",
				fitText:
					"Founder-Operatoren, Operations-Leads und SMB-Teams mit 1-3 produktiven Agenten.",
				notForLabel: "Nicht ideal fuer",
				notForText:
					"Teams, die vollautonome, unbeaufsichtigte Ausfuehrung ohne Freigaben suchen.",
				proof: "Gebaut fuer kontrollierte Ausfuehrung statt Demo-Automation.",
				primaryCta: "Funktionen ansehen",
				secondaryCta: "GitHub Star",
		  }
		: {
				eyebrow: "Operator Desk",
				title: "A governed operator desk instead of tool sprawl",
				subtitle:
					"Relay reduces context switching and decision overhead by unifying planning, approvals, and execution in one control surface.",
				positioning: [
					"Self-hosted",
					"Model-agnostic",
					"Human-in-the-loop",
					"Project-scoped",
					"Operator-first",
				],
				beforeTitle: "Before Relay",
				beforeItems: [
					"Execution is split across tabs, terminals, and disconnected tools",
					"Folder and project context drifts between tasks",
					"Risky actions happen without clear approval boundaries",
					"Operators lose visibility into what changed and why",
				],
				afterTitle: "With Relay",
				afterItems: [
					"One desk for dispatch, review, and oversight",
					"Project-bound execution reduces context mistakes",
					"Safety scopes and approvals gate sensitive actions",
					"Activity and artifacts remain traceable by default",
				],
				fitLabel: "Best fit for",
				fitText:
					"Founder-operators, ops leads, and SMB teams running 1-3 practical agents.",
				notForLabel: "Not ideal for",
				notForText:
					"Teams looking for fully autonomous, unattended execution with no approval layer.",
				proof: "Built for governed execution, not demo automation.",
				primaryCta: "See shipping features",
				secondaryCta: "Star on GitHub",
		  };
	const journeySteps = [
		{
			id: "intake",
			title: t.workflowSteps[0].title,
			description: t.workflowSteps[0].description,
			icon: "message",
			mediaSrc: "/abstract-svg/relay-abstract-04-context-grounding.svg",
			mediaAlt: isGerman ? "Relay Intake Ansicht" : "Relay intake view",
			visualLabel: isGerman ? "Anfrage" : "Intake",
			bullets: [t.useCases[0], t.useCases[1]],
		},
		{
			id: "planning",
			title: t.sections[0].title,
			description: t.sections[0].description,
			icon: "list",
			mediaSrc: "/abstract-svg/relay-abstract-03-signal-grid.svg",
			mediaAlt: isGerman ? "Relay Planungsansicht" : "Relay planning view",
			visualLabel: isGerman ? "Plan" : "Plan",
			bullets: [t.futureNeeds[0], t.futureNeeds[1]],
		},
		{
			id: "automation",
			title: t.workflowSteps[1].title,
			description: t.workflowSteps[1].description,
			icon: "bot",
			mediaSrc: "/abstract-svg/relay-abstract-05-model-routing.svg",
			mediaAlt: isGerman ? "Relay Ausfuhrungsansicht" : "Relay execution view",
			visualLabel: isGerman ? "Ausfuehrung" : "Execution",
			bullets: [t.useCases[2], t.useCases[3]],
		},
		{
			id: "approval",
			title: t.sections[1].title,
			description: t.sections[1].description,
			icon: "check",
			mediaSrc: "/abstract-svg/relay-abstract-06-approval-first-control.svg",
			mediaAlt: isGerman ? "Relay Freigabeansicht" : "Relay approval view",
			visualLabel: isGerman ? "Freigabe" : "Approval",
			bullets: [t.governancePoints[0], t.governancePoints[1]],
		},
		{
			id: "governance",
			title: t.workflowSteps[2].title,
			description: t.workflowSteps[2].description,
			icon: "shield",
			mediaSrc: "/abstract-svg/relay-abstract-02-approval-flow.svg",
			mediaAlt: isGerman ? "Relay Governance Ansicht" : "Relay governance view",
			visualLabel: isGerman ? "Governance" : "Governance",
			bullets: [t.governancePoints[1], t.governancePoints[2]],
		},
		{
			id: "delivery",
			title: t.sections[2].title,
			description: t.sections[2].description,
			icon: "play",
			mediaSrc: "/abstract-svg/relay-abstract-07-artifact-trace.svg",
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

	const githubIcon = (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 text-white fill-current">
			<path d="M12 0.5C5.65 0.5 0.5 5.66 0.5 12.03c0 5.1 3.3 9.42 7.88 10.95.58.1.8-.25.8-.56 0-.27-.01-1.18-.02-2.14-3.2.7-3.87-1.38-3.87-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.69.08-.69 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.01 11.01 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.85 1.19 3.11 0 4.45-2.69 5.43-5.25 5.72.41.35.78 1.03.78 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.21.66.81.55 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.66 18.35.5 12 .5Z" />
		</svg>
	);

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
						<div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[0.78fr,1.22fr] lg:gap-14 lg:items-center">
							<div>
								<p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
									{eyebrowPrimary} <span className="text-lime-300">/</span> Relay
								</p>
								<h1 className="max-w-2xl text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-6xl">
									{isGerman ? (
										t.title
									) : (
										<>
											<span className="block">Delegate Real Work.</span>
											<span className="block">Keep Human Control.</span>
										</>
									)}
								</h1>
								<p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-[1.15rem]">{t.subtitle}</p>

								<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
									<Link
										href="/hub"
										className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
									>
										{t.primaryCta}
									</Link>
									<Link
										href="https://github.com/SeventeenLabs/relay"
										target="_blank"
										rel="noreferrer"
										className="inline-flex min-h-11 items-center justify-center rounded-lg border border-lime-300/45 bg-lime-300/[0.08] px-6 py-3 text-sm font-semibold text-lime-100 transition hover:border-lime-200 hover:bg-lime-300/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/50"
									>
										<span className="inline-flex items-center gap-2">
												{githubIcon}
											<span>{isGerman ? "GitHub Star" : "Star on GitHub"}</span>
										</span>
									</Link>
								</div>
							</div>

							<aside className="relative w-full lg:ml-auto lg:w-[112%] lg:justify-self-end lg:translate-x-3">
								<img
									src="/abstract-svg/relay-abstract-01-operator-desk.svg"
									alt={isGerman ? "Relay Operator Desk Screenshot" : "Relay operator desk screenshot"}
									className="block h-auto w-full"
								/>
							</aside>
						</div>
					</div>
				</section>

				<section className={`${pageContainer} py-16 lg:py-24`}>
					<div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lime-200/90">{firstSection.eyebrow}</p>
							<h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">{firstSection.title}</h2>
							<p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">{firstSection.subtitle}</p>
							<div className="mt-6 flex flex-wrap gap-2.5">
								{firstSection.positioning.map((item) => (
									<span key={item} className="inline-flex rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/85">
										{item}
									</span>
								))}
							</div>
							<p className="mt-6 text-sm text-white/75 sm:text-base">
								<span className="font-semibold text-white">{firstSection.fitLabel}: </span>
								{firstSection.fitText}
							</p>
							<p className="mt-2 text-sm text-white/65 sm:text-base">
								<span className="font-semibold text-white">{firstSection.notForLabel}: </span>
								{firstSection.notForText}
							</p>
							<p className="mt-4 text-sm font-medium text-lime-100/90">{firstSection.proof}</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="rounded-2xl border border-red-300/20 bg-red-300/[0.04] p-5 sm:p-6">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-100/90">{firstSection.beforeTitle}</p>
								<ul className="mt-4 space-y-3">
									{firstSection.beforeItems.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm text-white/78">
											<span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-200/80" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="rounded-2xl border border-lime-300/25 bg-lime-300/[0.05] p-5 sm:p-6">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-100/90">{firstSection.afterTitle}</p>
								<ul className="mt-4 space-y-3">
									{firstSection.afterItems.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm text-white/86">
											<span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime-200" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						<Link
							href="#shipping-now"
							className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
						>
							{firstSection.primaryCta}
						</Link>
						<Link
							href="https://github.com/SeventeenLabs/relay"
							target="_blank"
							rel="noreferrer"
							className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
						>
							<span className="inline-flex items-center gap-2">
								{githubIcon}
								<span>{firstSection.secondaryCta}</span>
							</span>
						</Link>
					</div>
				</section>

				<section id="how-relay-works" className={`${pageContainer} py-16 lg:py-24`}>
					<RelayScrollytelling
						eyebrow={journeyEyebrow}
						title={journeyTitle}
						subtitle={journeySubtitle}
						steps={journeySteps}
					/>
				</section>

				<section id="shipping-now" className={`${pageContainer} border-t border-white/10 py-16 lg:py-20`}>
					<div className="mb-8 flex flex-col gap-3 sm:mb-10">
						<h2 className="text-2xl font-semibold sm:text-3xl">{t.suiteTitle}</h2>
						<p className="max-w-3xl text-sm text-white/70 sm:text-base">{t.suiteSubtitle}</p>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{t.suite.map((item) => (
							(() => {
								const isExternal = "external" in item && item.external;
								return (
							<article key={item.title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lime-300/35 hover:bg-white/[0.06]">
								<h3 className="text-lg font-medium text-white">{item.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
								<Link
									href={item.href}
									target={isExternal ? "_blank" : undefined}
									rel={isExternal ? "noreferrer" : undefined}
									className="mt-5 inline-flex text-sm font-semibold text-lime-200 transition group-hover:text-lime-100"
								>
									{isExternal ? (
										<span className="inline-flex items-center gap-2">
											{githubIcon}
											<span>{item.cta}</span>
										</span>
									) : (
										item.cta
									)}
								</Link>
							</article>
								);
							})()
						))}
					</div>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							href="/hub"
							className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
						>
							{isGerman ? "Relay herunterladen" : "Download Relay"}
						</Link>
						<Link
							href="#roadmap"
							className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
						>
							{isGerman ? "Roadmap ansehen" : "View roadmap"}
						</Link>
					</div>
				</section>

				<section id="roadmap" className={`${pageContainer} py-16`}>
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
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							href={isGerman ? "/de/blog" : "/blog"}
							className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
						>
							{isGerman ? "Release Updates lesen" : "Read release updates"}
						</Link>
						<Link
							href="https://github.com/SeventeenLabs/relay"
							target="_blank"
							rel="noreferrer"
							className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
						>
							<span className="inline-flex items-center gap-2">
								{githubIcon}
								<span>{isGerman ? "Roadmap auf GitHub" : "Track roadmap on GitHub"}</span>
							</span>
						</Link>
					</div>
				</section>

				<section id="governance-and-workspace" className={`${pageContainer} grid gap-6 py-16 lg:grid-cols-2`}>
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
						<div className="mt-7 flex flex-col gap-3 sm:flex-row">
							<Link
								href="/hub"
								className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
							>
								{isGerman ? "Lokal starten" : "Start local-first"}
							</Link>
							<Link
								href="https://github.com/SeventeenLabs/relay"
								target="_blank"
								rel="noreferrer"
								className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
							>
								<span className="inline-flex items-center gap-2">
									{githubIcon}
									<span>{isGerman ? "GitHub Star" : "Star on GitHub"}</span>
								</span>
							</Link>
						</div>
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
								href="https://github.com/SeventeenLabs/relay"
								target="_blank"
								rel="noreferrer"
								className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
							>
								<span className="inline-flex items-center gap-2">
									{githubIcon}
									<span>{t.finalSecondary}</span>
								</span>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
