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
    // `send_page_view:false` NO apaga la medición: la MUEVE.
    //
    // Este sitio es una aplicación de una sola página: se navega con Link y el
    // documento no se vuelve a cargar nunca. El arranque de Google que viene por
    // omisión manda UNA vista al cargar y después queda ciego, así que quien
    // entra por la portada y lee cuatro notas cuenta como una vista de la
    // portada y ninguna nota. Con esto, TODAS las vistas —incluida la primera—
    // las manda medicion-de-vistas.tsx cuando cambia la ruta.
    //
    // Apagarla acá y no filtrar después es lo que evita contar dos veces la
    // primera: no hay forma de saber desde el componente si gtag ya la mandó.
    `gtag('config', '${id}', { send_page_view: false });`,
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

/** Lo que gtag deja colgado del navegador. No hay tipos oficiales. */
type Gtag = (...args: unknown[]) => void;

/** gtag, si está. Ausente en el servidor, sin propiedad, o con un bloqueador. */
function gtag(): Gtag | null {
  const suelto = (globalThis as { gtag?: Gtag }).gtag;
  return typeof suelto === "function" ? suelto : null;
}

/**
 * Qué clase de página es, deducida de su dirección.
 *
 * Sirve para poder preguntar "cuánto pesa el archivo contra la portada" sin
 * tener que enumerar veinticinco rutas en cada informe. Se deduce del camino y
 * no se declara ruta por ruta porque una ruta nueva tiene que quedar medida
 * aunque nadie se acuerde de anotarla; el peor caso es que caiga en "otra".
 */
export function tipoDePagina(ruta: string): string {
  if (ruta === "/") return "portada";
  const primero = ruta.split("/").filter(Boolean)[0] ?? "";
  if (primero === "story") return "nota";
  if (["section", "tag", "indice", "list", "search"].includes(primero)) {
    return "navegacion";
  }
  if (["contra", "signals", "innovatives", "visionarios", "under40"].includes(primero)) {
    return "franquicia";
  }
  if (["about", "anuncia", "channels", "piso", "obituarios"].includes(primero)) {
    return "institucional";
  }
  if (["login", "saved", "briefing"].includes(primero)) return "cuenta";
  return "otra";
}

/**
 * Una vista de página.
 *
 * Se manda a mano en cada cambio de ruta. Ver `send_page_view:false` arriba.
 *
 * @param ruta El camino, sin dominio y sin parámetros de campaña.
 * @param titulo El título del documento, para que el informe se lea.
 */
export function medirVista(ruta: string, titulo: string): void {
  const enviar = gtag();
  if (!enviar) return;

  enviar("event", "page_view", {
    page_path: ruta,
    page_title: titulo,
    page_location: globalThis.location?.href,
    tipo_de_pagina: tipoDePagina(ruta),
    ...(depuracionEncendida() ? { debug_mode: true } : {}),
  });
}

/**
 * Lo que se sabe de una nota y vale la pena medir.
 *
 * Son las dimensiones con las que ESTE sitio piensa su propio archivo —sección,
 * firma, ritmo, formato, franquicia— más la única que el sitio no usa para
 * dibujar nada y sirve para lo nuestro: de dónde vino la nota.
 */
export interface DimensionesDeNota {
  nota: string;
  seccion: string;
  firma: string;
  ritmo: string;
  formato: string;
  franquicia: string;
  minutos: number;
  /** `archivo` si es del repositorio, `orquestador` si la publicó doom. */
  origen: "archivo" | "orquestador";
}

/**
 * Mide la lectura de una nota, con sus dimensiones editoriales.
 *
 * Va como evento propio y no como parámetros de la vista de página por dos
 * razones. La primera es de orden: la vista se manda apenas cambia la ruta y la
 * nota se resuelve después, así que meterlas en el mismo evento obligaría a
 * demorar TODAS las vistas del sitio por las que son notas. La segunda es que
 * así el conteo de tráfico y el de lectura no se pisan: si algún día esto se
 * mide mal, se ve en un evento y no ensucia las vistas.
 *
 * `origen` es la razón de ser de todo esto: separa lo que publicó el orquestador
 * de lo que ya estaba en el repositorio. Sin esa marca no hay forma de contestar
 * si lo que estamos publicando rinde, porque en el informe queda mezclado con
 * las cincuenta y una notas que el sitio trajo de nacimiento.
 */
export function medirNota(dimensiones: DimensionesDeNota): void {
  const enviar = gtag();
  if (!enviar) return;

  enviar("event", "nota_vista", {
    ...dimensiones,
    ...(depuracionEncendida() ? { debug_mode: true } : {}),
  });
}

/**
 * True si la dirección pide modo depuración (`?ga_debug=1`).
 *
 * Existe para poder comprobar la instalación en minutos, en el DebugView de
 * Google, en vez de esperar a que los informes se procesen —que puede ser un
 * día—. Sin esto, la única forma de saber si el tag quedó bien puesto es
 * esperar; y ya sabemos que una etiqueta mal pegada carga sin dar ningún error.
 */
function depuracionEncendida(): boolean {
  try {
    return new URLSearchParams(globalThis.location?.search ?? "").has(
      "ga_debug",
    );
  } catch {
    return false;
  }
}
