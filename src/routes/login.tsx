import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { HOUSE } from "@/lib/content";
import { Wordmark } from "@/components/brand";

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (s: Record<string, unknown>): { next?: string } => {
    const next =
      typeof s.next === "string" && s.next.startsWith("/") && !s.next.startsWith("//") ? s.next : undefined;
    return { next };
  },
  head: () => ({
    meta: [{ title: "Entrar — We Are Vander" }],
  }),
});

function Login() {
  const { next } = Route.useSearch();
  return (
    <main className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-md border border-ink bg-ink px-6 py-10 text-paper sm:px-8">
        <Wordmark className="h-8" />
        <p className="kicker mt-4 text-xs text-rust">Miembros</p>
        <h1 className="headline mt-2 text-3xl">Entra al escritorio</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-paper/70">
          Guarda historias y pide un briefing a Team Vander. {HOUSE.motto}. {HOUSE.credit}.
        </p>
        {authEnabled ? (
          <div className="mt-6 flex flex-col gap-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: next ?? "/" })}
                className="press h-11 border border-paper/40 bg-transparent font-kicker text-xs tracking-widest text-paper uppercase hover:bg-paper hover:text-ink"
              >
                Continuar con {p.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 font-sans text-sm text-silver">El acceso está desactivado en este entorno.</p>
        )}
        <Link to="/" className="mt-6 inline-block kicker text-xs text-silver hover:text-rust">
          Volver al número
        </Link>
      </div>
    </main>
  );
}
