import { findGroup, groupByLabel } from "./taxonomy";

export type EvidenceGrade = "A" | "B" | "C";

export type ListedCompany = {
  rank: number;
  slug: string;
  name: string;
  sector: string;
  sectorDetail: string;
  city: string;
  country: string;
  blurb: string;
  profile: string;
  evidence: EvidenceGrade;
  evidenceNote: string;
  risk: string;
  image: string;
  imageAlt: string;
  imageKind: "logo" | "photo";
};

export const VANDER_LIST: ListedCompany[] = [
  {
    rank: 1,
    slug: "cloudwalk",
    name: "CloudWalk",
    sector: "Pagos",
    sectorDetail: "Adquirencia y banking para micropymes",
    city: "São Paulo",
    country: "Brasil",
    blurb: "La compañía privada más rentable de América Latina, y no está ni cerca.",
    profile: "Ingresos de 5.440 millones de reales en 2025, 104% más que el año anterior. Utilidad neta de 602 millones de reales, 90% más. Facturación anualizada a diciembre de 7.160 millones. Seis coma tres millones de emprendedores activos en Brasil. Y setecientos veinte empleados, lo que da diez millones de reales de facturación por persona — una cifra que no tiene comparación en la región.\n\nNo levanta equity nuevo. Se financia con FIDCs para el anticipo de recibibles: 5.500 millones de reales en abril de 2026, su mayor operación. Crece sin diluirse.",
    evidence: "B",
    evidenceNote: "Cifra propia, con serie histórica y confirmación de prensa financiera independiente.",
    risk: "La adquirencia brasileña es un mercado de márgenes en compresión permanente. Crecer 104% en ese terreno obliga a preguntarse por la calidad del crédito que lo acompaña.",
    image: "/list/cloudwalk.jpg",
    imageAlt: "Logo de CloudWalk",
    imageKind: "logo",
  },
  {
    rank: 2,
    slug: "qi-tech",
    name: "QI Tech",
    sector: "Infraestructura",
    sectorDetail: "Infraestructura financiera B2B",
    city: "São Paulo",
    country: "Brasil",
    blurb: "La única del ranking cuya rentabilidad está firmada por una agencia de calificación.",
    profile: "Fitch le asignó rating A+(bra) sobre un estado con 31,1 millones de reales de utilidad neta y 59 millones de EBITDA sobre 102 millones de ingreso neto en el primer semestre de 2023. Después la subió a AA-(bra): es el único proveedor de banking-as-a-service brasileño con ese rating. Ingresos de 700 millones de reales en 2024, creciendo entre 70 y 80% anual.\n\nFue la primera Sociedade de Crédito Direto de Brasil. Hoy atiende mil cien fondos y cuatrocientas gestoras de crédito, y administra 121.000 millones de reales en activos tras comprar Singulare. Su brazo de seguros generó 150 millones en primas en siete meses.",
    evidence: "A",
    evidenceNote: "Fitch: rating A+(bra), después AA-(bra). Único proveedor de banking-as-a-service brasileño con ese rating.",
    risk: "Valuación por encima de los dos mil millones de dólares con una cifra de resultado auditada que ya tiene tres años. La compañía debería publicar una actualizada.",
    image: "/list/qi-tech.jpg",
    imageAlt: "Logo de QI Tech",
    imageKind: "logo",
  },
  {
    rank: 3,
    slug: "asaas",
    name: "Asaas",
    sector: "Pagos",
    sectorDetail: "Cuenta y cobranzas para pymes",
    city: "Joinville",
    country: "Brasil",
    blurb: "Punto de equilibrio en mayo de 2023. Utilidad todos los meses desde entonces.",
    profile: "Ingresos recurrentes anuales de 800 millones de reales a mediados de 2026, contra unos 400 millones en 2024. Doscientos ochenta y cinco mil clientes activos, contra 170.000 dos años antes.\n\nLevantó 820 millones de reales en 2024 liderada por BOND, el fondo de Mary Meeker, con SoftBank — una de las mayores rondas de la región ese año. El fundador dijo que fue la de menor dilución de las tres que hicieron. Eso es lo que compra la rentabilidad.",
    evidence: "C",
    evidenceNote: "Punto de equilibrio declarado, con métricas de escala verificadas.",
    risk: "Nació en Joinville, lejos del eje São Paulo. Escalar la venta fuera de su base geográfica sin romper el margen es el desafío no probado.",
    image: "/list/asaas.jpg",
    imageAlt: "Logo de Asaas",
    imageKind: "logo",
  },
  {
    rank: 4,
    slug: "cora",
    name: "Cora",
    sector: "Fintech",
    sectorDetail: "Banco digital para pymes",
    city: "São Paulo",
    country: "Brasil",
    blurb: "Punto de equilibrio en el cuarto trimestre de 2024 y sostenido durante todo 2025, mientras crecía 60%.",
    profile: "Ciento noventa mil millones de reales transaccionados en 2025. Un coma siete millones de empresas integradas. Y un dato de estrategia que vale más que la cifra: el canal de contadores generó 15% de los ingresos en 2025 y proyecta cerca de 30% de los ingresos nuevos en 2026. Cora entendió que en Brasil el contador es el canal de distribución de la pyme.\n\nNo levanta equity desde 2021. Cinco años.",
    evidence: "C",
    evidenceNote: "Sostenida en el tiempo y con cifras operativas duras.",
    risk: "Acaba de recibir autorización para operar como sociedad de crédito. Pasar de cuenta a balance es donde las fintechs de pymes suelen descubrir su verdadero costo de riesgo.",
    image: "/list/cora.jpg",
    imageAlt: "Logo de Cora",
    imageKind: "logo",
  },
  {
    rank: 5,
    slug: "global66",
    name: "Global66",
    sector: "Pagos",
    sectorDetail: "Pagos transfronterizos",
    city: "Santiago",
    country: "Chile",
    blurb: "Rentable hace más de dos años y medio, y casi nadie fuera de Chile lo sabe.",
    profile: "Más de cien millones de dólares de ingresos anualizados, creciendo por encima de 100% interanual. Volumen movilizado en 2025: 3.700 millones de dólares, 157% más que el año anterior. Chile 1.800 millones, Colombia 543 millones creciendo 214%, Argentina 169 millones creciendo 383%.\n\nEl dato que reordena la lectura: el segmento de empresas creció 310% y ya es aproximadamente la mitad del volumen. Global66 dejó de ser una app de remesas y se volvió infraestructura de pagos a proveedores del exterior para pymes latinoamericanas.",
    evidence: "C",
    evidenceNote: "Con serie de volumen desagregada por país.",
    risk: "El negocio transfronterizo vive de un spread que la competencia y los reguladores comprimen. Y no publica valuación ni rondas recientes.",
    image: "/list/global66.jpg",
    imageAlt: "Logo de Global66",
    imageKind: "logo",
  },
  {
    rank: 6,
    slug: "omie",
    name: "Omie",
    sector: "Software",
    sectorDetail: "ERP y servicios financieros para pymes",
    city: "São Paulo",
    country: "Brasil",
    blurb: "Generadora de caja desde junio de 2023.",
    profile: "Ingresos recurrentes anuales de 600 millones de reales, creciendo entre 30 y 40%. Ciento ochenta mil clientes. Su software procesa alrededor de 35.000 millones de reales en notas fiscales por mes — cerca de 3,5% del PIB brasileño pasa por ahí.\n\nLevantó 855 millones de reales en septiembre de 2025 liderada por Partners Group, la mayor ronda brasileña del año, a 700 millones de dólares pre-money. Fue mayoritariamente secundaria: entró menos dinero al balance que lo que dice el titular.",
    evidence: "C",
    evidenceNote: "Generación de caja declarada, sin cifra de resultado auditada.",
    risk: "Crecer 30-40% es sano, no espectacular, y en ERP la retención es el único número que importa. Omie no la publica.",
    image: "/list/omie.jpg",
    imageAlt: "Escritorio financiero en São Paulo",
    imageKind: "photo",
  },
  {
    rank: 7,
    slug: "addi",
    name: "Addi",
    sector: "Crédito",
    sectorDetail: "Crédito en el punto de venta",
    city: "Bogotá",
    country: "Colombia",
    blurb: "Rentable desde 2024, y premiada en el ranking de crecimiento del Financial Times de 2026.",
    profile: "Cerca de tres millones de clientes y treinta y nueve mil comercios en Colombia. Serie D de 85 millones de dólares en julio de 2026, co-liderada por Citius y BTG Pactual, con GIC, Quona, Monashees, Union Square Ventures y Andreessen Horowitz. Más de 680 millones de dólares en compromisos de deuda, incluida una línea estructurada de 150 millones de JP Morgan.\n\nY el movimiento que importa: la Superintendencia Financiera la autorizó como entidad vigilada, lo que le abre la captación de depósitos. Un originador de crédito que consigue fondeo propio cambia de negocio.",
    evidence: "C",
    evidenceNote: "Rentabilidad declarada por la compañía, sin cifra de resultado.",
    risk: "El crédito en punto de venta es el primer producto que se rompe cuando el consumo colombiano se enfría. La rentabilidad de 2024-2026 se probó en expansión, no en contracción.",
    image: "/list/addi.jpg",
    imageAlt: "Logo de Addi",
    imageKind: "logo",
  },
  {
    rank: 8,
    slug: "tapi",
    name: "Tapi",
    sector: "Infraestructura",
    sectorDetail: "Infraestructura de pagos y cobranzas",
    city: "Buenos Aires",
    country: "Argentina",
    blurb: "Diez veces sus ingresos en dieciocho meses, y rentable mientras lo hacía.",
    profile: "Más de doscientos cincuenta millones de transacciones en 2025 por seis mil millones de dólares. Setenta mil puntos físicos de pago, veinte mil comercios, más de ochenta clientes, entre ellos YPF. Opera en cinco países.\n\nLevantó 27 millones de dólares en febrero de 2026 liderada por Kaszek, después de haber declarado que no necesitaba levantar. Y compró dos unidades de negocio de Arcus, la filial de Mastercard, en México: una startup argentina de tres años comprándole activos a Mastercard.",
    evidence: "C",
    evidenceNote: "Reconfirmada en dos momentos distintos.",
    risk: "Setenta y cinco empleados sosteniendo seis mil millones de dólares de volumen es admirable y frágil a la vez. Cualquier incidente operativo tiene consecuencias desproporcionadas.",
    image: "/list/tapi.jpg",
    imageAlt: "Buenos Aires, escritorio de Tapi",
    imageKind: "photo",
  },
  {
    rank: 9,
    slug: "buser",
    name: "Buser",
    sector: "Transporte",
    sectorDetail: "Transporte interurbano",
    city: "São Paulo",
    country: "Brasil",
    blurb: "Cien millones de reales de utilidad operativa en 2024. Y viene de haber despedido a más de la mitad de su gente.",
    profile: "Más de cien millones de dólares de ingresos en 2024, con meta de 150 para 2025. Doce millones de pasajeros activos en más de doscientas cincuenta ciudades. Ocupación de 80% contra 60% de los operadores tradicionales — esa brecha es el negocio.\n\nPasó de 550 empleados a comienzos de 2022 a 240. El ajuste produjo la rentabilidad; no fue una crisis, fue el precio. Y ganó la pelea regulatoria: la ANTT reconoce su operación como legal.",
    evidence: "B",
    evidenceNote: "Cifra de resultado publicada por la compañía, con cobertura de prensa independiente.",
    risk: "Ahora compra empresas de ómnibus y opera en terminales. Está convirtiendo un modelo asset-light en uno pesado, que es exactamente lo que hacía caros a los incumbentes.",
    image: "/list/buser.jpg",
    imageAlt: "Operación de transporte",
    imageKind: "photo",
  },
  {
    rank: 10,
    slug: "habi",
    name: "Habi",
    sector: "Vivienda",
    sectorDetail: "Vivienda usada y crédito hipotecario",
    city: "Bogotá",
    country: "Colombia",
    blurb: "Rentable en Colombia desde el cierre de 2024, y segundo año consecutivo en 2025.",
    profile: "En el primer trimestre de 2025 originó 12.454 créditos hipotecarios para vivienda usada, 52% más que el año anterior: alrededor del 10% de todos los desembolsos hipotecarios del país. Gestiona sus transacciones en Colombia con un sistema conversacional automatizado.\n\nPlan de 500 a 600 millones de dólares en compra de vivienda durante 2025.",
    evidence: "C",
    evidenceNote: "Sostenida dos años y con una métrica de participación de mercado verificable.",
    risk: "Su última ronda fue de treinta millones de dólares en 2024 y, según su CFO, no la usó. Puede leerse como disciplina o como dificultad. El mismo CFO dice que no hay ventana para salir a bolsa.",
    image: "/list/habi.jpg",
    imageAlt: "Bogotá, mercado de vivienda",
    imageKind: "photo",
  },
  {
    rank: 11,
    slug: "galgo",
    name: "Galgo",
    sector: "Crédito",
    sectorDetail: "Financiamiento de motos y vehículos",
    city: "Santiago",
    country: "Chile",
    blurb: "Cien millones de dólares anualizados prestándole a quien el banco no mira.",
    profile: "Nació en 2018 como Migrante, dando crédito a migrantes recién llegados a Chile. Hoy financia motos y vehículos de trabajo a través de más de dos mil distribuidores aliados en Chile, Colombia y México. Fue rentable en Chile y Colombia ya en 2023 y declara una meta de quinientos millones hacia 2030 «siempre de forma rentable».\n\nLevantó 52 millones de dólares en 2025 y Uber entró al capital. Más de 350 millones en líneas de crédito.",
    evidence: "C",
    evidenceNote: "Rentabilidad declarada en Chile y Colombia desde 2023, sin cifra de resultado.",
    risk: "Prestar a trabajadores informales con garantía sobre un activo que se mueve es un negocio de cobranza, no de originación. La mora es el único número que cuenta y no lo publica.",
    image: "/list/galgo.jpg",
    imageAlt: "Escritorio en Santiago",
    imageKind: "photo",
  },
  {
    rank: 12,
    slug: "agrolend",
    name: "Agrolend",
    sector: "Crédito",
    sectorDetail: "Crédito agrícola",
    city: "São Paulo",
    country: "Brasil",
    blurb: "La ficha mejor documentada de todo el ranking, y probablemente no la conocías.",
    profile: "Moody's Local le asignó rating BBB+.br con perspectiva estable en enero de 2026, sobre una serie de cuatro años: pérdida de 0,4 millones de reales en 2022, utilidad de 3,3 millones en 2023, pérdida de 0,6 en 2024 y utilidad de 8,8 millones en el primer semestre de 2025. Cartera de 300,6 millones de reales con morosidad de 1,1%.\n\nUn uno coma uno por ciento de mora en crédito rural, en Brasil, con cinco años de vida.",
    evidence: "A",
    evidenceNote: "Moody's Local: rating BBB+.br con perspectiva estable, enero 2026. Serie de cuatro años de resultado.",
    risk: "La cartera cayó entre diciembre de 2024 y junio de 2025, y el patrimonio (478 millones) es mayor que la cartera. Está sobrecapitalizada o desplegando lento. Ninguna de las dos es buena noticia.",
    image: "/list/agrolend.jpg",
    imageAlt: "Campo y crédito agrícola",
    imageKind: "photo",
  },
  {
    rank: 13,
    slug: "celcoin",
    name: "Celcoin",
    sector: "Infraestructura",
    sectorDetail: "Banking as a service",
    city: "São Paulo",
    country: "Brasil",
    blurb: "EBITDA positivo desde mediados de 2023, con más de cuatrocientos clientes financieros encima.",
    profile: "Ingresos de 256 millones de reales en 2023, 113% más; 79 millones en el primer trimestre de 2024, 140% más. Le vende infraestructura a XP, BTG, Inter, Mercado Pago y Agibank, más de cinco mil empresas no financieras.\n\nLevantó 650 millones de reales en 2024 liderada por Summit Partners, su primera inversión en América Latina. Cuatro adquisiciones desde 2022.",
    evidence: "C",
    evidenceNote: "Solo a nivel EBITDA: no verificamos utilidad neta. Cifras públicas más recientes de 2024.",
    risk: "Crecer por adquisición en infraestructura financiera acumula deuda técnica regulatoria. Y sus cifras públicas más recientes son de 2024.",
    image: "/list/celcoin.jpg",
    imageAlt: "São Paulo, infraestructura financiera",
    imageKind: "photo",
  },
  {
    rank: 14,
    slug: "klar",
    name: "Klar",
    sector: "Fintech",
    sectorDetail: "Banca digital de consumo",
    city: "Ciudad de México",
    country: "México",
    blurb: "Punto de equilibrio en 2025, después de encadenar diez meses sin pérdidas.",
    profile: "Cerca de siete millones de usuarios en abril de 2026, contra 3,6 millones a fines de 2024: 94% más en poco más de un año. Segunda sociedad financiera popular del país por usuarios. Índice de capitalización promedio de 154%.\n\nSerie C de 170 millones de dólares en 2025 a valuación de 800 millones, liderada por General Atlantic, con Santander entrando al cap table. Licencia bancaria solicitada, pendiente.",
    evidence: "C",
    evidenceNote: "Punto de equilibrio declarado por la compañía.",
    risk: "Alcanzar el equilibrio duplicando la base de usuarios en un año es contraintuitivo y merece escrutinio. El costo de riesgo de una cosecha tan nueva todavía no maduró.",
    image: "/list/klar.jpg",
    imageAlt: "Logo de Klar",
    imageKind: "logo",
  },
  {
    rank: 15,
    slug: "loft",
    name: "Loft",
    sector: "Vivienda",
    sectorDetail: "Vivienda",
    city: "São Paulo",
    country: "Brasil",
    blurb: "Segundo año consecutivo rentable, y nadie escribió sobre eso.",
    profile: "Un coma dos millones de transacciones en 2025, 35% más que las 889.000 de 2024. Ingresos creciendo por encima de 30% anual. Invierte cien millones de reales en tecnología en 2026 y está contratando. Negó públicamente los reportes de caída de su valuación.\n\nLoft fue el ejemplo favorito de la prensa cuando encarnaba el exceso de 2021. Ahora que gana plata, dejó de ser noticia. Eso dice más sobre la cobertura que sobre la compañía.",
    evidence: "C",
    evidenceNote: "Sostenida dos años.",
    risk: "La proptech brasileña vive del ciclo de tasas. Con la Selic donde está, la rentabilidad de Loft se probó en el escenario difícil — pero el volumen no.",
    image: "/list/loft.jpg",
    imageAlt: "Vivienda en São Paulo",
    imageKind: "photo",
  },
  {
    rank: 16,
    slug: "konfio",
    name: "Konfío",
    sector: "Crédito",
    sectorDetail: "Crédito a pymes",
    city: "Ciudad de México",
    country: "México",
    blurb: "Rentable dos años seguidos, y octava en cartera pyme contra la banca tradicional.",
    profile: "Alrededor de ochenta mil pymes financiadas en una década, cerca de cien mil millones de pesos colocados. Más del 80% de sus clientes recibe crédito empresarial por primera vez. Meta a 2028: ochenta y cinco mil créditos adicionales.\n\nPara esos créditos adicionales proyecta 44.000 millones de pesos.",
    evidence: "C",
    evidenceNote: "Declarada por la compañía sin cifra de resultado.",
    risk: "Mil cien millones de dólares levantados en trece rondas para llegar a ochenta mil clientes. La eficiencia de capital es el punto flojo del expediente, y su solicitud de licencia bancaria lleva tres años pendiente.",
    image: "/list/konfio.jpg",
    imageAlt: "Logo de Konfío",
    imageKind: "logo",
  },
  {
    rank: 17,
    slug: "nomad",
    name: "Nomad",
    sector: "Fintech",
    sectorDetail: "Cuenta e inversiones en dólares",
    city: "São Paulo",
    country: "Brasil",
    blurb: "Punto de equilibrio por primera vez en febrero de 2025, con quinientos millones de reales de ingresos.",
    profile: "Dos coma seis millones de clientes a fines de 2024, el doble que el año anterior. Cerca de mil millones de dólares bajo custodia. Consiguió licencia de broker-dealer en Estados Unidos.",
    evidence: "C",
    evidenceNote: "Explícitamente marginal: la propia compañía habla de generación de caja modesta.",
    risk: "A fines de 2024 le quedaban unos veinte millones de dólares de su Serie B. Para una compañía de ese tamaño, el colchón es fino. No verificamos su situación de caja en 2026.",
    image: "/list/nomad.jpg",
    imageAlt: "São Paulo",
    imageKind: "photo",
  },
  {
    rank: 18,
    slug: "conta-simples",
    name: "Conta Simples",
    sector: "Fintech",
    sectorDetail: "Cuenta y gastos corporativos",
    city: "São Paulo",
    country: "Brasil",
    blurb: "Punto de equilibrio en 2023, con dieciocho mil millones de reales de volumen.",
    profile: "Más de quinientas mil tarjetas emitidas, más de treinta mil clientes activos. Serie B de 41,5 millones de dólares liderada por Base10 en 2024; el CEO dijo que la valuación creció 230% respecto de la ronda anterior.",
    evidence: "C",
    evidenceNote: "Datos operativos públicos más recientes de 2023 y 2024.",
    risk: "Una compañía que dejó de comunicar cifras durante dos años en un mercado tan competido como el de tarjetas corporativas brasileñas obliga a preguntar por qué.",
    image: "/list/conta-simples.jpg",
    imageAlt: "Sala de directorio",
    imageKind: "photo",
  },
  {
    rank: 19,
    slug: "kavak",
    name: "Kavak",
    sector: "Autos",
    sectorDetail: "Autos usados",
    city: "Ciudad de México",
    country: "México",
    blurb: "El regreso más improbable de la región. Entra por el hito, no por la serie.",
    profile: "Perdió la mayor parte de su valuación y recortó plantilla. Después alcanzó su primer mes de rentabilidad global consolidada en diciembre de 2025 y en febrero de 2026 levantó 300 millones de dólares en Serie F co-liderada por Andreessen Horowitz y WCM Investment Management, con 200 millones de a16z: su mayor inversión en una sola compañía de América Latina.\n\nCiento veinte mil transacciones en 2025, 40% más. Su brazo financiero originó 600 millones de dólares anualizados en el cuarto trimestre.\n\nCierra casi la lista por eso: entra por el hito, no por la serie. Un mes no le gana a dos años, y el orden lo dice.",
    evidence: "C",
    evidenceNote: "Es un mes, no un año. Lo decimos así.",
    risk: "Un mes rentable no es una compañía rentable. Y arrastra cobertura de investigación sobre calidad de inventario y documentación que todavía no cerró.",
    image: "/list/kavak.jpg",
    imageAlt: "Sede de Kavak",
    imageKind: "photo",
  },
  {
    rank: 20,
    slug: "justo",
    name: "Justo",
    sector: "Software",
    sectorDetail: "Software para restaurantes",
    city: "Santiago",
    country: "Chile",
    blurb: "Rentable por primera vez en marzo de 2025, peleándole a los agregadores. No confundir con Jüsto.",
    profile: "No confundir con Jüsto, el supermercado mexicano que cerró. Justo —GetJusto— le vende a los restaurantes la plataforma para que vendan sin agregador: comercio propio, delivery, fidelización, reservas y terminales de pago. Procesa entre trescientos y cuatrocientos millones de dólares anuales en transacciones. Va última por la misma razón que Kavak: entra por el hito de un mes, no por una serie sostenida.",
    evidence: "C",
    evidenceNote: "La ficha más débil del ranking en calidad de dato. Entra por el hito de un mes, no por la contabilidad.",
    risk: "Sus cifras públicas mezclan volumen transaccionado con ingresos de forma ambigua.",
    image: "/list/justo.jpg",
    imageAlt: "Cocina y software para restaurantes",
    imageKind: "photo",
  },
];

