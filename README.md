# We Are Vander

Portal de innovación empresarial para América Latina. Un medio de Interadia.

**En vivo:** [wearevanderlatam.vercel.app](https://wearevanderlatam.vercel.app)

Franquicias: Vander 20 · 50 Innovatives · Signals by Vander · Contra la corriente.

HilltopAds verifica `/54aa2f4cf4f47f587705.txt` y el meta tag en el `<head>`.

## El banco editorial

Las 51 notas viven en `src/lib/melimafia.ts`, `agosto.ts`, `fondo.ts` y `fondo2.ts`, y se unen en
`ARTICLES` dentro de `src/lib/content.ts`. Se guardan en la forma del contrato de la red
(`WiwoSiteArticle` de `@wiwo/contract`) y no en un modelo propio: es la misma nota que el sitio
dibuja y que le entrega al orquestador, así que no hace falta traducirla de ida y de vuelta. Lo
propio de la casa —kicker, epígrafe, ciudad, ritmo, franquicia, cita destacada, formato y los
campos sociales— viaja en `extra`, y se lee con los accesores de `src/lib/content.ts`
(`articleKicker`, `articleCaption`, `articleCity`…), nunca a mano.

Los rankings **no** son parte del banco: el Vander 20, las 50 Innovatives y los tres volúmenes de
100V Visionarios siguen con su tipo propio en `src/lib/vander-list.ts`, `innovatives.ts`,
`under40.ts` y `visionarios.ts`. Cada uno tiene un `rank` denso y sin huecos, y publicar una ficha
nueva desde afuera obligaría a renumerar todas las demás: no son notas y no pasan por el contrato.

## wiwo.doom

Este sitio habla el contrato de la red wiwo, que vive entero en el paquete `@wiwo/contract`
(instalado por etiqueta de git, `#v1.4.0`). El orquestador no adivina qué es esto: pregunta.

Son cuatro rutas bajo `src/routes/api/wiwo/v1/`, y las cuatro son tres líneas cada una:

| Ruta | Qué hace |
| --- | --- |
| `GET /api/wiwo/v1/manifest` | Qué es este sitio, qué campos pide y cuántas notas tiene. |
| `GET · POST /api/wiwo/v1/articles` | Entrega el archivo paginado (`?since=`, `?limit`, `?cursor`) y recibe lo que se publica. |
| `POST /api/wiwo/v1/media` | Recibe la imagen de una nota. Pide la misma clave que publicar. |
| `GET /api/wiwo/v1/media/:id` | Sirve esa imagen. No pide clave: la foto de una nota la ve quien lee la nota. |

Lo único propio del sitio es `src/lib/wiwo/`: `manifest.ts` declara los campos que We Are Vander
exige —con la pista de la imagen, que es el estilo con el que el orquestador la genera— y `site.ts`
dice dónde guarda, qué archivo tiene y cómo son sus URLs. La paginación, la validación, la
autenticación y las fechas viven en el paquete y son idénticas en todos los sitios de la red.

Las notas del repositorio y las que publica el orquestador se juntan en `src/lib/articles.ts`, y las
vistas leen de ahí. `unir()` respeta el orden escrito del archivo porque ese orden **es** la portada:
con la base vacía el sitio se ve exactamente igual que antes. Una nota corregida desde el
orquestador reemplaza a la suya en su lugar; una nota nueva va al principio.

### Qué quedó fuera, y por qué

- **Los rankings.** Vander 20, 50 Innovatives, 100V Visionarios y Under 40 tienen `rank` denso y sin
  huecos: publicar una ficha desde afuera obligaría a renumerar las demás. No son notas.
- **La tapa y el orden del número.** El manifest no declara `featured` ni `rank`, así que una nota
  publicada desde el orquestador entra al número pero no se pone en la portada sola. La curaduría
  sigue siendo de la casa.
- **El mobiliario del sitio:** el briefing de titulares, las notas más leídas, las tablas de El
  Índice, la barra de mercados y las fichas de las firmas. Son constantes del repositorio, no notas
  con cuerpo, y ninguna pasa por el contrato.
- **El borrado.** El contrato no tiene `DELETE`: despublicar no es una operación del protocolo.
- **El campo `format`.** Está declarado y hoy ninguna de las 51 notas del archivo lo trae, así que
  los lugares de portada reservados a la entrevista, el flash, el visual y el obituario están
  vacíos a la espera de que el orquestador empiece a llenarlos.

### Lo que hace falta para publicar

1. `WIWO_WRITE_TOKEN` en el entorno del sitio, y **la misma clave** cargada en doom en la página
   conectada. Sin ella el endpoint de escritura existe pero rechaza todo, y el manifest anuncia
   `write:false`, así que el orquestador no ofrece este destino.
2. `DATABASE_URL`. Sin base el sitio arranca igual, pero sobre una PGLite en memoria: todo lo que se
   publique y todas las imágenes que se suban se pierden en cada despliegue y en cada reinicio del
   servidor de desarrollo. El manifest anuncia `write:true` igual —solo mira la clave—, así que la
   publicación "funciona" hasta que desaparece.

Las migraciones `0005_wiwo_articles.sql` y `0006_wiwo_media.sql` se aplican solas en el `build`
(`npm run build` corre `db:migrate`). Un despliegue viejo que nunca vuelva a construirse no tiene
las tablas, y el `POST` falla.
