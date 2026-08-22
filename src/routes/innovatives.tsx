import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/innovatives")({
  component: InnovativesLayout,
});

function InnovativesLayout() {
  return <Outlet />;
}
