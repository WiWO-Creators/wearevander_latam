import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByFranchiseTag, franchiseTags, getTag } from "@/lib/content";
import { HorizontalCard } from "@/components/article-card";
import { ContraMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, EmptyCat } from "@/components/rank-pack";

export const Route = createFileRoute("/contra/tag/$tag")({
  component: ContraTagPage,
  head: ({ params }) => {
    const tag = getTag(params.tag);
    return {
      meta: [{ title: tag ? `${tag.label} — Contra la corriente` : "Contra la corriente" }],
    };
  },
});

function ContraTagPage() {
  const { tag: id } = Route.useParams();
  const tag = getTag(id);
  const essays = articlesByFranchiseTag("contra", id);
  const kind = tag?.kind ?? "industry";
  const siblings = franchiseTags("contra", kind);

  if (!tag) {
    return (
      <EmptyCat>
        <h1 className="headline text-3xl">Ese tema no está en Contra.</h1>
        <Link to="/contra" className="mt-6 inline-block kicker text-xs underline">
          Ver las columnas
        </Link>
      </EmptyCat>
    );
  }

  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/contra" className="logo-mark inline-block max-w-sm">
            <ContraMark className="h-8 sm:h-10" />
          </Link>
          <p className="kicker mt-6 text-xs text-silver">Contra la corriente · Tema</p>
          <h1 className="headline mt-2 text-5xl sm:text-7xl">{tag.label}</h1>
          <p className="mt-3 font-body text-base text-paper/70">
            {essays.length} {essays.length === 1 ? "columna" : "columnas"} firmadas
          </p>
        </div>
      </section>
      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
          <Link
            to="/contra"
            className="kicker inline-flex h-9 items-center border border-ink px-3 text-xs hover:bg-ink hover:text-paper"
          >
            Todas
          </Link>
          {siblings.map((t) => (
            <CatChip
              key={t.id}
              to="/contra/tag/$tag"
              params={{ tag: t.id }}
              label={t.label}
              active={t.id === tag.id}
              accent="rust"
            />
          ))}
        </div>
      </nav>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {essays.map((a) => (
          <HorizontalCard key={a.slug} article={a} />
        ))}
      </section>
      <Newsletter />
    </main>
  );
}
