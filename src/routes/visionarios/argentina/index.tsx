import { createFileRoute } from "@tanstack/react-router";
import { VOLUME_AR } from "@/lib/visionarios";
import { VisionariosIndex, volumeHead } from "@/components/visionarios-pack";

export const Route = createFileRoute("/visionarios/argentina/")({
  component: () => <VisionariosIndex volume={VOLUME_AR} />,
  head: () => volumeHead(VOLUME_AR),
});
