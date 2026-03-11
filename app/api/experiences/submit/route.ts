import { NextRequest, NextResponse } from "next/server";
import { insertExperience } from "@/lib/supabase";
import { enhanceExperienceWithAI } from "@/lib/ai";
import type { ExperienceInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ExperienceInput;

    const {
      city,
      title,
      description,
      category,
      neighborhood,
      local_tip,
      price_level,
      best_time,
      submitted_by,
    } = body;

    if (!city || !title || !description || !category || !neighborhood || !local_tip || !price_level || !best_time) {
      return NextResponse.json(
        { error: "Missing required fields: city, title, description, category, neighborhood, local_tip, price_level, best_time" },
        { status: 400 }
      );
    }

    let improvedDescription = description;
    let tags: string[] = [];
    let authenticityScore = 5;

    // Use AI to enhance if OpenAI key is configured
    if (process.env.OPENAI_API_KEY) {
      try {
        const enhanced = await enhanceExperienceWithAI(title, description, local_tip, category);
        improvedDescription = enhanced.improved_description;
        tags = enhanced.tags;
        authenticityScore = enhanced.authenticity_score;
      } catch (aiError) {
        console.warn("AI enhancement failed, using original:", aiError);
      }
    }

    const experience = {
      city: city.trim(),
      title: title.trim(),
      description: improvedDescription,
      category: category.trim(),
      neighborhood: neighborhood.trim(),
      price_level: price_level as "$" | "$$" | "$$$",
      best_time: best_time.trim(),
      local_tip: local_tip.trim(),
      submitted_by: submitted_by?.trim() || null,
      tags,
      authenticity_score: authenticityScore,
      upvotes: 0,
    };

    const id = await insertExperience(experience);

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit experience" },
      { status: 500 }
    );
  }
}
