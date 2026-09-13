import {
  Check,
  Circle,
  Clock3,
  MoreHorizontal,
  Plus,
  Send,
} from "lucide-react";

function GradientStage({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div
      className={`mx-auto rounded-xl bg-[radial-gradient(circle_at_20%_10%,rgba(167,197,255,0.36),transparent_40%),radial-gradient(circle_at_86%_14%,rgba(113,124,255,0.34),transparent_38%),radial-gradient(circle_at_50%_98%,rgba(24,86,255,0.35),transparent_54%)] p-3 ${
        compact
          ? "w-full max-w-[420px] min-h-[260px]"
          : "flex w-full max-w-[900px] items-center justify-center min-h-[360px] sm:min-h-[460px] lg:h-[600px] lg:min-h-[600px] lg:max-h-[600px] lg:w-[900px] lg:min-w-[900px] lg:max-w-[900px]"
      }`}
    >
      {children}
    </div>
  );
}

function ChatPhone({ withImage = false, withReviewCards = false }: { withImage?: boolean; withReviewCards?: boolean }) {
  return (
    <div className="mx-auto w-[300px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="max-h-[360px] space-y-2 overflow-hidden px-3 py-3 text-[12px] text-white/90">
        <div className="ml-auto w-[70%] rounded-2xl bg-white/15 px-3 py-2 text-[11px] leading-relaxed">
          {withReviewCards
            ? "Can you review this PR and call out the highest-risk issues first?"
            : withImage
              ? "Generate a cloud-themed hero image for my landing page using $imagegen"
              : "Hey Codex, implement dark mode"}
        </div>
        <p className="leading-relaxed text-white/90">
          {withReviewCards
            ? "I'll inspect the diff against main then report actionable findings with priorities."
            : withImage
              ? "I'll call the $imagegen skill, generate a cloud-themed image, and summarize what changed."
              : "I'll trace theme entry points, persist user preference, and prevent flash on load."}
        </p>
        <p className="text-white/55">Thought {withReviewCards ? "6s" : withImage ? "3s" : "8s"}</p>
        {!withReviewCards && (
          <>
            <div className="rounded-md bg-white/10 px-2 py-1 text-white/70">Edited {withImage ? "hero.tsx" : "theme.ts"}</div>
            <div className="rounded-md bg-white/10 px-2 py-1 text-white/70">Edited main.tsx</div>
          </>
        )}
        {withImage && (
          <div className="h-[128px] w-[160px] rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,#ecf7ff_0%,#9bc7ff_35%,#6ca1eb_100%)]" />
        )}
        {withReviewCards && (
          <>
            <div className="rounded-xl border border-white/15 bg-white/[0.02] p-2">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold">
                <span className="rounded bg-white/15 px-1.5 py-0.5">P1</span>
                Interval cleanup missing
              </div>
              <p className="text-white/75">startScheduler creates an interval but never returns a cleanup.</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/[0.02] p-2">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold">
                <span className="rounded bg-white/15 px-1.5 py-0.5">P2</span>
                Sidebar action not wired
              </div>
              <p className="text-white/75">UI item is present but handler is missing.</p>
            </div>
          </>
        )}
      </div>
      <div className="border-t border-white/12 p-3">
        <div className="text-[12px] text-white/65">Ask Codex anything</div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="inline-flex items-center gap-2 text-white/85">
            <Plus className="h-4 w-4" />
            GPT-5.4
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
            <Send className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

function SidebarOnly() {
  return (
    <div className="mx-auto w-[260px] rounded-2xl border border-white/15 bg-black p-3 text-[12px] text-white/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <MoreHorizontal className="ml-auto h-4 w-4 text-white/55" />
      </div>
      <div className="space-y-2">
        <div className="text-[18px] font-semibold text-white">New thread</div>
        <div className="text-[18px] font-semibold text-white/85">Automations</div>
        <div className="text-[18px] font-semibold text-white/85">Skills</div>
      </div>
      <p className="mt-6 text-white/55">Threads</p>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between rounded-md bg-white/14 px-2 py-1.5">
          <span>Create Codex app CTA</span>
          <span className="text-white/55">4h</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5 text-white/80">
          <span>Implement dark mode</span>
          <span className="text-white/55">8h</span>
        </div>
        <div className="mt-3 flex items-center justify-between px-2 py-1.5 text-white/80">
          <span>Add Status filter facet</span>
          <span className="text-white/55">3h</span>
        </div>
      </div>
    </div>
  );
}

function AutomationPanel() {
  const rows = [
    { title: "Check for Sentry crashes", app: "Sora", eta: "In progress", badge: "Every 2 hours" },
    { title: "Every morning", app: "Codex", eta: "Starts in 13m", badge: "Starts in 30m" },
    { title: "Find and fix a bug", app: "ChatGPT", eta: "Starts in 4h", badge: "Daily 8pm" },
  ];

  return (
    <div className="mx-auto w-full max-w-[620px] rounded-2xl border border-white/14 bg-black p-5 text-[13px] text-white/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <p className="mb-4 text-white/55">Up next</p>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.title} className="grid grid-cols-[14px_1fr_auto] items-center gap-3">
            <Circle className="h-4 w-4 text-white/65" />
            <div className="flex items-center gap-2">
              <span className="font-semibold">{row.title}</span>
              <span className="text-white/55">{row.app}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#35145f] px-2 py-1 text-[11px]">
                <Clock3 className="h-3 w-3" />
                {row.badge}
              </span>
            </div>
            <span className="text-white/55">{row.eta}</span>
          </div>
        ))}
      </div>
      <p className="mb-3 mt-8 text-white/55">Completed</p>
      <div className="space-y-3">
        <div className="grid grid-cols-[14px_1fr_auto] items-center gap-3">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
            <Check className="h-3 w-3" />
          </span>
          <span className="font-semibold">Check for Sentry crashes</span>
          <span className="text-white/55">1d</span>
        </div>
        <div className="grid grid-cols-[14px_1fr_auto] items-center gap-3">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
            <Check className="h-3 w-3" />
          </span>
          <span className="font-semibold">Find and fix a bug</span>
          <span className="text-white/55">1d</span>
        </div>
      </div>
    </div>
  );
}

