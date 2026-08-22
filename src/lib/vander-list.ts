export type ListedCompany = {
  rank: number;
  name: string;
  sector: string;
  city: string;
  blurb: string;
};

export const VANDER_LIST: ListedCompany[] = [
  { rank: 1, name: "Sierra Line", sector: "Industria", city: "Monterrey", blurb: "Nearshoring sin comunicado. Segundo turno, proveedores locales y un P&L que no cabe en un tuit." },
  { rank: 2, name: "Casa Quilate", sector: "Finanzas", city: "São Paulo", blurb: "El banco después del hype. Márgenes feos, sucursal chica, cobro difícil de copiar." },
  { rank: 3, name: "Vesper Grid", sector: "Energía", city: "Calama", blurb: "Solar que trata el Atacama como paisaje. Offtakes a 20 años y código de casa." },
  { rank: 4, name: "Páramo Grid", sector: "Energía", city: "Bogotá", blurb: "Viento a 2.600 metros. Sin puerto, con red. El clima como escritorio." },
  { rank: 5, name: "Northroom", sector: "Trabajo", city: "Santiago", blurb: "Oficinas como protocolos. Wifi lento, mesas largas, lista de espera de 24 meses." },
  { rank: 6, name: "Tercer Turno", sector: "Logística", city: "Lima", blurb: "El Pacífico se firma en Callao. Handoff en prosa. Nombra el barco." },
  { rank: 7, name: "Bruma Studio", sector: "Diseño", city: "Buenos Aires", blurb: "Corta con lo que hay. La restricción argentina, convertida en código de casa." },
  { rank: 8, name: "Sombra Studio", sector: "Software", city: "Ciudad de México", blurb: "Herramientas espaciales publicadas por temporadas, como una colección." },
  { rank: 9, name: "Altura Code", sector: "Software", city: "Medellín", blurb: "Software sin brochure. Cuatro looks al año. El mural, afuera." },
  { rank: 10, name: "Pampa Seed", sector: "Agritech", city: "Buenos Aires", blurb: "Suelo, datos y contratos largos. Cero teatro de lanzamiento." },
  { rank: 11, name: "Helio Thread", sector: "Clima / Textil", city: "Valparaíso", blurb: "Tela de calor residual. La bandera del founder de quince minutos." },
  { rank: 12, name: "Barrio Capital", sector: "Venture", city: "Santiago", blurb: "Un fondo que solo invierte en lo que se camina. Escritorio también en CDMX." },
  { rank: 13, name: "Oro Verde", sector: "Tierra", city: "Colchagua", blurb: "Supply regenerativo que rechazó a nuestro fotógrafo. Silencio como estrategia." },
  { rank: 14, name: "Cuatro Paredes", sector: "Arquitectura", city: "Oaxaca", blurb: "Vivienda como práctica material. Tierra, cal y un no al cubo blanco." },
  { rank: 15, name: "Mesa Radio", sector: "Medios", city: "Santiago", blurb: "Audio independiente con campana de cierre. La grilla, impresa." },
  { rank: 16, name: "Casa Hilo", sector: "Moda", city: "Providencia", blurb: "Tres metros, ventana de reparación, cero drop." },
  { rank: 17, name: "Lumen Tide", sector: "Energía", city: "Puerto Montt", blurb: "Mareas con sendero de visita. Infraestructura que se camina sin casco." },
  { rank: 18, name: "Glass Orchard", sector: "Alimentos", city: "Mendoza", blurb: "Invernaderos con lighting designer en staff. Produce como capilla." },
  { rank: 19, name: "Kinship Clay", sector: "Producto", city: "São Paulo", blurb: "Termostatos que pesan de más. El QA es el pulgar, no el reel." },
  { rank: 20, name: "Río Abierto", sector: "Retail", city: "São Paulo", blurb: "Tiendas que tratan el piso como canal y el feed como afiche." },
];
