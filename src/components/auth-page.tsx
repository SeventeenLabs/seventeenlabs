"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Film, LockKeyhole, Mail, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/utils";

type AuthMode = "signin" | "signup";

type AuthPageProps = {
  mode: AuthMode;
  locale?: Locale;
};

const authStorageKey = "seventeenlabs_studio_session";

export default function AuthPage({ mode, locale = "en" }: AuthPageProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [workspace, setWorkspace] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const homeHref = getLocalizedPath(locale, "/");
  const appHref = getLocalizedPath(locale, "/app");
  const alternateHref = getLocalizedPath(locale, isSignup ? "/signin" : "/signup");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    window.localStorage.setItem(
      authStorageKey,
      JSON.stringify({
        email,
        workspace: workspace || "Untitled studio",
        plan: "Creator",
        createdAt: new Date().toISOString(),
      })
    );

    window.setTimeout(() => {
      router.push(appHref);
    }, 350);
  }

  return (
    <main className="min-h-screen bg-[oklch(0.08_0.012_270)] text-[oklch(0.96_0.006_270)]">
      <div className="mx-auto grid min-h-screen w-full max-w-[90rem] gap-10 px-5 py-8 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="relative hidden min-h-[calc(100vh-4rem)] overflow-hidden rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] lg:block">
          <Image
            src="/images/seventeenlabs-ai-studio-hero.png"
            alt="AI film studio workspace"
            fill
            priority
            className="object-cover opacity-70"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.08_0.012_270_/_0.12),oklch(0.08_0.012_270_/_0.84))]" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[oklch(0.31_0.04_285)] bg-[oklch(0.12_0.018_270_/_0.72)] px-3 py-2 text-sm font-medium text-[oklch(0.82_0.05_292)] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              AI studio workspace
            </div>
            <h1 className="max-w-xl text-5xl font-semibold leading-tight">
              Build a story world, then generate the scenes around it.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[oklch(0.78_0.012_270)]">
              Keep scripts, characters, references, renders, versions, and release assets in one product workspace.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <Link href={homeHref} className="mb-10 flex items-center gap-3">
            <Image src="/logo.png" alt="SeventeenLabs" width={22} height={22} className="h-5.5 w-5.5 rounded-md object-contain" />
            <span className="text-sm font-semibold">SeventeenLabs</span>
          </Link>

          <div className="rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] p-6">
            <div className="mb-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-[oklch(0.16_0.03_285)]">
                {isSignup ? <Film className="h-5 w-5 text-[oklch(0.74_0.1_285)]" /> : <LockKeyhole className="h-5 w-5 text-[oklch(0.74_0.1_285)]" />}
              </div>
              <h1 className="text-3xl font-semibold">{isSignup ? "Create your studio" : "Sign in to SeventeenLabs"}</h1>
              <p className="mt-3 text-sm leading-6 text-[oklch(0.72_0.012_270)]">
                {isSignup
                  ? "Start with a project workspace for stories, characters, scenes, and generated assets."
                  : "Continue working on your stories, scenes, generated assets, and release packages."}
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              {isSignup ? (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[oklch(0.82_0.012_270)]">Workspace name</span>
                  <input
                    value={workspace}
                    onChange={(event) => setWorkspace(event.target.value)}
                    className="min-h-11 rounded-md border border-[oklch(0.25_0.014_270)] bg-[oklch(0.13_0.012_270)] px-3 text-sm outline-none transition focus:border-[oklch(0.5_0.09_285)] focus:ring-2 focus:ring-[oklch(0.5_0.09_285_/_0.24)]"
                    placeholder="Moon Harbor Studio"
                  />
                </label>
              ) : null}

              <label className="grid gap-2">
                <span className="text-sm font-medium text-[oklch(0.82_0.012_270)]">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[oklch(0.58_0.012_270)]" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    className="min-h-11 w-full rounded-md border border-[oklch(0.25_0.014_270)] bg-[oklch(0.13_0.012_270)] px-3 pl-10 text-sm outline-none transition focus:border-[oklch(0.5_0.09_285)] focus:ring-2 focus:ring-[oklch(0.5_0.09_285_/_0.24)]"
                    placeholder="you@studio.com"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-[oklch(0.82_0.012_270)]">Password</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  minLength={8}
                  className="min-h-11 rounded-md border border-[oklch(0.25_0.014_270)] bg-[oklch(0.13_0.012_270)] px-3 text-sm outline-none transition focus:border-[oklch(0.5_0.09_285)] focus:ring-2 focus:ring-[oklch(0.5_0.09_285_/_0.24)]"
                  placeholder="8 characters minimum"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[oklch(0.63_0.16_285)] px-4 text-sm font-semibold text-[oklch(0.98_0.004_270)] transition hover:bg-[oklch(0.69_0.15_285)] disabled:opacity-70"
              >
                {isSubmitting ? "Opening studio..." : isSignup ? "Create workspace" : "Sign in"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[oklch(0.68_0.012_270)]">
              {isSignup ? "Already have an account?" : "New to SeventeenLabs?"}{" "}
              <Link href={alternateHref} className="font-semibold text-[oklch(0.82_0.05_292)] hover:text-[oklch(0.9_0.05_292)]">
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
