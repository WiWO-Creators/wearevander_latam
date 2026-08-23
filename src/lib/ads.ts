/**
 * Inventario de We Are Vander.
 *
 * HilltopAds: meta de verificación en `__root.tsx`. Zones vacíos = no se sirve.
 * Adsterra: keys vivas. Los banners 728/320/300 comparten `atOptions` global —
 * cada uno se monta en un iframe con srcDoc (`AdsterraBanner`) para no pisarse.
 */

export const HILLTOP_VERIFY = "54aa2f4cf4f47f587705966a8169135a213fe0c6";
export const HILLTOP_SERVE = "https://hilltopads.net/serve";

export type AdSize = "leaderboard" | "billboard" | "mpu" | "inread";

export const AD_FRAME: Record<
  AdSize,
  { w: number; h: number; mobileW: number; mobileH: number; label: string }
> = {
  leaderboard: { w: 728, h: 90, mobileW: 320, mobileH: 50, label: "728×90 / 320×50" },
  billboard: { w: 970, h: 250, mobileW: 300, mobileH: 250, label: "Native" },
  mpu: { w: 300, h: 250, mobileW: 300, mobileH: 250, label: "300×250" },
  inread: { w: 300, h: 250, mobileW: 300, mobileH: 250, label: "300×250 in-read" },
};

export const HILLTOP_ZONES: Record<AdSize | "popunder", string> = {
  leaderboard: import.meta.env.VITE_HTA_ZONE_LEADERBOARD ?? "",
  billboard: import.meta.env.VITE_HTA_ZONE_BILLBOARD ?? "",
  mpu: import.meta.env.VITE_HTA_ZONE_MPU ?? "",
  inread: import.meta.env.VITE_HTA_ZONE_INREAD ?? "",
  popunder: import.meta.env.VITE_HTA_ZONE_POPUNDER ?? "",
};

export function hilltopZone(size: AdSize) {
  return HILLTOP_ZONES[size]?.trim() ?? "";
}

export type AdsterraBannerSpec = {
  key: string;
  width: number;
  height: number;
  zone: string;
};

/** Banners Adsterra — zone IDs y keys del dashboard. */
export const ADSTERRA = {
  native: {
    containerId: "container-f40b88fbdb48d41673c71ac79c7112c0",
    src: "https://pl30977123.profitableratecpmnetwork.com/f40b88fbdb48d41673c71ac79c7112c0/invoke.js",
  },
  leaderboard: {
    key: "92068d9a547b2e56b1b15abc522342ba",
    width: 728,
    height: 90,
    zone: "30876625",
  } satisfies AdsterraBannerSpec,
  mobile: {
    key: "58af08e691e0d1043801b2747f8d81ea",
    width: 320,
    height: 50,
    zone: "30876626",
  } satisfies AdsterraBannerSpec,
  mpu: {
    key: "a12bcd3ec80a16a88b8160c6734417a4",
    width: 300,
    height: 250,
    zone: "30876627",
  } satisfies AdsterraBannerSpec,
} as const;

export const ADSTERRA_INVOKE = "https://www.highrevenueformat.com";
