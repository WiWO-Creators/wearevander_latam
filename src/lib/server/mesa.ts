import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { articleContext, getArticle } from "@/lib/content";

export type MesaComment = {
  id: string;
  slug: string;
  parentId: string | null;
  authorName: string;
  authorKind: "reader" | "grok";
  body: string;
  createdAt: string;
};

function newId() {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function cleanName(raw: string) {
  return raw.replace(/\s+/g, " ").trim().slice(0, 40);
}

function cleanBody(raw: string) {
  return raw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 400);
}

export const listMesa = createServerFn({ method: "GET" })
  .validator((slug: string) => slug.trim().slice(0, 80))
  .handler(async ({ data: slug }): Promise<MesaComment[]> => {
    if (!slug) return [] as MesaComment[];
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      slug: string;
      parent_id: string | null;
      author_name: string;
      author_kind: string;
      body: string;
      created_at: string;
    }>`
      select id, slug, parent_id, author_name, author_kind, body, created_at::text as created_at
      from story_comments
      where slug = ${slug}
      order by created_at asc
    `;
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      parentId: r.parent_id,
      authorName: r.author_name,
      authorKind: r.author_kind === "grok" ? "grok" : "reader",
      body: r.body,
      createdAt: r.created_at,
    }));
  });

export const postMesa = createServerFn({ method: "POST" })
  .validator((data: { slug: string; name: string; body: string; inviteGrok: boolean }) => ({
    slug: data.slug.trim().slice(0, 80),
    name: cleanName(data.name),
    body: cleanBody(data.body),
    inviteGrok: Boolean(data.inviteGrok),
  }))
  .handler(async ({ data }) => {
    if (!data.slug) return { ok: false as const, error: "Falta la nota." };
    if (data.name.length < 2) return { ok: false as const, error: "Pon un nombre." };
    if (data.body.length < 12) return { ok: false as const, error: "La toma es muy corta." };

    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser();
    const sql = await getSql();
    const id = newId();
    await sql`
      insert into story_comments (id, slug, parent_id, author_name, author_kind, user_id, body)
      values (${id}, ${data.slug}, ${null}, ${data.name}, ${"reader"}, ${user?.id ?? null}, ${data.body})
    `;

    let grok: MesaComment | null = null;
    if (data.inviteGrok) {
      grok = await seatGrok(sql, data.slug, id, data.body);
    }

    return {
      ok: true as const,
      comment: {
        id,
        slug: data.slug,
        parentId: null,
        authorName: data.name,
        authorKind: "reader" as const,
        body: data.body,
        createdAt: new Date().toISOString(),
      },
      grok,
    };
  });

export const askMesa = createServerFn({ method: "POST" })
  .validator((data: { slug: string; question: string }) => ({
    slug: data.slug.trim().slice(0, 80),
    question: cleanBody(data.question),
  }))
  .handler(async ({ data }) => {
    if (!data.slug) return { ok: false as const, error: "Falta la nota." };
    if (data.question.length < 8) return { ok: false as const, error: "La pregunta es muy corta." };
    const sql = await getSql();
    const qid = newId();
    await sql`
      insert into story_comments (id, slug, parent_id, author_name, author_kind, body)
      values (${qid}, ${data.slug}, ${null}, ${"Un lector"}, ${"reader"}, ${data.question})
    `;
    const grok = await seatGrok(sql, data.slug, qid, data.question);
    if (!grok) {
      return { ok: false as const, error: "Grok no está en la mesa ahora." };
    }
    return { ok: true as const, questionId: qid, grok };
  });

async function seatGrok(
  sql: Awaited<ReturnType<typeof getSql>>,
  slug: string,
  parentId: string,
  prompt: string,
): Promise<MesaComment | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;
  const article = getArticle(slug);
  if (!article) return null;

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      max_tokens: 220,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content:
            "Eres Grok, sentado en la mesa de We Are Vander. Un lector acaba de comentar una nota. Responde en español, 2 a 4 frases cortas, voz de redacción: específica, sin hype, sin emoji, sin adular. Si el comentario pide un dato que no está en la nota, dilo. No inventes cifras. Puedes discrepar. Firma implícita: Grok en la mesa.",
        },
        {
          role: "user",
          content: `NOTA\n${articleContext(article)}\n\nCOMENTARIO DEL LECTOR\n${prompt}`,
        },
      ],
    }),
  });
  if (!res.ok) return null;
  const body = (await res.json()) as { choices: { message: { content: string } }[] };
  const text = (body.choices[0]?.message.content ?? "").trim().slice(0, 700);
  if (!text) return null;
  const gid = newId();
  await sql`
    insert into story_comments (id, slug, parent_id, author_name, author_kind, body)
    values (${gid}, ${slug}, ${parentId}, ${"Grok · la mesa"}, ${"grok"}, ${text})
  `;
  return {
    id: gid,
    slug,
    parentId,
    authorName: "Grok · la mesa",
    authorKind: "grok",
    body: text,
    createdAt: new Date().toISOString(),
  };
}
