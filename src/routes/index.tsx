import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ARTICLES,
  BRIEFS,
  HOUSE,
  ISSUE,
  articlesByFranchise,
  latestArticles,
  leadByDesk,
  popularArticles,
} from "@/lib/content";
import { VANDER_LIST } from "@/lib/vander-list";
import { INNOVATIVES } from "@/lib/innovatives";
import {
  BriefRow,
  CoverHero,
  HorizontalCard,
  MiniLead,
  NumberedItem,
  RailItem,
  SignalRow,
  StackedCard,
  TextCard,
} from "@/components/article-card";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";
import { Vander20Mark, InnovativesMark, ContraMark, SignalsMark } from "@/components/brand";
import { SignalsField } from "@/components/signals-field";
import { VerifiedStamp } from "@/components/verified-stamp";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "We Are Vander — We Love Business · Latam" }],
  }),
});

function Home() {
  const ordered = latestArticles(36);
  const hero = ARTICLES.find((a) => a.featured) ?? ordered[0];
  const used = new Set<string>([hero.slug]);

  const rail = take(ordered, used, 6);
  const popular = popularArticles(5);
  const mid = take(ordered, used, 2);
  const cityLeads = leadByDesk().filter((a) => a.slug !== hero.slug);
  cityLeads.forEach((a) => used.add(a.slug));
  const more = take(ordered, used, 6);
  const desk = take(ordered, used, 6);
  const signals = articlesByFranchise("signals").slice(0, 4);
  const contra = articlesByFranchise("contra")[0];
  const fiftyLead = INNOVATIVES.slice(0, 3);
  const fiftyRest = INNOVATIVES.slice(3, 10);

  return (
    <main>
      <CoverHero article={hero} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-7">
        <div className="lg:col-span-8">
          {mid[0] && <StackedCard article={mid[0]} large />}
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

      <SignalsField>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/signals" className="logo-mark block max-w-xs">
              <SignalsMark className="h-12 sm:h-14" />
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
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-8">
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
          <div className="lg:col-span-5">
            {mid[1] && <StackedCard article={mid[1]} />}
          </div>
          <aside className="lg:col-span-3">
            <h2 className="kicker border-b border-ink pb-2 text-xs text-rust">Al minuto</h2>
            {BRIEFS.slice(0, 8).map((b) => (
              <BriefRow key={b.id} brief={b} />
            ))}
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <AdSlot size="billboard" creative="anuncia" />
      </div>

      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-paper/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker text-xs text-innov">Anual · 50 compañías visitadas</p>
              <Link to="/innovatives" className="logo-mark mt-3 block max-w-xl">
                <InnovativesMark wide className="h-14 sm:h-20" />
              </Link>
              <p className="mt-3 max-w-lg font-body text-sm text-paper/60">
                Innovación que se puede visitar. Metodología pública. Distinto al Vander 20: acá cuenta el gesto nuevo, no el código de casa.
              </p>
            </div>
            <Link to="/innovatives" className="kicker press text-xs text-paper hover:text-innov">
              Ver las 50
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {fiftyLead.map((c) => (
              <Link key={c.slug} to="/innovatives/$slug" params={{ slug: c.slug }} className="group block">
                <span className="photo block aspect-[3/2]">
                  <img src={c.image} alt="" />
                </span>
                <p className="mt-3 headline text-3xl tabular-nums text-innov">{String(c.rank).padStart(2, "0")}</p>
                <h3 className="headline mt-1 text-2xl">{c.name}</h3>
                <p className="mt-1 font-body text-sm text-paper/65">{c.blurb}</p>
                <VerifiedStamp slug={c.slug} dark compact />
              </Link>
            ))}
          </div>
          <ol className="mt-8 grid gap-x-8 border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {fiftyRest.map((c) => (
              <li key={c.rank} className="border-b border-paper/20">
                <Link
                  to="/innovatives/$slug"
                  params={{ slug: c.slug }}
                  className="grid grid-cols-12 items-baseline gap-2 py-2.5"
                >
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

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex items-end justify-between border-b border-ink pb-2">
          <h2 className="headline text-3xl sm:text-4xl">Desde las mesas</h2>
          <p className="kicker hidden text-xs text-muted sm:block">
            {ISSUE.date} · {ISSUE.city}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cityLeads.map((a) => (
            <MiniLead key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink bg-paper-deep">
        <div className="bg-ink px-4 py-10 text-paper sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker text-xs text-signal">Código de casa · 20 visitadas</p>
              <Link to="/list" className="logo-mark mt-3 block max-w-xl">
                <Vander20Mark className="h-16 sm:h-24" />
              </Link>
              <p className="mt-3 max-w-lg font-body text-sm text-paper/60">
                No es un ranking de innovación. Es el argumento de cómo se siente un negocio cuando el protocolo manda. Cada ficha fue visitada por una mesa.
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
                <Link
                  to="/list/$slug"
                  params={{ slug: c.slug }}
                  className="grid grid-cols-12 items-baseline gap-2 py-3"
                >
                  <span className="col-span-2 headline text-sm tabular-nums text-signal">
                    {String(c.rank).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 min-w-0">
                    <span className="block truncate font-sans text-xs font-semibold uppercase link-title sm:text-sm">
                      {c.name}
                    </span>
                    <span className="block truncate font-kicker text-xs tracking-wider text-muted uppercase">
                      {c.city} · visitada
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {contra && (
        <section className="border-y border-ink px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link to="/contra" className="logo-mark block max-w-sm">
                <ContraMark className="h-8 sm:h-10" />
              </Link>
              <p className="mt-4 font-body text-sm leading-relaxed text-ink-soft">
                Opinión firmada, abiertamente contraria al consenso. El carácter de la casa.
              </p>
              <Link to="/contra" className="kicker mt-3 inline-block text-xs text-rust">
                Todas las columnas
              </Link>
            </div>
            <div className="lg:col-span-8">
              <p className="kicker text-xs text-rust">{contra.signedName}</p>
              <h2 className="headline mt-2 text-3xl sm:text-5xl">
                <Link to="/story/$slug" params={{ slug: contra.slug }} className="link-title">
                  {contra.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-xl font-body text-base text-ink-soft">{contra.dek}</p>
              <p className="mt-3 font-kicker text-xs uppercase tracking-wider text-muted">
                {contra.readMinutes} min de lectura · De fondo
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mb-3 flex items-end justify-between border-b border-ink pb-2">
            <h2 className="headline text-3xl">Más historias</h2>
            <Link to="/section/$section" params={{ section: "ideas" }} className="kicker text-xs text-rust">
              Ideas
            </Link>
          </div>
          {more.map((a) => (
            <HorizontalCard key={a.slug} article={a} />
          ))}
        </div>
        <aside className="lg:col-span-4">
          <div className="mb-3 border-b border-ink pb-2">
            <h2 className="headline text-3xl">El escritorio</h2>
          </div>
          {desk.map((a) => (
            <TextCard key={a.slug} article={a} />
          ))}
          <div className="mt-5">
            <AdSlot size="mpu" creative="briefing" />
          </div>
          <div className="mt-5">
            <Newsletter compact />
          </div>
        </aside>
      </section>

      <p className="sr-only">{HOUSE.credit}</p>
      <Newsletter />
    </main>
  );
}

function take(pool: typeof ARTICLES, used: Set<string>, n: number) {
  const out = pool.filter((a) => !used.has(a.slug)).slice(0, n);
  out.forEach((a) => used.add(a.slug));
  return out;
}
