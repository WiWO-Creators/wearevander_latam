import { o as __toESM } from "./_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Bookmark } from "./_libs/lucide-react.mjs";
import { S as relatedArticles, _ as getAuthor, a as cn, g as getArticle, m as formatIssueDate, n as Route$1, s as useCurrentUserState, v as getSectionLabel } from "./_ssr/router-DC-BlURD.mjs";
import { s as StackedCard } from "./_ssr/article-card-CYMdgNtX.mjs";
import { i as toggleSavedStory, n as getSavedSlugs } from "./_ssr/magazine-By1CzbNF.mjs";
import { t as Newsletter } from "./_ssr/newsletter-BQBlV7h8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Ch-hesK3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SaveButton({ slug, saved, onChange, className }) {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [local, setLocal] = (0, import_react.useState)(saved);
	(0, import_react.useEffect)(() => {
		setLocal(saved);
	}, [saved]);
	async function onClick() {
		if (isPending) return;
		if (!user) {
			navigate({ to: "/login" });
			return;
		}
		setBusy(true);
		try {
			const result = await toggleSavedStory({ data: slug });
			setLocal(result.saved);
			onChange?.(result.saved);
		} catch {
			navigate({ to: "/login" });
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void onClick(),
		disabled: busy,
		"aria-label": local ? "Sacar de guardados" : "Guardar historia",
		className: cn("inline-flex h-11 min-w-11 items-center gap-2 text-ink transition-opacity duration-150 hover:opacity-70 disabled:opacity-50", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
			className: "size-5",
			strokeWidth: 1.5,
			fill: local ? "currentColor" : "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "kicker hidden text-xs sm:inline",
			children: local ? "Guardado" : "Guardar"
		})]
	});
}
function StoryPage() {
	const { slug } = Route$1.useParams();
	const article = getArticle(slug);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getSavedSlugs().then((slugs) => {
			if (!cancelled) setSaved(slugs.includes(slug));
		});
		return () => {
			cancelled = true;
		};
	}, [slug]);
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-6 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker text-xs text-rust",
				children: "Fuera de edición"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-3xl font-extrabold uppercase",
				children: "Esta historia no está en el número."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-block kicker text-xs text-ink underline",
				children: "Volver al número"
			})
		]
	});
	const author = getAuthor(article.authorId);
	const related = relatedArticles(article.slug, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "px-4 py-8 sm:px-6 sm:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "kicker text-xs text-rust",
							children: [
								article.kicker,
								" · ",
								getSectionLabel(article.section)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl font-extrabold leading-none tracking-tight sm:text-6xl",
							children: article.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-body text-lg leading-snug text-ink-soft sm:text-xl",
							children: article.dek
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-rule py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [author && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: author.image,
									alt: "",
									className: "size-12 object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm font-extrabold",
									children: author?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-xs text-muted",
									children: [
										formatIssueDate(article.publishedAt),
										" · ",
										article.readMinutes,
										" min de lectura"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
								slug: article.slug,
								saved,
								onChange: setSaved
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "mx-auto mt-6 max-w-5xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: article.image,
						alt: article.imageAlt,
						className: "aspect-[16/9] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-2 font-display text-xs text-muted",
						children: article.caption
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-8 max-w-2xl",
					children: article.body.map((block, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						block,
						drop: i === 0
					}, i))
				}),
				author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "mx-auto mt-12 max-w-2xl border border-ink p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs text-muted",
						children: "La firma"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: author.image,
							alt: "",
							className: "size-20 object-cover sm:size-24"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-extrabold",
								children: author.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "kicker mt-1 text-xs text-rust",
								children: [
									author.role,
									" · ",
									author.city
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-body text-sm leading-relaxed text-ink-soft",
								children: author.bio
							})
						] })]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-ink px-4 py-10 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-extrabold uppercase tracking-tight",
					children: "Sigue leyendo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-6 md:grid-cols-3",
					children: related.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackedCard, { article: a }, a.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {})
	] });
}
function Block({ block, drop }) {
	if (block.type === "h2") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mt-10 mb-3 font-display text-2xl font-extrabold tracking-tight",
		children: block.text
	});
	if (block.type === "quote") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
		className: "my-8 border-l-4 border-rust pl-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-extrabold leading-tight tracking-tight",
			children: block.text
		}), block.cite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "mt-2 kicker text-xs text-muted",
			children: block.cite
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `mb-5 font-body text-lg leading-relaxed text-ink ${drop ? "drop-cap" : ""}`,
		children: block.text
	});
}
//#endregion
export { StoryPage as component };
