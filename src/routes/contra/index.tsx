import { createFileRoute, Link } from "@tanstack/react-router";
import {
  articlesByFranchise,
  franchiseAuthors,
  franchiseTags,
  HOUSE,
} from "@/lib/content";
import { HorizontalCard, TagPills } from "@/components/article-card";
import { ContraMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";
import { CatChip } from "@/components/rank-pack";

export const Route = createFileRoute("/contra/")({
  component: ContraPage,
  head: () => ({
    meta: [{ title: "Contra la corriente — We Are Vander" }],
  }),
});

function ContraPage() {
  const essays = articlesByFranchise("contra");
  const lead = essays[0];
  const rest = essays.slice(1);
  const authors = franchiseAuthors("contra");
  const themes = franchiseTags("contra").filter((t) => t.kind !== "pace");
  const pace = franchiseTags("contra", "pace");

  return (
    <main>
      <section className="bg-canary px-4 py-14 text-ink sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src="/illustrations/contra.jpg"
              alt="Una figura camina contra la corriente de ejecutivos idénticos"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <h1>
              <ContraMark className="h-10 sm:h-14" />
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-ink">
              Opinión abiertamente contraria al consenso. Firmada. El carácter de la casa no es el
              equilibrio: es un no a tiempo, con nombre y apellido. {HOUSE.credit}.
            </p>
            <p className="mt-3 kicker text-xs text-ink/55">
              {essays.length} columnas · de fondo
            </p>
          </div>
        </div>
      </section>

      <nav className="border-b border-ink bg-paper-deep px-4 py-4 sm:px-6" aria-label="Categorías Contra">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Tema</p>
            {themes.map((t) => (
              <CatChip
                key={t.id}
                to="/contra/tag/$tag"
                params={{ tag: t.id }}
                label={t.label}
                accent="rust"
              />
            ))}
            {pace.map((t) => (
              <CatChip
                key={t.id}
                to="/contra/tag/$tag"
                params={{ tag: t.id }}
                label={t.label}
                accent="rust"
              />
            ))}
          </div>
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Firma</p>
            {authors.map((a) => (
              <CatChip
                key={a.id}
                to="/contra/autor/$autor"
                params={{ autor: a.id }}
                label={a.name}
                accent="rust"
              />
            ))}
          </div>
        </div>
      </nav>

      {lead && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="kicker text-xs text-rust">La tesis de la semana</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-12">
            <Link to="/story/$slug" params={{ slug: lead.slug }} className="photo block lg:col-span-7">
              <img src={lead.image} alt={lead.imageAlt} className="aspect-[16/10] w-full object-cover" />
            </Link>
            <div className="lg:col-span-5">
              <h2 className="headline text-4xl sm:text-6xl">
                <Link to="/story/$slug" params={{ slug: lead.slug }} className="link-title">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-4 font-body text-lg text-ink-soft">{lead.dek}</p>
              <p className="mt-3 kicker text-xs text-muted">
                {lead.signedName} · {lead.readMinutes} min de lectura · De fondo
              </p>
              <div className="mt-3">
                <TagPills article={lead} />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AdSlot size="leaderboard" creative="anuncia" />
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="headline border-b border-ink pb-2 text-3xl">Todas las columnas</h2>
          <div className="mt-2">
            {rest.map((a) => (
              <HorizontalCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4">
          <p className="kicker border-b border-ink pb-2 text-xs text-muted">Las firmas</p>
          <ul>
            {authors.map((a) => (
              <li key={a.id} className="border-b border-rule py-4">
                <Link to="/contra/autor/$autor" params={{ autor: a.id }} className="group flex gap-3">
                  <img src={a.image} alt="" className="size-14 object-cover" />
                  <span>
                    <span className="block font-sans text-sm font-semibold group-hover:text-rust">{a.name}</span>
                    <span className="mt-0.5 block font-kicker text-xs tracking-wider text-muted uppercase">
                      {a.role} · {a.city}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <Newsletter />
    </main>
  );
}
