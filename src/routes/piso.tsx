import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/piso")({
  component: () => <Navigate to="/channels" replace />,
});
