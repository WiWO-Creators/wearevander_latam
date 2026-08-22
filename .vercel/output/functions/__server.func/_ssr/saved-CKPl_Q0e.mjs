import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as getArticle, o as RedirectToSignIn, s as useCurrentUserState } from "./router-DC-BlURD.mjs";
import { r as HorizontalCard } from "./article-card-CYMdgNtX.mjs";
import { n as getSavedSlugs } from "./magazine-By1CzbNF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-CKPl_Q0e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavedPage() {
	const { user, isPending } = useCurrentUserState();
	const [slugs, setSlugs] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getSavedSlugs().then(setSlugs);
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-64 animate-pulse bg-dust" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-28 animate-pulse bg-dust" })]
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const stories = (slugs ?? []).map((slug) => getArticle(slug)).filter((a) => a != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: "Tu estante"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-extrabold uppercase tracking-tight",
					children: "Guardados"
				}),
				slugs === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-28 animate-pulse bg-dust" }) : stories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-body text-base text-ink-soft",
					children: "Nada todavía. Abre una historia y toca guardar."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: stories.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalCard, { article: a }, a.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-8 inline-block kicker text-xs text-muted hover:text-rust",
					children: "Volver al número"
				})
			]
		})
	});
}
//#endregion
export { SavedPage as component };
