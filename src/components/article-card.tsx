import { Link } from "@tanstack/react-router";
import {
  articleCity,
  formatShortDate,
  getAuthor,
  getSectionLabel,
  type Article,
  type Brief,
} from "@/lib/content";
import { cn } from "@/lib/utils";

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

export function CoverHero({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  const city = articleCity(article);
  return (
    <article className="bg-ink text-paper">
      <Link to="/story/$slug" params={{ slug: article.slug }} className="group relative block">
        <Photo src={article.image} alt={article.imageAlt} className="aspect-video w-full" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/75 to-transparent lg:block" />
        <div className="bg-ink px-4 py-7 sm:px-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent lg:px-0 lg:py-0">
          <div className="mx-auto max-w-7xl lg:px-6 lg:pb-12">
            <p className="kicker text-xs text-rust">Portada · Latam</p>
            <h1 className="headline mt-3 max-w-5xl text-5xl text-paper sm:text-7xl lg:text-8xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base leading-snug text-paper/80 sm:text-xl">
              {article.dek}
            </p>
            <p className="mt-4 font-kicker text-xs tracking-widest text-paper/65 uppercase">
              Por {author?.name}
              {city ? ` · ${city}` : ""} · {formatShortDate(article.publishedAt)} · {article.readMinutes} min
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function HeroStory({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  const city = articleCity(article);
  return (
    <article>
      <Link to="/story/$slug" params={{ slug: article.slug }} className="group block">
        <Photo src={article.image} alt={article.imageAlt} className="aspect-video w-full" />
      </Link>
      <p className="kicker mt-3 text-xs text-rust">{article.kicker}</p>
      <h2 className="headline mt-1 text-3xl sm:text-5xl">
        <Link to="/story/$slug" params={{ slug: article.slug }} className="link-title">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 font-body text-base leading-snug text-ink-soft sm:text-lg">{article.dek}</p>
      <p className="mt-2 font-kicker text-xs tracking-widest text-muted uppercase">
        Por {author?.name}
        {city ? ` · ${city}` : ""} · {formatShortDate(article.publishedAt)} · {article.readMinutes} min
      </p>
    </article>
  );
}

export function RailItem({ article }: { article: Article }) {
  const city = articleCity(article);
  return (
    <article className="grid grid-cols-12 gap-3 border-b border-rule py-3 last:border-b-0">
      <div className="col-span-8">
        <p className="kicker text-xs text-rust">{article.kicker}</p>
        <h3 className="headline mt-1 text-base sm:text-lg">
          <Link to="/story/$slug" params={{ slug: article.slug }} className="link-title">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 font-kicker text-xs tracking-wider text-muted uppercase">
          {city} · {formatShortDate(article.publishedAt)}
        </p>
      </div>
      <Link to="/story/$slug" params={{ slug: article.slug }} className="group col-span-4">
        <Photo src={article.image} alt="" className="aspect-square w-full sm:aspect-[4/3]" />
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
  const city = articleCity(article);
  return (
    <article>
      <Link to="/story/$slug" params={{ slug: article.slug }} className="group block">
        <Photo
          src={article.image}
          alt={article.imageAlt}
          className={cn("w-full", large ? "aspect-video" : "aspect-[3/2]")}
        />
        <p className="kicker mt-2.5 text-xs text-rust">{article.kicker}</p>
        <h3 className={cn("headline link-title mt-1", large ? "text-3xl sm:text-4xl" : "text-xl")}>
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-sm leading-snug text-ink-soft">{article.dek}</p>
        <p className="mt-2 font-kicker text-xs tracking-wider text-muted uppercase">
          {city} · {article.readMinutes} min
        </p>
      </Link>
    </article>
  );
}

export function HorizontalCard({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  const city = articleCity(article);
  return (
    <article className="grid grid-cols-12 items-start gap-4 border-t border-rule py-4 first:border-t-0 first:pt-0">
      <Link to="/story/$slug" params={{ slug: article.slug }} className="group col-span-4">
        <Photo src={article.image} alt={article.imageAlt} className="aspect-[4/3] w-full" />
      </Link>
      <div className="col-span-8">
        <p className="kicker text-xs text-rust">{article.kicker}</p>
        <h3 className="headline mt-1 text-xl sm:text-2xl">
          <Link to="/story/$slug" params={{ slug: article.slug }} className="link-title">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 hidden font-body text-sm leading-snug text-ink-soft sm:line-clamp-2 sm:block">
          {article.dek}
        </p>
        <p className="mt-2 font-kicker text-xs tracking-wider text-muted uppercase">
          {author?.name}
          {city ? ` · ${city}` : ""} · {formatShortDate(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}

export function TextCard({ article }: { article: Article }) {
  const city = articleCity(article);
  return (
    <article className="border-t border-rule py-3">
      <p className="kicker text-xs text-rust">{article.kicker}</p>
      <h3 className="headline mt-1 text-lg">
        <Link to="/story/$slug" params={{ slug: article.slug }} className="link-title">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1 font-kicker text-xs tracking-wider text-muted uppercase">{city}</p>
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
        <p className="kicker text-xs text-muted">{city || getSectionLabel(article.section)}</p>
        <h3 className="headline mt-0.5 text-base sm:text-lg">
          <Link to="/story/$slug" params={{ slug: article.slug }} className="link-title">
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
      <Link to="/story/$slug" params={{ slug: article.slug }} className="group block">
        <Photo src={article.image} alt={article.imageAlt} className="aspect-[3/2] w-full" />
        <p className="kicker mt-2.5 text-xs text-rust">{city || getSectionLabel(article.section)}</p>
        <h3 className="headline link-title mt-1 text-xl">{article.title}</h3>
      </Link>
    </article>
  );
}

export function BriefRow({ brief }: { brief: Brief }) {
  return (
    <article className="flex gap-3 border-b border-rule py-2.5 last:border-b-0">
      <span className="kicker w-12 shrink-0 text-xs text-rust">{brief.time}</span>
      <h3 className="headline text-sm font-bold leading-snug sm:text-base">
        <Link to="/story/$slug" params={{ slug: brief.slug }} className="link-title">
          {brief.title}
        </Link>
      </h3>
    </article>
  );
}
