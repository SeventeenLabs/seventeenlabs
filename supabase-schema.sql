-- Simplified Workflows table to store all workflow metadata
CREATE TABLE workflows (
  id BIGSERIAL PRIMARY KEY,
  
  -- Basic workflow information
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL DEFAULT 'Intermediate',
  time VARCHAR(50) NOT NULL,
  
  -- Usage and rating
  users INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  
  -- Arrays stored as JSONB (better performance and indexing)
  integrations JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  requirements JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- Pricing
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT true,
  stripe_product_id VARCHAR(100),
  stripe_price_id VARCHAR(100),
  
  -- Content URLs
  video_url TEXT,
  mermaid_chart TEXT,
  preview_chart TEXT,
  
  -- n8n Integration
  n8n_id VARCHAR(100) UNIQUE,
  n8n_version_id VARCHAR(100),
  n8n_json_url TEXT, -- URL to the JSON file in storage
  last_sync_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  author VARCHAR(100) DEFAULT 'SeventeenLabs',
  version VARCHAR(20) DEFAULT '1.0',
  
  -- Status and timestamps
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simple indexes for performance
CREATE INDEX idx_workflows_category ON workflows(category);
CREATE INDEX idx_workflows_difficulty ON workflows(difficulty);
CREATE INDEX idx_workflows_is_active ON workflows(is_active);
CREATE INDEX idx_workflows_is_free ON workflows(is_free);
CREATE INDEX idx_workflows_n8n_id ON workflows(n8n_id);
CREATE INDEX idx_workflows_created_at ON workflows(created_at);

-- GIN indexes for JSON array search (with proper operator classes)
CREATE INDEX idx_workflows_integrations ON workflows USING GIN (integrations jsonb_path_ops);
CREATE INDEX idx_workflows_tags ON workflows USING GIN (tags jsonb_path_ops);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_workflows_updated_at 
  BEFORE UPDATE ON workflows 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket setup (run these commands in Supabase dashboard or via API)
-- 1. Create bucket: workflow-files
-- 2. Make it public
-- 3. Set policies for public read, authenticated write

-- Purchases table to track workflow purchases
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Purchase details
  workflow_id BIGINT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  
  -- Stripe integration
  stripe_payment_intent_id VARCHAR(100) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(100),
  stripe_session_id VARCHAR(100),
  
  -- Payment details
  amount INTEGER NOT NULL, -- Amount in cents
  currency VARCHAR(3) NOT NULL DEFAULT 'usd',
  
  -- Status tracking
  status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'refunded', 'failed')) NOT NULL DEFAULT 'pending',
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for purchases
CREATE INDEX idx_purchases_user_email ON purchases(user_email);
CREATE INDEX idx_purchases_workflow_id ON purchases(workflow_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_stripe_payment_intent ON purchases(stripe_payment_intent_id);
CREATE INDEX idx_purchases_purchase_date ON purchases(purchase_date);

-- Composite index for user purchases
CREATE INDEX idx_purchases_user_workflow ON purchases(user_email, workflow_id);

-- Trigger to update updated_at on purchases
CREATE TRIGGER update_purchases_updated_at 
  BEFORE UPDATE ON purchases 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();