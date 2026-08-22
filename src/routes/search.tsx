import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { searchArticles } from "@/lib/content";
import { HorizontalCard } from "@/components/article-card";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    meta: [{ title: "Buscar — We Are Vander" }],
  }),
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchArticles(q), [q]);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="kicker text-xs text-rust">Índice</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight">
          Buscar el número
        </h1>
        <label className="sr-only" htmlFor="q">
          Buscar
        </label>
        <input
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Una compañía, una ciudad, un argumento…"
          className="mt-6 h-12 w-full border-b-2 border-ink bg-transparent font-display text-xl font-medium outline-none placeholder:text-muted focus:border-rust"
        />
        <p className="mt-3 kicker text-xs text-muted">
          {results.length} {results.length === 1 ? "historia" : "historias"}
        </p>
        <div className="mt-6">
          {results.map((a) => (
            <HorizontalCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
