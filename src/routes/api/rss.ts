import { createFileRoute } from "@tanstack/react-router";
import { rssXml } from "@/lib/feed";

export const Route = createFileRoute("/api/rss")({
  server: {
    handlers: {
      GET: () =>
        new Response(rssXml(), {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, max-age=1800, stale-while-revalidate=86400",
          },
        }),
    },
  },
});
