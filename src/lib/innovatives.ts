export type Innovative = {
  rank: number;
  slug: string;
  name: string;
  sector: string;
  city: string;
  country: string;
  blurb: string;
  why: string;
  image: string;
};

const P = {
  factory: "/photos/monterrey-factory.jpg",
  fintech: "/photos/saopaulo-fintech.jpg",
  atacama: "/photos/climate-atacama.jpg",
  bogota: "/photos/bogota.jpg",
  analog: "/photos/analog-office.jpg",
  lima: "/photos/lima-port.jpg",
  atelier: "/photos/fashion-atelier.jpg",
  medellin: "/photos/medellin-office.jpg",
  paulista: "/photos/saopaulo-paulista.jpg",
  ba: "/photos/buenos-aires.jpg",
  cdmx: "/photos/cdmx-reforma.jpg",
  mill: "/photos/mill.jpg",
  workshop: "/photos/workshop.jpg",
  radio: "/photos/radio.jpg",
  still: "/photos/still-life.jpg",
  rooftop: "/photos/rooftop.jpg",
  board: "/photos/boardroom.jpg",
  bakery: "/photos/bakery.jpg",
  neighborhood: "/photos/neighborhood.jpg",
  tactile: "/photos/tactile.jpg",
} as const;

export const INNOVATIVES_RAW: Innovative[] = [
  { rank: 1, slug: "sierra-line", name: "Sierra Line", sector: "Industria", city: "Monterrey", country: "México", blurb: "Nearshoring sin comunicado. Segundo turno y proveedores a una hora.", why: "Evidencia operativa sobre narrativa. El segundo turno es el producto.", image: P.factory },
  { rank: 2, slug: "casa-quilate", name: "Casa Quilate", sector: "Fintech", city: "São Paulo", country: "Brasil", blurb: "Banco después del hype. Márgenes feos, sucursal chica.", why: "Cambia el KPI: de usuarios a no perder la cuenta.", image: P.fintech },
  { rank: 3, slug: "vesper-grid", name: "Vesper Grid", sector: "Energía", city: "Calama", country: "Chile", blurb: "Solar que trata el Atacama como paisaje. Offtakes a 20 años.", why: "Geografía nombrada. El ticker no basta.", image: P.atacama },
  { rank: 4, slug: "paramo-grid", name: "Páramo Grid", sector: "Energía", city: "Bogotá", country: "Colombia", blurb: "Viento a 2.600 metros. Sin puerto, con red.", why: "Innovación de red, no de brochure.", image: P.bogota },
  { rank: 5, slug: "northroom", name: "Northroom", sector: "Trabajo", city: "Santiago", country: "Chile", blurb: "Oficinas como protocolo. Wifi lento, lista de espera de 24 meses.", why: "Convierte una restricción cultural en un line item.", image: P.analog },
  { rank: 6, slug: "tercer-turno", name: "Tercer Turno", sector: "Logística", city: "Lima", country: "Perú", blurb: "El Pacífico se firma en Callao. Nombra el barco.", why: "Protocolo de supply que no se puede copiar desde un slide.", image: P.lima },
  { rank: 7, slug: "bruma-studio", name: "Bruma Studio", sector: "Diseño", city: "Buenos Aires", country: "Argentina", blurb: "Corta con lo que hay. El brief llega incompleto.", why: "La escasez como sistema de diseño, no como estética.", image: P.workshop },
  { rank: 8, slug: "altura-code", name: "Altura Code", sector: "Software", city: "Medellín", country: "Colombia", blurb: "Publica por temporadas. El mural, afuera.", why: "Producto con calendario de colección, no de sprint eterno.", image: P.medellin },
  { rank: 9, slug: "rio-abierto", name: "Río Abierto", sector: "Retail", city: "São Paulo", country: "Brasil", blurb: "El piso es el canal. El feed es afiche.", why: "Revierte la jerarquía atención/criterio.", image: P.paulista },
  { rank: 10, slug: "casa-hilo", name: "Casa Hilo", sector: "Moda", city: "Santiago", country: "Chile", blurb: "Tres metros, calendario en la pared, cero drop.", why: "Estatus = horario de apertura. Copiable, difícil.", image: P.atelier },
  { rank: 11, slug: "mesa-radio", name: "Mesa Radio", sector: "Medios", city: "Buenos Aires", country: "Argentina", blurb: "Imprime la grilla. Si no cabe en un A4, no era programación.", why: "El medio como objeto, no como feed.", image: P.radio },
  { rank: 12, slug: "kinship-clay", name: "Kinship Clay", sector: "Producto", city: "São Paulo", country: "Brasil", blurb: "Termostatos que pesan de más. El QA es el pulgar.", why: "Materialidad como ventaja, no como mood.", image: P.still },
  { rank: 13, slug: "cuatro-paredes", name: "Cuatro Paredes", sector: "Arquitectura", city: "Oaxaca", country: "México", blurb: "Tierra y cal. El cubo blanco perdió.", why: "Técnica local a escala de encargo corporativo.", image: P.workshop },
  { rank: 14, slug: "lumen-tide", name: "Lumen Tide", sector: "Energía", city: "Puerto Montt", country: "Chile", blurb: "Mareas con sendero. Infraestructura que se camina.", why: "Visita sin casco de teatro. Capital paciente.", image: P.atacama },
  { rank: 15, slug: "glass-orchard", name: "Glass Orchard", sector: "Agro", city: "Mendoza", country: "Argentina", blurb: "Invernadero con lighting designer en staff.", why: "Produce como capilla: temperatura, sombra, peso.", image: P.still },
  { rank: 16, slug: "sombra-studio", name: "Sombra Studio", sector: "Diseño", city: "Ciudad de México", country: "México", blurb: "Identidades que se tocan. Menos reel, más papel.", why: "El sistema gráfico sobrevive al screenshot.", image: P.cdmx },
  { rank: 17, slug: "helio-thread", name: "Helio Thread", sector: "Trabajo", city: "Guadalajara", country: "México", blurb: "Turnos de software con costura visible.", why: "El calendario como producto, no como burnout.", image: P.rooftop },
  { rank: 18, slug: "barrio-capital", name: "Barrio Capital", sector: "Finanzas", city: "Bogotá", country: "Colombia", blurb: "Cheques chicos a puertas, no a decks.", why: "Underwriting de calle. El audio no era el activo.", image: P.neighborhood },
  { rank: 19, slug: "nero-paper", name: "Nero Paper", sector: "Industria", city: "Concepción", country: "Chile", blurb: "Papel que no se pide para mañana.", why: "Lead time como lujo industrial.", image: P.mill },
  { rank: 20, slug: "archive-monday", name: "Archive Monday", sector: "Moda", city: "Buenos Aires", country: "Argentina", blurb: "Dejó de fingir que el mundo necesitaba otra polera virgen.", why: "Reuso como SKU, no como campaña.", image: P.atelier },
  { rank: 21, slug: "puerto-seco", name: "Puerto Seco", sector: "Logística", city: "Querétaro", country: "México", blurb: "Aduana como producto. El patio es el software.", why: "Digitaliza el patio, no el press kit.", image: P.factory },
  { rank: 22, slug: "sal-baja", name: "Sal Baja", sector: "Alimentos", city: "Cusco", country: "Perú", blurb: "Cadena corta con precio en la pizarra.", why: "Trazabilidad que se lee en el mercado, no en un QR vacío.", image: P.bakery },
  { rank: 23, slug: "linea-ocho", name: "Línea Ocho", sector: "Software", city: "Córdoba", country: "Argentina", blurb: "ERP para pymes que odian el ERP.", why: "Onboarding en una tarde. El enemigo es el consultor eterno.", image: P.board },
  { rank: 24, slug: "viento-sur", name: "Viento Sur", sector: "Energía", city: "Valdivia", country: "Chile", blurb: "Comunidad como offtaker, no como stakeholder.", why: "El pueblo firma. El fondo espera.", image: P.atacama },
  { rank: 25, slug: "casa-nudo", name: "Casa Nudo", sector: "Retail", city: "Lima", country: "Perú", blurb: "Reparación en vidriera. El servicio es el merchandising.", why: "Convierte postventa en espectáculo útil.", image: P.lima },
  { rank: 26, slug: "andina-chip", name: "Andina Chip", sector: "Hardware", city: "Guadalajara", country: "México", blurb: "Semiconductores con mesa en Jalisco, no solo ensamble.", why: "Diseño local en una cadena que siempre fue maquila.", image: P.factory },
  { rank: 27, slug: "pago-claro", name: "Pago Claro", sector: "Fintech", city: "Ciudad de México", country: "México", blurb: "Cobranza que se entiende en un ticket de 8 cm.", why: "UX de kiosco. El API es el footnote.", image: P.cdmx },
  { rank: 28, slug: "finca-red", name: "Finca Red", sector: "Agro", city: "Armenia", country: "Colombia", blurb: "Café con contrato de sombra, no de NFT.", why: "Innovación agronómica con P&L de cosecha.", image: P.neighborhood },
  { rank: 29, slug: "turno-cero", name: "Turno Cero", sector: "Trabajo", city: "Monterrey", country: "México", blurb: "Staffing industrial con app que cabe en un casco.", why: "Matching de segundo turno, no de gig lifestyle.", image: P.factory },
  { rank: 30, slug: "losa-fria", name: "Losa Fría", sector: "Construcción", city: "Medellín", country: "Colombia", blurb: "Prefabricados que se sienten cara a cara.", why: "Industrializa sin perder el pulgar.", image: P.medellin },
  { rank: 31, slug: "sello-bajo", name: "Sello Bajo", sector: "Moda", city: "León", country: "México", blurb: "Cuero con ficha de curtiduría, no de influencer.", why: "Trazabilidad de taller. El drop sobra.", image: P.tactile },
  { rank: 32, slug: "onda-corta", name: "Onda Corta", sector: "Medios", city: "Montevideo", country: "Uruguay", blurb: "Radio que vende pauta como inventario físico.", why: "El audio vuelve a tener hora.", image: P.radio },
  { rank: 33, slug: "mina-clara", name: "Mina Clara", sector: "Energía", city: "Potosí", country: "Bolivia", blurb: "Litio con dirigente en el contrato.", why: "Licencia social como cláusula, no como CSR.", image: P.atacama },
  { rank: 34, slug: "puente-swift", name: "Puente Swift", sector: "Fintech", city: "São Paulo", country: "Brasil", blurb: "México–Brasil sin Palo Alto en el medio.", why: "Corredor ES–PT. El SWIFT es el producto.", image: P.fintech },
  { rank: 35, slug: "taller-norte", name: "Taller Norte", sector: "Diseño", city: "Monterrey", country: "México", blurb: "Mueble industrial para oficinas que no quieren WeWork.", why: "Protocolo de sala hecho objeto.", image: P.analog },
  { rank: 36, slug: "costa-fria", name: "Costa Fría", sector: "Logística", city: "Valparaíso", country: "Chile", blurb: "Frío de exportación con bitácora en papel y sensor.", why: "Doble registro. El sensor no reemplaza al muelle.", image: P.lima },
  { rank: 37, slug: "aula-mesa", name: "Aula Mesa", sector: "Educación", city: "Bogotá", country: "Colombia", blurb: "Capacitación de piso, no de LMS eterno.", why: "Ocho semanas, un oficio, un contrato.", image: P.bogota },
  { rank: 38, slug: "vidrio-sur", name: "Vidrio Sur", sector: "Industria", city: "Rosario", country: "Argentina", blurb: "Envase retornable como SKU, no como campaña verde.", why: "Logística inversa que cierra el número.", image: P.ba },
  { rank: 39, slug: "nube-baja", name: "Nube Baja", sector: "Software", city: "Santiago", country: "Chile", blurb: "Cloud soberano para quien no quiere otro hyperscaler.", why: "Latencia y jurisdicción como feature.", image: P.board },
  { rank: 40, slug: "plaza-diez", name: "Plaza Diez", sector: "Retail", city: "Ciudad de México", country: "México", blurb: "Diez locales, cero flagship. El barrio es el mall.", why: "Densidad sobre espectáculo.", image: P.cdmx },
  { rank: 41, slug: "ruta-alta", name: "Ruta Alta", sector: "Logística", city: "La Paz", country: "Bolivia", blurb: "Altura como constraint de diseño de flota.", why: "Ingeniería andina, no kit europeo adaptado.", image: P.bogota },
  { rank: 42, slug: "hilo-marino", name: "Hilo Marino", sector: "Moda", city: "Lima", country: "Perú", blurb: "Algodón y red de pesca con ficha de caleta.", why: "Material del litoral con precio de colección.", image: P.atelier },
  { rank: 43, slug: "caja-obra", name: "Caja Obra", sector: "Fintech", city: "Lima", country: "Perú", blurb: "Nómina de construcción que se paga el mismo día.", why: "El peón es el usuario. El contractor, el canal.", image: P.lima },
  { rank: 44, slug: "sol-chico", name: "Sol Chico", sector: "Energía", city: "Recife", country: "Brasil", blurb: "Solar de techo para pyme, sin teatro de parque.", why: "Instala en un fin de semana. Cobra en 36 cuotas.", image: P.paulista },
  { rank: 45, slug: "mesa-dos", name: "Mesa Dos", sector: "Trabajo", city: "Buenos Aires", country: "Argentina", blurb: "Cowork que cobra por protocolo, no por silla.", why: "Northroom para quien no llega a la lista de espera.", image: P.ba },
  { rank: 46, slug: "grano-lista", name: "Grano Lista", sector: "Agro", city: "Rosario", country: "Argentina", blurb: "Precio de pizarra en el teléfono del productor, sin broker-teatro.", why: "Información simétrica como infraestructura.", image: P.mill },
  { rank: 47, slug: "pieza-unica", name: "Pieza Única", sector: "Diseño", city: "Puebla", country: "México", blurb: "Cerámica de edición que no pide reel.", why: "Si el objeto necesita video, no está listo.", image: P.still },
  { rank: 48, slug: "banco-esquina", name: "Banco Esquina", sector: "Fintech", city: "Medellín", country: "Colombia", blurb: "Crédito de esquina con underwriting de almacén.", why: "El fiado con score. El barrio, otra vez.", image: P.medellin },
  { rank: 49, slug: "onda-fria", name: "Onda Fría", sector: "Clima", city: "Antofagasta", country: "Chile", blurb: "Enfriamiento de data center con agua de proceso, no con slogan.", why: "El desierto como disipador. Ingeniería, no ESG.", image: P.atacama },
  { rank: 50, slug: "puerta-sur", name: "Puerta Sur", sector: "Retail", city: "Porto Alegre", country: "Brasil", blurb: "Tienda que abre cuando el barrio abre. Ni un minuto antes.", why: "Calendario pegado. El drop sobra.", image: P.paulista },
];

