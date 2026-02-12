"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Notification = {
  id: string;
  mentioned_agent_id: string;
  content: string;
  delivered: boolean;
  created_at: string;
  delivered_at?: string | null;
};

type Props = {
  notifications: Notification[];
  agents: { id: string; name: string }[];
};

export function NotificationsButton({ notifications, agents }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);

  useEffect(() => setItems(notifications), [notifications]);

  const unreadList = useMemo(
    () => items.filter((n) => !n.delivered),
    [items]
  );

  const sorted = useMemo(
    () => [...unreadList].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [unreadList]
  );

  const agentName = useMemo(() => Object.fromEntries(agents.map((a) => [a.id, a.name])), [agents]);

  const unread = unreadList.length;

  const markDelivered = async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, delivered: true, delivered_at: new Date().toISOString() } : n)));
    await supabase.from("notifications").update({ delivered: true, delivered_at: new Date().toISOString() }).eq("id", id);
  };

  useEffect(() => {
    const channel = supabase.channel("notifications-button");
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notifications" },
      (payload) => {
        if (payload.eventType === "DELETE") {
          setItems((prev) => prev.filter((n) => n.id !== (payload.old as any)?.id));
          return;
        }
        const row: any = payload.new;
        if (!row) return;
        setItems((prev) => {
          const next = prev.filter((n) => n.id !== row.id);
          return [row, ...next];
        });
      }
    );
    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-label="Open notifications"
        className="relative flex h-9 w-10 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
      >
        <span className="text-sm">🔔</span>
        {unread > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-72 max-h-80 overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
            <span>Notifications</span>
            <span className="text-[10px] text-slate-500">{sorted.length}</span>
          </div>
          <div className="p-2 space-y-2">
            {sorted.slice(0, 10).map((note) => (
              <div key={note.id} className="space-y-1 rounded border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
                <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide">
                  <span className="text-slate-600">{agentName[note.mentioned_agent_id] || "Agent"}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded px-2 py-0.5 bg-amber-100 text-amber-800">New</span>
                    <button
                      onClick={() => markDelivered(note.id)}
                      className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-700 hover:bg-slate-50"
                    >
                      Mark
                    </button>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-900">{note.content}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))}
            {sorted.length === 0 && (
              <div className="rounded border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-[10px] font-semibold text-slate-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
