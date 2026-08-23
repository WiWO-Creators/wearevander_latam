import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  UNDER40,
  UNDER40_META,
  under40Cities,
  under40Sectors,
} from "@/lib/under40";
import { Under40Shot } from "@/components/under40-shot";
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
      const hay = `${p.name} ${p.role} ${p.bio} ${p.sector} ${p.city}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, sector, city]);

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">{UNDER40_META.kicker}</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl lg:text-8xl">
            100 <span className="italic">under</span> 40
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-snug text-paper/75">
            {UNDER40_META.dek} {HOUSE.credit}.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat n="100" label="Perfiles" />
            <Stat n={`${UNDER40_META.women} / ${UNDER40_META.men}`} label="Mujeres / hombres" />
            <Stat n={String(UNDER40_META.verticals)} label="Verticales" />
            <Stat n={String(UNDER40_META.regions)} label="Regiones" />
          </dl>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-ink bg-paper px-4 py-3 sm:px-6" aria-label="Filtros 100 under 40">
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
            <button
              type="button"
              onClick={() => setSector(null)}
              className={cn("kicker inline-flex h-8 items-center px-2 text-xs", !sector ? "text-rust" : "text-muted hover:text-ink")}
            >
              Todas
            </button>
            {sectors.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSector(s.label === sector ? null : s.label)}
                className={cn(
                  "kicker inline-flex h-8 items-center px-2 text-xs",
                  sector === s.label ? "text-rust" : "text-muted hover:text-ink",
                )}
              >
                {s.label} · {s.items.length}
              </button>
            ))}
          </div>
          <div className="chip-row items-center">
            <button
              type="button"
              onClick={() => setCity(null)}
              className={cn("kicker inline-flex h-8 items-center px-2 text-xs", !city ? "text-ink" : "text-muted hover:text-ink")}
            >
              Chile
            </button>
            {cities.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCity(c.label === city ? null : c.label)}
                className={cn(
                  "kicker inline-flex h-8 items-center px-2 text-xs",
                  city === c.label ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {c.label} · {c.items.length}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="kicker mb-6 text-xs text-muted">
          {list.length} de {UNDER40.length}
        </p>
        <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <li key={p.slug}>
              <Link to="/under40/$slug" params={{ slug: p.slug }} className="group block">
                <Under40Shot person={p} />
                <p className="kicker mt-3 text-[10px] text-rust">
                  {String(p.rank).padStart(3, "0")} · {p.sector}
                </p>
                <h2 className="headline mt-1 text-2xl leading-[1.08]">{p.name}</h2>
                <p className="mt-1 line-clamp-2 font-body text-sm text-ink-soft">{p.role}</p>
                <p className="mt-2 font-kicker text-[10px] uppercase tracking-wider text-muted">
                  {p.city}
                  {p.ageShort ? ` · ${p.ageShort}` : ""}
                </p>
              </Link>
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

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="headline text-3xl sm:text-4xl">{n}</p>
      <p className="mt-1 kicker text-xs text-silver">{label}</p>
    </div>
  );
}
