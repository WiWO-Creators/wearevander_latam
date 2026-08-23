import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  UNDER40,
  UNDER40_META,
  under40Cities,
  under40Sectors,
} from "@/lib/under40";
import { Under40Links, Under40Shot } from "@/components/under40-shot";
import { Newsletter } from "@/components/newsletter";
import { HOUSE } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/under40/")({
  component: Under40Index,
  head: () => ({
    meta: [{ title: "100 under 40 — We Are Vander" }],
  }),
});

function Under40Index() {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const sectors = under40Sectors();
  const cities = under40Cities();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return UNDER40.filter((p) => {
      if (sector && p.sector !== sector) return false;
      if (city && p.city !== city) return false;
      if (!needle) return true;
      const hay = `${p.name} ${p.role} ${p.bio} ${p.sector} ${p.city} ${p.focus}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, sector, city]);

  const filtering = Boolean(q.trim() || sector || city);
  const featured = filtering ? [] : list.slice(0, 3);
  const rest = filtering ? list : list.slice(3);
  const mosaic = UNDER40.slice(0, 12);

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-end px-4 py-14 sm:px-6 sm:py-20 lg:col-span-5 lg:py-16">
            <p className="kicker text-xs text-rust">{UNDER40_META.kicker}</p>
            <h1 className="headline mt-4 text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
              100 <span className="italic">under</span> 40
            </h1>
            <p className="mt-6 max-w-md font-body text-lg leading-snug text-paper/75">
              {UNDER40_META.dek} {HOUSE.credit}.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2">
              <Stat n="100" label="Retratos" />
              <Stat n={`${UNDER40_META.women} / ${UNDER40_META.men}`} label="Mujeres / hombres" />
              <Stat n={String(UNDER40_META.verticals)} label="Verticales" />
              <Stat n={String(UNDER40_META.regions)} label="Regiones" />
            </dl>
          </div>
          <div className="hidden lg:col-span-7 lg:block">
            <ul className="u40-mosaic h-full min-h-[32rem]">
              {mosaic.map((p) => (
                <li key={p.slug}>
                  <Link to="/under40/$slug" params={{ slug: p.slug }} className="group block h-full">
                    <Under40Shot person={p} className="h-full min-h-0 aspect-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-ink bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6" aria-label="Filtros 100 under 40">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar un nombre, una empresa, una ciudad"
              className="h-11 flex-1 border border-ink/20 bg-paper px-3 font-body text-sm outline-none focus:border-ink"
            />
            <Link to="/under40/metodologia" className="kicker text-xs text-rust hover:underline">
              Cómo se armó
            </Link>
          </div>
          <div className="chip-row items-center">
            <FilterChip active={!sector} onClick={() => setSector(null)}>
              Todas
            </FilterChip>
            {sectors.map((s) => (
              <FilterChip
                key={s.slug}
                active={sector === s.label}
                onClick={() => setSector(s.label === sector ? null : s.label)}
              >
                {s.label} · {s.items.length}
              </FilterChip>
            ))}
          </div>
          <div className="chip-row items-center">
            <FilterChip ink active={!city} onClick={() => setCity(null)}>
              Chile
            </FilterChip>
            {cities.map((c) => (
              <FilterChip
                key={c.slug}
                ink
                active={city === c.label}
                onClick={() => setCity(c.label === city ? null : c.label)}
              >
                {c.label} · {c.items.length}
              </FilterChip>
            ))}
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="kicker mb-6 text-xs text-muted">
          {list.length} de {UNDER40.length}
        </p>

        {featured.length > 0 && (
          <ul className="mb-14 grid gap-6 sm:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link to="/under40/$slug" params={{ slug: p.slug }} className="group block">
                  <Under40Shot person={p} showRank sizes="hero" className="aspect-[4/5] sm:aspect-[4/5]" />
                  <p className="kicker mt-3 text-[10px] text-rust">
                    {p.sector}
                    {p.focus ? ` · ${p.focus}` : ""}
                  </p>
                  <h2 className="headline mt-1 text-3xl leading-[1.06] sm:text-4xl">{p.name}</h2>
                  <p className="mt-1 line-clamp-2 font-body text-sm text-ink-soft">{p.role}</p>
                </Link>
                <div className="mt-3">
                  <Under40Links person={p} />
                </div>
              </li>
            ))}
          </ul>
        )}

        <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link to="/under40/$slug" params={{ slug: p.slug }} className="group block">
                <Under40Shot person={p} showRank />
                <p className="kicker mt-3 text-[10px] text-rust">{p.sector}</p>
                <h2 className="headline mt-1 text-2xl leading-[1.08]">{p.name}</h2>
                <p className="mt-1 line-clamp-2 font-body text-sm text-ink-soft">{p.role}</p>
                <p className="mt-2 font-kicker text-[10px] uppercase tracking-wider text-muted">
                  {p.city}
                  {p.ageShort ? ` · ${p.ageShort}` : ""}
                </p>
              </Link>
              <div className="mt-2">
                <Under40Links person={p} />
              </div>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p className="py-16 text-center font-body text-ink-soft">Nada con ese filtro. Prueba otra vertical.</p>
        )}
      </section>
      <Newsletter />
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  ink = false,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  ink?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "kicker inline-flex h-9 shrink-0 items-center border px-3 text-xs",
        active
          ? ink
            ? "border-ink bg-ink text-paper"
            : "border-rust bg-rust text-paper"
          : "border-ink/20 text-muted hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-t border-paper/20 pt-3">
      <p className="headline text-3xl sm:text-4xl">{n}</p>
      <p className="mt-1 kicker text-xs text-silver">{label}</p>
    </div>
  );
}
