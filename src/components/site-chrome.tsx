import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { HOUSE, ISSUE, SECTIONS, BRIEFS, DESKS } from "@/lib/content";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { Wordmark, VanderCycle } from "@/components/brand";
import { AdSlot } from "@/components/ad-slot";
import { MarketsBar } from "@/components/markets-bar";
import { cn } from "@/lib/utils";

const MORE_LINKS = [
  { to: "/obituarios" as const, label: "Obituarios" },
  { to: "/briefing" as const, label: "Briefing" },
  { to: "/anuncia" as const, label: "Anuncia" },
  { to: "/saved" as const, label: "Guardados" },
];

type MegaId = "secciones" | "rankings" | "casa";


export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-rust focus:px-4 focus:py-2 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <Header open={open} setOpen={setOpen} />
      {open && <MobileNav onClose={() => setOpen(false)} />}
      <div id="contenido">{children}</div>
      <Footer />
    </div>
  );
}

function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ticker = [...BRIEFS.slice(0, 8), ...BRIEFS.slice(0, 8)];
  const [mega, setMega] = useState<MegaId | null>(null);

  useEffect(() => {
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMega(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header>
      <div className="sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div
          className="relative bg-ink text-paper"
          onMouseLeave={() => setMega(null)}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-3 sm:gap-2 sm:px-6">
            <button
              type="button"
              className="press grid size-11 shrink-0 place-items-center lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
            </button>
            <Link to="/" className="logo-mark min-w-0 flex-1 py-2.5 lg:flex-none lg:shrink-0">
              <Wordmark />
              <span className="sr-only">{HOUSE.name}</span>
            </Link>
            <nav className="hidden min-w-0 flex-1 lg:block" aria-label="Secciones">
              <DesktopNav pathname={pathname} mega={mega} setMega={setMega} />
            </nav>
            <div className="ml-auto flex shrink-0 items-center gap-1">
              <Link to="/search" aria-label="Buscar" className="press grid size-11 place-items-center">
                <Search className="size-5" strokeWidth={1.5} />
              </Link>
              <a
                href="#boletin"
                className="press kicker hidden h-11 items-center bg-rust px-4 text-xs text-paper hover:bg-paper hover:text-ink sm:inline-flex"
              >
                Suscribirse
              </a>
              <AuthSlot />
            </div>
          </div>
          {mega ? <MegaPanel id={mega} pathname={pathname} onClose={() => setMega(null)} /> : null}
        </div>
        <MarketsBar />
      </div>

      <div className="border-b border-rule bg-paper">
        <div className="ticker mx-auto flex max-w-7xl items-center gap-3 px-3 py-1.5 sm:gap-4 sm:px-6 sm:py-2">
          <span className="kicker shrink-0 text-[10px] text-rust sm:text-xs">Minuto</span>
          <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
            <div className="ticker-track font-sans text-sm font-medium tracking-tight text-ink">
              {ticker.map((b, i) => (
                <Link
                  key={`${b.id}-${i}`}
                  to="/story/$slug"
                  params={{ slug: b.slug }}
                  className="pr-8 hover:text-rust"
                >
                  <span className="text-muted">{b.time}</span>
                  <span className="mx-2 text-muted">·</span>
                  {b.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {pathname !== "/login" && pathname !== "/" && (
        <div className="border-b border-rule bg-paper">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <AdSlot size="leaderboard" creative={pathname.startsWith("/list") ? "briefing" : "vander20"} />
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopNav({
  pathname,
  mega,
  setMega,
}: {
  pathname: string;
  mega: MegaId | null;
  setMega: (id: MegaId | null) => void;
}) {
  const rankingsOn = pathname.startsWith("/list") || pathname.startsWith("/innovatives") || pathname.startsWith("/indice") || pathname.startsWith("/under40");
  const casaOn = ["/about", "/obituarios", "/briefing", "/anuncia", "/saved"].some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const seccionesOn = pathname.startsWith("/section/");

  return (
    <ul className="flex items-center justify-end overflow-visible">
      <li>
        <MegaTrigger
          label="Secciones"
          open={mega === "secciones"}
          active={seccionesOn}
          onOpen={() => setMega("secciones")}
          onToggle={() => setMega(mega === "secciones" ? null : "secciones")}
        />
      </li>
      <li>
        <MegaTrigger
          label="Rankings"
          open={mega === "rankings"}
          active={rankingsOn}
          onOpen={() => setMega("rankings")}
          onToggle={() => setMega(mega === "rankings" ? null : "rankings")}
        />
      </li>
      <li>
        <Link
          to="/signals"
          className={cn(
            "nav-link inline-flex h-12 items-center px-3 text-xs text-paper hover:text-rust",
            pathname.startsWith("/signals") && "is-active text-rust",
          )}
        >
          Signals
        </Link>
      </li>
      <li>
        <Link
          to="/contra"
          className={cn(
            "nav-link inline-flex h-12 items-center px-3 text-xs text-paper hover:text-rust",
            pathname.startsWith("/contra") && "is-active text-rust",
          )}
        >
          Contra
        </Link>
      </li>
      <li>
        <Link
          to="/channels"
          className={cn(
            "nav-link inline-flex h-12 items-center px-3 text-xs text-paper hover:text-rust",
            (pathname.startsWith("/channels") || pathname.startsWith("/piso")) && "is-active text-rust",
          )}
        >
          Channels
        </Link>
      </li>
      <li>
        <MegaTrigger
          label="Casa"
          open={mega === "casa"}
          active={casaOn}
          onOpen={() => setMega("casa")}
          onToggle={() => setMega(mega === "casa" ? null : "casa")}
        />
      </li>
    </ul>
  );
}

function MegaTrigger({
  label,
  open,
  active,
  onOpen,
  onToggle,
}: {
  label: string;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-haspopup="true"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onToggle}
      className={cn(
        "nav-link inline-flex h-12 items-center gap-1 px-3 text-xs text-paper hover:text-rust",
        (open || active) && "is-active text-rust",
      )}
    >
      {label}
      <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} strokeWidth={2} />
    </button>
  );
}

function MegaPanel({
  id,
  pathname,
  onClose,
}: {
  id: MegaId;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-x-0 top-full z-50 border-t border-paper/15 bg-paper text-ink shadow-[0_18px_40px_rgba(10,10,10,0.18)]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {id === "secciones" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                to="/section/$section"
                params={{ section: s.id }}
                onClick={onClose}
                className="group block min-w-0"
              >
                <p className={cn("headline text-2xl group-hover:text-rust", pathname === `/section/${s.id}` && "text-rust")}>
                  {s.label}
                </p>
                <p className="mt-2 font-body text-sm leading-snug text-muted">{s.dek}</p>
              </Link>
            ))}
          </div>
        ) : null}
        {id === "rankings" ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/list" onClick={onClose} className="group block">
              <p className="kicker text-xs text-signal">Protocolo</p>
              <p className="headline mt-2 text-3xl group-hover:text-rust">
                Vander <span className="italic text-signal">20</span>
              </p>
              <p className="mt-2 font-body text-sm leading-snug text-muted">
                Las veinte compañías visitadas. Código de casa, no ruido.
              </p>
            </Link>
            <Link to="/innovatives" onClick={onClose} className="group block">
              <p className="kicker text-xs text-innov">Anual</p>
              <p className="headline mt-2 text-3xl group-hover:text-rust">
                <span className="italic text-innov">50</span> Innovatives
              </p>
              <p className="mt-2 font-body text-sm leading-snug text-muted">
                Innovación verificable. Metodología pública.
              </p>
            </Link>
            <Link to="/under40" onClick={onClose} className="group block">
              <p className="kicker text-xs text-rust">Chile</p>
              <p className="headline mt-2 text-3xl group-hover:text-rust">
                100 <span className="italic">under</span> 40
              </p>
              <p className="mt-2 font-body text-sm leading-snug text-muted">
                Cien fichas. Edad declarada. Enlaces a la prensa.
              </p>
            </Link>
            <Link to="/indice" onClick={onClose} className="group block">
              <p className="kicker text-xs text-rust">Data</p>
              <p className="headline mt-2 text-3xl group-hover:text-rust">El Índice</p>
              <p className="mt-2 font-body text-sm leading-snug text-muted">
                Sueldos, turnos, offtakes. Lo que se puede citar.
              </p>
            </Link>
          </div>
        ) : null}
        {id === "casa" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { to: "/about" as const, label: "Redacción", dek: "Quién firma. Corresponsalías." },
              { to: "/obituarios" as const, label: "Obituarios", dek: "El guiño. Lo que ya no se usa." },
              { to: "/briefing" as const, label: "Briefing", dek: "Lo que llegó incompleto." },
              { to: "/anuncia" as const, label: "Anuncia", dek: "Inventario y tarifas." },
              { to: "/saved" as const, label: "Guardados", dek: "Las piezas que te quedaste." },
            ].map((item) => (
              <Link key={item.to} to={item.to} onClick={onClose} className="group block min-w-0">
                <p className={cn("headline text-2xl group-hover:text-rust", pathname === item.to && "text-rust")}>
                  {item.label}
                </p>
                <p className="mt-2 font-body text-sm leading-snug text-muted">{item.dek}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-paper lg:hidden pt-[env(safe-area-inset-top)]">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-ink px-4 py-3">
        <Link to="/" onClick={onClose} className="logo-mark">
          <Wordmark className="h-7 sm:h-8" />
        </Link>
        <button type="button" className="press grid size-11 place-items-center" aria-label="Cerrar menú" onClick={onClose}>
          <X className="size-6" strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col px-4 pb-10 pt-2">
        <ul className="flex flex-col">
          {SECTIONS.map((s) => (
            <li key={s.id} className="menu-item border-b border-paper/15">
              <Link
                to="/section/$section"
                params={{ section: s.id }}
                onClick={onClose}
                className="flex min-h-12 items-center headline text-3xl"
              >
                {s.label}
              </Link>
            </li>
          ))}
          <li className="menu-item border-b border-paper/15">
            <Link to="/list" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Vander <span className="italic text-signal">20</span>
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/innovatives" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              <span className="italic text-innov">50</span>
              <span className="ml-2">Innovatives</span>
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/under40" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              100 <span className="ml-2 italic">under</span>&nbsp;40
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/signals" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Signals
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/contra" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Contra
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/channels" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Channels
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/indice" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              El Índice
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/about" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Redacción
            </Link>
          </li>
          <li className="menu-item border-b border-paper/15">
            <Link to="/obituarios" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Obituarios
            </Link>
          </li>
        </ul>
        <ul className="mt-6 flex flex-col">
          {MORE_LINKS.filter((item) => item.to !== "/obituarios").map((item) => (
            <li key={item.to} className="menu-item border-b border-paper/15">
              <Link
                to={item.to}
                onClick={onClose}
                className="flex min-h-12 items-center font-sans text-sm font-semibold uppercase tracking-widest"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="menu-item">
            <a
              href="#boletin"
              onClick={onClose}
              className="flex min-h-12 items-center font-sans text-sm font-semibold uppercase tracking-widest text-rust"
            >
              Suscribirse
            </a>
          </li>
        </ul>
        <p className="kicker mt-10 text-xs text-silver">{HOUSE.credit}</p>
      </nav>
    </div>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending || !user) return null;
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <div className="font-kicker text-xs text-paper [&_button]:text-paper [&_span]:text-paper">
        <UserButton />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink bg-ink px-4 py-14 text-paper sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" aria-label={HOUSE.name} className="inline-block">
            <VanderCycle className="size-16 sm:size-20" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
          <div>
            <p className="kicker text-xs text-paper/45">Secciones</p>
            <ul className="mt-3 space-y-2 font-sans text-base font-medium">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link to="/section/$section" params={{ section: s.id }} className="link-title">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/list" className="link-title">
                  Vander 20
                </Link>
              </li>
              <li>
                <Link to="/innovatives" className="link-title">
                  50 Innovatives
                </Link>
              </li>
              <li>
                <Link to="/under40" className="link-title">
                  100 under 40
                </Link>
              </li>
              <li>
                <Link to="/signals" className="link-title">
                  Signals
                </Link>
              </li>
              <li>
                <Link to="/contra" className="link-title">
                  Contra la corriente
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker text-xs text-paper/45">La casa</p>
            <ul className="mt-3 space-y-2 font-sans text-base font-medium">
              <li>
                <Link to="/channels" className="link-title">
                  Channels
                </Link>
              </li>
              <li>
                <Link to="/indice" className="link-title">
                  El Índice
                </Link>
              </li>
              <li>
                <Link to="/obituarios" className="link-title">
                  Obituarios
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-title">
                  Redacción
                </Link>
              </li>
              <li>
                <Link to="/briefing" className="link-title">
                  Briefing
                </Link>
              </li>
              <li>
                <Link to="/saved" className="link-title">
                  Guardados
                </Link>
              </li>
              <li>
                <Link to="/anuncia" className="link-title">
                  Anuncia
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker text-xs text-paper/45">Corresponsalías</p>
            <ul className="mt-3 space-y-2 font-sans text-base font-medium">
              {DESKS.map((d) => (
                <li key={d.id}>
                  <Link to="/search" search={{ q: d.label }} className="link-title">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="kicker text-xs text-paper/40">
          © {ISSUE.date.split(" ").at(-1)} {HOUSE.name}. {HOUSE.credit}.
        </p>
        <p className="kicker text-xs text-paper/40">
          {ISSUE.title}. {ISSUE.desks.join(" · ")}.
        </p>
      </div>
    </footer>
  );
}
