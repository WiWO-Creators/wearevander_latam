import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { INDICE_NOTE, OFFTAKE_ROWS, PAY_ROWS, SHIFT_ROWS, TAKE_ROWS } from "@/lib/indice";
import { Newsletter } from "@/components/newsletter";
import { AdSlot } from "@/components/ad-slot";
import { HOUSE, ISSUE } from "@/lib/content";

export const Route = createFileRoute("/indice")({
  component: IndicePage,
  head: () => ({
    meta: [{ title: "El Índice — We Are Vander" }],
  }),
});

function IndicePage() {
  const chart = PAY_ROWS.filter((r) => r.city !== "Austin (ref.)").map((r) => ({
    city: r.city.replace("Ciudad de México", "CDMX"),
    usd: r.usd / 1000,
  }));

  return (
    <main>
      <section className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">Data · {ISSUE.date}</p>
          <h1 className="headline mt-3 text-5xl sm:text-7xl">El Índice</h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-snug text-paper/75">
            Lo que se puede citar. Sueldos, turnos, offtakes, márgenes. Sin número, Vander opina. Con
            número, se discute. {HOUSE.credit}.
          </p>
          <p className="mt-4 max-w-xl font-body text-sm text-paper/55">{INDICE_NOTE}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="kicker text-xs text-rust">01 · Compensación</p>
        <h2 className="headline mt-2 text-3xl sm:text-5xl">Qué se paga a un ingeniero senior, en dólares</h2>
        <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
          Total cash anual, 2026. Elaboración propia a partir de ofertas vistas en visita y de
          contrataciones recientes. Austin es referencia, no meta.
        </p>
        <div className="mt-8 h-72 w-full border border-ink bg-paper-deep p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="currentColor" strokeOpacity={0.12} vertical={false} />
              <XAxis dataKey="city" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "currentColor" }}
                axisLine={false}
                tickLine={false}
                unit="k"
              />
              <Tooltip
                cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
                formatter={(v: number) => [`US$ ${v} mil`, "Total cash"]}
              />
              <Bar dataKey="usd" fill="currentColor" name="US$ mil" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left font-sans text-sm">
            <thead>
              <tr className="kicker border-b border-ink text-xs text-muted">
                <th className="py-2 pr-4 font-medium">Ciudad</th>
                <th className="py-2 pr-4 font-medium">Rol</th>
                <th className="py-2 pr-4 font-medium">US$</th>
                <th className="py-2 font-medium">Vs. referencia</th>
              </tr>
            </thead>
            <tbody>
              {PAY_ROWS.map((r) => (
                <tr key={r.city} className="border-b border-rule">
                  <td className="py-3 pr-4 font-semibold">{r.city}</td>
                  <td className="py-3 pr-4 text-ink-soft">{r.role}</td>
                  <td className="py-3 pr-4 tabular-nums">{r.usd.toLocaleString("es-MX")}</td>
                  <td className="py-3 text-muted">{r.vs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AdSlot size="leaderboard" creative="anuncia" />
      </div>

      <section className="border-y border-ink bg-paper-deep px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-xs text-rust">02 · Nearshoring</p>
          <h2 className="headline mt-2 text-3xl sm:text-5xl">Quién sumó segundo turno este trimestre</h2>
          <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
            El anuncio de 2024 ya no es la noticia. La noticia es el comedor que abre de noche.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left font-sans text-sm">
              <thead>
                <tr className="kicker border-b border-ink text-xs text-muted">
                  <th className="py-2 pr-4 font-medium">Planta</th>
                  <th className="py-2 pr-4 font-medium">Altas</th>
                  <th className="py-2 pr-4 font-medium">Hora</th>
                  <th className="py-2 font-medium">Nota</th>
                </tr>
              </thead>
              <tbody>
                {SHIFT_ROWS.map((r) => (
                  <tr key={r.plant} className="border-b border-rule">
                    <td className="py-3 pr-4 font-semibold">{r.plant}</td>
                    <td className="py-3 pr-4 tabular-nums">{r.added.toLocaleString("es-MX")}</td>
                    <td className="py-3 pr-4 tabular-nums">{r.hour}</td>
                    <td className="py-3 text-ink-soft">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="kicker text-xs text-rust">03 · Clima</p>
          <h2 className="headline mt-2 text-3xl">Offtakes que nombran un pueblo</h2>
          <ul className="mt-6">
            {OFFTAKE_ROWS.map((r) => (
              <li key={r.name} className="grid grid-cols-12 gap-2 border-t border-ink py-4">
                <span className="col-span-5 font-sans text-sm font-semibold">{r.name}</span>
                <span className="col-span-4 font-body text-sm text-ink-soft">{r.where}</span>
                <span className="col-span-3 text-right kicker text-xs tabular-nums">{r.years} años</span>
                <span className="col-span-12 font-kicker text-xs tracking-wider text-muted uppercase">{r.what}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker text-xs text-rust">04 · Fintech</p>
          <h2 className="headline mt-2 text-3xl">El número que el deck escondía</h2>
          <ul className="mt-6">
            {TAKE_ROWS.map((r) => (
              <li key={r.name} className="border-t border-ink py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-sans text-sm font-semibold">{r.name}</span>
                  <span className="headline text-2xl tabular-nums">{r.value}</span>
                </div>
                <p className="mt-1 kicker text-xs text-muted">
                  {r.metric} · {r.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="kicker text-xs text-muted">Cómo se arma</p>
          <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">{INDICE_NOTE}</p>
          <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
            Las corresponsalías de Ciudad de México, São Paulo, Buenos Aires, Bogotá, Santiago y Lima
            cruzan lo que se puede visitar con lo que se puede leer en un filing. Nadie paga por
            aparecer. Si una cifra cambia, El Índice se actualiza. El adjetivo, no.
          </p>
          <Link to="/story/$slug" params={{ slug: "indice-agosto-2026" }} className="kicker mt-6 inline-block text-xs text-rust hover:underline">
            Leer la entrada de agosto
          </Link>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
