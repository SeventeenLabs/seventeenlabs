"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PurchaseContextType {
  userEmail: string | null;
  purchasedWorkflows: number[];
  isLoaded: boolean;
  isPurchased: (workflowId: number) => boolean;
  setUserEmail: (email: string) => void;
  verifyPurchase: (workflowId: number) => Promise<boolean>;
  refreshPurchases: () => Promise<void>;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [purchasedWorkflows, setPurchasedWorkflows] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user email from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      setUserEmailState(storedEmail);
      // Auto-refresh purchases when email is loaded
      refreshPurchasesForEmail(storedEmail);
    } else {
      setIsLoaded(true);
    }
  }, []);

  const refreshPurchasesForEmail = async (email: string) => {
    if (!email) return;

    try {
      const response = await fetch('/api/verify-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'list-purchases',
          email: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const workflowIds = data.purchases.map((p: any) => p.workflowId);
        setPurchasedWorkflows(workflowIds);
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const setUserEmail = (email: string) => {
    setUserEmailState(email);
    localStorage.setItem('user_email', email);
    // Reset purchases and reload for new email
    setPurchasedWorkflows([]);
    setIsLoaded(false);
    refreshPurchasesForEmail(email);
  };

  const verifyPurchase = async (workflowId: number): Promise<boolean> => {
    if (!userEmail) return false;

    try {
      const response = await fetch('/api/verify-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify-purchase',
          email: userEmail,
          workflowId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update local state if purchase is confirmed
        if (data.hasPurchased && !purchasedWorkflows.includes(workflowId)) {
          setPurchasedWorkflows(prev => [...prev, workflowId]);
        }
        
        return data.hasPurchased;
      }
    } catch (error) {
      console.error('Error verifying purchase:', error);
    }

    return false;
  };

  const refreshPurchases = async () => {
    if (!userEmail) return;
    await refreshPurchasesForEmail(userEmail);
  };

  const isPurchased = (workflowId: number): boolean => {
    if (!isLoaded || !userEmail) return false;
    return purchasedWorkflows.includes(workflowId);
  };

  return (
    <PurchaseContext.Provider value={{ 
      userEmail,
      purchasedWorkflows, 
      isLoaded,
      isPurchased, 
      setUserEmail,
      verifyPurchase,
      refreshPurchases
    }}>
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