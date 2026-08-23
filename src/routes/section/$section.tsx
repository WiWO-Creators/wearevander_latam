import { createFileRoute, Link } from "@tanstack/react-router";
import { SECTIONS, articlesBySection, type SectionId } from "@/lib/content";
import { HeroStory, StackedCard } from "@/components/article-card";

export const Route = createFileRoute("/section/$section")({
  component: SectionPage,
  head: ({ params }) => {
    const meta = SECTIONS.find((s) => s.id === params.section);
    return {
      meta: [{ title: meta ? `${meta.label} — We Are Vander` : "Sección — We Are Vander" }],
    };
  },
});

function isSection(id: string): id is SectionId {
  return SECTIONS.some((s) => s.id === id);
}

function SectionPage() {
  const { section } = Route.useParams();
  if (!isSection(section)) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="headline text-3xl">No hay esa mesa.</h1>
        <Link to="/" className="mt-6 inline-block kicker text-xs underline">
          Volver al número
        </Link>
      </main>
    );
  }
  const meta = SECTIONS.find((s) => s.id === section)!;
  const stories = articlesBySection(section);
  const [lead, ...rest] = stories;

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <p className="kicker text-xs text-rust">Sección · Team Vander</p>
        <h1 className="headline mt-2 text-6xl sm:text-8xl">{meta.label}</h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-ink-soft">{meta.dek}</p>
        <div className="mt-8 h-px bg-ink" />
        {lead && (
          <div className="mt-8">
            <HeroStory article={lead} />
          </div>
        )}
        {rest.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <StackedCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
