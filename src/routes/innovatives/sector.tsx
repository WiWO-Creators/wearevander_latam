import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/innovatives/sector")({
  component: () => <Outlet />,
});
