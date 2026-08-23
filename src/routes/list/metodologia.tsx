import { createFileRoute, Link } from "@tanstack/react-router";
import { VANDER_METHOD } from "@/lib/vander-list";
import { HOUSE, ISSUE } from "@/lib/content";
import { Vander20Mark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { MethodGrid } from "@/components/rank-pack";

export const Route = createFileRoute("/list/metodologia")({
  component: ListMethodPage,
  head: () => ({
    meta: [{ title: "Metodología Vander 20 — We Are Vander" }],
  }),
});

function ListMethodPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/list" className="logo-mark inline-block max-w-xs">
            <Vander20Mark className="h-10 sm:h-12" />
          </Link>
          <p className="kicker mt-6 text-xs text-signal">Metodología pública · {ISSUE.date}</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl">Cómo se arma el Vander 20</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">
            Un ranking es un argumento. Este es el nuestro. {HOUSE.credit}.
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="font-body text-lg leading-relaxed">
          El Vander 20 no es un premio y no es un recorte de las 50 Innovatives. Es la lista de las
          compañías que, visitadas, todavía tienen un protocolo que se puede dejar en una mesa. La
          innovación que todavía no es hábito vive en la otra lista. Acá vive el código de casa.
        </p>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          Cada año, las mesas de Ciudad de México, São Paulo, Buenos Aires, Bogotá, Santiago y Lima
          proponen, visitan y cruzan. Nadie compra un puesto. El briefing comercial entra por otra
          puerta. Si una compañía no se puede caminar, no entra.
        </p>
        <MethodGrid items={VANDER_METHOD} accent="signal" />
        <p className="mt-10 font-body text-base leading-relaxed text-ink-soft">
          Las fichas se publican con mesa, fecha de visita y evidencia. Si el argumento cambia, la
          ficha se actualiza. El ranking no.
        </p>
        <Link to="/list" className="kicker mt-8 inline-block text-xs text-signal hover:underline">
          Volver al ranking
        </Link>
      </article>
      <Newsletter />
    </main>
  );
}
