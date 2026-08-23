import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contra/autor")({
  component: () => <Outlet />,
});
