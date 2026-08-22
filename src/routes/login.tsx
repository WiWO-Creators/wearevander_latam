import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "Entrar — We Are Vander" }],
  }),
});

function Login() {
  return (
    <main className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-md border border-ink px-6 py-10 sm:px-8">
        <p className="kicker text-xs text-rust">Miembros</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight">
          Entra al escritorio
        </h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
          Guarda historias y pide un briefing a la mesa Latam. We Are Vander. We Love Business.
        </p>
        {authEnabled ? (
          <div className="mt-6 flex flex-col gap-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="h-11 border border-ink bg-paper font-kicker text-xs tracking-widest text-ink uppercase hover:bg-ink hover:text-paper"
              >
                Continuar con {p.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 font-display text-sm text-muted">
            El acceso está desactivado en este entorno.
          </p>
        )}
        <Link to="/" className="mt-6 inline-block kicker text-xs text-muted hover:text-rust">
          Volver al número
        </Link>
      </div>
    </main>
  );
}
