"use client";

import { CATEGORIES } from "@/lib/types";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selected === "all"
            ? "bg-brand-500 text-white"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-brand-500 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
