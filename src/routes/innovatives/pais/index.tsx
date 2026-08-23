import { createFileRoute, Navigate } from "@tanstack/react-router";
import { innovCountries } from "@/lib/innovatives";

export const Route = createFileRoute("/innovatives/pais/")({
  component: function InnovPaisIndex() {
    const first = innovCountries()[0];
    if (first) return <Navigate to="/innovatives/pais/$pais" params={{ pais: first.slug }} />;
    return null;
  },
  head: () => ({ meta: [{ title: "Países — 50 Innovatives" }] }),
});
