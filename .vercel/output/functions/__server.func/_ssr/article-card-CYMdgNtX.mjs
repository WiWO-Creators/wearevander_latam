import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getAuthor, a as cn, h as formatShortDate, v as getSectionLabel } from "./router-DC-BlURD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article-card-CYMdgNtX.js
var import_jsx_runtime = require_jsx_runtime();
function HeroStory({ article }) {
	const author = getAuthor(article.authorId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/story/$slug",
			params: { slug: article.slug },
			className: "group block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.image,
				alt: article.imageAlt,
				className: "aspect-video w-full object-cover"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker mt-2 text-xs text-rust",
			children: article.kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 font-display text-3xl font-extrabold leading-none tracking-tight sm:text-5xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/story/$slug",
				params: { slug: article.slug },
				className: "hover:text-rust",
				children: article.title
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-body text-base leading-snug text-ink-soft sm:text-lg",
			children: article.dek
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 font-display text-xs font-medium text-muted",
			children: [
				"Por ",
				author?.name,
				" · ",
				formatShortDate(article.publishedAt),
				" · ",
				article.readMinutes,
				" min"
			]
		})
	] });
}
function RailItem({ article }) {
	const author = getAuthor(article.authorId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid grid-cols-12 gap-3 border-b border-rule py-2.5 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: article.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-0.5 font-display text-sm font-extrabold leading-tight tracking-tight sm:text-base",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/story/$slug",
						params: { slug: article.slug },
						className: "hover:text-rust",
						children: article.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-xs text-muted",
					children: [
						author?.name,
						" · ",
						formatShortDate(article.publishedAt)
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/story/$slug",
			params: { slug: article.slug },
			className: "col-span-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.image,
				alt: "",
				className: "aspect-square w-full object-cover sm:aspect-[4/3]"
			})
		})]
	});
}
function StackedCard({ article, large = false }) {
	const author = getAuthor(article.authorId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/story/$slug",
		params: { slug: article.slug },
		className: "group block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.image,
				alt: article.imageAlt,
				className: cn("w-full object-cover", large ? "aspect-video" : "aspect-[3/2]")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker mt-2 text-xs text-rust",
				children: article.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: cn("mt-1 font-display font-extrabold leading-tight tracking-tight", large ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"),
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 line-clamp-2 font-body text-sm leading-snug text-ink-soft",
				children: article.dek
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 font-display text-xs text-muted",
				children: [
					author?.name,
					" · ",
					article.readMinutes,
					" min"
				]
			})
		]
	}) });
}
function HorizontalCard({ article }) {
	const author = getAuthor(article.authorId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid grid-cols-12 items-start gap-3 border-t border-rule py-3 first:border-t-0 first:pt-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/story/$slug",
			params: { slug: article.slug },
			className: "col-span-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.image,
				alt: article.imageAlt,
				className: "aspect-[4/3] w-full object-cover"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: article.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-base font-extrabold leading-tight sm:text-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/story/$slug",
						params: { slug: article.slug },
						className: "hover:text-rust",
						children: article.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 hidden font-body text-sm leading-snug text-ink-soft sm:line-clamp-2 sm:block",
					children: article.dek
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-xs text-muted",
					children: [
						author?.name,
						" · ",
						formatShortDate(article.publishedAt),
						" · ",
						article.readMinutes,
						" min"
					]
				})
			]
		})]
	});
}
function TextCard({ article }) {
	const author = getAuthor(article.authorId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border-t border-rule py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker text-xs text-rust",
				children: article.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-base font-extrabold leading-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/story/$slug",
					params: { slug: article.slug },
					className: "hover:text-rust",
					children: article.title
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xs text-muted",
				children: author?.name
			})
		]
	});
}
function NumberedItem({ article, rank }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid grid-cols-12 items-start gap-2 border-b border-rule py-2.5 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "col-span-2 font-display text-xl font-extrabold tabular-nums leading-none text-rust",
			children: String(rank).padStart(2, "0")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker text-xs text-muted",
				children: getSectionLabel(article.section)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-0.5 font-display text-sm font-extrabold leading-tight sm:text-base",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/story/$slug",
					params: { slug: article.slug },
					className: "hover:text-rust",
					children: article.title
				})
			})]
		})]
	});
}
function MiniLead({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/story/$slug",
		params: { slug: article.slug },
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: article.image,
				alt: article.imageAlt,
				className: "aspect-[3/2] w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker mt-2 text-xs text-rust",
				children: getSectionLabel(article.section)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-sm font-extrabold leading-tight sm:text-base",
				children: article.title
			})
		]
	}) });
}
function BriefRow({ brief }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex gap-3 border-b border-rule py-2 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "kicker w-12 shrink-0 text-xs text-rust",
			children: brief.time
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-sm font-bold leading-snug",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/story/$slug",
				params: { slug: brief.slug },
				className: "hover:text-rust",
				children: brief.title
			})
		})]
	});
}
//#endregion
export { NumberedItem as a, TextCard as c, MiniLead as i, HeroStory as n, RailItem as o, HorizontalCard as r, StackedCard as s, BriefRow as t };
