import Link from "next/link";
import {
  LayoutDashboard,
  Activity,
  Bell,
  ArrowRight,
  Cpu,
  ListChecks,
  Radio,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const navItems = [
  { href: "/hub/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hub/activity", label: "Activity", icon: Activity },
  { href: "/hub/notifications", label: "Notifications", icon: Bell },
];

const cards = [
  {
    href: "/hub/dashboard",
    title: "Dashboard",
    description:
      "Real-time view of agents, tasks, documents, and system health.",
    icon: LayoutDashboard,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    href: "/hub/activity",
    title: "Activity Log",
    description:
      "Chronological feed of every event across the multi-agent system.",
    icon: Activity,
    accent: "bg-violet-50 text-violet-600",
  },
  {
    href: "/hub/notifications",
    title: "Notifications",
    description:
      "Central inbox for alerts, warnings, and agent status changes.",
    icon: Bell,
    accent: "bg-amber-50 text-amber-600",
  },
];

const metrics = [
  { label: "Agents", icon: Cpu },
  { label: "Tasks", icon: ListChecks },
  { label: "Signals", icon: Radio },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function HubIndexPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ---- Sidebar ---- */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
            17
          </span>
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            SeventeenLabsHub
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <Icon className="h-4 w-4 text-gray-400" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 px-5 py-4">
          <p className="text-[11px] leading-relaxed text-gray-400">
            Internal control center.
            <br />
            Password-protected.
          </p>
        </div>
      </aside>

      {/* ---- Main column ---- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
          {/* Mobile brand (shown when sidebar hidden) */}
          <div className="flex items-center gap-2.5 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
              17
            </span>
            <span className="text-sm font-semibold text-gray-900">
              SeventeenLabsHub
            </span>
          </div>

          <div className="hidden items-center gap-1.5 md:flex">
            <h2 className="text-sm font-semibold text-gray-900">Overview</h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
              Hub
            </span>
          </div>

          <Link
            href="/hub/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Open Dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            {/* Greeting */}
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Pick a workspace below, or jump straight into the dashboard.
              </p>
            </div>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-3">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm"
                  >
                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">
                      {m.label}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                );
              })}
            </div>

            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link key={card.href} href={card.href} className="group">
                    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:border-gray-300 group-hover:shadow-md">
                      <div
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${card.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {card.title}
                      </h3>
                      <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-500">
                        {card.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors group-hover:text-gray-900">
                        Open
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Info row */}
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  System overview
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Agents
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Status, roles, and last activity per agent.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Tasks
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Queue, assignees, documents, and timelines.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Signals
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Notifications, errors, and system events.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">
                  Quick links
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
                      >
                        <Icon className="h-3.5 w-3.5 text-gray-400" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
