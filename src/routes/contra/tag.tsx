import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contra/tag")({
  component: () => <Outlet />,
});
