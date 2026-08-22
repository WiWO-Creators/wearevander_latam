import { Link } from "@tanstack/react-router";
import { verifyOf } from "@/lib/verify";
import { getCompany } from "@/lib/vander-list";
import { getInnovative } from "@/lib/innovatives";
import { cn } from "@/lib/utils";

export function VerifiedStamp({
  slug,
  dark = false,
  compact = false,
}: {
  slug: string;
  dark?: boolean;
  compact?: boolean;
}) {
  const v = verifyOf(slug);
  if (!v) return null;
  return (
    <p
      className={cn(
        "font-kicker text-xs tracking-wider uppercase",
        dark ? "text-silver" : "text-muted",
        compact && "truncate",
      )}
    >
      Visitada {v.visited}
      {compact ? "" : ` · Mesa ${v.desk}`}
      {compact ? "" : ` · ${v.proof}`}
    </p>
  );
}

export function CrossList({ slug, dark = false }: { slug: string; dark?: boolean }) {
  const in20 = getCompany(slug);
  const in50 = getInnovative(slug);
  if (!in20 && !in50) return null;
  return (
    <p className={cn("kicker text-xs", dark ? "text-silver" : "text-muted")}>
      {in20 && (
        <Link to="/list/$slug" params={{ slug }} className="hover:text-signal">
          Vander 20 · {String(in20.rank).padStart(2, "0")}
        </Link>
      )}
      {in20 && in50 ? <span className="mx-2">·</span> : null}
      {in50 && (
        <Link to="/innovatives/$slug" params={{ slug }} className="hover:text-innov">
          50 Innovatives · {String(in50.rank).padStart(2, "0")}
        </Link>
      )}
    </p>
  );
}
