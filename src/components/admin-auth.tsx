"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

interface AdminAuthProps {
  children: React.ReactNode;
}

// Simple hash function for password verification
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString();
};

// Session management
const AUTH_KEY = 'seventeenlabs_admin_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const setAuthSession = () => {
  const expiry = Date.now() + SESSION_DURATION;
  localStorage.setItem(AUTH_KEY, expiry.toString());
};

const checkAuthSession = (): boolean => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;
  
  const expiry = parseInt(stored, 10);
  if (Date.now() > expiry) {
    localStorage.removeItem(AUTH_KEY);
    return false;
  }
  
  return true;
};

const clearAuthSession = () => {
  localStorage.removeItem(AUTH_KEY);
};

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    // Check if already authenticated on component mount
    const isAuth = checkAuthSession();
    setIsAuthenticated(isAuth);
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Rate limiting - max 5 attempts
    if (attemptCount >= 5) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }

    try {
      // Verify password with the server
      const response = await fetch('/api/admin/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setAuthSession();
        setIsAuthenticated(true);
        setPassword('');
        setAttemptCount(0);
      } else {
        setError('Invalid password');
        setAttemptCount(prev => prev + 1);
        setPassword('');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
      setAttemptCount(prev => prev + 1);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setIsAuthenticated(false);
    setPassword('');
    setError('');
    setAttemptCount(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter your password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pr-10"
                    disabled={attemptCount >= 5}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={attemptCount >= 5}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              
              {attemptCount > 0 && attemptCount < 5 && (
                <div className="text-yellow-600 text-sm">
                  {5 - attemptCount} attempts remaining
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!password || attemptCount >= 5}
              >
                Access Admin Dashboard
              </Button>
            </form>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>This is a secure admin area.</p>
              <p>Session expires after 24 hours of inactivity.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If authenticated, render the admin interface with logout option
  return (
    <div className="relative">
      {children}
      {/* Logout button - positioned absolutely in top right */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors duration-200"
        title="Logout from admin"
      >
        Logout
      </button>
    </div>
  );
}

// Hook for checking auth status in components
export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuthSession());
  }, []);

  return { isAuthenticated };
};