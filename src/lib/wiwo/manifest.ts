import { AUTHORS, SECTIONS, TAGS, type FormatId, type FranchiseId } from "@/lib/content";
import {
  WIWO_COMMON_BLOCK_TYPES,
  WIWO_CONTRACT_VERSION,
  type WiwoField,
  type WiwoManifest,
} from "@wiwo/contract";
import { canDelete, canWrite } from "@wiwo/contract/server";

/**
 * Responsabilidad: declarar qué es este sitio y qué campos pide para publicar.
 * Usado por: routes/api/wiwo/v1/manifest.ts.
 * NO hace: no serializa notas (eso es el contrato) ni arma la respuesta HTTP.
 *
 * Es la pieza que reemplaza a la detección de plataforma. El orquestador no
 * adivina qué es esto: pregunta y el sitio contesta.
 *
 * Las secciones, las firmas y el ritmo se derivan del catálogo de lib/content,
 * así que agregar una sección o una firma no obliga a tocar este archivo. La
 * franquicia y el formato no tienen lista en tiempo de ejecución —son tipos—,
 * así que se enumeran acá con sus etiquetas: el Record tipado hace que agregar
 * un valor al tipo y olvidarse de este archivo no compile.
 *
 * Los límites son los del sitio, medidos sobre las 51 notas publicadas y
 * redondeados hacia arriba: apretarlos hasta el máximo real rechazaría la
 * próxima nota por un carácter.
 */

/** Máximos del sitio, con margen sobre lo que ya está publicado. */
const LIMITS = {
  title: 120,
  summary: 340,
  imageAlt: 120,
  seoTitle: 60,
  seoDescription: 160,
  kicker: 24,
  caption: 120,
  pullQuote: 200,
} as const;

/**
 * Nombre visible de cada franquicia.
 *
 * Vacío no es un valor de la lista: una nota sin franquicia es del cuerpo
 * central del número, que es la mayoría. Por eso el campo es opcional en vez de
 * tener una tercera opción "ninguna".
 */
const FRANCHISE_LABELS: Record<FranchiseId, string> = {
  contra: "Contra la corriente",
  signals: "Signals by Vander",
};

/**
 * Nombre visible de cada formato editorial.
 *
 * Es el segundo eje del sitio, además de la sección: una nota de Trabajo puede
 * ser una entrevista o un obituario, y la portada las pone en lugares distintos.
 * Ninguna de las 51 notas del archivo lo trae, así que las consultas por formato
 * de la portada no devuelven nada: el campo queda declarado justamente para que
 * el orquestador pueda empezar a llenarlo.
 */
const FORMAT_LABELS: Record<FormatId, string> = {
  essay: "Ensayo",
  interview: "Entrevista",
  flash: "Flash",
  obituario: "Obituario",
  indice: "Índice",
  visual: "Visual",
};

/**
 * Campos que el sitio acepta al publicar.
 *
 * Las claves del núcleo son las del contrato (`summary`, no `dek`; `imageAlt`,
 * no `alt`); la etiqueta es la que usa este sitio. Cualquier otra clave se lee
 * de `extra`, así que un nombre mal escrito no falla de frente: manda el campo
 * al lado equivocado y lo deja duplicado en las dos mitades.
 *
 * Se exportan porque el contrato los usa dos veces: para describir el formato en
 * el manifest y para validar una nota que llega. Si fueran dos listas, un campo
 * agregado en una rechazaría notas que la otra anunció como válidas.
 *
 * No se declaran `featured` ni `rank`: la tapa y el orden del número son
 * curaduría de la casa. El orquestador publica notas, no arma la portada.
 */
