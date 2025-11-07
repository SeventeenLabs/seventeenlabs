"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  X,
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

export default function AdminWorkflowsPage() {
  const router = useRouter();
  
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState<"all" | "free" | "paid">("all");
  const [sortBy, setSortBy] = useState<"title" | "createdAt" | "rating" | "users" | "price">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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
        // Stats loaded but not used in current UI
        console.log('Stats loaded:', data.stats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  // Handle edit
  const handleEdit = (workflow: WorkflowData) => {
    router.push(`/admin/workflows/edit/${workflow.id}`);
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

  // Filter workflows
  const filteredWorkflows = workflows
    .filter(workflow => {
      const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.integrations.some(int => int.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || workflow.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'active' && workflow.isActive) ||
                           (selectedStatus === 'inactive' && !workflow.isActive);
      const matchesPricing = selectedPricing === 'all' ||
                            (selectedPricing === 'free' && workflow.isFree) ||
                            (selectedPricing === 'paid' && !workflow.isFree);
      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus && matchesPricing;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      }
      
      if (sortBy === 'title') {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Workflow Management
              </h1>
              <p className="text-gray-600">Create, edit, and manage your workflow database</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-800">{workflows.length}</div>
                <div className="text-sm text-gray-500">Total Workflows</div>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-green-50"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSelectedStatus('active');
              setSelectedPricing('all');
              setSearchTerm('');
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-4 w-4 text-green-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-green-700 mb-1">
                {workflows.filter(w => w.isActive).length}
              </div>
              <div className="text-xs text-gray-500">
                {workflows.length > 0 ? ((workflows.filter(w => w.isActive).length / workflows.length) * 100).toFixed(1) : 0}% of {workflows.length} total
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-red-50"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSelectedStatus('inactive');
              setSelectedPricing('all');
              setSearchTerm('');
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Draft</CardTitle>
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-4 w-4 text-red-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-red-700 mb-1">
                {workflows.filter(w => !w.isActive).length}
              </div>
              <div className="text-xs text-gray-500">Need to be published</div>
            </CardContent>
          </Card>
          
          <Card 
            className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-green-50"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSelectedStatus('all');
              setSelectedPricing('free');
              setSearchTerm('');
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Free</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-green-700 mb-1">
                {workflows.filter(w => w.isFree || w.price === 0).length}
              </div>
              <div className="text-xs text-gray-500">No cost workflows</div>
            </CardContent>
          </Card>
          
          <Card 
            className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-blue-50"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSelectedStatus('all');
              setSelectedPricing('paid');
              setSearchTerm('');
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Premium</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-blue-700 mb-1">
                {workflows.filter(w => !w.isFree && w.price > 0).length}
              </div>
              <div className="text-xs text-gray-500">Paid workflows</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card className="mb-6 border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              {/* Main Search and Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search workflows, integrations, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowFilters(!showFilters)} 
                    variant={showFilters ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  
                  <Button onClick={() => {loadWorkflows(); loadStats();}} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  
                  <Button onClick={() => router.push('/admin/workflows/edit/new')} size="sm" className="bg-gray-900 hover:bg-gray-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workflow
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-gray-500 mb-2 block">CATEGORY</Label>
                      <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-gray-500 mb-2 block">DIFFICULTY</Label>
                      <select 
                        value={selectedDifficulty} 
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="all">All Difficulties</option>
                        {difficulties.map(diff => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-gray-500 mb-2 block">STATUS</Label>
                      <select 
                        value={selectedStatus} 
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-gray-500 mb-2 block">SORT BY</Label>
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="createdAt">Date Created</option>
                        <option value="title">Title</option>
                        <option value="rating">Rating</option>
                        <option value="users">Users</option>
                        <option value="price">Price</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-gray-500 mb-2 block">ORDER</Label>
                      <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>

                  {/* Filter Summary */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="text-sm text-gray-500">
                      Showing {filteredWorkflows.length} of {workflows.length} workflows
                    </div>
                    {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all' || searchTerm) && (
                      <Button 
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedDifficulty('all');
                          setSelectedStatus('all');
                          setSearchTerm('');
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Workflows List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading workflows...</p>
            </div>
          </div>
        ) : filteredWorkflows.length === 0 ? (
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="text-center py-16">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all'
                  ? "Try adjusting your filters or search terms"
                  : "Get started by creating your first workflow"
                }
              </p>
              {!searchTerm && selectedCategory === 'all' && selectedDifficulty === 'all' && selectedStatus === 'all' && (
                <Button onClick={() => router.push('/admin/workflows/edit/new')} className="bg-gray-900 hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Workflow
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex">
                  {/* Workflow Content */}
                  <div className="flex-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-gray-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg mb-2 flex items-center gap-2 text-gray-900">
                                {workflow.title}
                                {workflow.n8nId && (
                                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-300">
                                    n8n
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription className="text-gray-600 line-clamp-2 mb-3">
                                {workflow.description}
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                              {workflow.category}
                            </Badge>
                            <Badge variant={
                              workflow.difficulty === 'Beginner' ? 'default' : 
                              workflow.difficulty === 'Advanced' ? 'destructive' : 
                              'secondary'
                            } className={
                              workflow.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 border-green-200' :
                              workflow.difficulty === 'Advanced' ? 'bg-red-100 text-red-800 border-red-200' :
                              'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }>
                              {workflow.difficulty}
                            </Badge>
                            <Badge className={
                              workflow.isFree ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                            }>
                              {workflow.isFree ? 'Free' : `$${workflow.price}`}
                            </Badge>
                            <Badge className={
                              workflow.isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                            }>
                              {workflow.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {workflow.integrations.slice(0, 4).map((integration) => (
                              <Badge key={integration} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-300">
                                {integration}
                              </Badge>
                            ))}
                            {workflow.integrations.length > 4 && (
                              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-300">
                                +{workflow.integrations.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Main Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Time</span>
                          <div className="font-medium text-gray-900">{workflow.time}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Users</span>
                          <div className="font-medium text-gray-900">{workflow.users.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Rating</span>
                          <div className="font-medium text-gray-900 flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                            {workflow.rating}/5
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Created</span>
                          <div className="font-medium text-gray-900">
                            {new Date(workflow.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Content Status */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {workflow.mermaidChart ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            ✓ Diagram
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                            ✗ No Diagram
                          </Badge>
                        )}
                        {workflow.videoUrl && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                            ✓ Video
                          </Badge>
                        )}
                        {workflow.previewChart && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                            ✓ Preview
                          </Badge>
                        )}
                        {workflow.features && workflow.features.length > 0 && (
                          <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                            {workflow.features.length} Features
                          </Badge>
                        )}
                        {workflow.requirements && workflow.requirements.length > 0 && (
                          <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                            {workflow.requirements.length} Requirements
                          </Badge>
                        )}
                      </div>

                      {/* Integration Status */}
                      {workflow.stripeProductId && (
                        <div className="mb-4">
                          <div className="bg-green-50 border border-green-200 rounded-md px-3 py-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-green-800 font-medium text-sm">Stripe Connected</span>
                              <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">Active</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <div className="text-green-700">
                                <span className="font-medium">Product:</span>
                                <span className="ml-1 font-mono">{workflow.stripeProductId.substring(0, 24)}...</span>
                              </div>
                              {workflow.stripePriceId && (
                                <div className="text-green-700">
                                  <span className="font-medium">Price:</span>
                                  <span className="ml-1 font-mono">{workflow.stripePriceId.substring(0, 24)}...</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>

                  {/* Actions Sidebar */}
                  <div className="w-20 bg-gray-50 flex flex-col justify-center items-center gap-2 p-3 border-l border-gray-200">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(workflow)}
                      className="w-full h-8 bg-white hover:bg-gray-50 border-gray-300"
                      title="Edit workflow"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(workflow.id, workflow.title)}
                      className="w-full h-8 bg-white hover:bg-red-50 border-gray-300 hover:border-red-300 hover:text-red-600"
                      title="Delete workflow"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    {workflow.n8nJsonUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(workflow.n8nJsonUrl, '_blank')}
                        className="w-full h-8 bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300"
                        title="View JSON file"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}