"use client";

import { useState } from "react";
import { Search, Clock, Users, Star, Zap, Database, Mail, Calendar, ShoppingCart, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { workflows } from "@/lib/workflows-data";
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
  const [selectedCategory, setSelectedCategory] = useState("All Workflows");
  const { isPurchased, userEmail } = usePurchase();
  
  // Check if we're on a workflows subdomain
  const isWorkflowsSubdomain = typeof window !== 'undefined' && /^workflows\./i.test(window.location.host);
  
  // Helper function to get the correct link path
  const getWorkflowLink = (id: number) => {
    return isWorkflowsSubdomain ? `/${id}` : `/workflows/${id}`;
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === "Free") {
      matchesCategory = workflow.isFree;
    } else if (selectedCategory === "Premium") {
      matchesCategory = !workflow.isFree;
    } else if (selectedCategory !== "All Workflows") {
      matchesCategory = workflow.category === selectedCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

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
            {workflows.length} workflow templates available
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Integrations */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer">
                <div className={`p-1 rounded ${integration.color}`}>
                  <integration.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-200 border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(workflow.difficulty)}>
                      {workflow.difficulty}
                    </Badge>
                    {workflow.isFree ? (
                      <Badge className="bg-green-100 text-green-700">
                        Free
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-700">
                        ${workflow.price}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {workflow.rating}
                  </div>
                </div>
                <Link href={getWorkflowLink(workflow.id)}>
                  <CardTitle className="text-lg group-hover:text-slate-600 transition-colors cursor-pointer">
                    {workflow.title}
                  </CardTitle>
                </Link>
                <CardDescription className="text-sm leading-relaxed">
                  {workflow.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {workflow.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {workflow.users}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  {workflow.integrations.slice(0, 3).map((integration) => {
                    const integrationData = integrations.find(i => i.name === integration);
                    return integrationData ? (
                      <div key={integration} className={`p-1 rounded ${integrationData.color}`}>
                        <integrationData.icon className="h-3 w-3 text-white" />
                      </div>
                    ) : null;
                  })}
                  {workflow.integrations.length > 3 && (
                    <span className="text-xs text-slate-500">+{workflow.integrations.length - 3}</span>
                  )}
                </div>

                <Link href={getWorkflowLink(workflow.id)}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`w-full transition-colors ${
                      (workflow.isFree || isPurchased(workflow.id))
                        ? "group-hover:bg-green-600 group-hover:text-white" 
                        : "group-hover:bg-slate-900 group-hover:text-white"
                    }`}
                  >
                    {(workflow.isFree || isPurchased(workflow.id)) ? (
                      <div className="flex items-center gap-2">
                        {isPurchased(workflow.id) && <Check className="h-4 w-4" />}
                        {workflow.isFree ? "Download Free" : "Download"}
                      </div>
                    ) : (
                      `Buy for $${workflow.price}`
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-slate-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Need a custom workflow?</h2>
          <p className="text-slate-600 mb-4">
            We build tailored automation solutions for your specific needs.
          </p>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  );
}