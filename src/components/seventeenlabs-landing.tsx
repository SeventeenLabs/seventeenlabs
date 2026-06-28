"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Film,
  Layers3,
  Wand2,
} from "lucide-react";

const audience = ["Creators", "Brand teams", "Small studios", "Agencies", "Founders"];

const buildSignals = [
  "Private prototype previews",
  "Workflow updates from the build",
  "First creator workspace invites",
];

const productImages = {
  productionBible: "/images/ai-production-bible.png",
  shotPlanning: "/images/ai-shot-planning.png",
  cameraWorkbench: "/images/ai-camera-workbench.png",
  workflowProductionBible: "/images/workflow-01-production-bible.png",
  workflowShotPlanning: "/images/workflow-02-shot-planning.png",
  workflowVariantFix: "/images/workflow-03-variant-fix.png",
  workflowReleasePackage: "/images/workflow-04-release-package.png",
};

const outputs = [
  "Scene-ready shot lists",
  "Reusable character packs",
  "Location and prop boards",
  "Camera movement plans",
  "Continuity notes",
  "Trailer and social exports",
];

const pillars = [
  {
    icon: Film,
    title: "Plan the film before you generate",
    description:
      "Turn a script into scenes, beats, shot lists, references, and generation tasks so every clip has a job in the final edit.",
  },
  {
    icon: Layers3,
    title: "Lock characters, sets, and props",
    description:
      "Store the face, wardrobe, location, lighting, props, and style rules that need to survive across every shot.",
  },
  {
    icon: Wand2,
    title: "Direct camera and motion",
    description:
      "Describe the shot like a director: lens feel, blocking, camera move, start frame, end frame, and performance reference.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Build the production bible",
    description: "Define the story world, characters, wardrobe, locations, props, tone, and visual rules once.",
    image: productImages.workflowProductionBible,
    alt: "Production bible cards for characters, wardrobe, locations, props, lighting, and color style.",
  },
  {
    step: "02",
    title: "Break the script into shootable scenes",
    description: "Convert scenes into beats, shot lists, camera moves, references, and continuity requirements.",
    image: productImages.workflowShotPlanning,
    alt: "Workflow from script to scenes, camera controls, references, wardrobe, props, and production timeline.",
  },
  {
    step: "03",
    title: "Generate, compare, and fix shots",
    description: "Route each shot to the right AI service, track versions, flag continuity drift, and keep the best takes.",
    image: productImages.workflowVariantFix,
    alt: "Variant comparison and fix pass interface for matching AI-generated shots.",
  },
  {
    step: "04",
    title: "Assemble the release package",
    description: "Export the episode cut, trailer hook, poster stills, thumbnails, captions, and vertical clips from the same project.",
    image: productImages.workflowReleasePackage,
    alt: "Release package interface with timeline, video previews, vertical crops, audio, and social exports.",
  },
];

const proofRows = [
  ["Prompt-only tools", "Characters morph, outfits change, and locations drift between clips", "SeventeenLabs", "Keeps identity, wardrobe, sets, props, and style rules attached to every shot"],
  ["Generic video apps", "You get beautiful five-second clips, then fight to make them work as a scene", "SeventeenLabs", "Starts from the script, scene, beat, camera move, and edit purpose before generation"],
  ["Manual folders", "References, rejected takes, prompts, edits, and continuity notes get scattered everywhere", "SeventeenLabs", "Keeps the production bible, shot history, versions, and exports in one workspace"],
  ["Credit-burning iteration", "Bad generations cost money because there is no clear way to diagnose what failed", "SeventeenLabs", "Tracks intent, model, reference, version, and fix notes so each retry gets smarter"],
];

const faqs = [
  {
    question: "What makes this different from an AI video generator?",
    answer:
      "AI video generators make clips. SeventeenLabs is built around production memory: characters, locations, props, scene notes, camera direction, references, review states, and exports stay connected so clips can become scenes and scenes can become a series.",
  },
  {
    question: "Does it replace Runway, Kling, Sora, Veo, or other generators?",
    answer:
      "No. The goal is to become the production layer above the models. You plan the scene, preserve continuity, manage versions, and route shots to the right generation tool instead of rebuilding context by hand every time.",
  },
  {
    question: "Who is it for?",
    answer:
      "Creators, founders, brand teams, agencies, independent filmmakers, and small studios who want to make AI films, pilots, ads, trailers, and recurring series without filming everything in real life.",
  },
  {
    question: "Can I start before the full product is public?",
    answer:
      "Yes. SeventeenLabs is in private build. Join the list if you are actively trying to make repeatable AI video projects, and we will share workflow previews, prototype access, and early workspace invites as they open.",
  },
];

export default function SeventeenLabsLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[oklch(0.055_0.012_270)] text-[oklch(0.98_0.006_270)]">
      <Hero />
      <AudienceStrip />
      <PrivateBuildSection />
      <ProblemSection />
      <ProductSection />
      <WorkflowSection />
      <OutputsSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}

