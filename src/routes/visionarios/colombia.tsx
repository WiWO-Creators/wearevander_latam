import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/visionarios/colombia")({
  component: () => <Outlet />,
});
