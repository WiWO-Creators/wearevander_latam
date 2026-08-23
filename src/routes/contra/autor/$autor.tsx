import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByFranchiseAuthor, franchiseAuthors, getAuthor } from "@/lib/content";
import { HorizontalCard } from "@/components/article-card";
import { ContraMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, EmptyCat } from "@/components/rank-pack";

export const Route = createFileRoute("/contra/autor/$autor")({
  component: ContraAuthorPage,
  head: ({ params }) => {
    const author = getAuthor(params.autor);
    return {
      meta: [{ title: author ? `${author.name} — Contra la corriente` : "Contra la corriente" }],
    };
  },
});

function ContraAuthorPage() {
  const { autor } = Route.useParams();
  const author = getAuthor(autor);
  const essays = articlesByFranchiseAuthor("contra", autor);
  const all = franchiseAuthors("contra");

  if (!author || essays.length === 0) {
    return (
      <EmptyCat>
        <h1 className="headline text-3xl">Esa firma no tiene columna en Contra.</h1>
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
          <div className="mt-8 flex items-end gap-5">
            <img src={author.image} alt="" className="size-20 object-cover sm:size-24" />
            <div>
              <p className="kicker text-xs text-silver">Contra la corriente · Firma</p>
              <h1 className="headline mt-1 text-4xl sm:text-6xl">{author.name}</h1>
              <p className="mt-2 kicker text-xs text-silver">
                {author.role} · {author.city}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-xl font-body text-base text-paper/75">{author.bio}</p>
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
          {all.map((a) => (
            <CatChip
              key={a.id}
              to="/contra/autor/$autor"
              params={{ autor: a.id }}
              label={a.name}
              active={a.id === author.id}
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
