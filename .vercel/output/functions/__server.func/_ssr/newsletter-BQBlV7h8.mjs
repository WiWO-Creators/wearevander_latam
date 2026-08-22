import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as subscribeNewsletter } from "./magazine-By1CzbNF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newsletter-BQBlV7h8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Newsletter({ compact = false }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setStatus("idle");
		try {
			const result = await subscribeNewsletter({ data: email });
			if (result.ok) {
				setStatus("ok");
				setMessage("Quedaste en la lista. El próximo número llega primero por mail.");
				setEmail("");
			} else {
				setStatus("err");
				setMessage(result.error);
			}
		} catch {
			setStatus("err");
			setMessage("No pudimos anotar esa dirección.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: compact ? void 0 : "boletin",
		className: compact ? "border border-ink bg-ink px-5 py-6 text-paper" : "border-t border-ink bg-ink px-4 py-10 text-paper sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: compact ? "" : "mx-auto max-w-7xl lg:flex lg:items-end lg:justify-between lg:gap-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs text-rust",
						children: "Boletín"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-extrabold tracking-tight uppercase",
						children: "Un mail. Cero feed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl font-body text-sm leading-relaxed text-paper/75",
						children: "La mesa de Santiago resume la semana: compañías, clima, trabajo. We Are Vander. We Love Business."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void onSubmit(e),
					className: "mt-6 flex w-full max-w-xl flex-col gap-2 sm:flex-row lg:mt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: compact ? "newsletter-email-compact" : "newsletter-email",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: compact ? "newsletter-email-compact" : "newsletter-email",
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "Tu correo",
							className: "h-11 flex-1 border border-paper/40 bg-transparent px-3 font-display text-sm text-paper placeholder:text-paper/40 outline-none focus:border-rust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "h-11 bg-rust px-6 font-kicker text-xs tracking-widest text-paper uppercase hover:opacity-90 disabled:opacity-60",
							children: busy ? "Enviando…" : "Suscribirme"
						})
					]
				}),
				status !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mt-3 font-display text-sm ${status === "ok" ? "text-paper/80" : "text-rust"}`,
					children: message
				})
			]
		})
	});
}
//#endregion
export { Newsletter as t };
