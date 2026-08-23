import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByFranchiseTag, franchiseTags, getTag } from "@/lib/content";
import { SignalRow } from "@/components/article-card";
import { SignalsMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { SignalsField } from "@/components/signals-field";
import { CatChip, EmptyCat } from "@/components/rank-pack";

export const Route = createFileRoute("/signals/tag/$tag")({
  component: SignalsTagPage,
  head: ({ params }) => {
    const tag = getTag(params.tag);
    return {
      meta: [{ title: tag ? `${tag.label} — Signals` : "Signals" }],
    };
  },
});

function SignalsTagPage() {
  const { tag: id } = Route.useParams();
  const tag = getTag(id);
  const notes = articlesByFranchiseTag("signals", id);
  const kind = tag?.kind ?? "industry";
  const siblings = franchiseTags("signals", kind);
  const kindLabel = kind === "pace" ? "Lectura" : kind === "tech" ? "Tecnología" : "Industria";

  if (!tag) {
    return (
      <EmptyCat>
        <h1 className="headline text-3xl">Esa categoría no está en Signals.</h1>
        <Link to="/signals" className="mt-6 inline-block kicker text-xs underline">
          Ver Signals
        </Link>
      </EmptyCat>
    );
  }

  return (
    <main>
      <SignalsField>
        <div className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Link to="/signals" className="logo-mark inline-block max-w-xs">
              <SignalsMark className="h-10 sm:h-12" />
            </Link>
            <p className="kicker mt-6 text-xs text-muted">Signals · {kindLabel}</p>
            <h1 className="headline mt-2 text-5xl sm:text-7xl">{tag.label}</h1>
            <p className="mt-3 font-body text-base text-ink-soft">
              {notes.length} {notes.length === 1 ? "señal" : "señales"} · lectura rápida
            </p>
          </div>
        </div>
      </SignalsField>
      <nav className="border-b border-ink px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
          <Link
            to="/signals"
            className="kicker inline-flex h-9 items-center border border-ink px-3 text-xs hover:bg-ink hover:text-paper"
          >
            Todas
          </Link>
          {siblings.map((t) => (
            <CatChip
              key={t.id}
              to="/signals/tag/$tag"
              params={{ tag: t.id }}
              label={t.label}
              active={t.id === tag.id}
              accent="rust"
            />
          ))}
        </div>
      </nav>
      <SignalsField>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {notes.map((a) => (
            <SignalRow key={a.slug} article={a} />
          ))}
        </div>
      </SignalsField>
      <Newsletter />
    </main>
  );
}
