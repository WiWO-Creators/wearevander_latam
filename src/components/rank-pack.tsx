import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { ListedCompany } from "@/lib/vander-list";
import type { Innovative } from "@/lib/innovatives";
import { VerifiedStamp } from "@/components/verified-stamp";
import { AdSlot } from "@/components/ad-slot";
import { cn } from "@/lib/utils";

export function RankStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-t border-paper/25 pt-3">
      <p className="headline text-3xl sm:text-4xl">{n}</p>
      <p className="mt-1 kicker text-xs text-silver">{label}</p>
    </div>
  );
}

export function CatChip({
  to,
  params,
  label,
  count,
  active,
  accent = "rust",
}: {
  to: "/list/sector/$sector" | "/list/ciudad/$city" | "/innovatives/sector/$sector" | "/innovatives/pais/$pais" | "/signals/tag/$tag" | "/contra/tag/$tag" | "/contra/autor/$autor" | "/tag/$tag";
  params: Record<string, string>;
  label: string;
  count?: number;
  active?: boolean;
  accent?: "rust" | "signal" | "innov";
}) {
  const activeCls =
    accent === "innov" ? "bg-innov text-ink" : accent === "signal" ? "bg-signal text-paper" : "bg-rust text-paper";
  return (
    <Link
      to={to}
      params={params as never}
      className={cn(
        "kicker inline-flex h-9 shrink-0 items-center gap-2 border border-ink px-3 text-xs hover:bg-ink hover:text-paper",
        active && activeCls,
      )}
    >
      {label}
      {count != null ? <span className="tabular-nums text-muted">{count}</span> : null}
    </Link>
  );
}

export function RankFeatured20({ companies }: { companies: ListedCompany[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {companies.map((c) => (
        <Link key={c.slug} to="/list/$slug" params={{ slug: c.slug }} className="group block">
          <span className="photo block aspect-[3/2] w-full">
            <img src={c.image} alt={c.imageAlt} className="h-full w-full object-cover" />
          </span>
          <p className="mt-3 headline text-3xl tabular-nums text-signal">{String(c.rank).padStart(2, "0")}</p>
          <h3 className="headline mt-1 text-2xl">{c.name}</h3>
          <p className="mt-1 font-body text-sm text-ink-soft">{c.blurb}</p>
          <p className="mt-2 kicker text-xs text-muted">
            {c.sector} · {c.city}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function RankFeatured50({ companies }: { companies: Innovative[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {companies.map((c) => (
        <Link key={c.slug} to="/innovatives/$slug" params={{ slug: c.slug }} className="group block">
          <span className="photo block aspect-[3/2] w-full">
            <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
          </span>
          <p className="mt-3 headline text-3xl tabular-nums text-innov">{String(c.rank).padStart(2, "0")}</p>
          <h3 className="headline mt-1 text-2xl">{c.name}</h3>
          <p className="mt-1 font-body text-sm text-ink-soft">{c.blurb}</p>
          <p className="mt-2 kicker text-xs text-muted">
            {c.sector} · {c.city}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function RankRow20({ company, adAfter }: { company: ListedCompany; adAfter?: boolean }) {
  return (
    <li>
      <Link to="/list/$slug" params={{ slug: company.slug }} className="group grid grid-cols-12 gap-3 border-t border-ink py-6">
        <span className="col-span-2 headline text-4xl tabular-nums text-signal sm:text-5xl">
          {String(company.rank).padStart(2, "0")}
        </span>
        <div className="col-span-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="headline text-2xl link-title sm:text-3xl">{company.name}</h2>
            <p className="kicker text-xs text-muted">
              {company.sector} · {company.city}
            </p>
          </div>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-base">{company.blurb}</p>
          <div className="mt-2">
            <VerifiedStamp slug={company.slug} />
          </div>
          <p className="mt-2 kicker text-xs text-signal sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
            Leer la ficha
          </p>
        </div>
      </Link>
      {adAfter ? (
        <div className="py-6">
          <AdSlot size="leaderboard" creative="anuncia" />
        </div>
      ) : null}
    </li>
  );
}

export function RankRow50({ company, adAfter }: { company: Innovative; adAfter?: boolean }) {
  return (
    <li className="group border-t border-ink py-6 first:border-t-0 first:pt-0">
      <Link to="/innovatives/$slug" params={{ slug: company.slug }} className="grid grid-cols-12 gap-3">
        <span className="col-span-2 headline text-4xl tabular-nums text-innov sm:text-5xl">
          {String(company.rank).padStart(2, "0")}
        </span>
        <div className="col-span-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="headline text-2xl sm:text-3xl">{company.name}</h2>
            <p className="kicker text-xs text-muted">
              {company.sector} · {company.city}
            </p>
          </div>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-base">{company.blurb}</p>
          <div className="mt-2">
            <VerifiedStamp slug={company.slug} />
          </div>
          <p className="mt-2 kicker text-xs text-innov sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
            Por qué entra
          </p>
        </div>
      </Link>
      {adAfter ? (
        <div className="mt-6">
          <AdSlot size="leaderboard" creative="anuncia" />
        </div>
      ) : null}
    </li>
  );
}

export function MethodGrid({
  items,
  accent = "signal",
}: {
  items: { title: string; text: string }[];
  accent?: "signal" | "innov";
}) {
  return (
    <ol className="mt-8 grid gap-6 sm:grid-cols-2">
      {items.map((m, i) => (
        <li key={m.title} className="border-t border-ink pt-4">
          <p className="headline text-xl">
            <span className={accent === "innov" ? "text-innov" : "text-signal"}>
              {String(i + 1).padStart(2, "0")}{" "}
            </span>
            {m.title}
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function EmptyCat({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      {children}
    </main>
  );
}
