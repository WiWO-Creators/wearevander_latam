import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as RedirectToSignIn, s as useCurrentUserState } from "./router-DC-BlURD.mjs";
import { t as askVander } from "./magazine-By1CzbNF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/briefing-AOpxNuK8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BriefingPage() {
	const { user, isPending } = useCurrentUserState();
	const [topic, setTopic] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [text, setText] = (0, import_react.useState)("");
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-72 animate-pulse bg-dust" })
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			const result = await askVander({ data: topic });
			if (result.ok) setText(result.text);
			else setError(result.error);
		} catch {
			setError("Entra de nuevo para filar con la mesa.");
		} finally {
			setBusy(false);
		}
	}
	const parsed = parseBriefing(text);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: "Mesa de editores"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-extrabold uppercase tracking-tight",
					children: "El Briefing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-body text-base leading-relaxed text-ink-soft",
					children: "Nombra una compañía, una ciudad, un cambio. Armamos una nota Vander: antetítulo, titular, argumento."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void onSubmit(e),
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "topic",
							children: "Tema"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "topic",
							value: topic,
							onChange: (e) => setTopic(e.target.value),
							placeholder: "ej. oficinas analógicas en Seúl",
							className: "h-12 w-full border-b-2 border-ink bg-transparent font-display text-xl outline-none placeholder:text-muted focus:border-rust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || topic.trim().length < 3,
							className: "mt-5 h-11 bg-ink px-6 font-kicker text-xs tracking-widest text-paper uppercase hover:opacity-90 disabled:opacity-40",
							children: busy ? "Filando…" : "Pedir briefing"
						})
					]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-display text-sm text-rust",
					children: error
				}),
				parsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-10 border-t border-ink pt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker text-xs text-rust",
							children: parsed.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight",
							children: parsed.headline
						}),
						parsed.dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-body text-lg text-ink-soft",
							children: parsed.dek
						}),
						parsed.body.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-5 font-body text-lg leading-relaxed ${i === 0 ? "drop-cap" : ""}`,
							children: p
						}, i)),
						parsed.quote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "mt-8 border-l-4 border-rust pl-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-extrabold",
								children: parsed.quote
							})
						})
					]
				}),
				text && !parsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "mt-10 whitespace-pre-wrap border-t border-ink pt-8 font-body text-lg leading-relaxed",
					children: text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/list",
					className: "mt-10 inline-block kicker text-xs text-muted hover:text-rust",
					children: "O lee el Vander 20"
				})
			]
		})
	});
}
function parseBriefing(raw) {
	if (!raw.trim()) return null;
	const kicker = pick(raw, "KICKER");
	const headline = pick(raw, "HEADLINE");
	if (!headline) return null;
	const dek = pick(raw, "DEK");
	const bodyRaw = pick(raw, "BODY") ?? "";
	const quote = pick(raw, "QUOTE");
	const body = bodyRaw.split(/\n+/).map((s) => s.trim()).filter(Boolean);
	return {
		kicker: kicker ?? "Briefing",
		headline,
		dek,
		body,
		quote
	};
}
function pick(raw, label) {
	const re = new RegExp(`${label}\\s*[:\\-–]\\s*([\\s\\S]*?)(?=(?:KICKER|HEADLINE|DEK|BODY|QUOTE)\\s*[:\\-–]|$)`, "i");
	return raw.match(re)?.[1]?.trim() ?? null;
}
//#endregion
export { BriefingPage as component };
