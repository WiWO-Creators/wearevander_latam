export function FaqBlock({
  items,
  title = "Preguntas frecuentes",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mt-14 border-t border-ink pt-10">
      <h2 className="headline text-3xl sm:text-4xl">{title}</h2>
      <dl className="mt-6 space-y-6">
        {items.map((f) => (
          <div key={f.q}>
            <dt className="headline text-xl sm:text-2xl">{f.q}</dt>
            <dd className="mt-2 reading text-ink-soft">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Tldr({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside className="mt-8 border border-ink bg-paper-deep px-4 py-5 sm:px-6">
      <p className="kicker text-xs text-rust">TL;DR</p>
      <ul className="mt-3 space-y-2">
        {items.map((t) => (
          <li key={t} className="font-body text-base leading-snug text-ink sm:text-lg">
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function Crumbs({
  items,
  tone = "light",
}: {
  items: { label: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <nav
      aria-label="Migas"
      className={
        tone === "dark"
          ? "kicker text-[11px] tracking-wider text-silver uppercase"
          : "kicker text-[11px] tracking-wider text-muted uppercase"
      }
    >
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 ? <span className="mx-2 text-muted">/</span> : null}
          {it.href ? (
            <a href={it.href} className="hover:text-rust">
              {it.label}
            </a>
          ) : (
            <span>{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