export const VANDER_DEK =
"No es un ranking de innovación. Es la lista de las veinte compañías latinoamericanas que ganan plata, ordenadas por la calidad de la prueba. Ninguna de las otras listas de la región usa ese criterio. Por eso esta es corta.";

export const VANDER_METHOD = [
  { title: "Por qué este ranking es distinto", text: "En 2025 el capital de riesgo latinoamericano movió 4.126 millones de dólares en 681 rondas. El monto subió casi 14%. El número de operaciones cayó al mínimo desde 2017. Eso no es un ecosistema recuperándose. Es un ecosistema concentrándose. Un ranking de «las más prometedoras» ordenado por capital levantado no informa nada." },
  { title: "Elegibilidad", text: "Fundada después de 2010. Privada o de listado tan reciente que la comparación sigue teniendo sentido. Fuera las consolidadas: Mercado Libre, Nubank, Rappi, iFood, Stone, dLocal. Fuera también las que ya cruzaron los tres mil millones de dólares de valuación —QuintoAndar— porque a esa altura ya no son promesa: son resultado." },
  { title: "El orden", text: "Rentabilidad verificada, primero. Crecimiento de ingresos, segundo. Eficiencia de capital —cuánta facturación por dólar levantado y por empleado— tercero. Posición estructural —si otros construyen encima— cuarto." },
  { title: "La calidad de la prueba", text: "Evidencia A: cifra de resultado verificada por un tercero (agencia de calificación, regulador o mercado). Evidencia B: cifra de resultado publicada por la propia compañía, con número. Evidencia C: punto de equilibrio o generación de caja declarada, sin cifra. Una C no es mentira. Es una afirmación de un ejecutivo que nadie revisó." },
  { title: "Lo que no hicimos", text: "No usamos agregadores. Si el dato no estaba en un comunicado, un informe de calificación, un regulador o una nota de prensa de negocios con fuente identificable, no entró. Verificamos más de ciento veinte compañías de nueve países. Veinte pasaron." },
];

