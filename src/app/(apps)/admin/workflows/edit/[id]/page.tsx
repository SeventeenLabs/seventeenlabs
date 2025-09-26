'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MermaidPreview from "@/components/mermaid-preview";
import { ArrowLeft, Save, Eye, EyeOff, Upload, Loader2, Sparkles, FileText } from "lucide-react";

interface WorkflowData {
  id?: number;
  title: string;
  description: string;
  longDescription: string;
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
  videoUrl: string;
  mermaidChart: string;
  previewChart: string;
  author: string;
  version: string;
}

export default function EditWorkflowPage() {
  const params = useParams();
  const router = useRouter();
  const workflowId = params.id as string;

  const [formData, setFormData] = useState<WorkflowData>({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    difficulty: 'Intermediate',
    time: '',
    users: 0,
    rating: 0,
    integrations: [],
    features: [],
    requirements: [],
    tags: [],
    price: 0,
    videoUrl: '',
    mermaidChart: '',
    previewChart: '',
    author: 'SeventeenLabs',
    version: '1.0'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

  // Load workflow data
  useEffect(() => {
    const loadWorkflow = async () => {
      try {
        const response = await fetch(`/api/workflows/${workflowId}`);
        const data = await response.json();
        
        if (data.success && data.workflow) {
          setFormData({
            id: data.workflow.id,
            title: data.workflow.title || '',
            description: data.workflow.description || '',
            longDescription: data.workflow.long_description || '',
            category: data.workflow.category || '',
            difficulty: data.workflow.difficulty || 'Intermediate',
            time: data.workflow.time || '',
            users: data.workflow.users || 0,
            rating: data.workflow.rating || 0,
            integrations: Array.isArray(data.workflow.integrations) ? data.workflow.integrations : [],
            features: Array.isArray(data.workflow.features) ? data.workflow.features : [],
            requirements: Array.isArray(data.workflow.requirements) ? data.workflow.requirements : [],
            tags: Array.isArray(data.workflow.tags) ? data.workflow.tags : [],
            price: data.workflow.price || 0,
            videoUrl: data.workflow.video_url || '',
            mermaidChart: data.workflow.mermaid_chart || '',
            previewChart: data.workflow.preview_chart || '',
            author: data.workflow.author || 'SeventeenLabs',
            version: data.workflow.version || '1.0'
          });
        } else {
          setMessage({ type: 'error', text: 'Failed to load workflow' });
        }
      } catch (error) {
        console.error('Error loading workflow:', error);
        setMessage({ type: 'error', text: 'Failed to load workflow' });
      } finally {
        setIsLoading(false);
      }
    };

    if (workflowId && workflowId !== 'new') {
      loadWorkflow();
    } else {
      setIsLoading(false);
    }
  }, [workflowId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const method = workflowId === 'new' ? 'POST' : 'PUT';
      const url = workflowId === 'new' ? '/api/workflows' : `/api/workflows/${workflowId}`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          longDescription: formData.longDescription,
          category: formData.category,
          difficulty: formData.difficulty,
          time: formData.time,
          users: formData.users,
          rating: formData.rating,
          integrations: formData.integrations,
          features: formData.features,
          requirements: formData.requirements,
          tags: formData.tags,
          price: formData.price,
          videoUrl: formData.videoUrl,
          mermaidChart: formData.mermaidChart,
          previewChart: formData.previewChart,
          author: formData.author,
          version: formData.version
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Workflow saved successfully!' });
        if (workflowId === 'new' && data.workflow?.id) {
          router.push(`/admin/workflows/edit/${data.workflow.id}`);
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save workflow' });
      }
    } catch (error) {
      console.error('Error saving workflow:', error);
      setMessage({ type: 'error', text: 'Failed to save workflow' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle array field updates
  const updateArrayField = (field: keyof Pick<WorkflowData, 'integrations' | 'features' | 'requirements' | 'tags'>, value: string) => {
    if (value.trim()) {
      const items = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({ ...prev, [field]: items }));
    } else {
      setFormData(prev => ({ ...prev, [field]: [] }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setMessage(null);
    }
  };

  // Handle analyze button click
  const handleAnalyze = async () => {
    if (!uploadedFile) {
      setMessage({ type: 'error', text: 'Please select a file first' });
      return;
    }

    setIsAnalyzing(true);
    setMessage({ type: 'success', text: '🔍 Analyzing workflow... Uploading file to n8n analyzer...' });

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      setMessage({ type: 'success', text: '⚡ Processing workflow with AI analyzer...' });

      const response = await fetch('/api/workflows/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: '🎉 Populating form fields with analyzed data...' });
        
        // Small delay to show the progress message
        await new Promise(resolve => setTimeout(resolve, 500));
        
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
          text: '✅ Workflow analyzed successfully! All fields have been auto-populated. Check the live preview on the right!' 
        });
      } else {
        setMessage({ type: 'error', text: `❌ ${data.error || 'Failed to analyze workflow'}` });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setMessage({ type: 'error', text: '❌ Failed to analyze workflow. Please check your connection and try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/admin/workflows')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {workflowId === 'new' ? 'Create Workflow' : 'Edit Workflow'}
            </h1>
            <p className="text-gray-600">
              {workflowId === 'new' ? 'Add a new workflow to your library' : `Editing workflow #${workflowId}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Analysis</CardTitle>
              <CardDescription>Upload an n8n workflow file to auto-populate fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="flex-1"
                  placeholder="Choose n8n workflow JSON file..."
                />
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              
              {!uploadedFile && (
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  💡 <strong>Tip:</strong> Upload your n8n workflow JSON file and click "Analyze" to automatically populate all form fields including title, description, integrations, and even generate a Mermaid diagram!
                </div>
              )}
              
              {uploadedFile && (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-sm font-medium text-blue-800">{uploadedFile.name}</span>
                      <p className="text-xs text-blue-600">Ready to analyze • {Math.round(uploadedFile.size / 1024)}KB</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Workflow
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Workflow title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select 
                    id="category"
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="longDescription">Detailed Description</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                    placeholder="Detailed explanation"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty *</Label>
                    <select 
                      id="difficulty"
                      value={formData.difficulty} 
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="time">Estimated Time *</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      placeholder="e.g., 30 min"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="users">Users</Label>
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
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arrays */}
            <Card>
              <CardHeader>
                <CardTitle>Tags & Classifications</CardTitle>
                <CardDescription>Use commas to separate multiple items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="integrations">Integrations</Label>
                  <Input
                    id="integrations"
                    value={formData.integrations.join(', ')}
                    onChange={(e) => updateArrayField('integrations', e.target.value)}
                    placeholder="Gmail, Slack, Google Sheets"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.integrations.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="features">Features</Label>
                  <Input
                    id="features"
                    value={formData.features.join(', ')}
                    onChange={(e) => updateArrayField('features', e.target.value)}
                    placeholder="Auto-trigger, Email notifications, Data processing"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.features.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Input
                    id="requirements"
                    value={formData.requirements.join(', ')}
                    onChange={(e) => updateArrayField('requirements', e.target.value)}
                    placeholder="Gmail account, API access, n8n setup"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.requirements.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => updateArrayField('tags', e.target.value)}
                    placeholder="automation, marketing, email, crm"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      value={formData.version}
                      onChange={(e) => setFormData({...formData, version: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mermaid Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Mermaid Chart</CardTitle>
                <CardDescription>Define the workflow diagram using Mermaid syntax</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.mermaidChart}
                  onChange={(e) => setFormData({...formData, mermaidChart: e.target.value})}
                  placeholder="flowchart TD&#10;    A([Start]) --> B[Process]&#10;    B --> C([End])"
                  rows={8}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} size="lg">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Workflow
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Mermaid Preview</CardTitle>
                <CardDescription>Real-time preview of your Mermaid diagram</CardDescription>
              </CardHeader>
              <CardContent>
                <MermaidPreview 
                  chart={formData.mermaidChart} 
                  className="min-h-[400px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{formData.title || 'Untitled Workflow'}</h3>
                  <p className="text-gray-600">{formData.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{formData.category}</Badge>
                  <Badge variant="outline">{formData.difficulty}</Badge>
                  <Badge variant="outline">{formData.time}</Badge>
                  {formData.price === 0 && <Badge variant="outline" className="bg-green-50">Free</Badge>}
                </div>

                {formData.integrations.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Integrations:</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.integrations.map((integration, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{integration}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}