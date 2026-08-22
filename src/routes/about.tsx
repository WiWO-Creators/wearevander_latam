import { createFileRoute, Link } from "@tanstack/react-router";
import { AUTHORS, HOUSE, ISSUE } from "@/lib/content";
import { Newsletter } from "@/components/newsletter";
import { Wordmark } from "@/components/brand";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "Redacción — We Are Vander" }],
  }),
});

function AboutPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="kicker text-xs text-rust">La casa</p>
          <Wordmark className="mt-5 h-10 sm:h-14" />
          <p className="mt-4 kicker text-xs text-silver">
            {HOUSE.motto} · {ISSUE.city}
          </p>
          <p className="mt-2 kicker text-xs tracking-widest text-rust">{HOUSE.credit}</p>
          <p className="mt-6 font-body text-lg leading-relaxed text-paper/80">
            We Are Vander es un medio de Interadia. Portal de innovación empresarial con el ojo
            de una revista y la densidad de un diario. Negro, blanco, negocios. La firma de cada
            historia es Team Vander.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-paper/70">
            Seis mesas: Ciudad de México, São Paulo, Buenos Aires, Bogotá, Santiago y Lima.
            {ISSUE.title} es el Volumen {ISSUE.volume}, Número {ISSUE.number}. La región es el beat,
            no el footnote.
          </p>
        </div>
      </section>
      <section className="border-t border-ink px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">Team Vander</p>
          <h2 className="headline mt-2 text-4xl sm:text-5xl">La mesa</h2>
          <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
            Team Vander firma cada historia. Estas son las mesas de Interadia detrás de la firma.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {AUTHORS.map((a) => (
              <article key={a.id}>
                <img src={a.image} alt={a.name} className="aspect-[3/4] w-full object-cover" />
                <h3 className="headline mt-3 text-2xl">{a.name}</h3>
                <p className="kicker mt-1 text-xs text-rust">
                  {a.role} ·{" "}
                  <Link to="/search" search={{ q: a.city }} className="hover:text-ink">
                    {a.city}
                  </Link>
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
