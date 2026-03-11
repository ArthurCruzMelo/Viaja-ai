"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ initialValue = "" }: { initialValue?: string }) {
  const [city, setCity] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      router.push(`/search?city=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Where are you going?"
          className="flex-1 rounded-xl border border-stone-300 bg-white px-5 py-4 text-stone-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          aria-label="Destination city"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-500 px-6 py-4 font-semibold text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Discover
        </button>
      </div>
    </form>
  );
}
