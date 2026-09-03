import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getArticle, type Article } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { getSavedSlugs } from "@/lib/server/magazine";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { HorizontalCard } from "@/components/article-card";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
  // El estante puede tener guardada una nota publicada por el orquestador, que
  // no está en el archivo del repositorio.
  loader: () => getArticles(),
  head: () => ({
    meta: [{ title: "Guardados — We Are Vander" }],
  }),
});

function SavedPage() {
  const { user, isPending } = useCurrentUserState();
  const articles = Route.useLoaderData();
  const [slugs, setSlugs] = useState<string[] | null>(null);

  useEffect(() => {
    if (!user) return;
    void getSavedSlugs().then(setSlugs);
  }, [user]);

  if (isPending) {
    return (
      <main className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="h-10 w-64 animate-pulse bg-dust" />
          <div className="mt-6 h-28 animate-pulse bg-dust" />
        </div>
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const stories = (slugs ?? [])
    .map((slug) => getArticle(articles, slug))
    .filter((a): a is Article => a != null);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="kicker text-xs text-rust">Tu estante</p>
        <h1 className="headline mt-2 text-4xl sm:text-5xl">Guardados</h1>
        {slugs === null ? (
          <div className="mt-8 h-28 animate-pulse bg-dust" />
        ) : stories.length === 0 ? (
          <p className="mt-6 font-body text-base text-ink-soft">
            Nada todavía. Abre una historia y toca guardar.
          </p>
        ) : (
          <div className="mt-6">
            {stories.map((a) => (
              <HorizontalCard key={a.id} article={a} />
            ))}
          </div>
        )}
        <Link to="/" className="mt-8 inline-block kicker text-xs text-muted hover:text-rust">
          Volver al número
        </Link>
      </div>
    </main>
  );
}
