import { useEffect, useState } from "react";
import { getMarkets, MARKET_SEED, type MarketQuote } from "@/lib/server/markets";
import { cn } from "@/lib/utils";

function fmt(n: number, digits = 2) {
  return n.toLocaleString("es-MX", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function QuoteChip({ q }: { q: MarketQuote }) {
  const up = q.changePct >= 0;
  return (
    <span className="inline-flex items-baseline gap-2 pr-8 font-sans text-xs tracking-wide">
      <span className="font-semibold">{q.label}</span>
      <span className="tabular-nums text-silver">{fmt(q.price, q.price > 1000 ? 0 : 2)}</span>
      <span className={cn("tabular-nums font-semibold", up ? "text-up" : "text-down")}>
        {up ? "+" : ""}
        {q.changePct.toFixed(2)}%
      </span>
    </span>
  );
}

export function MarketsBar() {
  const [quotes, setQuotes] = useState<MarketQuote[]>(MARKET_SEED);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getMarkets();
        if (!cancelled) {
          setQuotes(data.quotes);
          setLive(data.live);
        }
      } catch {
        /* keep seed */
      }
    }
    void load();
    const id = window.setInterval(() => void load(), 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const tape = [...quotes, ...quotes];

  return (
    <div className="border-b border-paper/10 bg-ink text-paper">
      <div className="ticker mx-auto flex max-w-7xl items-center gap-4 px-4 py-1.5 sm:px-6">
        <span className="kicker shrink-0 text-xs text-silver">{live ? "Mercados" : "Mercados · cierre"}</span>
        <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track">
            {tape.map((q, i) => (
              <QuoteChip key={`${q.symbol}-${i}`} q={q} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
