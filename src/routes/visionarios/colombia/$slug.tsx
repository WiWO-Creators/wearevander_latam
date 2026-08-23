import { createFileRoute } from "@tanstack/react-router";
import { VOLUME_CO } from "@/lib/visionarios";
import { VisionariosProfile, profileHead } from "@/components/visionarios-pack";

export const Route = createFileRoute("/visionarios/colombia/$slug")({
  component: Page,
  head: ({ params }) => profileHead(VOLUME_CO, params.slug),
});

function Page() {
  const { slug } = Route.useParams();
  return <VisionariosProfile volume={VOLUME_CO} slug={slug} />;
}
