import { supabaseAdmin } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

interface Notification {
  id: string;
  title?: string;
  message?: string;
  severity?: string;
  created_at: string;
  agent_id?: string;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function severityTone(severity?: string) {
  const key = (severity || "").toLowerCase();
  if (key.includes("error") || key.includes("critical")) return "destructive" as const;
  if (key.includes("warn")) return "secondary" as const;
  return "outline" as const;
}

export default async function NotificationsPage() {
  let notifications: Notification[] = [];
  let error: string | null = null;

  try {
    const { data, error: dbError } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (dbError) throw dbError;
    notifications = data || [];
  } catch (err: any) {
    error = err?.message || "Unable to load notifications";
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Internal</p>
          <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500">Central inbox for system alerts and agent updates.</p>
        </div>
        <Badge variant="outline" className="text-slate-600">
          {notifications.length} shown
        </Badge>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Failed to load notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-slate-800">Inbox</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 p-0">
            {notifications.length === 0 ? (
              <p className="px-6 py-8 text-sm text-slate-500">No notifications yet.</p>
            ) : (
              notifications.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      <Badge variant={severityTone(item.severity)} className="capitalize text-slate-700">
                        {item.severity || "info"}
                      </Badge>
                      <span>{item.title || "Untitled"}</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.message || "No message provided."}</p>
                    <div className="text-xs text-slate-500">
                      {item.agent_id ? `Agent ${item.agent_id} · ` : ""}{formatTime(item.created_at)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
