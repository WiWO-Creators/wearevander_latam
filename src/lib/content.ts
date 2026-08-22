import { FRANCHISE_ARTICLES } from "./franchises";

export type SectionId = "ideas" | "work" | "design" | "climate" | "culture";
export type PaceId = "rapida" | "fondo";
export type FranchiseId = "contra" | "signals";
export type TagKind = "industry" | "tech" | "pace";

export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string };

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
  pullQuote: string;
  body: BodyBlock[];
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
    id: "mira-solano",
    name: "Mira Solano",
    role: "Editora general",
    city: "Ciudad de México",
    image: "/authors/mira-solano.jpg",
    bio: "Editora general de Team Vander. Mueve la mesa regional desde CDMX. Escribe compañías como sistemas: primero la tesis, después el mood.",
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
    role: "Mesa Brasil",
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
    role: "Mesa Andes",
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
    role: "Mesa de clima",
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

const CORE_ARTICLES: Article[] = [
  {
    slug: "cult-of-the-analog-office",
    title: "El culto a la oficina analógica",
    dek: "Las compañías más interesantes de 2026 bajan el wifi a propósito. Dentro de la revuelta contra la pantalla encendida.",
    kicker: "Chile",
    section: "ideas",
    authorId: "mira-solano",
    publishedAt: "2026-08-12",
    readMinutes: 14,
    image: "/photos/analog-office.jpg",
    imageAlt: "Reunión de trabajo en una oficina contemporánea de Santiago",
    caption: "Estudio de Northroom en Santiago. El protocolo es el producto: la mesa, no el software.",
    city: "Santiago",
    pullQuote: "No desinstalamos internet. Dejamos de dejarlo sentarse a la cabecera.",
    body: [
      { type: "p", text: "Un jueves en Lastarria, la oficina de Northroom huele a café y marcadores. Hay laptops, sí: cerradas, al fondo de una mesa de cuatro metros. No hay televisor, ni war-room de Slack, ni un monitor mirando a la puerta. Los fundadores de uno de los estudios de trabajo más observados de Latinoamérica hicieron una apuesta extraña. El futuro de la oficina, dicen, es analógico." },
      { type: "p", text: "Hace cinco años esto sonaba a newsletter de lifestyle. En 2026 es un P&L. Empresas que pasaron una década instrumentando cada conversación ahora pagan para desinstrumentarlas. Las canastas de teléfonos junto a la sala de reuniones funcionan como guardarropas. Una generación de operadores descubrió que una herramienta hecha para hacer visible el trabajo también lo hizo interminable — y que interminable no es lo mismo que producir." },
      { type: "quote", text: "No desinstalamos internet. Dejamos de dejarlo sentarse a la cabecera.", cite: "Camila Rojas, Northroom" },
      { type: "h2", text: "Wifi lento como feature" },
      { type: "p", text: "El producto de Northroom no es el mueble, aunque el mueble está bien. Es un protocolo. Clientes —un fondo climático en Vitacura, una marca en Brooklyn, un estudio de semiconductores en Seúl— compran una sala diseñada para que la interrupción digital sea levemente incómoda. El wifi se estrecha después de las 11. Las paredes son corcho y lino. Hay impresora, y se usa." },
      { type: "p", text: "“La gente cree que es nostalgia”, dice Camila Rojas, que cofundó la compañía después de una década en un unicornio de software que medía el ‘focus time’ en dashboards. “Es un problema de sistemas. Si la superficie por defecto de una sala es una pantalla, la sala se comporta como pantalla.”" },
      { type: "p", text: "Los números, cuando aparecen, son discretamente brutales. Northroom no publica valuación. Quienes han visto los libros hablan de lista de espera a dos años y un margen de servicios que pondría colorado a un consultora. Más interesante: tres clientes corporativos recortaron asientos de ‘software de colaboración’ en más de un tercio. El software no empeoró. Las reuniones se acortaron." },
      { type: "h2", text: "Para qué sirve lo analógico" },
      { type: "p", text: "Hay una versión de esta historia que termina en una máquina de escribir. No es esa. Lo analógico, en las compañías de este número, no es un disfraz. Es una restricción. Y las restricciones son cómo sobrevive el criterio cuando una empresa escala." },
      { type: "p", text: "Esa es la portada de este número, y el argumento debajo. El poder blando, en los negocios, solía significar marca. En 2026 significa atmósfera: la capacidad de hacer una cultura por la que alguien cruce la ciudad. We Are Vander. We Love Business. Amamos las compañías que rediseñaron la mesa." },
    ],
  },
  {
    slug: "who-owns-climate",
    title: "Quién se queda con la próxima década del clima",
    dek: "El Atacama no es un fondo de pantalla. Es un balance. Crónica desde el desierto donde se renegocian energía, tierra y criterio.",
    kicker: "Clima",
    section: "climate",
    authorId: "rafael-quinn",
    publishedAt: "2026-08-09",
    readMinutes: 12,
    image: "/photos/climate-atacama.jpg",
    imageAlt: "Campo solar industrial en el desierto de Atacama",
    caption: "Campo de Vesper Grid, 13:10. Infraestructura que se deja caminar.",
    city: "Santiago",
    pullQuote: "El software escaló con atención. El clima va a escalar con paciencia — y la paciencia tiene geografía.",
    body: [
      { type: "p", text: "Desde el filo sobre el campo de Vesper Grid, el Atacama no parece una historia de tecnología. Parece un cultivo. Filas de vidrio oscuro corren hasta el horizonte y se detienen, como si alguien hubiera trazado una línea y el desierto hubiera aceptado. Un técnico en chaleco camina el pasillo. El viento es el único sonido que no viene de un generador." },
      { type: "p", text: "Durante veinte años el beat climático fue un beat de software con botas. Dashboards, offsets, un mercado para la virtud. Las compañías que importan ahora son aburridas de un modo que debería entusiasmarte. Vierten concreto. Firman offtakes a veinte años. Contratan gente que puede vivir en un pueblo sin WeWork." },
      { type: "quote", text: "El software escaló con atención. El clima va a escalar con paciencia — y la paciencia tiene geografía.", cite: "Elena Voss, Vesper Grid" },
      { type: "h2", text: "El desierto como escritorio" },
      { type: "p", text: "Vesper Grid, entre Santiago y un racimo de contenedores cerca de Calama, no es el mayor operador solar de Chile. Puede ser el más deliberado. Vende kilowatts-hora y un lenguaje para cómo un sitio energético encuentra un paisaje. “La infraestructura es cultura aunque no lo admitas”, dice la CEO Elena Voss. “Nosotros lo admitimos.”" },
      { type: "p", text: "El capital se dio cuenta, despacio, como se da cuenta de cualquier cosa que no se puede screenshoteear. Fondos de pensión, soberanos, family offices que antes compraban viñas. El múltiplo no es de software. No tiene que serlo. Lo que Vesper vende es una década de excelencia aburrida — y un punto de vista sobre quién se para en esta luz." },
      { type: "p", text: "La era del offset entrenó a una generación a tratar la atmósfera como planilla. Se acaba, no porque la matemática haya mejorado, sino porque el público aprendió a leer la nota al pie. La próxima década del clima será de las compañías que pueden quedarse en un lugar el tiempo suficiente para ser de ahí." },
    ],
  },
  {
    slug: "fast-fashion-slow-afterlife",
    title: "La vida lenta de la moda rápida",
    dek: "Una generación de sellos independientes trata el deadstock como la única materia prima honesta. El retail, después del atracón.",
    kicker: "Cultura",
    section: "culture",
    authorId: "lina-cho",
    publishedAt: "2026-08-04",
    readMinutes: 11,
    image: "/photos/fashion-atelier.jpg",
    imageAlt: "Taller de moda y producción textil",
    caption: "Atelier Common. Lo único nuevo en la sala es el patrón.",
    pullQuote: "Dejamos de fingir que el mundo necesitaba otra polera virgen.",
    body: [
      { type: "p", text: "Lo primero que se nota en Atelier Common es el silencio de los racks. No hay drop de temporada ni un muro de denim idéntico. Las prendas cuelgan como libros de biblioteca: con la confianza de haber sido deseadas. Casi todo empezó como sobrante de otro: deadstock de mill, cápsulas sin vender, un rollo de lana que una casa en Lisboa no pudo usar." },
      { type: "p", text: "La moda independiente lleva tanto tiempo performando sostenibilidad que la palabra tiene el valor nutricional de una etiqueta. Lo que ocurre ahora es menos campaña que contabilidad. Un grupo de sellos —Atelier Common en Brooklyn, Casa Hilo en Providencia, Archive Monday en Seúl— convirtió el retazo en el brief entero. No una cápsula. La línea." },
      { type: "quote", text: "Dejamos de fingir que el mundo necesitaba otra polera virgen.", cite: "Jun Park, Archive Monday" },
      { type: "h2", text: "La restricción como código de casa" },
      { type: "p", text: "Trabajar solo con lo que ya existe suena romántico hasta que ves a una cortadora esperar seis semanas un segundo rollo que no va a llegar. El lenguaje que sobrevive a esa espera es específico: cuellos que migran entre telas, paletas de la misma familia que el año pasado, una silueta que absorbe la sorpresa." },
      { type: "p", text: "El modelo de negocio es igualmente infashionable. Tirajes chicos. Ventanas de reparación. Un escritorio de resale en la misma tienda. Márgenes que dependen de que la gente vuelva, no de un spike en TikTok. “No queremos ser una plataforma”, dice Nia Bell, de Atelier Common. “Queremos ser una tienda que todavía exista en 2036.”" },
    ],
  },
  {
    slug: "fifteen-minute-founder",
    title: "El founder de quince minutos",
    dek: "Una nueva cohorte trata el calendario como producto. Ambición, sin martirio.",
    kicker: "Trabajo",
    section: "work",
    authorId: "jonah-peck",
    publishedAt: "2026-08-01",
    readMinutes: 9,
    image: "/photos/rooftop.jpg",
    imageAlt: "Oficina de noche con equipos trabajando",
    caption: "Cierre de martes en Mesa Radio. El día laboral terminó. La conversación, no.",
    pullQuote: "Si tu compañía solo funciona cuando desapareces, no construiste una empresa. Construiste un santuario.",
    body: [
      { type: "p", text: "El founder de quince minutos no es flojo. Está editado. Dirige una compañía de textiles climáticos con 40 personas, un directorio que de verdad lee el paquete y un calendario que, de reojo, parece que vive alguien adentro. El retiro del colegio está. También un miércoles sin reuniones después de mediodía. También un hard stop que el equipo aprendió a tratar como la nómina: no negociable." },
      { type: "p", text: "Durante una década el mito del founder fue un folleto de duerme-cuando-estés-muerto. Produjo algunas compañías y muchos restos. Los operadores que suben ahora —sobre todo fuera del campo gravitacional de la Bahía— tienen otro objeto de estatus. No el grind. El cuarto que se guardaron para una vida." },
      { type: "quote", text: "Si tu compañía solo funciona cuando desapareces, no construiste una empresa. Construiste un santuario.", cite: "Iria Beltrán, Helio Thread" },
      { type: "h2", text: "El calendario como cultura" },
      { type: "p", text: "Iria Beltrán, de Helio Thread, imprime su semana el domingo y la pone en la pared del estudio. Cualquiera puede leerla. La transparencia es el punto. “La gente copia el calendario que ve”, dice. “Si el mío es un pánico, el de ellos será un pánico.” La facturación sube. El headcount no es vanidad. La compañía manda tela a tres continentes y cierra el atelier los viernes a las cuatro." },
      { type: "p", text: "Nada de esto es un perk de wellness. Es un sistema operativo. Contratan managers que sostienen una sala, escriben documentos que no necesitan una reunión para decodificarse, y despiden el software que convierte cada ping en un referéndum." },
    ],
  },
  {
    slug: "machines-with-taste",
    title: "Máquinas con gusto",
    dek: "Las compañías de IA interesantes no persiguen un modelo más grande. Persiguen un material. Qué pasa cuando el objeto es la interfaz.",
    kicker: "Diseño",
    section: "design",
    authorId: "asha-veld",
    publishedAt: "2026-07-28",
    readMinutes: 10,
    image: "/photos/still-life.jpg",
    imageAlt: "Laboratorio de diseño de producto con prototipos",
    caption: "Mesa de prototipos de Lumen Form. El chat ya ganó. Ellos quieren ganar la mesa.",
    pullQuote: "Un modelo sin material es solo una vibra con API.",
    body: [
      { type: "p", text: "En una mesa en Hackney hay una lámpara que escucha, una cámara que todavía come película y un cuaderno cuyo papel sale de un mill que también abastece a una casa de moda. No es un mood board. Es la línea de Lumen Form, una compañía que mete IA en objetos que querrías aunque no hicieran nada inteligente. La inteligencia es invitada. El objeto es anfitrión." },
      { type: "p", text: "El último ciclo de diseño de producto de IA parecía una ventana de chat con distintas chaquetas. El que vale la pena escribir —el que viene— parece una lámpara. El gusto es la capa escasa. Cualquiera puede alquilar un modelo. Casi nadie decide cuánto debe pesar en la mano." },
      { type: "quote", text: "Un modelo sin material es solo una vibra con API.", cite: "Soren Hale, Lumen Form" },
      { type: "h2", text: "El objeto como brief" },
      { type: "p", text: "Los fundadores de Lumen Form vienen del mueble y el sonido, no de un lab. Hablan de latencia como un carpintero habla de la veta. La lámpara no muestra texto. Cambia temperatura y presencia cuando cambia el ritmo de una casa. Si eso es “IA” es pregunta para el comunicado. En la sala, es atmósfera." },
      { type: "p", text: "Cada era de computación termina avergonzada de su rectángulo y busca el mundo. Esta vez el gesto tiene gusto. No son anti-pantalla. Son post-pantalla. Asumen que el teléfono siempre estará, como una llave de agua. El trabajo es todo lo demás." },
    ],
  },
  {
    slug: "studio-as-strategy",
    title: "El estudio como estrategia",
    dek: "Las mejores compañías de este ciclo se organizan como casas de moda, no como organigramas. Una teoría del atelier aplicada a todo lo demás.",
    kicker: "Ideas",
    section: "ideas",
    authorId: "mira-solano",
    publishedAt: "2026-07-22",
    readMinutes: 11,
    image: "/photos/workshop.jpg",
    imageAlt: "Taller de prototipos contemporáneo",
    caption: "Sombra Studio, 10:00. El organigrama es la sala.",
    pullQuote: "Una casa tiene un código. Una compañía tiene un slide. Adivina cuál se recuerda.",
    body: [
      { type: "p", text: "Las casas de moda siempre supieron algo que las empresas de software siguen pagándole a McKinsey para recordar: un punto de vista es un sistema operativo. No necesitas un afiche de valores si la colección ya es los valores. Un puñado de compañías fuera de la moda empezó a tomarlo en literal." },
      { type: "p", text: "Sombra Studio, que construye software espacial para arquitectos, corre en temporadas. Hay una colección. Hay un código de casa (nada de dark mode por defecto, ninguna ilustración de personas de espaldas, ningún feature que no se pueda explicar en la mesa). Cuando publican, publican un look: un set coherente de decisiones, no un montón de tickets que coincidieron en un trimestre." },
      { type: "quote", text: "Una casa tiene un código. Una compañía tiene un slide. Adivina cuál se recuerda.", cite: "Team Vander" },
      { type: "h2", text: "Temporadas, no sprints" },
      { type: "p", text: "Los sprints fueron un invento humano que se volvió cinta. Las temporadas devuelven un ritmo que se siente en el cuerpo: un período de hacer, uno de mostrar, uno de descanso que no es culpa. Sombra, con 28 personas, saca cuatro colecciones al año. A los clientes, sorpresa, les gusta esperar. La escasez, cuando es honesta, es una forma de respeto." },
      { type: "p", text: "El modelo no escala a diez mil personas. Eso es un feature. Eligen un tamaño como un sastre elige un paño: por cómo se comporta, no por cómo se ve en un deck." },
    ],
  },
  {
    slug: "return-of-the-local",
    title: "El regreso de lo local",
    dek: "Las economías de barrio se tratan, por fin, como ideas de escala. Una caminata por la cuadra como modelo de negocio.",
    kicker: "Cultura",
    section: "culture",
    authorId: "lina-cho",
    publishedAt: "2026-07-18",
    readMinutes: 10,
    image: "/photos/bakery.jpg",
    imageAlt: "Panadería de barrio en Santiago",
    caption: "Lastarria, 09:10. La unidad de innovación es la cuadra.",
    pullQuote: "Escalar fue una religión. La parroquia es una calle.",
    body: [
      { type: "p", text: "A las 19:40 la calle hace lo que las calles hacían antes de ser contenido. Una bici se cuela entre maceteros. Un almacenero prende una lámpara, después otra. Alguien lleva pan como si el pan todavía fuera un nudo de la trama. No es una postal de pueblo. Es una tesis de asignación de capital." },
      { type: "p", text: "Barrio Capital, fondo santiaguino con un segundo escritorio en Ciudad de México, solo invierte en negocios a los que se puede llegar caminando. Panaderías, talleres de reparación, un cine de tres butacas, una radio que todavía imprime la programación. Los cheques parecen errores de redondeo en Palo Alto. El retorno, medido en años que una calle se queda siendo ella, es el punto." },
      { type: "quote", text: "Escalar fue una religión. La parroquia es una calle.", cite: "Tomás Alarcón, Barrio Capital" },
      { type: "h2", text: "Venture caminable" },
      { type: "p", text: "A los socios les gusta decir que underwritean atmósfera. En realidad underwritean arriendo, nómina y el trabajo poco glamoroso de mantener una persiana abierta. Se niegan a roll-ups que reemplazarían un nombre pintado en ladrillo por un sans-serif. “Si profesionalizamos el alma”, dice Tomás Alarcón, “fallamos en la única métrica que nos importa.”" },
      { type: "p", text: "Hay un localismo que es cosplay para quien puede irse al campo. Esto no es eso. Las compañías del portafolio contratan en la cuadra, compran en la cuadra y —esto es lo radical en voz baja— precifican para la cuadra. Una ciudad que funciona no es un amenity. Es un mercado." },
    ],
  },
  {
    slug: "design-after-screens",
    title: "Diseño después de las pantallas",
    dek: "Los productos físicos volvieron a estar de moda, lo que significa que están a punto de hacerse mal. Guía de campo para la década táctil.",
    kicker: "Diseño",
    section: "design",
    authorId: "asha-veld",
    publishedAt: "2026-07-11",
    readMinutes: 9,
    image: "/photos/tactile.jpg",
    imageAlt: "Ingenieros ensamblando un prototipo de hardware",
    caption: "Kinship Clay, prototipo 14. El QA es el pulgar.",
    pullQuote: "Si no se siente caro con los ojos cerrados, no está listo.",
    body: [
      { type: "p", text: "El pulgar sabe antes que el ojo. En una sala en Lisboa, Rafa Costa presiona el pulgar contra un cuerpo que será termostato, o radio, o algo que rechaza ambos nombres. La regla de Kinship Clay es simple: si no se siente caro con los ojos cerrados, no está listo." },
      { type: "p", text: "Después de quince años de vidrio, la industria redescubrió el peso. Cerámica, madera clara, aluminio cepillado que de verdad está cepillado. El riesgo es obvio: una inundación de objetos que parecen la idea que tiene un departamento de props de ‘tech artesanal’. La oportunidad es más interesante. Una generación de product people que solo diseñó rectángulos ahora tiene que aprender veta." },
      { type: "quote", text: "Si no se siente caro con los ojos cerrados, no está listo.", cite: "Rafa Costa, Kinship Clay" },
      { type: "h2", text: "Las manos como proceso de QA" },
      { type: "p", text: "Costa no envía una pieza que no hayan sostenido al menos doce personas que no trabajan en la compañía. Las notas son vergonzosas como todas las notas honestas: demasiado frío, demasiado cute, la costura engancha un anillo. Eso es research de usuario que no se hace en un laptop. También es lento, por eso tantos equipos lo van a saltar y después preguntarse por qué su objeto se siente como un render." },
    ],
  },
  {
    slug: "night-shift",
    title: "Turno de noche",
    dek: "Una compañía 24 horas es una cultura, no una planilla de husos. Qué se siente cuando el trabajo no marca salida — y cómo las buenas igual marcan.",
    kicker: "Trabajo",
    section: "work",
    authorId: "jonah-peck",
    publishedAt: "2026-07-06",
    readMinutes: 8,
    image: "/photos/radio.jpg",
    imageAlt: "Estudio de radio de noche",
    caption: "Handoff de Mesa Radio. La noche es un departamento.",
    pullQuote: "No necesitamos más horas. Necesitamos una costura más limpia entre ellas.",
    body: [
      { type: "p", text: "La noche, en una compañía global, es la mañana de otra persona. Esa frase lanzó mil Slacks y casi ninguna buena fiesta. Mesa Radio, medio independiente con mesas en Santiago, Seúl y Brooklyn, decidió que el handoff debía sentirse como el cierre de un bar, no como la apertura de un ticket. Al atardecer el equipo de Santiago camina a la terraza con Seúl en un parlante un poco demasiado alto. Hablan veinte minutos. Después Santiago se va a casa." },
      { type: "p", text: "La compañía 24 horas suele venderse como ventaja competitiva. A menudo es solo la incapacidad de parar. Los estudios que lo hacen bien ritualizaron la costura. Una campana. Un handoff escrito que se permite ser prosa. Una regla: si la pregunta nocturna no está en llamas, espera a que el sol esté en el país correcto." },
      { type: "quote", text: "No necesitamos más horas. Necesitamos una costura más limpia entre ellas.", cite: "Sofía Rivas, Mesa Radio" },
      { type: "p", text: "Rivas, editora de Mesa, escribe la nota de noche ella misma tres veces por semana. Es el documento más leído de la compañía, no porque sea obligatorio, sino porque es bueno. “Si la costura es fea, la noche será fea. La gente siente un documento.” Es una frase de editora. También es una frase de operaciones." },
    ],
  },
  {
    slug: "the-quiet-company",
    title: "La compañía silenciosa",
    dek: "No tuitean. No levantan. Componen en salas a las que no te invitaron. Estudio de negocios que tratan el silencio como estrategia.",
    kicker: "Ideas",
    section: "ideas",
    authorId: "mira-solano",
    publishedAt: "2026-06-30",
    readMinutes: 9,
    image: "/photos/mill.jpg",
    imageAlt: "Planta industrial sin cámaras de prensa",
    caption: "Una mesa en Oro Verde. Sin cámaras, a propósito.",
    pullQuote: "La atención es un centro de costo. Corríamos los números.",
    body: [
      { type: "p", text: "Oro Verde no se deja fotografiar para esta nota, que es cómo supimos que teníamos la nota correcta. La compañía de agricultura regenerativa abastece restaurantes de Valparaíso a Lima, emplea a 200 personas y nunca emitió un comunicado. El fundador, que pidió no ser nombrado porque “los nombres se vuelven contenido”, nos recibió en una sala con una mesa, dos tazas y una regla: nada de teléfonos sobre la madera." },
      { type: "p", text: "El silencio, en 2026, es un flex. También es una ventaja operativa. Las compañías calladas de nuestra libreta —un mill textil, un fabricante de componentes, un vino familiar que ahora vende datos de suelo— gastan marketing en el producto y el sistema nervioso del founder en el trabajo. No son tímidas. Están editadas." },
      { type: "quote", text: "La atención es un centro de costo. Corríamos los números.", cite: "Un founder que declinó el retrato" },
      { type: "h2", text: "Componer fuera de escena" },
      { type: "p", text: "Sin un feed que alimentar, estas compañías deciden en otro reloj. Pueden ser aburridas un trimestre. Pueden decirle que no a un cliente. Pueden dejar que un rumor se siente. En un entorno mediático que trata a cada empresa como personaje, rechazar el rol es una forma de poder: blanda, otra vez, y carísima de fingir." },
    ],
  },
  {
    slug: "santiago-hub",
    title: "Santiago, el hub que no pidió permiso",
    dek: "Capital, clima y una zona horaria incómoda. Por qué la ciudad se volvió un escritorio global de negocios.",
    kicker: "Ideas",
    section: "ideas",
    authorId: "mira-solano",
    publishedAt: "2026-08-14",
    readMinutes: 7,
    image: "/photos/neighborhood.jpg",
    imageAlt: "Santiago al atardecer, calle comercial",
    caption: "El centro se vacía a las 19. Los estudios, no.",
    city: "Santiago",
    pullQuote: "No somos el próximo Silicon Valley. Esa es exactamente la ventaja.",
    body: [
      { type: "p", text: "Santiago nunca pidió ser un hub. Lo cual, en 2026, es precisamente por qué lo es. Fondos que hace cinco años solo aterrizaban en Miami ahora tienen llave en Providencia. Operadores que se cansaron del costo de San Francisco descubrieron una ciudad cara a escala local y barata a escala global, con fibra, Andes de fondo y una zona horaria que cubre Nueva York de mañana y Seúl de noche." },
      { type: "p", text: "La tesis no es turismo de founders. Es infraestructura: energía, talento de ingeniería, un mercado de consumo que prueba rápido y un Estado que, a trompicones, aprendió a hablar de litio y datos sin sonrojarse. “No somos el próximo Silicon Valley”, dice una GP que pidió no ser citada. “Esa es exactamente la ventaja.”" },
      { type: "quote", text: "No somos el próximo Silicon Valley. Esa es exactamente la ventaja.", cite: "Una GP en Providencia" },
      { type: "p", text: "We Are Vander nació aquí por una razón: esta ciudad trata los negocios como oficio, no como contenido. We Love Business. El resto es la mesa." },
    ],
  },
  {
    slug: "ia-en-la-junta",
    title: "La IA llegó a la sala de directorio. Ahora qué.",
    dek: "El chat ya está en el paquete. El criterio, no. Cómo los buenos boards están usando modelos sin entregarles el voto.",
    kicker: "Trabajo",
    section: "work",
    authorId: "jonah-peck",
    publishedAt: "2026-08-11",
    readMinutes: 8,
    image: "/photos/boardroom.jpg",
    imageAlt: "Sala de juntas en Santiago",
    caption: "Un board en Vitacura. El modelo resume. El voto sigue siendo humano.",
    pullQuote: "Si el modelo escribe el acta, alguien todavía tiene que haber estado en la sala.",
    body: [
      { type: "p", text: "En tres directorios que visitamos este mes, el paquete llega con un anexo generado por modelo: riesgos, preguntas, un párrafo de “lo que el management no está diciendo”. Útil. También un nuevo riesgo: boards que confunden un buen resumen con haber leído. La IA no robó el asiento. Robó la preparación, que era la única prueba de que alguien había hecho el trabajo." },
      { type: "p", text: "Los boards que lo están haciendo bien usan el modelo como pasante brillante y mudo. Resume, no recomienda. Señala omisiones, no estrategia. “Si el modelo escribe el acta”, dice una directora en São Paulo, “alguien todavía tiene que haber estado en la sala.”" },
      { type: "quote", text: "Si el modelo escribe el acta, alguien todavía tiene que haber estado en la sala.", cite: "Una directora en São Paulo" },
      { type: "p", text: "We Love Business, no el autopiloto. La herramienta que comprime un paquete de 80 páginas no reemplaza a la persona que puede decir que no en la página 12." },
    ],
  },
  {
    slug: "capital-paciente",
    title: "El capital paciente vuelve a estar de moda",
    dek: "Múltiplos de software para problemas de cemento. Por qué el dinero lento está ganando las apuestas largas.",
    kicker: "Clima",
    section: "climate",
    authorId: "rafael-quinn",
    publishedAt: "2026-08-07",
    readMinutes: 7,
    image: "/photos/climate-atacama.jpg",
    imageAlt: "Infraestructura energética en el desierto",
    caption: "Offtakes a 20 años. El slide deck, a 20 minutos.",
    pullQuote: "Si tu tesis cabe en un trimestre, no es una tesis. Es una ronda.",
    body: [
      { type: "p", text: "El capital paciente nunca se fue. Solo se quedó callado mientras el capital impaciente hacía más ruido. Ahora el ruido se apagó y aparecen los cheques de 15 años: pensiones, soberanos, family offices que entendieron que el clima no es una ronda, es un offtake. Vesper Grid, Lumen Tide, Helio Thread — ninguna pide un múltiplo de SaaS. Piden tiempo." },
      { type: "p", text: "“Si tu tesis cabe en un trimestre, no es una tesis. Es una ronda”, dice un allocator en Nueva York que ahora vuela a Calama una vez por trimestre. El slide sigue durando veinte minutos. El contrato, veinte años. Esa asimetría es el negocio." },
      { type: "quote", text: "Si tu tesis cabe en un trimestre, no es una tesis. Es una ronda.", cite: "Un allocator en Nueva York" },
    ],
  },
  {
    slug: "retail-algoritmo",
    title: "Retail después del algoritmo",
    dek: "Cuando el feed deja de vender, vuelve la tienda. Cómo las marcas independientes están reconstruyendo el piso.",
    kicker: "Cultura",
    section: "culture",
    authorId: "lina-cho",
    publishedAt: "2026-08-03",
    readMinutes: 6,
    image: "/photos/fashion-atelier.jpg",
    imageAlt: "Producción y retail de moda independiente",
    caption: "El piso vuelve a ser el canal. El feed, un afiche.",
    pullQuote: "El algoritmo nos alquilaría atención. La tienda nos vende criterio.",
    body: [
      { type: "p", text: "El retail independiente descubrió, tarde, que alquilar atención a un feed es un arriendo que sube solo. Archive Monday cerró su cuenta más grande el año pasado y abrió una segunda tienda. Las ventas no cayeron. Cayeron los picos; subió el piso. “El algoritmo nos alquilaría atención”, dice Jun Park. “La tienda nos vende criterio.”" },
      { type: "p", text: "No es un regreso romántico al ladrillo. Es una corrección de costos. El piso es caro, sí. El feed, al final, también: descuentos, devoluciones, un cliente que no vuelve. Las marcas de este número están eligiendo el costo que deja un local con nombre en la puerta." },
      { type: "quote", text: "El algoritmo nos alquilaría atención. La tienda nos vende criterio.", cite: "Jun Park, Archive Monday" },
    ],
  },
  {
    slug: "slack-off-the-books",
    title: "El P&L de no tener Slack",
    dek: "Tres compañías midieron lo que cuesta el canal siempre abierto. El número no es de software. Es de criterio.",
    kicker: "Trabajo",
    section: "work",
    authorId: "jonah-peck",
    publishedAt: "2026-08-13",
    readMinutes: 6,
    image: "/photos/analog-office.jpg",
    imageAlt: "Reunión de trabajo con laptops cerrados",
    caption: "Northroom, un martes. El canal está apagado. El trabajo, no.",
    pullQuote: "El chat no era colaboración. Era un impuesto a la atención.",
    body: [
      { type: "p", text: "Cuando Northroom apagó Slack, el primer mes fue pánico. El segundo, silencio. El tercero, un CFO pidió el número: horas recuperadas, tickets que nunca se abrieron, reuniones que volvieron a caber en 25 minutos. El software era barato. El impuesto, no." },
      { type: "quote", text: "El chat no era colaboración. Era un impuesto a la atención.", cite: "Camila Rojas, Northroom" },
      { type: "p", text: "No es un manifiesto ludita. Es un asiento contable. Las compañías de este número que cortaron el canal siempre abierto no perdieron velocidad. Perdieron teatro. We Love Business, no el ping." },
    ],
  },
  {
    slug: "eighteen-minute-board",
    title: "Juntas de dieciocho minutos",
    dek: "Un board en Vitacura recortó el paquete a 12 páginas y el reloj a un cuarto de hora. El voto mejoró.",
    kicker: "Ideas",
    section: "ideas",
    authorId: "mira-solano",
    publishedAt: "2026-08-10",
    readMinutes: 5,
    image: "/photos/boardroom.jpg",
    imageAlt: "Sala de directorio en Santiago",
    caption: "Vitacura, 08:00. El paquete cabe en una carpeta. El voto, también.",
    pullQuote: "Si no cabe en dieciocho minutos, no era una decisión. Era un tour.",
    body: [
      { type: "p", text: "La junta de dieciocho minutos no es un truco de productividad. Es una tesis: si el management no puede plantear la decisión en ese tiempo, la decisión no está lista. Un board en Vitacura lo volvió reglamento. El paquete bajó de 80 páginas a 12. El anexo de modelo, afuera." },
      { type: "quote", text: "Si no cabe en dieciocho minutos, no era una decisión. Era un tour.", cite: "Una directora en Vitacura" },
      { type: "p", text: "Los boards que se enamoraron del paquete infinito confundieron volumen con diligencia. El criterio cabe en una carpeta. El resto es teatro para el minute." },
    ],
  },
  {
    slug: "mill-that-waits",
    title: "El mill que no acepta urgencias",
    dek: "Nero Paper atiende pedidos en temporadas, no en Slack. La escasez, esta vez, es el producto.",
    kicker: "Diseño",
    section: "design",
    authorId: "asha-veld",
    publishedAt: "2026-08-06",
    readMinutes: 6,
    image: "/photos/mill.jpg",
    imageAlt: "Interior de un mill textil en funcionamiento",
    caption: "Nero Paper. El lead time es el brief.",
    pullQuote: "Si puedes tenerlo mañana, no lo querías. Lo pediste.",
    body: [
      { type: "p", text: "Nero Paper, mill en Portland que abastece cuadernos y una casa de moda en Seúl, no acepta pedidos urgentes. Hay cuatro ventanas al año. Quien llega tarde espera la siguiente. Las casas que se quedaron —Atelier Common, Archive Monday, un estudio de arquitectura en Oaxaca— dicen que el lead time les mejoró el diseño: menos drops, más criterio." },
      { type: "quote", text: "Si puedes tenerlo mañana, no lo querías. Lo pediste.", cite: "La gerenta de planta de Nero Paper" },
      { type: "p", text: "La urgencia era un hábito de software aplicado a la materia. El mill lo rechazó. El P&L, contra el instinto de todo growth deck, subió." },
    ],
  },
  {
    slug: "radio-prints-the-grid",
    title: "La radio que imprime la programación",
    dek: "Mesa Radio sigue publicando la grilla en papel. No es nostalgia. Es un contrato con la cuadra.",
    kicker: "Cultura",
    section: "culture",
    authorId: "lina-cho",
    publishedAt: "2026-08-05",
    readMinutes: 5,
    image: "/photos/radio.jpg",
    imageAlt: "Estudio de radio independiente",
    caption: "Mesa Radio, 19:10. La grilla está en la puerta.",
    pullQuote: "Si no cabe en un A4, no era una programación. Era un feed.",
    body: [
      { type: "p", text: "Cada lunes, Mesa Radio pega un A4 en la puerta del estudio. Horarios, nombres, un dibujo malo. La gente del barrio se para a leerlo. El stream existe. El papel es el contrato: si está impreso, se cumple. “Si no cabe en un A4, no era una programación. Era un feed”, dice Sofía Rivas." },
      { type: "quote", text: "Si no cabe en un A4, no era una programación. Era un feed.", cite: "Sofía Rivas, Mesa Radio" },
      { type: "p", text: "Barrio Capital metió un cheque chico precisamente por eso. No por el audio. Por la puerta." },
    ],
  },
  {
    slug: "thermostat-nobody-unboxes",
    title: "El termostato que nadie unboxea",
    dek: "Kinship Clay se niega a diseñar para el unboxing. El objeto tiene que sobrevivir al pulgar, no al reel.",
    kicker: "Diseño",
    section: "design",
    authorId: "asha-veld",
    publishedAt: "2026-08-02",
    readMinutes: 5,
    image: "/photos/tactile.jpg",
    imageAlt: "Ingenieros ensamblando un prototipo de hardware",
    caption: "Lisboa. El QA es el pulgar, no el empaque.",
    pullQuote: "Si el objeto necesita un reel para convencer, el objeto no está listo.",
    body: [
      { type: "p", text: "Rafa Costa no filma unboxings. Kinship Clay vende un termostato de cerámica que pesa de más a propósito. El empaque es cartón y una nota. No hay foam con forma, ni un lazo, ni un momento para cámara. “Si el objeto necesita un reel para convencer, el objeto no está listo.”" },
      { type: "quote", text: "Si el objeto necesita un reel para convencer, el objeto no está listo.", cite: "Rafa Costa, Kinship Clay" },
      { type: "p", text: "En un ciclo de producto diseñado para los primeros quince segundos, negarse al unboxing es una estrategia de retención: el cliente que se queda es el que tocó la pieza, no el que la vio." },
    ],
  },
  {
    slug: "three-meter-store",
    title: "La tienda de tres metros",
    dek: "Casa Hilo cabe en un local que antes fue tintorería. El metro cuadrado, tratado como una colección.",
    kicker: "Cultura",
    section: "culture",
    authorId: "lina-cho",
    publishedAt: "2026-07-29",
    readMinutes: 5,
    image: "/photos/neighborhood.jpg",
    imageAlt: "Calle comercial de barrio en Santiago",
    caption: "Providencia. Tres metros, una ventana de reparación, cero drop.",
    pullQuote: "No necesitamos un flagship. Necesitamos una persiana que se abra mañana.",
    body: [
      { type: "p", text: "Casa Hilo mide tres metros de frente. Antes era una tintorería. Ahora es una línea, un escritorio de reparación y un perchero que no se llena a propósito. Nia Bell, que también trabaja con Atelier Common, dice que el tamaño es el brief: si no cabe, no entra a la temporada." },
      { type: "quote", text: "No necesitamos un flagship. Necesitamos una persiana que se abra mañana.", cite: "El equipo de Casa Hilo" },
      { type: "p", text: "El retail independiente está descubriendo que el metro cuadrado chico no es un problema de real estate. Es un filtro de criterio. We Are Vander. We Love Business. Amamos las persiana que se abren." },
    ],
  },
  {
    slug: "latam-no-pidio-permiso",
    title: "Latam dejó de pedir permiso",
    dek: "México fabrica. Brasil cobra. Chile genera. Argentina diseña. Colombia opera. La región que el capital trató como footnote ahora escribe el brief.",
    kicker: "Portada",
    section: "ideas",
    authorId: "mira-solano",
    publishedAt: "2026-08-19",
    readMinutes: 16,
    image: "/photos/cdmx-reforma.jpg",
    imageAlt: "Paseo de la Reforma en Ciudad de México, hora pico laboral",
    caption: "Reforma, 08:40. El hub no está en un slide. Está en la avenida.",
    featured: true,
    city: "Ciudad de México",
    pullQuote: "No somos el próximo Silicon Valley. Somos el lugar donde el P&L todavía tiene geografía.",
    body: [
      { type: "p", text: "Un lunes en Reforma, la avenida hace lo que las avenidas de negocios siempre hicieron: mover gente hacia un edificio. Lo que cambió es quién firma el arriendo. Fondos que hace cinco años solo aterrizaban en Miami ahora tienen llave en Polanco, Itaim, Palermo, Usaquén, Providencia y San Isidro. No es turismo de founders. Es una corrección de mapa." },
      { type: "p", text: "Durante una década Latam fue el capítulo 14 de un deck: mercado emergente, población joven, mobile first. Útil. También un eufemismo para “no tenemos escritorio aquí”. En 2026 el eufemismo se acabó. Las compañías que importan en esta redacción —una línea de ensamble en Monterrey, un banco que ya no necesita parecerse a Nubank, un offtake solar en el Atacama, un estudio en Medellín que publica por temporadas— no están esperando que California las nombre." },
      { type: "quote", text: "No somos el próximo Silicon Valley. Somos el lugar donde el P&L todavía tiene geografía.", cite: "Team Vander" },
      { type: "h2", text: "Seis mesas, un argumento" },
      { type: "p", text: "México ganó el nearshoring y ahora tiene que ganarse el criterio: no toda planta es una tesis. Brasil salió del hype fintech y se quedó con el cobro, que es más aburrido y más difícil de copiar. Chile sigue siendo un laboratorio de energía y de oficina. Argentina convierte la restricción en diseño. Colombia opera software y clima a dos mil metros. Perú mueve el Pacífico cuando nadie mira el puerto." },
      { type: "p", text: "We Are Vander nació en Santiago y se expandió porque la región se le adelantó al medio. We Love Business. No el brochure de “innovación latinoamericana”. El oficio: juntas, offtakes, turnos, metros cuadrados, una persiana que se abre mañana en seis ciudades a la vez." },
    ],
  },
  {
    slug: "nearshoring-despues-del-anuncio",
    title: "Nearshoring, después del anuncio",
    dek: "Monterrey llenó las naves. El trabajo ahora es más aburrido y más importante: proveedores, turnos, un P&L que no cabe en un tuit.",
    kicker: "México",
    section: "work",
    authorId: "valentina-cruz",
    publishedAt: "2026-08-18",
    readMinutes: 11,
    image: "/photos/monterrey-factory.jpg",
    imageAlt: "Planta industrial en Monterrey durante un turno",
    caption: "Apodaca, 06:50. El anuncio ya se hizo. Queda la planta.",
    city: "Ciudad de México",
    pullQuote: "El nearshoring no es una ronda. Es una nómina que entra de noche.",
    body: [
      { type: "p", text: "El comunicado ya se olvidó. Queda la nave: un turno que empieza cuando Reforma todavía está oscura, un supervisor que habla inglés de planta, no de pitch, y una fila de componentes que ayer se hacían a catorce horas de vuelo. Sierra Line, en Apodaca, no da entrevistas de “momento México”. Da recorridos de veinte minutos y un casco." },
      { type: "quote", text: "El nearshoring no es una ronda. Es una nómina que entra de noche.", cite: "Elena Garza, Sierra Line" },
      { type: "p", text: "El riesgo de 2026 no es que el capital se vaya. Es que se quede en el anuncio. Las plantas que van a importar son las que localizaron proveedores, pagaron el aprendizaje del segundo turno y dejaron de tratar a Monterrey como un patio trasero de Texas." },
    ],
  },
  {
    slug: "fintech-despues-del-hype",
    title: "Fintech después del hype",
    dek: "São Paulo ya no celebra otra app de pagos. Celebra el cobro aburrido: spreads, sucursal, un banco que no necesita disfrazarse de startup.",
    kicker: "Brasil",
    section: "ideas",
    authorId: "diego-azevedo",
    publishedAt: "2026-08-17",
    readMinutes: 10,
    image: "/photos/saopaulo-fintech.jpg",
    imageAlt: "Oficina de un banco digital en São Paulo",
    caption: "Itaim Bibi, 10:15. El chat se apagó. El cobro, no.",
    city: "São Paulo",
    pullQuote: "La innovación era abrir la cuenta. El negocio es no perderla.",
    body: [
      { type: "p", text: "En Itaim nadie pide otra ronda para “bancarizar”. Eso ya ocurrió. Casa Quilate, que nació como wallet y hoy es un banco con sucursal del tamaño de una panadería, publica márgenes como si fueran un lookbook: feos, específicos, difíciles de screenshotear. “La innovación era abrir la cuenta. El negocio es no perderla”, dice la CFO Marina Dutra." },
      { type: "quote", text: "La innovación era abrir la cuenta. El negocio es no perderla.", cite: "Marina Dutra, Casa Quilate" },
      { type: "p", text: "El ciclo fintech le enseñó a Paulista a hablar de usuarios. Este ciclo le está enseñando a hablar de crédito. Menos glamuroso. Más latinoamericano. We Love Business, no el hoodie." },
    ],
  },
  {
    slug: "buenos-aires-restriccion",
    title: "Buenos Aires, capital de la restricción",
    dek: "Cuando el insumo falta, el criterio sobra. Cómo las compañías argentinas convirtieron la escasez en código de casa.",
    kicker: "Argentina",
    section: "design",
    authorId: "camila-ferrer",
    publishedAt: "2026-08-16",
    readMinutes: 9,
    image: "/photos/buenos-aires.jpg",
    imageAlt: "Calle comercial en Buenos Aires con comercios independientes",
    caption: "Palermo, 11:20. El brief llegó incompleto. El producto, no.",
    city: "Buenos Aires",
    pullQuote: "Si el material no llega, el diseño tiene que haber llegado antes.",
    body: [
      { type: "p", text: "Bruma Studio corta en un local que antes fue una librería. Los rollos llegan cuando llegan. El patrón, entonces, se escribe para lo que hay: un cuello que migra de tela, una paleta que sobrevive tres temporadas, un objeto que no depende de una aduana simpática. “Si el material no llega, el diseño tiene que haber llegado antes”, dice Inés Pujol." },
      { type: "quote", text: "Si el material no llega, el diseño tiene que haber llegado antes.", cite: "Inés Pujol, Bruma Studio" },
      { type: "p", text: "Hay un mito de que la creatividad argentina es un mood. En 2026 es un sistema operativo. Pampa Seed, que vende agritech a Mendoza y al sur de Brasil, corre el mismo código: pocas SKUs, contratos largos, cero teatro de lanzamiento." },
    ],
  },
  {
    slug: "bogota-a-dos-mil-metros",
    title: "Bogotá, a dos mil seiscientos metros",
    dek: "El clima, el software y una ciudad que trabaja con el aire más delgado. Crónica de una mesa que no necesita el mar.",
    kicker: "Colombia",
    section: "climate",
    authorId: "andres-molina",
    publishedAt: "2026-08-15",
    readMinutes: 9,
    image: "/photos/bogota.jpg",
    imageAlt: "Centro de Bogotá en un día laboral nublado",
    caption: "Séptima, 07:55. La altura es infraestructura.",
    city: "Bogotá",
    pullQuote: "No tenemos puerto. Tenemos paciencia y una red que no se cae.",
    body: [
      { type: "p", text: "Páramo Grid no vende un paisaje de postal. Vende un offtake de viento y una sala en Chapinero donde el modelo climático cabe en doce páginas. “No tenemos puerto. Tenemos paciencia y una red que no se cae”, dice la CEO Natalia Restrepo. A 2.600 metros, el talento de ingeniería se quedó: más barato que Austin, más estable que el mito de Miami." },
      { type: "quote", text: "No tenemos puerto. Tenemos paciencia y una red que no se cae.", cite: "Natalia Restrepo, Páramo Grid" },
      { type: "p", text: "Colombia dejó de ser el capítulo de “impacto”. Es un escritorio de operaciones. Medellín publica software por temporadas. Bogotá firma energía. El brochure de innovación social, por fin, quedó en el aeropuerto." },
    ],
  },
  {
    slug: "el-pacifico-se-firma-en-lima",
    title: "El Pacífico se firma en Lima",
    dek: "Callao no es un footnote de la ruta a Shanghái. Es el P&L de quien todavía sabe leer un contenedor.",
    kicker: "Perú",
    section: "work",
    authorId: "rafael-quinn",
    publishedAt: "2026-08-14",
    readMinutes: 8,
    image: "/photos/lima-port.jpg",
    imageAlt: "Puerto del Callao con contenedores y grúas",
    caption: "Callao, 06:10. La costa es un contrato.",
    city: "Lima",
    pullQuote: "Si no puedes nombrar el barco, no tienes una tesis de supply.",
    body: [
      { type: "p", text: "Tercer Turno escribe el handoff en prosa y lo pega junto al turno. El puerto no espera un Slack. Un supervisor en Callao nos mostró la grilla del día: tres naves, un retraso, cero teatro. “Si no puedes nombrar el barco, no tienes una tesis de supply.”" },
      { type: "quote", text: "Si no puedes nombrar el barco, no tienes una tesis de supply.", cite: "Un supervisor en Callao" },
      { type: "p", text: "Lima fue tratada como escala. En 2026 es mesa. El Pacífico latinoamericano —Valparaíso, Callao, Buenaventura— está reescribiendo quién cobra el flete y quién solo lo comenta." },
    ],
  },
  {
    slug: "medellin-sin-brochure",
    title: "Medellín, sin brochure",
    dek: "El distrito de innovación se quedó en el tour. En el estudio, el software se publica como una colección.",
    kicker: "Colombia",
    section: "design",
    authorId: "andres-molina",
    publishedAt: "2026-08-13",
    readMinutes: 8,
    image: "/photos/medellin-office.jpg",
    imageAlt: "Estudio de software en Medellín",
    caption: "El Poblado, 09:40. El tour se acabó. Queda el look.",
    city: "Bogotá",
    pullQuote: "Si necesitas un mural para explicar el producto, el producto no está listo.",
    body: [
      { type: "p", text: "Altura Code publica cuatro veces al año. Hay un look. Hay un no: nada de ilustraciones de gente de espaldas, ningún feature que no se pueda explicar en la mesa, cero dark mode por defecto. “Si necesitas un mural para explicar el producto, el producto no está listo”, dice Tomás Vélez." },
      { type: "quote", text: "Si necesitas un mural para explicar el producto, el producto no está listo.", cite: "Tomás Vélez, Altura Code" },
      { type: "p", text: "Medellín se cansó de ser metáfora. El software que sale de esos estudios se vende a arquitectos en México y a retailers en São Paulo. El brochure, por suerte, no viaja." },
    ],
  },
  {
    slug: "el-mito-miami",
    title: "El mito Miami",
    dek: "Una generación abrió LLC en el sur de la Florida. Otra volvió a operar donde está el cliente. Crónica de un regreso sin comunicado.",
    kicker: "Ideas",
    section: "ideas",
    authorId: "valentina-cruz",
    publishedAt: "2026-08-12",
    readMinutes: 8,
    image: "/photos/saopaulo-paulista.jpg",
    imageAlt: "Avenida Paulista en un día laboral",
    caption: "Paulista, 18:10. El cliente nunca se mudó a Brickell.",
    city: "São Paulo",
    pullQuote: "Miami era un huso. No era un mercado.",
    body: [
      { type: "p", text: "El éxodo a Miami tuvo deck, podcast y un código postal que impresionaba al limited partner. Tuvo menos clientes. En 2026 una cohorte silenciosa cerró el arriendo de Brickell y volvió a Itaim, a Roma Norte, a Las Condes. “Miami era un huso. No era un mercado”, dice un GP que pidió no ser citado porque todavía tiene el LLC." },
      { type: "quote", text: "Miami era un huso. No era un mercado.", cite: "Un GP que volvió a Paulista" },
      { type: "p", text: "No es nacionalismo. Es operaciones. Si tu nómina, tu regulador y tu comprador están en Latam, el escritorio también. We Are Vander. We Love Business. Amamos a los que volvieron sin hacer un thread." },
    ],
  },
  {
    slug: "triangulo-del-litio",
    title: "El triángulo no es un slide",
    dek: "Chile, Argentina y Bolivia caben en una viñeta de litio. En el terreno, son tres P&L y cero paciencia para el brochure.",
    kicker: "Clima",
    section: "climate",
    authorId: "rafael-quinn",
    publishedAt: "2026-08-11",
    readMinutes: 10,
    image: "/photos/climate-atacama.jpg",
    imageAlt: "Campo solar e infraestructura en el desierto de Atacama",
    caption: "Atacama, 13:10. El triángulo se camina. No se captura en un slide.",
    city: "Santiago",
    pullQuote: "Si tu tesis de litio no nombra un pueblo, no es una tesis. Es un ticker.",
    body: [
      { type: "p", text: "El triángulo del litio cabe en un mapa de conferencia. No cabe en un solo contrato. Vesper Grid firma offtakes en el Atacama. Pampa Seed vende suelo y datos en el norte argentino. En el Salar, las comunidades aprendieron a leer la nota al pie antes que el inversionista. “Si tu tesis de litio no nombra un pueblo, no es una tesis. Es un ticker.”" },
      { type: "quote", text: "Si tu tesis de litio no nombra un pueblo, no es una tesis. Es un ticker.", cite: "Una dirigente en San Pedro" },
      { type: "p", text: "La década del clima en Latam no la van a escribir los que tratan a tres países como un commodity. La van a escribir los que se quedan el tiempo suficiente para ser de ahí." },
    ],
  },
  {
    slug: "corredor-es-pt",
    title: "El corredor que el inglés no vio",
    dek: "México y Brasil ya no necesitan a California para hablarse. Un mercado de 330 millones que se factura en real y peso.",
    kicker: "Ideas",
    section: "ideas",
    authorId: "diego-azevedo",
    publishedAt: "2026-08-10",
    readMinutes: 7,
    image: "/photos/cdmx-reforma.jpg",
    imageAlt: "Avenida de negocios en Ciudad de México",
    caption: "Reforma × Paulista. El idioma de trabajo es el P&L.",
    city: "São Paulo",
    pullQuote: "El puente no pasa por Palo Alto. Pasa por un SWIFT y una mesa a las 9:00.",
    body: [
      { type: "p", text: "Casa Quilate cobra en México. Sierra Line compra software en São Paulo. Sombra Studio diseña para los dos. El corredor es-pt —español y portugués, peso y real— es el mercado más grande que el capital anglosajón sigue tratando como dos footnotes. “El puente no pasa por Palo Alto. Pasa por un SWIFT y una mesa a las 9:00.”" },
      { type: "quote", text: "El puente no pasa por Palo Alto. Pasa por un SWIFT y una mesa a las 9:00.", cite: "Marina Dutra, Casa Quilate" },
      { type: "p", text: "We Are Vander cubre ese puente porque es el negocio. No porque sea un “momento Latam”. El momento, si existió, ya se gastó en paneles. Queda el corredor." },
    ],
  },
  {
    slug: "las-que-operan",
    title: "Las que operan",
    dek: "Una generación de CEOs en la región trata el oficio como estatus. Menos keynote. Más junta de dieciocho minutos.",
    kicker: "Trabajo",
    section: "work",
    authorId: "camila-ferrer",
    publishedAt: "2026-08-09",
    readMinutes: 7,
    image: "/photos/boardroom.jpg",
    imageAlt: "Sala de directorio durante una junta",
    caption: "Una junta en Roma Norte. El keynote se canceló. El voto, no.",
    city: "Ciudad de México",
    pullQuote: "El estatus era el escenario. Ahora es el calendario que se puede pegar en la pared.",
    body: [
      { type: "p", text: "Elena Garza, Natalia Restrepo, Marina Dutra, Camila Rojas. Ninguna pide que la llamen visionary. Piden un paquete de doce páginas y un hard stop. “El estatus era el escenario. Ahora es el calendario que se puede pegar en la pared.”" },
      { type: "quote", text: "El estatus era el escenario. Ahora es el calendario que se puede pegar en la pared.", cite: "Elena Garza, Sierra Line" },
      { type: "p", text: "Latam tuvo su década de founders-personaje. Esta es la década de las que operan. We Love Business. El resto es palco." },
    ],
  },
  {
    slug: "oaxaca-a-lima",
    title: "De Oaxaca a Lima, el objeto otra vez",
    dek: "Arquitectura de tierra, radio de barrio, un termostato que pesa de más. La región redescubrió que el producto se toca.",
    kicker: "Diseño",
    section: "design",
    authorId: "asha-veld",
    publishedAt: "2026-08-08",
    readMinutes: 6,
    image: "/photos/workshop.jpg",
    imageAlt: "Taller de prototipos en un estudio latinoamericano",
    caption: "Cuatro Paredes, Oaxaca. El cubo blanco perdió.",
    city: "São Paulo",
    pullQuote: "Si no se siente caro con los ojos cerrados, no está listo. Eso también vale en español.",
    body: [
      { type: "p", text: "Cuatro Paredes construye en tierra y cal. Mesa Radio imprime la grilla. Kinship Clay, que ahora fabrica una cápsula en São Paulo, sigue pesando de más a propósito. El objeto volvió porque la pantalla se volvió un commodity." },
      { type: "quote", text: "Si no se siente caro con los ojos cerrados, no está listo. Eso también vale en español.", cite: "Team Vander" },
      { type: "p", text: "El diseño latinoamericano que importa en 2026 no pide permiso al MoMA. Pide que el pulgar esté de acuerdo." },
    ],
  },
];

