import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signals/tag/")({
  component: function SignalsTagIndex() {
    return <Navigate to="/signals" />;
  },
  head: () => ({ meta: [{ title: "Signals" }] }),
});
