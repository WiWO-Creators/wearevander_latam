import { cn } from "@/lib/utils";
import type { Under40Profile } from "@/lib/under40";

export function Under40Shot({
  person,
  className,
  sizes = "portrait",
}: {
  person: Under40Profile;
  className?: string;
  sizes?: "portrait" | "hero";
}) {
  return (
    <span
      className={cn("u40-shot block overflow-hidden bg-ink", sizes === "hero" ? "aspect-[16/10] sm:aspect-[5/3]" : "aspect-[4/5]", className)}
      data-sector={person.sectorSlug}
    >
      <img src={person.image} alt={person.name} />
    </span>
  );
}

export function Under40Verify({ status }: { status: Under40Profile["verification"] }) {
  const label = {
    verificada: "Edad verificada",
    derivada: "Edad derivada",
    acotada: "Edad acotada",
    estimada: "Edad estimada",
    "no-verificada": "Edad no verificada",
  }[status];
  return <span className="kicker text-[10px] tracking-widest text-rust">{label}</span>;
}
