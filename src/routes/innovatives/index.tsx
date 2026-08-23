import { createFileRoute, Link } from "@tanstack/react-router";
import { INNOVATIVES, INNOVATIVES_METHOD, innovCountries, innovSectors } from "@/lib/innovatives";
import { HOUSE, ISSUE } from "@/lib/content";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, MethodGrid, RankFeatured50, RankRow50, RankStat } from "@/components/rank-pack";

export const Route = createFileRoute("/innovatives/")({
  component: InnovativesPage,
  head: () => ({
    meta: [{ title: "50 Innovatives — We Are Vander" }],
  }),
});

function InnovativesPage() {
  const sectors = innovSectors();
  const countries = innovCountries();
  const featured = INNOVATIVES.slice(0, 3);

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-innov">Anual {ISSUE.date.split(" ").at(-1)} · Latam · Gesto nuevo</p>
          <h1 className="mt-5 max-w-3xl">
            <InnovativesMark wide className="h-16 sm:h-24 lg:h-28" />
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Las 50 empresas más innovadoras de América Latina. No las más ruidosas: las que se pueden
            visitar. Distinto al Vander 20: acá cuenta el gesto nuevo. Metodología pública. Cada ficha
            tiene mesa, fecha de visita y evidencia. {HOUSE.credit}.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <RankStat n="50" label="Compañías visitadas" />
            <RankStat n={String(sectors.length)} label="Sectores" />
            <RankStat n={String(countries.length)} label="Países" />
            <RankStat n="5" label="Criterios públicos" />
          </div>
        </div>
      </section>

      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6" aria-label="Categorías 50 Innovatives">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="kicker mr-2 text-xs text-muted">Sector</p>
            {sectors.map((s) => (
              <CatChip
                key={s.slug}
                to="/innovatives/sector/$sector"
                params={{ sector: s.slug }}
                label={s.label}
                count={s.items.length}
                accent="innov"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="kicker mr-2 text-xs text-muted">País</p>
            {countries.map((c) => (
              <CatChip
                key={c.slug}
                to="/innovatives/pais/$pais"
                params={{ pais: c.slug }}
                label={c.label}
                count={c.items.length}
                accent="innov"
              />
            ))}
            <Link
              to="/innovatives/metodologia"
              className="kicker ml-auto inline-flex h-9 items-center text-xs text-innov hover:underline"
            >
              Metodología
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="kicker text-xs text-innov">El gesto de este año</p>
        <h2 className="headline mt-2 text-3xl sm:text-5xl">Las tres que abren la lista</h2>
        <div className="mt-8">
          <RankFeatured50 companies={featured} />
        </div>
      </section>

      <section id="metodologia" className="border-y border-ink bg-paper-deep px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-innov">Metodología pública</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">Cómo entra una compañía</h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
            El ranking es anual. La mesa visita, llama y cruza. No hay pago por aparecer. El score es
            editorial: cinco criterios, publicados para que se puedan discutir.
          </p>
          <MethodGrid items={INNOVATIVES_METHOD} accent="innov" />
          <Link to="/innovatives/metodologia" className="kicker mt-8 inline-block text-xs text-innov hover:underline">
            Leer la metodología completa
          </Link>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-end justify-between">
            <h2 className="headline text-3xl sm:text-4xl">Las 50</h2>
            <p className="kicker text-xs text-muted">Edición {ISSUE.date.split(" ").at(-1)}</p>
          </div>
          <ol>
            {INNOVATIVES.map((c) => (
              <RankRow50 key={c.rank} company={c} adAfter={c.rank === 10} />
            ))}
          </ol>
          <p className="mt-8 font-sans text-sm text-muted">
            El Vander 20 —protocolo, no gesto— está en{" "}
            <Link to="/list" className="text-ink underline decoration-signal hover:text-signal">
              su propia lista
            </Link>
            .
          </p>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
