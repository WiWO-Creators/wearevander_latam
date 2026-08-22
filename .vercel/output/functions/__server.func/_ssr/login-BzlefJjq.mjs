import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn } from "./client-sGid3STf.mjs";
import { t as GROK_PROVIDERS } from "./server-C1NAU_b2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BzlefJjq.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-12 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md border border-ink px-6 py-10 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-xs text-rust",
					children: "Miembros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-extrabold uppercase tracking-tight",
					children: "Entra al escritorio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-body text-sm leading-relaxed text-ink-soft",
					children: "Guarda historias y pide un briefing a la mesa. We Are Vander. We Love Business."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL: "/" }),
						className: "h-11 border border-ink bg-paper font-kicker text-xs tracking-widest text-ink uppercase hover:bg-ink hover:text-paper",
						children: ["Continuar con ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-block kicker text-xs text-muted hover:text-rust",
					children: "Volver al número"
				})
			]
		})
	});
}
//#endregion
export { Login as component };
