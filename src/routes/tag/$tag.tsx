import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByTag, getTag, TAGS } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { HorizontalCard } from "@/components/article-card";

export const Route = createFileRoute("/tag/$tag")({
  component: TagPage,
  // La etiqueta junta también lo que publicó el orquestador, que vive en la base.
  loader: () => getArticles(),
  head: ({ params }) => {
    const tag = getTag(params.tag);
    return {
      meta: [{ title: tag ? `${tag.label} — We Are Vander` : "Tag — We Are Vander" }],
    };
  },
});

function TagPage() {
  const { tag: id } = Route.useParams();
  const tag = getTag(id);
  const stories = articlesByTag(Route.useLoaderData(), id);

  if (!tag) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="headline text-3xl">Ese tag no está en el índice.</h1>
        <Link to="/" className="mt-6 inline-block kicker text-xs underline">
          Volver
        </Link>
      </main>
    );
  }

  const kindLabel = tag.kind === "pace" ? "Tipo de lectura" : tag.kind === "tech" ? "Tecnología" : "Industria";

  return (
    <main className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="kicker text-xs text-rust">{kindLabel}</p>
        <h1 className="headline mt-2 text-5xl sm:text-7xl">{tag.label}</h1>
        <p className="mt-3 font-body text-base text-ink-soft">
          {stories.length} {stories.length === 1 ? "pieza" : "piezas"}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-b border-ink pb-6">
          {TAGS.filter((t) => t.kind === tag.kind).map((t) => (
            <li key={t.id}>
              <Link
                to="/tag/$tag"
                params={{ tag: t.id }}
                className={`kicker text-xs ${t.id === tag.id ? "text-rust" : "text-muted hover:text-rust"}`}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {stories.map((a) => (
            <HorizontalCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
