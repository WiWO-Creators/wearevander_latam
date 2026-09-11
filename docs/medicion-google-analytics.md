# Medición con Google Analytics

Qué propiedad de Google Analytics mide este sitio, y cómo cambiarla rápido si
hace falta.

## Las dos propiedades

| ID | Estado | Dónde vive | ¿La lee doom? |
|---|---|---|---|
| `G-NBS72L0E6L` | **Vigente** | Cuenta de Analytics «WiWO Medios» | Sí |
| `G-108JF25LF1` | Anterior, guardada por si se pide volver a ella | Otra cuenta, creada por otra persona | No, salvo que su dueño dé acceso |

La anterior nunca recibió visitas: su código no llegó a publicarse en el sitio.
Por eso cambiar a la nueva no perdió ningún dato.

## Cómo cambiar de propiedad

**No hay que tocar el código.** El sitio lee el identificador de la variable de
entorno `VITE_GA_MEASUREMENT_ID` (ver `src/lib/analytics.ts`), y funciona igual
con cualquiera de las dos.

1. En Vercel, proyecto `wearevander_latam` → *Settings → Environment
   Variables*, cambia el valor de `VITE_GA_MEASUREMENT_ID` en **Production**
   por el otro ID.
2. Redespliega producción. El identificador se escribe dentro del build al
   compilar, así que **cambiar la variable sin redesplegar no hace nada**.
3. Comprueba en vivo que el HTML de `https://www.wearevander.com/` contenga el
   ID nuevo.

Si se vuelve a `G-108JF25LF1`, además:

- **doom deja de ver las cifras** hasta que el dueño de esa propiedad agregue
  `doom-analitica@wiwo-doom.iam.gserviceaccount.com` como Lector, y se cargue su
  Property ID numérico en doom (botón «Google Analytics» del Orquestador).
- En esa propiedad hay que apagar *Medición mejorada → Vistas de página →
  "Cambios de página basados en eventos del historial del navegador"*: hoy está
  encendido, y con él cada vista del sitio se contaría dos veces.
- Hay que registrar ahí las mismas definiciones personalizadas que en la
  vigente (alcance Evento): `tipo_de_pagina`, `origen`, `seccion`, `volanta`,
  `plaza`, `firma`, `ritmo`, `franquicia`, `nota`, y la métrica `minutos`.

## El código original de la propiedad anterior

Así lo entregó quien creó la propiedad `G-108JF25LF1`. Se guarda **como
referencia**: **no hay que pegarlo en el sitio**. El sitio ya carga este mismo
script desde `src/lib/analytics.ts`, y pegarlo además haría que cada visita se
cuente dos veces.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-108JF25LF1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-108JF25LF1');
</script>
```

La diferencia con la instalación del sitio: este fragmento, tal cual, solo
cuenta la primera página de cada visita —el sitio navega sin recargar— y no
manda sección, firma ni origen de la nota. La instalación del sitio usa el mismo
script con `send_page_view: false` y avisa cada cambio de página por su cuenta,
con las dimensiones editoriales.

## Si hiciera falta medir en las dos a la vez

gtag puede mandar las mismas visitas a más de una propiedad. Hoy el sitio acepta
un solo ID; aceptar dos es un cambio chico en `src/lib/analytics.ts`, pero no
está hecho.