export type WaitItem = { name: string; place: string; note: string };
export const VANDER_WAITLIST: WaitItem[] = [
  { name: "Tractian", place: "Brasil", note: "Mantenimiento predictivo industrial. Retención neta de ingresos de 150% y margen bruto de 72%. La métrica de retención más fuerte que vimos en toda la región. Invierte la mitad de su margen bruto en I+D, así que la rentabilidad no es el objetivo hoy." },
  { name: "Cobre", place: "Colombia", note: "Tesorería B2B. 2.600 millones de dólares mensuales en pagos B2B en la región, 7.600 millones procesados en México solo en el primer semestre de 2026. Crecimiento verificable, cobertura casi nula, cero divulgación financiera." },
  { name: "Buk", place: "Chile", note: "Software de recursos humanos. Cruzó los cien millones de dólares de ingresos recurrentes creciendo 50%. No entró porque sus propias fuentes se contradicen: antes declaró ser rentable desde sus primeros años; en junio de 2026 su CEO dijo que no lo es, por decisión." },
  { name: "Toku", place: "Chile", note: "Cobranza automatizada. Retención neta de 160%, triplicó su volumen procesado en 2024, la mayor Serie A de una fintech fundada por mujeres en la región." },
  { name: "Onfly", place: "Brasil", note: "Viajes corporativos. Superó los cien millones de reales de ingresos y los mil millones de volumen transaccionado, con dos mil clientes corporativos. Poco cubierta." },
  { name: "Daki", place: "Brasil", note: "Entrega rápida. Perdió el estatus de unicornio y declara 20% de margen EBITDA sobre mil millones de reales. Su CEO precisa que la rentabilidad es por hub, no consolidada. Esa honestidad la deja fuera este año." },
];
export const VANDER_WAIT_ALSO = "Simetrik (CO), Bold (CO), Cayena (BR), Zippi (BR), CRMBonus (BR), Prometeo (UY), Rankmi (CL), Vambe (CL), Fintual (CL), Sofía (MX), Pipefy (BR), Bankingly (UY).";
export const VANDER_CLOSED: WaitItem[] = [
  { name: "Merqueo", place: "Colombia", note: "Cerró en julio de 2025. Quemaba entre 4,5 y 5 millones de dólares al mes." },
  { name: "Frubana", place: "Colombia", note: "Cerró en agosto de 2025, después de 271 millones de dólares levantados." },
  { name: "Jüsto", place: "México", note: "Cerró en diciembre de 2025; rescatada por Grupo OMNi en enero de 2026 sin su fundador." },
];
export const VANDER_SHRUNK: WaitItem[] = [
  { name: "Facily", place: "Brasil", note: "Ex unicornio en venta desde 2024; uno de sus fondos ya castigó el activo a cero." },
  { name: "Betterfly", place: "Chile", note: "Cerró operaciones en cinco países en marzo de 2025." },
  { name: "Xepelin", place: "Chile", note: "Ronda puente en enero de 2026 a una valuación 44% menor." },
];

