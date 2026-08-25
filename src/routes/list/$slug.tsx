import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesMentioning, HOUSE } from "@/lib/content";
import { adjacentCompanies, getCompany, VANDER_LIST } from "@/lib/vander-list";
import { toCatSlug } from "@/lib/taxonomy";
import { HorizontalCard } from "@/components/article-card";
import { AdSlot } from "@/components/ad-slot";
import { Newsletter } from "@/components/newsletter";
import { Vander20Mark } from "@/components/brand";
import { JsonLd } from "@/components/json-ld";
import { Crumbs } from "@/components/faq-block";
import { seoHead, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { ShareBar } from "@/components/share-bar";

export const Route = createFileRoute("/list/$slug")({
  component: CompanyPage,
  head: ({ params }) => {
    const company = getCompany(params.slug);
    if (!company) {
      return seoHead({
        title: "Vander 20 — We Are Vander",
        description: "Esa compañía no está en el ranking.",
        path: `/list/${params.slug}`,
        noindex: true,
      });
    }
    return seoHead({
      title: `${company.name} es #${company.rank} del Vander 20 2026`,
      description: `${company.name} (${company.country}): ${company.blurb} Evidencia ${company.evidence}.`.slice(0, 155),
      path: `/list/${company.slug}`,
      image: "/og/vander-20.jpg",
      imageAlt: `Ficha de ${company.name} en el Vander 20 2026`,
      ogTitle: `${company.name}, #${company.rank} del Vander 20`.slice(0, 60),
      ogDescription: `${company.country}. Evidencia ${company.evidence}. ${company.blurb}`.slice(0, 110),
    });
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
      <JsonLd
        data={articleSchema({
          headline: `${company.name} — Vander 20 2026`,
          description: company.blurb,
          path: `/list/${company.slug}`,
          image: company.image,
          datePublished: "2026-08-23",
          author: "Team Vander",
          section: "Vander 20",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "We Are Vander", path: "/" },
          { name: "Vander 20", path: "/list" },
          { name: company.name, path: `/list/${company.slug}` },
        ])}
      />
      <section className="bg-ink px-4 py-10 text-paper sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Crumbs
            tone="dark"
            items={[
              { label: "Inicio", href: "/" },
              { label: "Vander 20", href: "/list" },
              { label: company.name },
            ]}
          />
          <Link to="/list" className="logo-mark inline-block max-w-xs">
            <Vander20Mark className="h-10 sm:h-12" />
          </Link>
          <p className="kicker mt-4 text-xs text-signal">
            {`${String(company.rank).padStart(2, "0")} / ${String(VANDER_LIST.length).padStart(2, "0")} · ${company.city} · ${company.country}`}
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
          <p className="mt-4 kicker text-xs text-signal">
            Evidencia {company.evidence} · {company.evidenceNote}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <ShareBar
            url={`/list/${company.slug}`}
            title={`${company.name} es #${company.rank} del Vander 20`}
            dek={company.blurb}
            layout="row"
            className="mb-8"
          />
          <img
            src={company.image}
            alt={company.imageAlt}
            className={company.imageKind === "logo" ? "aspect-video w-full bg-ivory object-contain p-12" : "aspect-video w-full object-cover"}
          />
          {company.profile.split("\n\n").map((para) => (
            <p key={para.slice(0, 40)} className="mt-7 reading text-ink">
              {para}
            </p>
          ))}
          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-ink py-5 sm:grid-cols-3">
            <div>
              <dt className="kicker text-xs text-muted">Ciudad</dt>
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
              <dt className="kicker text-xs text-muted">Evidencia</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">Grado {company.evidence}</dd>
            </div>
          </dl>
          <p className="mt-6 font-body text-base leading-relaxed text-ink">
            <span className="kicker mr-2 text-xs text-rust">Riesgo</span>
            {company.risk}
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            Ficha firmada por Team Vander. {HOUSE.credit}. El ranking no es un premio: ordena por si ganan
            plata y por quién lo verificó.
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
