import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Bdm2NIv9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/magazine-By1CzbNF.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSavedSlugs = createServerFn({ method: "GET" }).handler(createSsrRpc("1809b4c7b7d18b727f00bc3ba097224b5e0e9434f94491ee925c662e5bfc69c8"));
var toggleSavedStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((slug) => slug.trim()).handler(createSsrRpc("a8a98129034a1f75799f867cd5f39ba606e06516149cfbb749a54a15bf6b2b3f"));
var subscribeNewsletter = createServerFn({ method: "POST" }).validator((email) => email.trim().toLowerCase()).handler(createSsrRpc("9368d403e2978e27d5105d6c9f6901ffcd09ebbdef3adda8415f8a39ee4218d2"));
var askVander = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((topic) => topic.trim().slice(0, 280)).handler(createSsrRpc("ffd8807b3302d4f5db3d7eefbd5152b18091d8edc2b5d49cd8703f72f11c6f4f"));
//#endregion
export { toggleSavedStory as i, getSavedSlugs as n, subscribeNewsletter as r, askVander as t };
