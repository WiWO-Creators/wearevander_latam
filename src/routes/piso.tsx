import { createFileRoute } from "@tanstack/react-router";
import { LiveDesk } from "@/components/live-desk";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";
import { HOUSE, ISSUE } from "@/lib/content";

export const Route = createFileRoute("/piso")({
  component: PisoPage,
  head: () => ({
    meta: [
      { title: "Piso en vivo — We Are Vander" },
      {
        name: "description",
        content: "Transmisión en vivo de Yahoo Finance y Bloomberg en el piso de We Are Vander.",
      },
    ],
  }),
});

function PisoPage() {
  return (
    <main>
      <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">En vivo · {ISSUE.city}</p>
          <h1 className="headline mt-3 text-4xl sm:text-6xl">Piso</h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-snug text-ink-soft">
            Dos señales de referencia, a la vista. No es contenido de Vander: es el aire que
            respira un medio de negocios. {HOUSE.credit}.
          </p>
        </div>
      </section>
      <LiveDesk />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <AdSlot size="leaderboard" />
      </div>
      <Newsletter />
    </main>
  );
}
