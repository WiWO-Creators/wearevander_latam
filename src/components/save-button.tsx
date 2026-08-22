import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { toggleSavedStory } from "@/lib/server/magazine";
import { cn } from "@/lib/utils";

export function SaveButton({
  slug,
  saved,
  onChange,
  className,
}: {
  slug: string;
  saved: boolean;
  onChange?: (next: boolean) => void;
  className?: string;
}) {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [busy, setBusy] = useState(false);
  const [local, setLocal] = useState(saved);

  useEffect(() => {
    setLocal(saved);
  }, [saved]);

  async function onClick() {
    if (isPending) return;
    if (!user) {
      void navigate({ to: "/login" });
      return;
    }
    setBusy(true);
    try {
      const result = await toggleSavedStory({ data: slug });
      setLocal(result.saved);
      onChange?.(result.saved);
    } catch {
      void navigate({ to: "/login" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      disabled={busy}
      aria-label={local ? "Sacar de guardados" : "Guardar historia"}
      className={cn(
        "inline-flex h-11 min-w-11 items-center gap-2 text-ink transition-opacity duration-150 hover:opacity-70 disabled:opacity-50",
        className,
      )}
    >
      <Bookmark
        className="size-5"
        strokeWidth={1.5}
        fill={local ? "currentColor" : "none"}
      />
      <span className="kicker hidden text-xs sm:inline">
        {local ? "Guardado" : "Guardar"}
      </span>
    </button>
  );
}
