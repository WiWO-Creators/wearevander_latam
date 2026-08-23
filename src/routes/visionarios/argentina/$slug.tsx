import { createFileRoute } from "@tanstack/react-router";
import { VOLUME_AR } from "@/lib/visionarios";
import { VisionariosProfile, profileHead } from "@/components/visionarios-pack";

export const Route = createFileRoute("/visionarios/argentina/$slug")({
  component: Page,
  head: ({ params }) => profileHead(VOLUME_AR, params.slug),
});

function Page() {
  const { slug } = Route.useParams();
  return <VisionariosProfile volume={VOLUME_AR} slug={slug} />;
}
