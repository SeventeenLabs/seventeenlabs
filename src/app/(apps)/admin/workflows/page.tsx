"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Loader2, 
  Search,
  Star,
  DollarSign,
  FileText,
  Save,
  X,
  Upload,
  Download
} from "lucide-react";

interface WorkflowData {
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
  n8nId?: string;
  n8nVersionId?: string;
  lastSyncAt?: string;
  n8nJsonUrl?: string;
}

interface WorkflowStats {
  total: number;
  active: number;
  inactive: number;
  categories: Array<{category: string; count: number}>;
}

export default function AdminWorkflowsPage() {
  const router = useRouter();
  
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [stats, setStats] = useState<WorkflowStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [workflowFile, setWorkflowFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    difficulty: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced',
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
    tags: [] as string[],
    author: 'SeventeenLabs',
    version: '1.0'
  });

  const categories = [
    "Sales & CRM", 
    "Marketing",
    "E-commerce", 
    "Data Processing",
    "Communication",
    "Finance",
    "HR & Recruiting",
    "AI Applications",
    "Automation"
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  // Load workflows
  const loadWorkflows = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/workflows');
      const data = await response.json();
      if (data.success) {
        setWorkflows(data.workflows);
      }
    } catch (error) {
      console.error('Failed to load workflows:', error);
      setMessage({ type: 'error', text: 'Failed to load workflows' });
    }
    setIsLoading(false);
  };

  // Load stats
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

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      category: '',
      difficulty: 'Intermediate',
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
      tags: [],
      author: 'SeventeenLabs',
      version: '1.0'
    });
    setEditingWorkflow(null);
    setWorkflowFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (workflow: WorkflowData) => {
    router.push(`/admin/workflows/edit/${workflow.id}`);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const workflowData: any = {
        ...formData,
        isFree: formData.price === 0
      };

      // If there's a workflow file, upload it first
      if (workflowFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', workflowFile);
        uploadFormData.append('filename', `${formData.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`);

        const uploadResponse = await fetch('/api/workflows/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload workflow file');
        }

        // Add the file URL to the workflow data
        workflowData.n8nJsonUrl = uploadResult.fileUrl;
      }

      const url = editingWorkflow ? `/api/workflows/${editingWorkflow.id}` : '/api/workflows';
      const method = editingWorkflow ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflowData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Workflow ${editingWorkflow ? 'updated' : 'created'} successfully!` 
        });
        resetForm();
        loadWorkflows();
        loadStats();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save workflow' });
      }
    } catch (error) {
      console.error('Error saving workflow:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save workflow' });
    }

    setIsSubmitting(false);
  };

  // Handle delete
  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Workflow deleted successfully!' });
        loadWorkflows();
        loadStats();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete workflow' });
      }
    } catch (error) {
      console.error('Error deleting workflow:', error);
      setMessage({ type: 'error', text: 'Failed to delete workflow' });
    }
  };

  // Handle array field changes
  const handleArrayFieldChange = (field: string, value: string) => {
    if (value.trim()) {
      const items = value.split(',').map(item => item.trim()).filter(Boolean);
      setFormData(prev => ({ ...prev, [field]: items }));
    } else {
      setFormData(prev => ({ ...prev, [field]: [] }));
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    
    if (!file) {
      setWorkflowFile(null);
      return;
    }
    
    // Validate file type
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setFileError('Please select a valid JSON file');
      setWorkflowFile(null);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB');
      setWorkflowFile(null);
      return;
    }
    
    setWorkflowFile(file);
  };

  // Analyze workflow file and extract metadata
  const analyzeWorkflow = async () => {
    if (!workflowFile) {
      setMessage({ type: 'error', text: 'Please select a workflow file first' });
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', workflowFile);

      const response = await fetch('/api/workflows/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Update form data with analyzed metadata
        setFormData(prev => ({
          ...prev,
          title: data.data.title || prev.title,
          description: data.data.description || prev.description,
          longDescription: data.data.longDescription || prev.longDescription,
          category: data.data.category || prev.category,
          difficulty: data.data.difficulty || prev.difficulty,
          time: data.data.time || data.data.estimatedTime || prev.time,
          users: data.data.users || prev.users,
          rating: data.data.rating || prev.rating,
          integrations: data.data.integrations || prev.integrations,
          features: data.data.features || prev.features,
          requirements: data.data.requirements || prev.requirements,
          tags: data.data.tags || prev.tags,
          price: data.data.price || prev.price,
          videoUrl: data.data.videoUrl || prev.videoUrl,
          mermaidChart: data.data.mermaidChart || prev.mermaidChart,
          previewChart: data.data.previewChart || prev.previewChart,
          author: data.data.author || prev.author,
          version: data.data.version || prev.version
        }));

        setMessage({ 
          type: 'success', 
          text: 'Workflow analyzed successfully! Metadata has been populated.' 
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to analyze workflow' });
      }
    } catch (error) {
      console.error('Error analyzing workflow:', error);
      setMessage({ type: 'error', text: 'Failed to analyze workflow' });
    }
    setIsAnalyzing(false);
  };

  // Filter workflows
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

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Workflow Management</h1>
        <p className="text-slate-600">Create, edit, and manage your workflow database</p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <div className="flex items-center justify-between">
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
              <FileText className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories.length}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => {loadWorkflows(); loadStats();}} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button onClick={() => router.push('/admin/workflows/edit/new')} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Workflow
          </Button>
        </div>
      </div>

      {/* Workflows List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{workflow.title}</CardTitle>
                    <CardDescription className="mt-2">{workflow.description}</CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">{workflow.category}</Badge>
                      <Badge variant={workflow.difficulty === 'Beginner' ? 'default' : workflow.difficulty === 'Advanced' ? 'destructive' : 'secondary'}>
                        {workflow.difficulty}
                      </Badge>
                      <Badge variant={workflow.isFree ? 'default' : 'destructive'}>
                        {workflow.isFree ? 'Free' : `$${workflow.price}`}
                      </Badge>
                      {workflow.n8nId && <Badge variant="outline">n8n Sync</Badge>}
                      {workflow.n8nJsonUrl && <Badge variant="outline">JSON File</Badge>}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {workflow.integrations.slice(0, 3).map((integration) => (
                        <Badge key={integration} variant="outline" className="text-xs">
                          {integration}
                        </Badge>
                      ))}
                      {workflow.integrations.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{workflow.integrations.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(workflow)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(workflow.id, workflow.title)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Time:</span>
                    <div className="font-medium">{workflow.time}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Users:</span>
                    <div className="font-medium">{workflow.users.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Rating:</span>
                    <div className="font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                      {workflow.rating}/5
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Status:</span>
                    <div className={`font-medium ${workflow.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {workflow.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingWorkflow ? 'Edit Workflow' : 'Add New Workflow'}
                </CardTitle>
                <Button variant="outline" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select 
                      id="category"
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="longDescription">Long Description</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <select 
                      id="difficulty"
                      value={formData.difficulty} 
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value as any})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                    >
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="time">Time Required *</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      placeholder="e.g., 30 min"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="users">User Count</Label>
                    <Input
                      id="users"
                      type="number"
                      min="0"
                      value={formData.users}
                      onChange={(e) => setFormData({...formData, users: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="integrations">Integrations (comma-separated)</Label>
                  <Input
                    id="integrations"
                    value={formData.integrations.join(', ')}
                    onChange={(e) => handleArrayFieldChange('integrations', e.target.value)}
                    placeholder="Gmail, Slack, Airtable"
                  />
                </div>

                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Textarea
                    id="features"
                    value={formData.features.join(', ')}
                    onChange={(e) => handleArrayFieldChange('features', e.target.value)}
                    placeholder="Auto-sync, Real-time alerts, Custom fields"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements.join(', ')}
                    onChange={(e) => handleArrayFieldChange('requirements', e.target.value)}
                    placeholder="Gmail account, Slack workspace, API keys"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleArrayFieldChange('tags', e.target.value)}
                    placeholder="automation, crm, email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                      id="videoUrl"
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="workflowFile">Workflow JSON File</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="workflowFile"
                        ref={fileInputRef}
                        type="file"
                        accept=".json,application/json"
                        onChange={handleFileChange}
                        className="cursor-pointer flex-1"
                      />
                      <Button
                        type="button"
                        onClick={analyzeWorkflow}
                        disabled={!workflowFile || isAnalyzing}
                        variant="outline"
                        size="sm"
                      >
                        {isAnalyzing ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Upload className="h-4 w-4" />
                      <span>Upload the workflow JSON file exported from n8n, then click Analyze to auto-populate metadata</span>
                    </div>
                    {editingWorkflow?.n8nJsonUrl && (
                      <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4" />
                          <span className="font-medium">Current JSON file:</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <a 
                            href={editingWorkflow.n8nJsonUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-700 hover:underline text-sm break-all"
                          >
                            {editingWorkflow.n8nJsonUrl.split('/').pop()}
                          </a>
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(editingWorkflow.n8nJsonUrl, '_blank')}
                            className="ml-2 flex-shrink-0"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          Upload a new file to replace the current one
                        </p>
                      </div>
                    )}
                    {workflowFile && (
                      <div className="text-sm text-green-600">
                        ✓ Selected: {workflowFile.name} ({(workflowFile.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
                    {fileError && (
                      <div className="text-sm text-red-600">
                        ❌ {fileError}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="mermaidChart">Mermaid Chart</Label>
                  <Textarea
                    id="mermaidChart"
                    value={formData.mermaidChart}
                    onChange={(e) => setFormData({...formData, mermaidChart: e.target.value})}
                    placeholder="flowchart TD\n    A[Start] --> B[Process]"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {editingWorkflow ? 'Update' : 'Create'} Workflow
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