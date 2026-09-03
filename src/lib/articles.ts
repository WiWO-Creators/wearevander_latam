import { createServerFn } from "@tanstack/react-start";
import { ARTICLES, type Article } from "@/lib/content";
import { articleStore } from "@/lib/wiwo/site";

/**
 * Responsabilidad: dar al SITIO todas sus notas, las del archivo del repositorio
 * y las publicadas por el orquestador.
 * Usado por: las rutas del sitio y lib/server/mesa.ts.
 * NO hace: no traduce —el archivo y la base guardan la misma forma— ni habla con
 *   la base (wiwo/site).
 *
 * Existe porque `ARTICLES` es una constante del módulo y la base no: leerla es
 * asíncrono y solo puede ocurrir en el servidor. Esta función es el único punto
 * donde se juntan las dos fuentes, para que ninguna vista muestre media verdad.
 *
 * Cuando una nota está en los dos lados gana la de la base: el archivo del
 * repositorio es lo que se publicó al principio y la base lo que se corrigió
 * después.
 */

/**
 * Une las dos fuentes SIN reordenar el archivo.
 *
 * El archivo del repositorio conserva su orden tal como está escrito: es
 * curaduría editorial —la tapa, el riel y las tarjetas salen de ese orden— y no
 * coincide con el orden por fecha. Reordenarlo cambiaría la portada entera, que
 * es justamente lo que conectar el orquestador no debe hacer: con la base vacía,
 * el sitio tiene que verse exactamente igual que antes.
 *
 * Una nota corregida desde el orquestador reemplaza a la suya EN SU LUGAR. Una
 * nota nueva no tiene lugar en el archivo, así que va al principio, que es donde
 * el sitio pone lo más reciente.
 *
 * Ojo: no es el orden del cable. Ahí manda `rank`, porque el orquestador pide
 * por curaduría; acá manda la edición.
 */
function unir(publicadas: Article[]): Article[] {
  const publicadaPorId = new Map(publicadas.map((a) => [a.id, a]));
  const enElArchivo = ARTICLES.map((a) => publicadaPorId.get(a.id) ?? a);

  const idsDelArchivo = new Set(ARTICLES.map((a) => a.id));
  const nuevas = publicadas
    .filter((a) => !idsDelArchivo.has(a.id))
    .sort((a, b) => {
      if (a.publishedAt !== b.publishedAt) return a.publishedAt < b.publishedAt ? 1 : -1;
      return a.id.localeCompare(b.id);
    });

  return [...nuevas, ...enElArchivo];
}

/**
 * Todas las notas del sitio, para quien ya está en el servidor.
 *
 * Es una función normal y no de servidor porque otras funciones de servidor la
 * llaman —la mesa de comentarios, sin ir más lejos—: anidar una dentro de otra
 * la haría viajar por HTTP contra sí misma.
 */
export async function allSiteArticles(): Promise<Article[]> {
  return unir(await articleStore.read());
}

/** Todas las notas del sitio, para las vistas. */
export const getArticles = createServerFn({ method: "GET" }).handler(allSiteArticles);