export function buildFields(): WiwoField[] {
  return [
    {
      key: "title",
      label: "Título",
      type: "text",
      required: true,
      maxLength: LIMITS.title,
    },
    {
      key: "summary",
      label: "Bajada",
      type: "longtext",
      required: true,
      maxLength: LIMITS.summary,
      hint: "El párrafo que sigue al título y da la tesis de la nota.",
    },
    {
      key: "kicker",
      label: "Antetítulo",
      type: "text",
      required: true,
      maxLength: LIMITS.kicker,
      hint: 'La palabra sobre el título, en todas las tarjetas: "Comercio", "Ideas", "Contra".',
    },
    {
      key: "section",
      label: "Sección",
      type: "enum",
      required: true,
      options: SECTIONS.map((section) => ({ value: section.id, label: section.label })),
    },
    {
      key: "author",
      label: "Firma",
      type: "enum",
      required: true,
      options: AUTHORS.map((author) => ({ value: author.id, label: author.name })),
      hint: "La ficha del pie de la nota —foto, cargo, ciudad— sale de esta lista.",
    },
    {
      key: "signedName",
      label: "Firma visible",
      type: "text",
      required: false,
      hint: 'Solo si la nota la firma alguien distinto de la redacción. Vacío se lee "Team Vander".',
    },
    {
      key: "city",
      label: "Ciudad",
      type: "text",
      required: true,
      // No es un enum de las seis corresponsalías aunque lo parezca: el archivo
      // ya publica notas fechadas en Monterrey, Querétaro, CDMX y Latam, y una
      // lista cerrada haría irrechazable corregir cualquiera de ellas.
      hint: "Dónde se reportó, escrita como se lee en la nota. Las corresponsalías son Ciudad de México, São Paulo, Buenos Aires, Bogotá, Santiago y Lima; una nota regional va como Latam.",
    },
    {
      key: "image",
      label: "Imagen",
      type: "image",
      required: true,
      // La pista NO es solo para quien escribe: es el estilo con el que el
      // orquestador genera y adapta la imagen de este sitio. Cambiarla cambia
      // cómo se ilustra We Are Vander, y no hay que tocar nada más.
      hint: "Fotografía de reportaje del lugar donde ocurre el negocio: la planta, la oficina, el puerto, la frontera, el salar. Gente trabajando, tomada sin posar. Luz disponible y color natural: el sitio no aplica ningún filtro, así que no hay virado, ni grano, ni marco, ni texto sobre la foto. Horizontal y con aire alrededor del asunto, porque se recorta a 16:10, 3:2, 4:3 y cuadrada.",
    },
    {
      key: "imageAlt",
      label: "Texto alternativo de la imagen",
      type: "text",
      required: true,
      maxLength: LIMITS.imageAlt,
      hint: "Obligatorio: sin esto la nota no es accesible.",
    },
    {
      key: "caption",
      label: "Epígrafe",
      type: "text",
      required: true,
      maxLength: LIMITS.caption,
      hint: "Qué se ve y dónde. Va bajo la foto de apertura.",
    },
    {
      key: "tags",
      label: "Etiquetas",
      type: "tags",
      required: true,
      itemCount: { min: 1, max: 3 },
      // El índice de etiquetas es cerrado: una de fuera se dibuja con su
      // identificador crudo y su página queda vacía. Va como pista y no como
      // opciones porque el contrato solo valida listas cerradas en los enum.
      hint: `Del índice del sitio: ${TAGS.map((tag) => tag.id).join(", ")}. El ritmo lo agrega el sitio solo.`,
    },
    {
      key: "pace",
      label: "Ritmo",
      type: "enum",
      required: true,
      options: TAGS.filter((tag) => tag.kind === "pace").map((tag) => ({
        value: tag.id,
        label: tag.label,
      })),
      hint: "Cómo se lee: una señal corta o una nota de fondo.",
    },
    {
      key: "readingMinutes",
      label: "Minutos de lectura",
      type: "number",
      required: true,
    },
    {
      key: "franchise",
      label: "Franquicia",
      type: "enum",
      required: false,
      options: Object.entries(FRANCHISE_LABELS).map(([value, label]) => ({ value, label })),
      hint: "Vacío es el cuerpo del número. Con valor, la nota vive además en su franquicia.",
    },
    {
      key: "format",
      label: "Formato",
      type: "enum",
      required: false,
      options: Object.entries(FORMAT_LABELS).map(([value, label]) => ({ value, label })),
      hint: "Segundo eje, además de la sección: qué clase de pieza es. La portada tiene lugar reservado para la entrevista, el flash, el visual y el obituario.",
    },
    {
      key: "body",
      label: "Cuerpo",
      type: "blocks",
      required: true,
      hint: "Un bloque por párrafo, separados por línea en blanco. Los subtítulos van con ##, las citas con >.",
    },
    {
      key: "pullQuote",
      label: "Cita destacada",
      type: "longtext",
      required: true,
      maxLength: LIMITS.pullQuote,
      hint: "La frase que sostiene la nota. Las 51 del archivo la traen; no se dibuja aparte, pero es de donde sale la nota cuando hay que recortarla a otro formato.",
    },
    {
      key: "seoTitle",
      label: "Título para buscadores",
      type: "text",
      required: false,
      maxLength: LIMITS.seoTitle,
    },
    {
      key: "seoDescription",
      label: "Descripción para buscadores",
      type: "longtext",
      required: false,
      maxLength: LIMITS.seoDescription,
    },
    {
      key: "ogTitle",
      label: "Título para redes",
      type: "text",
      required: false,
    },
    {
      key: "ogDescription",
      label: "Bajada para redes",
      type: "longtext",
      required: false,
    },
    {
      key: "ogImage",
      label: "Imagen para redes",
      type: "image",
      required: false,
      hint: "Solo si la de apertura no funciona recortada a 1200×630.",
    },
    {
      key: "tldr",
      label: "En breve",
      type: "list",
      required: false,
      itemCount: { min: 3, max: 5 },
      hint: "Hechos verificables, uno por línea. Con cifra y con fuente.",
    },
    {
      key: "faq",
      label: "Preguntas frecuentes",
      type: "pairs",
      required: false,
      itemLabels: { key: "Pregunta", value: "Respuesta" },
      itemCount: { min: 2, max: 4 },
    },
  ];
}

