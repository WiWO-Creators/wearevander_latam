import { createFileRoute, Navigate } from "@tanstack/react-router";
import { innovSectors } from "@/lib/innovatives";

export const Route = createFileRoute("/innovatives/sector/")({
  component: function InnovSectorsIndex() {
    const first = innovSectors()[0];
    if (first) return <Navigate to="/innovatives/sector/$sector" params={{ sector: first.slug }} />;
    return null;
  },
  head: () => ({ meta: [{ title: "Sectores — 50 Innovatives" }] }),
});
