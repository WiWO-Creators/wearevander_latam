import { Link } from "@tanstack/react-router";
import { Globe, Linkedin } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  VOLUMES,
  adjacentVisionario,
  getVisionario,
  inVisionarioCity,
  visionarioCities,
  visionarioLinks,
  visionarioSectors,
  type VisionarioVolume,
} from "@/lib/visionarios";
import { Under40Links, Under40Shot, Under40Verify } from "@/components/under40-shot";
import { CountryMark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { HOUSE } from "@/lib/content";
import { hostFromUrl } from "@/lib/under40";
import { seoHead } from "@/lib/seo";
import { VOLUME_PHOTO_SLUGS } from "@/lib/visionarios-photos";
import { ShareBar } from "@/components/share-bar";
import { cn } from "@/lib/utils";

function photoSrc(id: VisionarioVolume["id"], slug: string) {
  return id === "cl" ? `/under40/${slug}.jpg` : `/visionarios/${id}/${slug}.jpg`;
}

/** Contact sheet of real portraits — replaces the crowd illustration on collection cards. */
export function VolumeFaces({
  volume,
  className,
}: {
  volume: VisionarioVolume;
  className?: string;
}) {
  const slugs = VOLUME_PHOTO_SLUGS[volume.id] as readonly string[];
  const take = slugs.slice(0, 32);
  return (
    <div
      className={cn("grid aspect-[16/9] grid-cols-8 grid-rows-4 gap-px overflow-hidden bg-ink", className)}
      aria-hidden
    >
      {take.map((slug) => (
        <img
          key={slug}
          src={photoSrc(volume.id, slug)}
          alt=""
          className="h-full w-full object-cover object-[center_18%]"
        />
      ))}
    </div>
  );
}

export function volumeHead(volume: VisionarioVolume) {
  return seoHead({
    title: `100V Visionarios: 100 emprendedores ${volume.adjective}`,
    description: volume.dek,
    path: volume.path,
    image: volume.og,
    imageAlt: `100V Visionarios, dossier Solo ${volume.name}`,
    ogTitle: `Cien visionarios. Solo ${volume.name}.`,
    ogDescription: volume.dek.slice(0, 110),
  });
}

export function profileHead(volume: VisionarioVolume, slug: string) {
  const person = getVisionario(volume, slug);
  return seoHead({
    title: person
      ? `${String(person.rank).padStart(3, "0")}. ${person.name} — 100V ${volume.name}`
      : `100V Visionarios ${volume.name}`,
    description: person ? `${person.role}. ${person.bio}`.slice(0, 155) : volume.dek,
    path: `${volume.path}/${slug}`,
    image: person?.image || volume.og,
    imageAlt: person?.name ?? volume.name,
    ogTitle: person ? person.name.slice(0, 60) : `100V ${volume.name}`,
    ogDescription: person ? person.role.slice(0, 110) : volume.dek.slice(0, 110),
    type: "article",
  });
}

export function methodHead(volume: VisionarioVolume) {
  return seoHead({
    title: `Cómo se armó 100V ${volume.name} — We Are Vander`,
    description: volume.dek,
    path: `${volume.path}/metodologia`,
    image: volume.og,
  });
}

export function VisionariosSwitcher({ current }: { current: VisionarioVolume["id"] }) {
  return (
    <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Volúmenes 100V">
      {VOLUMES.map((v) => (
        <Link
          key={v.id}
          to={v.path}
          className={cn(
            "kicker inline-flex items-center gap-1.5 text-xs hover:text-rust",
            current === v.id ? "text-rust" : "text-muted",
          )}
        >
          <CountryMark id={v.id} label={v.name} />
          <span className="text-[10px] tracking-widest text-muted">Vol. {v.volume}</span>
        </Link>
      ))}
    </nav>
  );
}

export function VisionariosIndex({ volume }: { volume: VisionarioVolume }) {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [cohort, setCohort] = useState<string | null>(null);
  const people = volume.people;
  const sectors = visionarioSectors(people);
  const cities = visionarioCities(people);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return people.filter((p) => {
      if (sector && p.sector !== sector) return false;
      if (cohort && p.cohort !== cohort) return false;
      if (!inVisionarioCity(people, p, city)) return false;
      if (!needle) return true;
      const hay = `${p.name} ${p.role} ${p.bio} ${p.sector} ${p.city} ${p.focus}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [people, q, sector, city, cohort]);

  const filtering = Boolean(q.trim() || sector || city || cohort);
  const featured = filtering ? [] : list.slice(0, 3);
  const rest = filtering ? list : list.slice(3);
  const profileTo = `${volume.path}/$slug`;
  const methodTo = `${volume.path}/metodologia`;

  return (
    <main>
      <section className="bg-ivory text-ink">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-4 sm:px-6">
          <VisionariosSwitcher current={volume.id} />
          <p className="kicker mt-4 text-xs text-rust">
            <CountryMark id={volume.id} /> · agosto 2026
          </p>
          <h1 className="headline mt-3 text-5xl leading-[0.9] sm:text-6xl lg:text-8xl">100V Visionarios</h1>
        </div>
        <figure className="relative mx-auto max-w-7xl">
          <img
            src={volume.illustration}
            alt={`Cien personas dibujadas, tinta y acuarela. Volumen ${volume.name}.`}
            className="aspect-[5/4] w-full object-cover object-bottom sm:aspect-[2/1] lg:aspect-[16/9] lg:object-center"
          />
          <figcaption className="flex flex-col gap-3 border-t border-ink/10 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <p className="max-w-xl font-body text-sm leading-snug text-ink-soft">
              {volume.dek} {HOUSE.credit}.
            </p>
            <p className="font-body text-sm text-ink">
              <span className="headline text-2xl leading-none sm:text-3xl">El dossier.</span>
              <span className="mt-1 block text-ink-soft">
                {volume.women} mujeres, {volume.men} hombres. {volume.verticals} verticales, {volume.regions}{" "}
                regiones.
              </span>
            </p>
          </figcaption>
        </figure>
      </section>

      <nav className="sticky top-0 z-20 border-b border-ink bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6" aria-label={`Filtros 100V ${volume.name}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar un nombre, una empresa, una ciudad"
              className="h-11 flex-1 border border-ink/20 bg-paper px-3 font-body text-sm outline-none focus:border-ink"
            />
            <Link to={methodTo} className="kicker text-xs text-rust hover:underline">
              Cómo se armó
            </Link>
          </div>
          <div className="chip-row items-center">
            <FilterChip active={!cohort} onClick={() => setCohort(null)}>
              Todos
            </FilterChip>
            <FilterChip active={cohort === "sub40"} onClick={() => setCohort(cohort === "sub40" ? null : "sub40")}>
              Sub-40 · 70
            </FilterChip>
            <FilterChip
              active={cohort === "referente"}
              onClick={() => setCohort(cohort === "referente" ? null : "referente")}
            >
              Referentes · 30
            </FilterChip>
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
              {volume.name}
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
          {list.length} de {people.length}
        </p>
        {featured.length > 0 && (
          <ul className="mb-14 grid gap-6 sm:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link to={profileTo} params={{ slug: p.slug }} className="group block">
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
              <Link to={profileTo} params={{ slug: p.slug }} className="group block">
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

export function VisionariosProfile({ volume, slug }: { volume: VisionarioVolume; slug: string }) {
  const person = getVisionario(volume, slug);
  if (!person) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="kicker text-xs text-rust">Fuera de lista</p>
        <h1 className="headline mt-3 text-3xl">Ese perfil no está en los 100.</h1>
        <Link to={volume.path} className="mt-6 inline-block kicker text-xs underline">
          Ver el dossier
        </Link>
      </main>
    );
  }
  const { prev, next } = adjacentVisionario(volume, person.slug);
  const links = visionarioLinks(person);
  const profileTo = `${volume.path}/$slug`;

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Under40Shot person={person} className="aspect-[4/5] w-full sm:aspect-[4/5]" />
          </div>
          <div className="flex flex-col justify-end px-4 py-10 sm:px-8 lg:col-span-7 lg:px-12 lg:py-14">
            <Link to={volume.path} className="kicker inline-flex items-center gap-2 text-xs text-rust hover:underline">
              100V Visionarios · <CountryMark id={volume.id} />
            </Link>
            <p className="headline mt-5 text-6xl tabular-nums leading-none text-rust sm:text-8xl">
              {String(person.rank).padStart(3, "0")}
            </p>
            <h1 className="headline mt-3 text-4xl leading-[1.04] sm:text-6xl lg:text-7xl">{person.name}</h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-snug text-paper/80">{person.role}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <MetaChip>{person.sector}</MetaChip>
              {person.focus ? <MetaChip>{person.focus}</MetaChip> : null}
              <MetaChip>{person.place}</MetaChip>
              {person.ageShort ? <MetaChip>{person.ageShort}</MetaChip> : null}
            </ul>
            <div className="mt-4">
              <Under40Verify status={person.verification} />
            </div>
            {links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 border border-paper/30 px-4 font-kicker text-xs uppercase tracking-wider text-paper hover:bg-paper hover:text-ink"
                  >
                    {l.kind === "linkedin" ? <Linkedin className="size-3.5" /> : <Globe className="size-3.5" />}
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ShareBar
            url={`${volume.path}/${person.slug}`}
            title={person.name}
            dek={person.role}
            layout="row"
            className="mb-8"
          />
          <p className="reading text-ink">{person.bio}</p>
          {person.hitos.length > 0 && (
            <>
              <h2 className="headline mt-10 text-3xl">Hitos</h2>
              <ul className="mt-4 space-y-3">
                {person.hitos.map((h) => (
                  <li key={h} className="border-l-2 border-rust pl-4 font-body text-lg leading-snug text-ink-soft">
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside className="lg:col-span-4">
          <p className="kicker border-b border-ink pb-2 text-xs text-rust">En la prensa</p>
          <ul>
            {person.news.map((n) => (
              <li key={n.title} className="border-b border-rule py-3">
                {n.url ? (
                  <a href={n.url} target="_blank" rel="noreferrer" className="headline text-xl link-title">
                    {n.title}
                  </a>
                ) : (
                  <p className="headline text-xl">{n.title}</p>
                )}
                <p className="mt-1 font-kicker text-xs uppercase tracking-wider text-muted">{n.credit}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-kicker text-xs uppercase tracking-wider text-muted">
            Confianza de la ficha: {person.trust || "—"}
          </p>
          {person.url ? (
            <p className="mt-2 font-kicker text-xs uppercase tracking-wider text-muted">
              {hostFromUrl(person.url)}
            </p>
          ) : null}
        </aside>
      </section>

      <nav className="border-t border-ink">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
          <Link
            to={profileTo}
            params={{ slug: prev.slug }}
            className="group grid grid-cols-[5rem_1fr] items-center gap-4 border-b border-ink px-4 py-6 sm:border-b-0 sm:border-r sm:px-6"
          >
            <Under40Shot person={prev} className="aspect-square" />
            <span>
              <span className="kicker text-xs text-muted">Anterior</span>
              <span className="headline mt-1 block text-2xl group-hover:text-rust">{prev.name}</span>
            </span>
          </Link>
          <Link
            to={profileTo}
            params={{ slug: next.slug }}
            className="group grid grid-cols-[5rem_1fr] items-center gap-4 px-4 py-6 sm:px-6"
          >
            <Under40Shot person={next} className="aspect-square" />
            <span>
              <span className="kicker text-xs text-muted">Siguiente</span>
              <span className="headline mt-1 block text-2xl group-hover:text-rust">{next.name}</span>
            </span>
          </Link>
        </div>
      </nav>
      <Newsletter />
    </main>
  );
}

export function VisionariosMethod({ volume }: { volume: VisionarioVolume }) {
  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link to={volume.path} className="kicker inline-flex items-center gap-2 text-xs text-rust hover:underline">
            100V Visionarios · <CountryMark id={volume.id} />
          </Link>
          <h1 className="headline mt-4 text-5xl sm:text-7xl">Cómo se armó</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">
            Dossier de {volume.kicker}. {volume.people.length} perfiles, {volume.verticals} verticales, {volume.regions}{" "}
            regiones. Pensado como material de trabajo periodístico. {HOUSE.credit}.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="space-y-10">
          {volume.method.map((m) => (
            <li key={m.n}>
              <p className="kicker text-xs text-rust">{m.n}</p>
              <h2 className="headline mt-2 text-3xl sm:text-4xl">{m.title}</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">{m.body}</p>
            </li>
          ))}
        </ol>
        <h2 className="headline mt-16 text-3xl sm:text-4xl">Advertencias</h2>
        {volume.warnings.map((w) => (
          <p key={w} className="mt-4 font-body text-base leading-relaxed text-ink-soft">
            {w}
          </p>
        ))}
        <p className="mt-8 kicker text-xs text-muted">
          Enlaces recogidos el 19 y 20 de agosto de 2026. Rondas y dotación según fuentes citadas, no auditadas de forma
          independiente.
        </p>
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

function MetaChip({ children }: { children: ReactNode }) {
  return (
    <li className="kicker border border-paper/25 px-2 py-1 text-[10px] tracking-wider text-paper/80">{children}</li>
  );
}