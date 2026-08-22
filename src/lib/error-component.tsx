import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <p className="kicker text-xs text-rust">Error</p>
      <h1 className="font-display text-3xl font-extrabold uppercase">Algo se cortó en edición.</h1>
      <p className="max-w-md font-body text-sm text-muted break-words">
        {error.message || "Ocurrió un error. Recarga la página."}
      </p>
      <Link to="/" className="kicker text-xs text-ink underline decoration-rust">
        Volver al número
      </Link>
    </main>
  );
}