export function RelaySectionMock({ variant }: { variant: 1 | 2 | 3 | 4 | 5 }) {
  if (variant === 2) {
    return (
      <GradientStage>
        <SidebarOnly />
      </GradientStage>
    );
  }

  if (variant === 4) {
    return (
      <GradientStage>
        <AutomationPanel />
      </GradientStage>
    );
  }

  if (variant === 3) {
    return (
      <GradientStage>
        <ChatPhone withImage />
      </GradientStage>
    );
  }

  if (variant === 5) {
    return (
      <GradientStage>
        <ChatPhone withReviewCards />
      </GradientStage>
    );
  }

  return (
    <GradientStage>
      <ChatPhone />
    </GradientStage>
  );
}

export function RelayCardMock({ variant }: { variant: 2 | 3 | 5 }) {
  const content =
    variant === 2 ? (
      <div className="origin-top scale-[0.62]">
        <SidebarOnly />
      </div>
    ) : variant === 3 ? (
      <div className="origin-top scale-[0.62]">
        <ChatPhone withImage />
      </div>
    ) : (
      <div className="origin-top scale-[0.62]">
        <ChatPhone withReviewCards />
      </div>
    );

  return (
    <div className="rounded-xl bg-[radial-gradient(circle_at_20%_10%,rgba(167,197,255,0.36),transparent_40%),radial-gradient(circle_at_86%_14%,rgba(113,124,255,0.34),transparent_38%),radial-gradient(circle_at_50%_98%,rgba(24,86,255,0.35),transparent_54%)] p-2">
      <div className="flex h-[220px] items-start justify-center overflow-hidden">
        {content}
      </div>
    </div>
  );
}
