import { findGroup, groupByLabel } from "./taxonomy";
import raw from "./innovatives-data.json";

export type InnovativeSource = { title: string; url: string };

export type Innovative = {
  rank: number;
  slug: string;
  name: string;
  sector: string;
  vertical: string;
  city: string;
  country: string;
  founded: string;
  status: string;
  web: string;
  press: string;
  domain: string;
  brief: string;
  detail: string;
  why: string;
  stats: string[];
  founders: string;
  ceo: string;
  sources: InnovativeSource[];
  warning: boolean;
  blurb: string;
  image: string;
  proof: string;
};

export type InnovWatch = {
  name: string;
  country: string;
  vertical: string;
  why: string;
  warning: boolean;
};

type FileShape = { companies: Innovative[]; watch: InnovWatch[] };

const DATA = raw as FileShape;

export const INNOVATIVES: Innovative[] = [...DATA.companies].sort((a, b) => a.rank - b.rank);

export const INNOV_WATCH: InnovWatch[] = DATA.watch;

export const INNOVATIVES_META = {
  kicker: "Anual 2026 · Latam",
  dek: "Esta no es una lista de las 50 startups más grandes de Latinoamérica. Es una lista de las 50 que están rompiendo algo. Cada empresa entra por una innovación verificable —tecnología, modelo o jugada regulatoria— no por el tamaño de su última ronda.",
  updated: "23 de agosto de 2026",
  brazil: 16,
  mexico: 7,
  argentina: 8,
  chile: 8,
  colombia: 6,
  uruguay: 3,
  peru: 1,
  costarica: 1,
} as const;

export const INNOVATIVES_METHOD = [
  {
    title: "Innovación verificable",
    text: "Entra una pieza de tecnología, un modelo de negocio o una jugada regulatoria que no existía antes en la región. No entra el tamaño de la ronda.",
  },
  {
    title: "Escalas mezcladas a propósito",
    text: "Conviven un banco con 139 millones de clientes y un laboratorio de fotones entrelazados. La innovación de 2026 no está solo en los unicornios de 2021.",
  },
  {
    title: "Todo dato tiene fuente y año",
    text: "Donde no pudimos confirmar una cifra, lo decimos. Preferimos un vacío honesto a un número inflado. Marcamos con advertencia las que atraviesan dificultades reales.",
  },
  {
    title: "Geografía sin cupo",
    text: "Brasil concentra 16 de las 50 porque concentra el capital. Perú aparece una vez porque solo una compañía peruana superó el filtro. Eso también es información.",
  },
  {
    title: "Sin pago por aparecer",
    text: "La redacción propone, cruza y publica. Nadie compra un puesto. Si la innovación se deshace, sale del número siguiente.",
  },
];

export const INNOV_PATTERNS = [
  {
    title: "La innovación financiera está superando a la tecnológica",
    text: "Los movimientos más inteligentes de 2026 no fueron de producto sino de estructura: pre-financiar un biodigestor contra carbono futuro, meterse dentro de una póliza, construir deuda para tener costo de banco sin serlo.",
  },
  {
    title: "La licencia volvió a ser la barrera",
    text: "Plata ganó la carrera bancaria mexicana. Kapital compró un banco. Ualá compró dos. Speedbird consiguió el permiso de vuelo urbano. Lo escaso —y por lo tanto lo defendible— es el permiso.",
  },
  {
    title: "Brasil dejó de prometer carbono y empezó a entregarlo",
    text: "Mombak, InPlanet, re.green. En dieciocho meses el país armó la infraestructura de verificación que el mercado voluntario global no había logrado en una década.",
  },
  {
    title: "La rentabilidad se volvió el nuevo estatus",
    text: "Global66 lleva dos años y medio en azul. Addi, dos. QuintoAndar desde 2021. Kavak levantó US$300 millones después de un mes rentable, no por el crecimiento.",
  },
  {
    title: "La ventaja real son los problemas",
    text: "Enter existe porque Brasil tiene decenas de millones de causas pendientes. Puna Bio, por microorganismos que nadie fabrica. Bitso, por el corredor de remesas más grande del planeta. No son versiones locales de algo global.",
  },
];

export const INNOV_RESERVED = new Set(["sector", "pais", "metodologia"]);

export function getInnovative(slug: string) {
  if (INNOV_RESERVED.has(slug)) return undefined;
  return INNOVATIVES.find((c) => c.slug === slug);
}

export function adjacentInnovative(slug: string) {
  const index = INNOVATIVES.findIndex((c) => c.slug === slug);
  return {
    index,
    prev: index > 0 ? INNOVATIVES[index - 1] : undefined,
    next: index >= 0 && index < INNOVATIVES.length - 1 ? INNOVATIVES[index + 1] : undefined,
  };
}

export function innovSectors() {
  return groupByLabel(INNOVATIVES, (c) => c.sector);
}

export function innovCountries() {
  return groupByLabel(INNOVATIVES, (c) => c.country);
}

export function innovSector(slug: string) {
  return findGroup(innovSectors(), slug);
}

export function innovCountry(slug: string) {
  return findGroup(innovCountries(), slug);
}
