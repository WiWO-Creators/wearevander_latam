import { Globe, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { under40Links, type Under40Profile } from "@/lib/under40";

export function Under40Shot({
  person,
  className,
  sizes = "portrait",
  showRank = false,
}: {
  person: Under40Profile;
  className?: string;
  sizes?: "portrait" | "hero";
  showRank?: boolean;
}) {
  return (
    <span
      className={cn(
        "u40-shot block overflow-hidden bg-ink",
        sizes === "hero" ? "aspect-[16/10] sm:aspect-[5/3]" : "aspect-[4/5]",
        className,
      )}
      data-sector={person.sectorSlug}
    >
      <img src={person.image} alt={person.name} />
      {showRank ? (
        <span className="u40-rank" aria-hidden>
          {String(person.rank).padStart(3, "0")}
        </span>
      ) : null}
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

export function Under40Links({
  person,
  tone = "ink",
}: {
  person: Under40Profile;
  tone?: "ink" | "paper";
}) {
  const links = under40Links(person);
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "inline-flex items-center gap-1.5 font-kicker text-[10px] uppercase tracking-wider hover:underline",
              tone === "paper" ? "text-paper/80 hover:text-paper" : "text-muted hover:text-ink",
            )}
          >
            {l.kind === "linkedin" ? (
              <Linkedin className="size-3.5" strokeWidth={1.6} />
            ) : (
              <Globe className="size-3.5" strokeWidth={1.6} />
            )}
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
