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
] as const;

function Player({ id, name, line }: (typeof FEEDS)[number]) {
  return (
    <figure className="min-w-0">
      <div className="aspect-video w-full overflow-hidden border border-ink bg-ink">
        <iframe
          title={`${name} en vivo`}
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        />
      </div>
      <figcaption className="mt-2 flex items-center justify-between gap-3">
        <span className="kicker text-xs text-muted">{line}</span>
        <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-rust">
          <span className="size-1.5 animate-pulse bg-rust" />
          En vivo
        </span>
      </figcaption>
    </figure>
  );
}

export function LiveDesk({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("border-y border-ink bg-ink text-paper", compact ? "px-4 py-8 sm:px-6" : "px-4 py-12 sm:px-6")}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker text-xs text-rust">Piso · transmisión</p>
            <h2 className="headline mt-1 text-3xl sm:text-5xl">
              {compact ? (
                <Link to="/piso" className="hover:text-rust">
                  Yahoo Finance y Bloomberg
                </Link>
              ) : (
                "Yahoo Finance y Bloomberg"
              )}
            </h2>
            <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-paper/70">
              Las dos señales de referencia, sin recortar. Vander no produce este aire: lo pone a
              la vista para que la redacción y el lector vean lo mismo.
            </p>
          </div>
          {compact ? (
            <Link to="/piso" className="kicker text-xs text-rust hover:underline">
              Abrir el piso
            </Link>
          ) : null}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {FEEDS.map((f) => (
            <Player key={f.id} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
