import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { HOUSE, ISSUE, SECTIONS, BRIEFS, DESKS } from "@/lib/content";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { Wordmark } from "@/components/brand";
import { AdSlot } from "@/components/ad-slot";
import { MarketsBar } from "@/components/markets-bar";
import { cn } from "@/lib/utils";

const MORE_LINKS = [
  { to: "/obituarios" as const, label: "Obituarios" },
  { to: "/briefing" as const, label: "Briefing" },
  { to: "/anuncia" as const, label: "Anuncia" },
  { to: "/saved" as const, label: "Guardados" },
];


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

  return (
    <header>
      <div className="sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div className="bg-ink text-paper">
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
              <ul className="flex items-center overflow-x-auto">
                {SECTIONS.map((s) => {
                  const href = `/section/${s.id}`;
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={s.id}>
                      <Link
                        to="/section/$section"
                        params={{ section: s.id }}
                        className={cn(
                          "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                          active && "is-active text-rust",
                        )}
                      >
                        {s.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    to="/list"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                      pathname.startsWith("/list") && "is-active",
                    )}
                  >
                    Vander <span className="normal-case italic text-signal">20</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/innovatives"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-innov xl:px-2.5",
                      pathname.startsWith("/innovatives") && "is-active",
                    )}
                  >
                    <span className="normal-case italic text-innov">50</span>
                    <span className="ml-1 hidden xl:inline">Innovatives</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signals"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                      pathname.startsWith("/signals") && "is-active",
                    )}
                  >
                    Signals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contra"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                      pathname.startsWith("/contra") && "is-active",
                    )}
                  >
                    Contra
                  </Link>
                </li>
                <li>
                  <Link
                    to="/piso"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                      pathname.startsWith("/piso") && "is-active",
                    )}
                  >
                    Piso
                  </Link>
                </li>
                <li>
                  <Link
                    to="/indice"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                      pathname.startsWith("/indice") && "is-active",
                    )}
                  >
                    El Índice
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={cn(
                      "nav-link inline-flex h-12 items-center px-2 text-xs text-paper hover:text-rust xl:px-2.5",
                      pathname.startsWith("/about") && "is-active",
                    )}
                  >
                    Redacción
                  </Link>
                </li>
                <MoreMenu pathname={pathname} />
              </ul>
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

function MoreMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = MORE_LINKS.some((i) => pathname === i.to || pathname.startsWith(`${i.to}/`));

  useEffect(() => {
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "nav-link inline-flex h-12 items-center gap-1 px-2.5 text-xs text-paper hover:text-rust xl:px-3",
          (open || active) && "is-active text-rust",
        )}
      >
        Más
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} strokeWidth={2} />
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-50 min-w-48 border border-ink bg-paper py-2">
          {MORE_LINKS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-11 items-center px-4 font-sans text-sm font-medium text-ink hover:bg-paper-deep hover:text-rust",
                  pathname === item.to && "text-rust",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
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
            <Link to="/piso" onClick={onClose} className="flex min-h-12 items-center headline text-3xl">
              Piso
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
          <Wordmark className="h-9 sm:h-11" />
          <p className="mt-3 kicker text-xs text-rust">
            {HOUSE.motto} · {ISSUE.city}
          </p>
          <p className="mt-2 kicker text-xs tracking-widest text-silver">{HOUSE.credit}</p>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-paper/70">
            Portal de innovación empresarial para América Latina.
          </p>
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
                <Link to="/piso" className="link-title">
                  Piso en vivo
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
