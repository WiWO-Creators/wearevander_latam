import { createFileRoute, Link } from "@tanstack/react-router";
import {
  INNOVATIVES,
  INNOVATIVES_META,
  INNOVATIVES_METHOD,
  INNOV_WATCH,
  innovCountries,
  innovSectors,
} from "@/lib/innovatives";
import { HOUSE } from "@/lib/content";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CatChip, MethodGrid, RankFeatured50, RankRow50, RankStat } from "@/components/rank-pack";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/innovatives/")({
  component: InnovativesPage,
  head: () =>
    seoHead({
      title: "50 Innovatives 2026: innovación verificable LatAm",
      description:
        "Las 50 compañías más innovadoras de América Latina según We Are Vander. Metodología pública, no es un ranking de rondas.",
      path: "/innovatives",
      image: "/og/innovatives.jpg",
      imageAlt: "50 Innovatives 2026: 50 que innovan. No las que más levantan.",
      ogTitle: "50 que innovan. No las que más levantan.",
      ogDescription: "Innovación verificable en LatAm. Metodología pública. Distinto al Vander 20.",
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
          <p className="kicker text-xs text-innov">{INNOVATIVES_META.kicker}</p>
          <h1 className="mt-5 max-w-3xl">
            <InnovativesMark wide className="h-10 max-w-full sm:h-24 lg:h-28" />
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            {INNOVATIVES_META.dek} {HOUSE.credit}.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <RankStat n="50" label="Compañías" />
            <RankStat n="8" label="Países" />
            <RankStat n="6" label="Verticales" />
            <RankStat n="21" label="Nombres a vigilar" />
          </div>
        </div>
      </section>

      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6" aria-label="Categorías 50 Innovatives">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Vertical</p>
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
          <div className="chip-row items-center">
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
        <p className="kicker text-xs text-innov">01 · 02 · 03</p>
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
            Investigación de agosto de 2026. Cada cifra tiene fuente y año. Datos al {INNOVATIVES_META.updated}.
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
            <p className="kicker text-xs text-muted">Edición 2026</p>
          </div>
          <ol>
            {INNOVATIVES.map((c) => (
              <RankRow50 key={c.rank} company={c} adAfter={c.rank === 10} />
            ))}
          </ol>
          <p className="mt-6 font-body text-xs text-muted">
            <span className="text-rust">*</span> Advertencia editorial: la ficha no maquilla una dificultad real.
          </p>
        </div>
      </section>

      <section className="border-t border-ink bg-ivory px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-innov">La próxima ola</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">21 nombres para vigilar</h2>
          <p className="mt-3 max-w-xl font-body text-sm text-ink-soft">
            Quedaron fuera por poco —o porque son demasiado nuevas para juzgarlas.
          </p>
          <ul className="mt-8 divide-y divide-ink/10">
            {INNOV_WATCH.map((w) => (
              <li key={w.name} className="grid gap-1 py-4 sm:grid-cols-12 sm:items-baseline">
                <p className="headline text-xl sm:col-span-3">
                  {w.name}
                  {w.warning ? <span className="ml-1 text-rust">*</span> : null}
                </p>
                <p className="kicker text-[10px] text-muted sm:col-span-3">
                  {w.country} · {w.vertical}
                </p>
                <p className="font-body text-sm text-ink-soft sm:col-span-6">{w.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <p className="mx-auto max-w-4xl font-sans text-sm text-muted">
          El Vander 20 —quién gana plata, y quién lo verificó— está en{" "}
          <Link to="/list" className="text-ink underline decoration-signal hover:text-signal">
            su propia lista
          </Link>
          .
        </p>
      </section>
      <Newsletter />
    </main>
  );
}
