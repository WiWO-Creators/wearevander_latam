import { createFileRoute, Link } from "@tanstack/react-router";
import {
  VANDER_METHOD,
  VANDER_DEK,
  VANDER_WAITLIST,
  VANDER_WAIT_ALSO,
  VANDER_CLOSED,
  VANDER_SHRUNK,
} from "@/lib/vander-list";
import { HOUSE, ISSUE } from "@/lib/content";
import { Vander20Mark } from "@/components/brand";
import { Newsletter } from "@/components/newsletter";
import { MethodGrid } from "@/components/rank-pack";

export const Route = createFileRoute("/list/metodologia")({
  component: ListMethodPage,
  head: () => ({
    meta: [{ title: "Metodología Vander 20 — We Are Vander" }],
  }),
});

function ListMethodPage() {
  return (
    <main>
      <section className="bg-ink px-4 py-12 text-paper sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/list" className="logo-mark inline-block max-w-xs">
            <Vander20Mark className="h-10 sm:h-12" />
          </Link>
          <p className="kicker mt-6 text-xs text-signal">Metodología pública · {ISSUE.date}</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl">Cómo se arma el Vander 20</h1>
          <p className="mt-5 font-body text-lg leading-snug text-paper/75">{VANDER_DEK}</p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="font-body text-lg leading-relaxed">
          En 2025 el capital de riesgo latinoamericano movió 4.126 millones de dólares en 681 rondas. El
          monto subió casi 14%. El número de operaciones cayó al mínimo desde 2017. Y el ticket promedio
          por ronda subió de 5,2 a 6,1 millones de dólares. Eso no es un ecosistema recuperándose. Es un
          ecosistema concentrándose.
        </p>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          En ese contexto, un ranking de «las más prometedoras» ordenado por capital levantado no informa
          nada: mide quién tiene mejores contactos, no quién tiene mejor negocio. El ranking del Financial
          Times y Statista mide crecimiento de ingresos, que es mejor, pero una compañía puede crecer 400%
          quemando caja. Endeavor Outliers mide CAGR dentro de su propia red. LinkedIn mide atractivo
          laboral. Ninguno mide si la compañía gana plata. Nosotros sí. Verificamos más de ciento veinte
          compañías de nueve países. Veinte pasaron.
        </p>
        <MethodGrid items={VANDER_METHOD} accent="signal" />

        <h2 className="headline mt-16 text-3xl sm:text-4xl">Lo que el ranking dice sin querer</h2>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
          Brasil se lleva once de veinte. No porque tenga mejores compañías, sino porque tiene mejor
          divulgación. En Perú no encontramos una sola compañía con rentabilidad verificable en fuente
          pública. Diecisiete de las veinte son fintech, crédito o infraestructura de pagos. En América
          Latina, el camino más corto a la rentabilidad sigue siendo prestar plata o cobrarle a quien la
          mueve.
        </p>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
          De veinte compañías, solo dos tienen su rentabilidad verificada por un tercero independiente: QI
          Tech por Fitch y Agrolend por Moody's Local. Dieciséis son declaraciones de ejecutivos sin
          cifra. Lo publicamos igual, con la graduación a la vista, porque la alternativa es publicar un
          ranking de rondas.
        </p>

        <h2 className="headline mt-16 text-3xl sm:text-4xl">La lista de espera</h2>
        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
          Compañías con números operativos excelentes que no entraron porque no pudimos verificar
          rentabilidad. Si publican un resultado, entran.
        </p>
        <ul className="mt-6 space-y-5">
          {VANDER_WAITLIST.map((w) => (
            <li key={w.name} className="border-t border-ink pt-4">
              <p className="headline text-2xl">
                {w.name} <span className="kicker text-xs text-muted">{w.place}</span>
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{w.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-body text-sm text-ink-soft">También seguimos: {VANDER_WAIT_ALSO}</p>

        <h2 className="headline mt-16 text-3xl sm:text-4xl">Las que no están, y por qué</h2>
        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
          Un ranking de promesas que no dice quién se cayó no sirve.
        </p>
        <p className="mt-8 kicker text-xs text-rust">Cerraron</p>
        <ul className="mt-3 space-y-3">
          {VANDER_CLOSED.map((w) => (
            <li key={w.name}>
              <span className="font-sans text-sm font-semibold">{w.name}</span>
              <span className="text-muted"> · {w.place}. </span>
              <span className="font-body text-sm text-ink-soft">{w.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 kicker text-xs text-rust">En venta o encogidas</p>
        <ul className="mt-3 space-y-3">
          {VANDER_SHRUNK.map((w) => (
            <li key={w.name}>
              <span className="font-sans text-sm font-semibold">{w.name}</span>
              <span className="text-muted"> · {w.place}. </span>
              <span className="font-body text-sm text-ink-soft">{w.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-base leading-relaxed text-ink-soft">
          Demasiado grandes: Mercado Libre, Nubank, Rappi, iFood, Stone, dLocal, QuintoAndar, Plata. Sin
          evidencia pública suficiente: La Haus, Chiper, Olist, Nowports. Un ranking de prometedoras
          exige prueba positiva, y no la hay.
        </p>
        <p className="mt-10 font-body text-base leading-relaxed">
          Ciento veintitantas compañías revisadas, nueve países, cero agregadores. Ordenadas por si ganan
          plata y por quién lo verificó. Si tu compañía está en la lista de espera y tiene un estado de
          resultados, escríbenos: la próxima edición se cierra en agosto de 2027. {HOUSE.credit}.
        </p>
        <Link to="/list" className="kicker mt-8 inline-block text-xs text-signal hover:underline">
          Volver al ranking
        </Link>
      </article>
      <Newsletter />
    </main>
  );
}
