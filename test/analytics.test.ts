import assert from "node:assert/strict";
import test from "node:test";
import { scriptsDeAnalitica, tipoDePagina } from "../src/lib/analytics.ts";

/**
 * Responsabilidad: fijar que el sitio no emite medición salvo con una propiedad
 * de GA4 bien formada, que cuando la emite lo hace en el orden que gtag exige, y
 * que NO deja que gtag cuente la vista por su cuenta.
 * Usado por: `npm test`.
 * Vive fuera de `src/` porque tsconfig compila esa carpeta y ahi un import con
 * extension .ts no esta permitido, mientras que Node la exige para resolverlo.
 * NO hace: no carga Vite ni el entorno; la propiedad se pasa por parámetro.
 *
 * Existe por el fallo silencioso: una variable mal pegada —con comillas, con un
 * espacio, con el nombre de la variable adentro— produce un script que carga sin
 * error y no mide nada, y eso no se descubre hasta que alguien abre el informe
 * una semana después y lo encuentra vacío.
 */

test("sin propiedad no se emite ningún script", () => {
  assert.deepEqual(scriptsDeAnalitica(""), []);
  assert.deepEqual(scriptsDeAnalitica("   "), []);
});

test("una propiedad mal pegada tampoco emite nada", () => {
  for (const roto of [
    '"G-108JF25LF1"',
    "VITE_GA_MEASUREMENT_ID=G-108JF25LF1",
    "G-108JF25LF1 extra",
    "UA-12345-1",
    "GTM-ABC123",
    "G-",
  ]) {
    assert.deepEqual(scriptsDeAnalitica(roto), [], `debería rechazar ${roto}`);
  }
});

test("con una propiedad válida emite el archivo y el arranque, en ese orden", () => {
  const scripts = scriptsDeAnalitica("G-108JF25LF1");

  assert.equal(scripts.length, 2);
  // El archivo primero y el arranque después es el orden de Google, y no es
  // cosmético: gtag() encola las llamadas y gtag.js las consume al llegar.
  assert.equal(
    scripts[0].src,
    "https://www.googletagmanager.com/gtag/js?id=G-108JF25LF1",
  );
  assert.equal(scripts[0].async, true);
  assert.match(scripts[1].children ?? "", /gtag\('config', 'G-108JF25LF1'/);
  assert.match(scripts[1].children ?? "", /dataLayer/);
});

test("le saca los espacios a la propiedad antes de usarla", () => {
  const scripts = scriptsDeAnalitica("  G-108JF25LF1  ");

  assert.equal(scripts.length, 2);
  assert.ok(!scripts[0].src?.includes(" "));
});

test("apaga la vista automática de gtag: este sitio no recarga nunca", () => {
  const [, arranque] = scriptsDeAnalitica("G-108JF25LF1");

  // Es lo que evita contar dos veces la primera vista. Si alguien saca esto,
  // la portada queda inflada y las notas siguen sin medirse: el arranque de
  // Google manda UNA vista y después queda ciego, porque se navega con Link.
  assert.match(arranque.children ?? "", /send_page_view:\s*false/);
});

test("clasifica cada ruta del sitio por lo que es", () => {
  assert.equal(tipoDePagina("/"), "portada");
  assert.equal(tipoDePagina("/story/una-nota"), "nota");
  assert.equal(tipoDePagina("/section/ideas"), "navegacion");
  assert.equal(tipoDePagina("/tag/ai"), "navegacion");
  assert.equal(tipoDePagina("/contra"), "franquicia");
  assert.equal(tipoDePagina("/under40"), "franquicia");
  assert.equal(tipoDePagina("/about"), "institucional");
  assert.equal(tipoDePagina("/saved"), "cuenta");
});

test("una ruta que nadie anotó cae en «otra» en vez de romper", () => {
  // Una sección nueva tiene que quedar medida aunque nadie se acuerde de
  // sumarla acá. El peor caso es que se agrupe mal, no que se pierda.
  assert.equal(tipoDePagina("/ruta-que-todavia-no-existe"), "otra");
  assert.equal(tipoDePagina(""), "otra");
});
