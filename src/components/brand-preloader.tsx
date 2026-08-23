import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const MARKS = [
  { src: "/brand/v-rust.png", alt: "Vander" },
  { src: "/brand/v-signal.png", alt: "" },
  { src: "/brand/v-innov.png", alt: "" },
] as const;

export function BrandPreloader() {
  const [boot, setBoot] = useState(true);
  const pending = useRouterState({ select: (s) => s.status === "pending" });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setBoot(false), reduce ? 400 : 2100);
    return () => window.clearTimeout(t);
  }, []);

  const show = boot || pending;
  if (!show) return null;

  return (
    <div
      className={`v-loader-root ${boot ? "is-boot" : "is-nav"}`}
      role="status"
      aria-live="polite"
      aria-label={boot ? "Cargando We Are Vander" : "Cargando"}
    >
      <div className="v-loader">
        {MARKS.map((m) => (
          <img key={m.src} src={m.src} alt={m.alt} />
        ))}
      </div>
      {boot ? <p className="v-loader-credit">We Are Vander</p> : null}
    </div>
  );
}
