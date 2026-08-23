import { createFileRoute } from "@tanstack/react-router";
import { ingestMarkets } from "@/lib/markets/ingest";

export const Route = createFileRoute("/api/markets/ingest")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const secret = process.env.CRON_SECRET;
        if (secret) {
          const auth = request.headers.get("authorization");
          const vercel = request.headers.get("x-vercel-cron");
          if (auth !== `Bearer ${secret}` && vercel !== "1") {
            return Response.json({ error: "unauthorized" }, { status: 401 });
          }
        }
        const snapshot = await ingestMarkets();
        return Response.json({
          ok: true,
          mode: snapshot.mode,
          generated_at: snapshot.generated_at,
          published: snapshot.instruments.filter((i) => i.status === "ok" || i.status === "stale").length,
          rejected: snapshot.instruments.filter((i) => i.status === "rejected_validation").length,
        });
      },
    },
  },
});
