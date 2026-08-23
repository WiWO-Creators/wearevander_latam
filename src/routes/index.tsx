import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ARTICLES,
  HOUSE,
  ISSUE,
  articlesByFormat,
  articlesByFranchise,
  latestArticles,
  popularArticles,
} from "@/lib/content";
import { VANDER_LIST } from "@/lib/vander-list";
import { INNOVATIVES } from "@/lib/innovatives";
import { UNDER40 } from "@/lib/under40";
import { PAY_ROWS, SHIFT_ROWS } from "@/lib/indice";
import {
  CoverHero,
  NumberedItem,
  RailItem,
  SignalRow,
  StackedCard,
} from "@/components/article-card";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";
import { Vander20Mark, InnovativesMark, ContraMark, SignalsMark, ChileOnly } from "@/components/brand";
import { SignalsField } from "@/components/signals-field";
import { VerifiedStamp } from "@/components/verified-stamp";
import { Under40Shot } from "@/components/under40-shot";
import { LiveDesk } from "@/components/live-desk";
import { JsonLd } from "@/components/json-ld";
import { seoHead, orgSchema, websiteSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    seoHead({
      title: "We Are Vander — negocios de América Latina",
      description:
        "We Are Vander es el medio de negocios de Interadia. Rankings, reportajes y cifras de compañías latinoamericanas, con metodología pública.",
      path: "/",
      image: "/og/home.jpg",
      imageAlt: "Wordmark We Are Vander sobre negro, con la línea Negocios de América Latina",
      ogTitle: "Negocios de América Latina, con cifra",
      ogDescription: "Rankings y reportajes de compañías latinas. Metodología pública. No es un ranking de rondas.",
    }),
});

