import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  articleCity,
  formatIssueDate,
  getArticle,
  getAuthor,
  getSectionLabel,
  relatedArticles,
  type BodyBlock,
} from "@/lib/content";
import { StackedCard } from "@/components/article-card";
import { SaveButton } from "@/components/save-button";
import { Newsletter } from "@/components/newsletter";
import { getSavedSlugs } from "@/lib/server/magazine";

export const Route = createFileRoute("/story/$slug")({
  component: StoryPage,
  head: ({ params }) => {
    const article = getArticle(params.slug);
    return {
      meta: [
        {
          title: article ? `${article.title} — We Are Vander` : "Historia — We Are Vander",
        },
      ],
    };
  },
});

function StoryPage() {
  const { slug } = Route.useParams();
  const article = getArticle(slug);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getSavedSlugs().then((slugs) => {
      if (!cancelled) setSaved(slugs.includes(slug));
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!article) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="kicker text-xs text-rust">Fuera de edición</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase">
          Esta historia no está en el número.
        </h1>
        <Link to="/" className="mt-6 inline-block kicker text-xs text-ink underline">
          Volver al número
        </Link>
      </main>
    );
  }

  const author = getAuthor(article.authorId);
  const related = relatedArticles(article.slug, 3);

  return (
    <main>
      <article>
        <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-12">
          <p className="kicker text-xs text-rust">
            {article.kicker} · {articleCity(article) || getSectionLabel(article.section)}
          </p>
          <h1 className="headline mt-4 text-4xl sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-5 font-body text-lg leading-snug text-ink-soft sm:text-2xl">
            {article.dek}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-ink py-3">
            <div className="flex items-center gap-3">
              {author && (
                <img src={author.image} alt="" className="size-12 object-cover" />
              )}
              <div>
                <p className="headline text-lg">{author?.name}</p>
                <p className="font-kicker text-xs tracking-wider text-muted uppercase">
                  {author?.city ? `${author.city} · ` : ""}
                  {formatIssueDate(article.publishedAt)} · {article.readMinutes} min
                </p>
              </div>
            </div>
            <SaveButton slug={article.slug} saved={saved} onChange={setSaved} />
          </div>
        </div>

        <figure className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
          <img src={article.image} alt={article.imageAlt} className="aspect-video w-full object-cover" />
          <figcaption className="mt-2 font-kicker text-xs tracking-wider text-muted uppercase">
            {article.caption}
          </figcaption>
        </figure>

        <div className="mx-auto mt-10 max-w-2xl px-4 sm:px-6">
          {article.body.map((block, i) => (
            <Block key={i} block={block} drop={i === 0} />
          ))}
        </div>

        {author && (
          <aside className="mx-auto mt-14 max-w-2xl border-t-2 border-ink px-4 py-6 sm:px-6">
            <p className="kicker text-xs text-muted">La firma</p>
            <div className="mt-4 flex gap-4">
              <img src={author.image} alt="" className="size-20 object-cover sm:size-24" />
              <div>
                <p className="headline text-2xl">{author.name}</p>
                <p className="kicker mt-1 text-xs text-rust">
                  {author.role} · {author.city}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{author.bio}</p>
              </div>
            </div>
          </aside>
        )}
      </article>

      <section className="border-t border-ink px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="headline border-b-2 border-ink pb-2 text-2xl uppercase">Sigue leyendo</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <StackedCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

function Block({ block, drop }: { block: BodyBlock; drop: boolean }) {
  if (block.type === "h2") {
    return <h2 className="headline mt-10 mb-3 text-3xl">{block.text}</h2>;
  }
  if (block.type === "quote") {
    return (
      <blockquote className="my-10 border-l-4 border-rust pl-5">
        <p className="headline text-3xl">{block.text}</p>
        {block.cite && <footer className="mt-2 kicker text-xs text-muted">{block.cite}</footer>}
      </blockquote>
    );
  }
  return (
    <p className={`mb-5 font-body text-lg leading-relaxed text-ink ${drop ? "drop-cap" : ""}`}>
      {block.text}
    </p>
  );
}
