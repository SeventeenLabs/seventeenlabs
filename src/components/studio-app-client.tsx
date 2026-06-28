"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  Clapperboard,
  Film,
  FolderKanban,
  Layers3,
  LogOut,
  Play,
  Plus,
  Settings,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/utils";

type StudioAppClientProps = {
  locale?: Locale;
};

const authStorageKey = "seventeenlabs_studio_session";

const projects = [
  {
    title: "Moon Harbor",
    type: "Limited series",
    status: "Generating",
    progress: 76,
    scenes: 18,
  },
  {
    title: "Afterimage",
    type: "Proof trailer",
    status: "Review",
    progress: 54,
    scenes: 9,
  },
  {
    title: "Signal House",
    type: "Brand series",
    status: "Draft",
    progress: 28,
    scenes: 6,
  },
] as const;

const queue = [
  "Scene 04, wide exterior, rain pass",
  "Character continuity check, Mara",
  "Trailer cutdown, 30 seconds",
  "Poster key art, vertical",
] as const;

const assets = [
  { label: "Characters", value: "12" },
  { label: "Scenes", value: "33" },
  { label: "Exports", value: "18" },
  { label: "Review notes", value: "47" },
] as const;

export default function StudioAppClient({ locale = "en" }: StudioAppClientProps) {
  const [session, setSession] = React.useState<{ email?: string; workspace?: string; plan?: string } | null>(null);
  const signinHref = getLocalizedPath(locale, "/signin");
  const signupHref = getLocalizedPath(locale, "/signup");
  const homeHref = getLocalizedPath(locale, "/");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(authStorageKey);
    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch {
        setSession(null);
      }
    }
  }, []);

  function handleLogout() {
    window.localStorage.removeItem(authStorageKey);
    window.location.href = signinHref;
  }

  return (
    <main className="min-h-screen bg-[oklch(0.08_0.012_270)] text-[oklch(0.96_0.006_270)]">
      <div className="grid min-h-screen lg:grid-cols-[17rem_1fr]">
        <aside className="hidden border-r border-[oklch(0.22_0.015_270)] bg-[oklch(0.095_0.012_270)] p-4 lg:flex lg:flex-col">
          <Link href={homeHref} className="mb-8 flex items-center gap-3 px-2 py-2">
            <Image src="/logo.png" alt="SeventeenLabs" width={22} height={22} className="h-5 w-5 rounded-md object-contain" />
            <span className="text-sm font-semibold">SeventeenLabs</span>
          </Link>
          <nav className="grid gap-1">
            {[
              { icon: FolderKanban, label: "Projects", active: true },
              { icon: Film, label: "Scene lab" },
              { icon: Layers3, label: "Characters" },
              { icon: Clapperboard, label: "Exports" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-[oklch(0.16_0.026_275)] text-[oklch(0.96_0.006_270)]"
                    : "text-[oklch(0.68_0.012_270)] hover:bg-[oklch(0.12_0.014_270)] hover:text-[oklch(0.9_0.006_270)]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.12_0.014_270)] p-4">
            <p className="text-sm font-semibold">Creator plan</p>
            <p className="mt-2 text-xs leading-5 text-[oklch(0.68_0.012_270)]">Export 18 of 30 monthly scenes. Upgrade for 4K and team review seats.</p>
            <Link href={signupHref} className="mt-4 inline-flex min-h-9 w-full items-center justify-center rounded-md bg-[oklch(0.63_0.16_285)] px-3 text-xs font-semibold">
              Upgrade
            </Link>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-[oklch(0.22_0.015_270)] bg-[oklch(0.08_0.012_270_/_0.88)] px-5 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-[oklch(0.58_0.05_285)]">{session?.workspace || "SeventeenLabs Studio"}</p>
                <h1 className="mt-1 text-2xl font-semibold">Projects</h1>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={signinHref}
                  className="hidden min-h-10 items-center justify-center rounded-md border border-[oklch(0.26_0.014_270)] px-3 text-sm font-semibold text-[oklch(0.78_0.012_270)] transition hover:text-[oklch(0.96_0.006_270)] sm:inline-flex"
                >
                  Sign in
                </Link>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[oklch(0.26_0.014_270)] bg-[oklch(0.11_0.012_270)]">
                  <Bell className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[oklch(0.26_0.014_270)] bg-[oklch(0.11_0.012_270)]"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 px-5 py-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-6">
              <section className="rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold text-[oklch(0.82_0.05_292)]">Create</p>
                    <h2 className="mt-2 text-3xl font-semibold">Start a new movie or series</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[oklch(0.72_0.012_270)]">
                      Begin with a premise, reference images, a character profile, or a short script. The workspace will build the project bible around it.
                    </p>
                  </div>
                  <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[oklch(0.63_0.16_285)] px-4 text-sm font-semibold">
                    <Plus className="h-4 w-4" />
                    New project
                  </button>
                </div>
              </section>

              <section className="grid gap-4 lg:grid-cols-3">
                {projects.map((project) => (
                  <article key={project.title} className="rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase text-[oklch(0.58_0.012_270)]">{project.type}</p>
                        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                      </div>
                      <span className="rounded-md bg-[oklch(0.16_0.026_275)] px-2 py-1 text-xs text-[oklch(0.82_0.05_292)]">{project.status}</span>
                    </div>
                    <div className="mt-8">
                      <div className="mb-2 flex items-center justify-between text-xs text-[oklch(0.62_0.012_270)]">
                        <span>{project.scenes} scenes</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[oklch(0.2_0.012_270)]">
                        <div className="h-full rounded-full bg-[oklch(0.63_0.16_285)]" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                    <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.86_0.04_285)]">
                      Open project
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </article>
                ))}
              </section>

              <section className="rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Generation queue</h2>
                  <span className="rounded-md bg-[oklch(0.17_0.025_150)] px-2 py-1 text-xs text-[oklch(0.78_0.11_150)]">Live</span>
                </div>
                <div className="grid gap-3">
                  {queue.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-md border border-[oklch(0.22_0.014_270)] bg-[oklch(0.13_0.012_270)] p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.16_0.026_275)]">
                        {index === 0 ? <Wand2 className="h-4 w-4 text-[oklch(0.82_0.05_292)]" /> : <Play className="h-4 w-4 text-[oklch(0.82_0.05_292)]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{item}</p>
                        <p className="text-xs text-[oklch(0.62_0.012_270)]">{index === 0 ? "Rendering now" : "Queued"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="grid content-start gap-6">
              <section className="rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[oklch(0.74_0.1_285)]" />
                  <h2 className="text-lg font-semibold">Studio assets</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {assets.map((asset) => (
                    <div key={asset.label} className="rounded-md border border-[oklch(0.22_0.014_270)] bg-[oklch(0.13_0.012_270)] p-3">
                      <p className="text-2xl font-semibold">{asset.value}</p>
                      <p className="mt-1 text-xs text-[oklch(0.62_0.012_270)]">{asset.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-[oklch(0.24_0.014_270)] bg-[oklch(0.105_0.012_270)] p-5">
                <h2 className="text-lg font-semibold">Launch checklist</h2>
                <div className="mt-5 grid gap-3">
                  {["Trailer exported", "Poster approved", "Subtitles queued", "Social cuts drafted"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <BadgeCheck className={`h-5 w-5 ${index < 2 ? "text-[oklch(0.69_0.14_285)]" : "text-[oklch(0.38_0.012_270)]"}`} />
                      <span className="text-sm text-[oklch(0.78_0.012_270)]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
