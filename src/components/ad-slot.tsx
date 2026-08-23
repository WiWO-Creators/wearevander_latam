import { ADSTERRA, type AdSize } from "@/lib/ads";
import { AdsterraBanner, AdsterraLeaderboard, AdsterraNative } from "@/components/adsterra";
import { cn } from "@/lib/utils";

type CreativeId = "vander20" | "boletin" | "briefing" | "anuncia";

function LiveUnit({ size }: { size: AdSize }) {
  if (size === "leaderboard") return <AdsterraLeaderboard />;
  if (size === "billboard") return <AdsterraNative />;
  return <AdsterraBanner spec={ADSTERRA.mpu} />;
}

export function AdSlot({
  size,
  className,
}: {
  size: AdSize;
  creative?: CreativeId;
  className?: string;
}) {
  const mpu = size === "mpu" || size === "inread";
  return (
    <aside aria-label="Publicidad externa" className={cn(size === "inread" && "my-8", className)}>
      <p className="kicker mb-2 text-center text-xs text-muted">Publicidad externa</p>
      <div
        className="ad-unit mx-auto flex items-center justify-center overflow-hidden bg-paper"
        data-ad-network="adsterra"
        data-ad-size={size}
        style={
          mpu
            ? { width: 300, maxWidth: "100%", minHeight: 250 }
            : size === "leaderboard"
              ? { width: "100%", maxWidth: 728, minHeight: 50 }
              : { width: "100%", minHeight: 250 }
        }
      >
        <LiveUnit size={size} />
      </div>
    </aside>
  );
}
