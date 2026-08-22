import { createFileRoute, Link } from "@tanstack/react-router";
import { VANDER_LIST } from "@/lib/vander-list";
import { HOUSE, ISSUE } from "@/lib/content";
import { AdSlot } from "@/components/ad-slot";
import { Newsletter } from "@/components/newsletter";
import { Vander20Mark } from "@/components/brand";
import { VerifiedStamp } from "@/components/verified-stamp";

export const Route = createFileRoute("/list/")({
  component: ListPage,
  head: () => ({
    meta: [{ title: "Vander 20 — We Are Vander" }],
  }),
});

function ListPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-signal">Ranking {ISSUE.date} · Latam</p>
          <h1 className="mt-5 max-w-3xl">
            <Vander20Mark className="h-16 sm:h-28 lg:h-32" />
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Las compañías que reescriben cómo se siente un negocio en América Latina — no las más
            ruidosas, las que tienen código de casa. Cada una fue visitada por una mesa de Team Vander.
            El Vander 20 no es las 50 Innovatives: acá cuenta el protocolo, no el gesto nuevo.
          </p>
          <p className="mt-3 kicker text-xs text-silver">{HOUSE.credit}</p>
        </div>
      </section>
      <div className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <ol>
            {VANDER_LIST.map((c) => (
              <li key={c.rank}>
                {c.rank === 6 && (
                  <div className="py-6">
                    <AdSlot size="leaderboard" creative="anuncia" />
                  </div>
                )}
                <Link
                  to="/list/$slug"
                  params={{ slug: c.slug }}
                  className="group grid grid-cols-12 gap-3 border-t border-ink py-6"
                >
                  <span className="col-span-2 headline text-4xl tabular-nums text-signal sm:text-5xl">
                    {String(c.rank).padStart(2, "0")}
                  </span>
                  <div className="col-span-10">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="headline text-2xl link-title sm:text-3xl">{c.name}</h2>
                      <p className="kicker text-xs text-muted">
                        {c.sector} · {c.city}
                      </p>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-base">
                      {c.blurb}
                    </p>
                    <div className="mt-2">
                      <VerifiedStamp slug={c.slug} />
                    </div>
                    <p className="mt-2 kicker text-xs text-signal sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
                      Leer la ficha
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-sans text-sm text-muted">
            ¿Quieres el argumento detrás de un nombre?{" "}
            <Link to="/briefing" className="text-ink underline decoration-rust hover:text-rust">
              Pide un briefing
            </Link>
            .
          </p>
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
