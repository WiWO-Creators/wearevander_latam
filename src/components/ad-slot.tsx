import { AD_FRAME, ADSTERRA, type AdSize } from "@/lib/ads";
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
  /** Reservado: relleno de casa si el fill se apaga. */
  creative?: CreativeId;
  className?: string;
}) {
  const frame = AD_FRAME[size];

  return (
    <aside aria-label="Publicidad" className={cn(size === "inread" && "my-8", className)}>
      <p className="kicker mb-2 text-center text-xs text-muted">Publicidad · {frame.label}</p>
      <div
        className={cn(
          "ad-unit mx-auto overflow-hidden border border-rule bg-paper-deep",
          (size === "mpu" || size === "inread") && "max-w-[300px]",
        )}
        data-ad-network="adsterra"
        data-ad-size={size}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center",
            size === "leaderboard" ? "min-h-[50px] sm:min-h-[90px]" : "min-h-[180px] sm:min-h-[250px]",
          )}
        >
          <LiveUnit size={size} />
        </div>
      </div>
    </aside>
  );
}
