"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import HlsVideo from "@/components/hls-video";

const headingStyle = { fontFamily: "'Instrument Serif', serif" };
const sectionShell = "mx-auto w-full max-w-7xl px-6 md:px-12";
const sectionDivider = "border-t border-white/10";
const ctaPrimaryClass =
	"liquid-glass inline-flex items-center justify-center rounded-full text-foreground transition-transform hover:scale-[1.03]";
const ctaSecondaryClass =
	"inline-flex items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground";

const featureTabs = [
	{ label: "Project Context", id: "context" },
	{ label: "Approval Gates", id: "approvals" },
	{ label: "Cowork Runs", id: "cowork" },
	{ label: "Audit Trail", id: "audit" },
	{ label: "Model Routing", id: "routing" },
] as const;

const navItems = [
	{ label: "Relay", href: "/products/relay" },
	{ label: "Solutions", href: "/solutions" },
	{ label: "Products", href: "/frame" },
	{ label: "Journal", href: "/blog" },
	{ label: "Contact", href: "/about" },
] as const;

const stats = [
	{ value: "100%", label: "Approval traceability" },
	{ value: "360°", label: "Run visibility" },
	{ value: "Local-first", label: "Deployment model" },
	{ value: "Agnostic", label: "Model routing" },
] as const;

const footerLinks = [
	{ label: "Relay", href: "/products/relay" },
	{ label: "Products", href: "/frame" },
	{ label: "Solutions", href: "/solutions" },
	{ label: "Community", href: "/blog" },
	{ label: "Journal", href: "/blog" },
	{ label: "Contact", href: "/about" },
] as const;

const useCases = [
	{
		title: "Operations teams",
		description: "Run weekly reporting, reconciliation checks, and cross-tool updates with approval gates before sensitive actions.",
	},
	{
		title: "Finance teams",
		description: "Automate recurring analysis and document workflows while keeping clear decision trails for review.",
	},
	{
		title: "Delivery teams",
		description: "Move from request to governed execution with project-scoped context and visible run status.",
	},
] as const;

const rolloutSteps = [
	{
		title: "1. Scope",
		description: "Define target workflows, risk boundaries, and approval requirements.",
	},
	{
		title: "2. Connect",
		description: "Wire your endpoint and project context so runs stay grounded in real artifacts.",
	},
	{
		title: "3. Pilot",
		description: "Ship initial workflows with operators in the loop and tune safety scopes.",
	},
	{
		title: "4. Scale",
		description: "Expand to additional teams with repeatable guardrails and execution standards.",
	},
] as const;

const faqItems = [
	{
		question: "Is Relay the AI model?",
		answer: "No. Relay is the operator surface and governed execution layer.",
	},
	{
		question: "Can we run it self-hosted?",
		answer: "Yes. Relay is built for local-first and self-hosted operating models.",
	},
	{
		question: "Do we get model flexibility?",
		answer: "Yes. Relay supports model-agnostic routing through OpenClaw.",
	},
	{
		question: "How are risky actions controlled?",
		answer: "Safety scopes and approval gates are enforced before critical actions execute.",
	},
] as const;

const heroVideoUrl =
	"https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";
const hlsStatementUrl = "https://stream.mux.com/9njY8qDfS02Uvbll018C8CK39p5EksK7mn02DDC1zYvppI.m3u8";
const joinVideoUrl =
	"https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4";

