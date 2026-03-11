import SearchForm from "@/components/SearchForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-stone-50 to-amber-50" />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
          Discover cities through the eyes of locals
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
          Skip the tourist traps. Find authentic experiences recommended by people
          who actually live there.
        </p>
        <div className="mt-10 flex justify-center">
          <SearchForm />
        </div>
        <p className="mt-6 text-sm text-stone-500">
          Try &quot;Belo Horizonte&quot;, &quot;Lisbon&quot;, or &quot;Tokyo&quot;
        </p>
        <div className="mt-16">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-6 py-3 text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors"
          >
            Share your local knowledge
          </Link>
        </div>
      </div>
    </section>
  );
}
