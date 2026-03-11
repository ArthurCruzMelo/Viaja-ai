"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import CategoryFilter from "@/components/CategoryFilter";
import ExperienceCard from "@/components/ExperienceCard";
import type { Experience } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city") || "";
  const [city, setCity] = useState(cityParam);
  const [category, setCategory] = useState("all");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCity(cityParam);
  }, [cityParam]);

  useEffect(() => {
    if (!city.trim()) {
      setExperiences([]);
      return;
    }

    const fetchExperiences = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ city });
        if (category !== "all") params.set("category", category);
        const res = await fetch(`/api/experiences/search?${params}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");
        setExperiences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load experiences. Make sure Supabase is configured.");
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [city, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <SearchForm initialValue={city} />
      </div>

      {city.trim() && (
        <>
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-stone-900">
              Experiences in {city}
            </h2>
            <p className="mt-1 text-stone-600">
              Sorted by local authenticity
            </p>
          </div>

          <div className="mb-8">
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              {error}
            </div>
          )}

          {!loading && !error && experiences.length === 0 && city.trim() && (
            <div className="rounded-xl border border-stone-200 bg-white p-12 text-center">
              <p className="text-stone-600">No experiences found for this city yet.</p>
              <p className="mt-2 text-sm text-stone-500">
                Be the first to add one!
              </p>
            </div>
          )}

          {!loading && experiences.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {experiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          )}
        </>
      )}

      {!city.trim() && (
        <div className="rounded-xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-600">Enter a city to discover local experiences.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