export const VANDER_TLDR = [
  "El Vander 20 2026 lista veinte compañías privadas de América Latina que ganan plata, no las que más capital levantaron.",
  "El orden es: rentabilidad verificada, crecimiento de ingresos, eficiencia de capital y posición estructural.",
  "Solo dos fichas tienen evidencia A (QI Tech por Fitch; Agrolend por Moody's Local). Dieciséis son evidencia C: declaración de un ejecutivo sin cifra.",
  "Brasil ocupa once puestos. Chile, tres. México, tres. Colombia, dos. Argentina, uno. Perú: cero con prueba pública.",
  "Quedan fuera Mercado Libre, Nubank, Rappi, iFood, Stone, dLocal y QuintoAndar: ya no son promesa.",
];

export const VANDER_FAQ = [
  {
    q: "¿Qué es el Vander 20?",
    a: "El Vander 20 es el ranking anual de We Are Vander de las veinte compañías latinoamericanas fundadas después de 2010 que ganan plata. Se ordena por calidad de la prueba de rentabilidad, no por ronda ni por valuación. La edición 2026 se cerró en agosto.",
  },
  {
    q: "¿Por qué Mercado Libre y Nubank no están en el Vander 20?",
    a: "Por tamaño. El Vander 20 excluye compañías consolidadas y las que ya cruzaron los tres mil millones de dólares de valuación. Mercado Libre, Nubank, Rappi, iFood, Stone, dLocal y QuintoAndar son resultado, no promesa.",
  },
  {
    q: "¿Qué significa evidencia A, B y C?",
    a: "A: cifra de resultado verificada por un tercero —agencia de calificación, regulador o mercado. B: cifra de resultado publicada por la propia compañía, con número. C: punto de equilibrio o generación de caja declarada, sin cifra. Una C no es mentira; es una afirmación que nadie auditó.",
  },
  {
    q: "¿Cuál es la compañía más rentable del Vander 20 2026?",
    a: "CloudWalk, de Brasil. En 2025 facturó 5.440 millones de reales, 104% más que el año anterior, con utilidad neta de 602 millones. Evidencia B: cifra propia con serie histórica y prensa financiera independiente.",
  },
  {
    q: "¿Cuándo se actualiza el ranking?",
    a: "Una vez al año. La próxima edición se cierra en agosto de 2027. Si una compañía de la lista de espera publica un estado de resultados, entra a la revisión. El ranking publicado no se reordena entre ediciones.",
  },
  {
    q: "¿Cómo entra una compañía al Vander 20?",
    a: "Tiene que haber sido fundada después de 2010, no ser una consolidada, y tener rentabilidad verificable en un comunicado, un informe de calificación, un regulador o una nota de prensa de negocios con fuente identificable. No usamos agregadores.",
  },
];

export const LIST_RESERVED = new Set(["sector", "ciudad", "metodologia"]);

export function getCompany(slug: string) {
  if (LIST_RESERVED.has(slug)) return undefined;
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

export function vanderSectors() {
  return groupByLabel(VANDER_LIST, (c) => c.sector);
}

export function vanderCities() {
  return groupByLabel(VANDER_LIST, (c) => c.city);
}

export function vanderSector(slug: string) {
  return findGroup(vanderSectors(), slug);
}

export function vanderCity(slug: string) {
  return findGroup(vanderCities(), slug);
}

