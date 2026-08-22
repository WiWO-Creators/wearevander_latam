import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export const getSavedSlugs = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const u = await getSessionUser();
    if (!u) return [] as string[];
    const sql = await getSql();
    const rows = await sql<{ slug: string }>`
      select slug from saved_stories where user_id = ${u.id} order by created_at desc
    `;
    return rows.map((r) => r.slug);
  },
);

export const toggleSavedStory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((slug: string) => slug.trim())
  .handler(async ({ context, data: slug }) => {
    if (!slug) return { saved: false as const };
    const sql = await getSql();
    const existing = await sql<{ slug: string }>`
      select slug from saved_stories
      where user_id = ${context.userId} and slug = ${slug}
    `;
    if (existing.length) {
      await sql`
        delete from saved_stories
        where user_id = ${context.userId} and slug = ${slug}
      `;
      return { saved: false as const };
    }
    await sql`
      insert into saved_stories (user_id, slug) values (${context.userId}, ${slug})
    `;
    return { saved: true as const };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .validator((email: string) => email.trim().toLowerCase())
  .handler(async ({ data: email }) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false as const, error: "Ese correo no se ve bien." };
    }
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const u = await getSessionUser();
    const sql = await getSql();
    await sql`
      insert into newsletter (email, user_id)
      values (${email}, ${u?.id ?? null})
      on conflict (email) do nothing
    `;
    return { ok: true as const };
  });

export const askVander = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((topic: string) => topic.trim().slice(0, 280))
  .handler(async ({ data: topic }) => {
    if (!topic) return { ok: false as const, error: "Danos un tema." };
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error: "El briefing no está disponible en este entorno.",
      };
    }
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "Eres un senior writer de We Are Vander, portal de innovación empresarial en español con el ojo de Fast Company y foco en América Latina (México, Brasil, Argentina, Colombia, Chile, Perú). Escribe un briefing: antetítulo, titular, bajada de una frase y 3-5 párrafos cortos de revista. Voz: específica, periodística, nunca corporativa, nunca hype, nunca emoji. Prefiere detalles nombrados (plausibles) y un punto de vista. Si el tema es una compañía o lugar real, sé factual; si es una tendencia, argumenta. Cierra con una cita atribuida a una fuente plausible. Salida en texto plano con etiquetas: KICKER / HEADLINE / DEK / BODY / QUOTE. Todo en español.",
          },
          {
            role: "user",
            content: `Escribe un briefing Vander sobre: ${topic}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: "La mesa no pudo filar. Prueba de nuevo." };
    }
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
