import { createFileRoute, Link } from "@tanstack/react-router";
import { adjacentUnder40, getUnder40 } from "@/lib/under40";
import { Under40Shot, Under40Verify } from "@/components/under40-shot";
import { Newsletter } from "@/components/newsletter";
import { HOUSE } from "@/lib/content";

export const Route = createFileRoute("/under40/$slug")({
  component: Under40ProfilePage,
  head: ({ params }) => {
    const person = getUnder40(params.slug);
    return {
      meta: [
        {
          title: person
            ? `${String(person.rank).padStart(3, "0")}. ${person.name} — 100 under 40`
            : "100 under 40 — We Are Vander",
        },
      ],
    };
  },
});

function Under40ProfilePage() {
  const { slug } = Route.useParams();
  const person = getUnder40(slug);
  if (!person) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="kicker text-xs text-rust">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Ese perfil no está en los 100.</h1>
        <Link to="/under40" className="mt-6 inline-block kicker text-xs underline">
          Ver el dossier
        </Link>
      </main>
    );
  }
  const { prev, next } = adjacentUnder40(person.slug);

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-6">
            <Under40Shot person={person} sizes="hero" className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[32rem]" />
          </div>
          <div className="flex flex-col justify-end px-4 py-8 sm:px-8 lg:col-span-6 lg:px-10 lg:py-12">
            <Link to="/under40" className="kicker text-xs text-rust hover:underline">
              100 under 40 · Chile
            </Link>
            <p className="headline mt-4 text-5xl tabular-nums text-rust sm:text-7xl">
              {String(person.rank).padStart(3, "0")}
            </p>
            <h1 className="headline mt-2 text-4xl leading-[1.06] sm:text-6xl">{person.name}</h1>
            <p className="mt-4 font-body text-lg leading-snug text-paper/80">{person.role}</p>
            <p className="mt-3 kicker text-xs text-silver">
              {person.sector}
              {person.focus ? ` · ${person.focus}` : ""} · {person.place}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {person.ageShort ? (
                <span className="headline text-2xl">{person.ageShort}</span>
              ) : null}
              <Under40Verify status={person.verification} />
            </div>
            {person.url ? (
              <a
                href={person.url}
                target="_blank"
                rel="noreferrer"
                className="press kicker mt-6 inline-flex h-11 w-fit items-center border border-paper/30 px-5 text-xs text-paper hover:bg-paper hover:text-ink"
              >
                {person.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {person.age ? (
          <p className="font-kicker text-xs uppercase tracking-wider text-muted">{person.age}</p>
        ) : null}
        <p className="mt-4 font-body text-lg leading-relaxed text-ink">{person.bio}</p>

        {person.hitos.length > 0 && (
          <section className="mt-12">
            <h2 className="headline text-3xl sm:text-4xl">Hitos</h2>
            <ol className="mt-4 space-y-3">
              {person.hitos.map((h) => (
                <li key={h} className="border-t border-rule pt-3 font-body text-base leading-relaxed text-ink-soft">
                  {h}
                </li>
              ))}
            </ol>
          </section>
        )}

        {person.news.length > 0 && (
          <section className="mt-12">
            <h2 className="headline text-3xl sm:text-4xl">En la prensa</h2>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {person.news.map((n) => (
                <li key={n.title} className="py-4">
                  {n.url ? (
                    <a href={n.url} target="_blank" rel="noreferrer" className="group block">
                      <p className="headline text-xl leading-[1.12] group-hover:text-rust">{n.title}</p>
                      {n.credit ? <p className="mt-1 kicker text-xs text-muted">{n.credit}</p> : null}
                    </a>
                  ) : (
                    <div>
                      <p className="headline text-xl leading-[1.12]">{n.title}</p>
                      {n.credit ? <p className="mt-1 kicker text-xs text-muted">{n.credit}</p> : null}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 kicker text-xs text-muted">
          Confianza de la ficha: {person.trust || "—"}. {HOUSE.credit}. Cierre de datos: 20 de agosto de 2026.
        </p>
      </article>

      <nav className="border-t border-ink px-4 py-8 sm:px-6" aria-label="Anterior y siguiente">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2">
          <Link to="/under40/$slug" params={{ slug: prev.slug }} className="group block">
            <p className="kicker text-xs text-muted">Anterior</p>
            <p className="headline mt-1 text-2xl group-hover:text-rust">{prev.name}</p>
          </Link>
          <Link to="/under40/$slug" params={{ slug: next.slug }} className="group block sm:text-right">
            <p className="kicker text-xs text-muted">Siguiente</p>
            <p className="headline mt-1 text-2xl group-hover:text-rust">{next.name}</p>
          </Link>
        </div>
      </nav>
      <Newsletter />
    </main>
  );
}