function Hero() {
  return (
    <section id="early-access" className="relative isolate min-h-svh scroll-mt-24 overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.08_0.023_135)_0%,oklch(0.055_0.012_270)_48%,oklch(0.061_0.016_185)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,oklch(0.9_0.22_128_/_0.18),transparent_36%,oklch(0.7_0.13_190_/_0.12)_72%,transparent)]" />

      <div className="mx-auto flex w-full max-w-[88rem] flex-col items-center">
        <div className="flex max-w-5xl flex-col items-center text-center">
          <p className="mb-5 text-sm font-semibold text-[oklch(0.86_0.2_128)]">
            Currently in private build for AI filmmakers and creator teams
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-normal text-[oklch(0.98_0.006_270)] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            The AI production pipeline for films, pilots, trailers, and series.
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-[oklch(0.78_0.015_270)] sm:text-lg">
            Plan the script, lock characters and locations, direct camera movement, track every take, and keep continuity from shot to shot without filming everything in real life.
          </p>
          <EarlyAccessForm className="mt-8 w-full max-w-2xl" />
        </div>

        <div className="mt-14 w-full">
          <ProductStudioPreview />
        </div>
      </div>
    </section>
  );
}

function AudienceStrip() {
  return (
    <section className="border-y border-white/10 bg-[oklch(0.072_0.014_270)] px-5 py-5 md:px-8">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[oklch(0.58_0.02_270)]">Built for creators turning AI clips into real productions</p>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {audience.map((item) => (
            <span key={item} className="text-sm font-semibold text-[oklch(0.84_0.012_270)]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivateBuildSection() {
  return (
    <section className="border-b border-white/10 bg-[oklch(0.061_0.012_270)] px-5 py-12 md:px-8">
      <div className="mx-auto grid w-full max-w-[82rem] gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.86_0.2_128)]">Private build</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-[oklch(0.98_0.006_270)] md:text-3xl">
            Not a public product yet. A focused build with creators who already feel the pain.
          </h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-[oklch(0.74_0.014_270)]">
            We are shaping the first workspace with people trying to make real AI films, pilots, ads, trailers, and recurring series. Join if you want the production pipeline, not another prompt box.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {buildSignals.map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-semibold text-[oklch(0.84_0.012_270)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="studio" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-[82rem] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeader
          eyebrow="The problem"
          title="AI video tools make clips. Creators still have to make the movie."
          description="The hard part is not generating one impressive shot. It is keeping the same actor, outfit, room, prop, camera language, and story logic across an entire scene without burning credits on random retries."
        />
        <div className="grid gap-3">
          {proofRows.map(([beforeLabel, before, afterLabel, after]) => (
            <div key={before} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[oklch(0.56_0.012_270)]">{beforeLabel}</p>
                <p className="mt-2 text-sm leading-6 text-[oklch(0.7_0.012_270)]">{before}</p>
              </div>
              <div className="rounded-xl bg-[oklch(0.9_0.22_128_/_0.08)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[oklch(0.86_0.2_128)]">{afterLabel}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[oklch(0.9_0.012_270)]">{after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section className="border-y border-white/10 bg-[oklch(0.075_0.014_270)] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader eyebrow="Product" title="A production pipeline, not another prompt box." />
          <p className="max-w-2xl text-base leading-7 text-[oklch(0.74_0.014_270)] md:text-lg">
            SeventeenLabs gives AI filmmakers the missing layer between the script and the generator: production bible, scene breakdown, shot planning, continuity memory, model routing, version review, and release exports.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <FeaturePanel key={pillar.title} {...pillar} />
          ))}
        </div>

        <ShowcaseImage
          className="mt-12"
          src={productImages.shotPlanning}
          alt="SeventeenLabs shot planning workspace with scenes, beats, shot intent, framing, lens, characters, wardrobe, locations, continuity notes, and model routing."
        />

        <ShowcaseImage
          className="mt-6"
          src={productImages.cameraWorkbench}
          alt="SeventeenLabs camera workbench with a 3D scene view, camera path, movement keyframes, character lock, wardrobe lock, location lock, and generation controls."
        />
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="workflow" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-[82rem]">
        <SectionHeader
          eyebrow="Workflow"
          title="A clear way to film every AI scene."
          description="Instead of prompting from scratch, work like a small virtual production crew. Define what must stay consistent, direct each shot, compare takes, fix mistakes, then move the scene forward."
        />

        <div className="mt-12 grid gap-6">
          {workflow.map(({ step, title, description, image, alt }, index) => (
            <article
              key={title}
              className={`grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:items-center ${index % 2 === 1 ? "lg:grid-cols-[minmax(18rem,28rem)_minmax(0,1fr)] lg:[&>figure]:order-first" : ""}`}
            >
              <div className="rounded-2xl border border-white/10 bg-[oklch(0.08_0.012_270)] p-6 md:p-8">
                <p className="text-sm font-bold text-[oklch(0.86_0.2_128)]">{step}</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight text-[oklch(0.98_0.006_270)] md:text-4xl">{title}</h3>
                <p className="mt-4 text-base leading-7 text-[oklch(0.72_0.012_270)]">{description}</p>
              </div>

              <figure className="mx-auto w-full max-w-[26rem] overflow-hidden rounded-2xl border border-white/12 bg-[oklch(0.09_0.014_270)] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.35)] lg:max-w-none">
                <Image
                  src={image}
                  alt={alt}
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 28rem, min(26rem, calc(100vw - 2.5rem))"
                  className="aspect-square w-full rounded-xl object-cover"
                />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputsSection() {
  return (
    <section id="formats" className="scroll-mt-24 bg-[oklch(0.98_0.006_270)] px-5 py-20 text-[oklch(0.09_0.012_270)] md:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-[82rem] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.42_0.14_132)]">Outputs</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Keep every creative asset tied to the scene it belongs to.
          </h2>
          <p className="mt-5 text-base leading-7 text-[oklch(0.39_0.018_270)]">
            Your project should remember more than the final render. It should remember why the shot exists, which references were used, what changed, what failed, and what needs to match in the next take.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {outputs.map((item) => (
            <div key={item} className="flex min-h-20 items-center gap-3 rounded-2xl border border-[oklch(0.9_0.012_270)] bg-[oklch(1_0.004_270)] px-5">
              <BadgeCheck className="h-5 w-5 text-[oklch(0.48_0.17_132)]" />
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EarlyAccessForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("Enter a valid email to join the private build.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!validEmail) {
      setErrorMessage("Enter a valid email to join the private build.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setErrorMessage(result?.error || "Could not join the private build. Try again.");
        setStatus("error");
        return;
      }

      setEmail("");
      setStatus("success");
    } catch {
      setErrorMessage("Could not join the private build. Try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`text-left ${className}`}>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label htmlFor="early-access-email" className="sr-only">
          Email address
        </label>
        <input
          id="early-access-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="you@studio.com"
          className="min-h-11 rounded-lg border border-white/16 bg-white/[0.055] px-4 text-base text-[oklch(0.98_0.006_270)] outline-none transition placeholder:text-[oklch(0.5_0.012_270)] focus:border-[oklch(0.9_0.22_128)] focus:ring-2 focus:ring-[oklch(0.9_0.22_128_/_0.28)]"
          aria-describedby="early-access-message"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[oklch(0.9_0.22_128)] px-5 text-sm font-bold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Joining..." : "Join private build"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p id="early-access-message" className="mt-3 min-h-5 text-sm text-[oklch(0.7_0.012_270)]" aria-live="polite">
        {status === "success"
          ? "You are on the private build list."
          : status === "error"
            ? errorMessage
            : "Get build updates, workflow previews, and first creator workspace invites."}
      </p>
    </form>
  );
}

function FaqSection() {
  return (
    <section className="border-t border-white/10 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-[82rem] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader eyebrow="FAQ" title="Questions before you start?" />
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
              <h3 className="text-lg font-semibold text-[oklch(0.98_0.006_270)]">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[oklch(0.72_0.012_270)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto grid max-w-[82rem] gap-8 rounded-2xl border border-[oklch(0.9_0.22_128_/_0.18)] bg-[linear-gradient(135deg,oklch(0.13_0.05_135),oklch(0.08_0.014_270)_48%,oklch(0.12_0.042_185))] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-tight text-[oklch(0.98_0.006_270)] md:text-5xl">
            Stop making random clips. Start filming scenes.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[oklch(0.8_0.012_270)]">
            Bring the script, characters, locations, and shot ideas. SeventeenLabs helps turn them into a repeatable AI production pipeline.
          </p>
        </div>
        <a href="#early-access" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[oklch(0.9_0.22_128)] px-6 text-sm font-bold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)]">
          Join private build
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.86_0.2_128)]">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight text-[oklch(0.98_0.006_270)] md:text-6xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-[oklch(0.74_0.014_270)] md:text-lg">{description}</p> : null}
    </div>
  );
}

function FeaturePanel({ icon: Icon, title, description }: (typeof pillars)[number]) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[oklch(0.98_0.006_270)] text-[oklch(0.09_0.018_270)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-8 text-xl font-semibold text-[oklch(0.98_0.006_270)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[oklch(0.72_0.012_270)]">{description}</p>
    </article>
  );
}

function ProductStudioPreview() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-x-8 -top-8 h-20 rounded-full bg-[oklch(0.9_0.22_128_/_0.14)] blur-3xl" />
      <ShowcaseImage
        src={productImages.productionBible}
        alt="SeventeenLabs production bible workspace showing project overview, characters, wardrobe, props, locations, camera language, lighting rules, production pipeline, continuity status, and generation cost."
        priority
      />
    </div>
  );
}

function ShowcaseImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/14 bg-[oklch(0.09_0.014_270)] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.45)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1792}
        height={1024}
        sizes="(min-width: 1536px) 88rem, (min-width: 1024px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
        className="h-auto w-full rounded-xl object-cover"
        priority={priority}
      />
    </div>
  );
}
