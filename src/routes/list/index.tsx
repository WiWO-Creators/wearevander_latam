import { createFileRoute, Link } from "@tanstack/react-router";
import {
  VANDER_LIST,
  VANDER_METHOD,
  VANDER_DEK,
  VANDER_TLDR,
  VANDER_FAQ,
  vanderCities,
  vanderSectors,
} from "@/lib/vander-list";
import { HOUSE, ISSUE } from "@/lib/content";
import { Newsletter } from "@/components/newsletter";
import { Vander20Mark } from "@/components/brand";
import { CatChip, MethodGrid, RankFeatured20, RankRow20, RankStat } from "@/components/rank-pack";
import { JsonLd } from "@/components/json-ld";
import { FaqBlock, Tldr, Crumbs } from "@/components/faq-block";
import { seoHead, breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/seo";

export const Route = createFileRoute("/list/")({
  component: ListPage,
  head: () =>
    seoHead({
      title: "Vander 20 2026: startups LatAm que ganan plata",
      description:
        "Ranking de las 20 compañías privadas de América Latina que ganan plata, ordenadas por calidad de la prueba. Evidencia A, B y C. Edición 2026.",
      path: "/list",
      image: "/og/vander-20.jpg",
      imageAlt: "Tarjeta Vander 20 2026: Las 20 que ganan plata. CloudWalk, QI Tech, Asaas.",
      ogTitle: "Las 20 de LatAm que ya ganan plata",
      ogDescription: "Veinte privadas, ordenadas por si ganan plata y quién lo verificó. Solo dos con evidencia A.",
    }),
});

function ListPage() {
  const sectors = vanderSectors();
  const cities = vanderCities();
  const featured = VANDER_LIST.slice(0, 3);
  const aCount = VANDER_LIST.filter((c) => c.evidence === "A").length;
  const bCount = VANDER_LIST.filter((c) => c.evidence === "B").length;
  const cCount = VANDER_LIST.filter((c) => c.evidence === "C").length;

  return (
    <main>
      <JsonLd
        data={itemListSchema({
          name: "Vander 20 2026",
          path: "/list",
          description: VANDER_DEK,
          items: VANDER_LIST.map((c) => ({ name: `${c.rank}. ${c.name}`, path: `/list/${c.slug}` })),
        })}
      />
      <JsonLd data={faqSchema(VANDER_FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "We Are Vander", path: "/" },
          { name: "Vander 20", path: "/list" },
        ])}
      />

      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Crumbs
            tone="dark"
            items={[
              { label: "Inicio", href: "/" },
              { label: "Vander 20" },
            ]}
          />
          <p className="kicker mt-4 text-xs text-signal">Ranking {ISSUE.date} · Latam · Rentabilidad</p>
          <div className="mt-5 max-w-3xl">
            <Vander20Mark className="h-12 max-w-full sm:h-28 lg:h-32" />
          </div>
          <h1 className="headline mt-6 max-w-3xl text-4xl leading-[1.05] text-paper sm:text-6xl">
            Vander 20: las compañías de LatAm que ganan plata
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            El Vander 20 es el ranking 2026 de We Are Vander de las veinte compañías privadas
            latinoamericanas fundadas después de 2010 que ganan plata. Se ordena por calidad de la
            prueba —A, B o C—, no por ronda ni por valuación. Verificamos más de 120 compañías en nueve
            países. Veinte pasaron.
          </p>
          <p className="mt-3 kicker text-xs text-silver">{HOUSE.credit} · Actualizado 23 agosto 2026</p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <RankStat n="20" label="Compañías que ganan plata" />
            <RankStat n={String(aCount)} label="Con evidencia A" />
            <RankStat n="9" label="Países revisados" />
            <RankStat n="2026" label="Edición" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Tldr items={VANDER_TLDR} />
      </div>

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
              Metodología pública
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="kicker text-xs text-signal">Las tres de la casa</p>
        <h2 className="headline mt-2 text-3xl sm:text-5xl">¿Quién lidera el Vander 20 2026?</h2>
        <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
          CloudWalk, QI Tech y Asaas encabezan el ranking. Solo QI Tech tiene evidencia A: rating de
          Fitch. El resto de las tres lidera por cifra propia o por punto de equilibrio declarado.
        </p>
        <div className="mt-8">
          <RankFeatured20 companies={featured} />
        </div>
      </section>

      <section className="border-y border-ink bg-paper-deep px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-signal">Cómo se arma</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">¿Cómo se verifica la rentabilidad?</h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
            We Are Vander, medio de negocios de Interadia, no usa agregadores. Si el dato no estaba en un
            comunicado, un informe de calificación, un regulador o una nota de prensa con fuente, no
            entró. Distinto a las{" "}
            <Link to="/innovatives" className="underline decoration-innov hover:text-innov">
              50 Innovatives
            </Link>
            : aquella lista premia innovación verificable; esta, resultado.
          </p>
          <MethodGrid items={VANDER_METHOD} accent="signal" />
          <p className="mt-6 font-body text-sm text-ink-soft">
            Evidencia en esta edición: {aCount} fichas A, {bCount} B, {cCount} C.{" "}
            <Link to="/list/metodologia" className="underline decoration-signal hover:text-signal">
              Leer la metodología completa
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="headline text-3xl sm:text-4xl">Las 20 compañías del ranking</h2>
          <p className="mt-3 font-body text-base text-ink-soft">
            Tabla de evidencia. El número uno es{" "}
            <Link to="/list/$slug" params={{ slug: "cloudwalk" }} className="underline hover:text-signal">
              CloudWalk
            </Link>
            .{" "}
            <Link to="/story/$slug" params={{ slug: "melimafia" }} className="underline hover:text-signal">
              Mercado Libre
            </Link>{" "}
            queda fuera por tamaño.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-ink">
                  <th className="kicker py-2 pr-3 text-xs text-muted">#</th>
                  <th className="kicker py-2 pr-3 text-xs text-muted">Compañía</th>
                  <th className="kicker py-2 pr-3 text-xs text-muted">País</th>
                  <th className="kicker py-2 pr-3 text-xs text-muted">Sector</th>
                  <th className="kicker py-2 text-xs text-muted">Evidencia</th>
                </tr>
              </thead>
              <tbody>
                {VANDER_LIST.map((c) => (
                  <tr key={c.slug} className="border-b border-rule">
                    <td className="py-2 pr-3 tabular-nums">{String(c.rank).padStart(2, "0")}</td>
                    <td className="py-2 pr-3 font-semibold">
                      <Link to="/list/$slug" params={{ slug: c.slug }} className="hover:text-signal">
                        {c.name}
                      </Link>
                    </td>
                    <td className="py-2 pr-3">{c.country}</td>
                    <td className="py-2 pr-3">{c.sector}</td>
                    <td className="py-2">{c.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="headline text-3xl sm:text-4xl">El ranking, ficha por ficha</h2>
          <ol>
            {VANDER_LIST.map((c) => (
              <RankRow20 key={c.rank} company={c} adAfter={c.rank === 6} />
            ))}
          </ol>
          <p className="mt-8 font-sans text-sm text-muted">
            Toku, en la lista de espera, también aparece en{" "}
            <Link to="/under40" className="text-ink underline decoration-rust hover:text-rust">
              100V Visionarios
            </Link>
            . Las 50 Innovatives viven en{" "}
            <Link to="/innovatives" className="text-ink underline decoration-innov hover:text-innov">
              otra lista
            </Link>
            . Fuentes de esta edición:{" "}
            <a
              href="https://reports.cuanticovp.com/latin-america-vc-report-2026/"
              className="underline hover:text-signal"
              rel="noopener noreferrer"
            >
              Cuántico VP, LatAm VC Report 2026
            </a>
            .
          </p>
          <FaqBlock items={VANDER_FAQ} />
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