export const ARTICLES: Article[] = [...CORE_ARTICLES, ...(FRANCHISE_ARTICLES as unknown as Article[])];

export function getSectionLabel(id: SectionId) {
  return SECTIONS.find((s) => s.id === id)?.label ?? id;
}

export function getAuthor(id: string) {
  return AUTHORS.find((a) => a.id === id);
}

export function teamByline(article: Article, withPor = true) {
  const city = articleCity(article);
  const who = withPor ? "Por Team Vander" : "Team Vander";
  return city ? `${who} · ${city}` : who;
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
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
      ...a.body.map((b) => b.text),
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
    .filter((a) => a.franchise !== "signals")
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
  { id: "b1", time: "08:42", section: "ideas", slug: "latam-no-pidio-permiso", title: "Latam dejó de pedir permiso: seis mesas, un P&L." },
  { id: "b2", time: "08:11", section: "work", slug: "nearshoring-despues-del-anuncio", title: "Sierra Line abre segundo turno en Apodaca. El anuncio, ya fue." },
  { id: "b3", time: "07:38", section: "ideas", slug: "fintech-despues-del-hype", title: "Casa Quilate publica márgenes. São Paulo ya no celebra otra wallet." },
  { id: "b4", time: "07:05", section: "design", slug: "buenos-aires-restriccion", title: "Bruma Studio corta con lo que hay. El brief llegó incompleto." },
  { id: "b5", time: "06:50", section: "climate", slug: "bogota-a-dos-mil-metros", title: "Páramo Grid firma viento en Chapinero. Sin puerto, con red." },
  { id: "b6", time: "Ayer", section: "work", slug: "el-pacifico-se-firma-en-lima", title: "Tercer Turno nombra el barco. Callao deja de ser escala." },
  { id: "b7", time: "Ayer", section: "ideas", slug: "el-mito-miami", title: "Una cohorte cierra Brickell y vuelve a Paulista y Roma Norte." },
  { id: "b8", time: "Ayer", section: "climate", slug: "triangulo-del-litio", title: "El triángulo del litio no cabe en un ticker. Nombra un pueblo." },
  { id: "b9", time: "18 ago", section: "design", slug: "medellin-sin-brochure", title: "Altura Code publica por temporadas. El mural, afuera." },
  { id: "b10", time: "17 ago", section: "ideas", slug: "corredor-es-pt", title: "México y Brasil se facturan sin pasar por Palo Alto." },
];

export const POPULAR_SLUGS = [
  "latam-no-pidio-permiso",
  "nearshoring-despues-del-anuncio",
  "fintech-despues-del-hype",
  "cult-of-the-analog-office",
  "el-mito-miami",
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

export function articlesByFranchise(id: FranchiseId) {
  return ARTICLES.filter((a) => a.franchise === id).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

