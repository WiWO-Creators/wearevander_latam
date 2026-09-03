import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import type { WiwoBlock } from "@wiwo/contract";
import {
  articleAuthorId,
  articleBlocks,
  articleCaption,
  articleCity,
  articleFaq,
  articleFranchise,
  articleGallery,
  articleImage,
  articleImageAlt,
  articleKicker,
  articleOgDescription,
  articleOgImage,
  articleOgTitle,
  articleSectionId,
  articleSectionLabel,
  articleSignedName,
  articleUpdated,
  blockCite,
  blockHead,
  blockItems,
  blockLabel,
  blockOrdered,
  blockRows,
  blockText,
  blockValue,
  formatIssueDate,
  getArticle,
  getAuthor,
  relatedArticles,
  wasUpdated,
  HOUSE,
} from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { StackedCard, StoryMeta } from "@/components/article-card";
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
  // La nota puede venir del archivo del repositorio o de la base, y las
  // relacionadas del pie también, así que la vista trabaja sobre las dos fuentes.
  loader: () => getArticles(),
  head: ({ loaderData, params }) => {
    const article = loaderData ? getArticle(loaderData, params.slug) : undefined;
    if (!article) {
      return seoHead({
        title: "Historia — We Are Vander",
        description: "Esta historia no está en el número.",
        path: `/story/${params.slug}`,
        noindex: true,
      });
    }
    // La capa `seo` puede no venir en una nota publicada desde el orquestador:
    // el contrato guarda el JSON que llegó, así que acá se lee con cuidado.
    const desc = article.seo?.description ?? article.summary.replace(/\s+/g, " ").slice(0, 155);
    const title = article.seo?.title ?? `${article.title} — We Are Vander`;
    return seoHead({
      title,
      description: desc,
      path: `/story/${article.id}`,
      image: articleOgImage(article) || articleImage(article),
      imageAlt: articleImageAlt(article),
      // Vacío no es lo mismo que ausente: pasar "" haría que seoHead tomara la
      // cadena vacía como la descripción social en vez de la de la nota.
      ogTitle: articleOgTitle(article) || undefined,
      ogDescription: articleOgDescription(article) || undefined,
      type: "article",
      published: article.publishedAt,
      modified: article.updatedAt,
    });
  },
});

