/**
 * Responsabilidad: el catálogo editorial del sitio — la casa, las secciones, las
 *   firmas, las etiquetas, y las consultas sobre el archivo de notas.
 * Usado por: las vistas y componentes que muestran notas, y lib/server/mesa.ts.
 * NO hace: no habla con la base ni con el orquestador; eso vive en lib/wiwo/.
 *
 * Las notas se guardan en la forma del CONTRATO. Lo propio de We Are Vander
 * viaja en `extra`, y se lee con los accesores de más abajo: `extra` no está
 * tipado, así que leerlo a mano deja `undefined` colándose hasta la pantalla.
 */
import type { WiwoBlock, WiwoJson, WiwoSiteArticle } from "@wiwo/contract";
import { AGOSTO_ARTICLES } from "./agosto";
import { FONDO_ARTICLES } from "./fondo";
import { FONDO2_ARTICLES } from "./fondo2";
import { MELIMAFIA } from "./melimafia";

export type SectionId = "ideas" | "work" | "design" | "climate" | "culture";
export type PaceId = "rapida" | "fondo";
export type FranchiseId = "contra" | "signals";
export type TagKind = "industry" | "tech" | "pace";
export type FormatId = "essay" | "interview" | "flash" | "obituario" | "indice" | "visual";

export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  city: string;
  image: string;
};

/**
 * Una nota del sitio.
 *
 * Es el tipo del CONTRATO, no uno propio. Antes había un modelo interno con
 * `slug`, `dek`, `kicker` y el cuerpo suelto, y para hablar con el orquestador
 * habría hecho falta un adaptador de ida y otro de vuelta: cada campo que el
 * adaptador no cubriera se perdería en silencio al corregir una nota publicada.
 * Ahora lo que el sitio dibuja y lo que entrega son el mismo dato.
 *
 * La nota se identifica por `id` —lo que antes era `slug`—, la bajada es
 * `summary` y el cuerpo va en `body.blocks`. El kicker, el epígrafe, la ciudad,
 * el ritmo, la franquicia y la cita destacada viven en `extra`.
 */
export type Article = WiwoSiteArticle;

export const HOUSE = {
  name: "We Are Vander",
  team: "Team Vander",
  publisher: "Interadia",
  credit: "Un medio de Interadia",
  motto: "We Love Business",
} as const;

export const ISSUE = {
  volume: "III",
  number: "08",
  title: "We Love Business",
  date: "Agosto 2026",
  city: "Latam",
  desks: ["Ciudad de México", "São Paulo", "Buenos Aires", "Bogotá", "Santiago", "Lima"],
} as const;

export const DESKS = [
  { id: "cdmx", label: "Ciudad de México", short: "CDMX" },
  { id: "saopaulo", label: "São Paulo", short: "SP" },
  { id: "buenosaires", label: "Buenos Aires", short: "BA" },
  { id: "bogota", label: "Bogotá", short: "BOG" },
  { id: "santiago", label: "Santiago", short: "SCL" },
  { id: "lima", label: "Lima", short: "LIM" },
] as const;

export const SECTIONS: { id: SectionId; label: string; dek: string }[] = [
  { id: "ideas", label: "Ideas", dek: "Los argumentos que reordenan una empresa antes que el producto." },
  { id: "work", label: "Trabajo", dek: "Cómo se siente el trabajo ahora: calendarios, salas, turnos de noche." },
  { id: "design", label: "Diseño", dek: "El gusto como infraestructura. Objetos, oficinas e interfaces." },
  { id: "climate", label: "Clima", dek: "Energía, tierra y las compañías que tratan la atmósfera como un brief." },
  { id: "culture", label: "Cultura", dek: "Moda, ciudades y las marcas independientes que reescriben el retail." },
];

