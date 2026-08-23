import { createFileRoute, Link } from "@tanstack/react-router";
import { innovSector, innovSectors } from "@/lib/innovatives";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, EmptyCat, RankRow50 } from "@/components/rank-pack";

export const Route = createFileRoute("/innovatives/sector/$sector")({
  component: InnovSectorPage,
  head: ({ params }) => {
    const group = innovSector(params.sector);
    return {
      meta: [{ title: group ? `${group.label} — 50 Innovatives` : "50 Innovatives" }],
    };
  },
});

function InnovSectorPage() {
  const { sector } = Route.useParams();
  const group = innovSector(sector);
  const all = innovSectors();
  if (!group) {
    return (
      <EmptyCat>
        <p className="kicker text-xs text-innov">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Ese sector no está en las 50 Innovatives.</h1>
        <Link to="/innovatives" className="mt-6 inline-block kicker text-xs underline">
          Ver el ranking
        </Link>
      </EmptyCat>
    );
  }

  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link to="/innovatives" className="logo-mark inline-block max-w-md">
            <InnovativesMark wide className="h-10 sm:h-14" />
          </Link>
          <p className="kicker mt-6 text-xs text-innov">50 Innovatives · Sector</p>
          <h1 className="headline mt-2 text-5xl sm:text-7xl">{group.label}</h1>
          <p className="mt-4 max-w-xl font-body text-base text-paper/70">
            {group.items.length} {group.items.length === 1 ? "compañía" : "compañías"} cuyo gesto nuevo se
            puede visitar.
          </p>
        </div>
      </section>
      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-2">
          <Link
            to="/innovatives"
            className="kicker inline-flex h-9 items-center border border-ink px-3 text-xs hover:bg-ink hover:text-paper"
          >
            Todas
          </Link>
          {all.map((s) => (
            <CatChip
              key={s.slug}
              to="/innovatives/sector/$sector"
              params={{ sector: s.slug }}
              label={s.label}
              count={s.items.length}
              active={s.slug === group.slug}
              accent="innov"
            />
          ))}
        </div>
      </nav>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <ol>
          {group.items.map((c) => (
            <RankRow50 key={c.slug} company={c} />
          ))}
        </ol>
      </section>
      <Newsletter />
    </main>
  );
}
