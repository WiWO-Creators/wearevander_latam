import { createArticleStore, createMediaStore, type WiwoSiteConfig } from "@wiwo/contract/server";
import { getSql } from "@/lib/db";
import { ARTICLES } from "@/lib/content";
import { buildFields } from "./manifest";

/**
 * Responsabilidad: decirle al contrato lo único que este sitio tiene de propio —
 * dónde guarda, qué archivo tiene, qué campos exige y cómo son sus URLs.
 * Usado por: routes/api/wiwo/v1/, y lib/articles.ts para leer lo publicado.
 * NO hace: no implementa el protocolo, que vive en @wiwo/contract/server y es
 *   idéntico en todos los sitios. Tampoco traduce: el archivo ya está en la
 *   forma del contrato.
 *
 * Es el único archivo que hay que escribir para conectar un sitio nuevo.
 */

/** Las notas publicadas por el orquestador. */
export const articleStore = createArticleStore(getSql);

/** Los archivos que subió el orquestador para ilustrar sus notas. */
export const mediaStore = createMediaStore(getSql);

/** La URL pública de un archivo subido a este sitio. */
export function mediaUrlFor(id: string, origin: string): string {
  return new URL(`/api/wiwo/v1/media/${id}`, origin).toString();
}

/**
 * La URL pública de una nota en este sitio.
 *
 * Se arma sobre el origen de la petición y nunca sobre una constante de dominio:
 * el sitio responde en más de un dominio, y congelar uno haría que el
 * orquestador viera dos identidades de la misma nota y la duplicara.
 */
export function urlFor(id: string, origin: string): string {
  return new URL(`/story/${id}`, origin).toString();
}

/**
 * Las notas del archivo que entran en una respuesta.
 *
 * `since` filtra por la ÚLTIMA MODIFICACIÓN, no por la publicación: es lo que
 * permite que una nota vieja corregida hoy vuelva a viajar al orquestador.
 */
function archive(since?: string) {
  return since ? ARTICLES.filter((a) => a.updatedAt >= since) : ARTICLES;
}

/** Lo que este sitio aporta al protocolo. */
export const wiwoSite: WiwoSiteConfig = {
  store: articleStore,
  archive,
  fields: () => buildFields(),
  urlFor,
  media: { store: mediaStore, urlFor: mediaUrlFor },
};
