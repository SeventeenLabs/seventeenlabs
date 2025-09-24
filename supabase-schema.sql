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