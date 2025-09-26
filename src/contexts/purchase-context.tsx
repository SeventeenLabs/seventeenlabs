"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WorkflowDetail {
  workflowId: number;
  title: string;
  purchaseDate: string;
}

interface PurchaseContextType {
  userEmail: string | null;
  purchasedWorkflows: number[];
  purchasedWorkflowDetails: WorkflowDetail[];
  isLoaded: boolean;
  isPurchased: (workflowId: number) => boolean;
  setUserEmail: (email: string) => void;
  verifyPurchase: (workflowId: number) => Promise<boolean>;
  confirmPurchase: (workflowId: number, paymentIntentId: string) => Promise<boolean>;
  refreshPurchases: () => Promise<void>;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [purchasedWorkflows, setPurchasedWorkflows] = useState<number[]>([]);
  const [purchasedWorkflowDetails, setPurchasedWorkflowDetails] = useState<WorkflowDetail[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user email from localStorage on mount
  useEffect(() => {
    console.log('🔄 PurchaseContext: useEffect triggered, checking localStorage...');
    const storedEmail = localStorage.getItem('user_email');
    console.log('🔄 PurchaseContext: storedEmail from localStorage:', storedEmail);
    if (storedEmail) {
      console.log('🔄 PurchaseContext: Setting stored email and refreshing purchases');
      setUserEmailState(storedEmail);
      // Auto-refresh purchases when email is loaded
      refreshPurchasesForEmail(storedEmail);
    } else {
      console.log('🔄 PurchaseContext: No stored email found, setting isLoaded to true');
      setIsLoaded(true);
    }
  }, []);

  const refreshPurchasesForEmail = async (email: string) => {
    if (!email) return;

    console.log(`Refreshing purchases for email: ${email}`);
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
        const workflowDetails: WorkflowDetail[] = data.purchases.map((p: any) => ({
          workflowId: p.workflowId,
          title: p.title,
          purchaseDate: p.purchaseDate,
        }));
        console.log(`Found ${workflowIds.length} purchases:`, workflowIds);
        console.log(`Workflow details:`, workflowDetails);
        setPurchasedWorkflows(workflowIds);
        setPurchasedWorkflowDetails(workflowDetails);
      } else {
        console.error('Failed to fetch purchases:', response.status);
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
    setPurchasedWorkflowDetails([]);
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

  const confirmPurchase = async (workflowId: number, paymentIntentId: string): Promise<boolean> => {
    if (!userEmail) return false;

    console.log('🔄 Confirming purchase:', { workflowId, paymentIntentId, email: userEmail });

    try {
      const response = await fetch('/api/verify-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'confirm-purchase',
          email: userEmail,
          workflowId,
          paymentIntentId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Purchase confirmation result:', data);
        
        if (data.success) {
          // Update local state
          if (!purchasedWorkflows.includes(workflowId)) {
            setPurchasedWorkflows(prev => [...prev, workflowId]);
          }
          
          // Refresh all purchases to stay in sync
          await refreshPurchases();
          
          return true;
        }
      } else {
        const errorData = await response.json();
        console.error('❌ Purchase confirmation failed:', errorData);
      }
    } catch (error) {
      console.error('❌ Error confirming purchase:', error);
    }

    return false;
  };

  const isPurchased = (workflowId: number): boolean => {
    if (!isLoaded || !userEmail) return false;
    return purchasedWorkflows.includes(workflowId);
  };

  return (
    <PurchaseContext.Provider value={{ 
      userEmail,
      purchasedWorkflows, 
      purchasedWorkflowDetails,
      isLoaded,
      isPurchased, 
      setUserEmail,
      verifyPurchase,
      confirmPurchase,
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