import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/under40")({
  component: () => <Outlet />,
});