const INNOV_ORDER = [
  "andina-chip",
  "pago-claro",
  "nube-baja",
  "paramo-grid",
  "viento-sur",
  "vidrio-sur",
  "bruma-studio",
  "sol-chico",
  "onda-fria",
  "puente-swift",
  "casa-quilate",
  "turno-cero",
  "mina-clara",
  "losa-fria",
  "finca-red",
  "vesper-grid",
  "linea-ocho",
  "altura-code",
  "costa-fria",
  "grano-lista",
  "puerto-seco",
  "caja-obra",
  "sello-bajo",
  "onda-corta",
  "aula-mesa",
  "northroom",
  "ruta-alta",
  "hilo-marino",
  "banco-esquina",
  "plaza-diez",
  "sierra-line",
  "tercer-turno",
  "rio-abierto",
  "casa-hilo",
  "kinship-clay",
  "cuatro-paredes",
  "lumen-tide",
  "glass-orchard",
  "sombra-studio",
  "helio-thread",
  "barrio-capital",
  "nero-paper",
  "archive-monday",
  "sal-baja",
  "casa-nudo",
  "taller-norte",
  "mesa-radio",
  "mesa-dos",
  "pieza-unica",
  "puerta-sur",
] as const;

const bySlug = Object.fromEntries(INNOVATIVES_RAW.map((c) => [c.slug, c]));

export const INNOVATIVES: Innovative[] = INNOV_ORDER.map((slug, i) => ({
  ...bySlug[slug],
  rank: i + 1,
}));

export const INNOVATIVES_METHOD = [
  {
    title: "Evidencia, no deck",
    text: "Puntúa lo que se puede visitar: un segundo turno, un offtake, una sucursal, un changelog. El pitch no suma. El patio sí.",
  },
  {
    title: "P&L con geografía",
    text: "La compañía tiene que nombrar un pueblo, un puerto o una calle. Si la tesis cabe en un ticker, no entra.",
  },
  {
    title: "Tres años de persistencia",
    text: "No premiamos el anuncio. Premiamos lo que sigue operando cuando el hype se fue. Fundada o pivotada con tracción regional verificable.",
  },
  {
    title: "Innovación copiable y difícil",
    text: "Un gesto que otro puede imitar —y no va a querer, porque duele. Protocolo, material, red, horario. No un feature de app.",
  },
  {
    title: "Independencia de narrativa importada",
    text: "Descuenta puntos si el lenguaje es el de Palo Alto o Brickell. Suma si el código de casa está en español o portugués de piso.",
  },
];

export function getInnovative(slug: string) {
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