function Home() {
  const ordered = latestArticles(36);
  const hero = ARTICLES.find((a) => a.featured) ?? ordered[0];
  const used = new Set<string>([hero.slug]);

  const interview = articlesByFormat("interview")[0];
  if (interview) used.add(interview.slug);
  const rail = take(ordered, used, 5);
  const popular = popularArticles(5);
  const signals = articlesByFranchise("signals").slice(0, 4);
  const contra = articlesByFranchise("contra")[0];
  const obits = articlesByFormat("obituario").slice(0, 4);
  const flash = articlesByFormat("flash")[0];
  const visual = articlesByFormat("visual")[0];
  const fiftyLead = INNOVATIVES.slice(0, 3);
  const fiftyRest = INNOVATIVES.slice(3, 10);

  return (
    <main>
      <JsonLd data={orgSchema()} />
      <JsonLd data={websiteSchema()} />
      <CoverHero article={hero} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-7">
        <div className="lg:col-span-8">
          {interview && <StackedCard article={interview} large />}
        </div>
        <aside className="lg:col-span-4 lg:border-l lg:border-rule lg:pl-5">
          <p className="kicker mb-1 text-xs text-muted">En portada</p>
          {rail.map((a) => (
            <RailItem key={a.slug} article={a} />
          ))}
        </aside>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <AdSlot size="leaderboard" creative="anuncia" />
      </div>

      <LiveDesk compact />

      <section className="border-y border-ink bg-paper-deep px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker text-xs text-rust">Data · se cita</p>
              <h2 className="headline mt-1 text-4xl sm:text-5xl">
                <Link to="/indice" className="link-title">
                  El Índice
                </Link>
              </h2>
              <p className="mt-2 max-w-lg font-body text-sm text-ink-soft">
                Sueldos, segundo turno, offtakes. Lo que Vander midió este mes — no lo que opinó.
              </p>
            </div>
            <Link to="/indice" className="kicker text-xs text-rust hover:underline">
              Ver las tablas
            </Link>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="border-b border-ink pb-2 font-sans text-xs font-semibold uppercase tracking-wide text-muted">US$ anual</p>
              <ul>
                {PAY_ROWS.slice(0, 6).map((r) => (
                  <li key={r.city} className="flex items-baseline justify-between gap-3 border-b border-rule py-2">
                    <span className="font-sans text-sm font-semibold">{r.city}</span>
                    <span className="tabular-nums font-sans text-sm">{r.usd.toLocaleString("es-MX")}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="border-b border-ink pb-2 font-sans text-xs font-semibold uppercase tracking-wide text-muted">Segundo turno</p>
              <ul>
                {SHIFT_ROWS.map((r) => (
                  <li key={r.plant} className="flex items-baseline justify-between gap-3 border-b border-rule py-2">
                    <span className="min-w-0 truncate font-sans text-sm font-semibold">{r.plant}</span>
                    <span className="tabular-nums font-sans text-sm">{r.added.toLocaleString("es-MX")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SignalsField>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/signals" className="logo-mark block max-w-xs">
              <SignalsMark className="h-10 max-w-full sm:h-14" />
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-soft">
              Lo que todavía no es tendencia. 300 palabras. Un indicador, un lugar, una frase.
            </p>
            <Link to="/signals" className="kicker mt-3 inline-block text-xs text-ink hover:text-rust">
              Ver Signals
            </Link>
          </div>
          <div className="lg:col-span-8">
            {signals.map((a) => (
              <SignalRow key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </SignalsField>

      <section className="border-y border-ink">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="kicker border-b border-ink pb-2 text-xs text-rust">Lo más leído</h2>
            <ol>
              {popular.map((a, i) => (
                <li key={a.slug}>
                  <NumberedItem article={a} rank={i + 1} />
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <p className="kicker border-b border-ink pb-2 text-xs text-rust">90 segundos</p>
            {flash && (
              <div className="pt-4">
                <StackedCard article={flash} />
              </div>
            )}
            {visual && (
              <div className="mt-6 border-t border-rule pt-6">
                <StackedCard article={visual} />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <AdSlot size="billboard" creative="anuncia" />
      </div>

      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-paper/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker text-xs text-innov">Anual · 50 compañías</p>
              <Link to="/innovatives" className="logo-mark mt-3 block max-w-xl">
                <InnovativesMark wide className="h-10 max-w-full sm:h-20" />
              </Link>
              <p className="mt-3 max-w-lg font-body text-sm text-paper/60">
                No las más grandes. Las que están rompiendo algo. Innovación verificable, cifra con fuente, metodología pública.
              </p>
            </div>
            <Link to="/innovatives" className="kicker press text-xs text-paper hover:text-innov">
              Ver las 50
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {fiftyLead.map((c) => (
              <Link key={c.slug} to="/innovatives/$slug" params={{ slug: c.slug }} className="group block">
                <span className="photo innov-logo block aspect-[3/2] w-full bg-ivory">
                  <img src={c.image} alt={c.name} className="h-full w-full object-contain p-5" />
                </span>
                <p className="mt-3 headline text-3xl tabular-nums text-innov">{String(c.rank).padStart(2, "0")}</p>
                <h3 className="headline mt-1 text-2xl">{c.name}</h3>
                <p className="mt-1 font-body text-sm text-paper/65">{c.blurb}</p>
              </Link>
            ))}
          </div>
          <ol className="mt-8 grid gap-x-8 border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {fiftyRest.map((c) => (
              <li key={c.rank} className="border-b border-paper/20">
                <Link to="/innovatives/$slug" params={{ slug: c.slug }} className="grid grid-cols-12 items-baseline gap-2 py-2.5">
                  <span className="col-span-3 headline text-sm tabular-nums text-innov">
                    {String(c.rank).padStart(2, "0")}
                  </span>
                  <span className="col-span-9">
                    <span className="block truncate font-sans text-xs font-semibold uppercase link-title">{c.name}</span>
                    <span className="block truncate font-kicker text-xs tracking-wider text-paper/45 uppercase">
                      {c.city}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ink bg-paper-deep">
        <div className="bg-ink px-4 py-10 text-paper sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker text-xs text-signal">Rentabilidad · 20 compañías</p>
              <Link to="/list" className="logo-mark mt-3 block max-w-xl">
                <Vander20Mark className="h-12 max-w-full sm:h-24" />
              </Link>
              <p className="mt-3 max-w-lg font-body text-sm text-paper/60">
                No es un ranking de innovación. Es la lista de las veinte compañías latinoamericanas que ganan plata, ordenadas por la calidad de la prueba.
              </p>
            </div>
            <Link to="/list" className="kicker press text-xs text-paper hover:text-signal">
              Ver la lista
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {VANDER_LIST.map((c) => (
              <li key={c.rank} className="border-b border-ink/15">
                <Link to="/list/$slug" params={{ slug: c.slug }} className="grid grid-cols-12 items-baseline gap-2 py-3">
                  <span className="col-span-2 headline text-sm tabular-nums text-signal">
                    {String(c.rank).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 min-w-0">
                    <span className="block truncate font-sans text-xs font-semibold uppercase link-title sm:text-sm">
                      {c.name}
                    </span>
                    <span className="block truncate font-kicker text-xs tracking-wider text-muted uppercase">
                      {c.city} · {c.country} · {c.evidence}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ink px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kicker inline-flex items-center gap-2 text-xs text-rust">
                <ChileOnly /> · agosto 2026
              </p>
              <h2 className="headline mt-1 text-4xl sm:text-5xl">
                <Link to="/under40" className="link-title">
                  100V Visionarios
                </Link>
              </h2>
              <p className="mt-2 max-w-lg font-body text-sm text-ink-soft">
                Cien fichas de Chile. Edad declarada. Prensa con enlace. Esta lista no cubre la región.
              </p>
            </div>
            <Link to="/under40" className="kicker text-xs text-rust hover:underline">
              El dossier
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {UNDER40.slice(0, 8).map((p) => (
              <li key={p.slug}>
                <Link to="/under40/$slug" params={{ slug: p.slug }} className="group block">
                  <Under40Shot person={p} />
                  <p className="kicker mt-2 text-[10px] text-rust">{String(p.rank).padStart(3, "0")}</p>
                  <p className="headline mt-0.5 text-base leading-[1.1]">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {contra && (
        <section className="border-y border-ink bg-canary px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12">
            <Link to="/contra" className="block lg:col-span-5">
              <img
                src="/illustrations/contra.jpg"
                alt="Una figura camina contra la corriente de ejecutivos idénticos"
                className="aspect-[16/9] w-full object-cover object-center"
              />
            </Link>
            <div className="lg:col-span-7">
              <Link to="/contra" className="logo-mark block max-w-sm">
                <ContraMark className="h-8 sm:h-10" />
              </Link>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink">
                Opinión firmada, abiertamente contraria al consenso. El carácter de la casa.
              </p>
              <p className="kicker mt-6 text-xs text-ink">{contra.signedName}</p>
              <h2 className="headline mt-2 text-3xl leading-[1.08] sm:text-5xl">
                <Link to="/story/$slug" params={{ slug: contra.slug }} className="link-title">
                  {contra.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-xl font-body text-base leading-snug text-ink/80">{contra.dek}</p>
              <p className="mt-3 font-kicker text-xs uppercase tracking-wider text-ink/50">
                {contra.readMinutes} min de lectura · De fondo
              </p>
              <Link to="/contra" className="kicker mt-5 inline-block text-xs text-ink hover:text-rust">
                Todas las columnas
              </Link>
            </div>
          </div>
        </section>
      )}

      {obits.length > 0 && (
      <section className="bg-ink px-4 py-12 text-paper sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4 border-b border-paper/20 pb-3">
            <div>
              <p className="kicker text-xs text-rust">We Love Business</p>
              <h2 className="headline mt-1 text-4xl">
                <Link to="/obituarios" className="link-title">
                  Obituarios
                </Link>
              </h2>
            </div>
            <Link to="/obituarios" className="kicker text-xs text-silver hover:text-paper">
              El archivo
            </Link>
          </div>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {obits.map((a) => (
              <article key={a.slug}>
                <p className="kicker text-xs text-silver">Q.E.P.D.</p>
                <h3 className="headline mt-2 text-xl">
                  <Link to="/story/$slug" params={{ slug: a.slug }} className="link-title">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 font-body text-sm text-paper/60">{a.dek}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      <p className="sr-only">{HOUSE.name} · {ISSUE.title}</p>
      <Newsletter />
    </main>
  );
}

function take(pool: typeof ARTICLES, used: Set<string>, n: number) {
  const out = pool.filter((a) => !used.has(a.slug)).slice(0, n);
  out.forEach((a) => used.add(a.slug));
  return out;
}
