import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TradingViewTape } from "@/components/markets-tv";
import type { MarketsSnapshot, PublishedInstrument } from "@/lib/markets/types";

function fmt(n: number) {
  const digits = Math.abs(n) >= 1000 ? 0 : n >= 20 ? 2 : 4;
  return n.toLocaleString("es-MX", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function QuoteChip({ q }: { q: PublishedInstrument }) {
  if (q.status !== "ok" && q.status !== "stale") {
    return (
      <span className="inline-flex items-baseline gap-2 pr-8 font-sans text-xs tracking-wide text-paper/35">
        <span className="font-semibold">{q.label}</span>
        <span>—</span>
      </span>
    );
  }
  const up = (q.change_pct ?? 0) >= 0;
  return (
    <span className="inline-flex items-baseline gap-2 pr-8 font-sans text-xs tracking-wide">
      <span className="font-semibold">{q.label}</span>
      <span className="tabular-nums text-silver">{fmt(q.value ?? 0)}</span>
      <span className={cn("tabular-nums font-semibold", up ? "text-up" : "text-down")}>
        {up ? "+" : ""}
        {(q.change_pct ?? 0).toFixed(2)}%
      </span>
    </span>
  );
}

function NativeTape({ snap }: { snap: MarketsSnapshot }) {
  const visible = snap.instruments.filter((q) => q.status === "ok" || q.status === "stale" || q.status === "unavailable" || q.status === "rejected_validation");
  const tape = [...visible, ...visible];
  const delayed = visible.some((q) => q.status === "stale");
  return (
    <div className="border-b border-bleed/10 bg-void text-bleed">
      <div className="ticker mx-auto flex max-w-7xl items-center gap-3 px-3 py-1 sm:gap-4 sm:px-6 sm:py-1.5">
        <span className="kicker shrink-0 text-[10px] text-silver sm:text-xs">{snap.session_label}</span>
        <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track">
            {tape.map((q, i) => (
              <QuoteChip key={`${q.id}-${i}`} q={q} />
            ))}
          </div>
        </div>
      </div>
      <p className="px-3 pb-1 font-sans text-[10px] tracking-wide text-paper/40 sm:px-6">
        {delayed ? "Datos con retraso · " : ""}
        {snap.attribution}
      </p>
    </div>
  );
}

export function MarketsBar() {
  const [snap, setSnap] = useState<MarketsSnapshot | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/markets", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as MarketsSnapshot;
        if (!cancelled) setSnap(data);
      } catch {
        /* widget fallback */
      }
    }
    void load();
    const id = window.setInterval(() => void load(), 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  if (snap?.mode === "native") {
    const anyOk = snap.instruments.some((i) => i.status === "ok" || i.status === "stale");
    if (!anyOk) return null;
    return <NativeTape snap={snap} />;
  }

  return <TradingViewTape label={snap?.session_label} />;
}
