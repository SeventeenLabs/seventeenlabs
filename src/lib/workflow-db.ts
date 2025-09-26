import fs from 'fs';
import path from 'path';

const WORKFLOWS_FILE = path.join(process.cwd(), 'data', 'workflows.json');

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
  previewChart?: string; // Obfuscated version for paid workflows
  stripeProductId?: string;
  stripePriceId?: string;
  // Database fields
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  tags?: string[];
  author?: string;
  version?: string;
  // n8n integration fields
  n8nId?: string;
  n8nVersionId?: string;
  lastSyncAt?: string;
  n8nData?: {
    nodes: any[];
    connections: any;
    settings?: any;
    staticData?: any;
    pinData?: any;
  };
}

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(WORKFLOWS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load workflows from file
const loadWorkflows = (): WorkflowData[] => {
  ensureDataDirectory();
  
  if (!fs.existsSync(WORKFLOWS_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(WORKFLOWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading workflows:', error);
    return [];
  }
};

// Save workflows to file
const saveWorkflows = (workflows: WorkflowData[]): void => {
  ensureDataDirectory();
  
  try {
    fs.writeFileSync(WORKFLOWS_FILE, JSON.stringify(workflows, null, 2));
  } catch (error) {
    console.error('Error saving workflows:', error);
    throw error;
  }
};

// Get next available ID
const getNextId = (): number => {
  const workflows = loadWorkflows();
  if (workflows.length === 0) return 1;
  return Math.max(...workflows.map(w => w.id)) + 1;
};

// Get all workflows (optionally filtered by active status)
export const getAllWorkflows = (activeOnly: boolean = true): WorkflowData[] => {
  const workflows = loadWorkflows();
  return activeOnly ? workflows.filter(w => w.isActive) : workflows;
};

// Get workflow by ID
export const getWorkflowById = (id: number): WorkflowData | null => {
  const workflows = loadWorkflows();
  return workflows.find(w => w.id === id && w.isActive) || null;
};

// Get workflows by category
export const getWorkflowsByCategory = (category: string): WorkflowData[] => {
  const workflows = loadWorkflows();
  return workflows.filter(w => w.category === category && w.isActive);
};

// Search workflows
export const searchWorkflows = (query: string): WorkflowData[] => {
  const workflows = loadWorkflows();
  const searchQuery = query.toLowerCase();
  
  return workflows.filter(w => 
    w.isActive && (
      w.title.toLowerCase().includes(searchQuery) ||
      w.description.toLowerCase().includes(searchQuery) ||
      w.longDescription?.toLowerCase().includes(searchQuery) ||
      w.tags?.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      w.integrations.some(integration => integration.toLowerCase().includes(searchQuery))
    )
  );
};

// Add a new workflow
export const addWorkflow = (workflowData: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): WorkflowData => {
  const workflows = loadWorkflows();
  
  const newWorkflow: WorkflowData = {
    ...workflowData,
    id: getNextId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  };
  
  workflows.push(newWorkflow);
  saveWorkflows(workflows);
  
  return newWorkflow;
};

// Update workflow
export const updateWorkflow = (id: number, updates: Partial<Omit<WorkflowData, 'id' | 'createdAt'>>): WorkflowData | null => {
  const workflows = loadWorkflows();
  const workflowIndex = workflows.findIndex(w => w.id === id);
  
  if (workflowIndex === -1) {
    return null;
  }
  
  workflows[workflowIndex] = {
    ...workflows[workflowIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveWorkflows(workflows);
  return workflows[workflowIndex];
};

// Soft delete workflow (set isActive to false)
export const deleteWorkflow = (id: number): boolean => {
  const workflows = loadWorkflows();
  const workflowIndex = workflows.findIndex(w => w.id === id);
  
  if (workflowIndex === -1) {
    return false;
  }
  
  workflows[workflowIndex].isActive = false;
  workflows[workflowIndex].updatedAt = new Date().toISOString();
  
  saveWorkflows(workflows);
  return true;
};

// Hard delete workflow (remove from database)
export const hardDeleteWorkflow = (id: number): boolean => {
  const workflows = loadWorkflows();
  const initialLength = workflows.length;
  const filteredWorkflows = workflows.filter(w => w.id !== id);
  
  if (filteredWorkflows.length === initialLength) {
    return false;
  }
  
  saveWorkflows(filteredWorkflows);
  return true;
};

// Get workflow statistics
export const getWorkflowStats = () => {
  const workflows = loadWorkflows();
  const activeWorkflows = workflows.filter(w => w.isActive);
  
  const categories = [...new Set(activeWorkflows.map(w => w.category))];
  const categoryStats = categories.map(category => ({
    category,
    count: activeWorkflows.filter(w => w.category === category).length,
  }));
  
  return {
    total: workflows.length,
    active: activeWorkflows.length,
    inactive: workflows.length - activeWorkflows.length,
    free: activeWorkflows.filter(w => w.isFree).length,
    premium: activeWorkflows.filter(w => !w.isFree).length,
    categories: categoryStats,
    totalUsers: activeWorkflows.reduce((sum, w) => sum + w.users, 0),
    averageRating: activeWorkflows.length > 0 
      ? activeWorkflows.reduce((sum, w) => sum + w.rating, 0) / activeWorkflows.length 
      : 0,
  };
};

// Get popular workflows (by users count)
export const getPopularWorkflows = (limit: number = 10): WorkflowData[] => {
  const workflows = loadWorkflows();
  return workflows
    .filter(w => w.isActive)
    .sort((a, b) => b.users - a.users)
    .slice(0, limit);
};

// Get highly rated workflows
export const getHighlyRatedWorkflows = (minRating: number = 4.5, limit: number = 10): WorkflowData[] => {
  const workflows = loadWorkflows();
  return workflows
    .filter(w => w.isActive && w.rating >= minRating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Bulk import workflows (useful for migrating from static data)
export const bulkImportWorkflows = (workflowsData: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>[]): WorkflowData[] => {
  const existingWorkflows = loadWorkflows();
  const now = new Date().toISOString();
  let nextId = getNextId();
  
  const newWorkflows = workflowsData.map(workflowData => ({
    ...workflowData,
    id: nextId++,
    createdAt: now,
    updatedAt: now,
    isActive: true,
  }));
  
  const allWorkflows = [...existingWorkflows, ...newWorkflows];
  saveWorkflows(allWorkflows);
  
  return newWorkflows;
};