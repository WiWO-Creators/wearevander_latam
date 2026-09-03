import { createFileRoute } from "@tanstack/react-router";
import { createMediaFileHandlers } from "@wiwo/contract/server";
import { wiwoSite } from "@/lib/wiwo/site";

/**
 * Responsabilidad: montar el endpoint que SIRVE los archivos subidos.
 * Usado por: cualquiera que lea una nota ilustrada — es la URL que quedó en el
 *   campo de imagen.
 * NO hace: no pide clave. La imagen de una nota la ve quien lee la nota;
 *   protegerla rompería la página para sus propios lectores.
 */
export const Route = createFileRoute("/api/wiwo/v1/media/$id")({
  server: { handlers: createMediaFileHandlers(wiwoSite) },
});
