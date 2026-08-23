import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/contra/tag/")({
  component: function ContraTagIndex() {
    return <Navigate to="/contra" />;
  },
  head: () => ({ meta: [{ title: "Contra la corriente" }] }),
});
