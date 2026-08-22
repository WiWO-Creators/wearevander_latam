import { createFileRoute, Link } from "@tanstack/react-router";
import { INNOVATIVES, INNOVATIVES_METHOD } from "@/lib/innovatives";
import { HOUSE, ISSUE } from "@/lib/content";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";

export const Route = createFileRoute("/innovatives/")({
  component: InnovativesPage,
  head: () => ({
    meta: [{ title: "50 Innovatives — We Are Vander" }],
  }),
});

function InnovativesPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-innov">Anual {ISSUE.date.split(" ").at(-1)} · Latam</p>
          <h1 className="mt-5 max-w-3xl">
            <InnovativesMark wide className="h-16 sm:h-24 lg:h-28" />
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Las 50 empresas más innovadoras de América Latina. No las más ruidosas: las que se pueden
            visitar. Metodología pública. Firmado por Team Vander. {HOUSE.credit}.
          </p>
        </div>
      </section>

      <section id="metodologia" className="border-b border-ink bg-paper-deep px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-xs text-innov">Metodología pública</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">Cómo entra una compañía</h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
            El ranking es anual. La mesa visita, llama y cruza. No hay pago por aparecer. El score
            es editorial: cinco criterios, publicados aquí para que se puedan discutir.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2">
            {INNOVATIVES_METHOD.map((m, i) => (
              <li key={m.title} className="border-t border-ink pt-4">
                <p className="headline text-xl">
                  <span className="text-innov">{String(i + 1).padStart(2, "0")} </span>
                  {m.title}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <ol>
            {INNOVATIVES.map((c) => (
              <li key={c.rank} className="group border-t border-ink py-6 first:border-t-0 first:pt-0">
                <Link to="/innovatives/$slug" params={{ slug: c.slug }} className="grid grid-cols-12 gap-3">
                  <span className="col-span-2 headline text-4xl tabular-nums text-innov sm:text-5xl">
                    {String(c.rank).padStart(2, "0")}
                  </span>
                  <div className="col-span-10">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="headline text-2xl sm:text-3xl">{c.name}</h2>
                      <p className="kicker text-xs text-muted">
                        {c.sector} · {c.city}
                      </p>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-base">{c.blurb}</p>
                    <p className="mt-2 kicker text-xs text-innov sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
                      Por qué entra
                    </p>
                  </div>
                </Link>
                {c.rank === 10 && (
                  <div className="mt-6">
                    <AdSlot size="leaderboard" creative="anuncia" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
