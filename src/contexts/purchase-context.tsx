"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PurchaseContextType {
  purchasedWorkflows: number[];
  isPurchased: (workflowId: number) => boolean;
  addPurchase: (workflowId: number) => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [purchasedWorkflows, setPurchasedWorkflows] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load purchases from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('purchased_workflows');
    if (stored) {
      try {
        setPurchasedWorkflows(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading purchased workflows:', error);
        setPurchasedWorkflows([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const isPurchased = (workflowId: number): boolean => {
    if (!isLoaded) return false;
    return purchasedWorkflows.includes(workflowId);
  };

  const addPurchase = (workflowId: number) => {
    setPurchasedWorkflows(prev => {
      if (prev.includes(workflowId)) return prev;
      const updated = [...prev, workflowId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('purchased_workflows', JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <PurchaseContext.Provider value={{ purchasedWorkflows, isPurchased, addPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const context = useContext(PurchaseContext);
  if (context === undefined) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
}