import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesMentioning, HOUSE } from "@/lib/content";
import { adjacentCompanies, getCompany, VANDER_LIST } from "@/lib/vander-list";
import { toCatSlug } from "@/lib/taxonomy";
import { HorizontalCard } from "@/components/article-card";
import { AdSlot } from "@/components/ad-slot";
import { Newsletter } from "@/components/newsletter";
import { Vander20Mark } from "@/components/brand";
import { VerifiedStamp, CrossList } from "@/components/verified-stamp";


export const Route = createFileRoute("/list/$slug")({
  component: CompanyPage,
  head: ({ params }) => {
    const company = getCompany(params.slug);
    return {
      meta: [
        {
          title: company
            ? `${String(company.rank).padStart(2, "0")}. ${company.name} — Vander 20`
            : "Vander 20 — We Are Vander",
        },
      ],
    };
  },
});

function CompanyPage() {
  const { slug } = Route.useParams();
  const company = getCompany(slug);
  if (!company) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="kicker text-xs text-rust">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Esa compañía no está en el Vander 20.</h1>
        <Link to="/list" className="mt-6 inline-block kicker text-xs text-ink underline">
          Ver el ranking
        </Link>
      </main>
    );
  }

  const { prev, next } = adjacentCompanies(company.slug);
  const related = articlesMentioning(company.name, 4);

  return (
    <main>
      <section className="bg-ink px-4 py-10 text-paper sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Link to="/list" className="logo-mark inline-block max-w-xs">
            <Vander20Mark className="h-10 sm:h-12" />
          </Link>
          <p className="kicker mt-4 text-xs text-signal">
            {`${String(company.rank).padStart(2, "0")} / ${String(VANDER_LIST.length).padStart(2, "0")} · ${company.city}`}
          </p>
          <p className="headline mt-4 text-6xl tabular-nums text-signal sm:text-8xl">
            {String(company.rank).padStart(2, "0")}
          </p>
          <h1 className="headline mt-2 text-5xl sm:text-7xl">{company.name}</h1>
          <p className="mt-4 kicker text-xs text-silver">
            <Link
              to="/list/sector/$sector"
              params={{ sector: toCatSlug(company.sector) }}
              className="hover:text-signal"
            >
              {company.sector}
            </Link>
            {" · "}
            <Link to="/list/ciudad/$city" params={{ city: toCatSlug(company.city) }} className="hover:text-signal">
              {company.city}
            </Link>
            {" · Team Vander"}
          </p>
          <p className="mt-5 max-w-2xl font-body text-lg leading-snug text-paper/75">{company.blurb}</p>
          <div className="mt-5">
            <VerifiedStamp slug={company.slug} dark />
          </div>
          <div className="mt-2">
            <CrossList slug={company.slug} current="20" dark />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <img src={company.image} alt={company.imageAlt} className="aspect-video w-full object-cover" />
          <p className="mt-6 font-body text-lg leading-relaxed text-ink">{company.profile}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-ink py-5 sm:grid-cols-3">
            <div>
              <dt className="kicker text-xs text-muted">Mesa</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">
                <Link to="/list/ciudad/$city" params={{ city: toCatSlug(company.city) }} className="hover:text-signal">
                  {company.city}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="kicker text-xs text-muted">Sector</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">
                <Link
                  to="/list/sector/$sector"
                  params={{ sector: toCatSlug(company.sector) }}
                  className="hover:text-signal"
                >
                  {company.sector}
                </Link>
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="kicker text-xs text-muted">Verificación</dt>
              <dd className="mt-1">
                <VerifiedStamp slug={company.slug} />
              </dd>
            </div>
          </dl>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            Ficha firmada por Team Vander. {HOUSE.credit}. El ranking no es un premio: es un argumento
            sobre cómo se siente un negocio cuando el código de casa manda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/briefing"
              search={{ topic: company.name }}
              className="press kicker inline-flex h-11 items-center bg-ink px-5 text-xs text-paper hover:bg-rust"
            >
              Pedir briefing
            </Link>
            <Link
              to="/search"
              search={{ q: company.name }}
              className="press kicker inline-flex h-11 items-center border border-ink px-5 text-xs text-ink hover:bg-ink hover:text-paper"
            >
              Ver en el número
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="headline border-b border-ink pb-2 text-3xl">En el número</h2>
              <div className="mt-2">
                {related.map((a) => (
                  <HorizontalCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="lg:col-span-4">
          <AdSlot size="mpu" creative="anuncia" />
          <div className="mt-8 border-t border-ink pt-4">
            <p className="kicker text-xs text-muted">En el ranking</p>
            <ul className="mt-3">
              {VANDER_LIST.map((c) => (
                <li key={c.slug} className="border-b border-rule">
                  <Link
                    to="/list/$slug"
                    params={{ slug: c.slug }}
                    className={`grid grid-cols-12 items-baseline gap-2 py-2 ${c.slug === company.slug ? "text-rust" : "link-title"}`}
                  >
                    <span className="col-span-2 headline text-sm tabular-nums">
                      {String(c.rank).padStart(2, "0")}
                    </span>
                    <span className="col-span-10 truncate font-sans text-sm font-semibold">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <nav className="border-t border-ink px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          {prev ? (
            <Link to="/list/$slug" params={{ slug: prev.slug }} className="link-title min-w-0">
              <span className="kicker text-xs text-muted">Anterior</span>
              <p className="headline truncate text-xl">
                {String(prev.rank).padStart(2, "0")} {prev.name}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to="/list/$slug" params={{ slug: next.slug }} className="link-title min-w-0 text-right">
              <span className="kicker text-xs text-muted">Siguiente</span>
              <p className="headline truncate text-xl">
                {String(next.rank).padStart(2, "0")} {next.name}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
      <Newsletter />
    </main>
  );
}
