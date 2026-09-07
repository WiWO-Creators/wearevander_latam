/**
 * Responsabilidad: la medición de Google Analytics del sitio — qué propiedad
 * mide y qué scripts hay que poner en el head para que empiece a contar.
 * Usado por: routes/__root.tsx, que es el único lugar donde se inyecta el head.
 * NO hace: no lee estadísticas ni manda eventos propios. Solo deja andando el
 *   gtag.js estándar; lo que se mide después se consulta en Google, o en el
 *   orquestador cuando se le den las credenciales de la Data API.
 *
 * LA PROPIEDAD SE LEE DEL ENTORNO Y NO ESTÁ ESCRITA ACÁ, igual que las zonas de
 * publicidad de `ads.ts`. Tres motivos, y ninguno es de estilo:
 *
 * - Una vista previa de Vercel corre el mismo código que producción. Con el
 *   identificador escrito en el repositorio, cada rama en revisión mandaría sus
 *   visitas a la propiedad de verdad y ensuciaría los números con tráfico que no
 *   es de nadie.
 * - Apagar la medición pasa a ser vaciar un campo en Vercel, no un despliegue.
 * - El desarrollo local no mide por omisión, que es lo correcto: nadie quiere
 *   sus propias recargas dentro del informe.
 *
 * Variable vacía = no se emite NINGÚN script. No hay estado a medias.
 */

/**
 * La propiedad de GA4 que mide este sitio. Vacío = no se mide.
 *
 * Se lee con `?.` porque este módulo también se carga fuera de Vite —en las
 * pruebas, que corren con Node a secas— y ahí `import.meta.env` no existe.
 */
export const GA_MEASUREMENT_ID = (
  import.meta.env?.VITE_GA_MEASUREMENT_ID ?? ""
).trim();

/** De dónde se baja gtag.js. */
const GA_SERVE = "https://www.googletagmanager.com/gtag/js";

/**
 * El arranque de gtag, tal como lo entrega Google.
 *
 * Va como script inline y no como archivo porque `dataLayer` y `gtag` tienen que
 * existir ANTES de que termine de cargar gtag.js: la función encola las llamadas
 * y el archivo las consume al llegar. Separarlos pierde el `config` inicial, que
 * es justamente la vista de página con la que se abre la sesión.
 *
 * Se arma con el identificador ya interpolado porque es un literal del entorno,
 * no entrada de nadie: el propio módulo lo valida antes de emitirlo.
 */
function arranqueDeGa(id: string): string {
  return [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    `gtag('config', '${id}');`,
  ].join("\n");
}

/**
 * Los scripts de medición para el head. Vacío cuando no hay propiedad.
 *
 * Se comprueba la FORMA del identificador y no solo que no esté vacío: una
 * variable mal pegada —con comillas, con espacios, con el nombre de la variable
 * adentro— emitiría un script que falla en silencio y dejaría a alguien mirando
 * un informe vacío sin entender por qué. Una propiedad de GA4 es "G-" y letras
 * o números.
 *
 * @param id Qué propiedad medir. Por omisión, la del entorno; se puede pasar
 *   otra para probar esta función sin depender de una variable de entorno.
 */
export function scriptsDeAnalitica(
  id: string = GA_MEASUREMENT_ID,
): { src?: string; async?: boolean; children?: string }[] {
  const limpio = id.trim();
  if (!/^G-[A-Z0-9]+$/i.test(limpio)) return [];

  return [
    { src: `${GA_SERVE}?id=${limpio}`, async: true },
    { children: arranqueDeGa(limpio) },
  ];
}
