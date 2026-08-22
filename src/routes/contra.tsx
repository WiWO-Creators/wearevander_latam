import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByFranchise } from "@/lib/content";
import { HorizontalCard } from "@/components/article-card";
import { ContraMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";

export const Route = createFileRoute("/contra")({
  component: ContraPage,
  head: () => ({
    meta: [{ title: "Contra la corriente — We Are Vander" }],
  }),
});

function ContraPage() {
  const essays = articlesByFranchise("contra");
  const lead = essays[0];
  const rest = essays.slice(1);

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h1>
            <ContraMark className="h-10 sm:h-14" />
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Opinión abiertamente contraria al consenso. Firmada. El carácter de la casa no es el
            equilibrio: es un no a tiempo, con nombre y apellido.
          </p>
        </div>
      </section>
      {lead && (
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <p className="kicker text-xs text-rust">La tesis de la semana</p>
          <h2 className="headline mt-2 text-4xl sm:text-6xl">
            <Link to="/story/$slug" params={{ slug: lead.slug }} className="link-title">
              {lead.title}
            </Link>
          </h2>
          <p className="mt-4 font-body text-lg text-ink-soft">{lead.dek}</p>
          <p className="mt-3 kicker text-xs text-muted">
            {lead.signedName} · {lead.readMinutes} min de lectura · De fondo
          </p>
        </section>
      )}
      <div className="mx-auto max-w-4xl px-4 pb-6 sm:px-6">
        <AdSlot size="leaderboard" creative="anuncia" />
      </div>
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        {rest.map((a) => (
          <HorizontalCard key={a.slug} article={a} />
        ))}
      </section>
      <Newsletter />
    </main>
  );
}
