import { ARTICLES } from "./content";
import {
  articleAuthorId,
  articleFranchise,
  articlePace,
  articleSectionId,
  articleSignedName,
  type Article,
} from "./content";
import type { DimensionesDeNota } from "./analytics";

/**
 * Responsabilidad: traducir una nota del sitio a las dimensiones con las que se
 * la mide en Google Analytics.
 * Usado por: routes/story/$slug.tsx.
 * NO hace: no manda nada —eso es `medirNota` en lib/analytics— ni dibuja. Es una
 *   función pura, y por eso vive aparte del componente.
 *
 * Vive separada de lib/analytics porque aquélla no sabe nada de este sitio: sabe
 * de gtag. Ésta sí, y por eso importa el catálogo. Mezclarlas obligaría a que el
 * módulo que arma el `<head>` cargue el archivo editorial entero.
 *
 * LA DIMENSIÓN QUE JUSTIFICA TODO ESTO ES `origen`. Separa lo que publicó el
 * orquestador de lo que el sitio ya traía: sin esa marca, en el informe las
 * notas nuestras quedan mezcladas con las cincuenta y una del archivo original y
 * no hay forma de contestar si lo que publicamos rinde. Google no puede
 * deducirlo solo —para él son todas direcciones de este dominio—.
 *
 * OJO, Y ESTO SE OLVIDA SIEMPRE: mandar un parámetro NO alcanza para verlo en un
 * informe. GA4 los guarda igual, pero quedan invisibles hasta que se los
 * registra a mano como dimensiones personalizadas, en Administrar → Definiciones
 * personalizadas, con el mismo nombre exacto. Hay que registrar, con alcance de
 * evento: `origen`, `seccion`, `firma`, `ritmo`, `formato`, `franquicia`, `nota`
 * y `tipo_de_pagina` —esta última viaja en la vista de página, no acá—.
 * `minutos` conviene registrarlo como MÉTRICA y no como dimensión, o cada valor
 * distinto arma su propia fila.
 *
 * Los datos anteriores al registro no se pierden: al registrar la dimensión, los
 * informes la muestran hacia adelante y las exploraciones alcanzan hasta donde
 * llegue la retención. O sea que conviene registrarlas cuanto antes, pero
 * olvidarse un día no borra nada.
 */

/** Lo que se manda cuando el sitio no declara ese campo. */
const SIN_DATO = "(sin declarar)";

/**
 * De dónde salió una nota.
 *
 * El archivo del repositorio es una constante del módulo, así que se puede
 * preguntar en el navegador sin pedirle nada al servidor: lo que NO está ahí
 * llegó por el orquestador. Es la misma unión que hace lib/articles.ts, leída al
 * revés.
 */
export function origenDeLaNota(id: string): "archivo" | "orquestador" {
  return ARTICLES.some((una) => una.id === id) ? "archivo" : "orquestador";
}

/**
 * Las dimensiones de una nota, listas para medir.
 *
 * Todos los campos van SIEMPRE, con un relleno cuando faltan: en GA4 un
 * parámetro ausente y uno vacío no se agrupan igual, y una nota sin firma
 * desaparecería del informe por firma en vez de aparecer como lo que es —una
 * nota sin firma—.
 *
 * @param article La nota, en la forma del contrato.
 */
export function dimensionesDeNota(article: Article): DimensionesDeNota {
  return {
    nota: article.id,
    seccion: articleSectionId(article) || SIN_DATO,
    // La firma que se LEE, no el identificador: el informe lo mira una persona.
    // Cae al id del autor cuando la nota va firmada por la casa.
    firma: articleSignedName(article) || articleAuthorId(article) || SIN_DATO,
    ritmo: articlePace(article),
    formato: formatoDe(article),
    franquicia: articleFranchise(article) || "ninguna",
    // Es lo que el sitio DECLARA que dura, no lo que tardaron en leerla. Sirve
    // para cruzarlo con la permanencia real, que es la comparación interesante:
    // una nota de nueve minutos leída en cuarenta segundos no se leyó.
    minutos: article.readingMinutes ?? 0,
    origen: origenDeLaNota(article.id),
  };
}

/** El formato declarado, que viaja en `extra` y no está tipado. */
function formatoDe(article: Article): string {
  const valor = (article.extra as Record<string, unknown> | undefined)?.format;
  return typeof valor === "string" && valor ? valor : SIN_DATO;
}
