import { S as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { f as SECTIONS, p as articlesBySection, r as Route$2 } from "./_ssr/router-DC-BlURD.mjs";
import { n as HeroStory, s as StackedCard } from "./_ssr/article-card-CYMdgNtX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_section-C1Ib7rAG.js
var import_jsx_runtime = require_jsx_runtime();
function isSection(id) {
	return SECTIONS.some((s) => s.id === id);
}
function SectionPage() {
	const { section } = Route$2.useParams();
	if (!isSection(section)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-6 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-extrabold uppercase",
			children: "No hay esa mesa."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-6 inline-block kicker text-xs underline",
			children: "Volver al número"
		})]
	});
	const meta = SECTIONS.find((s) => s.id === section);
	const [lead, ...rest] = articlesBySection(section);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: "Sección"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl",
					children: meta.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl font-body text-base text-ink-soft",
					children: meta.dek
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 hairline" }),
				lead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStory, { article: lead })
				}),
				rest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3",
					children: rest.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackedCard, { article: a }, a.slug))
				})
			]
		})
	});
}
//#endregion
export { SectionPage as component };
