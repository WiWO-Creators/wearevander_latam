import { createFileRoute, Link } from "@tanstack/react-router";
import { vanderCity, vanderCities } from "@/lib/vander-list";
import { Vander20Mark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, EmptyCat, RankRow20 } from "@/components/rank-pack";

export const Route = createFileRoute("/list/ciudad/$city")({
  component: ListCityPage,
  head: ({ params }) => {
    const group = vanderCity(params.city);
    return {
      meta: [{ title: group ? `${group.label} — Vander 20` : "Vander 20" }],
    };
  },
});

function ListCityPage() {
  const { city } = Route.useParams();
  const group = vanderCity(city);
  const all = vanderCities();
  if (!group) {
    return (
      <EmptyCat>
        <p className="kicker text-xs text-signal">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Esa ciudad no está en el Vander 20.</h1>
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
          <p className="kicker mt-6 text-xs text-signal">Vander 20 · Ciudad</p>
          <h1 className="headline mt-2 text-5xl sm:text-7xl">{group.label}</h1>
          <p className="mt-4 max-w-xl font-body text-base text-paper/70">
            Mesa {group.label}: {group.items.length} {group.items.length === 1 ? "ficha" : "fichas"}.
          </p>
        </div>
      </section>
      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-2">
          <Link to="/list" className="kicker inline-flex h-9 items-center border border-ink px-3 text-xs hover:bg-ink hover:text-paper">
            Todas
          </Link>
          {all.map((c) => (
            <CatChip
              key={c.slug}
              to="/list/ciudad/$city"
              params={{ city: c.slug }}
              label={c.label}
              count={c.items.length}
              active={c.slug === group.slug}
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