/**
 * Arma el manifest del sitio.
 *
 * @param origin Origen público por el que entró la petición, para que las URLs
 *   que se emiten queden en ese mismo dominio.
 * @param articleCount Cuántas notas va a entregar el sitio.
 * @param acceptsMedia Si el sitio puede recibir imágenes: hace falta que tenga
 *   dónde guardarlas y clave de escritura, porque subir un archivo es escribir.
 */
export function buildManifest(
  origin: string,
  articleCount: number,
  acceptsMedia: boolean,
): WiwoManifest {
  return {
    contract: WIWO_CONTRACT_VERSION,
    site: {
      name: "We Are Vander",
      url: origin,
      language: "es-419",
    },
    capabilities: {
      articles: true,
      read: true,
      write: canWrite(),
      // Llega resuelto desde la ruta y no se calcula acá: quien lo sabe es
      // lib/wiwo/site.ts, que ya importa este archivo. Preguntárselo desde acá
      // cerraría un círculo entre los dos.
      media: acceptsMedia,
      // Borrar es escribir, así que depende de la misma clave. Se anuncia
      // aparte porque el orquestador no puede deducirlo de `write`: un sitio
      // con el paquete anterior acepta publicaciones y no entiende el borrado.
      delete: canDelete(),
    },
    format: {
      id: "wearevander",
      label: "We Are Vander",
      fields: buildFields(),
      // El vocabulario común primero —es el mismo en todos los sitios wiwo— y
      // después lo propio de la casa. El archivo del repositorio escribe sus
      // párrafos como `p` y sus subtítulos como `h2`, que es como nacieron, y el
      // cuerpo los dibuja igual que a los del vocabulario común; lo que se
      // anuncia acá es el común, que es lo que el orquestador sabe escribir.
      blockTypes: [
        ...WIWO_COMMON_BLOCK_TYPES,
        {
          type: "stat",
          label: "Cifra",
          hint: "Un número con su leyenda. Van de a tres, en una banda dentro del texto.",
        },
      ],
    },
    counts: { articles: articleCount },
    generatedAt: new Date().toISOString(),
  };
}
