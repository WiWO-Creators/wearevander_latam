import { useEffect, useMemo, useState } from "react";
import { askMesa, listMesa, postMesa, type MesaComment } from "@/lib/server/mesa";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

function timeAgo(iso: string) {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const min = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return `hace ${d} d`;
}

export function StoryMesa({ slug }: { slug: string }) {
  const { user } = useCurrentUserState();
  const [comments, setComments] = useState<MesaComment[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [invite, setInvite] = useState(true);
  const [ask, setAsk] = useState("");
  const [busy, setBusy] = useState(false);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void listMesa({ data: slug }).then((rows) => {
      if (!cancelled) setComments(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (user?.displayName && !name) setName(user.displayName);
  }, [user, name]);

  const roots = useMemo(() => comments.filter((c) => !c.parentId && c.authorKind !== "grok"), [comments]);
  const byParent = useMemo(() => {
    const map = new Map<string, MesaComment[]>();
    for (const c of comments) {
      if (!c.parentId) continue;
      const list = map.get(c.parentId) ?? [];
      list.push(c);
      map.set(c.parentId, list);
    }
    return map;
  }, [comments]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await postMesa({
        data: { slug, name, body, inviteGrok: invite },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setComments((prev) => [...prev, result.comment, ...(result.grok ? [result.grok] : [])]);
      setBody("");
    } catch {
      setError("No se pudo sentar el comentario.");
    } finally {
      setBusy(false);
    }
  }

  async function submitAsk(e: React.FormEvent) {
    e.preventDefault();
    setAsking(true);
    setError(null);
    try {
      const result = await askMesa({ data: { slug, question: ask } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setComments((prev) => [
        ...prev,
        {
          id: result.questionId,
          slug,
          parentId: null,
          authorName: "Un lector",
          authorKind: "reader",
          body: ask,
          createdAt: new Date().toISOString(),
        },
        result.grok,
      ]);
      setAsk("");
    } catch {
      setError("Grok no contestó.");
    } finally {
      setAsking(false);
    }
  }

  return (
    <section className="mt-16 border-t-2 border-ink pt-10" aria-labelledby="mesa-title">
      <p className="kicker text-xs text-rust">La mesa</p>
      <h2 id="mesa-title" className="headline mt-2 text-4xl sm:text-5xl">
        Comentar esta nota
      </h2>
      <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft">
        Un comentario corto, como en una mesa de redacción. Si querés, Grok se sienta y responde con lo que dice la
        nota — no con lo que inventaría.
      </p>

      <form onSubmit={(e) => void submit(e)} className="mt-8 border border-ink bg-paper-deep p-4 sm:p-6">
        <label className="kicker text-[10px] text-muted" htmlFor="mesa-name">
          Nombre
        </label>
        <input
          id="mesa-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          required
          className="mt-1 h-11 w-full border-b border-ink bg-transparent font-sans text-sm outline-none"
          placeholder="Cómo te firmás"
        />
        <label className="kicker mt-5 block text-[10px] text-muted" htmlFor="mesa-body">
          Tu toma
        </label>
        <textarea
          id="mesa-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={400}
          required
          rows={4}
          className="mt-1 w-full resize-none border-b border-ink bg-transparent font-body text-base leading-relaxed outline-none"
          placeholder="Una frase que valga la mesa. No un hilo."
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 font-kicker text-[11px] tracking-wider uppercase">
            <input
              type="checkbox"
              checked={invite}
              onChange={(e) => setInvite(e.target.checked)}
              className="size-4 accent-rust"
            />
            Sentar a Grok
          </label>
          <button
            type="submit"
            disabled={busy}
            className="press kicker h-11 bg-void px-5 text-xs text-bleed hover:bg-rust disabled:opacity-40"
          >
            {busy ? (invite ? "Filando…" : "Publicando…") : "Publicar"}
          </button>
        </div>
      </form>

      <form onSubmit={(e) => void submitAsk(e)} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label className="kicker text-[10px] text-muted" htmlFor="mesa-ask">
            O preguntale a Grok sobre la nota
          </label>
          <input
            id="mesa-ask"
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            maxLength={400}
            className="mt-1 h-11 w-full border-b border-ink bg-transparent font-sans text-sm outline-none"
            placeholder="¿Qué cifra sostiene el argumento?"
          />
        </div>
        <button
          type="submit"
          disabled={asking}
          className="press kicker h-11 shrink-0 border border-ink px-5 text-xs hover:bg-void hover:text-bleed disabled:opacity-40"
        >
          {asking ? "Pensando…" : "Preguntar"}
        </button>
      </form>

      {error ? <p className="mt-4 font-body text-sm text-rust">{error}</p> : null}

      <ol className="mt-10 space-y-8">
        {roots.length === 0 && (
          <li className="font-body text-sm text-muted">Todavía nadie se sentó. La mesa está vacía.</li>
        )}
        {roots.map((c) => (
          <li key={c.id}>
            <CommentBlock comment={c} />
            {(byParent.get(c.id) ?? []).map((child) => (
              <div key={child.id} className="mt-4 border-l-2 border-rust pl-4 sm:pl-5">
                <CommentBlock comment={child} grok />
              </div>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}

function CommentBlock({ comment, grok }: { comment: MesaComment; grok?: boolean }) {
  const isGrok = grok || comment.authorKind === "grok";
  return (
    <div>
      <p className="kicker text-[10px] text-muted">
        <span className={cn(isGrok ? "text-rust" : "text-ink")}>{comment.authorName}</span>
        <span className="mx-2">·</span>
        {timeAgo(comment.createdAt)}
      </p>
      <p className={cn("mt-2 font-body leading-relaxed", isGrok ? "text-base text-ink-soft" : "reading text-ink")}>
        {comment.body}
      </p>
    </div>
  );
}
