export type ListedCompany = {
  rank: number;
  slug: string;
  name: string;
  sector: string;
  city: string;
  blurb: string;
  profile: string;
  image: string;
  imageAlt: string;
};

export const VANDER_LIST: ListedCompany[] = [
  {
    rank: 1,
    slug: "sierra-line",
    name: "Sierra Line",
    sector: "Industria",
    city: "Monterrey",
    blurb: "Nearshoring sin comunicado. Segundo turno, proveedores locales y un P&L que no cabe en un tuit.",
    profile:
      "Sierra Line no vende el “momento México”. Vende un segundo turno en Apodaca, un casco y una nómina que entra cuando Reforma todavía está oscura. El nearshoring, aquí, es planta: proveedores a menos de una hora, un supervisor que habla inglés de piso, no de pitch, y un recorrido de veinte minutos para quien insiste en la entrevista.",
    image: "/photos/monterrey-factory.jpg",
    imageAlt: "Planta industrial en Monterrey al anochecer",
  },
  {
    rank: 2,
    slug: "casa-quilate",
    name: "Casa Quilate",
    sector: "Finanzas",
    city: "São Paulo",
    blurb: "El banco después del hype. Márgenes feos, sucursal chica, cobro difícil de copiar.",
    profile:
      "Nació como wallet y hoy es un banco con sucursal del tamaño de una panadería en Itaim. Casa Quilate publica márgenes como si fueran un lookbook: feos, específicos, difíciles de screenshotear. La innovación era abrir la cuenta. El negocio es no perderla — y cobrar en México sin pasar por Palo Alto.",
    image: "/photos/saopaulo-fintech.jpg",
    imageAlt: "Interior de una sucursal financiera en São Paulo",
  },
  {
    rank: 3,
    slug: "vesper-grid",
    name: "Vesper Grid",
    sector: "Energía",
    city: "Calama",
    blurb: "Solar que trata el Atacama como paisaje. Offtakes a 20 años y código de casa.",
    profile:
      "Desde el filo sobre el campo, el Atacama no parece una historia de tecnología. Parece un cultivo. Vesper Grid no es el mayor operador solar de Chile; puede ser el más deliberado. Vende kilowatts-hora y un lenguaje para cómo un sitio energético encuentra un paisaje. Los offtakes son a veinte años. El código de casa cabe en una página.",
    image: "/photos/climate-atacama.jpg",
    imageAlt: "Campo solar en el desierto de Atacama",
  },
  {
    rank: 4,
    slug: "paramo-grid",
    name: "Páramo Grid",
    sector: "Energía",
    city: "Bogotá",
    blurb: "Viento a 2.600 metros. Sin puerto, con red. El clima como escritorio.",
    profile:
      "Páramo Grid no vende un paisaje de postal. Vende un offtake de viento y una sala en Chapinero donde el modelo climático cabe en doce páginas. No tienen puerto. Tienen paciencia y una red que no se cae. A 2.600 metros el talento de ingeniería se quedó: más barato que Austin, más estable que el mito de Miami.",
    image: "/photos/bogota.jpg",
    imageAlt: "Oficinas y cielo de Bogotá",
  },
  {
    rank: 5,
    slug: "northroom",
    name: "Northroom",
    sector: "Trabajo",
    city: "Santiago",
    blurb: "Oficinas como protocolos. Wifi lento, mesas largas, lista de espera de 24 meses.",
    profile:
      "El producto de Northroom no es el mueble. Es un protocolo. Clientes —un fondo climático en Vitacura, una marca en Brooklyn— compran una sala diseñada para que la interrupción digital sea levemente incómoda. El wifi se estrecha después de las 11. Hay impresora, y se usa. Lista de espera: dos años. El margen pondría colorado a una consultora.",
    image: "/photos/analog-office.jpg",
    imageAlt: "Sala de juntas analógica en Santiago",
  },
  {
    rank: 6,
    slug: "tercer-turno",
    name: "Tercer Turno",
    sector: "Logística",
    city: "Lima",
    blurb: "El Pacífico se firma en Callao. Handoff en prosa. Nombra el barco.",
    profile:
      "Tercer Turno escribe el handoff en prosa y lo pega junto al turno. El puerto no espera un Slack. Un supervisor en Callao muestra la grilla del día: tres naves, un retraso, cero teatro. Si no puedes nombrar el barco, no tienes una tesis de supply. Callao dejó de ser escala. Es escritorio.",
    image: "/photos/lima-port.jpg",
    imageAlt: "Puerto del Callao al atardecer",
  },
  {
    rank: 7,
    slug: "bruma-studio",
    name: "Bruma Studio",
    sector: "Diseño",
    city: "Buenos Aires",
    blurb: "Corta con lo que hay. La restricción argentina, convertida en código de casa.",
    profile:
      "Bruma Studio corta en un local que antes fue una librería. Los rollos llegan cuando llegan. El patrón se escribe para lo que hay: un cuello que migra de tela, una paleta que sobrevive tres temporadas, un objeto que no depende de una aduana simpática. Si el material no llega, el diseño tiene que haber llegado antes.",
    image: "/photos/buenos-aires.jpg",
    imageAlt: "Calle y estudio en Buenos Aires",
  },
  {
    rank: 8,
    slug: "sombra-studio",
    name: "Sombra Studio",
    sector: "Software",
    city: "Ciudad de México",
    blurb: "Herramientas espaciales publicadas por temporadas, como una colección.",
    profile:
      "Sombra Studio construye software espacial para arquitectos y corre en temporadas. Hay una colección. Hay un código de casa: nada de dark mode por defecto, ninguna ilustración de personas de espaldas, ningún feature que no se pueda explicar en la mesa. Cuando publican, publican un look. El organigrama es la sala.",
    image: "/photos/cdmx-reforma.jpg",
    imageAlt: "Reforma en Ciudad de México",
  },
  {
    rank: 9,
    slug: "altura-code",
    name: "Altura Code",
    sector: "Software",
    city: "Medellín",
    blurb: "Software sin brochure. Cuatro looks al año. El mural, afuera.",
    profile:
      "Altura Code publica cuatro veces al año. Hay un look. Hay un no: nada de ilustraciones de gente de espaldas, ningún feature que no se pueda explicar en la mesa, cero dark mode por defecto. Si necesitas un mural para explicar el producto, el producto no está listo. El mural, cuando existe, está afuera.",
    image: "/photos/medellin-office.jpg",
    imageAlt: "Estudio de software en Medellín",
  },
  {
    rank: 10,
    slug: "pampa-seed",
    name: "Pampa Seed",
    sector: "Agritech",
    city: "Buenos Aires",
    blurb: "Suelo, datos y contratos largos. Cero teatro de lanzamiento.",
    profile:
      "Pampa Seed vende suelo y datos en el norte argentino. Los contratos son largos a propósito. El triángulo del litio cabe en un mapa de conferencia; no cabe en un solo contrato. Ellos nombran el pueblo antes que el ticker. Cero teatro de lanzamiento. El briefing llega con humedad y con fecha.",
    image: "/photos/mill.jpg",
    imageAlt: "Campo y silos en la pampa",
  },
  {
    rank: 11,
    slug: "helio-thread",
    name: "Helio Thread",
    sector: "Clima / Textil",
    city: "Valparaíso",
    blurb: "Tela de calor residual. La bandera del founder de quince minutos.",
    profile:
      "Helio Thread teje con calor residual de planta. El founder cabe en quince minutos porque el producto no necesita una hora. La tela es el argumento: peso, mano, una factura que nombra la fuente de calor. Si tu compañía solo funciona cuando desapareces, no construiste una empresa. Helio Thread se queda en la sala.",
    image: "/photos/tactile.jpg",
    imageAlt: "Textiles y mesa de trabajo",
  },
  {
    rank: 12,
    slug: "barrio-capital",
    name: "Barrio Capital",
    sector: "Venture",
    city: "Santiago",
    blurb: "Un fondo que solo invierte en lo que se camina. Escritorio también en CDMX.",
    profile:
      "Barrio Capital mete cheques chicos a propósito. El criterio es la puerta, no el deck: si no se camina desde el escritorio, no entra. Tienen mesa en Santiago y otra en Roma Norte. Escalar fue una religión. La parroquia, para ellos, es una calle con nombre.",
    image: "/photos/neighborhood.jpg",
    imageAlt: "Barrio residencial y comercial en Santiago",
  },
  {
    rank: 13,
    slug: "oro-verde",
    name: "Oro Verde",
    sector: "Tierra",
    city: "Colchagua",
    blurb: "Supply regenerativo que rechazó a nuestro fotógrafo. Silencio como estrategia.",
    profile:
      "Oro Verde rechazó al fotógrafo. El silencio es estrategia, no timidez: supply regenerativo que no cabe en un reel. El mill espera. El contrato también. Las compañías ruidosas publican el origen; esta nombra el predio y corta la entrevista cuando el argumento ya está en la caja.",
    image: "/photos/mill.jpg",
    imageAlt: "Predio agrícola en Colchagua",
  },
  {
    rank: 14,
    slug: "cuatro-paredes",
    name: "Cuatro Paredes",
    sector: "Arquitectura",
    city: "Oaxaca",
    blurb: "Vivienda como práctica material. Tierra, cal y un no al cubo blanco.",
    profile:
      "Cuatro Paredes construye en tierra y cal. El cubo blanco perdió. La vivienda es práctica material, no brochure de desarrollador. El objeto volvió porque la pantalla se volvió un commodity. Si no se siente caro con los ojos cerrados, no está listo. Eso también vale en español.",
    image: "/photos/workshop.jpg",
    imageAlt: "Taller de arquitectura y material en Oaxaca",
  },
  {
    rank: 15,
    slug: "mesa-radio",
    name: "Mesa Radio",
    sector: "Medios",
    city: "Santiago",
    blurb: "Audio independiente con campana de cierre. La grilla, impresa.",
    profile:
      "Mesa Radio imprime la grilla. El audio independiente tiene campana de cierre: si no cabe en un A4, no era una programación, era un feed. El night shift de la radio todavía cree en la hora. La audiencia no es un dashboard. Es una calle que se nombra al aire.",
    image: "/photos/radio.jpg",
    imageAlt: "Estudio de radio en Santiago",
  },
  {
    rank: 16,
    slug: "casa-hilo",
    name: "Casa Hilo",
    sector: "Moda",
    city: "Providencia",
    blurb: "Tres metros, ventana de reparación, cero drop.",
    profile:
      "Casa Hilo cabe en tres metros. Hay una ventana de reparación y cero drop. No necesitan un flagship. Necesitan una persiana que se abra mañana. El estatus era el escenario; ahora es el calendario que se puede pegar en la pared. El barrio es el canal.",
    image: "/photos/fashion-atelier.jpg",
    imageAlt: "Atelier de moda en Providencia",
  },
  {
    rank: 17,
    slug: "lumen-tide",
    name: "Lumen Tide",
    sector: "Energía",
    city: "Puerto Montt",
    blurb: "Mareas con sendero de visita. Infraestructura que se camina sin casco.",
    profile:
      "Lumen Tide trata las mareas como infraestructura que se camina. Hay un sendero de visita. No hay casco de teatro. El capital paciente firma offtakes; el turismo industrial es un footnote a propósito. Si tu tesis cabe en un trimestre, no es una tesis. La marea no cabe.",
    image: "/photos/climate-atacama.jpg",
    imageAlt: "Infraestructura energética frente al mar",
  },
  {
    rank: 18,
    slug: "glass-orchard",
    name: "Glass Orchard",
    sector: "Alimentos",
    city: "Mendoza",
    blurb: "Invernaderos con lighting designer en staff. Produce como capilla.",
    profile:
      "Glass Orchard tiene lighting designer en staff. El invernadero se trata como capilla: temperatura, sombra, un produce que no pide un reel para convencer. Si el objeto necesita un video, el objeto no está listo. Acá el objeto es una pera que pesa lo que tiene que pesar.",
    image: "/photos/still-life.jpg",
    imageAlt: "Produce y mesa de invernadero",
  },
  {
    rank: 19,
    slug: "kinship-clay",
    name: "Kinship Clay",
    sector: "Producto",
    city: "São Paulo",
    blurb: "Termostatos que pesan de más. El QA es el pulgar, no el reel.",
    profile:
      "Kinship Clay fabrica una cápsula en São Paulo y sigue pesando de más a propósito. El QA es el pulgar, no el reel. Un modelo sin material es solo una vibra con API. El termostato que nadie desembala en un unboxing es, precisamente, el que se queda en la pared.",
    image: "/photos/still-life.jpg",
    imageAlt: "Objetos de producto sobre mesa",
  },
  {
    rank: 20,
    slug: "rio-abierto",
    name: "Río Abierto",
    sector: "Retail",
    city: "São Paulo",
    blurb: "Tiendas que tratan el piso como canal y el feed como afiche.",
    profile:
      "Río Abierto trata el piso como canal y el feed como afiche. El algoritmo alquilaría atención; la tienda vende criterio. Paulista no es un popup. Es una puerta que se abre a la hora que dice el letrero. El retail independiente reescribe el mall sin pedirle permiso al mall.",
    image: "/photos/saopaulo-paulista.jpg",
    imageAlt: "Avenida Paulista y comercio en São Paulo",
  },
];

export function getCompany(slug: string) {
  return VANDER_LIST.find((c) => c.slug === slug);
}

export function adjacentCompanies(slug: string) {
  const index = VANDER_LIST.findIndex((c) => c.slug === slug);
  return {
    index,
    prev: index > 0 ? VANDER_LIST[index - 1] : undefined,
    next: index >= 0 && index < VANDER_LIST.length - 1 ? VANDER_LIST[index + 1] : undefined,
  };
}
