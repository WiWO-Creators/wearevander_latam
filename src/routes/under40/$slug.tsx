import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Linkedin } from "lucide-react";
import type { ReactNode } from "react";
import { adjacentUnder40, getUnder40, hostFromUrl, under40Links } from "@/lib/under40";
import { Under40Shot, Under40Verify } from "@/components/under40-shot";
import { ChileOnly } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { HOUSE } from "@/lib/content";
import { ShareBar } from "@/components/share-bar";

export const Route = createFileRoute("/under40/$slug")({
  component: Under40ProfilePage,
  head: ({ params }) => {
    const person = getUnder40(params.slug);
    return {
      meta: [
        {
          title: person
            ? `${String(person.rank).padStart(3, "0")}. ${person.name} — 100V Visionarios`
            : "100V Visionarios — We Are Vander",
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
  const links = under40Links(person);

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <Under40Shot
              person={person}
              sizes="hero"
              className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[36rem]"
            />
          </div>
          <div className="flex flex-col justify-end px-4 py-10 sm:px-8 lg:col-span-7 lg:px-12 lg:py-14">
            <Link to="/under40" className="kicker inline-flex items-center gap-2 text-xs text-rust hover:underline">
              100V Visionarios · <ChileOnly />
            </Link>
            <p className="headline mt-5 text-6xl tabular-nums leading-none text-rust sm:text-8xl">
              {String(person.rank).padStart(3, "0")}
            </p>
            <h1 className="headline mt-3 text-4xl leading-[1.04] sm:text-6xl lg:text-7xl">{person.name}</h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-snug text-paper/80">{person.role}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <MetaChip>{person.sector}</MetaChip>
              {person.focus ? <MetaChip>{person.focus}</MetaChip> : null}
              <MetaChip>{person.place}</MetaChip>
              {person.ageShort ? <MetaChip>{person.ageShort}</MetaChip> : null}
            </ul>
            <div className="mt-4">
              <Under40Verify status={person.verification} />
            </div>
            {links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      l.kind === "linkedin"
                        ? "inline-flex h-11 items-center gap-2 bg-rust px-5 kicker text-xs text-paper hover:bg-paper hover:text-ink"
                        : "inline-flex h-11 items-center gap-2 border border-paper/35 px-5 kicker text-xs text-paper hover:bg-paper hover:text-ink"
                    }
                  >
                    {l.kind === "linkedin" ? (
                      <Linkedin className="size-4" strokeWidth={1.6} />
                    ) : (
                      <Globe className="size-4" strokeWidth={1.6} />
                    )}
                    {l.kind === "linkedin" ? "LinkedIn" : hostFromUrl(l.href)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <ShareBar
          url={`/under40/${person.slug}`}
          title={person.name}
          dek={person.role}
          layout="row"
          className="mb-8"
        />
        {person.age ? (
          <p className="font-kicker text-xs uppercase tracking-wider text-muted">{person.age}</p>
        ) : null}
        <p className="mt-4 reading text-ink">{person.bio}</p>

        {person.hitos.length > 0 && (
          <section className="mt-14">
            <h2 className="headline text-3xl sm:text-4xl">Hitos</h2>
            <ol className="mt-5 space-y-0">
              {person.hitos.map((h, i) => (
                <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-rule py-4">
                  <span className="headline text-xl text-rust tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-body text-lg leading-relaxed text-ink-soft">{h}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {person.news.length > 0 && (
          <section className="mt-14">
            <h2 className="headline text-3xl sm:text-4xl">En la prensa</h2>
            <ul className="mt-5 divide-y divide-rule border-y border-rule">
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
          <Link to="/under40/$slug" params={{ slug: prev.slug }} className="group grid grid-cols-[5rem_1fr] items-center gap-4">
            <Under40Shot person={prev} className="aspect-square" />
            <div>
              <p className="kicker text-xs text-muted">Anterior</p>
              <p className="headline mt-1 text-2xl group-hover:text-rust">{prev.name}</p>
            </div>
          </Link>
          <Link
            to="/under40/$slug"
            params={{ slug: next.slug }}
            className="group grid grid-cols-[1fr_5rem] items-center gap-4 sm:text-right"
          >
            <div>
              <p className="kicker text-xs text-muted">Siguiente</p>
              <p className="headline mt-1 text-2xl group-hover:text-rust">{next.name}</p>
            </div>
            <Under40Shot person={next} className="aspect-square" />
          </Link>
        </div>
      </nav>
      <Newsletter />
    </main>
  );
}

function MetaChip({ children }: { children: ReactNode }) {
  return (
    <li className="kicker inline-flex h-8 items-center border border-paper/25 px-3 text-[10px] text-paper/80">
      {children}
    </li>
  );
}
