import { AGOSTO_ARTICLES } from "./agosto";
import { FONDO_ARTICLES } from "./fondo";
import { FONDO2_ARTICLES } from "./fondo2";
import { MELIMAFIA } from "./melimafia";

export type SectionId = "ideas" | "work" | "design" | "climate" | "culture";
export type PaceId = "rapida" | "fondo";
export type FranchiseId = "contra" | "signals";
export type TagKind = "industry" | "tech" | "pace";
export type FormatId = "essay" | "interview" | "flash" | "obituario" | "indice" | "visual";

export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "q"; text: string }
  | { type: "a"; text: string }
  | { type: "stat"; value: string; label: string };

export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  city: string;
  image: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  kicker: string;
  section: SectionId;
  authorId: string;
  publishedAt: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  caption: string;
  featured?: boolean;
  city?: string;
  updatedAt?: string;
  tags?: string[];
  pace?: PaceId;
  franchise?: FranchiseId;
  signedName?: string;
  format?: FormatId;
  gallery?: { src: string; alt: string; caption: string }[];
  pullQuote: string;
  body: BodyBlock[];
  tldr?: string[];
  faq?: { q: string; a: string }[];
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

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

export const ARTICLES: Article[] = [
  MELIMAFIA,
  ...AGOSTO_ARTICLES,
  ...FONDO_ARTICLES,
  ...FONDO2_ARTICLES,
];

export function getSectionLabel(id: SectionId) {
  return SECTIONS.find((s) => s.id === id)?.label ?? id;
}

export function getAuthor(id: string) {
  return AUTHORS.find((a) => a.id === id);
}

export function teamByline(article: Article, withPor = true) {
  const city = articleCity(article);
  const name = article.signedName ?? "Team Vander";
  const who = withPor ? `Por ${name}` : name;
  return city ? `${who} · ${city}` : who;
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articleContext(article: Article, max = 4500) {
  const parts: string[] = [`Título: ${article.title}`, `Bajada: ${article.dek}`];
  for (const block of article.body) {
    if (block.type === "p" || block.type === "h2" || block.type === "quote") {
      parts.push(block.text);
    }
  }
  return parts.join("\n\n").slice(0, max);
}

export function articlesBySection(section: SectionId) {
  return ARTICLES.filter((a) => a.section === section).sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export function relatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
  const same = ARTICLES.filter((a) => a.slug !== slug && a.section === current.section);
  const rest = ARTICLES.filter((a) => a.slug !== slug && a.section !== current.section);
  return [...same, ...rest].slice(0, limit);
}

export function searchArticles(q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return ARTICLES;
  return ARTICLES.filter((a) => {
    const author = getAuthor(a.authorId);
    const hay = [
      a.title,
      a.dek,
      a.kicker,
      a.section,
      a.city ?? "",
      "Team Vander",
      "Interadia",
      a.franchise ?? "",
      a.signedName ?? "",
      author?.name ?? "",
      ...articleTags(a).map((id) => getTag(id)?.label ?? id),
      ...a.body.map((b) => ("text" in b ? b.text : `${b.value} ${b.label}`)),
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

export function latestArticles(limit = 8) {
  return [...ARTICLES]
    .filter((a) => a.franchise !== "signals" && a.format !== "obituario")
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

export function popularArticles(limit = 5) {
  return POPULAR_SLUGS.map((slug) => getArticle(slug))
    .filter((a): a is Article => a != null)
    .slice(0, limit);
}

export function leadBySection() {
  return SECTIONS.map((s) => articlesBySection(s.id)[0]).filter((a): a is Article => a != null);
}

export function articleCity(article: Article) {
  return article.city ?? getAuthor(article.authorId)?.city ?? "";
}

export function leadByDesk() {
  return DESKS.map((desk) => {
    const match = [...ARTICLES]
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

export function articlesMentioning(name: string, limit = 4) {
  return searchArticles(name).slice(0, limit);
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

const SECTION_TAGS: Record<SectionId, string[]> = {
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

const UPDATED_AT: Record<string, string> = {
  "latam-no-pidio-permiso": "2026-08-21",
  "nearshoring-despues-del-anuncio": "2026-08-20",
  "fintech-despues-del-hype": "2026-08-19",
  "cult-of-the-analog-office": "2026-08-18",
  "el-mito-miami": "2026-08-21",
  "ia-en-la-junta": "2026-08-17",
};

export function getTag(id: string) {
  return TAGS.find((t) => t.id === id);
}

export function articlePace(article: Article): PaceId {
  if (article.pace) return article.pace;
  if (article.franchise === "signals") return "rapida";
  if (article.format === "flash" || article.format === "obituario" || article.format === "visual") return "rapida";
  return article.readMinutes <= 6 ? "rapida" : "fondo";
}

export function articleTags(article: Article): string[] {
  const pace = articlePace(article);
  const rest = (article.tags ?? SLUG_TAGS[article.slug] ?? SECTION_TAGS[article.section] ?? []).filter(
    (t) => t !== "rapida" && t !== "fondo",
  );
  return [...new Set([...rest, pace])];
}

export function articleUpdated(article: Article) {
  return article.updatedAt ?? UPDATED_AT[article.slug] ?? article.publishedAt;
}

export function wasUpdated(article: Article) {
  return articleUpdated(article) !== article.publishedAt;
}

export function articlesByTag(tag: string) {
  return ARTICLES.filter((a) => articleTags(a).includes(tag)).sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export function articlesByFormat(id: FormatId) {
  return ARTICLES.filter((a) => a.format === id).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function articlesByFranchise(id: FranchiseId) {
  return ARTICLES.filter((a) => a.franchise === id).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function articlesByFranchiseTag(id: FranchiseId, tag: string) {
  return articlesByFranchise(id).filter((a) => articleTags(a).includes(tag));
}

export function franchiseTags(id: FranchiseId, kind?: TagKind) {
  const used = new Set(articlesByFranchise(id).flatMap((a) => articleTags(a)));
  return TAGS.filter((t) => used.has(t.id) && (kind ? t.kind === kind : true));
}

export function articlesByFranchiseAuthor(id: FranchiseId, authorId: string) {
  return articlesByFranchise(id).filter((a) => a.authorId === authorId);
}

export function franchiseAuthors(id: FranchiseId) {
  const seen = new Set<string>();
  const out: Author[] = [];
  for (const a of articlesByFranchise(id)) {
    if (seen.has(a.authorId)) continue;
    seen.add(a.authorId);
    const author = getAuthor(a.authorId);
    if (author) out.push(author);
  }
  return out;
}


