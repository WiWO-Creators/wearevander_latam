import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { searchArticles } from "@/lib/content";
import { HorizontalCard } from "@/components/article-card";
import { HOUSE } from "@/lib/content";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({
    q: typeof s.q === "string" && s.q.length > 0 ? s.q : undefined,
  }),
  head: () => ({
    meta: [{ title: "Buscar — We Are Vander" }],
  }),
});

function SearchPage() {
  const { q: qParam } = Route.useSearch();
  const q = qParam ?? "";
  const navigate = Route.useNavigate();
  const results = useMemo(() => searchArticles(q), [q]);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="kicker text-xs text-rust">Índice</p>
        <h1 className="headline mt-2 text-4xl sm:text-5xl">Buscar el número</h1>
        <label className="sr-only" htmlFor="q">
          Buscar
        </label>
        <input
          id="q"
          value={q}
          onChange={(e) => void navigate({ search: e.target.value ? { q: e.target.value } : {} })}
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
        {q && results.length === 0 && (
          <p className="mt-6 font-body text-base text-ink-soft">
            Nada con esa búsqueda. Prueba una ciudad o mira el{" "}
            <Link to="/list" className="underline decoration-rust hover:text-rust">
              Vander 20
            </Link>
            .
          </p>
        )}
      </div>
    </main>
  );
}