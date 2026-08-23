import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const MARKS = ["/brand/v-rust.png", "/brand/v-signal.png", "/brand/v-innov.png"] as const;
const BOOT_MS = 380;
const NAV_MS = 560;

export function BrandPreloader() {
  const [boot, setBoot] = useState(false);
  const [nav, setNav] = useState(false);
  const armed = useRef(false);
  const status = useRouterState({ select: (s) => s.status });

  useLayoutEffect(() => {
    setBoot(true);
    const t = window.setTimeout(() => setBoot(false), BOOT_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (status === "idle") armed.current = true;
    if (!armed.current || boot) {
      setNav(false);
      return;
    }
    if (status !== "pending") {
      setNav(false);
      return;
    }
    setNav(true);
    const t = window.setTimeout(() => setNav(false), NAV_MS);
    return () => window.clearTimeout(t);
  }, [status, boot]);

  if (!boot && !nav) return null;

  return (
    <div
      className={`v-loader-root ${boot ? "is-boot" : "is-nav"}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="v-loader">
        {MARKS.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}
