import OpenAI from "openai";
import type { AIEnhancedExperience } from "@/lib/types";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  return new OpenAI({ apiKey });
}

export async function enhanceExperienceWithAI(
  title: string,
  description: string,
  localTip: string,
  category: string
): Promise<AIEnhancedExperience> {
  const prompt = `You are a travel content expert. A local submitted this travel tip.

Title: ${title}
Description: ${description}
Local Tip: ${localTip}
Category: ${category}

Your task:
1. Rewrite the description to be clearer and more engaging for travelers. Keep it concise (2-4 sentences). Preserve the local authenticity and specific details.
2. Generate exactly 3 tags from: food, nightlife, nature, culture, hidden gem, adventure, relaxation, art, history, shopping. Use lowercase.
3. Estimate an authenticity score from 1 to 10. Consider: specific details, insider knowledge, avoids tourist traps, feels like local advice. Return ONLY a number.

Respond with valid JSON only, no markdown:
{"improved_description": "...", "tags": ["tag1", "tag2", "tag3"], "authenticity_score": 8}`;

  const openai = getOpenAIClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that returns only valid JSON. No explanations, no markdown code blocks.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  try {
    const parsed = JSON.parse(content) as AIEnhancedExperience;
    parsed.authenticity_score = Math.min(
      10,
      Math.max(1, Math.round(parsed.authenticity_score))
    );
    return parsed;
  } catch {
    throw new Error("Failed to parse AI response");
  }
}
