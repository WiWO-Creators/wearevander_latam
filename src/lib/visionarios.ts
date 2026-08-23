import { groupByLabel, toCatSlug } from "./taxonomy";
import type { Under40Profile } from "./under40";
import { under40Links as sharedLinks, UNDER40 } from "./under40";
import arRaw from "./visionarios-ar.json";
import coRaw from "./visionarios-co.json";

export type Visionario = Under40Profile & {
  cohort?: "sub40" | "referente";
};

export type VisionarioCountry = "cl" | "ar" | "co";

export type VisionarioVolume = {
  id: VisionarioCountry;
  slug: string;
  path: "/under40" | "/visionarios/argentina" | "/visionarios/colombia";
  name: string;
  adjective: string;
  kicker: string;
  dek: string;
  volume: string;
  city: string;
  men: number;
  women: number;
  verticals: number;
  regions: number;
  illustration: string;
  og: string;
  people: Visionario[];
  method: { n: string; title: string; body: string }[];
  warnings: string[];
};

export const VISIONARIOS_AR = arRaw as Visionario[];
export const VISIONARIOS_CO = coRaw as Visionario[];

export const VOLUME_AR: VisionarioVolume = {
  id: "ar",
  slug: "argentina",
  path: "/visionarios/argentina",
  name: "Argentina",
  adjective: "argentinos",
  kicker: "Solo Argentina · volumen II · agosto 2026",
  dek: "Cien visionarios argentinos: setenta menores de 40 y treinta referentes. Edad declarada, prensa con enlace. Esta lista cubre solo Argentina.",
  volume: "II",
  city: "Buenos Aires",
  men: 70,
  women: 30,
  verticals: 9,
  regions: 12,
  illustration: "/illustrations/cien-ar.jpg",
  og: "/og/visionarios-ar.jpg",
  people: VISIONARIOS_AR,
  method: [
    {
      n: "01",
      title: "Fuentes primarias",
      body: "MIT Technology Review Innovadores menores de 35 LATAM (2019 a 2025), Forbes Argentina y Forbes 30 Under 30, Endeavor Argentina, Premio Arcor e Israel Innovation Awards. Cruzado con Infobae, La Nación, Clarín, El Cronista, Apertura, Infotechnology, Perfil, Ámbito, iProUP, Bloomberg Línea y Contxto.",
    },
    {
      n: "02",
      title: "Corte de edad",
      body: "Nacidos en 1986 o después. Dos casos límite, marcados en la ficha: Pierpaolo Barbieri (39) y Luciana Reznik (≈40). Los treinta referentes no tienen corte etario: el criterio ahí fue la vigencia.",
    },
    {
      n: "03",
      title: "La edad se declara",
      body: "Verificada, derivada o no verificada. Veintiún perfiles de los cien llevan la edad como no verificada. Ninguna edad fue inventada.",
    },
    {
      n: "04",
      title: "Pasada federal",
      body: "Además de la prensa nacional, se buscaron en La Voz del Interior, Punto a Punto, Los Andes, La Gaceta, Río Negro, El Litoral, Infonegocios, Punto Biz, Cadena 3 y El Ciudadano.",
    },
  ],
  warnings: [
    "La composición es 70 hombres y 30 mujeres. No se corrige inventando perfiles: es el reflejo de un ecosistema donde la prensa documenta mucho menos a las fundadoras.",
    "Pierpaolo Barbieri entra por meses. Luciana Reznik es el caso más frágil del bloque sub-40: confirmar antes de citar la edad como hecho.",
    "Franco Kraiselburd nació en Boston de padres argentinos y vive en Cleveland. Maritsa Puma nació en Bolivia y migró a los once años.",
    "No son argentinos, aunque operen en la Argentina: Santiago Rosenblatt (Strike) y Ady Beitler (Nilus) son uruguayos; Rappi es colombiana, PedidosYa uruguaya, Kavak mexicana.",
  ],
};

