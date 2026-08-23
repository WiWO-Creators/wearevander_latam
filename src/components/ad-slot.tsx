import { useEffect, useId, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { HOUSE } from "@/lib/content";
import { AD_FRAME, hilltopZone, HILLTOP_SERVE, type AdSize } from "@/lib/ads";
import { cn } from "@/lib/utils";

type CreativeId = "vander20" | "boletin" | "briefing" | "anuncia";

const CREATIVES: Record<
  CreativeId,
  { kicker: string; title: string; dek: string; cta: string; to: "/list" | "/briefing" | "/anuncia" | "/about"; hash?: string }
> = {
  vander20: {
    kicker: "Vander 20",
    title: "Las 20 que mandan el P&L",
    dek: "El ranking Latam de Team Vander. No las más ruidosas: las que tienen código de casa.",
    cta: "Ver la lista",
    to: "/list",
  },
  boletin: {
    kicker: "Boletín",
    title: "Un mail. Cero feed.",
    dek: "La redacción resume la semana: CDMX, SP, BA, BOG, SCL, LIM.",
    cta: "Suscribirse",
    to: "/about",
    hash: "#boletin",
  },
  briefing: {
    kicker: "Briefing",
    title: "Team Vander fila por ti",
    dek: "Nombra una compañía. Team Vander arma antetítulo, titular y argumento.",
    cta: "Pedir briefing",
    to: "/briefing",
  },
  anuncia: {
    kicker: "Publicidad",
    title: "Anuncia en Vander",
    dek: `Inventario de ${HOUSE.publisher} para marcas que se toman Latam en serio.`,
    cta: "Media kit",
    to: "/anuncia",
  },
};

function HilltopMount({ size }: { size: AdSize }) {
  const zone = hilltopZone(size);
  const frame = AD_FRAME[size];
  const slotId = useId().replace(/:/g, "");
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zone || !host.current) return;
    const el = host.current;
    el.replaceChildren();
    const s = document.createElement("script");
    s.async = true;
    s.dataset.cfasync = "false";
    s.src = `${HILLTOP_SERVE}/${zone}`;
    el.appendChild(s);
    return () => {
      el.replaceChildren();
    };
  }, [zone]);

  if (!zone) return null;

  return (
    <div
      ref={host}
      id={`hta-${size}-${slotId}`}
      data-hilltop-zone={zone}
      data-ad-size={`${frame.w}x${frame.h}`}
      className="flex min-h-full w-full items-center justify-center"
    />
  );
}

function HouseFill({ size, creative }: { size: AdSize; creative: CreativeId }) {
  const ad = CREATIVES[creative];
  const compact = size === "leaderboard" || size === "mpu";
  const inner = (
    <div className={cn("flex h-full w-full flex-col justify-center px-5 py-4", size === "mpu" && "justify-between")}>
      <p className="kicker text-xs text-rust">{ad.kicker}</p>
      <p className={cn("headline mt-1", compact ? "text-2xl" : "text-3xl")}>{ad.title}</p>
      <p className="mt-1 line-clamp-2 font-body text-sm leading-snug text-ink-soft">{ad.dek}</p>
      <span className="kicker mt-3 text-xs text-rust">{ad.cta}</span>
    </div>
  );
  if (ad.hash) {
    return (
      <a href={ad.hash} className="block h-full w-full">
        {inner}
      </a>
    );
  }
  return (
    <Link to={ad.to} className="block h-full w-full">
      {inner}
    </Link>
  );
}

export function AdSlot({
  size,
  creative = "anuncia",
  className,
}: {
  size: AdSize;
  creative?: CreativeId;
  className?: string;
}) {
  const frame = AD_FRAME[size];
  const live = Boolean(hilltopZone(size));

  return (
    <aside aria-label="Publicidad" className={cn(size === "inread" && "my-8", className)}>
      <p className="kicker mb-2 text-center text-xs text-muted">Publicidad · {frame.label}</p>
      <div
        className={cn(
          "ad-unit mx-auto overflow-hidden border border-rule bg-paper-deep",
          size === "mpu" && "max-w-[300px]",
        )}
        data-ad-network="hilltopads"
        data-ad-size={size}
      >
        <div
          className="flex w-full items-stretch justify-center"
          style={{ minHeight: `min(${frame.h}px, 40vw)` }}
        >
          {live ? <HilltopMount size={size} /> : <HouseFill size={size} creative={creative} />}
        </div>
      </div>
    </aside>
  );
}