export const AUTHORS: Author[] = [
  {
    id: "daniel-pinto",
    name: "Daniel Pinto",
    role: "Editor",
    city: "Santiago",
    image: "/authors/daniel-pinto.jpg",
    bio: "Escribe industria, energía y capital para We Are Vander. Cierre de datos de este número: 22 de agosto de 2026.",
  },
  {
    id: "mira-solano",
    name: "Mira Solano",
    role: "Editora general",
    city: "Ciudad de México",
    image: "/authors/mira-solano.jpg",
    bio: "Editora general de Team Vander. Coordina las seis corresponsalías desde CDMX. Escribe compañías como sistemas: primero la tesis, después el mood.",
  },
  {
    id: "valentina-cruz",
    name: "Valentina Cruz",
    role: "Corresponsal México",
    city: "Ciudad de México",
    image: "/authors/valentina-cruz.jpg",
    bio: "Cubre nearshoring, industria y el capital que ahora aterriza en Reforma en vez de Miami.",
  },
  {
    id: "diego-azevedo",
    name: "Diego Azevedo",
    role: "Corresponsal Brasil",
    city: "São Paulo",
    image: "/authors/diego-azevedo.jpg",
    bio: "Reporta fintech, retail y el P&L después del hype. Paulista es su escritorio.",
  },
  {
    id: "camila-ferrer",
    name: "Camila Ferrer",
    role: "Corresponsal Cono Sur",
    city: "Buenos Aires",
    image: "/authors/camila-ferrer.jpg",
    bio: "Diseño, agritech y las compañías argentinas que tratan la restricción como código de casa.",
  },
  {
    id: "andres-molina",
    name: "Andrés Molina",
    role: "Corresponsal Andes",
    city: "Bogotá",
    image: "/authors/andres-molina.jpg",
    bio: "Energía, software y el trabajo a 2.600 metros. Medellín y Bogotá en la misma libreta.",
  },
  {
    id: "jonah-peck",
    name: "Jonah Peck",
    role: "Columnista de trabajo",
    city: "Santiago",
    image: "/authors/jonah-peck.jpg",
    bio: "Cubre el diseño del trabajo en la región: calendarios, oficinas y la revuelta contra el mito de las 80 horas.",
  },
  {
    id: "asha-veld",
    name: "Asha Veld",
    role: "Editora de diseño",
    city: "São Paulo",
    image: "/authors/asha-veld.jpg",
    bio: "Productos físicos, cultura material y las empresas latinas que todavía creen en los objetos.",
  },
  {
    id: "rafael-quinn",
    name: "Rafael Quinn",
    role: "Editor de clima",
    city: "Santiago",
    image: "/authors/rafael-quinn.jpg",
    bio: "Litio, desierto y Pacífico. Escribe energía como un problema de paisaje, capital y paciencia.",
  },
  {
    id: "lina-cho",
    name: "Lina Cho",
    role: "Corresponsal de cultura",
    city: "Buenos Aires",
    image: "/authors/lina-cho.jpg",
    bio: "Retail independiente, moda y vida urbana entre Buenos Aires, CDMX y Santiago.",
  },
];

/**
 * El archivo del repositorio, en el orden en que está escrito: ese orden ES la
 * portada.
 *
 * No es todo lo que el sitio muestra. Lo que publica el orquestador vive en la
 * base, y las dos fuentes se juntan en lib/articles.ts; las vistas leen de ahí y
 * le pasan la lista a las consultas de este archivo. Acá se queda la que sale al
 * cable, que es solo el archivo (lib/wiwo/site.ts).
 */
export const ARTICLES: Article[] = [
  MELIMAFIA,
  ...AGOSTO_ARTICLES,
  ...FONDO_ARTICLES,
  ...FONDO2_ARTICLES,
];

/**
 * Un campo propio del sitio.
 *
 * `extra` viaja por el contrato sin que nadie lo interprete, así que no está
 * tipado: se lee por acá y no a mano, y un campo ausente devuelve cadena vacía
 * en vez de dejar que `undefined` llegue a la pantalla.
 */
function propio(article: Article, clave: string): string {
  const valor = article.extra?.[clave];
  return typeof valor === "string" ? valor : "";
}

/** La etiqueta corta sobre el título: "Comercio", "Ideas", "Contra". */
export const articleKicker = (article: Article) => propio(article, "kicker");
/** El epígrafe de la foto de apertura. */
export const articleCaption = (article: Article) => propio(article, "caption");
/** La firma visible cuando la nota no la firma la redacción entera. */
export const articleSignedName = (article: Article) => propio(article, "signedName");
/** La franquicia: "signals" o "contra". Vacío si la nota es del cuerpo central. */
export const articleFranchise = (article: Article) => propio(article, "franchise");
/** El formato editorial: entrevista, flash, obituario, visual. */
export const articleFormat = (article: Article) => propio(article, "format");
/**
 * La cita destacada de la nota.
 *
 * Hoy no se dibuja en ninguna parte, pero es un campo que el formato declara y
 * que el orquestador puede mandar, así que se lee por acá como cualquier otro.
 */
