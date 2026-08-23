import { createFileRoute, Navigate } from "@tanstack/react-router";
import { vanderCities } from "@/lib/vander-list";

export const Route = createFileRoute("/list/ciudad/")({
  component: function ListCitiesIndex() {
    const first = vanderCities()[0];
    if (first) return <Navigate to="/list/ciudad/$city" params={{ city: first.slug }} />;
    return null;
  },
  head: () => ({ meta: [{ title: "Ciudades — Vander 20" }] }),
});
