import { createFileRoute, Link } from "@tanstack/react-router";
import { VOLUMES } from "@/lib/visionarios";
import { CountryMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/visionarios/")({
  component: VisionariosHub,
  head: () =>
    seoHead({
      title: "100V Visionarios — Chile, Argentina, Colombia",
      description:
        "Colección 100V de We Are Vander: cien visionarios por país. Chile, Argentina y Colombia. Edad declarada, prensa con enlace.",
      path: "/visionarios",
      image: "/og/under40.jpg",
      ogTitle: "100V: tres países, trescientas fichas",
      ogDescription: "Chile, Argentina y Colombia. Un volumen por país. Edad declarada.",
    }),
});

function VisionariosHub() {
  return (
    <main>
      <section className="bg-ink px-4 py-16 text-paper sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">Colección · agosto 2026</p>
          <h1 className="headline mt-4 max-w-4xl text-5xl leading-[0.9] sm:text-7xl lg:text-8xl">
            100V Visionarios
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-snug text-paper/75">
            Un volumen por país. Cien fichas. Edad declarada. Prensa con enlace. Chile, Argentina y Colombia no se
            mezclan.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-3">
        {VOLUMES.map((v) => (
          <Link
            key={v.id}
            to={v.path}
            className="group border-b border-ink py-10 lg:border-b-0 lg:border-r lg:px-8 lg:py-14 last:lg:border-r-0 first:lg:pl-0 last:lg:pr-0"
          >
            <p className="kicker text-xs text-rust">
              <CountryMark id={v.id} /> · Vol. {v.volume}
            </p>
            <h2 className="headline mt-3 text-4xl group-hover:text-rust sm:text-5xl">{v.name}</h2>
            <p className="mt-4 font-body text-sm leading-snug text-ink-soft">{v.dek}</p>
            <p className="mt-6 font-kicker text-xs uppercase tracking-wider text-muted">
              {v.women} mujeres · {v.men} hombres · {v.people.length || 100} fichas
            </p>
            <p className="kicker mt-6 inline-block text-xs text-rust">Abrir el dossier</p>
          </Link>
        ))}
      </section>
      <Newsletter />
    </main>
  );
}
