import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  articleCity,
  formatIssueDate,
  getArticle,
  getAuthor,
  getSectionLabel,
  relatedArticles,
  HOUSE,
  articleUpdated,
  wasUpdated,
  type BodyBlock,
} from "@/lib/content";
import { StackedCard, TagPills, ReadMeta } from "@/components/article-card";
import { SaveButton } from "@/components/save-button";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";
import { ContraMark, SignalsMark } from "@/components/brand";
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
        <h1 className="headline mt-3 text-3xl">Esta historia no está en el número.</h1>
        <Link to="/" className="mt-6 inline-block kicker text-xs text-ink underline">
          Volver al número
        </Link>
      </main>
    );
  }

  const city = articleCity(article);
  const related = relatedArticles(article.slug, 3);
  const author = getAuthor(article.authorId);
  const signer = article.signedName ?? (article.franchise === "contra" ? author?.name : undefined);
  const updated = wasUpdated(article);

  return (
    <main>
      <article>
        <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-12">
          {article.franchise === "contra" && (
            <Link to="/contra" className="logo-mark mb-4 inline-block">
              <ContraMark className="h-8 sm:h-10" />
            </Link>
          )}
          {article.franchise === "signals" && (
            <Link to="/signals" className="logo-mark mb-4 inline-block">
              <SignalsMark className="h-10 sm:h-12" />
            </Link>
          )}
          <p className="kicker text-xs text-rust">
            {article.kicker} · {city || getSectionLabel(article.section)}
          </p>
          <h1 className="headline mt-4 text-4xl sm:text-6xl lg:text-7xl">{article.title}</h1>
          <p className="mt-5 font-body text-lg leading-snug text-ink-soft sm:text-2xl">{article.dek}</p>
          <div className="mt-5">
            <TagPills article={article} />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-ink py-3">
            <div>
              <p className="headline text-xl">{signer ?? "Team Vander"}</p>
              <p className="font-kicker text-xs tracking-wider text-muted uppercase">
                {article.franchise === "contra" ? "Opinión firmada" : HOUSE.credit}
                {city ? ` · ${city}` : ""}
              </p>
              <ReadMeta article={article} className="mt-1" />
              {updated && (
                <p className="mt-1 font-kicker text-xs tracking-wider text-muted uppercase">
                  Publicada {formatIssueDate(article.publishedAt)} · Actualizada {formatIssueDate(articleUpdated(article))}
                </p>
              )}
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

        {article.gallery && article.gallery.length > 0 && (
          <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            {article.gallery.map((g) => (
              <figure key={g.src + g.caption}>
                <img src={g.src} alt={g.alt} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-2 font-kicker text-xs tracking-wider text-muted uppercase">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mx-auto mt-10 max-w-2xl px-4 sm:px-6">
          {article.body.map((block, i) => (
            <div key={i}>
              <Block block={block} drop={i === 0 && article.franchise !== "signals"} />
              {i === 1 && <AdSlot size="inread" creative="vander20" />}
            </div>
          ))}
        </div>

        <aside className="mx-auto mt-14 max-w-2xl border-t-2 border-ink px-4 py-6 sm:px-6">
          {author && (article.signedName || article.franchise === "contra") ? (
            <>
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
            </>
          ) : (
            <>
              <p className="kicker text-xs text-muted">La firma</p>
              <p className="headline mt-3 text-3xl">Team Vander</p>
              <p className="kicker mt-1 text-xs text-rust">{HOUSE.credit}</p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                Team Vander es la redacción de Interadia en seis ciudades. Una firma, un criterio.
              </p>
              <Link to="/about" className="mt-3 inline-block kicker text-xs text-ink underline decoration-rust hover:text-rust">
                La redacción
              </Link>
            </>
          )}
        </aside>
      </article>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <AdSlot size="mpu" creative="anuncia" />
      </div>

      <section className="border-t border-ink px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="headline border-b border-ink pb-2 text-3xl">Sigue leyendo</h2>
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
  if (block.type === "q") {
    return <p className="mt-8 mb-2 font-sans text-sm font-semibold tracking-tight text-rust">— {block.text}</p>;
  }
  if (block.type === "a") {
    return <p className="mb-5 font-body text-lg leading-relaxed text-ink">{block.text}</p>;
  }
  if (block.type === "stat") {
    return (
      <p className="my-6 flex items-baseline justify-between gap-4 border-y border-ink py-3">
        <span className="kicker text-xs text-muted">{block.label}</span>
        <span className="headline text-3xl tabular-nums">{block.value}</span>
      </p>
    );
  }
  return (
    <p className={`mb-5 font-body text-lg leading-relaxed text-ink ${drop ? "drop-cap" : ""}`}>
      {block.text}
    </p>
  );
}
