import type { MarketsHealth, MarketsSnapshot } from "./types";
import type { ValidationAlert } from "./validate";

export type StoredHealth = MarketsHealth & { alerts: ValidationAlert[] };

let snapshot: MarketsSnapshot | null = null;
let health: StoredHealth | null = null;

export function writeSnapshot(next: MarketsSnapshot) {
  snapshot = next;
}

export function readSnapshot() {
  return snapshot;
}

export function writeHealth(next: StoredHealth) {
  health = next;
}

export function readHealth() {
  return health;
}
