import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log('🔧 Supabase config:', {
  url: supabaseUrl ? 'Set' : 'Missing',
  serviceKey: supabaseServiceKey ? 'Set' : 'Missing'
});

// Use service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export interface Purchase {
  id: string;
  workflow_id: number;
  user_email: string;
  stripe_payment_intent_id: string;
  stripe_customer_id?: string;
  stripe_session_id?: string;
  amount: number; // Amount in cents
  currency: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  metadata?: Record<string, any>;
  purchase_date: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Add a new purchase
export const addPurchase = async (purchase: {
  workflow_id: number;
  user_email: string;
  stripe_payment_intent_id: string;
  stripe_customer_id?: string;
  stripe_session_id?: string;
  amount: number;
  currency?: string;
  status?: 'pending' | 'completed' | 'refunded' | 'failed';
  metadata?: Record<string, any>;
}): Promise<Purchase | null> => {
  console.log('🔧 addPurchase called with:', purchase);
  
  try {
    const insertData = {
      workflow_id: purchase.workflow_id,
      user_email: purchase.user_email.toLowerCase(),
      stripe_payment_intent_id: purchase.stripe_payment_intent_id,
      stripe_customer_id: purchase.stripe_customer_id,
      stripe_session_id: purchase.stripe_session_id,
      amount: purchase.amount,
      currency: purchase.currency || 'usd',
      status: purchase.status || 'pending',
      metadata: purchase.metadata || {},
    };
    
    console.log('📝 Inserting data to Supabase:', insertData);
    
    const { data, error } = await supabase
      .from('purchases')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error adding purchase:', error);
      console.error('❌ Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

    console.log('✅ Purchase added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error adding purchase:', error);
    return null;
  }
};

// Find purchase by email and workflow
export const findPurchase = async (userEmail: string, workflowId: number): Promise<Purchase | null> => {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_email', userEmail.toLowerCase())
      .eq('workflow_id', workflowId)
      .eq('status', 'completed')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error finding purchase:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error finding purchase:', error);
    return null;
  }
};

// Find purchase by Stripe Payment Intent ID
export const findPurchaseByStripeId = async (stripePaymentIntentId: string): Promise<Purchase | null> => {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('stripe_payment_intent_id', stripePaymentIntentId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error finding purchase by Stripe ID:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error finding purchase by Stripe ID:', error);
    return null;
  }
};

// Get all purchases for a user
export const getUserPurchases = async (userEmail: string): Promise<Purchase[]> => {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_email', userEmail.toLowerCase())
      .eq('status', 'completed')
      .order('purchase_date', { ascending: false });

    if (error) {
      console.error('Error getting user purchases:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting user purchases:', error);
    return [];
  }
};

// Update purchase status
export const updatePurchaseStatus = async (
  purchaseId: string, 
  status: 'pending' | 'completed' | 'refunded' | 'failed',
  completedAt?: string
): Promise<boolean> => {
  try {
    const updateData: any = { status };
    
    if (status === 'completed' && !completedAt) {
      updateData.completed_at = new Date().toISOString();
    } else if (completedAt) {
      updateData.completed_at = completedAt;
    }

    const { error } = await supabase
      .from('purchases')
      .update(updateData)
      .eq('id', purchaseId);

    if (error) {
      console.error('Error updating purchase status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating purchase status:', error);
    return false;
  }
};

// Update purchase by Stripe Payment Intent ID
export const updatePurchaseByStripeId = async (
  stripePaymentIntentId: string,
  status: 'pending' | 'completed' | 'refunded' | 'failed',
  completedAt?: string
): Promise<boolean> => {
  try {
    const updateData: any = { status };
    
    if (status === 'completed' && !completedAt) {
      updateData.completed_at = new Date().toISOString();
    } else if (completedAt) {
      updateData.completed_at = completedAt;
    }

    const { error } = await supabase
      .from('purchases')
      .update(updateData)
      .eq('stripe_payment_intent_id', stripePaymentIntentId);

    if (error) {
      console.error('Error updating purchase by Stripe ID:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating purchase by Stripe ID:', error);
    return false;
  }
};

// Check if user has purchased a specific workflow
export const hasUserPurchased = async (userEmail: string, workflowId: number): Promise<boolean> => {
  const purchase = await findPurchase(userEmail, workflowId);
  return purchase !== null;
};

// Get purchase statistics
export const getPurchaseStats = async () => {
  try {
    const { data: allPurchases, error } = await supabase
      .from('purchases')
      .select('status, amount, currency');

    if (error) {
      console.error('Error getting purchase stats:', error);
      return {
        total: 0,
        completed: 0,
        pending: 0,
        refunded: 0,
        failed: 0,
        totalRevenue: 0,
      };
    }

    const purchases = allPurchases || [];
    
    return {
      total: purchases.length,
      completed: purchases.filter(p => p.status === 'completed').length,
      pending: purchases.filter(p => p.status === 'pending').length,
      refunded: purchases.filter(p => p.status === 'refunded').length,
      failed: purchases.filter(p => p.status === 'failed').length,
      totalRevenue: purchases
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + (p.amount || 0), 0),
    };
  } catch (error) {
    console.error('Error getting purchase stats:', error);
    return {
      total: 0,
      completed: 0,
      pending: 0,
      refunded: 0,
      failed: 0,
      totalRevenue: 0,
    };
  }
};

// Get all purchases with workflow details (for admin)
export const getAllPurchases = async (limit = 100, offset = 0): Promise<(Purchase & { workflow_title?: string })[]> => {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select(`
        *,
        workflows!inner(title)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error getting all purchases:', error);
      return [];
    }

    // Transform the data to flatten workflow title
    return (data || []).map(purchase => ({
      ...purchase,
      workflow_title: (purchase as any).workflows?.title,
    }));
  } catch (error) {
    console.error('Error getting all purchases:', error);
    return [];
  }
};