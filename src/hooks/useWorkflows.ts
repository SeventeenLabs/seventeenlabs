'use client';

import { useState, useEffect } from 'react';

export interface WorkflowData {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  users: number;
  rating: number;
  integrations: string[];
  price: number;
  isFree: boolean;
  features?: string[];
  requirements?: string[];
  videoUrl?: string;
  mermaidChart?: string;
  previewChart?: string;
  stripeProductId?: string;
  stripePriceId?: string;
  tags?: string[];
  author?: string;
  version?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  // n8n integration fields
  n8nId?: string;
  n8nVersionId?: string;
  lastSyncAt?: string;
  n8nJsonUrl?: string;
  n8nData?: {
    nodes: any[];
    connections: any;
    settings?: any;
    staticData?: any;
    pinData?: any;
  };
}

interface UseWorkflowsOptions {
  search?: string;
  category?: string;
  popular?: boolean;
  highly_rated?: boolean;
  limit?: number;
  min_rating?: number;
}

export function useWorkflows(options?: UseWorkflowsOptions) {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (options?.search) params.set('search', options.search);
        if (options?.category) params.set('category', options.category);
        if (options?.popular) params.set('popular', 'true');
        if (options?.highly_rated) params.set('highly_rated', 'true');
        if (options?.limit) params.set('limit', options.limit.toString());
        if (options?.min_rating) params.set('min_rating', options.min_rating.toString());

        const response = await fetch(`/api/workflows?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch workflows: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setWorkflows(data.workflows);
        } else {
          throw new Error(data.error || 'Failed to fetch workflows');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, [options?.search, options?.category, options?.popular, options?.highly_rated, options?.limit, options?.min_rating]);

  return { workflows, loading, error };
}

export function useWorkflow(id: number) {
  const [workflow, setWorkflow] = useState<WorkflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/workflows/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Workflow not found');
          }
          throw new Error(`Failed to fetch workflow: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setWorkflow(data.workflow);
        } else {
          throw new Error(data.error || 'Failed to fetch workflow');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkflow();
    }
  }, [id]);

  return { workflow, loading, error };
}