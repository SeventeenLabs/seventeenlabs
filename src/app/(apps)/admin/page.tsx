"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Database, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Settings,
  RefreshCw,
  ArrowRight,
  Workflow,
  CreditCard,
  FileText,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalWorkflows: number;
  publishedWorkflows: number;
  totalRevenue: number;
  activeUsers: number;
  recentActivity: Array<{
    type: 'workflow' | 'purchase' | 'sync';
    message: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkflows: 0,
    publishedWorkflows: 0,
    totalRevenue: 0,
    activeUsers: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch workflows stats
      const workflowsResponse = await fetch('/api/workflows');
      const workflows = await workflowsResponse.json();
      
      // Calculate stats
      const totalWorkflows = Array.isArray(workflows) ? workflows.length : 0;
      const publishedWorkflows = Array.isArray(workflows) 
        ? workflows.filter((w: any) => !w.isDraft).length 
        : 0;

      // Mock revenue and users data (replace with real API calls)
      const mockStats: DashboardStats = {
        totalWorkflows,
        publishedWorkflows,
        totalRevenue: 12450.00, // This should come from Stripe/payment data
        activeUsers: 342, // This should come from user analytics
        recentActivity: [
          {
            type: 'workflow',
            message: 'New workflow "AI Content Generator" published',
            timestamp: '2 hours ago'
          },
          {
            type: 'purchase',
            message: 'Premium workflow purchased by user@example.com',
            timestamp: '4 hours ago'
          },
          {
            type: 'sync',
            message: 'Stripe products synchronized successfully',
            timestamp: '6 hours ago'
          }
        ]
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Manage Workflows",
      description: "View, edit, and publish workflows",
      icon: Workflow,
      href: "/admin/workflows",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Stripe Sync",
      description: "Synchronize products and pricing",
      icon: CreditCard,
      href: "/admin/stripe-sync",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "View Analytics",
      description: "Coming soon - User engagement metrics",
      icon: BarChart3,
      href: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      disabled: true
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workflow': return <Workflow className="w-4 h-4" />;
      case 'purchase': return <DollarSign className="w-4 h-4" />;
      case 'sync': return <RefreshCw className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'workflow': return 'text-blue-600 bg-blue-50';
      case 'purchase': return 'text-green-600 bg-green-50';
      case 'sync': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your SeventeenLabs platform</p>
        </div>
        <Button onClick={fetchDashboardStats} variant="outline" disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '--' : stats.totalWorkflows}</div>
            <p className="text-xs text-gray-600">
              {loading ? '--' : stats.publishedWorkflows} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${loading ? '--' : stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '--' : stats.activeUsers}</div>
            <p className="text-xs text-purple-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Healthy
              </Badge>
            </div>
            <p className="text-xs text-gray-600">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks and tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <div key={index}>
                {action.disabled ? (
                  <div className="flex items-center p-4 rounded-lg bg-gray-50 opacity-50 cursor-not-allowed">
                    <div className={`p-2 rounded-md ${action.bgColor} mr-4`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  </div>
                ) : (
                  <Link href={action.href}>
                    <div className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className={`p-2 rounded-md ${action.bgColor} mr-4`}>
                        <action.icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system events and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentActivity.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recent activity</p>
                ) : (
                  stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Platform Version</h4>
              <p className="text-gray-600">SeventeenLabs v2.1.0</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Last Backup</h4>
              <p className="text-gray-600">Today at 2:00 AM UTC</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Next Maintenance</h4>
              <p className="text-gray-600">Scheduled for Sunday 3:00 AM UTC</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}