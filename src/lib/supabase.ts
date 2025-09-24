import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side Supabase client (for use in components and client-side code)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client with service role (for API routes and server-side operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Database types
export interface Database {
  public: {
    Tables: {
      workflows: {
        Row: {
          id: number;
          title: string;
          description: string;
          long_description: string | null;
          category: string;
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
          time: string;
          users: number;
          rating: number;
          integrations: string[];
          features: string[];
          requirements: string[];
          tags: string[];
          price: number;
          is_free: boolean;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          video_url: string | null;
          mermaid_chart: string | null;
          preview_chart: string | null;
          n8n_id: string | null;
          n8n_version_id: string | null;
          n8n_json_url: string | null;
          last_sync_at: string | null;
          author: string;
          version: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          long_description?: string | null;
          category: string;
          difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
          time: string;
          users?: number;
          rating?: number;
          integrations?: string[];
          features?: string[];
          requirements?: string[];
          tags?: string[];
          price?: number;
          is_free?: boolean;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          video_url?: string | null;
          mermaid_chart?: string | null;
          preview_chart?: string | null;
          n8n_id?: string | null;
          n8n_version_id?: string | null;
          n8n_json_url?: string | null;
          last_sync_at?: string | null;
          author?: string;
          version?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          long_description?: string | null;
          category?: string;
          difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
          time?: string;
          users?: number;
          rating?: number;
          integrations?: string[];
          features?: string[];
          requirements?: string[];
          tags?: string[];
          price?: number;
          is_free?: boolean;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          video_url?: string | null;
          mermaid_chart?: string | null;
          preview_chart?: string | null;
          n8n_id?: string | null;
          n8n_version_id?: string | null;
          n8n_json_url?: string | null;
          last_sync_at?: string | null;
          author?: string;
          version?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}

// Export typed clients
export type SupabaseClient = typeof supabase;
export type WorkflowRow = Database['public']['Tables']['workflows']['Row'];
export type WorkflowInsert = Database['public']['Tables']['workflows']['Insert'];
export type WorkflowUpdate = Database['public']['Tables']['workflows']['Update'];