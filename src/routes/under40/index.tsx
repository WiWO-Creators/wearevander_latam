import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  UNDER40,
  UNDER40_META,
  inUnder40City,
  under40Cities,
  under40Sectors,
} from "@/lib/under40";
import { Under40Links, Under40Shot } from "@/components/under40-shot";
import { Newsletter } from "@/components/newsletter";
import { HOUSE } from "@/lib/content";
import { ChileOnly } from "@/components/brand";
import { VisionariosSwitcher } from "@/components/visionarios-pack";
import { cn } from "@/lib/utils";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/under40/")({
  component: Under40Index,
  head: () =>
    seoHead({
      title: "100V Visionarios: 100 emprendedores chilenos",
      description:
        "Dossier de We Are Vander: cien visionarios chilenos under 40. Edad declarada, retrato, hitos y prensa. Solo Chile.",
      path: "/under40",
      image: "/og/under40.jpg",
      imageAlt: "100V Visionarios, dossier Solo Chile, ilustración de cien personas",
      ogTitle: "Cien visionarios. Solo Chile.",
      ogDescription: "Dossier under 40: edad declarada, retrato, hitos y prensa. Esta lista no cubre la región.",
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
      if (!inUnder40City(p, city)) return false;
      if (!needle) return true;
      const hay = `${p.name} ${p.role} ${p.bio} ${p.sector} ${p.city} ${p.focus}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, sector, city]);

  const filtering = Boolean(q.trim() || sector || city);
  const featured = filtering ? [] : list.slice(0, 3);
  const rest = filtering ? list : list.slice(3);

  return (
    <main>
      <section className="bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-4 sm:px-6">
          <VisionariosSwitcher current="cl" />
          <p className="kicker mt-4 text-xs text-rust lg:hidden">
            <ChileOnly /> · agosto 2026
          </p>
          <h1 className="headline mt-3 text-5xl leading-[0.9] sm:text-6xl lg:hidden">
            100V Visionarios
          </h1>
        </div>
        <figure className="relative mx-auto max-w-7xl">
          <img
            src="/illustrations/cien.jpg"
            alt="Cien personas dibujadas como un retrato de curso, tinta y acuarela."
            className="aspect-[5/4] w-full object-cover object-bottom sm:aspect-[2/1] lg:aspect-[16/9] lg:object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden px-6 pt-10 lg:block">
            <p className="kicker text-xs text-rust">
              <ChileOnly /> · agosto 2026
            </p>
            <h1 className="headline mt-3 max-w-3xl text-7xl leading-[0.88] xl:text-8xl">
              100V Visionarios
            </h1>
          </div>
          <figcaption className="flex flex-col gap-3 border-t border-ink/10 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <p className="max-w-xl font-body text-sm leading-snug text-ink-soft">
              {UNDER40_META.dek} {HOUSE.credit}.
            </p>
            <p className="font-body text-sm text-ink">
              <span className="headline text-2xl leading-none sm:text-3xl">El dossier.</span>
              <span className="mt-1 block text-ink-soft">
                {UNDER40_META.women} mujeres, {UNDER40_META.men} hombres. {UNDER40_META.verticals}{" "}
                verticales, {UNDER40_META.regions} regiones.
              </span>
            </p>
          </figcaption>
        </figure>
      </section>


      <nav className="sticky top-0 z-20 border-b border-ink bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6" aria-label="Filtros 100V Visionarios">
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
