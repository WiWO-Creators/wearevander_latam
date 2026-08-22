import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { askVander } from "@/lib/server/magazine";

export const Route = createFileRoute("/briefing")({
  component: BriefingPage,
  head: () => ({
    meta: [{ title: "Briefing — We Are Vander" }],
  }),
});

function BriefingPage() {
  const { user, isPending } = useCurrentUserState();
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");

  if (isPending) {
    return (
      <main className="px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-10 w-72 animate-pulse bg-dust" />
        </div>
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await askVander({ data: topic });
      if (result.ok) setText(result.text);
      else setError(result.error);
    } catch {
      setError("Entra de nuevo para filar con la mesa.");
    } finally {
      setBusy(false);
    }
  }

  const parsed = parseBriefing(text);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <p className="kicker text-xs text-rust">Mesa de editores</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight">
          El Briefing
        </h1>
        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
          Nombra una compañía, una ciudad, un cambio. Armamos una nota Vander: antetítulo,
          titular, argumento.
        </p>
        <form onSubmit={(e) => void onSubmit(e)} className="mt-8">
          <label className="sr-only" htmlFor="topic">
            Tema
          </label>
          <input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="ej. oficinas analógicas en Seúl"
            className="h-12 w-full border-b-2 border-ink bg-transparent font-display text-xl outline-none placeholder:text-muted focus:border-rust"
          />
          <button
            type="submit"
            disabled={busy || topic.trim().length < 3}
            className="mt-5 h-11 bg-ink px-6 font-kicker text-xs tracking-widest text-paper uppercase hover:opacity-90 disabled:opacity-40"
          >
            {busy ? "Filando…" : "Pedir briefing"}
          </button>
        </form>
        {error && <p className="mt-5 font-display text-sm text-rust">{error}</p>}
        {parsed && (
          <article className="mt-10 border-t border-ink pt-8">
            <p className="kicker text-xs text-rust">{parsed.kicker}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight">
              {parsed.headline}
            </h2>
            {parsed.dek && (
              <p className="mt-3 font-body text-lg text-ink-soft">{parsed.dek}</p>
            )}
            {parsed.body.map((p, i) => (
              <p
                key={i}
                className={`mt-5 font-body text-lg leading-relaxed ${i === 0 ? "drop-cap" : ""}`}
              >
                {p}
              </p>
            ))}
            {parsed.quote && (
              <blockquote className="mt-8 border-l-4 border-rust pl-5">
                <p className="font-display text-2xl font-extrabold">{parsed.quote}</p>
              </blockquote>
            )}
          </article>
        )}
        {text && !parsed && (
          <article className="mt-10 whitespace-pre-wrap border-t border-ink pt-8 font-body text-lg leading-relaxed">
            {text}
          </article>
        )}
        <Link to="/list" className="mt-10 inline-block kicker text-xs text-muted hover:text-rust">
          O lee el Vander 20
        </Link>
      </div>
    </main>
  );
}

function parseBriefing(raw: string) {
  if (!raw.trim()) return null;
  const kicker = pick(raw, "KICKER");
  const headline = pick(raw, "HEADLINE");
  if (!headline) return null;
  const dek = pick(raw, "DEK");
  const bodyRaw = pick(raw, "BODY") ?? "";
  const quote = pick(raw, "QUOTE");
  const body = bodyRaw
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return { kicker: kicker ?? "Briefing", headline, dek, body, quote };
}

function pick(raw: string, label: string) {
  const re = new RegExp(
    `${label}\\s*[:\\-–]\\s*([\\s\\S]*?)(?=(?:KICKER|HEADLINE|DEK|BODY|QUOTE)\\s*[:\\-–]|$)`,
    "i",
  );
  const m = raw.match(re);
  return m?.[1]?.trim() ?? null;
}
