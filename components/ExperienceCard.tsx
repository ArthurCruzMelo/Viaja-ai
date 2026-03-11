"use client";

import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
}

const PRICE_LABELS: Record<string, string> = {
  $: "Budget-friendly",
  $$: "Moderate",
  $$$: "Splurge",
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-semibold text-stone-900 group-hover:text-brand-600 transition-colors">
            {experience.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{experience.neighborhood}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-3 py-1">
          <span className="text-brand-600 text-sm font-medium">
            {experience.authenticity_score}/10
          </span>
          <span className="text-brand-500 text-xs">local</span>
        </div>
      </div>

      <p className="mt-4 text-stone-600 leading-relaxed">{experience.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          Local tip
        </p>
        <p className="mt-1 text-sm text-amber-900">{experience.local_tip}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-500">
        <span>{experience.best_time}</span>
        <span>•</span>
        <span>{PRICE_LABELS[experience.price_level] || experience.price_level}</span>
        {experience.submitted_by && (
          <>
            <span>•</span>
            <span>by {experience.submitted_by}</span>
          </>
        )}
      </div>

      {experience.upvotes > 0 && (
        <div className="mt-3 text-sm text-stone-400">
          {experience.upvotes} {experience.upvotes === 1 ? "upvote" : "upvotes"}
        </div>
      )}
    </article>
  );
}