export const articlePullQuote = (article: Article) => propio(article, "pullQuote");
/** El título con el que la nota se comparte en redes, si difiere del propio. */
export const articleOgTitle = (article: Article) => propio(article, "ogTitle");
/** La descripción con la que la nota se comparte en redes. */
export const articleOgDescription = (article: Article) => propio(article, "ogDescription");
/** La imagen con la que la nota se comparte en redes, si no es la de apertura. */
export const articleOgImage = (article: Article) => propio(article, "ogImage");

/** La foto de apertura. Cadena vacía si la nota llegó sin imagen. */
export const articleImage = (article: Article) => article.image?.url ?? "";
/** El alt de la foto de apertura. */
export const articleImageAlt = (article: Article) => article.image?.alt ?? "";
/** La sección a la que pertenece, para armar enlaces. */
export const articleSectionId = (article: Article) => article.section?.id ?? "";
/** La sección como la escribe el sitio: "Ideas", "Trabajo". */
export const articleSectionLabel = (article: Article) => article.section?.label ?? "";
/** La ficha de la firma se busca por acá; el contrato la guarda en author.slug. */
export const articleAuthorId = (article: Article) => article.author?.slug ?? "";

/**
 * El cuerpo, siempre como bloques.
 *
 * El contrato admite además Markdown en una cadena, porque hay sitios que
 * escriben así. Este no: no tiene con qué dibujarlo, así que una nota que
 * llegara en Markdown se lee vacía en vez de mostrarse sin formato.
 */
export function articleBlocks(article: Article): WiwoBlock[] {
  return article.body.format === "blocks" ? article.body.blocks : [];
}

/**
 * Las preguntas frecuentes, con los nombres que usan FaqBlock y faqSchema.
 *
 * El contrato las llama question/answer; el sitio dibuja q/a y comparte ese
 * componente con los rankings, que no son notas y no pasan por el contrato.
 *
 * La capa `seo` se lee con cuidado aunque el tipo la dé por segura: lo que
 * guarda el orquestador es el JSON que llegó, y una nota publicada sin ella
 * dejaría la página entera en blanco en vez de salir sin preguntas frecuentes.
 */
export function articleFaq(article: Article) {
  return (article.seo?.faq ?? []).map((f) => ({ q: f.question, a: f.answer }));
}

/**
 * La galería que acompaña a algunas notas.
 *
 * Ninguna del archivo la usa hoy, pero la nota que la traiga se dibuja igual:
 * cada foto se lee campo por campo y se descarta la que no tenga imagen, porque
 * lo que venga en `extra` no lo valida nadie.
 */
export function articleGallery(article: Article) {
  const valor = article.extra?.gallery;
  if (!Array.isArray(valor)) return [];
  return valor
    .map((item) => {
      const foto: { [clave: string]: WiwoJson } =
        item !== null && typeof item === "object" && !Array.isArray(item) ? item : {};
      const texto = (clave: string) => (typeof foto[clave] === "string" ? foto[clave] : "");
      return { src: texto("src"), alt: texto("alt"), caption: texto("caption") };
    })
    .filter((foto) => foto.src !== "");
}

/**
 * Un campo de texto de un bloque del cuerpo.
 *
 * WiwoBlock es abierto —solo garantiza `type`— para que un sitio pueda tener un
 * bloque propio sin tocar el contrato. El precio es que sus campos se leen así.
 */
function textoDeBloque(block: WiwoBlock, clave: string) {
  const valor = block[clave];
  return typeof valor === "string" ? valor : "";
}

/** El texto de un párrafo, título, cita, pregunta o respuesta. */
export const blockText = (block: WiwoBlock) => textoDeBloque(block, "text");
/** A quién se le atribuye una cita. */
export const blockCite = (block: WiwoBlock) => textoDeBloque(block, "cite");
/** La cifra de un bloque "stat". */
export const blockValue = (block: WiwoBlock) => textoDeBloque(block, "value");
/** Qué mide la cifra de un bloque "stat". */
export const blockLabel = (block: WiwoBlock) => textoDeBloque(block, "label");

