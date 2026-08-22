import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ISSUE, l as AUTHORS } from "./router-DC-BlURD.mjs";
import { t as Newsletter } from "./newsletter-BQBlV7h8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DkcHD-22.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-10 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs text-rust",
						children: "La casa"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl font-extrabold tracking-tight uppercase sm:text-7xl",
						children: "We Are Vander"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 kicker text-xs text-muted",
						children: "We Love Business"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-body text-lg leading-relaxed text-ink-soft",
						children: "Revista de innovación empresarial con el ojo de un diario y la densidad de una revista. Negro, blanco, negocios. Fundada en Santiago, con mesas en Nueva York y Seúl."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-body text-base leading-relaxed text-ink-soft",
						children: [
							"Escribimos trabajo, diseño, clima y cultura como si el criterio fuera una línea del balance. ",
							ISSUE.title,
							" es el Volumen ",
							ISSUE.volume,
							", Número ",
							ISSUE.number,
							"."
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-ink px-4 py-10 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-extrabold uppercase tracking-tight",
					children: "Redacción"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
					children: AUTHORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.image,
							alt: a.name,
							className: "aspect-[3/4] w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl font-extrabold",
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "kicker mt-1 text-xs text-rust",
							children: [
								a.role,
								" · ",
								a.city
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-body text-sm leading-relaxed text-ink-soft",
							children: a.bio
						})
					] }, a.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {})
	] });
}
//#endregion
export { AboutPage as component };
