import { createClient } from "@supabase/supabase-js";
import type { Experience } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getExperiencesByCity(
  city: string,
  category?: string
): Promise<Experience[]> {
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
