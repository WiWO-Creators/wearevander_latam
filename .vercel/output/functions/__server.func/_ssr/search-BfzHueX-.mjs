import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as searchArticles } from "./router-DC-BlURD.mjs";
import { r as HorizontalCard } from "./article-card-CYMdgNtX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BfzHueX-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const results = (0, import_react.useMemo)(() => searchArticles(q), [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: "Índice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-extrabold uppercase tracking-tight",
					children: "Buscar el número"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: "q",
					children: "Buscar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "q",
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Una compañía, una ciudad, un argumento…",
					className: "mt-6 h-12 w-full border-b-2 border-ink bg-transparent font-display text-xl font-medium outline-none placeholder:text-muted focus:border-rust"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 kicker text-xs text-muted",
					children: [
						results.length,
						" ",
						results.length === 1 ? "historia" : "historias"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: results.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalCard, { article: a }, a.slug))
				})
			]
		})
	});
}
//#endregion
export { SearchPage as component };
