import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ARTICLES,
  BRIEFS,
  ISSUE,
  latestArticles,
  leadByDesk,
  popularArticles,
} from "@/lib/content";
import { VANDER_LIST } from "@/lib/vander-list";
import {
  BriefRow,
  CoverHero,
  HorizontalCard,
  MiniLead,
  NumberedItem,
  RailItem,
  StackedCard,
  TextCard,
} from "@/components/article-card";
import { Newsletter } from "@/components/newsletter";

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

  return (
    <main>
      <CoverHero article={hero} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-12 lg:gap-7">
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

      <section className="border-y border-ink">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="kicker border-b-2 border-ink pb-2 text-xs text-rust">Lo más leído</h2>
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
            <h2 className="kicker border-b-2 border-ink pb-2 text-xs text-rust">Al minuto</h2>
            {BRIEFS.slice(0, 8).map((b) => (
              <BriefRow key={b.id} brief={b} />
            ))}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="mb-4 flex items-end justify-between border-b-2 border-ink pb-2">
          <h2 className="headline text-2xl uppercase">Desde las mesas</h2>
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

      <section className="bg-ink px-4 py-7 text-paper sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="kicker text-xs text-rust">Ranking 2026 · Latam</p>
              <h2 className="headline text-5xl uppercase sm:text-6xl">
                Vander 20
              </h2>
            </div>
            <Link to="/list" className="kicker text-xs text-paper hover:text-rust">
              Ver la lista
            </Link>
          </div>
          <ol className="mt-5 grid gap-x-8 border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {VANDER_LIST.map((c) => (
              <li key={c.rank} className="grid grid-cols-12 items-baseline gap-2 border-b border-paper/20 py-1.5">
                <span className="col-span-2 font-display text-xs font-extrabold tabular-nums text-rust">
                  {String(c.rank).padStart(2, "0")}
                </span>
                <span className="col-span-6 truncate font-display text-xs font-extrabold uppercase sm:text-sm">
                  {c.name}
                </span>
                <span className="col-span-4 truncate font-display text-xs text-paper/50">{c.city}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mb-3 flex items-end justify-between border-b-2 border-ink pb-2">
            <h2 className="headline text-2xl uppercase">Más historias</h2>
            <Link to="/section/$section" params={{ section: "ideas" }} className="kicker text-xs text-rust">
              Ideas
            </Link>
          </div>
          {more.map((a) => (
            <HorizontalCard key={a.slug} article={a} />
          ))}
        </div>
        <aside className="lg:col-span-4">
          <div className="mb-3 border-b-2 border-ink pb-2">
            <h2 className="headline text-2xl uppercase">El escritorio</h2>
          </div>
          {desk.map((a) => (
            <TextCard key={a.slug} article={a} />
          ))}
          <div className="mt-5">
            <Newsletter compact />
          </div>
        </aside>
      </section>

      <Newsletter />
    </main>
  );
}

function take(pool: typeof ARTICLES, used: Set<string>, n: number) {
  const out = pool.filter((a) => !used.has(a.slug)).slice(0, n);
  out.forEach((a) => used.add(a.slug));
  return out;
}
