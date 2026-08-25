import { UNIVERSE } from "@/lib/markets/types";

const SYMBOLS = UNIVERSE.instruments
  .filter((i) => i.tv)
  .sort((a, b) => a.order - b.order)
  .map((i) => ({ proName: i.tv as string, title: i.label }));

const CONFIG = {
  symbols: SYMBOLS,
  showSymbolLogo: false,
  colorTheme: "dark",
  isTransparent: true,
  displayMode: "compact",
  locale: "es",
};

const SRC = `https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=es#${encodeURIComponent(JSON.stringify(CONFIG))}`;

export function TradingViewTape({ label }: { label?: string }) {
  return (
    <div className="overflow-hidden border-b border-bleed/10 bg-void text-bleed">
      <p className="px-3 pt-1 font-sans text-[10px] tracking-wide text-bleed/45 sm:px-6">
        {label ? `${label} · ` : ""}Datos de mercado: TradingView
      </p>
      <iframe
        title="Cinta de mercados · TradingView"
        src={SRC}
        className="block w-full border-0"
        style={{ height: 72 }}
        loading="eager"
        referrerPolicy="origin-when-cross-origin"
      />
    </div>
  );
}
