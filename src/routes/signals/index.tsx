import { createFileRoute, Link } from "@tanstack/react-router";
import {
  articleCity,
  articleImage,
  articleImageAlt,
  articlesByFranchise,
  franchiseTags,
  HOUSE,
} from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { SignalRow, TagPills } from "@/components/article-card";
import { SignalsMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { SignalsField } from "@/components/signals-field";
import { CatChip } from "@/components/rank-pack";

export const Route = createFileRoute("/signals/")({
  component: SignalsPage,
  // La franquicia junta también lo que publicó el orquestador, que vive en la base.
  loader: () => getArticles(),
  head: () => ({
    meta: [{ title: "Signals by Vander — We Are Vander" }],
  }),
});

function SignalsPage() {
  const articles = Route.useLoaderData();
  const notes = articlesByFranchise(articles, "signals");
  const industry = franchiseTags(articles, "signals", "industry");
  const tech = franchiseTags(articles, "signals", "tech");
  const pace = franchiseTags(articles, "signals", "pace");
  const lead = notes[0];

  return (
    <main>
      <SignalsField>
        <div className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <h1>
              <SignalsMark className="h-14 sm:h-20" />
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-snug text-ink-soft">
              Lo que todavía no es tendencia pero va a serlo. Notas cortas, 300 palabras, mucha
              frecuencia. Un indicador, un lugar, una frase. {HOUSE.credit}.
            </p>
            <p className="mt-3 kicker text-xs text-muted">
              {notes.length} señales · lectura rápida
            </p>
          </div>
        </div>
      </SignalsField>

      <nav className="border-b border-ink bg-paper px-4 py-4 sm:px-6" aria-label="Categorías Signals">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Industria</p>
            {industry.map((t) => (
              <CatChip
                key={t.id}
                to="/signals/tag/$tag"
                params={{ tag: t.id }}
                label={t.label}
                accent="rust"
              />
            ))}
          </div>
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Tecnología</p>
            {tech.map((t) => (
              <CatChip
                key={t.id}
                to="/signals/tag/$tag"
                params={{ tag: t.id }}
                label={t.label}
                accent="rust"
              />
            ))}
          </div>
          <div className="chip-row items-center">
            <p className="kicker mr-2 text-xs text-muted">Lectura</p>
            {pace.map((t) => (
              <CatChip
                key={t.id}
                to="/signals/tag/$tag"
                params={{ tag: t.id }}
                label={t.label}
                accent="rust"
              />
            ))}
          </div>
        </div>
      </nav>

      {lead && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="kicker text-xs text-rust">La señal de hoy</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-12">
            <Link to="/story/$slug" params={{ slug: lead.id }} className="photo block lg:col-span-7">
              <img src={articleImage(lead)} alt={articleImageAlt(lead)} className="aspect-[16/10] w-full object-cover" />
            </Link>
            <div className="lg:col-span-5">
              <h2 className="headline text-4xl sm:text-5xl">
                <Link to="/story/$slug" params={{ slug: lead.id }} className="link-title">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-3 font-body text-base text-ink-soft">{lead.summary}</p>
              <div className="mt-4">
                <TagPills article={lead} />
              </div>
              <p className="mt-3 kicker text-xs text-muted">
                {articleCity(lead)} · {lead.readingMinutes} min · Lectura rápida
              </p>
            </div>
          </div>
        </section>
      )}

      <SignalsField>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="kicker mb-4 text-xs text-muted">Todas las señales</p>
          {notes.map((a) => (
            <SignalRow key={a.id} article={a} />
          ))}
        </div>
      </SignalsField>
      <Newsletter />
    </main>
  );
}
