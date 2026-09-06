import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function shareUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ShareBar({
  url,
  title,
  dek,
  className,
  layout = "rail",
}: {
  url: string;
  title: string;
  dek?: string;
  className?: string;
  layout?: "rail" | "row";
}) {
  const [copied, setCopied] = useState(false);
  const full = shareUrl(url);
  const encoded = encodeURIComponent(full);
  const text = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: dek, url: full });
        return;
      } catch {
        /* cancelled */
      }
    }
    void copy();
  }

  if (layout === "row") {
    return (
      <div className={cn("flex items-stretch gap-2", className)}>
        <button
          type="button"
          onClick={() => void nativeShare()}
          className="press inline-flex h-11 flex-1 items-center justify-center gap-2 border border-ink font-kicker text-[11px] tracking-[0.12em] uppercase hover:bg-void hover:text-bleed"
        >
          <Share2 className="size-4" strokeWidth={1.75} />
          Compartir
        </button>
        <button
          type="button"
          onClick={() => void copy()}
          className="press inline-flex h-11 items-center justify-center border border-ink px-4 font-kicker text-[11px] tracking-[0.12em] uppercase hover:bg-void hover:text-bleed"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
        <a
          href={`https://api.whatsapp.com/send?text=${text}%20${encoded}`}
          target="_blank"
          rel="noreferrer"
          className="press inline-flex h-11 items-center justify-center border border-ink px-4 font-kicker text-[11px] tracking-[0.12em] uppercase hover:bg-void hover:text-bleed"
        >
          WA
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <p className="kicker mb-2 text-[10px] text-muted">Compartir</p>
      <button
        type="button"
        onClick={() => void copy()}
        className="press kicker inline-flex h-9 items-center gap-1.5 text-[11px] tracking-wider text-ink hover:text-rust"
      >
        {copied ? <Check className="size-3.5" strokeWidth={1.75} /> : <Link2 className="size-3.5" strokeWidth={1.75} />}
        {copied ? "Copiado" : "Copiar enlace"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="press kicker inline-flex h-9 items-center text-[11px] tracking-wider text-ink hover:text-rust"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="press kicker inline-flex h-9 items-center text-[11px] tracking-wider text-ink hover:text-rust"
      >
        LinkedIn
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${text}%20${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="press kicker inline-flex h-9 items-center text-[11px] tracking-wider text-ink hover:text-rust"
      >
        WhatsApp
      </a>
    </div>
  );
}

export function ReadProgress({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight * 0.45;
      const scrolled = window.scrollY - el.offsetTop;
      setP(Math.min(1, Math.max(0, scrolled / Math.max(1, total))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      aria-label="Progreso de lectura"
      className="pointer-events-none fixed top-0 left-0 z-50 h-[2px] bg-rust"
      style={{ width: `${p * 100}%` }}
    />
  );
}
