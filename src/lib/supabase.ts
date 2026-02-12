import { createClient } from '@supabase/supabase-js';

// Allow both server-only vars and public vars to support self-hosted and hosted setups
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or anon key missing. Set SUPABASE_URL / SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).');
}

// Client-side Supabase client (for use in components and client-side code)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client. Prefer service role if available; otherwise fall back to anon
// so read-only endpoints keep working without the service role key.
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey
);

// Database types
export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string;
          name: string;
          role: string;
          status: Database['public']['Enums']['agent_status'];
          current_task_id: string | null;
          session_key: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          status?: Database['public']['Enums']['agent_status'];
          current_task_id?: string | null;
          session_key: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          status?: Database['public']['Enums']['agent_status'];
          current_task_id?: string | null;
          session_key?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: Database['public']['Enums']['task_status'];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          status?: Database['public']['Enums']['task_status'];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: Database['public']['Enums']['task_status'];
          created_at?: string;
          updated_at?: string;
        };
      };
      task_assignees: {
        Row: {
          task_id: string;
          agent_id: string;
          created_at: string;
        };
        Insert: {
          task_id: string;
          agent_id: string;
          created_at?: string;
        };
        Update: {
          task_id?: string;
          agent_id?: string;
          created_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          title: string;
          content: string;
          type: string;
          task_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          type: string;
          task_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          type?: string;
          task_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          task_id: string;
          from_agent_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id: string;
          from_agent_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string;
          from_agent_id?: string;
          content?: string;
          created_at?: string;
        };
      };
      message_attachments: {
        Row: {
          message_id: string;
          document_id: string;
          created_at: string;
        };
        Insert: {
          message_id: string;
          document_id: string;
          created_at?: string;
        };
        Update: {
          message_id?: string;
          document_id?: string;
          created_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          type: string;
          agent_id: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          agent_id: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          agent_id?: string;
          message?: string;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          mentioned_agent_id: string;
          content: string;
          delivered: boolean;
          created_at: string;
          delivered_at: string | null;
        };
        Insert: {
          id?: string;
          mentioned_agent_id: string;
          content: string;
          delivered?: boolean;
          created_at?: string;
          delivered_at?: string | null;
        };
        Update: {
          id?: string;
          mentioned_agent_id?: string;
          content?: string;
          delivered?: boolean;
          created_at?: string;
          delivered_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Enums: {
      agent_status: 'idle' | 'active' | 'blocked';
      task_status: 'inbox' | 'assigned' | 'in_progress' | 'review' | 'done';
    };
  };
}

// Export typed clients and table types
export type SupabaseClient = typeof supabase;
export type Agent = Database['public']['Tables']['agents']['Row'];
export type AgentInsert = Database['public']['Tables']['agents']['Insert'];
export type AgentUpdate = Database['public']['Tables']['agents']['Update'];
export type Task = Database['public']['Tables']['tasks']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
export type TaskUpdate = Database['public']['Tables']['tasks']['Update'];
export type Document = Database['public']['Tables']['documents']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Activity = Database['public']['Tables']['activities']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type AgentStatus = Database['public']['Enums']['agent_status'];
export type TaskStatus = Database['public']['Enums']['task_status'];