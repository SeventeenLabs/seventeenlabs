import { supabaseAdmin } from "@/lib/supabase";
import { DashboardClient } from "@/components/dashboard-client";
import { NotificationsButton } from "@/components/notifications-button";

export const revalidate = 0;

type AgentStatus = "running" | "idle" | "needs attention" | "paused";

interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  avatar: string;
  role?: string;
}

function generateAvatar(name: string): string {
  const words = name.split(/[-\s]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function mapDbStatus(dbStatus: string): AgentStatus {
  if (dbStatus === "active") return "running";
  if (dbStatus === "blocked") return "needs attention";
  return "idle";
}

export default async function DashboardPage() {
  let agentsData: any[] = [];
  let tasksData: any[] = [];
  let documentsData: any[] = [];
  let messagesData: any[] = [];
  let activitiesData: any[] = [];
  let taskAssigneesData: any[] = [];
  let notificationsData: any[] = [];
  let connectionError: string | undefined = undefined;
  let errorDetails: string | undefined = undefined;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

  try {
    const [agentsResult, tasksResult, documentsResult, messagesResult, activitiesResult, taskAssigneesResult, notificationsResult] = await Promise.all([
      supabaseAdmin.from("agents").select("*").order("created_at", { ascending: false }),
      supabaseAdmin
        .from("tasks")
        .select("*")
        .order("updated_at", { ascending: false }),
      supabaseAdmin
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50),
      supabaseAdmin
        .from("task_assignees")
        .select("*"),
      supabaseAdmin
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    if (agentsResult.error) throw new Error(`Agents query: ${agentsResult.error.message}`);
    if (tasksResult.error) throw new Error(`Tasks query: ${tasksResult.error.message}`);
    if (documentsResult.error) throw new Error(`Documents query: ${documentsResult.error.message}`);
    if (messagesResult.error) throw new Error(`Messages query: ${messagesResult.error.message}`);
    if (activitiesResult.error) throw new Error(`Activities query: ${activitiesResult.error.message}`);
    if (taskAssigneesResult.error) throw new Error(`Task assignees query: ${taskAssigneesResult.error.message}`);
    if (notificationsResult.error) throw new Error(`Notifications query: ${notificationsResult.error.message}`);

    agentsData = agentsResult.data || [];
    tasksData = tasksResult.data || [];
    documentsData = documentsResult.data || [];
    messagesData = messagesResult.data || [];
    activitiesData = activitiesResult.data || [];
    taskAssigneesData = taskAssigneesResult.data || [];
    notificationsData = notificationsResult.data || [];
  } catch (error: any) {
    connectionError = error?.message || "Unknown error";
    errorDetails = JSON.stringify(error, null, 2);
    console.error("Dashboard data fetch error:", error);
  }

  const totalAgents = agentsData.length;
  const activeAgents = agentsData.filter((a) => a.status === "active").length;
  const idleAgents = agentsData.filter((a) => a.status === "idle").length;

  const agents: Agent[] = agentsData.map((a) => ({
    id: a.id,
    name: a.name,
    status: mapDbStatus(a.status),
    avatar: generateAvatar(a.name),
    role: a.role,
  }));

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold tracking-tight text-slate-900">
            SeventeenLabsHub
            <div className="text-xs font-normal text-slate-500">Dashboard</div>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <NotificationsButton
            notifications={notificationsData}
            agents={agents}
          />
          <button className="text-slate-400 hover:text-slate-600">⋯</button>
        </div>
      </header>

      <DashboardClient
        agents={agents}
        tasksData={tasksData}
        documents={documentsData}
        messages={messagesData}
        activities={activitiesData}
        taskAssignees={taskAssigneesData}
        notifications={notificationsData}
        totalAgents={totalAgents}
        activeAgents={activeAgents}
        idleAgents={idleAgents}
        connectionError={connectionError}
        errorDetails={errorDetails}
        supabaseUrl={supabaseUrl}
      />
    </div>
  );
}
