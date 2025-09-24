import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PURCHASES_FILE = path.join(process.cwd(), 'data', 'purchases.json');

export interface Purchase {
  id: string;
  workflowId: number;
  userEmail: string;
  stripePaymentIntentId: string;
  stripeCustomerId?: string;
  purchaseDate: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded';
  metadata?: Record<string, any>;
}

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(PURCHASES_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load purchases from file
const loadPurchases = (): Purchase[] => {
  ensureDataDirectory();
  
  if (!fs.existsSync(PURCHASES_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(PURCHASES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading purchases:', error);
    return [];
  }
};

// Save purchases to file
const savePurchases = (purchases: Purchase[]): void => {
  ensureDataDirectory();
  
  try {
    fs.writeFileSync(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
  } catch (error) {
    console.error('Error saving purchases:', error);
    throw error;
  }
};

// Add a new purchase
export const addPurchase = (purchase: Omit<Purchase, 'id' | 'purchaseDate'>): Purchase => {
  const purchases = loadPurchases();
  
  const newPurchase: Purchase = {
    ...purchase,
    id: crypto.randomUUID(),
    purchaseDate: new Date().toISOString(),
  };
  
  purchases.push(newPurchase);
  savePurchases(purchases);
  
  return newPurchase;
};

// Find purchase by email and workflow
export const findPurchase = (userEmail: string, workflowId: number): Purchase | null => {
  const purchases = loadPurchases();
  
  return purchases.find(p => 
    p.userEmail.toLowerCase() === userEmail.toLowerCase() && 
    p.workflowId === workflowId &&
    p.status === 'completed'
  ) || null;
};

// Find purchase by Stripe Payment Intent ID
export const findPurchaseByStripeId = (stripePaymentIntentId: string): Purchase | null => {
  const purchases = loadPurchases();
  
  return purchases.find(p => p.stripePaymentIntentId === stripePaymentIntentId) || null;
};

// Get all purchases for a user
export const getUserPurchases = (userEmail: string): Purchase[] => {
  const purchases = loadPurchases();
  
  return purchases.filter(p => 
    p.userEmail.toLowerCase() === userEmail.toLowerCase() &&
    p.status === 'completed'
  );
};

// Update purchase status
export const updatePurchaseStatus = (purchaseId: string, status: Purchase['status']): boolean => {
  const purchases = loadPurchases();
  const purchaseIndex = purchases.findIndex(p => p.id === purchaseId);
  
  if (purchaseIndex === -1) {
    return false;
  }
  
  purchases[purchaseIndex].status = status;
  savePurchases(purchases);
  
  return true;
};

// Check if user has purchased a specific workflow
export const hasUserPurchased = (userEmail: string, workflowId: number): boolean => {
  const purchase = findPurchase(userEmail, workflowId);
  return purchase !== null;
};

// Get purchase statistics
export const getPurchaseStats = () => {
  const purchases = loadPurchases();
  
  return {
    total: purchases.length,
    completed: purchases.filter(p => p.status === 'completed').length,
    pending: purchases.filter(p => p.status === 'pending').length,
    refunded: purchases.filter(p => p.status === 'refunded').length,
    totalRevenue: purchases
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
  };
};