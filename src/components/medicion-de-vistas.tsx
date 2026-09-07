import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { medirVista } from "@/lib/analytics";

/**
 * Responsabilidad: mandar una vista de página a Google Analytics cada vez que
 * cambia la ruta.
 * Usado por: routes/__root.tsx, montado una sola vez para todo el sitio.
 * NO hace: no mide notas —eso es medirNota, desde la ruta de la nota, que es la
 *   única que tiene la pieza a mano— ni carga gtag: eso viene del head.
 *
 * EXISTE PORQUE ESTE SITIO NO RECARGA NUNCA. Se navega con Link de TanStack, así
 * que el documento se carga una vez y de ahí en adelante todo pasa en el
 * navegador. El arranque de Google que viene por omisión manda una vista al
 * cargar y ninguna más: alguien que entra por la portada y lee cuatro notas
 * queda contado como una vista de la portada. Con veinticinco rutas y el archivo
 * entero navegable, eso no es un margen de error, es la mayor parte del tráfico.
 *
 * No dibuja nada. Es un componente y no un efecto suelto porque necesita el
 * estado del enrutador, y eso son hooks.
 */
export function MedicionDeVistas() {
  // Solo el camino, no el objeto entero: el estado del enrutador cambia por
  // muchos motivos —una carga, un foco— y con el objeto completo esto mandaría
  // vistas repetidas de la misma página.
  const ruta = useRouterState({
    select: (estado) => estado.location.pathname,
  });

  useEffect(() => {
    // Un cuadro de espera antes de leer el título: TanStack lo escribe cuando
    // aplica el head de la ruta nueva, y leerlo en el mismo tick devuelve el de
    // la página ANTERIOR. Sin esto, cada vista queda rotulada con el título de
    // la que se acaba de dejar, que es peor que no tener título.
    const reloj = setTimeout(() => {
      medirVista(ruta, document.title);
    }, 0);

    return () => clearTimeout(reloj);
  }, [ruta]);

  return null;
}
