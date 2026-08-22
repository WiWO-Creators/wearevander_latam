import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-Ck7vsVzX.mjs";
import { t as authMiddleware } from "./middleware-Bdm2NIv9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/magazine-87IXKXaU.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSavedSlugs_createServerFn_handler = createServerRpc({
	id: "1809b4c7b7d18b727f00bc3ba097224b5e0e9434f94491ee925c662e5bfc69c8",
	name: "getSavedSlugs",
	filename: "src/lib/server/magazine.ts"
}, (opts) => getSavedSlugs.__executeServer(opts));
var getSavedSlugs = createServerFn({ method: "GET" }).handler(getSavedSlugs_createServerFn_handler, async () => {
	const { getSessionUser } = await import("./verify.server-7ZKhzChi.mjs");
	const u = await getSessionUser();
	if (!u) return [];
	return (await (await getSql())`
      select slug from saved_stories where user_id = ${u.id} order by created_at desc
    `).map((r) => r.slug);
});
var toggleSavedStory_createServerFn_handler = createServerRpc({
	id: "a8a98129034a1f75799f867cd5f39ba606e06516149cfbb749a54a15bf6b2b3f",
	name: "toggleSavedStory",
	filename: "src/lib/server/magazine.ts"
}, (opts) => toggleSavedStory.__executeServer(opts));
var toggleSavedStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((slug) => slug.trim()).handler(toggleSavedStory_createServerFn_handler, async ({ context, data: slug }) => {
	if (!slug) return { saved: false };
	const sql = await getSql();
	if ((await sql`
      select slug from saved_stories
      where user_id = ${context.userId} and slug = ${slug}
    `).length) {
		await sql`
        delete from saved_stories
        where user_id = ${context.userId} and slug = ${slug}
      `;
		return { saved: false };
	}
	await sql`
      insert into saved_stories (user_id, slug) values (${context.userId}, ${slug})
    `;
	return { saved: true };
});
var subscribeNewsletter_createServerFn_handler = createServerRpc({
	id: "9368d403e2978e27d5105d6c9f6901ffcd09ebbdef3adda8415f8a39ee4218d2",
	name: "subscribeNewsletter",
	filename: "src/lib/server/magazine.ts"
}, (opts) => subscribeNewsletter.__executeServer(opts));
var subscribeNewsletter = createServerFn({ method: "POST" }).validator((email) => email.trim().toLowerCase()).handler(subscribeNewsletter_createServerFn_handler, async ({ data: email }) => {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
		ok: false,
		error: "Ese correo no se ve bien."
	};
	const { getSessionUser } = await import("./verify.server-7ZKhzChi.mjs");
	const u = await getSessionUser();
	await (await getSql())`
      insert into newsletter (email, user_id)
      values (${email}, ${u?.id ?? null})
      on conflict (email) do nothing
    `;
	return { ok: true };
});
var askVander_createServerFn_handler = createServerRpc({
	id: "ffd8807b3302d4f5db3d7eefbd5152b18091d8edc2b5d49cd8703f72f11c6f4f",
	name: "askVander",
	filename: "src/lib/server/magazine.ts"
}, (opts) => askVander.__executeServer(opts));
var askVander = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((topic) => topic.trim().slice(0, 280)).handler(askVander_createServerFn_handler, async ({ data: topic }) => {
	if (!topic) return {
		ok: false,
		error: "Danos un tema."
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "El briefing no está disponible en este entorno."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			temperature: .7,
			messages: [{
				role: "system",
				content: "Eres un senior writer de We Are Vander, revista de innovación empresarial en español con el ojo de Fast Company. Escribe un briefing: antetítulo, titular, bajada de una frase y 3-5 párrafos cortos de revista. Voz: específica, periodística, nunca corporativa, nunca hype, nunca emoji. Prefiere detalles nombrados (plausibles) y un punto de vista. Si el tema es una compañía o lugar real, sé factual; si es una tendencia, argumenta. Cierra con una cita atribuida a una fuente plausible. Salida en texto plano con etiquetas: KICKER / HEADLINE / DEK / BODY / QUOTE. Todo en español."
			}, {
				role: "user",
				content: `Escribe un briefing Vander sobre: ${topic}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "La mesa no pudo filar. Prueba de nuevo."
	};
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message.content ?? ""
	};
});
//#endregion
export { askVander_createServerFn_handler, getSavedSlugs_createServerFn_handler, subscribeNewsletter_createServerFn_handler, toggleSavedStory_createServerFn_handler };
