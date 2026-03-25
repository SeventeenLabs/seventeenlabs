"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	BadgeCheck,
	Database,
	GitBranch,
	Radar,
	ShieldCheck,
	Sparkles,
	Workflow,
} from "lucide-react";

interface RelayShowcasePillar {
	id: string;
	label: string;
	title: string;
	description: string;
	bullets: string[];
}

interface RelayModernShowcaseProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	pillars: readonly RelayShowcasePillar[];
	outcomeTitle: string;
	outcomes: readonly { label: string; value: string }[];
}

const pillarIcons = [Sparkles, Database, Workflow, ShieldCheck] as const;

export default function RelayModernShowcase({
	eyebrow,
	title,
	subtitle,
	pillars,
	outcomeTitle,
	outcomes,
}: RelayModernShowcaseProps) {
	const [activeTab, setActiveTab] = useState(0);
	const currentPillar = pillars[activeTab] ?? pillars[0];
	const CurrentIcon = pillarIcons[activeTab] ?? Sparkles;
	const tickerItems = useMemo(
		() => [
			"Policy checks: passed",
			"Context sync: updated",
			"Plan status: approved",
			"Execution: in progress",
			"Audit trail: complete",
		],
		[],
	);

	return (
		<section className="space-y-8">
			<div className="max-w-3xl">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-300/90">{eyebrow}</p>
				<h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{title}</h2>
				<p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{subtitle}</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
				<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] p-5 sm:p-6">
					<div className="mb-4 flex flex-wrap gap-2">
						{pillars.map((pillar, idx) => {
							const Icon = pillarIcons[idx] ?? Sparkles;
							const isActive = idx === activeTab;
							return (
								<button
									key={pillar.id}
									type="button"
									onClick={() => setActiveTab(idx)}
									className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition ${
										isActive
											? "border-lime-300/40 bg-lime-300/15 text-lime-100"
											: "border-white/15 bg-white/[0.02] text-white/65 hover:border-white/30 hover:text-white"
									}`}
								>
									<Icon className="h-3.5 w-3.5" />
									{pillar.label}
								</button>
							);
						})}
					</div>

					<AnimatePresence mode="wait">
						<motion.article
							key={currentPillar.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="rounded-2xl border border-white/10 bg-black/35 p-5"
						>
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="text-2xl font-semibold text-white">{currentPillar.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">{currentPillar.description}</p>
								</div>
								<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-lime-300/35 bg-lime-300/15 text-lime-100">
									<CurrentIcon className="h-4.5 w-4.5" />
								</span>
							</div>

							<ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
								{currentPillar.bullets.map((point) => (
									<li key={point} className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white/80">
										{point}
									</li>
								))}
							</ul>
						</motion.article>
					</AnimatePresence>
				</div>

				<div className="space-y-4">
					<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
						<div className="mb-3 flex items-center gap-2">
							<Radar className="h-4.5 w-4.5 text-lime-200" />
							<p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Live Signal Rail</p>
						</div>
						<div className="space-y-2">
							{tickerItems.map((item, idx) => (
								<motion.div
									key={item}
									initial={{ opacity: 0.6 }}
									animate={{ opacity: [0.45, 1, 0.45] }}
									transition={{ duration: 2.3 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
									className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/75"
								>
									<BadgeCheck className="h-3.5 w-3.5 text-lime-200" />
									<span>{item}</span>
								</motion.div>
							))}
						</div>
					</div>

					<div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-6">
						<div className="mb-4 flex items-center gap-2">
							<GitBranch className="h-4.5 w-4.5 text-lime-200" />
							<h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">{outcomeTitle}</h3>
						</div>
						<div className="grid grid-cols-2 gap-2.5">
							{outcomes.map((item) => (
								<div key={item.label} className="rounded-xl border border-white/10 bg-black/35 px-3 py-3">
									<p className="text-[11px] uppercase tracking-wide text-white/55">{item.label}</p>
									<p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
