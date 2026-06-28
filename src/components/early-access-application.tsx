"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import type { PricingPlan } from "@/lib/early-access-plans";
import { toolOptions } from "@/lib/early-access-plans";
import { trackFunnelEvent } from "@/lib/funnel-events";

export default function EarlyAccessApplication({
  selectedPlan,
  className = "",
}: {
  selectedPlan: PricingPlan;
  className?: string;
}) {
  const [email, setEmail] = React.useState("");
  const [projectType, setProjectType] = React.useState("Narrative short");
  const [selectedTools, setSelectedTools] = React.useState<string[]>([]);
  const [biggestProblem, setBiggestProblem] = React.useState("");
  const [projectLink, setProjectLink] = React.useState("");
  const [hasStarted, setHasStarted] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("Enter a valid email to apply.");
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const successRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  function markApplicationStarted() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackFunnelEvent("application_started", {
      plan: selectedPlan.name,
      price: selectedPlan.price,
      planId: selectedPlan.id,
      projectType,
      currentTools: selectedTools.join(", "),
      mainPain: biggestProblem.trim(),
    });
  }

  function toggleTool(tool: string) {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((item) => item !== tool) : [...prev, tool]
    );
    setStatus("idle");
    markApplicationStarted();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markApplicationStarted();
    const normalizedEmail = email.trim().toLowerCase();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    const normalizedTools = selectedTools.join(", ");
    const normalizedProblem = biggestProblem.trim();

    if (!validEmail) {
      setErrorMessage("Enter a valid email to apply.");
      setStatus("error");
      return;
    }

    if (!normalizedTools || !normalizedProblem) {
      setErrorMessage("Select your current tools and tell us your biggest production problem.");
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
        body: JSON.stringify({
          email: normalizedEmail,
          plan: selectedPlan.name,
          price: selectedPlan.price,
          planId: selectedPlan.id,
          projectType,
          currentTools: normalizedTools,
          biggestProblem: normalizedProblem,
          projectLink: projectLink.trim(),
          trafficSource: typeof window !== "undefined" ? window.location.href : "unknown",
          paymentStatus: "not_charged_application",
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setErrorMessage(result?.error || "Could not submit the application. Try again.");
        setStatus("error");
        return;
      }

      setEmail("");
      setSelectedTools([]);
      setBiggestProblem("");
      setProjectLink("");
      setSubmittedEmail(normalizedEmail);
      setStatus("success");
      trackFunnelEvent("application_completed", {
        plan: selectedPlan.name,
        price: selectedPlan.price,
        planId: selectedPlan.id,
        projectType,
        currentTools: normalizedTools,
        mainPain: normalizedProblem,
        paymentStatus: "not_charged_application",
      });
      trackFunnelEvent("early_access_completed", {
        plan: selectedPlan.name,
        price: selectedPlan.price,
        planId: selectedPlan.id,
        projectType,
        currentTools: normalizedTools,
        mainPain: normalizedProblem,
      });
    } catch {
      setErrorMessage("Could not submit the application. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        ref={successRef}
        tabIndex={-1}
        className={`rounded-2xl border border-[oklch(0.86_0.2_128_/_0.35)] bg-[oklch(0.1_0.018_135)] p-5 text-left outline-none md:p-6 ${className}`}
        aria-labelledby="application-success-title"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[oklch(0.9_0.22_128)] text-[oklch(0.065_0.015_135)]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[oklch(0.86_0.2_128)]">
          Application received
        </p>
        <h2 id="application-success-title" className="mt-3 text-3xl font-semibold leading-tight text-[oklch(0.98_0.006_270)]">
          Thanks. We will review your project manually.
        </h2>
        <p className="mt-4 text-base leading-7 text-[oklch(0.76_0.014_270)]">
          We sent the confirmation to {submittedEmail}. You have not been charged.
          If your project is a fit for the current early access group, the next
          email will include the Stripe link for the selected plan and expected
          onboarding timing.
        </p>

        <div className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-[oklch(0.66_0.012_270)]">Selected plan</span>
            <span className="text-sm font-semibold text-[oklch(0.94_0.006_270)]">
              {selectedPlan.name} - {selectedPlan.price}
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-[oklch(0.66_0.012_270)]">Payment status</span>
            <span className="text-sm font-semibold text-[oklch(0.94_0.006_270)]">No charge today</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {[
            "Confirmation email: selected plan, price, and application details.",
            "Manual review: we check whether your project fits the current build.",
            "Approval email: accepted projects receive the Stripe activation link.",
          ].map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-[oklch(0.78_0.014_270)]">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[oklch(0.86_0.2_128)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/16 bg-white/[0.045] px-5 text-sm font-bold text-[oklch(0.9_0.006_270)] transition hover:border-white/28 hover:bg-white/[0.07]"
          >
            Back to overview
          </Link>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSubmittedEmail("");
              setHasStarted(false);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[oklch(0.9_0.22_128)] px-5 text-sm font-bold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)]"
          >
            Submit another application
          </button>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-left md:p-6 ${className}`} noValidate>
      <input type="hidden" name="selectedPlan" value={`${selectedPlan.name} - ${selectedPlan.price}`} />
      {status === "error" ? (
        <div className="mb-5 flex gap-3 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm leading-6 text-red-100" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-none text-red-300" />
          <div>
            <p className="font-semibold text-red-50">Check the application details</p>
            <p className="mt-1 text-red-100/85">{errorMessage}</p>
          </div>
        </div>
      ) : null}
      <div className="grid gap-4">
        <FormField label="Selected plan">
          <input
            value={`${selectedPlan.name} - ${selectedPlan.price}`}
            readOnly
            onFocus={markApplicationStarted}
            className="min-h-11 w-full rounded-lg border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-[oklch(0.84_0.012_270)] outline-none"
          />
        </FormField>
        <FormField label="Email">
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
            }}
            onFocus={markApplicationStarted}
            placeholder="you@studio.com"
            className="min-h-11 w-full rounded-lg border border-white/16 bg-[oklch(0.07_0.012_270)] px-4 text-base text-[oklch(0.98_0.006_270)] outline-none transition placeholder:text-[oklch(0.5_0.012_270)] focus:border-[oklch(0.9_0.22_128)] focus:ring-2 focus:ring-[oklch(0.9_0.22_128_/_0.28)]"
            disabled={status === "loading"}
          />
        </FormField>
        <FormField label="What are you making?">
          <select
            value={projectType}
            onChange={(event) => {
              setProjectType(event.target.value);
              setStatus("idle");
            }}
            onFocus={markApplicationStarted}
            className="min-h-11 w-full rounded-lg border border-white/16 bg-[oklch(0.07_0.012_270)] px-4 text-base text-[oklch(0.98_0.006_270)] outline-none transition focus:border-[oklch(0.9_0.22_128)] focus:ring-2 focus:ring-[oklch(0.9_0.22_128_/_0.28)]"
            disabled={status === "loading"}
          >
            {["Narrative short", "Series", "Music video", "Brand campaign", "Client work", "Other"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Which tools do you currently use?">
          <div className="grid gap-2 sm:grid-cols-2">
            {toolOptions.map((tool) => {
              const checked = selectedTools.includes(tool);
              return (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  disabled={status === "loading"}
                  className={`min-h-11 rounded-lg border px-4 text-left text-sm font-semibold transition ${
                    checked
                      ? "border-[oklch(0.9_0.22_128_/_0.7)] bg-[oklch(0.9_0.22_128_/_0.12)] text-[oklch(0.96_0.006_270)]"
                      : "border-white/16 bg-[oklch(0.07_0.012_270)] text-[oklch(0.72_0.012_270)] hover:text-[oklch(0.96_0.006_270)]"
                  }`}
                >
                  {tool}
                </button>
              );
            })}
          </div>
        </FormField>
        <FormField label="Biggest production problem">
          <textarea
            value={biggestProblem}
            onChange={(event) => {
              setBiggestProblem(event.target.value);
              setStatus("idle");
            }}
            onFocus={markApplicationStarted}
            placeholder="Continuity, characters changing, prompts scattered, shot planning..."
            className="min-h-28 w-full resize-y rounded-lg border border-white/16 bg-[oklch(0.07_0.012_270)] px-4 py-3 text-base text-[oklch(0.98_0.006_270)] outline-none transition placeholder:text-[oklch(0.5_0.012_270)] focus:border-[oklch(0.9_0.22_128)] focus:ring-2 focus:ring-[oklch(0.9_0.22_128_/_0.28)]"
            disabled={status === "loading"}
          />
        </FormField>
        <FormField label="Project link or portfolio (optional)">
          <input
            type="url"
            value={projectLink}
            onChange={(event) => {
              setProjectLink(event.target.value);
              setStatus("idle");
            }}
            onFocus={markApplicationStarted}
            placeholder="https://..."
            className="min-h-11 w-full rounded-lg border border-white/16 bg-[oklch(0.07_0.012_270)] px-4 text-base text-[oklch(0.98_0.006_270)] outline-none transition placeholder:text-[oklch(0.5_0.012_270)] focus:border-[oklch(0.9_0.22_128)] focus:ring-2 focus:ring-[oklch(0.9_0.22_128_/_0.28)]"
            disabled={status === "loading"}
          />
        </FormField>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[oklch(0.9_0.22_128)] px-5 text-sm font-bold text-[oklch(0.065_0.015_135)] transition hover:bg-[oklch(0.84_0.22_128)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[oklch(0.065_0.015_135_/_0.25)] border-t-[oklch(0.065_0.015_135)]" />
              Submitting application
            </>
          ) : (
            <>
              {selectedPlan.cta}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <p id="early-access-message" className="mt-3 min-h-5 text-sm text-[oklch(0.7_0.012_270)]" aria-live="polite">
        You are not charged when you apply. Accepted members receive the Stripe link for the selected plan.
      </p>
    </form>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[oklch(0.82_0.012_270)]">{label}</span>
      {children}
    </label>
  );
}
