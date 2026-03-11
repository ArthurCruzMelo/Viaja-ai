-- Viaja AI - Corrigir permissões para o app funcionar
-- Execute isso no Supabase SQL Editor

-- Opção 1: Desabilitar RLS (mais simples para testes)
ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;

-- Se a Opção 1 der erro "row-level security is not enabled", use a Opção 2 abaixo:
-- Opção 2: Habilitar RLS e criar políticas de acesso
/*
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON experiences;
CREATE POLICY "Allow public read" ON experiences FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert" ON experiences;
CREATE POLICY "Allow public insert" ON experiences FOR INSERT WITH CHECK (true);
*/
