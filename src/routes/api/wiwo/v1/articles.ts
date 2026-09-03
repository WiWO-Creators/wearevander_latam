import { createFileRoute } from "@tanstack/react-router";
import { createArticlesHandlers } from "@wiwo/contract/server";
import { wiwoSite } from "@/lib/wiwo/site";

/**
 * Responsabilidad: montar el endpoint de notas del contrato en este sitio.
 * Usado por: el orquestador (wiwo.doom), después de leer el manifest.
 * NO hace: nada propio. El protocolo —paginación, validación, autenticación,
 *   fechas— vive en @wiwo/contract/server y tiene que ser idéntico en todos los
 *   sitios; lo único de este sitio es lo que declara lib/wiwo/site.ts.
 */
export const Route = createFileRoute("/api/wiwo/v1/articles")({
  server: { handlers: createArticlesHandlers(wiwoSite) },
});
