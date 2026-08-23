import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteChrome } from "@/components/site-chrome";
import { BrandPreloader } from "@/components/brand-preloader";
import { AppErrorComponent } from "@/lib/error-component";
import { HILLTOP_ZONES, HILLTOP_SERVE } from "@/lib/ads";
import appCss from "../styles.css?url";

import { SITE } from "@/lib/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: SITE.name },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#ce3134" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/icon-32.png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/icon-180.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
    ],
    scripts: HILLTOP_ZONES.popunder
      ? [{ src: `${HILLTOP_SERVE}/${HILLTOP_ZONES.popunder}`, defer: true }]
      : [],
  }),
  errorComponent: AppErrorComponent,
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="es" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <meta name="54aa2f4cf4f47f587705966a8169135a213fe0c6" content="54aa2f4cf4f47f587705966a8169135a213fe0c6" />
      </head>
      <body className="bg-paper text-ink">
        <PreviewHostBridge />
        <BrandPreloader />
        <AuthProvider>
          <SiteChrome>
            <Outlet />
          </SiteChrome>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
