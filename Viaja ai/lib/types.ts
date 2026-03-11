export interface Experience {
  id: string;
  city: string;
  title: string;
  description: string;
  category: string;
  neighborhood: string;
  price_level: "$" | "$$" | "$$$";
  best_time: string;
  local_tip: string;
  submitted_by: string | null;
  tags: string[];
  authenticity_score: number;
  upvotes: number;
  created_at: string;
}

export interface ExperienceInput {
  city: string;
  title: string;
  description: string;
  category: string;
  neighborhood: string;
  local_tip: string;
  price_level: "$" | "$$" | "$$$";
  best_time: string;
  submitted_by?: string;
}

export interface AIEnhancedExperience {
  improved_description: string;
  tags: string[];
  authenticity_score: number;
}

export const CATEGORIES = [
  "Food",
  "Bars",
  "Nature",
  "Culture",
  "Hidden gems",
] as const;
