export const SITE = {
  url: "https://www.wearevander.com",
  name: "We Are Vander",
  publisher: "Interadia",
  description:
    "We Are Vander es el medio de negocios de Interadia. Reporta compañías latinoamericanas con cifras, fuentes y metodología pública, desde CDMX, São Paulo, Buenos Aires, Bogotá, Santiago y Lima.",
  locale: "es_LA",
  image: "/og.jpg",
  imageAlt: "Wordmark de We Are Vander sobre fondo negro",
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
  published?: string;
  modified?: string;
  noindex?: boolean;
};

function abs(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonical(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p === "/" ? "/" : p.replace(/\/$/, "")}`;
}

function socialTitle(input: SeoInput) {
  if (input.ogTitle) return input.ogTitle;
  return input.title.replace(/\s+[—|]\s+We Are Vander$/i, "").slice(0, 60);
}

function socialDesc(input: SeoInput) {
  const raw = input.ogDescription ?? input.description;
  return raw.replace(/\s+/g, " ").trim().slice(0, 110);
}

export function seoHead(input: SeoInput) {
  const url = canonical(input.path);
  const imagePath = input.image || SITE.image;
  const image = abs(imagePath);
  const title = input.title;
  const desc = input.description.replace(/\s+/g, " ").trim().slice(0, 160);
  const ogTitle = socialTitle(input).slice(0, 60);
  const ogDesc = socialDesc(input);
  const imageAlt = input.imageAlt || SITE.imageAlt;
  const isJpg = imagePath.toLowerCase().endsWith(".jpg") || imagePath.toLowerCase().endsWith(".jpeg");
  const mime = isJpg ? "image/jpeg" : imagePath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

  return {
    meta: [
      { title },
      { name: "description", content: desc },
      ...(input.noindex ? [{ name: "robots", content: "noindex,follow" }] : []),
      { property: "og:type", content: input.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDesc },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:type", content: mime },
      { property: "og:image:width", content: String(OG_SIZE.width) },
      { property: "og:image:height", content: String(OG_SIZE.height) },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:locale", content: SITE.locale },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDesc },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: imageAlt },
      ...(input.published ? [{ property: "article:published_time", content: input.published }] : []),
      ...(input.modified ? [{ property: "article:modified_time", content: input.modified }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE.name,
    legalName: SITE.publisher,
    url: SITE.url,
    logo: abs("/icon-512.png"),
    description: SITE.description,
    foundingDate: "2024",
    areaServed: "Latin America",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "es",
    publisher: { "@type": "Organization", name: SITE.publisher },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: opts.headline,
    description: opts.description,
    image: [abs(opts.image)],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: opts.author },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: abs("/icon-512.png") },
    },
    mainEntityOfPage: canonical(opts.path),
    articleSection: opts.section ?? "Ideas",
    inLanguage: "es",
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListSchema(opts: {
  name: string;
  path: string;
  description: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    description: opts.description,
    url: canonical(opts.path),
    numberOfItems: opts.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: opts.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: canonical(it.path),
    })),
  };
}