function StoryPage() {
  const { slug } = Route.useParams();
  const articles = Route.useLoaderData();
  const article = getArticle(articles, slug);
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
  const related = relatedArticles(articles, article.id, 3);
  const author = getAuthor(articleAuthorId(article));
  const franchise = articleFranchise(article);
  const signer = articleSignedName(article) || (franchise === "contra" ? author?.name : undefined);
  const updated = wasUpdated(article);
  const faq = articleFaq(article);
  const gallery = articleGallery(article);
  const path = `/story/${article.id}`;

  return (
    <main>
      <ReadProgress targetId="historia" />
      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.seo?.description ?? article.summary,
          path,
          image: articleOgImage(article) || articleImage(article),
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: articleSignedName(article) || author?.name || "Team Vander",
          section: articleSectionLabel(article),
        })}
      />
      {faq.length ? <JsonLd data={faqSchema(faq)} /> : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "We Are Vander", path: "/" },
          { name: articleSectionLabel(article), path: `/section/${articleSectionId(article)}` },
          { name: article.title, path },
        ])}
      />
      <article id="historia">
        <div className="mx-auto max-w-4xl px-5 pt-8 sm:px-8 sm:pt-14">
          <Crumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: articleSectionLabel(article), href: `/section/${articleSectionId(article)}` },
              { label: article.title },
            ]}
          />
          {franchise === "contra" && (
            <Link to="/contra" className="logo-mark mb-4 inline-block">
              <ContraMark className="h-8 sm:h-10" />
            </Link>
          )}
          {franchise === "signals" && (
            <Link to="/signals" className="logo-mark mb-4 inline-block">
              <SignalsMark className="h-10 sm:h-12" />
            </Link>
          )}
          <p className="kicker mt-4 flex items-center gap-2 text-xs text-rust">
            <VanderBug />
            {articleKicker(article)} · {city || articleSectionLabel(article)}
          </p>
          <h1 className="headline mt-3 text-4xl leading-[1.05] sm:mt-5 sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-5 font-body text-lg leading-snug text-ink-soft sm:mt-6 sm:text-2xl sm:leading-snug">
            {article.summary}
          </p>
          {article.seo?.tldr.length ? <Tldr items={article.seo.tldr} /> : null}
          <StoryMeta article={article} showAuthor={false} className="mt-6" />
          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-y border-ink py-4">
            <div>
              <p className="headline text-2xl">{signer ?? "Team Vander"}</p>
              <p className="mt-1 font-sans text-[12px] text-muted">
                {franchise === "contra" ? "Opinión firmada" : HOUSE.credit}
                {city ? ` · ${city}` : ""}
                <span className="mx-2 opacity-30">·</span>
                {article.readingMinutes} min
                <span className="mx-2 opacity-30">·</span>
                {formatIssueDate(article.publishedAt)}
                {updated ? ` · actualizada ${formatIssueDate(articleUpdated(article))}` : ""}
              </p>
            </div>
            <SaveButton slug={article.id} saved={saved} onChange={setSaved} />
          </div>
          <ShareBar
            url={path}
            title={article.title}
            dek={article.summary}
            layout="row"
            className="mt-4 lg:hidden"
          />
        </div>

        <figure className="mx-auto mt-8 max-w-[90rem] px-0 sm:mt-10 sm:px-6">
          <img
            src={articleImage(article)}
            alt={articleImageAlt(article)}
            className="aspect-[16/9] w-full object-cover"
            loading="eager"
          />
          <figcaption className="mt-2 px-5 font-kicker text-xs tracking-wider text-muted uppercase sm:px-0">
            {articleCaption(article)}
          </figcaption>
        </figure>

        {gallery.length > 0 && (
          <div className="mx-auto mt-6 grid max-w-[90rem] gap-4 px-5 sm:grid-cols-3 sm:px-6">
            {gallery.map((g) => (
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
                <ShareBar url={path} title={article.title} dek={article.summary} />
              </div>
            </aside>
            <div className="lg:col-span-9 xl:col-span-8">
              <div className="measure">
                {renderBody(articleBlocks(article), franchise !== "signals")}
                {faq.length ? <FaqBlock items={faq} /> : null}
              </div>

              <aside className="mt-16 border-t-2 border-ink py-8">
                {author && (articleSignedName(article) || franchise === "contra") ? (
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

              <StoryMesa slug={article.id} />
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
              <StackedCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

/**
 * True si el bloque es un subtítulo.
 *
 * El archivo del repositorio los escribe como `h2`, que es como nacieron acá, y
 * el orquestador los manda como `heading`, que es el nombre del vocabulario
 * común. Son la misma cosa y se dibujan igual; mirar solo uno dejaría media nota
 * sin subtítulos según de dónde venga.
 */
function esSubtitulo(block: WiwoBlock) {
  return block.type === "h2" || block.type === "heading";
}

/** True si el bloque es un párrafo de prosa. Misma historia: `p` y `paragraph`. */
function esParrafo(block: WiwoBlock) {
  return block.type === "p" || block.type === "paragraph";
}

/**
 * Dibuja el cuerpo.
 *
 * Los bloques llegan como los define el contrato: solo garantizan `type`, y sus
 * campos se leen con los accesores del catálogo. Es lo que permite que un bloque
 * que este sitio no conozca no rompa la nota entera.
 */
function renderBody(blocks: WiwoBlock[], dropCap: boolean) {
  const out: ReactNode[] = [];
  let i = 0;
  let dropped = false;
  let grafs = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (esSubtitulo(block) && isSourcesHeading(blockText(block))) {
      const items: WiwoBlock[] = [];
      i += 1;
      while (i < blocks.length && !esSubtitulo(blocks[i])) {
        items.push(blocks[i]);
        i += 1;
      }
      out.push(<SourcesBlock key="sources" title={blockText(block)} items={items} />);
      continue;
    }
    if (block.type === "stat") {
      const group: WiwoBlock[] = [];
      while (i < blocks.length && blocks[i].type === "stat") {
        group.push(blocks[i]);
        i++;
      }
      out.push(
        <div key={`stats-${i}`} className="my-8 grid grid-cols-3 gap-4 border-y border-ink py-5">
          {group.map((s) => (
            <p key={blockLabel(s)} className="min-w-0">
              <span className="headline block text-2xl tabular-nums sm:text-4xl">{blockValue(s)}</span>
              <span className="mt-1 block font-sans text-[11px] leading-tight text-muted sm:text-xs">
                {blockLabel(s)}
              </span>
            </p>
          ))}
        </div>,
      );
      continue;
    }
    const drop = dropCap && !dropped && esParrafo(block);
    if (drop) dropped = true;
    if (esParrafo(block)) grafs += 1;
    out.push(
      <div key={i}>
        <Block block={block} drop={drop} />
        {grafs === 1 && esParrafo(block) ? <AdSlot size="inread" creative="vander20" /> : null}
      </div>,
    );
    i++;
  }
  return out;
}

function isSourcesHeading(text: string) {
  return /^(fuentes|referencias|notas)\b/i.test(text.trim());
}

function SourcesBlock({ title, items }: { title: string; items: WiwoBlock[] }) {
  const lines = items.filter((b) => b.type === "p" || b.type === "a");
  if (lines.length === 0) return null;
  return (
    <aside className="mt-14 border-t border-rule pt-6">
      <h2 className="kicker text-[11px] tracking-[0.18em] text-muted">{title}</h2>
      <ol className="mt-4 space-y-2.5">
        {lines.map((line, i) => (
          <li key={i} className="font-sans text-[12.5px] leading-snug text-muted sm:text-[13px]">
            {linkifySource(blockText(line))}
          </li>
        ))}
      </ol>
    </aside>
  );
}

function linkifySource(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) => {
    if (!part.startsWith("http")) return <span key={i}>{part}</span>;
    const trimmed = part.replace(/[),.;:]+$/g, "");
    const trail = part.slice(trimmed.length);
    return (
      <span key={i}>
        <a
          href={trimmed}
          target="_blank"
          rel="noreferrer"
          className="break-all underline decoration-rule underline-offset-2 hover:text-ink"
        >
          {trimmed}
        </a>
        {trail}
      </span>
    );
  });
}

/**
 * Dibuja un bloque del cuerpo.
 *
 * Conoce dos vocabularios a la vez: el de la casa —`p`, `h2`, `q`, `a`, `stat`—
 * y el común de la red, que es el que anuncia el manifest y el único que el
 * orquestador sabe escribir. Lo que no reconoce cae en párrafo, que es la forma
 * que menos daño hace.
 */
function Block({ block, drop }: { block: WiwoBlock; drop: boolean }) {
  if (esSubtitulo(block)) {
    return (
      <h2 className="headline mt-12 mb-5 text-3xl leading-[1.08] sm:mt-16 sm:text-5xl">
        {blockText(block)}
      </h2>
    );
  }
  if (block.type === "quote") {
    const cite = blockCite(block);
    return (
      <blockquote className="my-10 border-l-4 border-rust pl-5 sm:my-12 sm:pl-6">
        <p className="headline text-3xl leading-[1.12] sm:text-5xl">{blockText(block)}</p>
        {cite && <footer className="mt-3 kicker text-xs text-muted">{cite}</footer>}
      </blockquote>
    );
  }
  if (block.type === "q") {
    return (
      <p className="mt-10 mb-2 font-sans text-sm font-semibold tracking-tight text-rust">
        — {blockText(block)}
      </p>
    );
  }
  if (block.type === "a") {
    return <p className="reading mb-6 text-ink">{blockText(block)}</p>;
  }
  if (block.type === "stat") {
    // Las cifras no se dibujan sueltas: renderBody las agrupa de a tres en una
    // banda, así que acá no queda nada por hacer.
    return null;
  }
  if (block.type === "divider") {
    return <hr className="my-10 border-0 border-t border-rule sm:my-12" />;
  }
  if (block.type === "list") {
    const items = blockItems(block);
    const List = blockOrdered(block) ? "ol" : "ul";
    return (
      <List
        className={`reading mb-6 ml-5 text-ink ${blockOrdered(block) ? "list-decimal" : "list-disc"}`}
      >
        {items.map((item) => (
          <li key={item} className="mb-2 pl-1">
            {item}
          </li>
        ))}
      </List>
    );
  }
  if (block.type === "table") {
    const head = blockHead(block);
    return (
      <div className="my-8 overflow-x-auto border-y border-ink">
        <table className="w-full border-collapse text-left font-sans text-sm">
          {head.length > 0 && (
            <thead>
              <tr>
                {head.map((cell) => (
                  <th key={cell} className="border-b border-ink py-2 pr-4 font-semibold text-muted">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {blockRows(block).map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell) => (
                  <td key={cell} className="border-b border-rule py-2 pr-4 tabular-nums">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p className={`reading mb-6 text-ink ${drop ? "drop-cap" : ""}`}>
      {blockText(block)}
    </p>
  );
}
