import { createFileRoute, Link } from "@tanstack/react-router";
import { INNOVATIVES_METHOD } from "@/lib/innovatives";
import { HOUSE, ISSUE } from "@/lib/content";
import { InnovativesMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { MethodGrid } from "@/components/rank-pack";

export const Route = createFileRoute("/innovatives/metodologia")({
  component: InnovMethodPage,
  head: () => ({
    meta: [{ title: "Metodología 50 Innovatives — We Are Vander" }],
  }),
});

function InnovMethodPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/innovatives" className="logo-mark inline-block max-w-md">
            <InnovativesMark wide className="h-10 sm:h-14" />
          </Link>
          <p className="kicker mt-6 text-xs text-innov">Metodología pública · {ISSUE.date}</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl">Cómo entra una compañía</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">
            Cinco criterios. Sin pago por aparecer. {HOUSE.credit}.
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="font-body text-lg leading-relaxed">
          Las 50 Innovatives premian el gesto que todavía no es hábito: un segundo turno que no se
          anunció, un offtake que nombra un pueblo, un chip con mesa en Jalisco. El Vander 20 premia el
          protocolo. Esta lista premia lo que se acaba de poder visitar.
        </p>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          La mesa propone, visita y cruza. El score es editorial. Se publica para que se pueda
          discutir — y se discute. Si una tesis cabe en un ticker y no en una calle, no entra.
        </p>
        <MethodGrid items={INNOVATIVES_METHOD} accent="innov" />
        <p className="mt-10 font-body text-base leading-relaxed text-ink-soft">
          Cada ficha lleva fundada, visitada, mesa y evidencia. El ranking es anual. La ficha, no:
          si el gesto se deshace, la compañía sale del número siguiente.
        </p>
        <Link to="/innovatives" className="kicker mt-8 inline-block text-xs text-innov hover:underline">
          Volver a las 50
        </Link>
      </article>
      <Newsletter />
    </main>
  );
}
