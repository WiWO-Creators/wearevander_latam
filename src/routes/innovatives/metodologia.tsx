import { createFileRoute, Link } from "@tanstack/react-router";
import { INNOVATIVES_META, INNOVATIVES_METHOD, INNOV_PATTERNS } from "@/lib/innovatives";
import { HOUSE } from "@/lib/content";
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
          <p className="kicker mt-6 text-xs text-innov">Metodología pública · {INNOVATIVES_META.kicker}</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl">Cómo entra una compañía</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">
            Investigación y redacción: agosto de 2026. Última actualización de datos: {INNOVATIVES_META.updated}.{" "}
            {HOUSE.credit}.
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="font-body text-lg leading-relaxed">{INNOVATIVES_META.dek}</p>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          Brasil concentra 16 de las 50. México 7. Argentina 8. Chile 8. Colombia 6. Uruguay 3. Perú 1. Costa
          Rica 1. El vacío también es información: no encontramos candidata verificable en semiconductores, gaming,
          contech ni insurtech con hito 2025–2026.
        </p>
        <MethodGrid items={INNOVATIVES_METHOD} accent="innov" />
        <h2 className="headline mt-16 text-3xl sm:text-4xl">Cinco patrones de esta lista</h2>
        <ol className="mt-8 space-y-8">
          {INNOV_PATTERNS.map((p, i) => (
            <li key={p.title}>
              <p className="kicker text-xs text-innov">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="headline mt-1 text-2xl">{p.title}</h3>
              <p className="mt-2 font-body text-base leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ol>
        <h2 className="headline mt-16 text-3xl sm:text-4xl">Lo que marcamos</h2>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
          NotCo está en reestructuración. Latam-GPT es un consorcio público-académico, no una startup. HIF
          Global es un desarrollador de infraestructura. Establishment Labs cotiza en Nasdaq. Donde no
          pudimos confirmar una cifra, lo dejamos explícito.
        </p>
        <Link to="/innovatives" className="kicker mt-8 inline-block text-xs text-innov hover:underline">
          Volver a las 50
        </Link>
      </article>
      <Newsletter />
    </main>
  );
}
