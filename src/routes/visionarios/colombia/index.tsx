import { createFileRoute } from "@tanstack/react-router";
import { VOLUME_CO } from "@/lib/visionarios";
import { VisionariosIndex, volumeHead } from "@/components/visionarios-pack";

export const Route = createFileRoute("/visionarios/colombia/")({
  component: () => <VisionariosIndex volume={VOLUME_CO} />,
  head: () => volumeHead(VOLUME_CO),
});
