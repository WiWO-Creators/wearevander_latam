import { groupByLabel, toCatSlug } from "./taxonomy";
import raw from "./under40-data.json";

export type Under40News = {
  title: string;
  url: string;
  credit: string;
};

export type Under40Profile = {
  rank: number;
  slug: string;
  name: string;
  role: string;
  sector: string;
  sectorSlug: string;
  sectorDetail: string;
  focus: string;
  place: string;
  city: string;
  age: string;
  ageShort: string;
  verification: "verificada" | "derivada" | "acotada" | "estimada" | "no-verificada";
  bio: string;
  hitos: string[];
  news: Under40News[];
  url: string;
  linkedin: string;
  trust: string;
  image: string;
};

export type Under40Link = {
  href: string;
  label: string;
  kind: "linkedin" | "web";
};

export const UNDER40 = raw as Under40Profile[];

export const UNDER40_META = {
  title: "100 under 40",
  kicker: "Chile · agosto 2026",
  dek: "Chilenas y chilenos menores de 40 que fundaron o dirigen. Cada ficha trae retrato, bio, hitos, prensa y un enlace a LinkedIn o a la empresa. Ninguna edad fue inventada.",
  men: 60,
  women: 44,
  verticals: 9,
  regions: 13,
} as const;

export const UNDER40_METHOD = [
  {
    n: "01",
    title: "Fuentes primarias",
    body: "Forbes Chile 30 Under 30 (2025 y 2026), MIT Technology Review Innovadores menores de 35 LATAM, 100 Jóvenes Líderes UAI / Sábado, Avonni e Impacto Social. Cruzado con DF, Pulso, Ex-Ante, Emol, País Circular, Chócale y Bloomberg Línea.",
  },
  {
    n: "02",
    title: "Corte de edad",
    body: "Nacidos en 1986 o después. Cinco excepciones de hasta 42, marcadas en la ficha, cuando la figura era ineludible en su vertical. La adenda 35-40 entra con edad publicada en fuente fechada.",
  },
  {
    n: "03",
    title: "La edad se declara",
    body: "Verificada, derivada, acotada, estimada o no verificada. Si dice no verificada, no se publica como hecho hasta confirmarla.",
  },
  {
    n: "04",
    title: "Fuera de lista",
    body: "Se descartaron deportistas, artistas y funcionarios sin emprendimiento propio. Varios nombres que circulan como chilenos no lo son.",
  },
] as const;

export function getUnder40(slug: string) {
  return UNDER40.find((p) => p.slug === slug);
}

export function adjacentUnder40(slug: string) {
  const i = UNDER40.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? UNDER40[i - 1] : UNDER40[UNDER40.length - 1],
    next: i >= 0 && i < UNDER40.length - 1 ? UNDER40[i + 1] : UNDER40[0],
  };
}

export function under40Sectors() {
  return groupByLabel(UNDER40, (p) => p.sector);
}

const CITY_MIN = 2;

export function hubCity(person: Under40Profile) {
  return person.city;
}

export function under40Cities() {
  const groups = groupByLabel(UNDER40, hubCity);
  const main = groups.filter((g) => g.items.length >= CITY_MIN);
  const rest = groups.filter((g) => g.items.length < CITY_MIN);
  if (rest.length) {
    main.push({
      label: "Otras",
      slug: "otras",
      items: rest.flatMap((g) => g.items),
    });
  }
  return main;
}

export function inUnder40City(person: Under40Profile, city: string | null) {
  if (!city) return true;
  if (city === "Otras") {
    const named = new Set(
      groupByLabel(UNDER40, hubCity)
        .filter((g) => g.items.length >= CITY_MIN)
        .map((g) => g.label),
    );
    return !named.has(person.city);
  }
  return person.city === city;
}

export function under40BySector(slug: string) {
  return under40Sectors().find((g) => g.slug === slug);
}

export function sectorAccent(slug: string) {
  const map: Record<string, string> = {
    fintech: "rust",
    ia: "signal",
    foodtech: "innov",
    salud: "rust",
    educacion: "signal",
    comercio: "innov",
    cleantech: "innov",
    impacto: "rust",
    capital: "signal",
  };
  return map[slug] ?? "rust";
}

export function toUnder40Slug(label: string) {
  return toCatSlug(label);
}

export function hostFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export function under40Links(person: Under40Profile): Under40Link[] {
  const links: Under40Link[] = [];
  const seen = new Set<string>();
  const push = (href: string, label: string, kind: Under40Link["kind"]) => {
    const key = href.replace(/\/$/, "").toLowerCase();
    if (!href || seen.has(key)) return;
    seen.add(key);
    links.push({ href, label, kind });
  };
  if (person.linkedin) {
    push(person.linkedin, "LinkedIn", "linkedin");
  }
  if (person.url && !/linkedin\.com\//i.test(person.url)) {
    push(person.url, hostFromUrl(person.url), "web");
  } else if (person.url && !person.linkedin) {
    push(person.url, "LinkedIn", "linkedin");
  }
  return links;
}
