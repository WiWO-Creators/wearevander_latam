import { createFileRoute, Link } from "@tanstack/react-router";
import { UNDER40, UNDER40_META, UNDER40_METHOD } from "@/lib/under40";
import { Newsletter } from "@/components/newsletter";
import { HOUSE } from "@/lib/content";
import { ChileOnly } from "@/components/brand";

export const Route = createFileRoute("/under40/metodologia")({
  component: Under40Method,
  head: () => ({
    meta: [{ title: "Cómo se armó 100V Visionarios — We Are Vander" }],
  }),
});

function Under40Method() {
  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/under40" className="kicker inline-flex items-center gap-2 text-xs text-rust hover:underline">
            100V Visionarios · <ChileOnly />
          </Link>
          <h1 className="headline mt-4 text-5xl sm:text-7xl">Cómo se armó</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">
            Dossier de {UNDER40_META.kicker}. {UNDER40.length} perfiles, {UNDER40_META.verticals} verticales,{" "}
            {UNDER40_META.regions} regiones. Pensado
            como material de trabajo periodístico: cada ficha puede convertirse en una nota sin volver
            a partir de cero. {HOUSE.credit}.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="space-y-10">
          {UNDER40_METHOD.map((m) => (
            <li key={m.n}>
              <p className="kicker text-xs text-rust">{m.n}</p>
              <h2 className="headline mt-2 text-3xl sm:text-4xl">{m.title}</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">{m.body}</p>
            </li>
          ))}
        </ol>
        <h2 className="headline mt-16 text-3xl sm:text-4xl">Advertencias</h2>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
          Cinco perfiles rozan o superan los 40 y se incluyeron por ser ineludibles en su vertical:
          Omar Larré, Sebastián Kreis, Jaime Arrieta, Carlos Aravena y Álvaro Silberstein. Barbarita
          Lara y Pier Paolo Colonnello entran por el tramo 35-40, con edad verificada, y quedan en el
          límite del corte.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
          Algramo pidió la quiebra en julio de 2025. Karün anunció cierre en 2024. Lab4U fue adquirida
          por Britebound en 2026. Bemmbo pasó a Buk Finanzas. Examedi se reestructuró. AgroUrbana cesó
          operaciones.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
          No son chilenos, aunque operen desde Chile: Priyanka Srinivas y Sasikanth Chemalamudi, Atilana
          Piñón, Daniela Allerbon, Nathalie Wilk, Christian Struve, Oskar Hjertonsson.
        </p>
        <p className="mt-8 kicker text-xs text-muted">
          Enlaces recogidos el 19 y 20 de agosto de 2026. Rondas y dotación según fuentes citadas, no
          auditadas de forma independiente.
        </p>
      </section>
      <Newsletter />
    </main>
  );
}
