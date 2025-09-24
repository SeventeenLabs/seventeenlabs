"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Users, Star, Download, ShoppingCart, Code, CheckCircle, Lock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useWorkflow } from "@/hooks/useWorkflows";
import MermaidDiagram from "@/components/mermaid-diagram";
import PurchaseModal from "@/components/purchase-modal";
import { usePurchase } from "@/contexts/purchase-context";

export default function WorkflowDetailPage() {
  const params = useParams();
  const workflowId = parseInt(params.id as string);
  const { workflow, loading, error } = useWorkflow(workflowId);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { isPurchased, refreshPurchases } = usePurchase();

  const handlePurchaseClick = () => {
    setShowPurchaseModal(true);
  };

  const handleDirectDownload = async () => {
    if (!workflow) return;

    try {
      // If we have a direct n8n JSON URL, use that instead of generating content
      if (workflow.n8nJsonUrl) {
        // Fetch the file and create a blob to force download
        const response = await fetch(workflow.n8nJsonUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${workflow.title.toLowerCase().replace(/\s+/g, '-')}-workflow.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }

      // Fallback: Generate content if no direct URL available
      let downloadContent;
      
      if (workflow.n8nData) {
        // Use the real n8n workflow format
        downloadContent = {
          name: workflow.title,
          nodes: workflow.n8nData.nodes,
          connections: workflow.n8nData.connections,
          active: false,
          settings: workflow.n8nData.settings || {},
          staticData: workflow.n8nData.staticData || {},
          pinData: workflow.n8nData.pinData || {},
          versionId: workflow.n8nVersionId || undefined,
          meta: {
            templateCredsSetupCompleted: false,
            instanceId: undefined
          },
          id: workflow.n8nId || undefined,
          tags: []
        };
    } else {
      // Fallback for workflows without n8n data - create a minimal n8n structure
      downloadContent = {
        name: workflow.title,
        nodes: [
          {
            parameters: {},
            type: "n8n-nodes-base.start",
            typeVersion: 1,
            position: [240, 300],
            id: "start-node",
            name: "Start"
          },
          {
            parameters: {
              notice: `This is a template for: ${workflow.title}\n\nDescription: ${workflow.description}\n\nIntegrations: ${workflow.integrations.join(', ')}\n\nPlease configure the nodes according to your needs.`
            },
            type: "n8n-nodes-base.noOp",
            typeVersion: 1,
            position: [460, 300],
            id: "template-info",
            name: "Template Info"
          }
        ],
        connections: {
          "Start": {
            "main": [
              [
                {
                  "node": "Template Info",
                  "type": "main",
                  "index": 0
                }
              ]
            ]
          }
        },
        active: false,
        settings: {},
        staticData: {},
        pinData: {},
        meta: {
          templateCredsSetupCompleted: false
        },
        tags: []
      };
    }

    // Create and download file
    const blob = new Blob([JSON.stringify(downloadContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.title.toLowerCase().replace(/\s+/g, '-')}-workflow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading workflow:', error);
    alert('Failed to download workflow. Please try again.');
  }
};

  const handlePurchaseComplete = async () => {
    // Refresh purchases from server to get the latest state
    await refreshPurchases();
    setShowPurchaseModal(false);
  };

  // Check if user has purchased this workflow
  const isWorkflowPurchased = workflow ? (workflow.isFree || isPurchased(workflow.id)) : false;

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Loader2 className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Loading workflow...</h1>
          <p className="text-slate-600">Please wait while we fetch the workflow details</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Error loading workflow</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/workflows">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workflows
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Workflow not found</h1>
          <Link href="/workflows">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workflows
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/workflows">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workflows
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={getDifficultyColor(workflow.difficulty)}>
                  {workflow.difficulty}
                </Badge>
                {workflow.isFree ? (
                  <Badge className="bg-green-100 text-green-700">Free</Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-700">${workflow.price}</Badge>
                )}
                <Badge variant="outline">{workflow.category}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
                {workflow.title}
              </h1>
              
              <p className="text-lg text-slate-600 mb-6">
                {workflow.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {workflow.time} setup
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {workflow.users} users
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {workflow.rating} rating
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-6">
              <nav className="flex space-x-8">
                {["overview", "features", "requirements"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? "border-slate-900 text-slate-900"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Overview</h2>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {workflow.longDescription}
                  </p>
                  
                  {/* Workflow Diagram */}
                  {workflow.mermaidChart && (
                    <div className="bg-slate-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                        <Code className="mr-2 h-5 w-5" />
                        Workflow Diagram
                      </h3>
                      {!workflow.isFree && !isWorkflowPurchased && workflow.previewChart && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 text-amber-800">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm font-medium">Preview Mode</span>
                          </div>
                          <p className="text-sm text-amber-700 mt-1">
                            Workflow structure shown with obfuscated step details. Purchase to see complete node labels and implementation specifics.
                          </p>
                        </div>
                      )}
                      <MermaidDiagram 
                        chart={(!workflow.isFree && !isWorkflowPurchased && workflow.previewChart) ? workflow.previewChart : workflow.mermaidChart} 
                        className="bg-white rounded-lg border border-slate-200 p-4"
                        isPreview={!workflow.isFree && !isWorkflowPurchased && !!workflow.previewChart}
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">What&apos;s Included</h2>
                  <div className="space-y-3">
                    {workflow.features?.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    )) || (
                      <p className="text-slate-600">Feature details coming soon.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "requirements" && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Requirements</h2>
                  <div className="space-y-3">
                    {workflow.requirements?.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{requirement}</span>
                      </div>
                    )) || (
                      <p className="text-slate-600">Requirements information coming soon.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 z-10 space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardHeader className="text-center">
                  {workflow.isFree ? (
                    <div className="text-2xl font-bold text-green-600 mb-2">Free</div>
                  ) : (
                    <div className="text-3xl font-bold text-slate-900 mb-2">${workflow.price}</div>
                  )}
                  <p className="text-sm text-slate-600">One-time purchase</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button 
                    onClick={isWorkflowPurchased ? handleDirectDownload : handlePurchaseClick}
                    className={`w-full ${
                      isWorkflowPurchased
                        ? "bg-green-600 hover:bg-green-700"
                        : workflow.isFree 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-slate-900 hover:bg-slate-800"
                    } text-white`}
                    size="lg"
                  >
                    {isWorkflowPurchased ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download Workflow
                      </>
                    ) : workflow.isFree ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download Free
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Integrations Card */}
              <Card>
                <CardHeader>
                  <h3 className="font-medium text-slate-900">Integrations</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {workflow.integrations.map((integration) => (
                      <div key={integration} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        {integration}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {workflow && (
        <PurchaseModal
          workflow={workflow}
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}
    </main>
  );
}