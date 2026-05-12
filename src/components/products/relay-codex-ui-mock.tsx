import { Button } from "@/components/ui/button";
import {
	ChevronDown,
	Circle,
	FileText,
	Folder,
	Globe2,
	MessageSquare,
	MoreHorizontal,
	PanelLeftClose,
	Play,
	Plus,
	Send,
	Settings,
	Shield,
	Square,
} from "lucide-react";

export function RelayCodexUiMock() {
  return (
    <div className="relative mx-auto mt-10 h-full w-full max-w-[1120px] overflow-hidden rounded-[12px] border border-white/20 bg-[#07090d] shadow-[0px_18px_90px_0px_rgba(0,0,0,0.18)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(102,170,255,0.2),transparent_36%),radial-gradient(circle_at_82%_16%,rgba(86,132,255,0.18),transparent_34%),linear-gradient(180deg,rgba(14,27,51,0.35)_0%,rgba(7,12,24,0.2)_100%)]" />
      <div className="flex min-h-[700px] w-full text-[12px] text-white">
        <aside className="relative flex w-[23%] min-w-[220px] max-w-[256px] shrink-0 flex-col bg-transparent px-3 py-3 backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <PanelLeftClose className="ml-auto h-4 w-4 text-white/55" />
          </div>

          <button className="mb-5 inline-flex items-center gap-2 rounded-md py-1 text-[13px] text-white/82 transition hover:text-white">
            <Plus className="h-4 w-4 text-white/55" />
            <span>Neuer Chat</span>
          </button>

          <div className="mb-3 text-xs font-medium text-white/55">PROJECTS</div>
          <div className="mb-3 flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-semibold text-white/95">
            <Folder className="h-4 w-4 text-white/65" />
            <span>New Project</span>
          </div>
          <div className="mb-8 pl-7 text-[13px] text-white/55">No chats</div>

          <div className="mb-3 text-xs font-medium text-white/55">CHATS</div>
          <div className="text-[13px] font-medium text-white/38">No chats yet</div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 rounded-md px-1 py-1 text-[13px] font-semibold text-white/92">
              <Settings className="h-4 w-4 text-white/65" />
              <span>Settings</span>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 bg-transparent">
          <div className="-ml-px h-8 bg-transparent backdrop-blur-xl" />

          <div className="relative mt-px h-[calc(700px-2rem)] overflow-hidden rounded-tl-[22px] border border-white/18 border-r-0 border-b-0 bg-black">
            <header className="flex items-center justify-between px-3 py-3">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-white">New Project</span>
                <MoreHorizontal className="h-4 w-4 text-white/55" />
              </div>
              <div className="flex items-center gap-2.5 text-white/62">
                <Play className="h-3.5 w-3.5" />
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#2f8cff] px-2 py-1 text-white">
                  <Square className="h-3 w-3" />
                  <ChevronDown className="h-3 w-3" />
                </span>
                <MessageSquare className="h-3.5 w-3.5" />
                <Globe2 className="h-3.5 w-3.5" />
                <Square className="h-3.5 w-3.5" />
              </div>
            </header>

            <div className="absolute inset-x-0 bottom-0 top-[42px] flex items-center justify-center px-8">
              <div className="w-full max-w-[820px]">
                <h3 className="text-[16px] font-medium leading-tight text-white">
                  What should we get done?
                </h3>
                <p className="mt-2 text-[12px] text-white/68">
                  Start with your own task, or pick a quick idea below.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button className="inline-flex items-center gap-2 rounded-lg border border-white/18 bg-transparent px-3 py-2 text-left text-[12px] font-semibold text-white/95 transition hover:bg-white/5">
                    <FileText className="h-4 w-4 text-white/62" />
                    Research a topic
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-white/18 bg-transparent px-3 py-2 text-left text-[12px] font-semibold text-white/95 transition hover:bg-white/5">
                    <Folder className="h-4 w-4 text-white/62" />
                    Summarize project files
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-white/18 bg-transparent px-3 py-2 text-left text-[12px] font-semibold text-white/95 transition hover:bg-white/5">
                    <Shield className="h-4 w-4 text-white/62" />
                    Plan implementation
                  </button>
                </div>

                <div className="mt-3 rounded-2xl border border-white/15 bg-[#111111] p-3">
                  <div className="text-[12px] text-white/50">What should Relay do next?</div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-4 text-[12px] text-white/78">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-[#171a20]">
                        <Plus className="h-4 w-4" />
                      </span>
                      <span className="truncate">Model: Server default</span>
                      <span className="truncate">REASONING Mittel</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="h-8 w-8 rounded-full border-white/15 bg-[#171a20] text-white/65 hover:bg-white/10 hover:text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 text-[12px] text-white/75">
                    <Shield className="h-4 w-4" />
                    No approvals
                    <ChevronDown className="h-3 w-3" />
                  </div>
                  <Circle className="h-4 w-4 text-white/22" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
