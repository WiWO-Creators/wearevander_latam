import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/list")({
  component: ListLayout,
});

function ListLayout() {
  return <Outlet />;
}
