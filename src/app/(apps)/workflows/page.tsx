"use client";

import { useState, useEffect } from "react";
import { Search, Clock, Users, Star, Zap, Database, Mail, Calendar, ShoppingCart, MessageSquare, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useWorkflows } from "@/hooks/useWorkflows";
import { usePurchase } from "@/contexts/purchase-context";

const categories = [
  "All Workflows",
  "Free",
  "Premium",
  "Sales & CRM", 
  "Marketing",
  "E-commerce",
  "Data Processing",
  "Communication",
  "Finance",
  "HR & Recruiting"
];

const integrations = [
  { name: "Gmail", icon: Mail, color: "bg-red-500" },
  { name: "Slack", icon: MessageSquare, color: "bg-purple-500" },
  { name: "Shopify", icon: ShoppingCart, color: "bg-green-500" },
  { name: "Google Calendar", icon: Calendar, color: "bg-blue-500" },
  { name: "Airtable", icon: Database, color: "bg-orange-500" },
  { name: "Zapier", icon: Zap, color: "bg-yellow-500" },
];

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Workflows");
  const { isPurchased } = usePurchase();
  
  // Debounce search term to avoid too frequent API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Fetch workflows from API based on current filters
  const { workflows, loading, error } = useWorkflows({
    search: debouncedSearchTerm || undefined,
    // Only pass category to API if it's a real category, not Free/Premium
    category: (selectedCategory !== "All Workflows" && selectedCategory !== "Free" && selectedCategory !== "Premium") 
      ? selectedCategory 
      : undefined
  });
  
  // Check if we're on a workflows subdomain
  const isWorkflowsSubdomain = typeof window !== 'undefined' && /^workflows\./i.test(window.location.host);
  
  // Helper function to get the correct link path
  const getWorkflowLink = (id: number) => {
    return isWorkflowsSubdomain ? `/${id}` : `/workflows/${id}`;
  };

  // Filter workflows based on selected category
  const filteredWorkflows = workflows.filter(workflow => {
    if (selectedCategory === "Free") {
      return workflow.isFree === true;
    } else if (selectedCategory === "Premium") {
      return workflow.isFree === false;
    } else if (selectedCategory !== "All Workflows") {
      return workflow.category === selectedCategory;
    }
    return true; // Search filtering already handled by API
  });

  // Helper function to get count for each category
  const getCategoryCount = (category: string) => {
    if (category === "All Workflows") return workflows.length;
    if (category === "Free") return workflows.filter(w => w.isFree === true).length;
    if (category === "Premium") return workflows.filter(w => w.isFree === false).length;
    return workflows.filter(w => w.category === category).length;
  };

  // Debug logging for Premium filter issue
  if (selectedCategory === "Premium" && workflows.length > 0) {
    console.log('Debug Premium Filter:', {
      totalWorkflows: workflows.length,
      premiumWorkflows: workflows.filter(w => w.isFree === false),
      workflowPrices: workflows.map(w => ({ title: w.title, price: w.price, isFree: w.isFree }))
    });
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
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            Workflow Database
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Browse our collection of proven N8N workflows. Copy, customize, and deploy automation that works.
          </p>
          <div className="mt-6 text-sm text-slate-500">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading workflows...</span>
              </div>
            ) : (
              <div>
                {debouncedSearchTerm || selectedCategory !== "All Workflows" ? (
                  <span>
                    {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''} found
                    {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
                    {selectedCategory !== "All Workflows" && ` in ${selectedCategory}`}
                    {workflows.length !== filteredWorkflows.length && ` (filtered from ${workflows.length} total)`}
                  </span>
                ) : (
                  <span>{workflows.length} workflow templates available</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search workflows by name, integration, or feature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all duration-200 text-slate-900 placeholder-slate-400 bg-white shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <div className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center">
                  <span className="text-xs font-bold">×</span>
                </div>
              </button>
            )}
            {loading && debouncedSearchTerm && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {(debouncedSearchTerm || selectedCategory !== "All Workflows") && (
            <div className="flex flex-wrap items-center gap-3 justify-center bg-slate-50 p-4 rounded-lg">
              <span className="text-sm text-slate-600 font-medium">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {debouncedSearchTerm && (
                  <Badge variant="outline" className="bg-white text-slate-700 border-slate-300 px-3 py-1">
                    Search: "{debouncedSearchTerm}"
                    <button 
                      onClick={() => {
                        setSearchTerm("");
                        setDebouncedSearchTerm("");
                      }}
                      className="ml-2 hover:text-slate-900 text-slate-500 font-bold"
                      title="Clear search"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "All Workflows" && (
                  <Badge variant="outline" className="bg-white text-slate-700 border-slate-300 px-3 py-1">
                    Category: {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory("All Workflows")}
                      className="ml-2 hover:text-slate-900 text-slate-500 font-bold"
                      title="Clear category filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
              {(debouncedSearchTerm || selectedCategory !== "All Workflows") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setDebouncedSearchTerm("");
                    setSelectedCategory("All Workflows");
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 underline ml-2"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const count = getCategoryCount(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  disabled={loading}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                    selectedCategory === category
                      ? "bg-slate-900 text-white shadow-lg scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {category}
                  {!loading && count > 0 && selectedCategory !== category && (
                    <span className="ml-2 text-xs opacity-60">
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Integrations */}
        <div className="mb-10">
          <h3 className="text-center text-sm font-medium text-slate-600 mb-4">Popular Integrations</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((integration) => (
              <button 
                key={integration.name} 
                onClick={() => setSearchTerm(integration.name)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                title={`Search for ${integration.name} workflows`}
              >
                <div className={`p-1.5 rounded ${integration.color} group-hover:scale-110 transition-transform`}>
                  <integration.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{integration.name}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-3">Click an integration to find related workflows</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Error loading workflows</h3>
              <p className="text-slate-600">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Loading workflows...</h3>
              <p className="text-slate-600">Please wait while we fetch the latest workflows</p>
            </div>
          </div>
        )}

        {/* Workflow Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out border-0 shadow-sm hover:shadow-slate-200/60 flex flex-col h-full bg-white">
                <CardHeader className="pb-6 flex-shrink-0">
                  {/* Top badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`${getDifficultyColor(workflow.difficulty)} font-medium text-xs px-3 py-1`}>
                        {workflow.difficulty}
                      </Badge>
                      {workflow.isFree ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-xs px-3 py-1">
                          Free
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-600 bg-slate-50 border-slate-200 font-medium text-xs px-3 py-1">
                          ${workflow.price}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{workflow.rating}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <Link href={getWorkflowLink(workflow.id)} className="block mb-3">
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors cursor-pointer line-clamp-2 min-h-[3.5rem] leading-tight">
                      {workflow.title}
                    </CardTitle>
                  </Link>
                  
                  {/* Description */}
                  <CardDescription className="text-sm leading-relaxed text-slate-500 line-clamp-2 min-h-[2.5rem] mb-0">
                    {workflow.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 flex-grow flex flex-col">
                  {/* Metadata section */}
                  <div className="space-y-4 flex-grow">
                    {/* Stats */}
                    <div className="flex items-center gap-6 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{workflow.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">{workflow.users} users</span>
                      </div>
                    </div>
                    
                    {/* Integrations */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {workflow.integrations.slice(0, 4).map((integration) => {
                        const integrationData = integrations.find(i => i.name === integration);
                        return integrationData ? (
                          <div key={integration} className={`p-2 rounded-lg ${integrationData.color} shadow-sm`} title={integration}>
                            <integrationData.icon className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div key={integration} className="px-2.5 py-1.5 bg-slate-100 rounded-lg border" title={integration}>
                            <span className="text-xs text-slate-600 font-semibold">{integration.slice(0, 3).toUpperCase()}</span>
                          </div>
                        );
                      })}
                      {workflow.integrations.length > 4 && (
                        <div className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                          <span className="text-xs text-slate-500 font-medium">+{workflow.integrations.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <Link href={getWorkflowLink(workflow.id)} className="block">
                      <Button 
                        variant="outline" 
                        size="default"
                        className={`w-full h-11 transition-all duration-200 font-semibold text-sm ${
                          (workflow.isFree || isPurchased(workflow.id))
                            ? "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg active:scale-[0.98]" 
                            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-lg active:scale-[0.98]"
                        } ${isPurchased(workflow.id) ? "ring-2 ring-emerald-100" : ""}`}
                      >
                        {(workflow.isFree || isPurchased(workflow.id)) ? (
                          <div className="flex items-center justify-center gap-2">
                            {isPurchased(workflow.id) && <Check className="h-4 w-4" />}
                            <span>{workflow.isFree ? "Get Free Template" : "Access Template"}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span>Purchase for ${workflow.price}</span>
                          </div>
                        )}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredWorkflows.length === 0 && (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No workflows found</h3>
            <p className="text-slate-600">
              {searchTerm || selectedCategory !== "All Workflows" 
                ? "Try adjusting your search criteria or category filter."
                : "No workflows are currently available."
              }
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-slate-900 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-white mb-2">Need a custom workflow?</h2>
          <p className="text-slate-300 mb-8">
            We build tailored automation solutions for your specific needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="font-medium text-white text-sm">Custom Development</h3>
              </div>
              <p className="text-xs text-slate-400">Build workflows from scratch tailored to your exact requirements</p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Database className="h-4 w-4 text-green-400" />
                </div>
                <h3 className="font-medium text-white text-sm">Your Server Setup</h3>
              </div>
              <p className="text-xs text-slate-400">Configure workflows on your existing n8n instance with training</p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="font-medium text-white text-sm">Hosted by Me</h3>
              </div>
              <p className="text-xs text-slate-400">Fully managed n8n service with monitoring and maintenance</p>
            </div>
          </div>
          
          <Button 
            className="bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-900"
            onClick={() => window.open('mailto:hello@seventeenlabs.io?subject=Custom Workflow Services&body=Hi! I\'m interested in your custom workflow services.%0A%0APlease let me know:%0A- Which service would work best for my needs%0A- Timeline for development/setup%0A- Final pricing%0A- What information you\'ll need from me%0A%0AThanks!', '_blank')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  );
}