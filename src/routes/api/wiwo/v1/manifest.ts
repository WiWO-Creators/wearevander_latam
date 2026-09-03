import { createFileRoute } from "@tanstack/react-router";
import { buildManifest } from "@/lib/wiwo/manifest";
import { allArticles, canWriteMedia } from "@wiwo/contract/server";
import { wiwoSite } from "@/lib/wiwo/site";
import { jsonResponse, publicOrigin } from "@wiwo/contract";

/**
 * Responsabilidad: exponer el manifest del contrato wiwo.
 * Usado por: el orquestador (wiwo.doom), como primera llamada a este sitio.
 * NO hace: no contiene lógica; delega en lib/wiwo/manifest.
 *
 * Es lo primero que pide el orquestador: si esta ruta responde JSON con un campo
 * `contract`, el sitio habla el contrato. Cualquier otra cosa significa que no,
 * y el orquestador lo comprueba por el tipo de contenido y no por el código de
 * estado, porque hay sitios que responden 200 y HTML a rutas inexistentes.
 */
export const Route = createFileRoute("/api/wiwo/v1/manifest")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = publicOrigin(request);
        // El conteo incluye lo publicado por el orquestador: si solo contara el
        // archivo del repositorio, el orquestador creería que el sitio tiene
        // menos notas de las que le va a entregar.
        const todas = await allArticles(wiwoSite, origin);
        return jsonResponse(buildManifest(origin, todas.length, canWriteMedia(wiwoSite)));
      },
    },
  },
});
