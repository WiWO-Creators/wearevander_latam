import { createFileRoute, Navigate } from "@tanstack/react-router";
import { franchiseAuthors } from "@/lib/content";

export const Route = createFileRoute("/contra/autor/")({
  component: function ContraAutorIndex() {
    const first = franchiseAuthors("contra")[0];
    if (first) return <Navigate to="/contra/autor/$autor" params={{ autor: first.id }} />;
    return <Navigate to="/contra" />;
  },
  head: () => ({ meta: [{ title: "Firmas — Contra la corriente" }] }),
});
