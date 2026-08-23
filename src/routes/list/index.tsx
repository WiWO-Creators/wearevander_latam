import { createFileRoute, Link } from "@tanstack/react-router";
import { VANDER_LIST, VANDER_METHOD, vanderCities, vanderSectors } from "@/lib/vander-list";
import { HOUSE, ISSUE } from "@/lib/content";
import { Newsletter } from "@/components/newsletter";
import { Vander20Mark } from "@/components/brand";
import { CatChip, MethodGrid, RankFeatured20, RankRow20, RankStat } from "@/components/rank-pack";

export const Route = createFileRoute("/list/")({
  component: ListPage,
  head: () => ({
    meta: [{ title: "Vander 20 — We Are Vander" }],
  }),
});

function ListPage() {
  const sectors = vanderSectors();
  const cities = vanderCities();
  const featured = VANDER_LIST.slice(0, 3);

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-signal">Ranking {ISSUE.date} · Latam · Protocolo</p>
          <h1 className="mt-5 max-w-3xl">
            <Vander20Mark className="h-12 max-w-full sm:h-28 lg:h-32" />
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Las veinte compañías que reescriben cómo se siente un negocio en América Latina. No las más
            ruidosas: las que tienen código de casa. Cada ficha fue visitada. El Vander 20 no
            es las 50 Innovatives: acá cuenta el protocolo, no el gesto nuevo.
          </p>
          <p className="mt-3 kicker text-xs text-silver">{HOUSE.credit}</p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <RankStat n="20" label="Compañías visitadas" />
            <RankStat n={String(sectors.length)} label="Sectores" />
            <RankStat n={String(cities.length)} label="Ciudades" />
            <RankStat n={ISSUE.date.split(" ").at(-1) ?? "2026"} label="Edición" />
          </div>
        </div>
      </section>

      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6" aria-label="Categorías Vander 20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Sector</p>
            {sectors.map((s) => (
              <CatChip
                key={s.slug}
                to="/list/sector/$sector"
                params={{ sector: s.slug }}
                label={s.label}
                count={s.items.length}
                accent="signal"
              />
            ))}
          </div>
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Ciudad</p>
            {cities.map((c) => (
              <CatChip
                key={c.slug}
                to="/list/ciudad/$city"
                params={{ city: c.slug }}
                label={c.label}
                count={c.items.length}
                accent="signal"
              />
            ))}
            <Link to="/list/metodologia" className="kicker ml-auto inline-flex h-9 items-center text-xs text-signal hover:underline">
              Metodología
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="kicker text-xs text-signal">Las tres de la casa</p>
        <h2 className="headline mt-2 text-3xl sm:text-5xl">Cómo se siente el número uno</h2>
        <div className="mt-8">
          <RankFeatured20 companies={featured} />
        </div>
      </section>

      <section id="metodologia" className="border-y border-ink bg-paper-deep px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-signal">Cómo se arma</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">Cinco reglas. Públicas.</h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
            El Vander 20 es anual y editorial. No hay pago por aparecer. Distinto a las 50 Innovatives: acá
            no entra el gesto que todavía no es hábito.
          </p>
          <MethodGrid items={VANDER_METHOD} accent="signal" />
          <Link to="/list/metodologia" className="kicker mt-8 inline-block text-xs text-signal hover:underline">
            Leer la metodología completa
          </Link>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-end justify-between">
            <h2 className="headline text-3xl sm:text-4xl">El ranking</h2>
            <p className="kicker text-xs text-muted">{VANDER_LIST.length} fichas</p>
          </div>
          <ol>
            {VANDER_LIST.map((c) => (
              <RankRow20 key={c.rank} company={c} adAfter={c.rank === 6} />
            ))}
          </ol>
          <p className="mt-8 font-sans text-sm text-muted">
            ¿El argumento detrás de un nombre?{" "}
            <Link to="/briefing" className="text-ink underline decoration-rust hover:text-rust">
              Pide un briefing
            </Link>
            . Las 50 Innovatives viven en{" "}
            <Link to="/innovatives" className="text-ink underline decoration-innov hover:text-innov">
              otra lista
            </Link>
            .
          </p>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
