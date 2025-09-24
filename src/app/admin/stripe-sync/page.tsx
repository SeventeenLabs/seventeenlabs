"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, RefreshCw, Loader2, AlertCircle } from "lucide-react";

interface SyncResult {
  workflowId: number;
  title: string;
  success: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
  error?: string;
}

interface WorkflowStatus {
  id: number;
  title: string;
  price: number;
  isFree: boolean;
  hasStripeProduct: boolean;
  hasStripePrice: boolean;
  stripeProductId: string | null;
  stripePriceId: string | null;
}

export default function AdminSyncPage() {
  const [syncResults, setSyncResults] = useState<SyncResult[]>([]);
  const [workflowStatuses, setWorkflowStatuses] = useState<WorkflowStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<{total: number; synced: number; unsynced: number} | null>(null);

  const checkSyncStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sync-workflows');
      const data = await response.json();
      setWorkflowStatuses(data.workflows);
      setSummary(data.summary);
    } catch (error) {
      console.error('Failed to check sync status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncAllWorkflows = async () => {
    setIsLoading(true);
    setSyncResults([]);
    
    try {
      const response = await fetch('/api/sync-workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sync-all',
        }),
      });

      const data = await response.json();
      setSyncResults(data.results || []);
      
      // Refresh status after sync
      await checkSyncStatus();
    } catch (error) {
      console.error('Failed to sync workflows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncSingleWorkflow = async (workflowId: number) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/sync-workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sync-one',
          workflowId: workflowId.toString(),
        }),
      });

      const data = await response.json();
      
      if (data.workflow) {
        // Update the specific workflow in the status list
        setWorkflowStatuses(prev => prev.map(w => 
          w.id === workflowId 
            ? { ...w, hasStripeProduct: true, hasStripePrice: !!data.workflow.stripePriceId }
            : w
        ));
      }
      
      // Refresh full status
      await checkSyncStatus();
    } catch (error) {
      console.error('Failed to sync workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          Stripe Sync Administration
        </h1>
        <p className="text-slate-600">
          Manage workflow synchronization with Stripe products and pricing.
        </p>
      </div>

      {/* Summary Card */}
      {summary && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sync Summary</CardTitle>
            <CardDescription>
              Overview of workflow synchronization status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{summary.total}</div>
                <div className="text-sm text-slate-600">Total Workflows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.synced}</div>
                <div className="text-sm text-slate-600">Synced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{summary.unsynced}</div>
                <div className="text-sm text-slate-600">Unsynced</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={checkSyncStatus}
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Check Status
        </Button>
        <Button 
          onClick={syncAllWorkflows}
          disabled={isLoading}
          className="bg-slate-900 hover:bg-slate-800"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sync All Workflows
        </Button>
      </div>

      {/* Sync Results */}
      {syncResults.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sync Results</CardTitle>
            <CardDescription>
              Results from the last synchronization operation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {syncResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    {result.success ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <div className="font-medium">{result.title}</div>
                      {result.error && (
                        <div className="text-sm text-red-600">{result.error}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    ID: {result.workflowId}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Status List */}
      {workflowStatuses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Workflow Status</CardTitle>
            <CardDescription>
              Individual workflow synchronization status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflowStatuses.map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{workflow.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {workflow.isFree ? 'Free' : `$${workflow.price}`}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        {workflow.hasStripeProduct ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        )}
                        Product: {workflow.hasStripeProduct ? 'Synced' : 'Not Synced'}
                      </div>
                      {!workflow.isFree && (
                        <div className="flex items-center gap-1">
                          {workflow.hasStripePrice ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          )}
                          Price: {workflow.hasStripePrice ? 'Synced' : 'Not Synced'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(!workflow.hasStripeProduct || (!workflow.isFree && !workflow.hasStripePrice)) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => syncSingleWorkflow(workflow.id)}
                        disabled={isLoading}
                      >
                        Sync
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}