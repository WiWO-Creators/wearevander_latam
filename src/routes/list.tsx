import { createFileRoute, Link } from "@tanstack/react-router";
import { VANDER_LIST } from "@/lib/vander-list";
import { ISSUE } from "@/lib/content";

export const Route = createFileRoute("/list")({
  component: ListPage,
  head: () => ({
    meta: [{ title: "Vander 20 — We Are Vander" }],
  }),
});

export function ListPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-rust">Ranking {ISSUE.date} · Latam</p>
          <h1 className="headline mt-3 text-6xl uppercase sm:text-8xl">Vander 20</h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Las compañías que reescriben cómo se siente un negocio en América Latina — no las más
            ruidosas, las que tienen código de casa. {ISSUE.title}.
          </p>
        </div>
      </section>
      <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <ol>
          {VANDER_LIST.map((c) => (
            <li key={c.rank} className="grid grid-cols-12 gap-3 border-t border-ink py-6 first:border-t-0 first:pt-0">
              <span className="col-span-2 headline text-4xl tabular-nums text-rust sm:text-5xl">
                {String(c.rank).padStart(2, "0")}
              </span>
              <div className="col-span-10">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="headline text-2xl uppercase sm:text-3xl">{c.name}</h2>
                  <p className="kicker text-xs text-muted">
                    {c.sector} · {c.city}
                  </p>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-base">
                  {c.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 font-display text-sm text-muted">
          ¿Quieres el argumento detrás de un nombre?{" "}
          <Link to="/briefing" className="text-ink underline decoration-rust">
            Pide un briefing
          </Link>
          .
        </p>
      </div>
      </div>
    </main>
  );
}
