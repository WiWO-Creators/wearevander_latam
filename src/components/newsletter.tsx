import { useState, type FormEvent } from "react";
import { HOUSE } from "@/lib/content";
import { subscribeNewsletter } from "@/lib/server/magazine";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("idle");
    try {
      const result = await subscribeNewsletter({ data: email });
      if (result.ok) {
        setStatus("ok");
        setMessage("Quedaste en la lista. El próximo número llega primero por mail.");
        setEmail("");
      } else {
        setStatus("err");
        setMessage(result.error);
      }
    } catch {
      setStatus("err");
      setMessage("No pudimos anotar esa dirección.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id={compact ? undefined : "boletin"}
      className={
        compact
          ? "scroll-mt-28 border border-ink bg-ink px-5 py-6 text-paper"
          : "scroll-mt-28 border-t border-ink bg-ink px-4 py-12 text-paper sm:px-6"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-7xl lg:flex lg:items-end lg:justify-between lg:gap-10"}>
        <div>
          <p className="kicker text-xs text-rust">Boletín</p>
          <h2 className="headline mt-2 text-4xl sm:text-5xl">Un mail. Cero feed.</h2>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-paper/75">
            Team Vander resume la semana: México, Brasil, Argentina, Colombia, Chile, Perú.
            {HOUSE.name}. {HOUSE.motto}.
          </p>
        </div>
        <form onSubmit={(e) => void onSubmit(e)} className="mt-6 flex w-full max-w-xl flex-col gap-2 sm:flex-row lg:mt-0">
          <label className="sr-only" htmlFor={compact ? "newsletter-email-compact" : "newsletter-email"}>
            Email
          </label>
          <input
            id={compact ? "newsletter-email-compact" : "newsletter-email"}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo"
            className="h-11 flex-1 border border-paper/40 bg-transparent px-3 font-sans text-sm text-paper placeholder:text-paper/40 outline-none focus:border-rust"
          />
          <button
            type="submit"
            disabled={busy}
            className="press h-11 bg-rust px-6 font-kicker text-xs tracking-widest text-paper uppercase hover:bg-paper hover:text-ink disabled:opacity-60"
          >
            {busy ? "Enviando…" : "Suscribirme"}
          </button>
        </form>
        {status !== "idle" && (
          <p className={`mt-3 font-sans text-sm ${status === "ok" ? "text-paper/80" : "text-rust"}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
