import { useEffect, useState } from "react";
import { BookOpen, Moon, Sun } from "lucide-react";
import { applyTheme, isTheme, nextTheme, readTheme, THEME_COPY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const ICONS = {
  light: Sun,
  paper: BookOpen,
  ink: Moon,
} as const;

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const fromDom = document.documentElement.getAttribute("data-theme");
    const current = isTheme(fromDom) ? fromDom : readTheme();
    setTheme(current);
    applyTheme(current);
  }, []);

  function cycle() {
    setTheme((prev) => {
      const next = nextTheme(prev);
      applyTheme(next);
      return next;
    });
  }

  const Icon = ICONS[theme];
  const copy = THEME_COPY[theme];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Tema ${copy.label}. Cambiar a ${copy.next}`}
      title={`${copy.label} · siguiente: ${copy.next}`}
      className={cn("press grid size-11 shrink-0 place-items-center", className)}
    >
      <Icon className="size-5" strokeWidth={1.5} />
    </button>
  );
}
