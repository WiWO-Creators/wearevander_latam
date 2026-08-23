import { UNIVERSE, type MarketsSnapshot, type PublishedInstrument, type RawQuote, type SourceHealth, type UniverseInstrument } from "./types";
import { unavailable, validateQuote, type ValidationAlert } from "./validate";
import { overallSession, sessionLabel } from "./session";
import { readSnapshot, writeSnapshot, writeHealth, type StoredHealth } from "./store";

const NATIVE_INDEX_MIN = 4;

function env(name: string) {
  return (typeof process !== "undefined" && process.env[name]) || "";
}

async function getJson(url: string, timeoutMs = 8000, headers: Record<string, string> = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "WeAreVander/markets", Accept: "application/json", ...headers },
    });
    if (!res.ok) throw new Error(`http_${res.status}`);
    return (await res.json()) as unknown;
  } finally {
    clearTimeout(t);
  }
}

function pairFromLastTwo(values: { value: number; as_of: string }[]): { value: number; change_pct: number; change_abs: number; as_of: string } | null {
  if (values.length < 2) return null;
  const [latest, prev] = values;
  if (!prev.value) return null;
  const change_abs = latest.value - prev.value;
  const change_pct = (change_abs / prev.value) * 100;
  return { value: latest.value, change_pct, change_abs, as_of: latest.as_of };
}