/** Una fila de celdas de texto, descartando lo que no lo sea. */
function celdasDeTexto(valor: WiwoJson | undefined): string[] {
  return Array.isArray(valor) ? valor.filter((c): c is string => typeof c === "string") : [];
}

/** Los renglones de un bloque "list". */
export const blockItems = (block: WiwoBlock) => celdasDeTexto(block.items);
/** True si la lista va numerada. */
export const blockOrdered = (block: WiwoBlock) => block.ordered === true;
/** El encabezado de un bloque "table". */
export const blockHead = (block: WiwoBlock) => celdasDeTexto(block.head);
/** Las filas de un bloque "table", ya sin celdas raras. */
export function blockRows(block: WiwoBlock): string[][] {
  return Array.isArray(block.rows) ? block.rows.map(celdasDeTexto) : [];
}

export function getSectionLabel(id: string) {
  return SECTIONS.find((s) => s.id === id)?.label ?? id;
}

export function getAuthor(id: string) {
  return AUTHORS.find((a) => a.id === id);
}

export function teamByline(article: Article, withPor = true) {
  const city = articleCity(article);
  const name = articleSignedName(article) || "Team Vander";
  const who = withPor ? `Por ${name}` : name;
  return city ? `${who} · ${city}` : who;
}

/**
 * Una nota por su identificador.
 *
 * Recibe la lista en vez de mirar `ARTICLES` porque el archivo del repositorio
 * dejó de ser toda la verdad: lo que publicó el orquestador vive en la base y
 * llega por lib/articles.ts. Vale para todas las consultas de acá en adelante.
 */
export function getArticle(list: Article[], id: string) {
  return list.find((a) => a.id === id);
}

export function articleContext(article: Article, max = 4500) {
  const parts: string[] = [`Título: ${article.title}`, `Bajada: ${article.summary}`];
  // Los dos vocabularios: `p`/`h2` es como escribe el archivo del repositorio y
  // `paragraph`/`heading` como escribe el orquestador. Mirar uno solo dejaría a
  // Grok leyendo media nota según de dónde venga.
  const prosa = ["p", "paragraph", "h2", "heading", "quote"];
  for (const block of articleBlocks(article)) {
    if (prosa.includes(block.type)) parts.push(blockText(block));
  }
  return parts.join("\n\n").slice(0, max);
}

