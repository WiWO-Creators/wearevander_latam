import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const FEEDS = [
  {
    id: "KQp-e_XQnDE",
    name: "Yahoo Finance",
    line: "Yahoo Finance Live",
  },
  {
    id: "QB5BNdBFujE",
    name: "Bloomberg",
    line: "Bloomberg TV",
  },
  {
    id: "GotlA1KKWoo",
    name: "CNN",
    line: "CNN Headlines",
  },
  {
    id: "iipR5yUp36o",
    name: "ABC News",
    line: "ABC News Live",
  },
  {
    id: "XhAYcYpPzTc",
    name: "News Live",
    line: "News TV Live",
  },
] as const;

function Player({ id, name, line }: (typeof FEEDS)[number]) {
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=1`;
  return (
    <figure className="w-[15.5rem] shrink-0 sm:w-[17.5rem]">
      <div className="aspect-video w-full overflow-hidden border border-paper/20 bg-ink">
        <iframe
          title={`${name} en vivo`}
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="mt-1.5 flex items-center justify-between gap-2">
        <span className="kicker truncate text-[10px] text-silver">{line}</span>
        <span className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-rust">
          <span className="size-1.5 animate-pulse bg-rust" />
          Mute
        </span>
      </figcaption>
    </figure>
  );
}

export function LiveDesk({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("border-y border-ink bg-ink text-paper", compact ? "px-4 py-5 sm:px-6" : "px-4 py-10 sm:px-6")}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker text-xs text-rust">Channels</p>
            <h2 className="headline mt-1 text-2xl sm:text-3xl">
              {compact ? (
                <Link to="/channels" className="hover:text-rust">
                  En el aire
                </Link>
              ) : (
                "En el aire"
              )}
            </h2>
          </div>
          {compact ? (
            <Link to="/channels" className="kicker text-[10px] text-silver hover:text-rust">
              Todos
            </Link>
          ) : (
            <p className="max-w-sm text-right font-body text-xs text-paper/55">
              Yahoo, Bloomberg, CNN, ABC y más. En mute. Vander no produce estas señales.
            </p>
          )}
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {FEEDS.map((f) => (
            <Player key={f.id} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
