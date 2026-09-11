import { ARTICLES } from "./content";
import {
  articleCity,
  articleFranchise,
  articleKicker,
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
 * Y no es un matiz: al 7 de septiembre de 2026 el sitio sirve 64 notas, 51 del
 * repositorio y 13 que no están en él. Ninguna otra dimensión las separa —once
 * de esas trece van firmadas igual que el archivo—, así que sin `origen` esas
 * trece son invisibles como grupo.
 *
 * QUÉ NO SE MIDE Y CONVIENE SABER: `medirNota` sólo corre en /story/$slug. Las
 * fichas de las colecciones —Vander 20, 50 Innovatives, Under 40, los dos
 * Visionarios— son otras 371 páginas que llegan al informe sólo como
 * `tipo_de_pagina`, sin ninguna dimensión propia. Medirlas es otra decisión, no
 * un olvido.
 *
 * OJO, Y ESTO SE OLVIDA SIEMPRE: mandar un parámetro NO alcanza para verlo en un
 * informe. GA4 los guarda igual, pero quedan invisibles hasta que se los
 * registra a mano como dimensiones personalizadas, en Administrar → Definiciones
 * personalizadas, con el mismo nombre exacto. Hay que registrar, con alcance de
 * evento: `origen`, `seccion`, `volanta`, `firma`, `ritmo`, `franquicia`,
 * `plaza` y `nota` —y `tipo_de_pagina`, que viaja en la vista de página, no
 * acá—. `minutos` conviene registrarlo como MÉTRICA y no como dimensión, o cada
 * valor distinto arma su propia fila.
 *
 * Los datos anteriores al registro no se pierden: al registrar la dimensión, los
 * informes la muestran hacia adelante y las exploraciones alcanzan hasta donde
 * llegue la retención. O sea que conviene registrarlas cuanto antes, pero
 * olvidarse un día no borra nada.
 */

/** Lo que se manda cuando el sitio no declara ese campo. */
const SIN_DATO = "(sin declarar)";

/** Cómo firma la casa cuando la nota no lleva firma propia. Igual que teamByline. */
const FIRMA_DE_LA_CASA = "Team Vander";

/**
 * Plazas que el archivo escribe de dos maneras.
 *
 * Sin esto, una misma ciudad abre dos filas en el informe y las dos quedan
 * chicas. Es la única corrección que se le hace al dato del sitio, y se hace acá
 * y no en el catálogo porque el catálogo es del sitio, no de la medición.
 */
const MISMA_PLAZA: Record<string, string> = {
  CDMX: "Ciudad de México",
};

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
 * parámetro ausente y uno vacío no se agrupan igual, y una nota sin volanta
 * desaparecería del informe por volanta en vez de aparecer como lo que es —una
 * nota sin volanta—.
 *
 * @param article La nota, en la forma del contrato.
 */
export function dimensionesDeNota(article: Article): DimensionesDeNota {
  return {
    nota: article.id,
    seccion: articleSectionId(article) || SIN_DATO,
    volanta: articleKicker(article) || SIN_DATO,
    // La firma que se LEE, exactamente la misma que arma teamByline. Antes esto
    // caía al id del autor, y entonces el informe decía "daniel-pinto" para
    // quince notas que en pantalla dicen "Team Vander": un dato que contradice
    // lo que ve el lector es peor que un dato que falta.
    firma: articleSignedName(article) || FIRMA_DE_LA_CASA,
    ritmo: articlePace(article),
    franquicia: articleFranchise(article) || "ninguna",
    plaza: plazaDe(article),
    // Es lo que el sitio DECLARA que dura, no lo que tardaron en leerla. Sirve
    // para cruzarlo con la permanencia real, que es la comparación interesante:
    // una nota de nueve minutos leída en cuarenta segundos no se leyó.
    minutos: article.readingMinutes ?? 0,
    origen: origenDeLaNota(article.id),
  };
}

/** La plaza de la nota, unificando los nombres que el archivo repite. */
function plazaDe(article: Article): string {
  const ciudad = articleCity(article);
  if (!ciudad) return SIN_DATO;
  return MISMA_PLAZA[ciudad] ?? ciudad;
}
