import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/signals")({
  component: SignalsLayout,
});

function SignalsLayout() {
  return <Outlet />;
}
