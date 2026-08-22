import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { askVander } from "@/lib/server/magazine";
import { HOUSE } from "@/lib/content";

export const Route = createFileRoute("/briefing")({
  component: BriefingPage,
  validateSearch: (s: Record<string, unknown>): { topic?: string } => ({
    topic: typeof s.topic === "string" && s.topic.length > 0 ? s.topic : undefined,
  }),
  head: () => ({
    meta: [{ title: "Briefing — We Are Vander" }],
  }),
});

function BriefingPage() {
  const { user, isPending } = useCurrentUserState();
  const { topic: initialTopic } = Route.useSearch();
  const [topic, setTopic] = useState(initialTopic ?? "");
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
  if (!user) {
    const next = initialTopic ? `/briefing?topic=${encodeURIComponent(initialTopic)}` : "/briefing";
    return <Navigate to="/login" search={{ next }} />;
  }

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
        <h1 className="headline mt-2 text-4xl sm:text-5xl">El Briefing</h1>
        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
          Nombra una compañía, una ciudad, un cambio. Team Vander arma la nota: antetítulo,
          titular, argumento. {HOUSE.credit}.
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
            className="h-12 w-full border-b border-ink bg-transparent font-display text-xl outline-none placeholder:text-muted focus:border-rust"
          />
          <button
            type="submit"
            disabled={busy || topic.trim().length < 3}
            className="press mt-5 h-11 bg-ink px-6 font-kicker text-xs tracking-widest text-paper uppercase hover:bg-rust disabled:opacity-40"
          >
            {busy ? "Filando…" : "Pedir briefing"}
          </button>
        </form>
        {error && <p className="mt-5 font-sans text-sm text-rust">{error}</p>}
        {parsed && (
          <article className="mt-10 border-t border-ink pt-8">
            <p className="kicker text-xs text-rust">{parsed.kicker}</p>
            <h2 className="headline mt-2 text-3xl">{parsed.headline}</h2>
            {parsed.dek && <p className="mt-3 font-body text-lg text-ink-soft">{parsed.dek}</p>}
            {parsed.body.map((p, i) => (
              <p key={i} className={`mt-5 font-body text-lg leading-relaxed ${i === 0 ? "drop-cap" : ""}`}>
                {p}
              </p>
            ))}
            {parsed.quote && (
              <blockquote className="mt-8 border-l border-rust pl-5">
                <p className="headline text-2xl italic">{parsed.quote}</p>
              </blockquote>
            )}
            <p className="mt-6 kicker text-xs text-muted">Por Team Vander</p>
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
