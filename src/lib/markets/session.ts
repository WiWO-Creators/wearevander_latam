import { UNIVERSE, type SessionState } from "./types";

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

function partsInTz(date: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });
  const bag: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== "literal") bag[p.type] = p.value;
  }
  const ymd = `${bag.year}-${bag.month}-${bag.day}`;
  const hm = `${bag.hour}:${bag.minute}`;
  const dow = new Date(`${ymd}T12:00:00Z`).getUTCDay();
  return { ymd, hm, dow, year: bag.year, month: bag.month, day: bag.day };
}

function hmToMin(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

export function sessionStateFor(sessionId: string, now = new Date()): SessionState {
  const def = UNIVERSE.sessions[sessionId];
  if (!def) return "closed";
  const p = partsInTz(now, def.tz);
  if (p.dow === 0 || p.dow === 6) return "weekend";
  if (def.holidays.includes(p.ymd)) return "holiday";
  const t = hmToMin(p.hm);
  const open = hmToMin(def.open);
  const close = hmToMin(def.close);
  if (t < open) return "pre_open";
  if (t >= open && t < close) return "open";
  return "closed";
}

export function overallSession(now = new Date()): SessionState {
  const equity = ["b3", "bmv", "byma", "bcs", "bvc", "bvl"];
  const states = equity.map((id) => sessionStateFor(id, now));
  if (states.includes("open")) return "open";
  if (states.every((s) => s === "weekend")) return "weekend";
  if (states.every((s) => s === "holiday" || s === "weekend")) return "holiday";
  if (states.includes("pre_open")) return "pre_open";
  return "closed";
}

export function formatAsOfLabel(asOf: Date, sessionId: string, dailyFix?: boolean) {
  const def = UNIVERSE.sessions[sessionId];
  const tz = def?.tz ?? "America/Santiago";
  const p = partsInTz(asOf, tz);
  const day = Number(p.day);
  const mon = MONTHS[Number(p.month) - 1];
  const weekday = WEEKDAYS[p.dow];
  if (dailyFix) {
    return `Referencia ${day} ${mon}`;
  }
  const offset = tzOffsetLabel(asOf, tz);
  return `${weekday} ${day} ${mon} · ${p.hm} ${offset}`;
}

export function sessionLabel(state: SessionState, now = new Date()) {
  const tz = "America/Santiago";
  const p = partsInTz(now, tz);
  const day = Number(p.day);
  const mon = MONTHS[Number(p.month) - 1];
  const weekday = WEEKDAYS[p.dow];
  const offset = tzOffsetLabel(now, tz);
  if (state === "open") return `En vivo · ${p.hm} ${offset}`;
  if (state === "weekend") {
    const friday = new Date(now);
    const dow = partsInTz(now, tz).dow;
    const back = dow === 0 ? 2 : dow === 6 ? 1 : 0;
    friday.setUTCDate(friday.getUTCDate() - back);
    const f = partsInTz(friday, tz);
    return `Último cierre · viernes ${Number(f.day)} ${MONTHS[Number(f.month) - 1]}`;
  }
  if (state === "holiday") return `Feriado · último cierre ${day} ${mon}`;
  if (state === "pre_open") return `Preapertura · ${p.hm} ${offset}`;
  return `Cierre · ${weekday} ${day} ${mon} · ${p.hm} ${offset}`;
}

function tzOffsetLabel(date: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" });
  const name = fmt.formatToParts(date).find((p) => p.type === "timeZoneName")?.value ?? "";
  return name.replace("GMT", "GMT").replace("UTC", "GMT");
}

export { partsInTz };
