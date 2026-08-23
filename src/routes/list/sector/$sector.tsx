import { createFileRoute, Link } from "@tanstack/react-router";
import { vanderSector, vanderSectors } from "@/lib/vander-list";
import { Vander20Mark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, EmptyCat, RankRow20 } from "@/components/rank-pack";

export const Route = createFileRoute("/list/sector/$sector")({
  component: ListSectorPage,
  head: ({ params }) => {
    const group = vanderSector(params.sector);
    return {
      meta: [{ title: group ? `${group.label} — Vander 20` : "Vander 20" }],
    };
  },
});

function ListSectorPage() {
  const { sector } = Route.useParams();
  const group = vanderSector(sector);
  const all = vanderSectors();
  if (!group) {
    return (
      <EmptyCat>
        <p className="kicker text-xs text-signal">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Ese sector no está en el Vander 20.</h1>
        <Link to="/list" className="mt-6 inline-block kicker text-xs underline">
          Ver el ranking
        </Link>
      </EmptyCat>
    );
  }

  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link to="/list" className="logo-mark inline-block max-w-xs">
            <Vander20Mark className="h-10 sm:h-12" />
          </Link>
          <p className="kicker mt-6 text-xs text-signal">Vander 20 · Sector</p>
          <h1 className="headline mt-2 text-5xl sm:text-7xl">{group.label}</h1>
          <p className="mt-4 max-w-xl font-body text-base text-paper/70">
            {group.items.length} {group.items.length === 1 ? "compañía" : "compañías"} con código de casa en{" "}
            {group.label.toLowerCase()}.
          </p>
        </div>
      </section>
      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-2">
          <Link to="/list" className="kicker inline-flex h-9 items-center border border-ink px-3 text-xs hover:bg-ink hover:text-paper">
            Todas
          </Link>
          {all.map((s) => (
            <CatChip
              key={s.slug}
              to="/list/sector/$sector"
              params={{ sector: s.slug }}
              label={s.label}
              count={s.items.length}
              active={s.slug === group.slug}
              accent="signal"
            />
          ))}
        </div>
      </nav>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <ol>
          {group.items.map((c) => (
            <RankRow20 key={c.slug} company={c} />
          ))}
        </ol>
      </section>
      <Newsletter />
    </main>
  );
}
