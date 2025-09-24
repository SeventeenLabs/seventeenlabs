"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Loader2, 
  AlertCircle, 
  Check, 
  X,
  Search,
  Users,
  Star,
  DollarSign,
  FileText
} from "lucide-react";
import { WorkflowData } from '@/hooks/useWorkflows';

interface WorkflowStats {
  total: number;
  active: number;
  inactive: number;
  free: number;
  premium: number;
  categories: Array<{category: string; count: number}>;
  totalUsers: number;
  averageRating: number;
}

export default function AdminWorkflowsPage() {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [stats, setStats] = useState<WorkflowStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWebhookUrl, setShowWebhookUrl] = useState(false);
  const [n8nSyncStats, setN8nSyncStats] = useState({
    lastSync: null as string | null,
    n8nWorkflows: 0,
    totalSynced: 0
  });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    time: '',
    users: 0,
    rating: 0,
    integrations: [] as string[],
    price: 0,
    features: [] as string[],
    requirements: [] as string[],
    videoUrl: '',
    mermaidChart: '',
    previewChart: '',
    tags: [] as string[]
  });

  const categories = [
    "Sales & CRM", 
    "Marketing",
    "E-commerce",
    "Data Processing",
    "Communication",
    "Finance",
    "HR & Recruiting",
    "AI Applications"
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const loadWorkflows = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/workflows');
      const data = await response.json();
      if (data.success) {
        setWorkflows(data.workflows);
        
        // Calculate n8n sync stats
        const n8nWorkflows = data.workflows.filter((w: WorkflowData) => w.n8nId);
        const lastSyncDates = n8nWorkflows
          .map((w: WorkflowData) => w.lastSyncAt)
          .filter(Boolean)
          .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());
        
        setN8nSyncStats({
          lastSync: lastSyncDates[0] || null,
          n8nWorkflows: n8nWorkflows.length,
          totalSynced: n8nWorkflows.length
        });
      }
    } catch (error) {
      console.error('Failed to load workflows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/workflows/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      category: '',
      difficulty: 'Beginner',
      time: '',
      users: 0,
      rating: 0,
      integrations: [],
      price: 0,
      features: [],
      requirements: [],
      videoUrl: '',
      mermaidChart: '',
      previewChart: '',
      tags: []
    });
    setEditingWorkflow(null);
    setShowForm(false);
  };

  const handleEdit = (workflow: WorkflowData) => {
    setFormData({
      title: workflow.title,
      description: workflow.description,
      longDescription: workflow.longDescription || '',
      category: workflow.category,
      difficulty: workflow.difficulty,
      time: workflow.time,
      users: workflow.users,
      rating: workflow.rating,
      integrations: workflow.integrations,
      price: workflow.price,
      features: workflow.features || [],
      requirements: workflow.requirements || [],
      videoUrl: workflow.videoUrl || '',
      mermaidChart: workflow.mermaidChart || '',
      previewChart: workflow.previewChart || '',
      tags: workflow.tags || []
    });
    setEditingWorkflow(workflow);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingWorkflow 
        ? `/api/workflows/${editingWorkflow.id}` 
        : '/api/workflows';
      
      const method = editingWorkflow ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await loadWorkflows();
        await loadStats();
        resetForm();
      } else {
        alert(data.error || 'Failed to save workflow');
      }
    } catch (error) {
      console.error('Failed to save workflow:', error);
      alert('Failed to save workflow');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await loadWorkflows();
        await loadStats();
      } else {
        alert(data.error || 'Failed to delete workflow');
      }
    } catch (error) {
      console.error('Failed to delete workflow:', error);
      alert('Failed to delete workflow');
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    loadWorkflows();
    loadStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Workflow Administration</h1>
        <p className="text-slate-600">Manage your workflow database</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active} active, {stats.inactive} inactive
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Streams</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.premium}</div>
              <p className="text-xs text-muted-foreground">
                {stats.free} free workflows
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all workflows
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                Out of 5.0 stars
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* n8n Sync Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            n8n Integration (SeventeenLabs_Workflow Tag)
          </CardTitle>
          <CardDescription>
            Sync workflows tagged with "SeventeenLabs_Workflow" from your n8n instance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-slate-600">n8n Workflows</span>
              <span className="text-2xl font-bold text-blue-600">{n8nSyncStats.n8nWorkflows}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-600">Total Synced</span>
              <span className="text-2xl font-bold text-green-600">{n8nSyncStats.totalSynced}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-600">Last Sync</span>
              <span className="text-sm font-medium text-slate-800">
                {n8nSyncStats.lastSync 
                  ? new Date(n8nSyncStats.lastSync).toLocaleString()
                  : 'Never'
                }
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="default"
              onClick={async () => {
                try {
                  const response = await fetch('/api/workflows/fetch-n8n', {
                    method: 'POST',
                    headers: { 'x-api-key': 'your-secret-api-key' }
                  });
                  const data = await response.json();
                  if (data.success) {
                    alert(`Fetch & Sync Complete: ${data.results.created} created, ${data.results.updated} updated`);
                    loadWorkflows(); // Refresh the workflows
                  } else {
                    alert('Fetch & Sync failed: ' + data.error);
                  }
                } catch (error) {
                  alert('Fetch & Sync error: ' + error);
                }
              }}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Fetch Tagged Workflows
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open('/api/workflows/fetch-n8n', '_blank')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview Tagged Workflows
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowWebhookUrl(!showWebhookUrl)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {showWebhookUrl ? 'Hide' : 'Show'} Webhook Setup
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/api/workflows/enhanced-sync', '_blank')}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Test Connection
            </Button>
          </div>
          {showWebhookUrl && (
            <div className="mt-4 p-3 bg-slate-50 rounded-lg space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">Method 1: Direct API Sync (Recommended)</p>
                <div className="bg-white p-2 rounded border">
                  <p className="text-xs mb-1">Environment Variables:</p>
                  <code className="text-xs block mb-1">N8N_API_BASE_URL=http://your-n8n-instance:5678</code>
                  <code className="text-xs block mb-2">N8N_API_KEY=your-n8n-api-key</code>
                  <p className="text-xs text-orange-600 font-medium">🏷️ Only syncs workflows tagged with "SeventeenLabs_Workflow"</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 mb-2">Method 2: Webhook URL for n8n:</p>
                <code className="text-xs bg-white p-2 rounded border block mb-3">
                  {typeof window !== 'undefined' ? `${window.location.origin}/api/workflows/n8n-sync` : '/api/workflows/n8n-sync'}
                </code>
                
                <p className="text-sm text-slate-600 mb-2">Authentication Headers:</p>
                <div className="bg-white p-2 rounded border">
                  <p className="text-xs mb-1">Add one of these headers to your n8n HTTP Request node:</p>
                  <code className="text-xs block mb-1">x-api-key: your-secret-api-key</code>
                  <p className="text-xs mb-1">OR</p>
                  <code className="text-xs block">Authorization: Bearer your-secret-api-key</code>
                </div>
              </div>
              
              <p className="text-xs text-slate-500">
                Configure the N8N_WEBHOOK_API_KEY environment variable for security.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex h-10 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Workflow
        </Button>

        <Button onClick={() => { loadWorkflows(); loadStats(); }} variant="outline" disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Workflow List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{workflow.title}</CardTitle>
                      {workflow.n8nId && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          n8n
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-1">
                      {workflow.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(workflow)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(workflow.id, workflow.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">
                    {workflow.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {workflow.category}
                  </Badge>
                  {workflow.isFree ? (
                    <Badge className="bg-green-100 text-green-700">Free</Badge>
                  ) : (
                    <Badge variant="outline">${workflow.price}</Badge>
                  )}
                  <Badge variant="outline">
                    {workflow.users} users
                  </Badge>
                  <Badge variant="outline">
                    ⭐ {workflow.rating}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600">
                  <p><strong>Integrations:</strong> {workflow.integrations.join(', ')}</p>
                  <p><strong>Setup Time:</strong> {workflow.time}</p>
                  <p><strong>Created:</strong> {new Date(workflow.createdAt).toLocaleDateString()}</p>
                  <p><strong>Updated:</strong> {new Date(workflow.updatedAt).toLocaleDateString()}</p>
                  {workflow.n8nId && (
                    <>
                      <p><strong>n8n ID:</strong> {workflow.n8nId}</p>
                      {workflow.lastSyncAt && (
                        <p><strong>Last Sync:</strong> {new Date(workflow.lastSyncAt).toLocaleString()}</p>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Workflow Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingWorkflow ? 'Edit Workflow' : 'Add New Workflow'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-none mb-2">Title *</label>
                    <input
                      id="title"
                      value={formData.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, title: e.target.value})}
                      required
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium leading-none mb-2">Category *</label>
                    <select 
                      id="category"
                      value={formData.category} 
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, category: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium leading-none mb-2">Description *</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
                    required
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="longDescription" className="block text-sm font-medium leading-none mb-2">Long Description</label>
                  <textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, longDescription: e.target.value})}
                    rows={4}
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium leading-none mb-2">Difficulty</label>
                    <select 
                      id="difficulty"
                      value={formData.difficulty} 
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, difficulty: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'})}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium leading-none mb-2">Setup Time *</label>
                    <input
                      id="time"
                      value={formData.time}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, time: e.target.value})}
                      placeholder="e.g., 15 min"
                      required
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium leading-none mb-2">Price ($)</label>
                    <input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                      min="0"
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="users" className="block text-sm font-medium leading-none mb-2">User Count</label>
                    <input
                      id="users"
                      type="number"
                      value={formData.users}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, users: parseInt(e.target.value) || 0})}
                      min="0"
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium leading-none mb-2">Rating</label>
                    <input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, rating: parseFloat(e.target.value) || 0})}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="integrations" className="block text-sm font-medium leading-none mb-2">Integrations (comma-separated) *</label>
                  <input
                    id="integrations"
                    value={formData.integrations.join(', ')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, integrations: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                    placeholder="Gmail, Slack, Airtable"
                    required
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="features" className="block text-sm font-medium leading-none mb-2">Features (comma-separated)</label>
                  <textarea
                    id="features"
                    value={formData.features.join(', ')}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, features: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium leading-none mb-2">Requirements (comma-separated)</label>
                  <textarea
                    id="requirements"
                    value={formData.requirements.join(', ')}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, requirements: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                    placeholder="Requirement 1, Requirement 2"
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="videoUrl" className="block text-sm font-medium leading-none mb-2">Video URL</label>
                  <input
                    id="videoUrl"
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, videoUrl: e.target.value})}
                    placeholder="https://example.com/video"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="mermaidChart" className="block text-sm font-medium leading-none mb-2">Mermaid Chart</label>
                  <textarea
                    id="mermaidChart"
                    value={formData.mermaidChart}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, mermaidChart: e.target.value})}
                    rows={6}
                    placeholder="flowchart LR..."
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingWorkflow ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingWorkflow ? 'Update Workflow' : 'Create Workflow'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}