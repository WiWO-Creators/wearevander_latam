import { createFileRoute } from "@tanstack/react-router";
import { articlesByFranchise } from "@/lib/content";
import { SignalRow } from "@/components/article-card";
import { SignalsMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";

export const Route = createFileRoute("/signals")({
  component: SignalsPage,
  head: () => ({
    meta: [{ title: "Signals by Vander — We Are Vander" }],
  }),
});

function SignalsPage() {
  const notes = articlesByFranchise("signals");

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1>
            <SignalsMark className="h-14 sm:h-20" />
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-snug text-paper/75">
            Lo que todavía no es tendencia pero va a serlo. Notas cortas, 300 palabras, mucha
            frecuencia. Un indicador, un lugar, una frase.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="kicker mb-4 text-xs text-muted">{notes.length} señales · lectura rápida</p>
        {notes.slice(0, 4).map((a) => (
          <SignalRow key={a.slug} article={a} />
        ))}
        <div className="py-6">
          <AdSlot size="inread" creative="anuncia" />
        </div>
        {notes.slice(4).map((a) => (
          <SignalRow key={a.slug} article={a} />
        ))}
      </section>
      <Newsletter />
    </main>
  );
}
