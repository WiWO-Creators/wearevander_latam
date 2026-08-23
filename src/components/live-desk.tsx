import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const FEEDS = [
  { id: "KQp-e_XQnDE", name: "Yahoo Finance", line: "Yahoo Finance" },
  { id: "QB5BNdBFujE", name: "Bloomberg", line: "Bloomberg" },
  { id: "GotlA1KKWoo", name: "CNN", line: "CNN Headlines" },
  { id: "iipR5yUp36o", name: "ABC News", line: "ABC News" },
] as const;

function Player({
  id,
  name,
  line,
  controls,
}: (typeof FEEDS)[number] & { controls: boolean }) {
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=${controls ? 1 : 0}`;
  return (
    <figure className="w-[14.25rem] shrink-0 sm:w-[16rem]">
      <div className="aspect-video w-full overflow-hidden bg-ink ring-1 ring-paper/10">
        <iframe
          title={`${name} en vivo`}
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="mt-2 flex items-center gap-2">
        <span className="size-1 shrink-0 bg-rust" />
        <span className="kicker truncate text-[10px] tracking-[0.18em] text-paper/55">{line}</span>
      </figcaption>
    </figure>
  );
}

function Rail({ controls }: { controls: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let dir = 1;
    let paused = false;
    const speed = 0.32;

    const tick = () => {
      if (!paused) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 2) {
          if (el.scrollLeft >= max - 0.5) dir = -1;
          if (el.scrollLeft <= 0.5) dir = 1;
          el.scrollLeft += dir * speed;
        }
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const stop = () => {
      paused = true;
    };
    const go = () => {
      paused = false;
    };
    el.addEventListener("pointerenter", stop);
    el.addEventListener("pointerleave", go);
    el.addEventListener("focusin", stop);
    el.addEventListener("focusout", go);

    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", stop);
      el.removeEventListener("pointerleave", go);
      el.removeEventListener("focusin", stop);
      el.removeEventListener("focusout", go);
    };
  }, []);

  return (
    <div ref={ref} className="channel-rail mt-5 flex gap-4 overflow-x-auto">
      {FEEDS.map((f) => (
        <Player key={f.id} {...f} controls={controls} />
      ))}
    </div>
  );
}

export function LiveDesk({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("border-y border-ink bg-ink text-paper", compact ? "px-4 py-6 sm:px-6" : "px-4 py-10 sm:px-6")}>
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
            <Link to="/channels" className="kicker text-[10px] tracking-[0.18em] text-paper/45 hover:text-rust">
              Ver todos
            </Link>
          ) : (
            <p className="max-w-xs text-right font-body text-xs leading-relaxed text-paper/45">
              En mute. El riel se detiene si pasás el cursor.
            </p>
          )}
        </div>
        <Rail controls={!compact} />
      </div>
    </section>
  );
}
