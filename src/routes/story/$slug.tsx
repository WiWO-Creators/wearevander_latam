import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
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
import { ContraMark, SignalsMark, VanderBug } from "@/components/brand";
import { getSavedSlugs } from "@/lib/server/magazine";
import { JsonLd } from "@/components/json-ld";
import { FaqBlock, Tldr, Crumbs } from "@/components/faq-block";
import { seoHead, articleSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { ShareBar, ReadProgress } from "@/components/share-bar";
import { StoryMesa } from "@/components/story-mesa";

export const Route = createFileRoute("/story/$slug")({
  component: StoryPage,
  head: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) {
      return seoHead({
        title: "Historia — We Are Vander",
        description: "Esta historia no está en el número.",
        path: `/story/${params.slug}`,
        noindex: true,
      });
    }
    const desc =
      article.seoDescription ??
      article.dek.replace(/\s+/g, " ").slice(0, 155);
    const title = article.seoTitle ?? `${article.title} — We Are Vander`;
    return seoHead({
      title,
      description: desc,
      path: `/story/${article.slug}`,
      image: article.ogImage ?? article.image,
      imageAlt: article.imageAlt,
      ogTitle: article.ogTitle,
      ogDescription: article.ogDescription,
      type: "article",
      published: article.publishedAt,
      modified: article.updatedAt ?? article.publishedAt,
    });
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
  const path = `/story/${article.slug}`;

  return (
    <main>
      <ReadProgress targetId="historia" />
      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.seoDescription ?? article.dek,
          path,
          image: article.ogImage ?? article.image,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          author: article.signedName ?? author?.name ?? "Team Vander",
          section: getSectionLabel(article.section),
        })}
      />
      {article.faq?.length ? <JsonLd data={faqSchema(article.faq)} /> : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "We Are Vander", path: "/" },
          { name: getSectionLabel(article.section), path: `/section/${article.section}` },
          { name: article.title, path },
        ])}
      />
      <article id="historia">
        <div className="mx-auto max-w-4xl px-5 pt-8 sm:px-8 sm:pt-14">
          <Crumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: getSectionLabel(article.section), href: `/section/${article.section}` },
              { label: article.title },
            ]}
          />
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
          <p className="kicker mt-4 flex items-center gap-2 text-xs text-rust">
            <VanderBug />
            {article.kicker} · {city || getSectionLabel(article.section)}
          </p>
          <h1 className="headline mt-3 text-4xl leading-[1.05] sm:mt-5 sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-5 font-body text-lg leading-snug text-ink-soft sm:mt-6 sm:text-2xl sm:leading-snug">
            {article.dek}
          </p>
          {article.tldr ? <Tldr items={article.tldr} /> : null}
          <div className="mt-6">
            <TagPills article={article} />
          </div>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-y border-ink py-4">
            <div>
              <p className="headline text-2xl">{signer ?? "Team Vander"}</p>
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
          <ShareBar
            url={path}
            title={article.title}
            dek={article.dek}
            layout="row"
            className="mt-4 lg:hidden"
          />
        </div>

        <figure className="mx-auto mt-8 max-w-[90rem] px-0 sm:mt-10 sm:px-6">
          <img src={article.image} alt={article.imageAlt} className="aspect-[16/9] w-full object-cover" loading="eager" />
          <figcaption className="mt-2 px-5 font-kicker text-xs tracking-wider text-muted uppercase sm:px-0">
            {article.caption}
          </figcaption>
        </figure>

        {article.gallery && article.gallery.length > 0 && (
          <div className="mx-auto mt-6 grid max-w-[90rem] gap-4 px-5 sm:grid-cols-3 sm:px-6">
            {article.gallery.map((g) => (
              <figure key={g.src + g.caption}>
                <img src={g.src} alt={g.alt} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-2 font-kicker text-xs tracking-wider text-muted uppercase">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mx-auto mt-10 max-w-7xl px-5 sm:mt-14 sm:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <aside className="hidden lg:col-span-2 lg:block">
              <div className="sticky top-28">
                <ShareBar url={path} title={article.title} dek={article.dek} />
              </div>
            </aside>
            <div className="lg:col-span-9 xl:col-span-8">
              <div className="measure">
                {renderBody(article.body, article.franchise !== "signals")}
                {article.faq?.length ? <FaqBlock items={article.faq} /> : null}
              </div>

              <aside className="mt-16 border-t-2 border-ink py-8">
                {author && (article.signedName || article.franchise === "contra") ? (
                  <>
                    <p className="kicker text-xs text-muted">La firma</p>
                    <div className="mt-4 flex gap-4">
                      <img src={author.image} alt="" className="size-20 object-cover sm:size-24" />
                      <div>
                        <p className="headline text-2xl sm:text-3xl">{author.name}</p>
                        <p className="kicker mt-1 text-xs text-rust">
                          {author.role} · {author.city}
                        </p>
                        <p className="mt-2 font-body text-base leading-relaxed text-ink-soft">{author.bio}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="kicker text-xs text-muted">La firma</p>
                    <p className="headline mt-3 text-3xl sm:text-4xl">Team Vander</p>
                    <p className="kicker mt-1 text-xs text-rust">{HOUSE.credit}</p>
                    <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                      Team Vander es la redacción de Interadia en seis ciudades. Una firma, un criterio.
                    </p>
                    <Link to="/about" className="mt-3 inline-block kicker text-xs text-ink underline decoration-rust hover:text-rust">
                      La redacción
                    </Link>
                  </>
                )}
              </aside>

              <StoryMesa slug={article.slug} />
            </div>
          </div>
        </div>
      </article>

      <div className="flex justify-center py-8">
        <VanderBug className="size-5" />
      </div>

      <section className="border-t border-ink px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="headline border-b border-ink pb-3 text-4xl sm:text-5xl">Sigue leyendo</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
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

function renderBody(blocks: BodyBlock[], dropCap: boolean) {
  const out: ReactNode[] = [];
  let i = 0;
  let dropped = false;
  let grafs = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (block.type === "stat") {
      const group: Extract<BodyBlock, { type: "stat" }>[] = [];
      while (i < blocks.length && blocks[i].type === "stat") {
        group.push(blocks[i] as Extract<BodyBlock, { type: "stat" }>);
        i++;
      }
      out.push(
        <div key={`stats-${i}`} className="my-8 grid grid-cols-3 gap-4 border-y border-ink py-5">
          {group.map((s) => (
            <p key={s.label} className="min-w-0">
              <span className="headline block text-2xl tabular-nums sm:text-4xl">{s.value}</span>
              <span className="mt-1 block font-sans text-[11px] leading-tight text-muted sm:text-xs">{s.label}</span>
            </p>
          ))}
        </div>,
      );
      continue;
    }
    const drop = dropCap && !dropped && block.type === "p";
    if (drop) dropped = true;
    if (block.type === "p") grafs += 1;
    out.push(
      <div key={i}>
        <Block block={block} drop={drop} />
        {grafs === 1 && block.type === "p" ? <AdSlot size="inread" creative="vander20" /> : null}
      </div>,
    );
    i++;
  }
  return out;
}

function Block({ block, drop }: { block: BodyBlock; drop: boolean }) {
  if (block.type === "h2") {
    return <h2 className="headline mt-12 mb-5 text-3xl leading-[1.08] sm:mt-16 sm:text-5xl">{block.text}</h2>;
  }
  if (block.type === "quote") {
    return (
      <blockquote className="my-10 border-l-4 border-rust pl-5 sm:my-12 sm:pl-6">
        <p className="headline text-3xl leading-[1.12] sm:text-5xl">{block.text}</p>
        {block.cite && <footer className="mt-3 kicker text-xs text-muted">{block.cite}</footer>}
      </blockquote>
    );
  }
  if (block.type === "q") {
    return <p className="mt-10 mb-2 font-sans text-sm font-semibold tracking-tight text-rust">— {block.text}</p>;
  }
  if (block.type === "a") {
    return <p className="reading mb-6 text-ink">{block.text}</p>;
  }
  if (block.type === "stat") {
    return null;
  }
  return (
    <p className={`reading mb-6 text-ink ${drop ? "drop-cap" : ""}`}>
      {block.text}
    </p>
  );
}
