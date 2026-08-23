import { useEffect, useMemo, useRef } from "react";
import { ADSTERRA, ADSTERRA_INVOKE, type AdsterraBannerSpec } from "@/lib/ads";

/**
 * Cada banner Adsterra pisa `window.atOptions`. Montar dos scripts en el mismo
 * document deja vivo solo el último. El iframe + srcDoc le da a cada unidad
 * su propio window — se pueden repetir en la misma página.
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

export function AdsterraNative({ height = 200 }: { height?: number }) {
  const srcDoc = useMemo(() => nativeSrcDoc(), []);
  return <IsolatedFrame srcDoc={srcDoc} width="100%" height={height} />;
}

/** 728 y 320 en iframes distintos. CSS elige cuál se ve; atOptions no se pisa. */
export function AdsterraLeaderboard() {
  return (
    <>
      <div className="hidden min-[728px]:block">
        <AdsterraBanner spec={ADSTERRA.leaderboard} />
      </div>
      <div className="min-[728px]:hidden">
        <AdsterraBanner spec={ADSTERRA.mobile} />
      </div>
    </>
  );
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
    if (el) el.srcdoc = srcDoc;
  }, [srcDoc]);

  return (
    <iframe
      ref={ref}
      title="Publicidad"
      {...{ srcdoc: srcDoc }}
      width={width}
      height={height}
      className={className}
      style={{
        border: 0,
        display: "block",
        margin: "0 auto",
        maxWidth: "100%",
        width: width === "100%" ? "100%" : undefined,
        overflow: "hidden",
        background: "transparent",
      }}
      scrolling="no"
    />
  );
}

function bannerSrcDoc(spec: AdsterraBannerSpec) {
  const key = spec.key.replace(/[^a-f0-9]/gi, "");
  const w = Number(spec.width);
  const h = Number(spec.height);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>
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
