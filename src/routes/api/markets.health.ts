import { createFileRoute } from "@tanstack/react-router";
import { readHealth } from "@/lib/markets/store";
import { cachedOrEmpty } from "@/lib/markets/ingest";

export const Route = createFileRoute("/api/markets/health")({
  server: {
    handlers: {
      GET: () => {
        const snap = cachedOrEmpty();
        const stored = readHealth();
        return Response.json(
          stored ?? {
            ok: snap.mode === "widget",
            generated_at: snap.generated_at,
            mode: snap.mode,
            session_state: snap.session_state,
            sources: [],
            instruments: snap.instruments.map((i) => ({
              id: i.id,
              status: i.status,
              reason: i.reason,
              as_of: i.as_of,
            })),
          },
        );
      },
    },
  },
});
