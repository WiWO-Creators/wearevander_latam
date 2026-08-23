import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByFormat, HOUSE } from "@/lib/content";
import { Newsletter } from "@/components/newsletter";

export const Route = createFileRoute("/obituarios")({
  component: ObituariosPage,
  head: () => ({
    meta: [{ title: "Obituarios — We Are Vander" }],
  }),
});

function ObituariosPage() {
  const items = articlesByFormat("obituario");
  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="kicker text-xs text-rust">We Love Business · el guiño</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl">Obituarios</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">
            Ideas de negocio que se murieron y merecían un aviso. El tono solemne se queda en las
            fichas. Acá se entierra el hype. {HOUSE.credit}.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-14 sm:px-6">
        {items.map((a) => (
          <article key={a.slug} className="border-t border-ink py-8 first:border-t-0 first:pt-0">
            <p className="kicker text-xs text-muted">Q.E.P.D. · {a.readMinutes} min</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">
              <Link to="/story/$slug" params={{ slug: a.slug }} className="link-title">
                {a.title}
              </Link>
            </h2>
            <p className="mt-3 font-body text-base text-ink-soft">{a.dek}</p>
          </article>
        ))}
      </section>
      <Newsletter />
    </main>
  );
}
