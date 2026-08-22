/**
 * HilltopAds — inventario de We Are Vander.
 *
 * 1. El meta de verificación vive en `src/routes/__root.tsx`.
 * 2. Cuando el dashboard de HilltopAds te dé los Zone ID, pégalos abajo.
 *    Con el ID vacío el slot reserva el tamaño IAB y muestra un relleno de casa.
 *    Con el ID, el loader inyecta el serve de HilltopAds en el mismo recuadro.
 */
export const HILLTOP_VERIFY = "54aa2f4cf4f47f587705966a8169135a213fe0c6";

export const HILLTOP_SERVE = "https://hilltopads.net/serve";

export type AdSize = "leaderboard" | "billboard" | "mpu" | "inread";

export const AD_FRAME: Record<
  AdSize,
  { w: number; h: number; mobileW: number; mobileH: number; label: string }
> = {
  leaderboard: { w: 728, h: 90, mobileW: 320, mobileH: 50, label: "728×90 / 320×50" },
  billboard: { w: 970, h: 250, mobileW: 300, mobileH: 250, label: "970×250 / 300×250" },
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
