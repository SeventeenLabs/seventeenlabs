"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	Bot,
	CheckCircle2,
	ListChecks,
	MessageSquare,
	PlayCircle,
	ShieldCheck,
	Cog,
} from "lucide-react";

type IconKey = "message" | "bot" | "shield" | "list" | "check" | "play";

interface JourneyStep {
	id: string;
	title: string;
	description: string;
	icon: IconKey;
	mediaSrc: string;
	mediaAlt: string;
	bullets: readonly string[];
	visualLabel: string;
}

interface RelayScrollytellingProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	steps: readonly JourneyStep[];
}

const iconMap = {
	message: MessageSquare,
	bot: Bot,
	shield: ShieldCheck,
	list: ListChecks,
	check: CheckCircle2,
	play: PlayCircle,
} as const;

export default function RelayScrollytelling({
	eyebrow,
	title,
	subtitle,
	steps,
}: RelayScrollytellingProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const itemRefs = useRef<Array<HTMLElement | null>>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const indexAttr = entry.target.getAttribute("data-step-index");
					if (!indexAttr) continue;
					const nextIndex = Number(indexAttr);
					if (!Number.isNaN(nextIndex)) {
						setActiveIndex(nextIndex);
					}
				}
			},
			{
				root: null,
				rootMargin: "-25% 0px -50% 0px",
				threshold: 0.15,
			},
		);

		for (const ref of itemRefs.current) {
			if (ref) observer.observe(ref);
		}

		return () => observer.disconnect();
	}, [steps.length]);

	const activeStep = steps[activeIndex] ?? steps[0];

	return (
		<section className="space-y-10 lg:space-y-14">
			<header className="mx-auto max-w-3xl text-center">
				<div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/35 bg-lime-300/14 text-lime-100">
					<span>
						<Cog className="h-6 w-6" />
					</span>
				</div>
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-300/90">{eyebrow}</p>
				<h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
				<p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-lg">{subtitle}</p>
			</header>

			<div className="grid items-start gap-7 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-10 lg:gap-12">
				<div className="space-y-8 sm:space-y-10 lg:space-y-24">
					{steps.map((step, index) => {
						const StepIcon = iconMap[step.icon];
						const isActive = index === activeIndex;
						return (
							<article
								key={step.id}
								ref={(el) => {
									itemRefs.current[index] = el;
								}}
								data-step-index={index}
								className="flex min-h-0 flex-col justify-center px-0 py-4 sm:px-1 sm:py-5 md:min-h-[calc(100vh-6rem)] md:px-2 md:py-6 lg:px-3 lg:py-7"
							>
								<div className="flex items-center gap-3">
									<span
										className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
											isActive
												? "border-lime-300/45 bg-lime-300/15 text-lime-100"
												: "border-white/15 bg-white/5 text-white/80"
										}`}
									>
										<StepIcon className="h-4.5 w-4.5" />
									</span>
									<h3 className="text-lg font-medium text-white sm:text-xl lg:text-2xl">{step.title}</h3>
								</div>
								<p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{step.description}</p>

								<div className="mt-4 md:hidden">
									<div className="relative aspect-[16/10] w-full">
										<img src={step.mediaSrc} alt={step.mediaAlt} className="absolute inset-0 h-full w-full object-cover" />
									</div>
								</div>

								<ul className="mt-5 space-y-2.5">
									{step.bullets.map((item) => (
										<li key={item} className="flex items-start gap-2.5 py-1 text-sm text-white/80">
											<span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime-300" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</article>
						);
					})}
				</div>

				<div className="relative hidden md:sticky md:top-24 md:block md:self-start md:pl-2 lg:pl-4">
					<div className="md:flex md:min-h-[calc(100vh-6rem)] md:w-full md:items-center">
						<AnimatePresence mode="wait">
							<motion.div
								className="w-full"
								key={activeStep.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -6 }}
								transition={{ duration: 0.22, ease: "easeOut" }}
							>
								<div className="relative aspect-[16/10] w-full">
									<img src={activeStep.mediaSrc} alt={activeStep.mediaAlt} className="absolute inset-0 h-full w-full object-cover" />
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
