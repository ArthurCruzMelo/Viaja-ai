import { NextRequest, NextResponse } from "next/server";
import { getExperiencesByCity } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const category = searchParams.get("category") || "all";

  if (!city || city.trim().length === 0) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  try {
    const experiences = await getExperiencesByCity(city.trim(), category);
    return NextResponse.json(experiences);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Search error:", message, error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
