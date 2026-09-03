import { createFileRoute, Navigate } from "@tanstack/react-router";
import { franchiseAuthors } from "@/lib/content";
import { getArticles } from "@/lib/articles";

export const Route = createFileRoute("/contra/autor/")({
  // La primera firma depende de qué columnas hay, y eso incluye las publicadas
  // por el orquestador.
  loader: () => getArticles(),
  component: function ContraAutorIndex() {
    const first = franchiseAuthors(Route.useLoaderData(), "contra")[0];
    if (first) return <Navigate to="/contra/autor/$autor" params={{ autor: first.id }} />;
    return <Navigate to="/contra" />;
  },
  head: () => ({ meta: [{ title: "Firmas — Contra la corriente" }] }),
});
