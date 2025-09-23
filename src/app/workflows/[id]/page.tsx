"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Users, Star, Download, ShoppingCart, Play, Code, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { workflows } from "@/lib/workflows-data";
import MermaidDiagram from "@/components/mermaid-diagram";
import PurchaseModal from "@/components/purchase-modal";
import { usePurchase } from "@/contexts/purchase-context";

// Helper function to detect if we're on workflows subdomain
function isWorkflowsSubdomain(): boolean {
  if (typeof window === 'undefined') return false;
  return /^workflows\./i.test(window.location.hostname);
}

// Helper function to get the correct workflows list link
function getWorkflowsListLink(): string {
  return isWorkflowsSubdomain() ? "/" : "/workflows";
}

export default function WorkflowDetailPage() {
  const params = useParams();
  const workflowId = parseInt(params.id as string);
  const workflow = workflows.find(w => w.id === workflowId);
  const [activeTab, setActiveTab] = useState("overview");
  const [workflowsLink, setWorkflowsLink] = useState("/workflows");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { isPurchased, addPurchase } = usePurchase();

  useEffect(() => {
    setWorkflowsLink(getWorkflowsListLink());
  }, []);

  const handlePurchaseClick = () => {
    setShowPurchaseModal(true);
  };

  const handlePurchaseComplete = (workflowId: number) => {
    addPurchase(workflowId);
    setShowPurchaseModal(false);
  };

  // Check if user has purchased this workflow
  const isWorkflowPurchased = workflow ? (workflow.isFree || isPurchased(workflow.id)) : false;

  if (!workflow) {
    return (
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Workflow not found</h1>
          <Link href={workflowsLink}>
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
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={workflowsLink}>
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
                  {workflow.mermaidChart ? (
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
                  ) : (
                    <div className="bg-slate-100 rounded-lg p-8 text-center">
                      <Play className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Watch Demo</h3>
                      <p className="text-slate-600 mb-4">See this workflow in action</p>
                      <Button variant="outline">
                        <Play className="mr-2 h-4 w-4" />
                        Play Demo Video
                      </Button>
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
            <Card className="sticky top-8">
              <CardHeader>
                <div className="text-center">
                  {workflow.isFree ? (
                    <div className="text-2xl font-bold text-green-600 mb-2">Free</div>
                  ) : (
                    <div className="text-3xl font-bold text-slate-900 mb-2">${workflow.price}</div>
                  )}
                  <p className="text-sm text-slate-600">One-time purchase</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button 
                  onClick={handlePurchaseClick}
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

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-slate-900 mb-3">Integrations</h3>
                  <div className="space-y-2">
                    {workflow.integrations.map((integration) => (
                      <div key={integration} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        {integration}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-slate-900 mb-2">Support</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Get help with setup and customization
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
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