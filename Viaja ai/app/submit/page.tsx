"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";

const PRICE_LEVELS = [
  { value: "$", label: "Budget-friendly ($)" },
  { value: "$$", label: "Moderate ($$)" },
  { value: "$$$", label: "Splurge ($$$)" },
];

export default function SubmitPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    city: "",
    title: "",
    description: "",
    category: CATEGORIES[0],
    neighborhood: "",
    local_tip: "",
    price_level: "$" as "$" | "$$" | "$$$",
    best_time: "",
    submitted_by: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/experiences/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: form.city.trim(),
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          neighborhood: form.neighborhood.trim(),
          local_tip: form.local_tip.trim(),
          price_level: form.price_level,
          best_time: form.best_time.trim(),
          submitted_by: form.submitted_by.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setTimeout(() => router.push(`/search?city=${encodeURIComponent(form.city)}`), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="rounded-full bg-green-100 p-4 mx-auto w-fit">
          <svg
            className="h-12 w-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold text-stone-900">
          Thank you!
        </h2>
        <p className="mt-2 text-stone-600">
          Your experience has been submitted. AI is enhancing it for travelers.
        </p>
        <p className="mt-4 text-sm text-stone-500">Redirecting to results...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Share a local experience
      </h1>
      <p className="mt-2 text-stone-600">
        Help travelers discover authentic spots. AI will polish your description and add tags.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-stone-700">
            City *
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Belo Horizonte"
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-stone-700">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Hidden rooftop bar in Santa Tereza"
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-stone-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the place and what makes it special..."
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-stone-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-stone-700">
              Neighborhood *
            </label>
            <input
              id="neighborhood"
              name="neighborhood"
              type="text"
              required
              value={form.neighborhood}
              onChange={handleChange}
              placeholder="e.g. Santa Tereza"
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="local_tip" className="block text-sm font-medium text-stone-700">
            Local tip *
          </label>
          <textarea
            id="local_tip"
            name="local_tip"
            required
            rows={2}
            value={form.local_tip}
            onChange={handleChange}
            placeholder="Insider advice: best time to go, what to order, how to get a table..."
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="price_level" className="block text-sm font-medium text-stone-700">
              Price level *
            </label>
            <select
              id="price_level"
              name="price_level"
              required
              value={form.price_level}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {PRICE_LEVELS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="best_time" className="block text-sm font-medium text-stone-700">
              Best time to go *
            </label>
            <input
              id="best_time"
              name="best_time"
              type="text"
              required
              value={form.best_time}
              onChange={handleChange}
              placeholder="e.g. Sunset, Tuesday nights"
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="submitted_by" className="block text-sm font-medium text-stone-700">
            Your nickname (optional)
          </label>
          <input
            id="submitted_by"
            name="submitted_by"
            type="text"
            value={form.submitted_by}
            onChange={handleChange}
            placeholder="How you'll be credited"
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-brand-500 py-4 font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          {submitting ? "Submitting..." : "Submit experience"}
        </button>
      </form>
    </div>
  );
}
