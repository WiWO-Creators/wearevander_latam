import { createFileRoute, Link } from "@tanstack/react-router";
import { adjacentInnovative, getInnovative, INNOVATIVES } from "@/lib/innovatives";
import { toCatSlug } from "@/lib/taxonomy";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { VerifiedStamp, CrossList } from "@/components/verified-stamp";
import { verifyOf } from "@/lib/verify";


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
  const stamp = verifyOf(company.slug);

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
            <Link
              to="/innovatives/pais/$pais"
              params={{ pais: toCatSlug(company.country) }}
              className="hover:text-innov"
            >
              {company.country}
            </Link>
            {" · "}
            {company.city}
          </p>
          <div className="mt-5">
            <VerifiedStamp slug={company.slug} dark />
          </div>
          <div className="mt-2">
            <CrossList slug={company.slug} current="50" dark />
          </div>
        </div>
      </section>
      <figure className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <img src={company.image} alt="" className="aspect-video w-full object-cover" />
      </figure>
      <div className="mx-auto max-w-2xl px-4 pb-12 sm:px-6">
        <p className="kicker text-xs text-innov">Por qué entra</p>
        <p className="mt-3 font-body text-lg leading-relaxed">{company.why}</p>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">{company.blurb}</p>
        {stamp && (
          <dl className="mt-8 grid gap-4 border-y border-ink py-5 sm:grid-cols-3">
            <div>
              <dt className="kicker text-xs text-muted">Fundada</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">{stamp.founded}</dd>
            </div>
            <div>
              <dt className="kicker text-xs text-muted">Evidencia</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">{stamp.proof}</dd>
            </div>
            <div>
              <dt className="kicker text-xs text-muted">Mesa</dt>
              <dd className="mt-1 font-sans text-sm font-semibold">{stamp.desk}</dd>
            </div>
          </dl>
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
