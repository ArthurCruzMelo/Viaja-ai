-- Viaja AI - Experiences Table
-- Run this in Supabase SQL Editor to create the schema

CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  neighborhood VARCHAR(100) NOT NULL,
  price_level VARCHAR(5) NOT NULL CHECK (price_level IN ('$', '$$', '$$$')),
  best_time VARCHAR(100) NOT NULL,
  local_tip TEXT NOT NULL,
  submitted_by VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  authenticity_score INTEGER DEFAULT 5 CHECK (authenticity_score >= 1 AND authenticity_score <= 10),
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast city searches
CREATE INDEX IF NOT EXISTS idx_experiences_city ON experiences(city);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON experiences(category);
CREATE INDEX IF NOT EXISTS idx_experiences_authenticity ON experiences(authenticity_score DESC);
CREATE INDEX IF NOT EXISTS idx_experiences_created_at ON experiences(created_at DESC);

-- Permitir acesso público (necessário para o app funcionar)
ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;
