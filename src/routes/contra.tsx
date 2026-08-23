import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contra")({
  component: ContraLayout,
});

function ContraLayout() {
  return <Outlet />;
}