export function articlesBySection(list: Article[], section: SectionId) {
  return list
    .filter((a) => articleSectionId(a) === section)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function relatedArticles(list: Article[], id: string, limit = 3) {
  const current = getArticle(list, id);
  if (!current) return list.filter((a) => a.id !== id).slice(0, limit);
  const section = articleSectionId(current);
  const same = list.filter((a) => a.id !== id && articleSectionId(a) === section);
  const rest = list.filter((a) => a.id !== id && articleSectionId(a) !== section);
  return [...same, ...rest].slice(0, limit);
}

export function searchArticles(list: Article[], q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return list;
  return list.filter((a) => {
    const author = getAuthor(articleAuthorId(a));
    const hay = [
      a.title,
      a.summary,
      articleKicker(a),
      articleSectionId(a),
      propio(a, "city"),
      "Team Vander",
      "Interadia",
      articleFranchise(a),
      articleSignedName(a),
      author?.name ?? "",
      ...articleTags(a).map((id) => getTag(id)?.label ?? id),
      ...articleBlocks(a).map((b) => blockText(b) || `${blockValue(b)} ${blockLabel(b)}`),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(needle);
  });
}

export function formatIssueDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${d} de ${months[(m ?? 1) - 1]} de ${y}`;
}

export function latestArticles(list: Article[], limit = 8) {
  return [...list]
    .filter((a) => articleFranchise(a) !== "signals" && articleFormat(a) !== "obituario")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export type Brief = {
  id: string;
  time: string;
  title: string;
  section: SectionId;
  slug: string;
};

export const BRIEFS: Brief[] = [
  { id: "b1", time: "09:10", section: "ideas", slug: "el-credito-es-el-producto-el-software-es-el-envase", title: "El crédito es el producto. El software es el envase." },
  { id: "b2", time: "08:42", section: "ideas", slug: "tmec-horizonte-doce-meses", title: "EE.UU. no extendió el T-MEC 16 años. El horizonte ahora es de 12 meses." },
  { id: "b3", time: "08:11", section: "ideas", slug: "ied-noventa-y-cuatro", title: "México: IED récord de US$ 23.591 M. El 94% es reinversión." },
  { id: "b4", time: "07:50", section: "work", slug: "el-salario-dejo-de-ser-en-moneda-local", title: "El salario dejó de ser en moneda local." },
  { id: "b5", time: "07:38", section: "ideas", slug: "pix-problema-comercial", title: "Pix movió R$ 35,3 billones. Washington abrió investigación." },
  { id: "b6", time: "07:05", section: "climate", slug: "el-agua-es-la-restriccion-que-nadie-puso-en-el-modelo-financiero", title: "El agua es la restricción que nadie puso en el modelo financiero." },
  { id: "b7", time: "06:50", section: "ideas", slug: "puerto-cuello-de-botella-geopolitico", title: "El puerto es el nuevo cuello de botella geopolítico." },
  { id: "b8", time: "Ayer", section: "ideas", slug: "innovacion-corporativa-fracaso", title: "La innovación corporativa fracasó. Digan por qué." },
  { id: "b9", time: "Ayer", section: "climate", slug: "chile-vertimiento-6000-gwh", title: "Chile vertió 6.084 GWh de energía limpia en 2025." },
  { id: "b10", time: "18 ago", section: "ideas", slug: "estado-comprador-tecnologia", title: "El Estado es el mayor comprador de tecnología. Nadie le vende." },
];

export const POPULAR_SLUGS = [
  "tmec-horizonte-doce-meses",
  "ied-noventa-y-cuatro",
  "pix-problema-comercial",
  "mercado-libre-dejo-de-ser-ecommerce",
  "chile-vertimiento-6000-gwh",
] as const;

export function popularArticles(list: Article[], limit = 5) {
  return POPULAR_SLUGS.map((slug) => getArticle(list, slug))
    .filter((a): a is Article => a != null)
    .slice(0, limit);
}

export function leadBySection(list: Article[]) {
  return SECTIONS.map((s) => articlesBySection(list, s.id)[0]).filter(
    (a): a is Article => a != null,
  );
}

export function articleCity(article: Article) {
  return propio(article, "city") || getAuthor(articleAuthorId(article))?.city || "";
}

export function leadByDesk(list: Article[]) {
  return DESKS.map((desk) => {
    const match = [...list]
      .filter((a) => articleCity(a) === desk.label)
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
    return match[0];
  }).filter((a): a is Article => a != null);
}

export function formatShortDate(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${d} ${months[(m ?? 1) - 1]}`;
}

export function articlesMentioning(list: Article[], name: string, limit = 4) {
  return searchArticles(list, name).slice(0, limit);
}

export type TagDef = { id: string; label: string; kind: TagKind };

export const TAGS: TagDef[] = [
  { id: "rapida", label: "Lectura rápida", kind: "pace" },
  { id: "fondo", label: "De fondo", kind: "pace" },
  { id: "fintech", label: "Fintech", kind: "industry" },
  { id: "industria", label: "Industria", kind: "industry" },
  { id: "energia", label: "Energía", kind: "industry" },
  { id: "logistica", label: "Logística", kind: "industry" },
  { id: "retail", label: "Retail", kind: "industry" },
  { id: "trabajo", label: "Trabajo", kind: "industry" },
  { id: "diseno", label: "Diseño", kind: "industry" },
  { id: "agro", label: "Agro", kind: "industry" },
  { id: "software", label: "Software", kind: "industry" },
  { id: "moda", label: "Moda", kind: "industry" },
  { id: "ia", label: "IA", kind: "tech" },
  { id: "clima-tech", label: "Clima tech", kind: "tech" },
  { id: "pagos", label: "Pagos", kind: "tech" },
  { id: "nearshoring", label: "Nearshoring", kind: "tech" },
  { id: "hardware", label: "Hardware", kind: "tech" },
  { id: "infraestructura", label: "Infraestructura", kind: "industry" },
];

const SECTION_TAGS: Record<string, string[]> = {
  ideas: ["industria"],
  work: ["trabajo"],
  design: ["diseno", "hardware"],
  climate: ["energia", "clima-tech"],
  culture: ["retail"],
};

const SLUG_TAGS: Record<string, string[]> = {
  "latam-no-pidio-permiso": ["industria", "nearshoring"],
  "nearshoring-despues-del-anuncio": ["industria", "nearshoring"],
  "fintech-despues-del-hype": ["fintech", "pagos"],
  "cult-of-the-analog-office": ["trabajo", "diseno"],
  "el-mito-miami": ["industria", "fintech"],
  "who-owns-climate": ["energia", "clima-tech"],
  "triangulo-del-litio": ["energia", "clima-tech"],
  "ia-en-la-junta": ["ia", "software"],
  "corredor-es-pt": ["fintech", "pagos"],
  "fast-fashion-slow-afterlife": ["moda", "retail"],
  "machines-with-taste": ["diseno", "hardware"],
  "el-pacifico-se-firma-en-lima": ["logistica", "nearshoring"],
  "buenos-aires-restriccion": ["diseno", "industria"],
  melimafia: ["fintech", "pagos"],
};

export function getTag(id: string) {
  return TAGS.find((t) => t.id === id);
}

export function articlePace(article: Article): PaceId {
  const pace = propio(article, "pace");
  if (pace === "rapida" || pace === "fondo") return pace;
  if (articleFranchise(article) === "signals") return "rapida";
  const format = articleFormat(article);
  if (format === "flash" || format === "obituario" || format === "visual") return "rapida";
  return (article.readingMinutes ?? 0) <= 6 ? "rapida" : "fondo";
}

/**
 * Las etiquetas con las que se muestra una nota.
 *
 * `tags` ahora llega siempre —el contrato lo exige— pero puede venir vacío, así
 * que la vuelta atrás por slug y por sección se decide por longitud y no por
 * ausencia: es lo que sostiene a una nota publicada desde el orquestador sin
 * etiquetas propias.
 */
export function articleTags(article: Article): string[] {
  const pace = articlePace(article);
  const propias = article.tags.length
    ? article.tags
    : (SLUG_TAGS[article.id] ?? SECTION_TAGS[articleSectionId(article)] ?? []);
  const rest = propias.filter((t) => t !== "rapida" && t !== "fondo");
  return [...new Set([...rest, pace])];
}

/**
 * Cuándo se corrigió la nota por última vez.
 *
 * El contrato exige la fecha siempre —de ella depende la sincronización con el
 * orquestador—, así que ya no hay que deducirla ni tenerla en una tabla aparte.
 */
export function articleUpdated(article: Article) {
  return article.updatedAt;
}

export function wasUpdated(article: Article) {
  return article.updatedAt !== article.publishedAt;
}

export function articlesByTag(list: Article[], tag: string) {
  return list
    .filter((a) => articleTags(a).includes(tag))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function articlesByFormat(list: Article[], id: FormatId) {
  return list
    .filter((a) => articleFormat(a) === id)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function articlesByFranchise(list: Article[], id: FranchiseId) {
  return list
    .filter((a) => articleFranchise(a) === id)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function articlesByFranchiseTag(list: Article[], id: FranchiseId, tag: string) {
  return articlesByFranchise(list, id).filter((a) => articleTags(a).includes(tag));
}

export function franchiseTags(list: Article[], id: FranchiseId, kind?: TagKind) {
  const used = new Set(articlesByFranchise(list, id).flatMap((a) => articleTags(a)));
  return TAGS.filter((t) => used.has(t.id) && (kind ? t.kind === kind : true));
}

export function articlesByFranchiseAuthor(list: Article[], id: FranchiseId, authorId: string) {
  return articlesByFranchise(list, id).filter((a) => articleAuthorId(a) === authorId);
}

export function franchiseAuthors(list: Article[], id: FranchiseId) {
  const seen = new Set<string>();
  const out: Author[] = [];
  for (const a of articlesByFranchise(list, id)) {
    const authorId = articleAuthorId(a);
    if (seen.has(authorId)) continue;
    seen.add(authorId);
    const author = getAuthor(authorId);
    if (author) out.push(author);
  }
  return out;
}
