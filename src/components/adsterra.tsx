import { useEffect, useMemo, useRef, useState } from "react";
import { ADSTERRA, ADSTERRA_INVOKE, type AdsterraBannerSpec } from "@/lib/ads";

/**
 * Cada banner Adsterra pisa `window.atOptions`. Montar dos scripts en el mismo
 * document deja vivo solo el último. El iframe + srcDoc le da a cada unidad
 * su propio window — se pueden repetir en la misma página.
 *
 * No montar el 728 y el 320 a la vez (ni con display:none): el fill se degrada
 * y Adsterra termina sirviendo un 300×250 borroso dentro del 728.
 */
export function AdsterraBanner({
  spec,
  className,
}: {
  spec: AdsterraBannerSpec;
  className?: string;
}) {
  const srcDoc = useMemo(() => bannerSrcDoc(spec), [spec.key, spec.width, spec.height]);
  return (
    <IsolatedFrame
      srcDoc={srcDoc}
      width={spec.width}
      height={spec.height}
      className={className}
    />
  );
}

export function AdsterraNative({ height = 250 }: { height?: number }) {
  const srcDoc = useMemo(() => nativeSrcDoc(), []);
  return <IsolatedFrame srcDoc={srcDoc} width="100%" height={height} />;
}

export function AdsterraLeaderboard() {
  const [wide, setWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 728px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (wide === null) {
    return <div style={{ width: "100%", height: 90 }} aria-hidden />;
  }

  return wide ? <AdsterraBanner spec={ADSTERRA.leaderboard} /> : <AdsterraBanner spec={ADSTERRA.mobile} />;
}

function IsolatedFrame({
  srcDoc,
  width,
  height,
  className,
}: {
  srcDoc: string;
  width: number | "100%";
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.srcdoc !== srcDoc) el.srcdoc = srcDoc;
  }, [srcDoc]);

  const px = typeof width === "number";

  return (
    <iframe
      ref={ref}
      title="Publicidad"
      srcDoc={srcDoc}
      width={px ? width : undefined}
      height={height}
      className={className}
      style={{
        border: 0,
        display: "block",
        margin: "0 auto",
        width: px ? width : "100%",
        height,
        maxWidth: px ? width : "100%",
        overflow: "hidden",
        background: "transparent",
        flexShrink: 0,
      }}
      scrolling="no"
    />
  );
}

function bannerSrcDoc(spec: AdsterraBannerSpec) {
  const key = spec.key.replace(/[^a-f0-9]/gi, "");
  const w = Number(spec.width);
  const h = Number(spec.height);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=${w}">
<style>
  html,body{margin:0;padding:0;overflow:hidden;background:transparent;width:${w}px;height:${h}px;}
  iframe,ins,div{max-width:${w}px !important;}
</style></head><body>
<script type="text/javascript">
	atOptions = { 'key':'${key}', 'format':'iframe', 'height':${h}, 'width':${w}, 'params':{} };
</script>
<script type="text/javascript" src="${ADSTERRA_INVOKE}/${key}/invoke.js"></script>
</body></html>`;
}

function nativeSrcDoc() {
  const { src, containerId } = ADSTERRA.native;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;background:transparent}</style></head><body>
<script async="async" data-cfasync="false" src="${src}"></script>
<div id="${containerId}"></div>
</body></html>`;
}
