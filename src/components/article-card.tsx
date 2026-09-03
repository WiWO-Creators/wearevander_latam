import { Link } from "@tanstack/react-router";
import {
  articleCity,
  articleFranchise,
  articleImage,
  articleImageAlt,
  articleKicker,
  articleSignedName,
  articleTags,
  articleUpdated,
  formatShortDate,
  getTag,
  wasUpdated,
  type Article,
  type Brief,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { VanderBug } from "@/components/brand";

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span className={cn("photo block", className)}>
      <img src={src} alt={alt} />
    </span>
  );
}

export function TagPills({ article, dark = false }: { article: Article; dark?: boolean }) {
  const tags = articleTags(article);
  return (
    <ul className="flex flex-wrap items-center gap-1.5">
      {tags.map((id) => {
        const tag = getTag(id);
        if (!tag) return null;
        const pace = tag.kind === "pace";
        return (
          <li key={id}>
            <Link
              to={
                articleFranchise(article) === "signals"
                  ? "/signals/tag/$tag"
                  : articleFranchise(article) === "contra"
                    ? "/contra/tag/$tag"
                    : "/tag/$tag"
              }
              params={{ tag: id }}
              className={cn(
                "inline-flex h-6 items-center border px-2 font-kicker text-[10px] tracking-[0.08em] uppercase",
                pace
                  ? dark
                    ? "border-rust/50 text-rust"
                    : "border-rust/40 text-rust"
                  : dark
                    ? "border-paper/20 text-silver hover:text-paper"
                    : "border-rule text-muted hover:border-ink hover:text-ink",
              )}
            >
              {tag.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ReadMeta({
  article,
  className,
  dark = false,
  showAuthor = true,
}: {
  article: Article;
  className?: string;
  dark?: boolean;
  showAuthor?: boolean;
}) {
  const updated = wasUpdated(article);
  const who = articleSignedName(article) || "Team Vander";
  const city = articleCity(article);
  const bits = [
    showAuthor ? who : null,
    showAuthor ? city : null,
    `${article.readingMinutes} min`,
    formatShortDate(article.publishedAt),
    updated ? `act. ${formatShortDate(articleUpdated(article))}` : null,
  ].filter(Boolean) as string[];
  return (
    <p className={cn("font-sans text-[12px] leading-none", dark ? "text-silver" : "text-muted", className)}>
      {bits.map((bit, i) => (
        <span key={`${bit}-${i}`}>
          {i > 0 ? <span className="mx-2 opacity-30">·</span> : null}
          <span className={i === 0 && showAuthor ? (dark ? "text-paper/80" : "text-ink") : undefined}>{bit}</span>
        </span>
      ))}
    </p>
  );
}

export function StoryMeta({
  article,
  dark = false,
  showAuthor = true,
  className,
}: {
  article: Article;
  dark?: boolean;
  showAuthor?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <TagPills article={article} dark={dark} />
      <span className={cn("hidden h-3 w-px sm:block", dark ? "bg-paper/20" : "bg-rule")} aria-hidden />
      <ReadMeta article={article} dark={dark} showAuthor={showAuthor} />
    </div>
  );
}

export function CoverHero({ article }: { article: Article }) {
  const city = articleCity(article);
  return (
    <article className="bg-ink text-paper">
      <div className="lg:grid lg:grid-cols-12 lg:items-stretch">
        <Link
          to="/story/$slug"
          params={{ slug: article.id }}
          className="group relative block lg:col-span-7"
        >
          <Photo
            src={articleImage(article)}
            alt={articleImageAlt(article)}
            className="aspect-[16/10] w-full sm:aspect-video lg:aspect-auto lg:h-full lg:min-h-[32rem]"
          />
        </Link>
        <div className="flex flex-col justify-end px-4 py-6 sm:px-8 sm:py-8 lg:col-span-5 lg:px-10 lg:py-12">
          <div className="rise">
            <p className="kicker flex items-center gap-2 text-xs text-rust">
              <VanderBug />
              Portada · {city || "Latam"}
            </p>
            <h1 className="headline mt-3 max-w-xl text-[1.85rem] leading-[1.06] text-paper sm:mt-4 sm:text-6xl lg:text-6xl">
              <Link to="/story/$slug" params={{ slug: article.id }} className="hover:text-rust">
                {article.title}
              </Link>
            </h1>
            <p className="mt-5 max-w-md font-body text-base leading-snug text-paper/80 sm:text-lg">
              {article.summary}
            </p>
            <StoryMeta article={article} dark className="mt-6" />
            <Link
              to="/story/$slug"
              params={{ slug: article.id }}
              className="press kicker mt-8 inline-flex h-11 items-center border border-paper/30 px-5 text-xs text-paper hover:bg-paper hover:text-ink"
            >
              Leer la portada
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HeroStory({ article }: { article: Article }) {
  return (
    <article>
      <Link to="/story/$slug" params={{ slug: article.id }} className="group block">
        <Photo src={articleImage(article)} alt={articleImageAlt(article)} className="aspect-video w-full" />
      </Link>
      <p className="kicker mt-3 text-xs text-rust">{articleKicker(article)}</p>
      <h2 className="headline mt-2 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
        <Link to="/story/$slug" params={{ slug: article.id }} className="link-title">
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 max-w-2xl font-body text-base leading-snug text-ink-soft sm:text-lg">{article.summary}</p>
      <StoryMeta article={article} className="mt-4" />
    </article>
  );
}

export function RailItem({ article }: { article: Article }) {
  const city = articleCity(article);
  return (
    <article className="grid grid-cols-12 items-start gap-4 border-b border-rule py-5 last:border-b-0">
      <div className="col-span-9">
        <p className="kicker text-xs text-rust">{articleKicker(article)}</p>
        <h3 className="headline mt-2 text-2xl leading-[1.08] sm:text-[1.85rem]">
          <Link to="/story/$slug" params={{ slug: article.id }} className="link-title">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 font-sans text-[12px] text-muted">
          {city}
          <span className="mx-2 opacity-30">·</span>
          {article.readingMinutes} min
        </p>
      </div>
      <Link to="/story/$slug" params={{ slug: article.id }} className="group col-span-3">
        <Photo src={articleImage(article)} alt="" className="aspect-square w-full sm:aspect-[4/3]" />
      </Link>
    </article>
  );
}

export function StackedCard({
  article,
  large = false,
}: {
  article: Article;
  large?: boolean;
}) {
  return (
    <article>
      <Link to="/story/$slug" params={{ slug: article.id }} className="group block">
        <Photo
          src={articleImage(article)}
          alt={articleImageAlt(article)}
          className={cn("w-full", large ? "aspect-video" : "aspect-[3/2]")}
        />
        <p className="kicker mt-3 flex items-center gap-1.5 text-xs text-rust">
          <VanderBug className="size-3" />
          {articleKicker(article)}
        </p>
        <h3
          className={cn(
            "headline link-title mt-2 text-balance",
            large
              ? "text-[2.05rem] leading-[1.06] sm:text-5xl lg:text-6xl"
              : "text-2xl leading-[1.1] sm:text-3xl",
          )}
        >
          {article.title}
        </h3>
        <p
          className={cn(
            "mt-3 font-body leading-snug text-ink-soft",
            large ? "max-w-2xl text-base sm:text-lg" : "line-clamp-2 text-sm",
          )}
        >
          {article.summary}
        </p>
      </Link>
      <StoryMeta article={article} className="mt-4" />
    </article>
  );
}

export function HorizontalCard({ article }: { article: Article }) {
  return (
    <article className="grid grid-cols-12 items-start gap-4 border-t border-rule py-4 first:border-t-0 first:pt-0">
      <Link to="/story/$slug" params={{ slug: article.id }} className="group col-span-4">
        <Photo src={articleImage(article)} alt={articleImageAlt(article)} className="aspect-[4/3] w-full" />
      </Link>
      <div className="col-span-8">
        <p className="kicker text-xs text-rust">{articleKicker(article)}</p>
        <h3 className="headline mt-2 text-2xl leading-[1.1] sm:text-3xl lg:text-4xl">
          <Link to="/story/$slug" params={{ slug: article.id }} className="link-title">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 hidden font-body text-sm leading-snug text-ink-soft sm:line-clamp-2 sm:block sm:text-base">
          {article.summary}
        </p>
        <p className="mt-3 font-sans text-[12px] text-muted">
          {articleSignedName(article) || "Team Vander"}
          <span className="mx-2 opacity-30">·</span>
          {article.readingMinutes} min
          <span className="mx-2 opacity-30">·</span>
          {formatShortDate(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}

export function TextCard({ article }: { article: Article }) {
  const city = articleCity(article);
  return (
    <article className="border-t border-rule py-3">
      <p className="kicker text-xs text-rust">{articleKicker(article)}</p>
      <h3 className="headline mt-1 text-lg">
        <Link to="/story/$slug" params={{ slug: article.id }} className="link-title">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1 font-sans text-[12px] text-muted">
        {city} · {article.readingMinutes} min
      </p>
    </article>
  );
}

export function NumberedItem({ article, rank }: { article: Article; rank: number }) {
  const city = articleCity(article);
  return (
    <article className="grid grid-cols-12 items-start gap-2 border-b border-rule py-3 last:border-b-0">
      <span className="col-span-2 headline text-2xl tabular-nums text-rust">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="col-span-10">
        <p className="kicker text-xs text-muted">
          {city} · {article.readingMinutes} min
        </p>
        <h3 className="headline mt-0.5 text-base sm:text-lg">
          <Link to="/story/$slug" params={{ slug: article.id }} className="link-title">
            {article.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export function MiniLead({ article }: { article: Article }) {
  const city = articleCity(article);
  return (
    <article>
      <Link to="/story/$slug" params={{ slug: article.id }} className="group block">
        <Photo src={articleImage(article)} alt={articleImageAlt(article)} className="aspect-[3/2] w-full" />
        <p className="kicker mt-2.5 text-xs text-rust">{city}</p>
        <h3 className="headline link-title mt-1.5 text-xl leading-[1.12] sm:text-2xl">{article.title}</h3>
        <p className="mt-1.5 font-sans text-[12px] text-muted">{article.readingMinutes} min</p>
      </Link>
    </article>
  );
}

export function BriefRow({ brief }: { brief: Brief }) {
  return (
    <article className="flex gap-3 border-b border-rule py-2.5 last:border-b-0">
      <span className="kicker w-12 shrink-0 text-xs text-rust">{brief.time}</span>
      <h3 className="font-sans text-sm font-semibold leading-snug sm:text-base">
        <Link to="/story/$slug" params={{ slug: brief.slug }} className="link-title">
          {brief.title}
        </Link>
      </h3>
    </article>
  );
}

export function SignalRow({ article }: { article: Article }) {
  return (
    <article className="border-t border-ink/15 py-4 first:border-t-0 first:pt-0">
      <p className="kicker flex items-center gap-2 text-xs text-muted">
        <span className="inline-block size-1.5 rounded-full bg-ink/50" />
        Signals · {article.readingMinutes} min · {formatShortDate(article.publishedAt)}
        {wasUpdated(article) ? ` · Actualizada ${formatShortDate(articleUpdated(article))}` : ""}
      </p>
      <h3 className="headline mt-1 text-xl sm:text-2xl">
        <Link to="/story/$slug" params={{ slug: article.id }} className="link-title">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1 font-body text-sm leading-snug text-ink-soft">{article.summary}</p>
      <StoryMeta article={article} className="mt-3" showAuthor={false} />
    </article>
  );
}
