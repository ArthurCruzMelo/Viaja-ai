import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Experience } from "@/lib/types";

// Variáveis do Supabase (usa .env.local se existir, senão usa estes valores)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yprrivtorhvmkgjycwpd.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcnJpdnRvcmh2bWtnanljd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTUzNDcsImV4cCI6MjA4ODgzMTM0N30.0Liu78_o2JveUC2uDXuIHe2oxwLZlFStUPVZpXflPQQ";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}

export async function getExperiencesByCity(
  city: string,
  category?: string
): Promise<Experience[]> {
  const supabase = getSupabase();
  let query = supabase
    .from("experiences")
    .select("*")
    .ilike("city", city)
    .order("authenticity_score", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  return data as Experience[];
}

export async function insertExperience(experience: Omit<Experience, "id" | "created_at">) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("experiences")
    .insert(experience)
    .select("id")
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data.id;
}
