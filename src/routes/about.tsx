import { createFileRoute } from "@tanstack/react-router";
import { AUTHORS, ISSUE } from "@/lib/content";
import { Newsletter } from "@/components/newsletter";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "Redacción — We Are Vander" }],
  }),
});

function AboutPage() {
  return (
    <main>
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="kicker text-xs text-rust">La casa</p>
          <h1 className="headline mt-2 text-6xl uppercase sm:text-8xl">
            We Are Vander
          </h1>
          <p className="mt-2 kicker text-xs text-muted">We Love Business · Latam</p>
          <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
            Portal de innovación empresarial con el ojo de un diario y la densidad de una revista.
            Negro, blanco, negocios. Seis mesas: Ciudad de México, São Paulo, Buenos Aires,
            Bogotá, Santiago y Lima.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            Escribimos trabajo, diseño, clima y cultura como si el criterio fuera una línea del
            balance. {ISSUE.title} es el Volumen {ISSUE.volume}, Número {ISSUE.number}. La región
            es el beat, no el footnote.
          </p>
        </div>
      </section>
      <section className="border-t border-ink px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Redacción</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {AUTHORS.map((a) => (
              <article key={a.id}>
                <img src={a.image} alt={a.name} className="aspect-[3/4] w-full object-cover" />
                <h3 className="mt-3 font-display text-xl font-extrabold">{a.name}</h3>
                <p className="kicker mt-1 text-xs text-rust">
                  {a.role} · {a.city}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{a.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
