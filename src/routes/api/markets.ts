import { createFileRoute } from "@tanstack/react-router";
import { cachedOrEmpty } from "@/lib/markets/ingest";

export const Route = createFileRoute("/api/markets")({
  server: {
    handlers: {
      GET: () => Response.json(cachedOrEmpty()),
    },
  },
});
