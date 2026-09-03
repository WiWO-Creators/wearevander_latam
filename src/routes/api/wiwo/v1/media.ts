import { createFileRoute } from "@tanstack/react-router";
import { createMediaHandlers } from "@wiwo/contract/server";
import { wiwoSite } from "@/lib/wiwo/site";

/**
 * Responsabilidad: montar el endpoint que RECIBE archivos del contrato.
 * Usado por: el orquestador (wiwo.doom), al subir la imagen de una nota.
 * NO hace: nada propio. La autenticación, los formatos aceptados y el tope de
 *   tamaño viven en @wiwo/contract/server y son idénticos en todos los sitios;
 *   lo único de este sitio es dónde guarda, que declara lib/wiwo/site.ts.
 */
export const Route = createFileRoute("/api/wiwo/v1/media")({
  server: { handlers: createMediaHandlers(wiwoSite) },
});
