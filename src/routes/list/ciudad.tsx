import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/list/ciudad")({
  component: () => <Outlet />,
});
