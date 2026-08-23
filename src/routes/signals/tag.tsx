import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/signals/tag")({
  component: () => <Outlet />,
});
