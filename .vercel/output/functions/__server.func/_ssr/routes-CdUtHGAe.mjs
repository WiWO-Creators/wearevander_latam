import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as leadBySection, c as ARTICLES, d as ISSUE, i as VANDER_LIST, u as BRIEFS, x as popularArticles, y as latestArticles } from "./router-DC-BlURD.mjs";
import { a as NumberedItem, c as TextCard, i as MiniLead, n as HeroStory, o as RailItem, r as HorizontalCard, s as StackedCard, t as BriefRow } from "./article-card-CYMdgNtX.mjs";
import { t as Newsletter } from "./newsletter-BQBlV7h8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CdUtHGAe.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const ordered = latestArticles(24);
	const hero = ARTICLES.find((a) => a.featured) ?? ordered[0];
	const used = /* @__PURE__ */ new Set([hero.slug]);
	const rail = take(ordered, used, 6);
	const popular = popularArticles(5);
	const mid = take(ordered, used, 2);
	const sectionLeads = leadBySection().filter((a) => a.slug !== hero.slug);
	sectionLeads.forEach((a) => used.add(a.slug));
	const more = take(ordered, used, 6);
	const desk = take(ordered, used, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-5 px-4 py-4 sm:px-6 lg:grid-cols-12 lg:gap-7 lg:py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStory, { article: hero })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:col-span-4 lg:border-l lg:border-rule lg:pl-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker mb-1 text-xs text-muted",
					children: "En portada"
				}), rail.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailItem, { article: a }, a.slug))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-12 lg:gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "kicker border-b border-ink pb-2 text-xs text-rust",
							children: "Lo más leído"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: popular.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberedItem, {
							article: a,
							rank: i + 1
						}) }, a.slug)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:col-span-5",
						children: mid.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackedCard, { article: a }, a.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "kicker border-b border-ink pb-2 text-xs text-rust",
							children: "Al minuto"
						}), BRIEFS.slice(0, 8).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefRow, { brief: b }, b.id))]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-5 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-end justify-between border-b border-ink pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-extrabold uppercase tracking-tight",
					children: "Por sección"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "kicker hidden text-xs text-muted sm:block",
					children: [
						ISSUE.date,
						" · ",
						ISSUE.city
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-5",
				children: sectionLeads.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniLead, { article: a }, a.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink px-4 py-7 text-paper sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs text-rust",
						children: "Ranking 2026"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl",
						children: "Vander 20"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/list",
						className: "kicker text-xs text-paper hover:text-rust",
						children: "Ver la lista"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 grid gap-x-8 border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-4",
					children: VANDER_LIST.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-12 items-baseline gap-2 border-b border-paper/20 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-3 font-display text-xs font-extrabold tabular-nums text-rust",
							children: String(c.rank).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-9 truncate font-display text-xs font-extrabold uppercase sm:text-sm",
							children: c.name
						})]
					}, c.rank))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between border-b border-ink pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-extrabold uppercase tracking-tight",
						children: "Más historias"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/section/$section",
						params: { section: "work" },
						className: "kicker text-xs text-rust",
						children: "Trabajo"
					})]
				}), more.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalCard, { article: a }, a.slug))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:col-span-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 border-b border-ink pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-extrabold uppercase tracking-tight",
							children: "El escritorio"
						})
					}),
					desk.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextCard, { article: a }, a.slug)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, { compact: true })
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {})
	] });
}
function take(pool, used, n) {
	const out = pool.filter((a) => !used.has(a.slug)).slice(0, n);
	out.forEach((a) => used.add(a.slug));
	return out;
}
//#endregion
export { Home as component };