export const VOLUME_CO: VisionarioVolume = {
  id: "co",
  slug: "colombia",
  path: "/visionarios/colombia",
  name: "Colombia",
  adjective: "colombianos",
  kicker: "Solo Colombia · volumen III · agosto 2026",
  dek: "Cien visionarios colombianos: setenta menores de 40 y treinta referentes. 57 hombres y 43 mujeres. Edad declarada, prensa con enlace. Esta lista cubre solo Colombia.",
  volume: "III",
  city: "Bogotá",
  men: 57,
  women: 43,
  verticals: 9,
  regions: 8,
  illustration: "/illustrations/cien-co.jpg",
  og: "/og/visionarios-co.jpg",
  people: VISIONARIOS_CO,
  method: [
    {
      n: "01",
      title: "Fuentes primarias",
      body: "Forbes Colombia «30 Promesas de los Negocios» (2020 a 2024) y «30 Under 30 Colombia» (2025 y 2026), MIT Technology Review Innovadores menores de 35 LATAM. Cruzado con Semana, El Tiempo, El Espectador, La República, Portafolio, Bloomberg Línea e Impacto TIC, más El Colombiano, El País de Cali, El Heraldo y Vanguardia.",
    },
    {
      n: "02",
      title: "Corte de edad",
      body: "Nacidos en 1986 o después. Dos excepciones marcadas: Santiago Suárez (40, Addi) y Daniel Bilbao (42, Truora), figuras ineludibles de la fintech colombiana. Los treinta referentes no tienen corte etario.",
    },
    {
      n: "03",
      title: "La edad se declara",
      body: "Verificada, derivada o no verificada. En los setenta sub-40 hay solo tres con la edad sin verificar. Es el índice de verificación más alto de los tres volúmenes.",
    },
    {
      n: "04",
      title: "Nacionalidad",
      body: "Se verificó caso por caso. Instaleap fue construida en Colombia con fundadores portugueses. Mercedes Bidart (Quipu) es argentina. Quedaron fuera.",
    },
  ],
  warnings: [
    "Santiago Suárez y Daniel Bilbao superan el corte y entran como figuras ineludibles.",
    "Cristal Carvajal Giraldo tiene 16 años y es investigadora, no fundadora de empresa. Se incluyó por el Premio Nacional al Inventor Colombiano 2026.",
    "Chocó, Cauca, Nariño, Amazonas y Santander quedan casi sin representación: los medios que publican edad concentran la cobertura en el eje Bogotá–Medellín–Cali–Barranquilla.",
    "El nombre «David Poswick» circula asociado a Littio. El fundador documentado es Christian Knudsen Daccach.",
  ],
};

export const VOLUMES: VisionarioVolume[] = [
  {
    id: "cl",
    slug: "chile",
    path: "/under40",
    name: "Chile",
    adjective: "chilenos",
    kicker: "Solo Chile · volumen I · agosto 2026",
    dek: "Cien visionarios chilenos. Edad declarada, prensa con enlace.",
    volume: "I",
    city: "Santiago",
    men: 59,
    women: 42,
    verticals: 9,
    regions: 13,
    illustration: "/illustrations/cien.jpg",
    og: "/og/under40.jpg",
    people: UNDER40 as Visionario[],
    method: [],
    warnings: [],
  },
  VOLUME_AR,
  VOLUME_CO,
];

export function getVolume(id: VisionarioCountry) {
  if (id === "ar") return VOLUME_AR;
  if (id === "co") return VOLUME_CO;
  return VOLUMES[0];
}

export function getVisionario(volume: VisionarioVolume, slug: string) {
  return volume.people.find((p) => p.slug === slug);
}

export function adjacentVisionario(volume: VisionarioVolume, slug: string) {
  const list = volume.people;
  const i = list.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : list[list.length - 1],
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : list[0],
  };
}

export function visionarioSectors(people: Visionario[]) {
  return groupByLabel(people, (p) => p.sector);
}

const CITY_MIN = 2;

export function visionarioCities(people: Visionario[]) {
  const groups = groupByLabel(people, (p) => p.city);
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

export function inVisionarioCity(people: Visionario[], person: Visionario, city: string | null) {
  if (!city) return true;
  if (city === "Otras") {
    const named = new Set(
      groupByLabel(people, (p) => p.city)
        .filter((g) => g.items.length >= CITY_MIN)
        .map((g) => g.label),
    );
    return !named.has(person.city);
  }
  return person.city === city;
}

export const visionarioLinks = sharedLinks;
export const toVisionarioSlug = toCatSlug;
