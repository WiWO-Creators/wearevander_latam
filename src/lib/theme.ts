export const THEMES = ["light", "paper", "ink"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_COPY: Record<Theme, { label: string; next: string }> = {
  light: { label: "Claro", next: "Papel" },
  paper: { label: "Papel", next: "Noche" },
  ink: { label: "Noche", next: "Claro" },
};

export function isTheme(v: string | null): v is Theme {
  return v === "light" || v === "paper" || v === "ink";
}

export function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("vander-theme");
    if (isTheme(stored)) return stored;
  } catch {
    /* private mode */
  }
  return "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("vander-theme", theme);
  } catch {
    /* private mode */
  }
}

export function nextTheme(theme: Theme): Theme {
  return THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
}

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("vander-theme");if(t==="paper"||t==="ink"||t==="light")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
