import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-sGid3STf.mjs";
import { n as auth } from "./server-C1NAU_b2.mjs";
import { n as Search, r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-MVqLhDjQ.js
var ISSUE = {
	volume: "III",
	number: "08",
	title: "We Love Business",
	date: "Agosto 2026",
	city: "Santiago",
	desks: [
		"Santiago",
		"Nueva York",
		"Seúl"
	]
};
var SECTIONS = [
	{
		id: "ideas",
		label: "Ideas",
		dek: "Los argumentos que reordenan una empresa antes que el producto."
	},
	{
		id: "work",
		label: "Trabajo",
		dek: "Cómo se siente el trabajo ahora: calendarios, salas, turnos de noche."
	},
	{
		id: "design",
		label: "Diseño",
		dek: "El gusto como infraestructura. Objetos, oficinas e interfaces."
	},
	{
		id: "climate",
		label: "Clima",
		dek: "Energía, tierra y las compañías que tratan la atmósfera como un brief."
	},
	{
		id: "culture",
		label: "Cultura",
		dek: "Moda, ciudades y las marcas independientes que reescriben el retail."
	}
];
var AUTHORS = [
	{
		id: "mira-solano",
		name: "Mira Solano",
		role: "Editora general",
		city: "Santiago",
		image: "/authors/mira-solano.jpg",
		bio: "Fundó We Are Vander en Lastarria. Escribe sobre compañías como si fueran sistemas: primero la tesis, después el mood."
	},
	{
		id: "jonah-peck",
		name: "Jonah Peck",
		role: "Columnista de trabajo",
		city: "Nueva York",
		image: "/authors/jonah-peck.jpg",
		bio: "Cubre el diseño del trabajo: calendarios, oficinas y la revuelta contra el mito de las 80 horas."
	},
	{
		id: "asha-veld",
		name: "Asha Veld",
		role: "Editora de diseño",
		city: "Londres",
		image: "/authors/asha-veld.jpg",
		bio: "Reporta productos físicos, cultura material y las empresas que todavía creen en los objetos."
	},
	{
		id: "rafael-quinn",
		name: "Rafael Quinn",
		role: "Mesa de clima",
		city: "Santiago",
		image: "/authors/rafael-quinn.jpg",
		bio: "Creció en el Atacama. Escribe energía como un problema de paisaje, capital y paciencia."
	},
	{
		id: "lina-cho",
		name: "Lina Cho",
		role: "Corresponsal de cultura",
		city: "Seúl / Santiago",
		image: "/authors/lina-cho.jpg",
		bio: "Se mueve entre fashion weeks y ferias de barrio. Cubre retail independiente y vida urbana."
	}
];
var ARTICLES = [
	{
		slug: "cult-of-the-analog-office",
		title: "El culto a la oficina analógica",
		dek: "Las compañías más interesantes de 2026 bajan el wifi a propósito. Dentro de la revuelta contra la pantalla encendida.",
		kicker: "Portada",
		section: "ideas",
		authorId: "mira-solano",
		publishedAt: "2026-08-12",
		readMinutes: 14,
		image: "/photos/analog-office.jpg",
		imageAlt: "Reunión de trabajo en una oficina contemporánea de Santiago",
		caption: "Estudio de Northroom en Santiago. El protocolo es el producto: la mesa, no el software.",
		featured: true,
		pullQuote: "No desinstalamos internet. Dejamos de dejarlo sentarse a la cabecera.",
		body: [
			{
				type: "p",
				text: "Un jueves en Lastarria, la oficina de Northroom huele a café y marcadores. Hay laptops, sí: cerradas, al fondo de una mesa de cuatro metros. No hay televisor, ni war-room de Slack, ni un monitor mirando a la puerta. Los fundadores de uno de los estudios de trabajo más observados de Latinoamérica hicieron una apuesta extraña. El futuro de la oficina, dicen, es analógico."
			},
			{
				type: "p",
				text: "Hace cinco años esto sonaba a newsletter de lifestyle. En 2026 es un P&L. Empresas que pasaron una década instrumentando cada conversación ahora pagan para desinstrumentarlas. Las canastas de teléfonos junto a la sala de reuniones funcionan como guardarropas. Una generación de operadores descubrió que una herramienta hecha para hacer visible el trabajo también lo hizo interminable — y que interminable no es lo mismo que producir."
			},
			{
				type: "quote",
				text: "No desinstalamos internet. Dejamos de dejarlo sentarse a la cabecera.",
				cite: "Camila Rojas, Northroom"
			},
			{
				type: "h2",
				text: "Wifi lento como feature"
			},
			{
				type: "p",
				text: "El producto de Northroom no es el mueble, aunque el mueble está bien. Es un protocolo. Clientes —un fondo climático en Vitacura, una marca en Brooklyn, un estudio de semiconductores en Seúl— compran una sala diseñada para que la interrupción digital sea levemente incómoda. El wifi se estrecha después de las 11. Las paredes son corcho y lino. Hay impresora, y se usa."
			},
			{
				type: "p",
				text: "“La gente cree que es nostalgia”, dice Camila Rojas, que cofundó la compañía después de una década en un unicornio de software que medía el ‘focus time’ en dashboards. “Es un problema de sistemas. Si la superficie por defecto de una sala es una pantalla, la sala se comporta como pantalla.”"
			},
			{
				type: "p",
				text: "Los números, cuando aparecen, son discretamente brutales. Northroom no publica valuación. Quienes han visto los libros hablan de lista de espera a dos años y un margen de servicios que pondría colorado a un consultora. Más interesante: tres clientes corporativos recortaron asientos de ‘software de colaboración’ en más de un tercio. El software no empeoró. Las reuniones se acortaron."
			},
			{
				type: "h2",
				text: "Para qué sirve lo analógico"
			},
			{
				type: "p",
				text: "Hay una versión de esta historia que termina en una máquina de escribir. No es esa. Lo analógico, en las compañías de este número, no es un disfraz. Es una restricción. Y las restricciones son cómo sobrevive el criterio cuando una empresa escala."
			},
			{
				type: "p",
				text: "Esa es la portada de este número, y el argumento debajo. El poder blando, en los negocios, solía significar marca. En 2026 significa atmósfera: la capacidad de hacer una cultura por la que alguien cruce la ciudad. We Are Vander. We Love Business. Amamos las compañías que rediseñaron la mesa."
			}
		]
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
		pullQuote: "El software escaló con atención. El clima va a escalar con paciencia — y la paciencia tiene geografía.",
		body: [
			{
				type: "p",
				text: "Desde el filo sobre el campo de Vesper Grid, el Atacama no parece una historia de tecnología. Parece un cultivo. Filas de vidrio oscuro corren hasta el horizonte y se detienen, como si alguien hubiera trazado una línea y el desierto hubiera aceptado. Un técnico en chaleco camina el pasillo. El viento es el único sonido que no viene de un generador."
			},
			{
				type: "p",
				text: "Durante veinte años el beat climático fue un beat de software con botas. Dashboards, offsets, un mercado para la virtud. Las compañías que importan ahora son aburridas de un modo que debería entusiasmarte. Vierten concreto. Firman offtakes a veinte años. Contratan gente que puede vivir en un pueblo sin WeWork."
			},
			{
				type: "quote",
				text: "El software escaló con atención. El clima va a escalar con paciencia — y la paciencia tiene geografía.",
				cite: "Elena Voss, Vesper Grid"
			},
			{
				type: "h2",
				text: "El desierto como escritorio"
			},
			{
				type: "p",
				text: "Vesper Grid, entre Santiago y un racimo de contenedores cerca de Calama, no es el mayor operador solar de Chile. Puede ser el más deliberado. Vende kilowatts-hora y un lenguaje para cómo un sitio energético encuentra un paisaje. “La infraestructura es cultura aunque no lo admitas”, dice la CEO Elena Voss. “Nosotros lo admitimos.”"
			},
			{
				type: "p",
				text: "El capital se dio cuenta, despacio, como se da cuenta de cualquier cosa que no se puede screenshoteear. Fondos de pensión, soberanos, family offices que antes compraban viñas. El múltiplo no es de software. No tiene que serlo. Lo que Vesper vende es una década de excelencia aburrida — y un punto de vista sobre quién se para en esta luz."
			},
			{
				type: "p",
				text: "La era del offset entrenó a una generación a tratar la atmósfera como planilla. Se acaba, no porque la matemática haya mejorado, sino porque el público aprendió a leer la nota al pie. La próxima década del clima será de las compañías que pueden quedarse en un lugar el tiempo suficiente para ser de ahí."
			}
		]
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
			{
				type: "p",
				text: "Lo primero que se nota en Atelier Common es el silencio de los racks. No hay drop de temporada ni un muro de denim idéntico. Las prendas cuelgan como libros de biblioteca: con la confianza de haber sido deseadas. Casi todo empezó como sobrante de otro: deadstock de mill, cápsulas sin vender, un rollo de lana que una casa en Lisboa no pudo usar."
			},
			{
				type: "p",
				text: "La moda independiente lleva tanto tiempo performando sostenibilidad que la palabra tiene el valor nutricional de una etiqueta. Lo que ocurre ahora es menos campaña que contabilidad. Un grupo de sellos —Atelier Common en Brooklyn, Casa Hilo en Providencia, Archive Monday en Seúl— convirtió el retazo en el brief entero. No una cápsula. La línea."
			},
			{
				type: "quote",
				text: "Dejamos de fingir que el mundo necesitaba otra polera virgen.",
				cite: "Jun Park, Archive Monday"
			},
			{
				type: "h2",
				text: "La restricción como código de casa"
			},
			{
				type: "p",
				text: "Trabajar solo con lo que ya existe suena romántico hasta que ves a una cortadora esperar seis semanas un segundo rollo que no va a llegar. El lenguaje que sobrevive a esa espera es específico: cuellos que migran entre telas, paletas de la misma familia que el año pasado, una silueta que absorbe la sorpresa."
			},
			{
				type: "p",
				text: "El modelo de negocio es igualmente infashionable. Tirajes chicos. Ventanas de reparación. Un escritorio de resale en la misma tienda. Márgenes que dependen de que la gente vuelva, no de un spike en TikTok. “No queremos ser una plataforma”, dice Nia Bell, de Atelier Common. “Queremos ser una tienda que todavía exista en 2036.”"
			}
		]
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
			{
				type: "p",
				text: "El founder de quince minutos no es flojo. Está editado. Dirige una compañía de textiles climáticos con 40 personas, un directorio que de verdad lee el paquete y un calendario que, de reojo, parece que vive alguien adentro. El retiro del colegio está. También un miércoles sin reuniones después de mediodía. También un hard stop que el equipo aprendió a tratar como la nómina: no negociable."
			},
			{
				type: "p",
				text: "Durante una década el mito del founder fue un folleto de duerme-cuando-estés-muerto. Produjo algunas compañías y muchos restos. Los operadores que suben ahora —sobre todo fuera del campo gravitacional de la Bahía— tienen otro objeto de estatus. No el grind. El cuarto que se guardaron para una vida."
			},
			{
				type: "quote",
				text: "Si tu compañía solo funciona cuando desapareces, no construiste una empresa. Construiste un santuario.",
				cite: "Iria Beltrán, Helio Thread"
			},
			{
				type: "h2",
				text: "El calendario como cultura"
			},
			{
				type: "p",
				text: "Iria Beltrán, de Helio Thread, imprime su semana el domingo y la pone en la pared del estudio. Cualquiera puede leerla. La transparencia es el punto. “La gente copia el calendario que ve”, dice. “Si el mío es un pánico, el de ellos será un pánico.” La facturación sube. El headcount no es vanidad. La compañía manda tela a tres continentes y cierra el atelier los viernes a las cuatro."
			},
			{
				type: "p",
				text: "Nada de esto es un perk de wellness. Es un sistema operativo. Contratan managers que sostienen una sala, escriben documentos que no necesitan una reunión para decodificarse, y despiden el software que convierte cada ping en un referéndum."
			}
		]
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
			{
				type: "p",
				text: "En una mesa en Hackney hay una lámpara que escucha, una cámara que todavía come película y un cuaderno cuyo papel sale de un mill que también abastece a una casa de moda. No es un mood board. Es la línea de Lumen Form, una compañía que mete IA en objetos que querrías aunque no hicieran nada inteligente. La inteligencia es invitada. El objeto es anfitrión."
			},
			{
				type: "p",
				text: "El último ciclo de diseño de producto de IA parecía una ventana de chat con distintas chaquetas. El que vale la pena escribir —el que viene— parece una lámpara. El gusto es la capa escasa. Cualquiera puede alquilar un modelo. Casi nadie decide cuánto debe pesar en la mano."
			},
			{
				type: "quote",
				text: "Un modelo sin material es solo una vibra con API.",
				cite: "Soren Hale, Lumen Form"
			},
			{
				type: "h2",
				text: "El objeto como brief"
			},
			{
				type: "p",
				text: "Los fundadores de Lumen Form vienen del mueble y el sonido, no de un lab. Hablan de latencia como un carpintero habla de la veta. La lámpara no muestra texto. Cambia temperatura y presencia cuando cambia el ritmo de una casa. Si eso es “IA” es pregunta para el comunicado. En la sala, es atmósfera."
			},
			{
				type: "p",
				text: "Cada era de computación termina avergonzada de su rectángulo y busca el mundo. Esta vez el gesto tiene gusto. No son anti-pantalla. Son post-pantalla. Asumen que el teléfono siempre estará, como una llave de agua. El trabajo es todo lo demás."
			}
		]
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
			{
				type: "p",
				text: "Las casas de moda siempre supieron algo que las empresas de software siguen pagándole a McKinsey para recordar: un punto de vista es un sistema operativo. No necesitas un afiche de valores si la colección ya es los valores. Un puñado de compañías fuera de la moda empezó a tomarlo en literal."
			},
			{
				type: "p",
				text: "Sombra Studio, que construye software espacial para arquitectos, corre en temporadas. Hay una colección. Hay un código de casa (nada de dark mode por defecto, ninguna ilustración de personas de espaldas, ningún feature que no se pueda explicar en la mesa). Cuando publican, publican un look: un set coherente de decisiones, no un montón de tickets que coincidieron en un trimestre."
			},
			{
				type: "quote",
				text: "Una casa tiene un código. Una compañía tiene un slide. Adivina cuál se recuerda.",
				cite: "Mira Solano"
			},
			{
				type: "h2",
				text: "Temporadas, no sprints"
			},
			{
				type: "p",
				text: "Los sprints fueron un invento humano que se volvió cinta. Las temporadas devuelven un ritmo que se siente en el cuerpo: un período de hacer, uno de mostrar, uno de descanso que no es culpa. Sombra, con 28 personas, saca cuatro colecciones al año. A los clientes, sorpresa, les gusta esperar. La escasez, cuando es honesta, es una forma de respeto."
			},
			{
				type: "p",
				text: "El modelo no escala a diez mil personas. Eso es un feature. Eligen un tamaño como un sastre elige un paño: por cómo se comporta, no por cómo se ve en un deck."
			}
		]
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
			{
				type: "p",
				text: "A las 19:40 la calle hace lo que las calles hacían antes de ser contenido. Una bici se cuela entre maceteros. Un almacenero prende una lámpara, después otra. Alguien lleva pan como si el pan todavía fuera un nudo de la trama. No es una postal de pueblo. Es una tesis de asignación de capital."
			},
			{
				type: "p",
				text: "Barrio Capital, fondo santiaguino con un segundo escritorio en Ciudad de México, solo invierte en negocios a los que se puede llegar caminando. Panaderías, talleres de reparación, un cine de tres butacas, una radio que todavía imprime la programación. Los cheques parecen errores de redondeo en Palo Alto. El retorno, medido en años que una calle se queda siendo ella, es el punto."
			},
			{
				type: "quote",
				text: "Escalar fue una religión. La parroquia es una calle.",
				cite: "Tomás Alarcón, Barrio Capital"
			},
			{
				type: "h2",
				text: "Venture caminable"
			},
			{
				type: "p",
				text: "A los socios les gusta decir que underwritean atmósfera. En realidad underwritean arriendo, nómina y el trabajo poco glamoroso de mantener una persiana abierta. Se niegan a roll-ups que reemplazarían un nombre pintado en ladrillo por un sans-serif. “Si profesionalizamos el alma”, dice Tomás Alarcón, “fallamos en la única métrica que nos importa.”"
			},
			{
				type: "p",
				text: "Hay un localismo que es cosplay para quien puede irse al campo. Esto no es eso. Las compañías del portafolio contratan en la cuadra, compran en la cuadra y —esto es lo radical en voz baja— precifican para la cuadra. Una ciudad que funciona no es un amenity. Es un mercado."
			}
		]
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
			{
				type: "p",
				text: "El pulgar sabe antes que el ojo. En una sala en Lisboa, Rafa Costa presiona el pulgar contra un cuerpo que será termostato, o radio, o algo que rechaza ambos nombres. La regla de Kinship Clay es simple: si no se siente caro con los ojos cerrados, no está listo."
			},
			{
				type: "p",
				text: "Después de quince años de vidrio, la industria redescubrió el peso. Cerámica, madera clara, aluminio cepillado que de verdad está cepillado. El riesgo es obvio: una inundación de objetos que parecen la idea que tiene un departamento de props de ‘tech artesanal’. La oportunidad es más interesante. Una generación de product people que solo diseñó rectángulos ahora tiene que aprender veta."
			},
			{
				type: "quote",
				text: "Si no se siente caro con los ojos cerrados, no está listo.",
				cite: "Rafa Costa, Kinship Clay"
			},
			{
				type: "h2",
				text: "Las manos como proceso de QA"
			},
			{
				type: "p",
				text: "Costa no envía una pieza que no hayan sostenido al menos doce personas que no trabajan en la compañía. Las notas son vergonzosas como todas las notas honestas: demasiado frío, demasiado cute, la costura engancha un anillo. Eso es research de usuario que no se hace en un laptop. También es lento, por eso tantos equipos lo van a saltar y después preguntarse por qué su objeto se siente como un render."
			}
		]
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
			{
				type: "p",
				text: "La noche, en una compañía global, es la mañana de otra persona. Esa frase lanzó mil Slacks y casi ninguna buena fiesta. Mesa Radio, medio independiente con mesas en Santiago, Seúl y Brooklyn, decidió que el handoff debía sentirse como el cierre de un bar, no como la apertura de un ticket. Al atardecer el equipo de Santiago camina a la terraza con Seúl en un parlante un poco demasiado alto. Hablan veinte minutos. Después Santiago se va a casa."
			},
			{
				type: "p",
				text: "La compañía 24 horas suele venderse como ventaja competitiva. A menudo es solo la incapacidad de parar. Los estudios que lo hacen bien ritualizaron la costura. Una campana. Un handoff escrito que se permite ser prosa. Una regla: si la pregunta nocturna no está en llamas, espera a que el sol esté en el país correcto."
			},
			{
				type: "quote",
				text: "No necesitamos más horas. Necesitamos una costura más limpia entre ellas.",
				cite: "Sofía Rivas, Mesa Radio"
			},
			{
				type: "p",
				text: "Rivas, editora de Mesa, escribe la nota de noche ella misma tres veces por semana. Es el documento más leído de la compañía, no porque sea obligatorio, sino porque es bueno. “Si la costura es fea, la noche será fea. La gente siente un documento.” Es una frase de editora. También es una frase de operaciones."
			}
		]
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
			{
				type: "p",
				text: "Oro Verde no se deja fotografiar para esta nota, que es cómo supimos que teníamos la nota correcta. La compañía de agricultura regenerativa abastece restaurantes de Valparaíso a Lima, emplea a 200 personas y nunca emitió un comunicado. El fundador, que pidió no ser nombrado porque “los nombres se vuelven contenido”, nos recibió en una sala con una mesa, dos tazas y una regla: nada de teléfonos sobre la madera."
			},
			{
				type: "p",
				text: "El silencio, en 2026, es un flex. También es una ventaja operativa. Las compañías calladas de nuestra libreta —un mill textil, un fabricante de componentes, un vino familiar que ahora vende datos de suelo— gastan marketing en el producto y el sistema nervioso del founder en el trabajo. No son tímidas. Están editadas."
			},
			{
				type: "quote",
				text: "La atención es un centro de costo. Corríamos los números.",
				cite: "Un founder que declinó el retrato"
			},
			{
				type: "h2",
				text: "Componer fuera de escena"
			},
			{
				type: "p",
				text: "Sin un feed que alimentar, estas compañías deciden en otro reloj. Pueden ser aburridas un trimestre. Pueden decirle que no a un cliente. Pueden dejar que un rumor se siente. En un entorno mediático que trata a cada empresa como personaje, rechazar el rol es una forma de poder: blanda, otra vez, y carísima de fingir."
			}
		]
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
		pullQuote: "No somos el próximo Silicon Valley. Esa es exactamente la ventaja.",
		body: [
			{
				type: "p",
				text: "Santiago nunca pidió ser un hub. Lo cual, en 2026, es precisamente por qué lo es. Fondos que hace cinco años solo aterrizaban en Miami ahora tienen llave en Providencia. Operadores que se cansaron del costo de San Francisco descubrieron una ciudad cara a escala local y barata a escala global, con fibra, Andes de fondo y una zona horaria que cubre Nueva York de mañana y Seúl de noche."
			},
			{
				type: "p",
				text: "La tesis no es turismo de founders. Es infraestructura: energía, talento de ingeniería, un mercado de consumo que prueba rápido y un Estado que, a trompicones, aprendió a hablar de litio y datos sin sonrojarse. “No somos el próximo Silicon Valley”, dice una GP que pidió no ser citada. “Esa es exactamente la ventaja.”"
			},
			{
				type: "quote",
				text: "No somos el próximo Silicon Valley. Esa es exactamente la ventaja.",
				cite: "Una GP en Providencia"
			},
			{
				type: "p",
				text: "We Are Vander nació aquí por una razón: esta ciudad trata los negocios como oficio, no como contenido. We Love Business. El resto es la mesa."
			}
		]
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
			{
				type: "p",
				text: "En tres directorios que visitamos este mes, el paquete llega con un anexo generado por modelo: riesgos, preguntas, un párrafo de “lo que el management no está diciendo”. Útil. También un nuevo riesgo: boards que confunden un buen resumen con haber leído. La IA no robó el asiento. Robó la preparación, que era la única prueba de que alguien había hecho el trabajo."
			},
			{
				type: "p",
				text: "Los boards que lo están haciendo bien usan el modelo como pasante brillante y mudo. Resume, no recomienda. Señala omisiones, no estrategia. “Si el modelo escribe el acta”, dice una directora en São Paulo, “alguien todavía tiene que haber estado en la sala.”"
			},
			{
				type: "quote",
				text: "Si el modelo escribe el acta, alguien todavía tiene que haber estado en la sala.",
				cite: "Una directora en São Paulo"
			},
			{
				type: "p",
				text: "We Love Business, no el autopiloto. La herramienta que comprime un paquete de 80 páginas no reemplaza a la persona que puede decir que no en la página 12."
			}
		]
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
			{
				type: "p",
				text: "El capital paciente nunca se fue. Solo se quedó callado mientras el capital impaciente hacía más ruido. Ahora el ruido se apagó y aparecen los cheques de 15 años: pensiones, soberanos, family offices que entendieron que el clima no es una ronda, es un offtake. Vesper Grid, Lumen Tide, Helio Thread — ninguna pide un múltiplo de SaaS. Piden tiempo."
			},
			{
				type: "p",
				text: "“Si tu tesis cabe en un trimestre, no es una tesis. Es una ronda”, dice un allocator en Nueva York que ahora vuela a Calama una vez por trimestre. El slide sigue durando veinte minutos. El contrato, veinte años. Esa asimetría es el negocio."
			},
			{
				type: "quote",
				text: "Si tu tesis cabe en un trimestre, no es una tesis. Es una ronda.",
				cite: "Un allocator en Nueva York"
			}
		]
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
			{
				type: "p",
				text: "El retail independiente descubrió, tarde, que alquilar atención a un feed es un arriendo que sube solo. Archive Monday cerró su cuenta más grande el año pasado y abrió una segunda tienda. Las ventas no cayeron. Cayeron los picos; subió el piso. “El algoritmo nos alquilaría atención”, dice Jun Park. “La tienda nos vende criterio.”"
			},
			{
				type: "p",
				text: "No es un regreso romántico al ladrillo. Es una corrección de costos. El piso es caro, sí. El feed, al final, también: descuentos, devoluciones, un cliente que no vuelve. Las marcas de este número están eligiendo el costo que deja un local con nombre en la puerta."
			},
			{
				type: "quote",
				text: "El algoritmo nos alquilaría atención. La tienda nos vende criterio.",
				cite: "Jun Park, Archive Monday"
			}
		]
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
			{
				type: "p",
				text: "Cuando Northroom apagó Slack, el primer mes fue pánico. El segundo, silencio. El tercero, un CFO pidió el número: horas recuperadas, tickets que nunca se abrieron, reuniones que volvieron a caber en 25 minutos. El software era barato. El impuesto, no."
			},
			{
				type: "quote",
				text: "El chat no era colaboración. Era un impuesto a la atención.",
				cite: "Camila Rojas, Northroom"
			},
			{
				type: "p",
				text: "No es un manifiesto ludita. Es un asiento contable. Las compañías de este número que cortaron el canal siempre abierto no perdieron velocidad. Perdieron teatro. We Love Business, no el ping."
			}
		]
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
			{
				type: "p",
				text: "La junta de dieciocho minutos no es un truco de productividad. Es una tesis: si el management no puede plantear la decisión en ese tiempo, la decisión no está lista. Un board en Vitacura lo volvió reglamento. El paquete bajó de 80 páginas a 12. El anexo de modelo, afuera."
			},
			{
				type: "quote",
				text: "Si no cabe en dieciocho minutos, no era una decisión. Era un tour.",
				cite: "Una directora en Vitacura"
			},
			{
				type: "p",
				text: "Los boards que se enamoraron del paquete infinito confundieron volumen con diligencia. El criterio cabe en una carpeta. El resto es teatro para el minute."
			}
		]
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
			{
				type: "p",
				text: "Nero Paper, mill en Portland que abastece cuadernos y una casa de moda en Seúl, no acepta pedidos urgentes. Hay cuatro ventanas al año. Quien llega tarde espera la siguiente. Las casas que se quedaron —Atelier Common, Archive Monday, un estudio de arquitectura en Oaxaca— dicen que el lead time les mejoró el diseño: menos drops, más criterio."
			},
			{
				type: "quote",
				text: "Si puedes tenerlo mañana, no lo querías. Lo pediste.",
				cite: "La gerenta de planta de Nero Paper"
			},
			{
				type: "p",
				text: "La urgencia era un hábito de software aplicado a la materia. El mill lo rechazó. El P&L, contra el instinto de todo growth deck, subió."
			}
		]
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
			{
				type: "p",
				text: "Cada lunes, Mesa Radio pega un A4 en la puerta del estudio. Horarios, nombres, un dibujo malo. La gente del barrio se para a leerlo. El stream existe. El papel es el contrato: si está impreso, se cumple. “Si no cabe en un A4, no era una programación. Era un feed”, dice Sofía Rivas."
			},
			{
				type: "quote",
				text: "Si no cabe en un A4, no era una programación. Era un feed.",
				cite: "Sofía Rivas, Mesa Radio"
			},
			{
				type: "p",
				text: "Barrio Capital metió un cheque chico precisamente por eso. No por el audio. Por la puerta."
			}
		]
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
			{
				type: "p",
				text: "Rafa Costa no filma unboxings. Kinship Clay vende un termostato de cerámica que pesa de más a propósito. El empaque es cartón y una nota. No hay foam con forma, ni un lazo, ni un momento para cámara. “Si el objeto necesita un reel para convencer, el objeto no está listo.”"
			},
			{
				type: "quote",
				text: "Si el objeto necesita un reel para convencer, el objeto no está listo.",
				cite: "Rafa Costa, Kinship Clay"
			},
			{
				type: "p",
				text: "En un ciclo de producto diseñado para los primeros quince segundos, negarse al unboxing es una estrategia de retención: el cliente que se queda es el que tocó la pieza, no el que la vio."
			}
		]
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
			{
				type: "p",
				text: "Casa Hilo mide tres metros de frente. Antes era una tintorería. Ahora es una línea, un escritorio de reparación y un perchero que no se llena a propósito. Nia Bell, que también trabaja con Atelier Common, dice que el tamaño es el brief: si no cabe, no entra a la temporada."
			},
			{
				type: "quote",
				text: "No necesitamos un flagship. Necesitamos una persiana que se abra mañana.",
				cite: "El equipo de Casa Hilo"
			},
			{
				type: "p",
				text: "El retail independiente está descubriendo que el metro cuadrado chico no es un problema de real estate. Es un filtro de criterio. We Are Vander. We Love Business. Amamos las persiana que se abren."
			}
		]
	}
];
function getSectionLabel(id) {
	return SECTIONS.find((s) => s.id === id)?.label ?? id;
}
function getAuthor(id) {
	return AUTHORS.find((a) => a.id === id);
}
function getArticle(slug) {
	return ARTICLES.find((a) => a.slug === slug);
}
function articlesBySection(section) {
	return ARTICLES.filter((a) => a.section === section).sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
}
function relatedArticles(slug, limit = 3) {
	const current = getArticle(slug);
	if (!current) return ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
	const same = ARTICLES.filter((a) => a.slug !== slug && a.section === current.section);
	const rest = ARTICLES.filter((a) => a.slug !== slug && a.section !== current.section);
	return [...same, ...rest].slice(0, limit);
}
function searchArticles(q) {
	const needle = q.trim().toLowerCase();
	if (!needle) return ARTICLES;
	return ARTICLES.filter((a) => {
		const author = getAuthor(a.authorId);
		return [
			a.title,
			a.dek,
			a.kicker,
			a.section,
			author?.name ?? "",
			...a.body.map((b) => b.text)
		].join(" ").toLowerCase().includes(needle);
	});
}
function formatIssueDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return `${d} de ${[
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre"
	][(m ?? 1) - 1]} de ${y}`;
}
function latestArticles(limit = 8) {
	return [...ARTICLES].sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1).slice(0, limit);
}
var BRIEFS = [
	{
		id: "b1",
		time: "08:14",
		section: "ideas",
		slug: "cult-of-the-analog-office",
		title: "Northroom cierra ronda sin deck: lista de espera a 24 meses."
	},
	{
		id: "b2",
		time: "07:41",
		section: "climate",
		slug: "who-owns-climate",
		title: "Vesper Grid firma offtake a 20 años con un soberano europeo."
	},
	{
		id: "b3",
		time: "07:05",
		section: "work",
		slug: "fifteen-minute-founder",
		title: "Helio Thread publica el calendario de su CEO. Viernes, cierre a las 16:00."
	},
	{
		id: "b4",
		time: "06:52",
		section: "design",
		slug: "machines-with-taste",
		title: "Lumen Form deja el chat. El próximo producto no tiene pantalla."
	},
	{
		id: "b5",
		time: "Ayer",
		section: "culture",
		slug: "retail-algoritmo",
		title: "Archive Monday abre segunda tienda y cierra su cuenta más grande."
	},
	{
		id: "b6",
		time: "Ayer",
		section: "ideas",
		slug: "santiago-hub",
		title: "Tres fondos de Miami abren llave en Providencia este trimestre."
	},
	{
		id: "b7",
		time: "Ayer",
		section: "work",
		slug: "ia-en-la-junta",
		title: "Un board en Vitacura vota sin anexo de modelo. El paquete volvió a 40 páginas."
	},
	{
		id: "b8",
		time: "18 ago",
		section: "climate",
		slug: "capital-paciente",
		title: "Lumen Tide abre sendero de visita en Puerto Montt. Casco opcional."
	},
	{
		id: "b9",
		time: "17 ago",
		section: "culture",
		slug: "return-of-the-local",
		title: "Barrio Capital invierte en un cine de tres butacas en Lastarria."
	},
	{
		id: "b10",
		time: "16 ago",
		section: "design",
		slug: "design-after-screens",
		title: "Kinship Clay descarta un prototipo porque “se sentía cute”."
	}
];
var POPULAR_SLUGS = [
	"cult-of-the-analog-office",
	"who-owns-climate",
	"santiago-hub",
	"fifteen-minute-founder",
	"ia-en-la-junta"
];
function popularArticles(limit = 5) {
	return POPULAR_SLUGS.map((slug) => getArticle(slug)).filter((a) => a != null).slice(0, limit);
}
function leadBySection() {
	return SECTIONS.map((s) => articlesBySection(s.id)[0]).filter((a) => a != null);
}
function formatShortDate(iso) {
	const [, m, d] = iso.split("-").map(Number);
	return `${d} ${[
		"ene",
		"feb",
		"mar",
		"abr",
		"may",
		"jun",
		"jul",
		"ago",
		"sep",
		"oct",
		"nov",
		"dic"
	][(m ?? 1) - 1]}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-DZ7NZd4-.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled (default) -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DC-BlURD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker text-xs text-rust",
				children: "Error"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold uppercase",
				children: "Algo se cortó en edición."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md font-body text-sm text-muted break-words",
				children: error.message || "Ocurrió un error. Recarga la página."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "kicker text-xs text-ink underline decoration-rust",
				children: "Volver al número"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* Auth is ON by default (including the sandbox live preview, which does real
* sign-in). Visitors are signed out until they authenticate. The shared dev
* user only appears when auth is explicitly disabled (`VITE_AUTH_ENABLED=false`).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Cuenta";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void signOut(),
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline",
				children: "Salir"
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function SiteChrome({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const ticker = BRIEFS.slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-ink text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center lg:hidden",
						"aria-label": open ? "Cerrar menú" : "Abrir menú",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-6",
							strokeWidth: 1.75
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
							className: "size-6",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xl font-extrabold tracking-tight uppercase sm:text-3xl",
							children: "We Are Vander"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-kicker text-xs tracking-widest text-rust uppercase",
							children: "We Love Business"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#boletin",
							className: "kicker hidden h-11 items-center bg-rust px-4 text-xs text-paper hover:opacity-90 sm:inline-flex",
							children: "Suscribirse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							"aria-label": "Buscar",
							className: "grid size-11 place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "size-5",
								strokeWidth: 1.75
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "hidden border-b border-ink bg-paper lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-6 py-2",
				children: [
					SECTIONS.map((s) => {
						const href = `/section/${s.id}`;
						const active = pathname === href || pathname.startsWith(`${href}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/section/$section",
							params: { section: s.id },
							className: cn("kicker whitespace-nowrap text-xs text-ink hover:text-rust", active && "text-rust"),
							children: s.label
						}) }, s.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/list",
						className: cn("kicker text-xs text-ink hover:text-rust", pathname === "/list" && "text-rust"),
						children: "La Lista"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/briefing",
						className: "kicker text-xs text-ink hover:text-rust",
						children: "Briefing"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "kicker text-xs text-ink hover:text-rust",
						children: "Redacción"
					}) })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-rule bg-paper-deep",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl gap-4 overflow-hidden px-4 py-1.5 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "kicker shrink-0 text-xs text-rust",
					children: "Al minuto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate font-display text-xs font-medium sm:text-sm",
					children: [
						ISSUE.date,
						" · ",
						ticker.map((b) => `${b.time} ${b.title}`).join("  ·  ")
					]
				})]
			})
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-b border-ink bg-paper px-4 py-4 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col",
				children: [
					SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/section/$section",
							params: { section: s.id },
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase",
							children: s.label
						})
					}, s.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/list",
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase",
							children: "La Lista"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/briefing",
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase",
							children: "Briefing"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase",
							children: "Redacción"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/saved",
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase",
							children: "Guardados"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase",
							children: "Entrar"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#boletin",
						onClick: () => setOpen(false),
						className: "flex min-h-12 items-center font-display text-xl font-extrabold uppercase text-rust",
						children: "Suscribirse"
					}) })
				]
			})
		})
	] });
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-16 animate-pulse bg-paper/20" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hidden items-center gap-3 sm:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/saved",
			className: "kicker text-xs text-paper hover:text-rust",
			children: "Guardados"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-kicker text-xs text-paper [&_button]:text-paper [&_span]:text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "kicker hidden text-xs text-paper hover:text-rust sm:inline",
		children: "Entrar"
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-ink bg-ink px-4 py-10 text-paper sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-extrabold tracking-tight uppercase",
					children: "We Are Vander"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 kicker text-xs text-rust",
					children: "We Love Business"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm font-body text-sm leading-relaxed text-paper/70",
					children: "Medio de innovación empresarial, escrito desde Santiago. Negro, blanco, negocios. El criterio es el producto."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-10 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs text-paper/50",
						children: "Secciones"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 font-display text-sm",
						children: [SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/section/$section",
							params: { section: s.id },
							className: "hover:text-rust",
							children: s.label
						}) }, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/list",
							className: "hover:text-rust",
							children: "Vander 20"
						}) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-xs text-paper/50",
						children: "La casa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 font-display text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "hover:text-rust",
								children: "Redacción"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/briefing",
								className: "hover:text-rust",
								children: "Briefing"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/saved",
								className: "hover:text-rust",
								children: "Guardados"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "hover:text-rust",
								children: "Entrar"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 sm:col-span-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "kicker text-xs text-paper/50",
								children: "Este número"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-lg font-extrabold",
								children: ISSUE.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-sm text-paper/60",
								children: [
									"Vol. ",
									ISSUE.volume,
									" Nº ",
									ISSUE.number,
									" · ",
									ISSUE.date
								]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto mt-10 max-w-7xl kicker text-xs text-paper/40",
			children: [
				"© ",
				ISSUE.date.split(" ").at(-1),
				" We Are Vander. ",
				ISSUE.desks.join(" · "),
				"."
			]
		})]
	});
}
var styles_default = "/assets/styles-BsZDGqW6.css";
var APP_NAME = "We Are Vander";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "We Are Vander. We Love Business. Revista de innovación empresarial — escrita desde Santiago."
			},
			{
				name: "theme-color",
				content: "#111111"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	errorComponent: AppErrorComponent,
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-paper text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-CdUtHGAe.mjs");
var Route$9 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "We Are Vander — We Love Business" }] })
});
var $$splitComponentImporter$6 = () => import("./about-DkcHD-22.mjs");
var Route$8 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Redacción — We Are Vander" }] })
});
var $$splitComponentImporter$5 = () => import("./briefing-AOpxNuK8.mjs");
var Route$7 = createFileRoute("/briefing")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Briefing — We Are Vander" }] })
});
var VANDER_LIST = [
	{
		rank: 1,
		name: "Northroom",
		sector: "Trabajo",
		city: "Santiago",
		blurb: "Oficinas como protocolos. Wifi lento, mesas largas y una lista de espera que convirtió lo analógico en línea de P&L."
	},
	{
		rank: 2,
		name: "Vesper Grid",
		sector: "Energía",
		city: "Calama",
		blurb: "Solar que trata el Atacama como paisaje, no como vacío. Infraestructura con código de casa."
	},
	{
		rank: 3,
		name: "Helio Thread",
		sector: "Clima / Textil",
		city: "Valparaíso",
		blurb: "Tela hecha de calor residual y paciencia. La bandera del founder de quince minutos."
	},
	{
		rank: 4,
		name: "Lumen Form",
		sector: "Diseño",
		city: "Londres",
		blurb: "IA que vive en cerámica y bronce. Gana la mesa, no la ventana de chat."
	},
	{
		rank: 5,
		name: "Atelier Common",
		sector: "Moda",
		city: "Brooklyn",
		blurb: "Deadstock como línea entera. Una tienda que pretende existir en 2036."
	},
	{
		rank: 6,
		name: "Barrio Capital",
		sector: "Venture",
		city: "Santiago",
		blurb: "Un fondo que solo invierte en lo que se camina. Escalar, degradado."
	},
	{
		rank: 7,
		name: "Sombra Studio",
		sector: "Software",
		city: "Ciudad de México",
		blurb: "Herramientas espaciales publicadas por temporadas, como una colección."
	},
	{
		rank: 8,
		name: "Kinship Clay",
		sector: "Producto",
		city: "Lisboa",
		blurb: "Termostatos y radios que querrías con los ojos cerrados."
	},
	{
		rank: 9,
		name: "Mesa Radio",
		sector: "Medios",
		city: "Santiago",
		blurb: "Audio independiente con campana de cierre. La noche como departamento."
	},
	{
		rank: 10,
		name: "Oro Verde",
		sector: "Tierra",
		city: "Colchagua",
		blurb: "Supply regenerativo que rechazó a nuestro fotógrafo. Silencio como estrategia."
	},
	{
		rank: 11,
		name: "Archive Monday",
		sector: "Moda",
		city: "Seúl",
		blurb: "Una casa que solo corta lo que ya existe. La restricción como marca."
	},
	{
		rank: 12,
		name: "Casa Hilo",
		sector: "Moda",
		city: "Providencia",
		blurb: "Ventanas de reparación, tirajes chicos, resale al lado de lo nuevo."
	},
	{
		rank: 13,
		name: "Nero Paper",
		sector: "Materiales",
		city: "Portland",
		blurb: "Mill que abastece cuadernos y casas de moda. El papel como infraestructura."
	},
	{
		rank: 14,
		name: "Tercer Turno",
		sector: "Logística",
		city: "Lima",
		blurb: "Logística nocturna con handoff escrito en prosa. La costura es el producto."
	},
	{
		rank: 15,
		name: "Glass Orchard",
		sector: "Alimentos",
		city: "Mendoza",
		blurb: "Invernaderos diseñados como capillas. Produce con lighting designer en staff."
	},
	{
		rank: 16,
		name: "Kite Ledger",
		sector: "Finanzas",
		city: "Nueva York",
		blurb: "Banco para tiendas independientes que todavía imprime estados en papel crema."
	},
	{
		rank: 17,
		name: "Silo Voice",
		sector: "Audio",
		city: "Kioto",
		blurb: "Radios que resumen el día con una voz que elegiste. Post-pantalla, a propósito."
	},
	{
		rank: 18,
		name: "Cuatro Paredes",
		sector: "Arquitectura",
		city: "Oaxaca",
		blurb: "Vivienda como práctica material. Tierra, cal y un no al cubo blanco."
	},
	{
		rank: 19,
		name: "Fieldnote",
		sector: "Software",
		city: "Copenhague",
		blurb: "Una app de notas que imprime. El objeto digital favorito de la oficina analógica."
	},
	{
		rank: 20,
		name: "Lumen Tide",
		sector: "Energía",
		city: "Puerto Montt",
		blurb: "Energía de mareas con un sendero de visita. Infraestructura que se camina sin casco."
	}
];
var Route$6 = createFileRoute("/list")({
	component: ListPage,
	head: () => ({ meta: [{ title: "Vander 20 — We Are Vander" }] })
});
function ListPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "kicker text-xs text-rust",
					children: ["Ranking Nº ", ISSUE.number]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl font-extrabold tracking-tight uppercase sm:text-7xl",
					children: "Vander 20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-2xl font-body text-lg leading-snug text-ink-soft",
					children: [
						"Las compañías que reescriben cómo se siente un negocio — no las más ruidosas, las que tienen código de casa. ",
						ISSUE.title,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8",
					children: VANDER_LIST.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-12 gap-3 border-t border-rule py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-span-2 font-display text-3xl font-extrabold text-rust sm:text-4xl",
							children: String(c.rank).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-extrabold uppercase sm:text-2xl",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "kicker text-xs text-muted",
									children: [
										c.sector,
										" · ",
										c.city
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-base",
								children: c.blurb
							})]
						})]
					}, c.rank))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 font-display text-sm text-muted",
					children: [
						"¿Quieres el argumento detrás de un nombre?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/briefing",
							className: "text-ink underline decoration-rust",
							children: "Pide un briefing"
						}),
						"."
					]
				})
			]
		})
	});
}
var $$splitComponentImporter$4 = () => import("./login-BzlefJjq.mjs");
var Route$5 = createFileRoute("/login")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Entrar — We Are Vander" }] })
});
var $$splitComponentImporter$3 = () => import("./saved-CKPl_Q0e.mjs");
var Route$4 = createFileRoute("/saved")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Guardados — We Are Vander" }] })
});
var $$splitComponentImporter$2 = () => import("./search-BfzHueX-.mjs");
var Route$3 = createFileRoute("/search")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Buscar — We Are Vander" }] })
});
var $$splitComponentImporter$1 = () => import("../_section-C1Ib7rAG.mjs");
var Route$2 = createFileRoute("/section/$section")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ params }) => {
		const meta = SECTIONS.find((s) => s.id === params.section);
		return { meta: [{ title: meta ? `${meta.label} — We Are Vander` : "Sección — We Are Vander" }] };
	}
});
var $$splitComponentImporter = () => import("../_slug-Ch-hesK3.mjs");
var Route$1 = createFileRoute("/story/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ params }) => {
		const article = getArticle(params.slug);
		return { meta: [{ title: article ? `${article.title} — We Are Vander` : "Historia — We Are Vander" }] };
	}
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	AboutRoute: Route$8.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$10
	}),
	BriefingRoute: Route$7.update({
		id: "/briefing",
		path: "/briefing",
		getParentRoute: () => Route$10
	}),
	ListRoute: Route$6.update({
		id: "/list",
		path: "/list",
		getParentRoute: () => Route$10
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$10
	}),
	SavedRoute: Route$4.update({
		id: "/saved",
		path: "/saved",
		getParentRoute: () => Route$10
	}),
	SearchRoute: Route$3.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$10
	}),
	SectionSectionRoute: Route$2.update({
		id: "/section/$section",
		path: "/section/$section",
		getParentRoute: () => Route$10
	}),
	StorySlugRoute: Route$1.update({
		id: "/story/$slug",
		path: "/story/$slug",
		getParentRoute: () => Route$10
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { searchArticles as C, relatedArticles as S, getAuthor as _, cn as a, leadBySection as b, ARTICLES as c, ISSUE as d, SECTIONS as f, getArticle as g, formatShortDate as h, VANDER_LIST as i, AUTHORS as l, formatIssueDate as m, Route$1 as n, RedirectToSignIn as o, articlesBySection as p, Route$2 as r, useCurrentUserState as s, router_exports as t, BRIEFS as u, getSectionLabel as v, popularArticles as x, latestArticles as y };
