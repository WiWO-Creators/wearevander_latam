import { createServerFn } from "@tanstack/react-start";

export type MarketQuote = {
  symbol: string;
  label: string;
  region: "us" | "latam" | "fx";
  price: number;
  prev: number;
  change: number;
  changePct: number;
  currency: string;
};

const UNIVERSE: { yahoo: string; label: string; region: MarketQuote["region"] }[] = [
  { yahoo: "^MXX", label: "IPC MX", region: "latam" },
  { yahoo: "^BVSP", label: "BOVESPA", region: "latam" },
  { yahoo: "^IPSA", label: "IPSA", region: "latam" },
  { yahoo: "ICOLCAP.CL", label: "COLCAP", region: "latam" },
  { yahoo: "^SPBLPGPT", label: "LIMA", region: "latam" },
  { yahoo: "^MERV", label: "MERVAL", region: "latam" },
  { yahoo: "MXN=X", label: "USD/MXN", region: "fx" },
  { yahoo: "BRL=X", label: "USD/BRL", region: "fx" },
  { yahoo: "CLP=X", label: "USD/CLP", region: "fx" },
  { yahoo: "COP=X", label: "USD/COP", region: "fx" },
  { yahoo: "ARS=X", label: "USD/ARS", region: "fx" },
  { yahoo: "PEN=X", label: "USD/PEN", region: "fx" },
  { yahoo: "^IXIC", label: "NASDAQ", region: "us" },
  { yahoo: "^GSPC", label: "S&P 500", region: "us" },
  { yahoo: "^DJI", label: "DOW", region: "us" },
];

export const MARKET_SEED: MarketQuote[] = [
  { symbol: "^MXX", label: "IPC MX", region: "latam", price: 65729.18, prev: 64254.98, change: 1474.2, changePct: 2.29, currency: "MXN" },
  { symbol: "^BVSP", label: "BOVESPA", region: "latam", price: 171031.73, prev: 166934, change: 4097.73, changePct: 2.45, currency: "BRL" },
  { symbol: "^IPSA", label: "IPSA", region: "latam", price: 10887.72, prev: 10947.4, change: -59.68, changePct: -0.55, currency: "CLP" },
  { symbol: "ICOLCAP.CL", label: "COLCAP", region: "latam", price: 24185.5, prev: 24130, change: 55.5, changePct: 0.23, currency: "COP" },
  { symbol: "^SPBLPGPT", label: "LIMA", region: "latam", price: 19766.72, prev: 19694.09, change: 72.63, changePct: 0.37, currency: "PEN" },
  { symbol: "^MERV", label: "MERVAL", region: "latam", price: 2913183.5, prev: 2947349, change: -34165.5, changePct: -1.16, currency: "ARS" },
  { symbol: "MXN=X", label: "USD/MXN", region: "fx", price: 16.895, prev: 17.0191, change: -0.1241, changePct: -0.73, currency: "MXN" },
  { symbol: "BRL=X", label: "USD/BRL", region: "fx", price: 5.1366, prev: 5.2217, change: -0.0851, changePct: -1.63, currency: "BRL" },
  { symbol: "CLP=X", label: "USD/CLP", region: "fx", price: 914.28, prev: 913.1, change: 1.18, changePct: 0.13, currency: "CLP" },
  { symbol: "COP=X", label: "USD/COP", region: "fx", price: 3038.2, prev: 3130.05, change: -91.85, changePct: -2.93, currency: "COP" },
  { symbol: "ARS=X", label: "USD/ARS", region: "fx", price: 1499, prev: 1489.6, change: 9.4, changePct: 0.63, currency: "ARS" },
  { symbol: "PEN=X", label: "USD/PEN", region: "fx", price: 3.352, prev: 3.2997, change: 0.0523, changePct: 1.59, currency: "PEN" },
  { symbol: "^IXIC", label: "NASDAQ", region: "us", price: 26180.46, prev: 26729.16, change: -548.7, changePct: -2.05, currency: "USD" },
  { symbol: "^GSPC", label: "S&P 500", region: "us", price: 7674.37, prev: 7785.76, change: -111.39, changePct: -1.43, currency: "USD" },
  { symbol: "^DJI", label: "DOW", region: "us", price: 53277, prev: 53732.41, change: -455.41, changePct: -0.85, currency: "USD" },
];

let cache: { at: number; quotes: MarketQuote[]; live: boolean } | null = null;
const TTL = 60_000;

async function fetchOne(item: (typeof UNIVERSE)[number]): Promise<MarketQuote | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.yahoo)}?interval=1d&range=5d`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 WeAreVander/1.0" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      chart?: { result?: { meta?: Record<string, number | string | null> }[] };
    };
    const meta = data.chart?.result?.[0]?.meta;
    if (!meta) return null;
    const price = Number(meta.regularMarketPrice);
    const prev = Number(meta.chartPreviousClose ?? meta.previousClose);
    if (!Number.isFinite(price) || !Number.isFinite(prev) || prev === 0) return null;
    const change = price - prev;
    return {
      symbol: item.yahoo,
      label: item.label,
      region: item.region,
      price,
      prev,
      change,
      changePct: (change / prev) * 100,
      currency: String(meta.currency ?? ""),
    };
  } catch {
    return null;
  }
}

export const getMarkets = createServerFn({ method: "GET" }).handler(async () => {
  try {
    if (cache && Date.now() - cache.at < TTL) {
      return { quotes: cache.quotes, live: cache.live, asOf: cache.at };
    }
    const settled = await Promise.allSettled(UNIVERSE.map(fetchOne));
    const quotes = settled
      .map((r, i) => (r.status === "fulfilled" && r.value ? r.value : MARKET_SEED[i]))
      .filter((q): q is MarketQuote => q != null);
    const live = settled.some((r) => r.status === "fulfilled" && r.value != null);
    cache = { at: Date.now(), quotes, live };
    return { quotes, live, asOf: cache.at };
  } catch {
    return { quotes: MARKET_SEED, live: false, asOf: Date.now() };
  }
});