async function fetchPtax(): Promise<RawQuote | null> {
  const now = new Date();
  const end = `${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}-${now.getUTCFullYear()}`;
  const startDate = new Date(now.getTime() - 12 * 86400000);
  const start = `${String(startDate.getUTCMonth() + 1).padStart(2, "0")}-${String(startDate.getUTCDate()).padStart(2, "0")}-${startDate.getUTCFullYear()}`;
  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@d1,dataFinalCotacao=@d2)?@d1='${start}'&@d2='${end}'&$top=6&$orderby=dataHoraCotacao%20desc&$format=json`;
  const data = (await getJson(url)) as { value?: { cotacaoVenda: number; dataHoraCotacao: string }[] };
  const rows = (data.value ?? []).map((r) => ({
    value: Number(r.cotacaoVenda),
    as_of: r.dataHoraCotacao.replace(" ", "T") + (r.dataHoraCotacao.includes("Z") ? "" : "-03:00"),
  }));
  const pair = pairFromLastTwo(rows);
  if (!pair) return null;
  return { id: "usdbrl", source: "bcb_ptax", ...pair };
}

async function fetchTrm(): Promise<RawQuote | null> {
  const data = (await getJson("https://www.datos.gov.co/resource/32sa-8pi3.json?$order=vigenciadesde%20DESC&$limit=2")) as {
    valor: string;
    vigenciadesde: string;
  }[];
  const rows = (data ?? []).map((r) => ({ value: Number(r.valor), as_of: r.vigenciadesde }));
  const pair = pairFromLastTwo(rows);
  if (!pair) return null;
  return { id: "usdcop", source: "trm_co", ...pair };
}

async function fetchBcra(): Promise<RawQuote | null> {
  const data = (await getJson("https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD")) as {
    results?: { fecha: string; detalle?: { tipoCotizacion: number }[] }[];
  };
  const latest = data.results?.[0];
  const value = latest?.detalle?.[0]?.tipoCotizacion;
  if (!latest?.fecha || !Number.isFinite(value)) return null;
  const prevUrl = `https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD?fecha=${latest.fecha}`;
  // Same provider: fetch last 5 days of series from the list endpoint with fechaHasta
  const from = new Date(`${latest.fecha}T00:00:00-03:00`);
  from.setDate(from.getDate() - 7);
  const fromStr = from.toISOString().slice(0, 10);
  let prev: number | null = null;
  try {
    const hist = (await getJson(
      `https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones?fechaDesde=${fromStr}&fechaHasta=${latest.fecha}&limit=10`,
    )) as { results?: { fecha: string; detalle?: { codigoMoneda: string; tipoCotizacion: number }[] }[] };
    const usdRows = (hist.results ?? [])
      .map((r) => ({ fecha: r.fecha, value: r.detalle?.find((d) => d.codigoMoneda === "USD")?.tipoCotizacion }))
      .filter((r) => r.value != null)
      .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
    if (usdRows.length >= 2) prev = Number(usdRows[1].value);
  } catch {
    void prevUrl;
  }
  if (prev == null || prev === 0) return null;
  const change_abs = Number(value) - prev;
  return {
    id: "usdars",
    source: "bcra",
    value: Number(value),
    change_abs,
    change_pct: (change_abs / prev) * 100,
    as_of: `${latest.fecha}T17:00:00-03:00`,
  };
}

async function fetchBanxico(): Promise<RawQuote | null> {
  const token = env("BANXICO_TOKEN");
  if (!token) return null;
  const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=${encodeURIComponent(token)}`;
  const data = (await getJson(url)) as {
    bmx?: { series?: { datos?: { fecha: string; dato: string }[] }[] };
  };
  const rows = (data.bmx?.series?.[0]?.datos ?? []).map((d) => ({
    value: Number(String(d.dato).replace(",", "")),
    as_of: `${d.fecha.split("/").reverse().join("-")}T12:00:00-06:00`,
  }));
  // oportuno is last point; request a short window
  const end = new Date();
  const start = new Date(end.getTime() - 10 * 86400000);
  const fmt = (d: Date) =>
    `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;
  const ranged = (await getJson(
    `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/${fmt(start)}/${fmt(end)}?token=${encodeURIComponent(token)}`,
  )) as { bmx?: { series?: { datos?: { fecha: string; dato: string }[] }[] } };
  const hist = (ranged.bmx?.series?.[0]?.datos ?? [])
    .map((d) => {
      const [dd, mm, yy] = d.fecha.split("/");
      return { value: Number(String(d.dato).replace(",", "")), as_of: `${yy}-${mm}-${dd}T12:00:00-06:00` };
    })
    .filter((r) => Number.isFinite(r.value))
    .reverse();
  const pair = pairFromLastTwo(hist.length ? hist : rows);
  if (!pair) return null;
  return { id: "usdmxn", source: "banxico", ...pair };
}

async function fetchBcch(): Promise<RawQuote | null> {
  const user = env("BCCH_USER");
  const pass = env("BCCH_PASS");
  if (!user || !pass) return null;
  const end = new Date();
  const start = new Date(end.getTime() - 12 * 86400000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const url = `https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}&firstdate=${iso(start)}&lastdate=${iso(end)}&timeseries=F073.TCO.PRE.Z.D&function=GetSeries`;
  const data = (await getJson(url)) as { Series?: { Obs?: { indexDateString: string; value: string }[] } };
  const rows = (data.Series?.Obs ?? [])
    .map((o) => {
      const [dd, mm, yy] = o.indexDateString.split("-");
      return { value: Number(o.value), as_of: `${yy}-${mm}-${dd}T13:00:00-04:00` };
    })
    .filter((r) => Number.isFinite(r.value))
    .reverse();
  const pair = pairFromLastTwo(rows);
  if (!pair) return null;
  return { id: "usdclp", source: "bcch", ...pair };
}

async function fetchBcrp(): Promise<RawQuote | null> {
  const end = new Date();
  const start = new Date(end.getTime() - 14 * 86400000);
  const fmt = (d: Date) =>
    `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}`;
  const url = `https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04637PD/json/${fmt(start)}/${fmt(end)}`;
  const data = (await getJson(url)) as { periods?: { name: string; values: string[] }[] };
  const months: Record<string, string> = {
    Ene: "01",
    Feb: "02",
    Mar: "03",
    Abr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Ago: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dic: "12",
  };
  const rows = (data.periods ?? [])
    .map((p) => {
      const m = p.name.match(/^(\d{2})\.([A-Za-z]{3})\.(\d{2})$/);
      if (!m) return null;
      const value = Number(p.values[0]);
      if (!Number.isFinite(value)) return null;
      const yy = Number(m[3]) > 50 ? `19${m[3]}` : `20${m[3]}`;
      const mm = months[m[2]];
      if (!mm) return null;
      return { value, as_of: `${yy}-${mm}-${m[1]}T13:00:00-05:00` };
    })
    .filter((r): r is { value: number; as_of: string } => r != null)
    .reverse();
  const pair = pairFromLastTwo(rows);
  if (!pair) return null;
  return { id: "usdpen", source: "bcrp", ...pair };
}

async function fetchTwelve(spec: UniverseInstrument, key: string): Promise<RawQuote | null> {
  if (!spec.twelve) return null;
  const url = `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(spec.twelve)}&apikey=${encodeURIComponent(key)}`;
  const data = (await getJson(url)) as {
    close?: string;
    percent_change?: string;
    change?: string;
    datetime?: string;
    timestamp?: number;
    status?: string;
    message?: string;
  };
  if (data.status === "error" || data.close == null || data.percent_change == null) return null;
  const value = Number(data.close);
  const change_pct = Number(data.percent_change);
  const change_abs = data.change != null ? Number(data.change) : undefined;
  const as_of = data.timestamp
    ? new Date(data.timestamp * 1000).toISOString()
    : data.datetime
      ? new Date(data.datetime).toISOString()
      : "";
  if (!as_of) return null;
  return { id: spec.id, source: "twelvedata", value, change_pct, change_abs, as_of };
}

type SourceRun = { quotes: RawQuote[]; health: SourceHealth };

async function runSource(id: string, fn: () => Promise<RawQuote | null>): Promise<SourceRun> {
  const t0 = Date.now();
  try {
    const q = await fn();
    if (!q) {
      return {
        quotes: [],
        health: { id, status: "empty", age_seconds: null, last_success: null, reason: "no_quote", latency_ms: Date.now() - t0 },
      };
    }
    return {
      quotes: [q],
      health: { id, status: "ok", age_seconds: 0, last_success: new Date().toISOString(), latency_ms: Date.now() - t0, received: 1 },
    };
  } catch (e) {
    return {
      quotes: [],
      health: {
        id,
        status: "error",
        age_seconds: null,
        last_success: null,
        reason: e instanceof Error ? e.message : "error",
        latency_ms: Date.now() - t0,
      },
    };
  }
}

export async function ingestMarkets(now = new Date()): Promise<MarketsSnapshot> {
  const key = env("MARKETS_API_KEY");
  const sources: SourceHealth[] = [];
  const quotes: RawQuote[] = [];
  const alerts: ValidationAlert[] = [];

  const fxJobs: Promise<SourceRun>[] = [
    runSource("bcb_ptax", fetchPtax),
    runSource("trm_co", fetchTrm),
    runSource("bcra", fetchBcra),
  ];
  if (env("BANXICO_TOKEN")) fxJobs.push(runSource("banxico", fetchBanxico));
  else sources.push({ id: "banxico", status: "disabled", age_seconds: null, last_success: null, reason: "BANXICO_TOKEN missing" });
  if (env("BCCH_USER") && env("BCCH_PASS")) fxJobs.push(runSource("bcch", fetchBcch));
  else sources.push({ id: "bcch", status: "disabled", age_seconds: null, last_success: null, reason: "BCCH credentials missing" });
  fxJobs.push(runSource("bcrp", fetchBcrp));

  const fxResults = await Promise.all(fxJobs);
  for (const r of fxResults) {
    sources.push(r.health);
    quotes.push(...r.quotes);
  }

  if (key) {
    const indexSpecs = UNIVERSE.instruments.filter((i) => i.source === "twelvedata");
    const t0 = Date.now();
    const settled = await Promise.allSettled(indexSpecs.map((s) => fetchTwelve(s, key)));
    let received = 0;
    for (const s of settled) {
      if (s.status === "fulfilled" && s.value) {
        quotes.push(s.value);
        received += 1;
      }
    }
    sources.push({
      id: "twelvedata",
      status: received ? "ok" : "empty",
      age_seconds: 0,
      last_success: received ? now.toISOString() : null,
      latency_ms: Date.now() - t0,
      received,
    });
  } else {
    sources.push({
      id: "twelvedata",
      status: "disabled",
      age_seconds: null,
      last_success: null,
      reason: "MARKETS_API_KEY missing",
    });
  }

  const byId = new Map(quotes.map((q) => [q.id, q]));
  const instruments: PublishedInstrument[] = UNIVERSE.instruments
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((spec) => {
      const raw = byId.get(spec.id);
      if (!raw) {
        const src = sources.find((s) => s.id === spec.source);
        const reason = src?.reason ?? (src?.status === "disabled" ? "source_disabled" : "not_in_feed");
        return unavailable(spec, "unavailable", reason);
      }
      const result = validateQuote(spec, raw, now);
      alerts.push(...result.alerts);
      return result.instrument;
    });

  const rejected = alerts.filter((a) => a.level === "reject");
  for (const s of sources) {
    const n = rejected.filter((a) => instruments.find((i) => i.id === a.id)?.source === s.id).length;
    if (n) s.rejected = n;
  }

  const latamIndexIds = new Set(
    UNIVERSE.instruments.filter((i) => i.type === "index" && i.region === "latam").map((i) => i.id),
  );
  const okIndices = instruments.filter((i) => latamIndexIds.has(i.id) && i.status === "ok").length;
  const native = Boolean(key) && okIndices >= NATIVE_INDEX_MIN;
  const session_state = overallSession(now);
  const snapshot: MarketsSnapshot = {
    generated_at: now.toISOString(),
    provider: native ? "twelvedata" : "tradingview",
    mode: native ? "native" : "widget",
    session_state,
    session_label: sessionLabel(session_state, now),
    attribution: native ? "Datos de índices: Twelve Data. Divisas: bancos centrales." : "Datos de mercado: TradingView",
    instruments,
  };

  writeSnapshot(snapshot);
  const health: StoredHealth = {
    ok: native ? okIndices >= NATIVE_INDEX_MIN : true,
    generated_at: snapshot.generated_at,
    mode: snapshot.mode,
    session_state,
    sources,
    instruments: instruments.map((i) => ({ id: i.id, status: i.status, reason: i.reason, as_of: i.as_of })),
    alerts,
  };
  writeHealth(health);

  if (env("MARKETS_ALERT_WEBHOOK") && rejected.length) {
    void fetch(env("MARKETS_ALERT_WEBHOOK"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "wearevander-markets", rejected }),
    }).catch(() => undefined);
  }

  return snapshot;
}

export function cachedOrEmpty(): MarketsSnapshot {
  const cached = readSnapshot();
  if (cached) return cached;
  const now = new Date();
  const session_state = overallSession(now);
  return {
    generated_at: now.toISOString(),
    provider: "tradingview",
    mode: "widget",
    session_state,
    session_label: sessionLabel(session_state, now),
    attribution: "Datos de mercado: TradingView",
    instruments: UNIVERSE.instruments.map((spec) => unavailable(spec, "unavailable", "cache_empty")),
  };
}
