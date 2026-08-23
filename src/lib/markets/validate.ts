import type { PublishedInstrument, RawQuote, UniverseInstrument } from "./types";
import { formatAsOfLabel } from "./session";

const WARN_PCT = 8;
const REJECT_PCT = 15;
const MAX_AGE_MS = 96 * 60 * 60 * 1000;
const COHERENCE_TOL = 0.05;

export type ValidationAlert = {
  level: "warn" | "reject";
  id: string;
  reason: string;
};

export function validateQuote(
  spec: UniverseInstrument,
  raw: RawQuote,
  now = new Date(),
): { instrument: PublishedInstrument; alerts: ValidationAlert[] } {
  const alerts: ValidationAlert[] = [];
  const fail = (reason: string, extra?: ValidationAlert): { instrument: PublishedInstrument; alerts: ValidationAlert[] } => {
    if (extra) alerts.push(extra);
    return {
      alerts,
      instrument: unavailable(spec, "rejected_validation", reason),
    };
  };

  if (!Number.isFinite(raw.value) || !Number.isFinite(raw.change_pct)) {
    return fail("missing_value");
  }
  if (!raw.as_of) {
    return fail("missing_timestamp");
  }
  const asOf = new Date(raw.as_of);
  if (Number.isNaN(asOf.getTime())) {
    return fail("bad_timestamp");
  }
  if (asOf.getTime() - now.getTime() > 5 * 60 * 1000) {
    return fail("timestamp_in_future");
  }
  if (now.getTime() - asOf.getTime() > MAX_AGE_MS) {
    return fail("timestamp_older_than_96h");
  }

  const [lo, hi] = spec.range;
  if (raw.value < lo || raw.value > hi) {
    alerts.push({
      level: "reject",
      id: spec.id,
      reason: `range ${raw.value} outside [${lo}, ${hi}]`,
    });
    return fail("out_of_range", alerts[0]);
  }

  const absPct = Math.abs(raw.change_pct);
  if (absPct > REJECT_PCT) {
    alerts.push({ level: "reject", id: spec.id, reason: `change_pct ${raw.change_pct} > ${REJECT_PCT}` });
    return fail("change_pct_extreme", alerts[0]);
  }
  if (absPct > WARN_PCT) {
    alerts.push({ level: "warn", id: spec.id, reason: `change_pct ${raw.change_pct} > ${WARN_PCT}` });
  }

  if (raw.change_abs != null && Number.isFinite(raw.change_abs) && raw.value - raw.change_abs !== 0) {
    const implied = (raw.value / (raw.value - raw.change_abs) - 1) * 100;
    if (Number.isFinite(implied) && Math.abs(implied - raw.change_pct) > COHERENCE_TOL) {
      alerts.push({
        level: "reject",
        id: spec.id,
        reason: `coherence ${implied.toFixed(4)} vs ${raw.change_pct}`,
      });
      return fail("incoherent_change", alerts[alerts.length - 1]);
    }
  }

  const ageHours = (now.getTime() - asOf.getTime()) / 3_600_000;
  const stale = ageHours > 24;

  return {
    alerts,
    instrument: {
      id: spec.id,
      label: spec.label,
      full_name: spec.full_name,
      type: spec.type,
      status: stale ? "stale" : "ok",
      value: raw.value,
      change_pct: raw.change_pct,
      change_abs: raw.change_abs ?? null,
      currency: spec.currency,
      as_of: asOf.toISOString(),
      as_of_label: formatAsOfLabel(asOf, spec.session, spec.daily_fix),
      source: raw.source,
      reason: stale ? "older_than_24h" : alerts[0]?.reason,
    },
  };
}

export function unavailable(
  spec: UniverseInstrument,
  status: PublishedInstrument["status"] = "unavailable",
  reason?: string,
): PublishedInstrument {
  return {
    id: spec.id,
    label: spec.label,
    full_name: spec.full_name,
    type: spec.type,
    status,
    value: null,
    change_pct: null,
    change_abs: null,
    currency: spec.currency,
    as_of: null,
    as_of_label: null,
    source: spec.source,
    reason,
  };
}
