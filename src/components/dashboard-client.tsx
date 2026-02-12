"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/lib/supabase";

type AgentStatus = "running" | "idle" | "needs attention" | "paused";

type Agent = {
  id: string;
  name: string;
  status: AgentStatus;
  avatar: string;
  role?: string;
};

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
};

type Document = {
  id: string;
  title: string;
  content?: string | null;
  created_at?: string;
  task_id?: string | null;
  type?: string | null;
};

type Message = {
  id: string;
  task_id?: string | null;
  from_agent_id?: string | null;
  content: string;
  created_at?: string;
};

type Activity = {
  id: string;
  type: string;
  agent_id: string;
  message: string;
  created_at?: string;
};

type Notification = {
  id: string;
  mentioned_agent_id: string;
  content: string;
  delivered: boolean;
  created_at: string;
  delivered_at?: string | null;
};

type TaskAssignee = {
  task_id: string;
  agent_id: string;
  created_at?: string;
};

type Props = {
  agents: Agent[];
  tasksData: Task[];
  documents: Document[];
  messages: Message[];
  activities: Activity[];
  taskAssignees: TaskAssignee[];
  notifications?: Notification[];
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  connectionError?: string;
  errorDetails?: string;
  supabaseUrl?: string;
};

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleString();
}

function StatusBadge({ status }: { status: AgentStatus }) {
  const color =
    status === "running"
      ? "bg-emerald-100 text-emerald-800"
      : status === "idle"
      ? "bg-amber-100 text-amber-800"
      : "bg-rose-100 text-rose-800";
  return (
    <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${color}`}>
      {status}
    </span>
  );
}

export function DashboardClient(props: Props) {
  const {
    agents,
    tasksData,
    documents,
    messages,
    activities,
    taskAssignees,
    notifications = [],
    totalAgents,
    activeAgents,
    idleAgents,
    connectionError,
    errorDetails,
    supabaseUrl,
  } = props;

  const [agentList, setAgentList] = useState(agents);
  useEffect(() => setAgentList(agents), [agents]);

  const [taskList, setTaskList] = useState(tasksData);
  useEffect(() => setTaskList(tasksData), [tasksData]);

  const [documentList, setDocumentList] = useState(documents);
  useEffect(() => setDocumentList(documents), [documents]);

  const [messageList, setMessageList] = useState(messages);
  useEffect(() => setMessageList(messages), [messages]);

  const [activityList, setActivityList] = useState(activities);
  useEffect(() => setActivityList(activities), [activities]);

  const [taskAssigneeList, setTaskAssigneeList] = useState(taskAssignees);
  useEffect(() => setTaskAssigneeList(taskAssignees), [taskAssignees]);

  const [notificationList, setNotificationList] = useState(notifications ?? []);
  useEffect(() => setNotificationList(notifications ?? []), [notifications]);

  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(agents[0]?.id ?? null);
  // Start with no task selected so the drawer/modal stays closed on first load
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);

  const selectedTask = useMemo(
    () => taskList.find((t) => t.id === selectedTaskId) || null,
    [taskList, selectedTaskId]
  );

  const selectedAgent = useMemo(
    () => agentList.find((a) => a.id === selectedAgentId) || null,
    [agentList, selectedAgentId]
  );

  const taskMessages = useMemo(
    () => messageList.filter((m) => m.task_id === selectedTaskId),
    [messageList, selectedTaskId]
  );

  // Activities filtered by agents assigned to the selected task
  const recentActivities = useMemo(() => {
    if (!selectedTaskId) return [];
    const assignedAgentIds = taskAssigneeList
      .filter((ta) => ta.task_id === selectedTaskId)
      .map((ta) => ta.agent_id);
    return activityList.filter((a) => assignedAgentIds.includes(a.agent_id));
  }, [activityList, taskAssigneeList, selectedTaskId]);

  const taskAssigneeAgents = useMemo(() => {
    const ids = taskAssigneeList.filter((ta) => ta.task_id === selectedTaskId).map((ta) => ta.agent_id);
    return agentList.filter((a) => ids.includes(a.id));
  }, [agentList, taskAssigneeList, selectedTaskId]);

  const sortedNotifications = useMemo(
    () => [...notificationList].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [notificationList]
  );

  const relatedDocuments = useMemo(
    () => documentList.filter((d) => d.task_id === selectedTaskId),
    [documentList, selectedTaskId]
  );

  const selectedDocument = useMemo(
    () => documentList.find((d) => d.id === selectedDocumentId) || null,
    [documentList, selectedDocumentId]
  );

  // Get most recent activity for each agent
  const agentActivities = useMemo(() => {
    const activitiesByAgent = new Map<string, Activity>();
    const sorted = [...activityList].sort((a, b) => 
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
    for (const activity of sorted) {
      if (!activitiesByAgent.has(activity.agent_id)) {
        activitiesByAgent.set(activity.agent_id, activity);
      }
    }
    return activitiesByAgent;
  }, [activityList]);

  async function markTaskDone(taskId: string) {
    setTaskList((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "done", updated_at: new Date().toISOString() } : t)));
    await supabase.from("tasks").update({ status: "done", updated_at: new Date().toISOString() }).eq("id", taskId);
  }

  useEffect(() => {
    const channel = supabase.channel("dashboard-realtime");

    // Agents
    channel.on("postgres_changes", { event: "*", schema: "public", table: "agents" }, (payload) => {
      if (payload.eventType === "DELETE") {
        setAgentList((prev) => prev.filter((a) => a.id !== (payload.old as any)?.id));
        return;
      }
      const row: any = payload.new;
      if (!row) return;
      setAgentList((prev) => {
        const next = prev.filter((a) => a.id !== row.id);
        return [row, ...next];
      });
    });

    // Tasks
    channel.on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
      const row: any = payload.new;
      if (payload.eventType === "DELETE") {
        setTaskList((prev) => prev.filter((t) => t.id !== (payload.old as any)?.id));
        return;
      }
      if (!row) return;
      setTaskList((prev) => {
        const next = prev.filter((t) => t.id !== row.id);
        return [row, ...next];
      });
    });

    // Documents
    channel.on("postgres_changes", { event: "*", schema: "public", table: "documents" }, (payload) => {
      if (payload.eventType === "DELETE") {
        setDocumentList((prev) => prev.filter((d) => d.id !== (payload.old as any)?.id));
        return;
      }
      const row: any = payload.new;
      if (!row) return;
      setDocumentList((prev) => {
        const next = prev.filter((d) => d.id !== row.id);
        return [row, ...next];
      });
    });

    // Messages
    channel.on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
      if (payload.eventType === "DELETE") {
        setMessageList((prev) => prev.filter((m) => m.id !== (payload.old as any)?.id));
        return;
      }
      const row: any = payload.new;
      if (!row) return;
      setMessageList((prev) => {
        const next = prev.filter((m) => m.id !== row.id);
        return [row, ...next];
      });
    });

    // Activities
    channel.on("postgres_changes", { event: "*", schema: "public", table: "activities" }, (payload) => {
      if (payload.eventType === "DELETE") {
        setActivityList((prev) => prev.filter((a) => a.id !== (payload.old as any)?.id));
        return;
      }
      const row: any = payload.new;
      if (!row) return;
      setActivityList((prev) => {
        const next = prev.filter((a) => a.id !== row.id);
        return [row, ...next];
      });
    });

    // Task Assignees
    channel.on("postgres_changes", { event: "*", schema: "public", table: "task_assignees" }, (payload) => {
      if (payload.eventType === "DELETE") {
        setTaskAssigneeList((prev) =>
          prev.filter(
            (ta) => !(ta.task_id === (payload.old as any)?.task_id && ta.agent_id === (payload.old as any)?.agent_id)
          )
        );
        return;
      }
      const row: any = payload.new;
      if (!row) return;
      setTaskAssigneeList((prev) => {
        const next = prev.filter((ta) => !(ta.task_id === row.task_id && ta.agent_id === row.agent_id));
        return [row, ...next];
      });
    });

    // Notifications
    channel.on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, (payload) => {
      if (payload.eventType === "DELETE") {
        setNotificationList((prev) => prev.filter((n) => n.id !== (payload.old as any)?.id));
        return;
      }
      const row: any = payload.new;
      if (!row) return;
      setNotificationList((prev) => {
        const next = prev.filter((n) => n.id !== row.id);
        return [row, ...next];
      });
    });

    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="relative flex h-full flex-1 overflow-x-auto bg-slate-50">
      {!isLeftOpen && (
        <button
          onClick={() => setIsLeftOpen(true)}
          aria-label="Show agents"
          className="absolute left-0 top-1/2 z-20 flex h-14 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-r-md bg-slate-200 px-1 text-slate-700 shadow hover:bg-slate-300"
        >
          <span className="h-8 w-1 rounded bg-slate-400" />
        </button>
      )}

      {!isRightOpen && (
        <button
          onClick={() => setIsRightOpen(true)}
          aria-label="Show mission control"
          className="absolute right-0 top-1/2 z-20 flex h-14 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-l-md bg-slate-200 px-1 text-slate-700 shadow hover:bg-slate-300"
        >
          <span className="h-8 w-1 rounded bg-slate-400" />
        </button>
      )}

      {/* Agents Sidebar */}
      {isLeftOpen && (
        <aside className="relative flex w-80 flex-none flex-col border-r border-slate-200 bg-white shadow-sm">
          <button
            onClick={() => setIsLeftOpen(false)}
            aria-label="Hide agents"
            className="absolute -right-2 top-1/2 z-20 flex h-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 px-1 text-slate-700 shadow hover:bg-slate-300"
          >
            <span className="h-8 w-1 rounded bg-slate-400" />
          </button>
          <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
            <div className="flex flex-col leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Agents</p>
              <p className="text-[10px] text-slate-500">Select an agent</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            <div className="space-y-2">
              {agentList.map((agent) => {
                const latestActivity = agentActivities.get(agent.id);
                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left shadow-sm transition ${
                      selectedAgentId === agent.id
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        selectedAgentId === agent.id ? "bg-white text-slate-900" : "bg-slate-900 text-white"
                      }`}
                    >
                      {agent.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm font-bold ${selectedAgentId === agent.id ? "text-white" : "text-slate-900"}`}>
                        {agent.name}
                      </p>
                      <p className={`text-[10px] font-semibold uppercase tracking-wide ${
                        selectedAgentId === agent.id ? "text-slate-200" : "text-slate-500"
                      }`}>
                        {agent.role || "Agent"}
                      </p>
                      {latestActivity && (
                        <p className={`mt-1 truncate text-[10px] italic ${
                          selectedAgentId === agent.id ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {latestActivity.message}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={agent.status} />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      )}

      {/* Task Board */}
      <div className="flex min-w-0 flex-1 flex-col bg-slate-50">
          <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight text-slate-900">Task Board</h2>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {taskList.length} {taskList.length === 1 ? "Task" : "Tasks"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded border border-slate-300 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-700 hover:bg-slate-50">
              + New Task
            </button>
          </div>
        </div>

        {connectionError ? (
          <div className="m-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-semibold text-rose-900">{connectionError}</p>
            <div className="mt-2 text-xs text-rose-700">
              <p className="font-semibold">Target: {supabaseUrl || "NOT SET"}</p>
              <p className="mt-1">Check: Port 54321 reachable? PostgREST running?</p>
              {errorDetails ? (
                <details className="mt-2">
                  <summary className="cursor-pointer font-semibold">Error Details</summary>
                  <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-rose-100 p-2 text-[9px]">{errorDetails}</pre>
                </details>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 gap-3 overflow-x-auto p-4">
              {["inbox", "assigned", "in_progress", "review", "done"].map((status) => {
              const columnTasks = taskList.filter((t) => t.status === status);
              const labelMap = {
                inbox: "Inbox",
                assigned: "Assigned",
                in_progress: "In Progress",
                review: "Review",
                done: "Done",
              } as const;
              const label = labelMap[status as keyof typeof labelMap] || status;

              return (
                <div key={status} className="flex w-72 flex-shrink-0 flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-wide text-slate-900">{label}</h3>
                      <p className="text-[10px] font-semibold text-slate-500">
                        {columnTasks.length} {columnTasks.length === 1 ? "task" : "tasks"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 overflow-y-auto">
                    {columnTasks.length === 0 ? (
                      <div className="rounded-lg border-2 border-dashed border-slate-200 bg-white/50 p-4 text-center">
                        <p className="text-[10px] font-semibold text-slate-400">No tasks</p>
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <div
                          key={task.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedTaskId(task.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedTaskId(task.id);
                            }
                          }}
                          className="group w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                          <h4 className="text-xs font-bold leading-snug text-slate-900">{task.title}</h4>
                          {task.description ? (
                            <div className="mt-1.5 line-clamp-2 text-[10px] leading-relaxed text-slate-600">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ children }) => <span>{children}</span>,
                                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                }}
                              >
                                {task.description}
                              </ReactMarkdown>
                            </div>
                          ) : null}
                          <div className="mt-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                            <span>{formatDate(task.updated_at)}</span>
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">{task.status.replace("_", " ")}</span>
                          </div>
                          {status === "review" && (
                            <div className="mt-3 flex justify-end">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markTaskDone(task.id);
                                }}
                                className="rounded border border-emerald-300 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 hover:bg-emerald-100"
                              >
                                Mark Done
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mission Control Sidebar */}
      {isRightOpen && (
        <aside className="relative flex w-96 flex-none flex-col border-l border-slate-200 bg-white shadow-sm">
          <button
            onClick={() => setIsRightOpen(false)}
            aria-label="Hide mission control"
            className="absolute -left-2 top-1/2 z-20 flex h-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 px-1 text-slate-700 shadow hover:bg-slate-300"
          >
            <span className="h-8 w-1 rounded bg-slate-400" />
          </button>
          <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
            <div className="flex flex-col leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Mission Control</p>
              <p className="text-[10px] text-slate-500">Activity & Overview</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
            <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3 shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              <span>Agents</span>
              <span className="text-lg font-bold text-slate-900">{agentList.length}</span>
            </div>
            <div className="flex gap-2 text-[9px] font-semibold uppercase tracking-wide">
              <span className="text-emerald-700">{agentList.filter((a) => a.status === "running").length} Active</span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-700">{agentList.filter((a) => a.status === "idle").length} Idle</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] font-semibold uppercase tracking-wide text-slate-600">
              {["inbox", "assigned", "in_progress", "review", "done"].map((status) => {
                const count = tasksData.filter((t) => t.status === status).length;
                return (
                  <div key={status} className="flex items-center justify-between rounded border border-slate-200 bg-white px-2 py-1">
                    <span>{status.replace("_", " ")}</span>
                    <span className="text-slate-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Active Agents</p>
              <span className="text-[10px] text-slate-500">{agentList.filter((a) => a.status === "running").length}</span>
            </div>
            <div className="space-y-2">
              {agentList.filter((a) => a.status === "running").length > 0 ? (
                agentList
                  .filter((a) => a.status === "running")
                  .map((agent) => (
                    <div key={agent.id} className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-2 py-2">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                        {agent.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10px] font-bold text-slate-900">{agent.name}</p>
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">{agent.role || "Agent"}</p>
                      </div>
                      <div className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-emerald-500" />
                    </div>
                  ))
              ) : (
                <div className="rounded border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-[10px] font-semibold text-slate-500">
                  No active agents
                </div>
              )}
            </div>
          </div>

            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Recent Activity</p>
              <span className="text-[10px] text-slate-500">Last 5</span>
            </div>
            <div className="space-y-2">
              {taskList.slice(0, 5).map((task) => (
                <div key={task.id} className="relative rounded border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                    <span className="rounded bg-white px-1.5 py-0.5 text-slate-700">{task.status.replace("_", " ")}</span>
                    <span>{formatDate(task.updated_at)}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-bold text-slate-900">{task.title}</p>
                </div>
              ))}
              {taskList.length === 0 && (
                <div className="rounded border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-[10px] font-semibold text-slate-500">
                  No activity yet
                </div>
              )}
            </div>
          </div>

            <div id="notifications-panel" className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Notifications</p>
                <span className="text-[10px] text-slate-500">{sortedNotifications.length}</span>
              </div>
              <div className="space-y-2">
                {sortedNotifications.slice(0, 6).map((note) => {
                  const agent = agentList.find((a) => a.id === note.mentioned_agent_id);
                  return (
                    <div key={note.id} className="rounded border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
                      <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide">
                        <span className="text-slate-600">{agent?.name || "Unknown Agent"}</span>
                        <span
                          className={`rounded px-2 py-0.5 ${note.delivered ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                        >
                          {note.delivered ? "Delivered" : "New"}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] font-medium text-slate-900">{note.content}</p>
                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-500">{formatDate(note.created_at)}</p>
                    </div>
                  );
                })}
                {sortedNotifications.length === 0 && (
                  <div className="rounded border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-[10px] font-semibold text-slate-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>

            {selectedAgent && (
            <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Selected Agent</p>
                <StatusBadge status={selectedAgent.status} />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {selectedAgent.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-900">{selectedAgent.name}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">{selectedAgent.role || "Agent"}</p>
                </div>
              </div>
            </div>
            )}
          </div>
        </aside>
      )}

      {/* Task Detail Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-slate-900/50 p-6">
          <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                  <span className="rounded bg-slate-900 px-2 py-0.5 text-white">{selectedTask.status.replace("_", " ")}</span>
                  <span>{formatDate(selectedTask.updated_at)}</span>
                </div>
                <h2 className="text-xl font-black leading-tight text-slate-900">{selectedTask.title}</h2>
              </div>
              <button
                onClick={() => setSelectedTaskId(null)}
                className="rounded p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-[11px] font-black uppercase tracking-wide text-slate-900">Description</h3>
                  {selectedTask.description ? (
                    <div className="mt-3 text-sm leading-relaxed text-slate-700">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          code: ({ inline, children }: any) =>
                            inline ? (
                              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-900">{children}</code>
                            ) : (
                              <code className="block rounded bg-slate-900 p-3 text-sm text-slate-100">{children}</code>
                            ),
                          ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
                          ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
                        }}
                      >
                        {selectedTask.description}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">No description</p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Assignees</span>
                    <div className="flex -space-x-2">
                      {taskAssigneeAgents.length === 0 ? (
                        <span className="text-[10px] text-slate-500">None</span>
                      ) : (
                        taskAssigneeAgents.map((agent) => (
                          <span
                            key={`${selectedTask.id}-${agent.id}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-slate-900 text-[9px] font-bold text-white shadow"
                          >
                            {agent.avatar}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-900">Messages ({taskMessages.length})</h4>
                    <div className="mt-3 space-y-3">
                      {taskMessages.length === 0 ? (
                        <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                          <p className="text-sm font-semibold text-slate-500">No messages yet</p>
                        </div>
                      ) : (
                        taskMessages.map((msg) => {
                          const agent = agentList.find((a) => a.id === msg.from_agent_id);
                          return (
                            <div key={msg.id} className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
                                {agent?.avatar || "??"}
                              </div>
                              <div className="flex-1 rounded border border-slate-200 bg-white p-3 shadow-sm">
                                <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold text-slate-600">
                                  <span>{agent?.name || "Unknown"}</span>
                                  <span>·</span>
                                  <span>{formatDate(msg.created_at)}</span>
                                </div>
                                <div className="text-xs leading-relaxed text-slate-700">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                      em: ({ children }) => <em className="italic">{children}</em>,
                                    }}
                                  >
                                    {msg.content}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-900">Activity</h4>
                    <div className="mt-3 space-y-2">
                      {recentActivities.length === 0 ? (
                        <p className="text-[10px] text-slate-500">No activity yet</p>
                      ) : (
                        recentActivities.slice(0, 10).map((activity) => (
                          <div key={activity.id} className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                            <div>
                              <p className="text-[10px] font-semibold text-slate-900">{activity.message}</p>
                              <p className="text-[9px] text-slate-500">{formatDate(activity.created_at)}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {relatedDocuments.length > 0 && (
                    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-900">Documents</h4>
                      <div className="mt-3 space-y-2">
                        {relatedDocuments.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{doc.title}</p>
                              <p className="text-[10px] text-slate-500">{formatDate(doc.created_at)}</p>
                            </div>
                            <button
                              onClick={() => setSelectedDocumentId(doc.id)}
                              className="rounded border border-slate-300 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 hover:bg-slate-100"
                            >
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Document</p>
                <h2 className="text-xl font-black leading-tight text-slate-900">{selectedDocument.title}</h2>
                <p className="text-[10px] text-slate-500">Created {formatDate(selectedDocument.created_at)}</p>
              </div>
              <button
                onClick={() => setSelectedDocumentId(null)}
                className="rounded p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-white px-8 py-8">
              {selectedDocument.content ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="mb-4 text-2xl font-black text-slate-900">{children}</h1>,
                    h2: ({ children }) => <h2 className="mb-3 mt-6 text-xl font-black text-slate-900">{children}</h2>,
                    h3: ({ children }) => <h3 className="mb-2 mt-4 text-lg font-bold text-slate-900">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed text-slate-700">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
                    em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
                    ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6">{children}</ol>,
                    li: ({ children }) => <li className="text-slate-700">{children}</li>,
                    code: ({ inline, children }: any) =>
                      inline ? (
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-900">{children}</code>
                      ) : (
                        <code className="block rounded bg-slate-900 p-4 text-sm text-slate-100">{children}</code>
                      ),
                  }}
                >
                  {selectedDocument.content}
                </ReactMarkdown>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">No content</div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