export default function VelorahLanding() {
	const [activeTab, setActiveTab] = useState<(typeof featureTabs)[number]["id"]>("context");
	const [isScrolled, setIsScrolled] = useState(false);
	const activeTabIndex = useMemo(() => Math.max(featureTabs.findIndex((tab) => tab.id === activeTab), 0), [activeTab]);
	const progressPercent = ((activeTabIndex + 1) / featureTabs.length) * 100;

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<main className="velorah-page min-h-screen bg-[hsl(0,0%,0%)] text-foreground">
			<header
				className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
					isScrolled
						? "border-b border-white/10 bg-black/55 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
						: "border-b border-transparent bg-transparent backdrop-blur-none"
				}`}
			>
				<nav className="mx-auto flex w-full max-w-[88rem] items-center justify-between px-6 py-3 md:px-8">
					<Link href="/" className="flex items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-white/[0.06]">
						<img src="/logo.png" alt="SeventeenLabs" className="h-6 w-6 rounded-md object-contain" />
						<span className="text-xl tracking-tight text-foreground sm:text-2xl" style={headingStyle}>
							SeventeenLabs
						</span>
					</Link>

					<div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-1 backdrop-blur-md md:flex">
						{navItems.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className="rounded-full px-4 py-2 text-sm text-white/90 transition-colors hover:bg-white/[0.08] hover:text-white"
							>
								{item.label}
							</Link>
						))}
					</div>

					<Link
						href="/products/relay"
						className={`${ctaPrimaryClass} rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 text-sm backdrop-blur-md`}
					>
						Explore Relay
					</Link>
				</nav>
			</header>

			<section className="relative min-h-screen overflow-hidden">
				<video
					src={heroVideoUrl}
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 z-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 z-[1] bg-black/14" />
				<div className="absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

				<div className="relative z-10 flex min-h-screen items-center px-6 pb-14 pt-24">
					<div className="mx-auto grid w-full max-w-7xl grid-cols-[1.35fr,0.65fr] items-end gap-12 lg:gap-14">
						<div>
							<h1 className="animate-fade-rise text-left text-5xl font-normal leading-[0.94] tracking-[-2px] text-foreground sm:text-7xl md:text-[5.3rem]" style={headingStyle}>
								Practical AI systems
								<br />
								for companies integrating AI
								<br />
								into daily business operations
							</h1>
							<Link href="/products/relay" className={`animate-fade-rise-delay-2 mt-8 inline-flex px-10 py-4 text-sm ${ctaPrimaryClass}`}>
								Start with Relay
							</Link>
						</div>
						<div className="animate-fade-rise-delay justify-self-end pb-2">
							<p className="max-w-xl text-left text-[1.22rem] leading-[1.62] text-white/82 sm:text-[1.42rem] lg:text-[1.55rem]" style={headingStyle}>
								AI will reshape how every business operates. SeventeenLabs helps companies capture the upside while reducing risk through clear governance, human approval, and accountable execution.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className={`${sectionDivider} flex min-h-[65vh] items-center justify-center bg-[hsl(0,0%,0%)] px-6 py-20`}>
				<h2 className="max-w-4xl text-center text-4xl leading-[1.05] tracking-[-1.5px] text-foreground sm:text-6xl md:text-7xl" style={headingStyle}>
					Ship autonomous workflows,
					<br />
					without losing oversight.
				</h2>
			</section>

			<section className={`${sectionShell} ${sectionDivider} py-20`}>
				<div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-8 sm:p-10 md:p-12">
					<div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
						<div>
							<span className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
								Relay Controls
							</span>
							<h3 className="text-3xl tracking-[-1px] text-foreground sm:text-5xl" style={headingStyle}>
								Governed by design
							</h3>
							<p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
								Relay is built to keep execution fast without sacrificing oversight. Every run is scoped, every critical action is gated, and every decision stays auditable.
							</p>

							<div className="mt-8 space-y-3">
								{[
									"Project-bound context for every run",
									"Approval gates for sensitive actions",
									"Visible activity, artifacts, and decisions",
									"Model-agnostic routing through OpenClaw",
								].map((point) => (
									<p key={point} className="flex items-start gap-3 text-sm text-white/85">
										<span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-white/70" />
										<span>{point}</span>
									</p>
								))}
							</div>
						</div>

						<div>
							<div className="mb-6 flex flex-wrap gap-2">
								{featureTabs.map((tab) => {
									const isActive = activeTab === tab.id;
									return (
										<button
											type="button"
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											aria-pressed={isActive}
											className={`rounded-full border px-4 py-2 text-xs transition-colors ${
												isActive
													? "border-foreground bg-foreground text-primary-foreground"
													: "border-border text-muted-foreground hover:text-foreground"
											}`}
										>
											{tab.label}
										</button>
									);
								})}
							</div>

							<div className="mb-6 h-0.5 w-full rounded-full bg-border">
								<div className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: `${progressPercent}%` }} />
							</div>

							<div className="grid gap-3 sm:grid-cols-2">
								<div className="rounded-xl border border-white/10 bg-black/30 p-4">
									<p className="text-xs uppercase tracking-[0.12em] text-white/60">Critical actions</p>
									<p className="mt-2 text-xl text-foreground" style={headingStyle}>Approval required</p>
								</div>
								<div className="rounded-xl border border-white/10 bg-black/30 p-4">
									<p className="text-xs uppercase tracking-[0.12em] text-white/60">Decision visibility</p>
									<p className="mt-2 text-xl text-foreground" style={headingStyle}>Full trail</p>
								</div>
								<div className="rounded-xl border border-white/10 bg-black/30 p-4">
									<p className="text-xs uppercase tracking-[0.12em] text-white/60">Deployment model</p>
									<p className="mt-2 text-xl text-foreground" style={headingStyle}>Local-first</p>
								</div>
								<div className="rounded-xl border border-white/10 bg-black/30 p-4">
									<p className="text-xs uppercase tracking-[0.12em] text-white/60">Routing</p>
									<p className="mt-2 text-xl text-foreground" style={headingStyle}>Model-agnostic</p>
								</div>
							</div>

							<div className="mt-6 flex flex-wrap gap-3">
								<Link href="/products/relay" className={`${ctaPrimaryClass} px-8 py-3 text-sm`}>
									View Relay workflow
								</Link>
								<a
									href="https://github.com/SeventeenLabs/relay"
									target="_blank"
									rel="noreferrer"
									className={`${ctaSecondaryClass} px-8 py-3 text-sm`}
								>
									Star on GitHub
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={`${sectionShell} ${sectionDivider} py-20`}>
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Use cases</p>
					<h2 className="mt-4 text-4xl leading-[1.05] tracking-[-1.5px] text-foreground sm:text-5xl" style={headingStyle}>
						Built for real operational work
					</h2>
				</div>
				<div className="mt-10 grid gap-4 md:grid-cols-3">
					{useCases.map((item) => (
						<article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
							<h3 className="text-xl text-foreground" style={headingStyle}>
								{item.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className={`${sectionDivider} relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-20`}>
				<HlsVideo src={hlsStatementUrl} />
				<div className="absolute inset-0 z-[1] bg-black/45" />
				<div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
					<p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">Relay Operator Loop</p>
					<h2 className="text-4xl leading-[1.05] tracking-[-1.5px] text-foreground sm:text-6xl md:text-7xl" style={headingStyle}>
						Plan with context.
						<br />
						Execute with approvals.
					</h2>
					<p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						Relay combines cowork execution, safety scopes, and decision visibility in one desk. Teams can move faster while keeping humans in control of critical actions.
					</p>
					<div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
						{stats.map((stat) => (
							<div key={stat.label}>
								<p className="text-3xl font-light text-foreground sm:text-4xl" style={headingStyle}>
									{stat.value}
								</p>
								<p className="mt-2 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
							</div>
						))}
					</div>
					<Link href="/products/relay" className={`mt-12 px-10 py-4 text-sm ${ctaPrimaryClass}`}>
						See Relay in action
					</Link>
				</div>
			</section>

			<section className={`${sectionShell} ${sectionDivider} py-20`}>
				<div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Implementation</p>
						<h2 className="mt-4 text-4xl leading-[1.05] tracking-[-1.5px] text-foreground sm:text-5xl" style={headingStyle}>
							A practical rollout blueprint
						</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
							From first scoped pilot to scaled execution standards, SeventeenLabs helps teams implement AI workflows without losing governance.
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						{rolloutSteps.map((step) => (
							<article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
								<h3 className="text-lg text-foreground" style={headingStyle}>
									{step.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className={`${sectionDivider} relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center`}>
				<video
					src={joinVideoUrl}
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 z-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 z-[1] bg-black/50" />
				<div className="relative z-10 flex max-w-4xl flex-col items-center">
					<p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">Relay by SeventeenLabs</p>
					<h2 className="text-5xl leading-[0.95] tracking-[-2px] text-foreground sm:text-7xl md:text-8xl" style={headingStyle}>
						Run your first governed task
					</h2>
					<p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						Start with Relay, connect your endpoint, and ship AI-supported operations with approval control from day one.
					</p>
					<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
						<Link href="/products/relay" className={`${ctaPrimaryClass} px-10 py-4 text-sm`}>
							Download Relay
						</Link>
						<a
							href="https://github.com/SeventeenLabs/relay"
							target="_blank"
							rel="noreferrer"
							className={`${ctaSecondaryClass} px-10 py-4 text-sm`}
						>
							Star on GitHub
						</a>
					</div>
				</div>
			</section>

			<section className={`${sectionShell} ${sectionDivider} py-20`}>
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
					<h2 className="mt-4 text-4xl leading-[1.05] tracking-[-1.5px] text-foreground sm:text-5xl" style={headingStyle}>
						Common questions from operators
					</h2>
				</div>
				<div className="mx-auto mt-10 grid max-w-4xl gap-3">
					{faqItems.map((item) => (
						<article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
							<h3 className="text-lg text-foreground" style={headingStyle}>
								{item.question}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
						</article>
					))}
				</div>
			</section>

			<footer className={`${sectionShell} ${sectionDivider} bg-[hsl(0,0%,0%)] py-16`}>
				<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr,0.85fr,0.85fr]">
						<div>
							<div className="flex items-center gap-3">
								<img src="/logo.png" alt="SeventeenLabs" className="h-6 w-6 rounded-md object-contain" />
								<span className="text-xl tracking-tight text-foreground" style={headingStyle}>
									SeventeenLabs
								</span>
							</div>
							<h3 className="mt-6 text-2xl leading-tight text-foreground sm:text-3xl" style={headingStyle}>
								Where AI operations
								<br />
								meet accountability.
							</h3>
							<p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
								Practical AI systems for teams that need execution speed, human approvals, and clear governance across daily workflows.
							</p>
						</div>

						<div>
							<p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/55">Explore</p>
							<div className="grid grid-cols-2 gap-x-6 gap-y-3">
								{footerLinks.map((item) => (
									<Link key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
										{item.label}
									</Link>
								))}
							</div>
						</div>

						<div>
							<p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/55">Stay informed</p>
							<p className="mb-5 text-sm leading-relaxed text-muted-foreground">
								Get new Relay updates, implementation notes, and product releases.
							</p>
							<div className="flex flex-col gap-3 sm:flex-row">
								<Link href="/blog" className={`${ctaPrimaryClass} px-6 py-2.5 text-sm`}>
									Subscribe
								</Link>
								<a
									href="https://github.com/SeventeenLabs/relay"
									target="_blank"
									rel="noreferrer"
									className={`${ctaSecondaryClass} px-6 py-2.5 text-sm`}
								>
									GitHub
								</a>
							</div>
						</div>
					</div>

					<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
						<p>© {new Date().getFullYear()} SeventeenLabs. All rights reserved.</p>
						<div className="flex items-center gap-6">
							<Link href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</Link>
							<Link href="/terms" className="transition-colors hover:text-foreground">Terms &amp; Conditions</Link>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}

