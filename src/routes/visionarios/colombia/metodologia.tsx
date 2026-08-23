import { createFileRoute } from "@tanstack/react-router";
import { VOLUME_CO } from "@/lib/visionarios";
import { VisionariosMethod, methodHead } from "@/components/visionarios-pack";

export const Route = createFileRoute("/visionarios/colombia/metodologia")({
  component: () => <VisionariosMethod volume={VOLUME_CO} />,
  head: () => methodHead(VOLUME_CO),
});
