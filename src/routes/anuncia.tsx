import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { HOUSE, ISSUE } from "@/lib/content";
import { requestAdvertise } from "@/lib/server/magazine";
import { Wordmark } from "@/components/brand";

export const Route = createFileRoute("/anuncia")({
  component: AnunciaPage,
  head: () => ({
    meta: [{ title: "Anuncia — We Are Vander" }],
  }),
});

const FORMATS = [
  { name: "Leaderboard", size: "728 × 90", use: "Adsterra. Bajo el ticker, todas las páginas." },
  { name: "Mobile banner", size: "320 × 50", use: "Adsterra. Mismo slot, viewport chico." },
  { name: "MPU / in-read", size: "300 × 250", use: "Adsterra. Riel, ficha y dentro de la nota." },
  { name: "Native", size: "In-feed", use: "Adsterra. Billboard de portada y módulos anchos." },
  { name: "Popunder", size: "Onclick", use: "HilltopAds. Opcional, se activa con Zone ID." },
  { name: "Branded", size: "A medida", use: "Vander 20, boletín, briefing patrocinado." },
];

function AnunciaPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("idle");
    try {
      const result = await requestAdvertise({ data: { email, company, note } });
      if (result.ok) {
        setStatus("ok");
        setMessage("Llegó a la mesa comercial de Interadia. Te escribimos con el kit.");
        setEmail("");
        setCompany("");
        setNote("");
      } else {
        setStatus("err");
        setMessage(result.error);
      }
    } catch {
      setStatus("err");
      setMessage("No pudimos anotar ese pedido.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="kicker text-xs text-rust">Media kit · {ISSUE.date}</p>
          <Wordmark className="mt-5 h-10 sm:h-14" />
          <h1 className="headline mt-6 text-5xl sm:text-7xl">Anuncia en Vander</h1>
          <p className="mt-4 kicker text-xs text-silver">{HOUSE.credit}</p>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/80">
            Inventario editorial para marcas que se toman América Latina en serio. Seis mesas,
            un ranking, un boletín. Negro, blanco, negocios.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="headline text-3xl">Formatos</h2>
            <ul className="mt-4">
              {FORMATS.map((f) => (
                <li key={f.name} className="grid grid-cols-12 gap-3 border-t border-ink py-4">
                  <p className="col-span-4 headline text-xl">{f.name}</p>
                  <p className="col-span-3 kicker text-xs text-muted">{f.size}</p>
                  <p className="col-span-5 font-body text-sm text-ink-soft">{f.use}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-base leading-relaxed text-ink-soft">
              La audiencia es la mesa: fundadores, operadores y capital que lee Vander como un
              diario. {HOUSE.motto}. Si el aviso no se siente caro con los ojos cerrados, no entra.
            </p>
            <Link to="/list" className="mt-6 inline-block kicker text-xs text-ink underline decoration-rust hover:text-rust">
              Ver el Vander 20
            </Link>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={(e) => void onSubmit(e)} className="border border-ink bg-paper-deep p-6">
              <p className="kicker text-xs text-rust">Mesa comercial</p>
              <h2 className="headline mt-2 text-3xl">Pide el kit</h2>
              <label className="mt-6 block">
                <span className="kicker text-xs text-muted">Correo</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-11 w-full border-b border-ink bg-transparent font-sans outline-none focus:border-rust"
                />
              </label>
              <label className="mt-5 block">
                <span className="kicker text-xs text-muted">Marca</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 h-11 w-full border-b border-ink bg-transparent font-sans outline-none focus:border-rust"
                />
              </label>
              <label className="mt-5 block">
                <span className="kicker text-xs text-muted">Nota</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="mt-1 w-full border-b border-ink bg-transparent py-2 font-sans outline-none focus:border-rust"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="press mt-6 h-11 w-full bg-ink font-kicker text-xs tracking-widest text-paper uppercase hover:bg-rust disabled:opacity-50"
              >
                {busy ? "Enviando…" : "Enviar"}
              </button>
              {status !== "idle" && (
                <p className={`mt-3 font-sans text-sm ${status === "ok" ? "text-ink-soft" : "text-rust"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
