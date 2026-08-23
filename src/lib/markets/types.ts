import universeJson from "./universe.json";

export type InstrumentType = "index" | "fx";
export type InstrumentStatus = "ok" | "stale" | "unavailable" | "rejected_validation";
export type SessionState = "open" | "closed" | "pre_open" | "holiday" | "weekend";
export type MarketsMode = "native" | "widget";

export type UniverseInstrument = {
  id: string;
  label: string;
  full_name: string;
  type: InstrumentType;
  region: "latam" | "fx" | "us";
  currency: string;
  exchange?: string;
  country?: string;
  source: string;
  twelve?: string;
  tv?: string | null;
  range: [number, number];
  session: string;
  order: number;
  daily_fix?: boolean;
};

export type SessionDef = {
  tz: string;
  open: string;
  close: string;
  holidays: string[];
};

export type Universe = {
  revised: string;
  instruments: UniverseInstrument[];
  sessions: Record<string, SessionDef>;
};

export const UNIVERSE = universeJson as unknown as Universe;

export type RawQuote = {
  id: string;
  value: number;
  change_pct: number;
  change_abs?: number;
  as_of: string;
  source: string;
  currency?: string;
};

export type PublishedInstrument = {
  id: string;
  label: string;
  full_name: string;
  type: InstrumentType;
  status: InstrumentStatus;
  value: number | null;
  change_pct: number | null;
  change_abs: number | null;
  currency: string;
  as_of: string | null;
  as_of_label: string | null;
  source: string;
  reason?: string;
};

export type SourceHealth = {
  id: string;
  status: "ok" | "disabled" | "error" | "empty";
  age_seconds: number | null;
  last_success: string | null;
  reason?: string;
  latency_ms?: number;
  received?: number;
  rejected?: number;
};

export type MarketsSnapshot = {
  generated_at: string;
  provider: string;
  mode: MarketsMode;
  session_state: SessionState;
  session_label: string;
  attribution: string;
  instruments: PublishedInstrument[];
};

export type MarketsHealth = {
  ok: boolean;
  generated_at: string;
  mode: MarketsMode;
  session_state: SessionState;
  sources: SourceHealth[];
  instruments: { id: string; status: InstrumentStatus; reason?: string; as_of: string | null }[];
};
