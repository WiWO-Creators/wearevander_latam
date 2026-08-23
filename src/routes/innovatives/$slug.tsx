import { createFileRoute, Link } from "@tanstack/react-router";
import { adjacentInnovative, getInnovative, INNOVATIVES } from "@/lib/innovatives";
import { toCatSlug } from "@/lib/taxonomy";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { CrossList } from "@/components/verified-stamp";

export const Route = createFileRoute("/innovatives/$slug")({
  component: InnovativeCompany,
  head: ({ params }) => {
    const company = getInnovative(params.slug);
    return {
      meta: [
        {
          title: company
            ? `${String(company.rank).padStart(2, "0")}. ${company.name} — 50 Innovatives`
            : "50 Innovatives — We Are Vander",
        },
      ],
    };
  },
});

function InnovativeCompany() {
  const { slug } = Route.useParams();
  const company = getInnovative(slug);
  if (!company) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="kicker text-xs text-innov">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Esa compañía no está en las 50 Innovatives.</h1>
        <Link to="/innovatives" className="mt-6 inline-block kicker text-xs underline">
          Ver el ranking
        </Link>
      </main>
    );
  }
  const { prev, next } = adjacentInnovative(company.slug);

  return (
    <main>
      <section className="bg-ink px-4 py-10 text-paper sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Link to="/innovatives" className="logo-mark inline-block max-w-md">
            <InnovativesMark wide className="h-10 sm:h-14" />
          </Link>
          <p className="kicker mt-6 text-xs text-innov">
            {`${String(company.rank).padStart(2, "0")} / ${String(INNOVATIVES.length).padStart(2, "0")} · ${company.city} · ${company.country}`}
          </p>
          <p className="headline mt-4 text-6xl tabular-nums text-innov sm:text-8xl">
            {String(company.rank).padStart(2, "0")}
          </p>
          <h1 className="headline mt-2 text-5xl sm:text-7xl">{company.name}</h1>
          <p className="mt-3 kicker text-xs text-silver">
            <Link
              to="/innovatives/sector/$sector"
              params={{ sector: toCatSlug(company.sector) }}
              className="hover:text-innov"
            >
              {company.sector}
            </Link>
            {" · "}
            {company.vertical}
            {" · "}
            <Link
              to="/innovatives/pais/$pais"
              params={{ pais: toCatSlug(company.country) }}
              className="hover:text-innov"
            >
              {company.country}
            </Link>
            {" · "}
            {company.city}
            {company.founded ? ` · Fundada ${company.founded}` : ""}
          </p>
          {company.warning ? (
            <p className="mt-4 max-w-xl border-l-2 border-rust pl-3 font-body text-sm text-paper/80">
              Advertencia editorial. {company.status || "Esta ficha no maquilla una dificultad real."}
            </p>
          ) : null}
          <div className="mt-5">
            <CrossList slug={company.slug} current="50" dark />
          </div>
        </div>
      </section>
      <figure className="mx-auto max-w-4xl bg-ivory px-4 py-10 sm:px-6">
        <img src={company.image} alt={`Marca de ${company.name}`} className="mx-auto max-h-64 w-auto object-contain" />
      </figure>
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="kicker text-xs text-innov">Brief</p>
        <p className="mt-3 font-body text-xl leading-snug">{company.brief}</p>
        <p className="kicker mt-10 text-xs text-innov">El detalle</p>
        <p className="mt-3 font-body text-lg leading-relaxed text-ink-soft">{company.detail}</p>
        <p className="kicker mt-10 text-xs text-innov">Por qué está en la lista</p>
        <p className="mt-3 font-body text-lg leading-relaxed">{company.why}</p>
        {company.stats.length > 0 && (
          <ul className="mt-10 border-y border-ink py-5">
            {company.stats.map((s) => (
              <li key={s} className="border-b border-rule py-2 font-sans text-sm last:border-b-0">
                {s}
              </li>
            ))}
          </ul>
        )}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {company.founders ? (
            <div>
              <dt className="kicker text-xs text-muted">Fundadores</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">{company.founders}</dd>
            </div>
          ) : null}
          {company.ceo ? (
            <div>
              <dt className="kicker text-xs text-muted">CEO</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">{company.ceo}</dd>
            </div>
          ) : null}
          {company.status ? (
            <div className="sm:col-span-2">
              <dt className="kicker text-xs text-muted">Estado</dt>
              <dd className="mt-1 font-sans text-sm">{company.status}</dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-8 flex flex-wrap gap-4">
          {company.web ? (
            <a href={company.web} target="_blank" rel="noreferrer" className="kicker text-xs text-innov hover:underline">
              {company.domain || "Sitio"}
            </a>
          ) : null}
          {company.press ? (
            <a href={company.press} target="_blank" rel="noreferrer" className="kicker text-xs text-muted hover:underline">
              Press kit
            </a>
          ) : null}
        </div>
        {company.sources.length > 0 && (
          <div className="mt-10">
            <p className="kicker text-xs text-muted">Fuentes</p>
            <ul className="mt-3 space-y-2">
              {company.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="font-body text-sm text-ink-soft hover:text-ink hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-10 flex justify-between gap-4 border-t border-ink pt-6">
          {prev ? (
            <Link to="/innovatives/$slug" params={{ slug: prev.slug }} className="kicker text-xs hover:text-innov">
              ← {String(prev.rank).padStart(2, "0")} {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to="/innovatives/$slug" params={{ slug: next.slug }} className="kicker text-xs hover:text-innov">
              {String(next.rank).padStart(2, "0")} {next.name} →
            </Link>
          )}
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
