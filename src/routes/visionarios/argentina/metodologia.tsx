import { createFileRoute } from "@tanstack/react-router";
import { VOLUME_AR } from "@/lib/visionarios";
import { VisionariosMethod, methodHead } from "@/components/visionarios-pack";

export const Route = createFileRoute("/visionarios/argentina/metodologia")({
  component: () => <VisionariosMethod volume={VOLUME_AR} />,
  head: () => methodHead(VOLUME_AR),
});
