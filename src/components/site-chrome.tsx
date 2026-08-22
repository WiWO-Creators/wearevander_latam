import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { ISSUE, SECTIONS, BRIEFS, DESKS } from "@/lib/content";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { cn } from "@/lib/utils";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ticker = BRIEFS.slice(0, 6);

  return (
    <header>
      <div className="sticky top-0 z-50">
        <div className="bg-ink text-paper">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="grid size-11 place-items-center lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
            </button>
            <Link to="/" className="flex min-w-0 items-baseline gap-2 sm:gap-3">
              <span className="headline truncate text-2xl uppercase sm:text-4xl">We Are Vander</span>
              <span className="kicker hidden text-xs text-rust sm:inline">Latam</span>
            </Link>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="#boletin"
              className="kicker hidden h-11 items-center bg-rust px-4 text-xs text-paper transition-opacity duration-150 hover:opacity-80 sm:inline-flex"
            >
              Suscribirse
            </a>
            <Link to="/search" aria-label="Buscar" className="grid size-11 place-items-center">
              <Search className="size-5" strokeWidth={1.75} />
            </Link>
            <AuthSlot />
          </div>
        </div>
        </div>
        <nav className="hidden border-b border-ink bg-paper lg:block">
          <ul className="mx-auto flex max-w-7xl items-center gap-1 px-6">
            {SECTIONS.map((s) => {
              const href = `/section/${s.id}`;
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={s.id}>
                  <Link
                    to="/section/$section"
                    params={{ section: s.id }}
                    className={cn(
                      "kicker inline-flex h-11 items-center border-b-2 px-3 text-xs transition-colors duration-150 hover:text-rust",
                      active ? "border-rust text-rust" : "border-transparent text-ink",
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
                  "kicker inline-flex h-11 items-center border-b-2 px-3 text-xs hover:text-rust",
                  pathname === "/list" ? "border-rust text-rust" : "border-transparent text-ink",
                )}
              >
                Vander 20
              </Link>
            </li>
            <li>
              <Link
                to="/briefing"
                className="kicker inline-flex h-11 items-center border-b-2 border-transparent px-3 text-xs text-ink hover:text-rust"
              >
                Briefing
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="kicker inline-flex h-11 items-center border-b-2 border-transparent px-3 text-xs text-ink hover:text-rust"
              >
                Redacción
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 py-2 sm:px-6">
          <span className="kicker shrink-0 text-xs text-rust">Al minuto</span>
          <p className="truncate font-display text-sm font-semibold tracking-tight">
            {ticker.map((b) => `${b.time} ${b.title}`).join("  ·  ")}
          </p>
        </div>
      </div>

      {open && (
        <nav className="border-b border-ink bg-paper px-4 py-2 lg:hidden">
          <ul className="flex flex-col">
            {SECTIONS.map((s) => (
              <li key={s.id} className="border-b border-rule">
                <Link
                  to="/section/$section"
                  params={{ section: s.id }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center headline text-2xl uppercase"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-rule">
              <Link
                to="/list"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center headline text-2xl uppercase"
              >
                Vander 20
              </Link>
            </li>
            <li className="border-b border-rule">
              <Link
                to="/briefing"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center headline text-2xl uppercase"
              >
                Briefing
              </Link>
            </li>
            <li className="border-b border-rule">
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center headline text-2xl uppercase"
              >
                Redacción
              </Link>
            </li>
            <li className="border-b border-rule">
              <Link
                to="/saved"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center headline text-2xl uppercase"
              >
                Guardados
              </Link>
            </li>
            <li className="border-b border-rule">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center headline text-2xl uppercase"
              >
                Entrar
              </Link>
            </li>
            <li>
              <a
                href="#boletin"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center headline text-2xl uppercase text-rust"
              >
                Suscribirse
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="h-8 w-16 animate-pulse bg-paper/20" />;
  if (user) {
    return (
      <div className="hidden items-center gap-3 sm:flex">
        <Link to="/saved" className="kicker text-xs text-paper/80 hover:text-paper">
          Guardados
        </Link>
        <div className="font-kicker text-xs text-paper [&_button]:text-paper [&_span]:text-paper">
          <UserButton />
        </div>
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="kicker hidden h-11 items-center border border-paper/30 px-3 text-xs text-paper hover:bg-paper hover:text-ink sm:inline-flex"
    >
      Entrar
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink bg-ink px-4 py-12 text-paper sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="headline text-4xl uppercase">We Are Vander</p>
          <p className="mt-2 kicker text-xs text-rust">We Love Business · Latam</p>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-paper/70">
            Portal de innovación empresarial para América Latina. Negro, blanco, negocios.
            El criterio es el producto.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
          <div>
            <p className="kicker text-xs text-paper/45">Secciones</p>
            <ul className="mt-3 space-y-2 font-display text-base font-semibold">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link to="/section/$section" params={{ section: s.id }} className="hover:text-rust">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/list" className="hover:text-rust">
                  Vander 20
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker text-xs text-paper/45">La casa</p>
            <ul className="mt-3 space-y-2 font-display text-base font-semibold">
              <li><Link to="/about" className="hover:text-rust">Redacción</Link></li>
              <li><Link to="/briefing" className="hover:text-rust">Briefing</Link></li>
              <li><Link to="/saved" className="hover:text-rust">Guardados</Link></li>
              <li><Link to="/login" className="hover:text-rust">Entrar</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker text-xs text-paper/45">Mesas</p>
            <ul className="mt-3 space-y-2 font-display text-base font-semibold text-paper/80">
              {DESKS.map((d) => (
                <li key={d.id}>{d.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl kicker text-xs text-paper/40">
        © {ISSUE.date.split(" ").at(-1)} We Are Vander. {ISSUE.title}. {ISSUE.desks.join(" · ")}.
      </p>
    </footer>
  );
}
