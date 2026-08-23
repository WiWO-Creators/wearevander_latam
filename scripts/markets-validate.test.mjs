import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const universe = JSON.parse(readFileSync(new URL("../src/lib/markets/universe.json", import.meta.url), "utf8"));

const WARN = 8;
const REJECT = 15;

function validate(spec, raw, now = new Date("2026-08-22T20:00:00Z")) {
  const alerts = [];
  if (!Number.isFinite(raw.value) || !Number.isFinite(raw.change_pct)) {
    return { status: "rejected_validation", reason: "missing_value", alerts };
  }
  if (!raw.as_of) return { status: "rejected_validation", reason: "missing_timestamp", alerts };
  const asOf = new Date(raw.as_of);
  if (Number.isNaN(asOf.getTime())) return { status: "rejected_validation", reason: "bad_timestamp", alerts };
  if (asOf.getTime() - now.getTime() > 5 * 60 * 1000) return { status: "rejected_validation", reason: "timestamp_in_future", alerts };
  if (now.getTime() - asOf.getTime() > 96 * 3600 * 1000) return { status: "rejected_validation", reason: "timestamp_older_than_96h", alerts };
  const [lo, hi] = spec.range;
  if (raw.value < lo || raw.value > hi) {
    alerts.push("out_of_range");
    return { status: "rejected_validation", reason: "out_of_range", alerts };
  }
  const abs = Math.abs(raw.change_pct);
  if (abs > REJECT) {
    alerts.push("change_pct_extreme");
    return { status: "rejected_validation", reason: "change_pct_extreme", alerts };
  }
  if (abs > WARN) alerts.push("warn");
  if (raw.change_abs != null && raw.value - raw.change_abs !== 0) {
    const implied = (raw.value / (raw.value - raw.change_abs) - 1) * 100;
    if (Math.abs(implied - raw.change_pct) > 0.05) {
      return { status: "rejected_validation", reason: "incoherent_change", alerts };
    }
  }
  return { status: "ok", value: raw.value, change_pct: raw.change_pct, alerts };
}

const colcap = universe.instruments.find((i) => i.id === "colcap");
const ibov = universe.instruments.find((i) => i.id === "ibov");

test("COLCAP 24186 is rejected as out of range (ETF trap)", () => {
  const r = validate(colcap, {
    value: 24186,
    change_pct: 0.23,
    as_of: "2026-08-21T20:00:00Z",
  });
  assert.equal(r.status, "rejected_validation");
  assert.equal(r.reason, "out_of_range");
});

test("COLCAP 2459 is accepted", () => {
  const r = validate(colcap, {
    value: 2459,
    change_pct: 0.4,
    as_of: "2026-08-21T20:00:00Z",
  });
  assert.equal(r.status, "ok");
  assert.equal(r.value, 2459);
});

test("double-digit index move is rejected", () => {
  const r = validate(ibov, {
    value: 171000,
    change_pct: 16.2,
    as_of: "2026-08-21T20:00:00Z",
  });
  assert.equal(r.status, "rejected_validation");
  assert.equal(r.reason, "change_pct_extreme");
});

test("8-15 percent publishes with warning", () => {
  const r = validate(ibov, {
    value: 171000,
    change_pct: 9.1,
    as_of: "2026-08-21T20:00:00Z",
  });
  assert.equal(r.status, "ok");
  assert.ok(r.alerts.includes("warn"));
});

test("missing timestamp is rejected", () => {
  const r = validate(ibov, { value: 171000, change_pct: 1.2, as_of: "" });
  assert.equal(r.reason, "missing_timestamp");
});

test("quote older than 96h is rejected", () => {
  const r = validate(ibov, {
    value: 171000,
    change_pct: 1.2,
    as_of: "2026-08-10T20:00:00Z",
  });
  assert.equal(r.reason, "timestamp_older_than_96h");
});

test("incoherent change_abs vs change_pct is rejected", () => {
  const r = validate(ibov, {
    value: 171000,
    change_pct: 1.85,
    change_abs: 50,
    as_of: "2026-08-21T20:00:00Z",
  });
  assert.equal(r.reason, "incoherent_change");
});

test("universe has no LIMA label and Peru is S&P/BVL Perú General", () => {
  const labels = universe.instruments.map((i) => i.label);
  assert.equal(labels.includes("LIMA"), false);
  const pe = universe.instruments.find((i) => i.id === "bvlpe");
  assert.equal(pe.full_name, "S&P/BVL Perú General");
});

test("no market values live in universe config", () => {
  for (const i of universe.instruments) {
    assert.equal("value" in i, false);
    assert.equal("change_pct" in i, false);
  }
});
