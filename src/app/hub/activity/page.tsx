import { supabaseAdmin } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

interface Activity {
  id: string;
  type?: string;
  description?: string;
  actor?: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function ActivityPage() {
  let activities: Activity[] = [];
  let error: string | null = null;

  try {
    const { data, error: dbError } = await supabaseAdmin
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (dbError) throw dbError;
    activities = data || [];
  } catch (err: any) {
    error = err?.message || "Unable to load activities";
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Internal</p>
          <h1 className="text-2xl font-semibold text-slate-900">Activity log</h1>
          <p className="text-sm text-slate-500">Latest signals from the multi-agent system.</p>
        </div>
        <Badge variant="outline" className="text-slate-600">
          {activities.length} shown
        </Badge>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Failed to load activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-slate-800">Recent entries</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 p-0">
            {activities.length === 0 ? (
              <p className="px-6 py-8 text-sm text-slate-500">No activity recorded yet.</p>
            ) : (
              activities.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      {item.type ? <Badge variant="secondary" className="text-slate-700">{item.type}</Badge> : null}
                      <span>{item.description || "No description"}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.actor ? `${item.actor} · ` : ""}{formatTime(item.created_at)}
                    </div>
                  </div>
                  {item.metadata ? (
                    <pre className="mt-2 max-h-32 overflow-auto rounded border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:mt-0 sm:max-w-xs">
                      {JSON.stringify(item.metadata, null, 2)}
                    </pre>
                  ) : null}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
