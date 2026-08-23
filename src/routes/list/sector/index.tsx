import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { vanderSectors } from "@/lib/vander-list";

export const Route = createFileRoute("/list/sector/")({
  component: ListSectorsIndex,
  head: () => ({ meta: [{ title: "Sectores — Vander 20" }] }),
});

function ListSectorsIndex() {
  const first = vanderSectors()[0];
  if (first) return <Navigate to="/list/sector/$sector" params={{ sector: first.slug }} />;
  return (
    <main className="px-6 py-20 text-center">
      <Link to="/list" className="kicker text-xs underline">
        Vander 20
      </Link>
    </main>
  );
}
