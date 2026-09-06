import { ARTICLES, SECTIONS, TAGS, latestArticles } from "./content";
import { INNOVATIVES, innovCountries, innovSectors } from "./innovatives";
import { SITE, canonical } from "./seo";
import { UNDER40 } from "./under40";
import { VANDER_LIST, vanderCities, vanderSectors } from "./vander-list";
import { VOLUMES } from "./visionarios";

const SKIP = new Set(["metodologia", "sector", "ciudad", "pais", "tag", "autor", "index"]);
const STAMP = "2026-08-24";

export type SitemapRow = { path: string; lastmod?: string; changefreq?: string; priority?: string };

export function sitemapRows(): SitemapRow[] {
  const rows: SitemapRow[] = [
    { path: "/", lastmod: STAMP, changefreq: "daily", priority: "1.0" },
    { path: "/list", lastmod: STAMP, changefreq: "weekly", priority: "0.9" },
    { path: "/list/metodologia", lastmod: STAMP, changefreq: "monthly", priority: "0.7" },
    { path: "/innovatives", lastmod: STAMP, changefreq: "weekly", priority: "0.9" },
    { path: "/innovatives/metodologia", lastmod: STAMP, changefreq: "monthly", priority: "0.7" },
    { path: "/visionarios", lastmod: STAMP, changefreq: "weekly", priority: "0.9" },
    { path: "/under40", lastmod: STAMP, changefreq: "weekly", priority: "0.9" },
    { path: "/under40/metodologia", lastmod: STAMP, changefreq: "monthly", priority: "0.6" },
    { path: "/signals", lastmod: STAMP, changefreq: "daily", priority: "0.8" },
    { path: "/contra", lastmod: STAMP, changefreq: "weekly", priority: "0.8" },
    { path: "/indice", lastmod: STAMP, changefreq: "monthly", priority: "0.7" },
    { path: "/about", lastmod: STAMP, changefreq: "monthly", priority: "0.5" },
    { path: "/channels", lastmod: STAMP, changefreq: "weekly", priority: "0.5" },
    { path: "/obituarios", lastmod: STAMP, changefreq: "monthly", priority: "0.4" },
  ];

  for (const s of SECTIONS) {
    rows.push({ path: `/section/${s.id}`, lastmod: STAMP, changefreq: "weekly", priority: "0.6" });
  }
  for (const t of TAGS) {
    rows.push({ path: `/tag/${t.id}`, lastmod: STAMP, changefreq: "weekly", priority: "0.4" });
  }

  for (const a of ARTICLES) {
    rows.push({
      path: `/story/${a.id}`,
      lastmod: a.updatedAt ?? a.publishedAt,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  for (const c of VANDER_LIST) {
    if (SKIP.has(c.slug)) continue;
    rows.push({ path: `/list/${c.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.7" });
  }
  for (const g of vanderSectors()) rows.push({ path: `/list/sector/${g.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });
  for (const g of vanderCities()) rows.push({ path: `/list/ciudad/${g.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });

  for (const c of INNOVATIVES) {
    if (SKIP.has(c.slug)) continue;
    rows.push({ path: `/innovatives/${c.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.6" });
  }
  for (const g of innovSectors()) rows.push({ path: `/innovatives/sector/${g.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });
  for (const g of innovCountries()) rows.push({ path: `/innovatives/pais/${g.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });

  for (const p of UNDER40) {
    if (SKIP.has(p.slug)) continue;
    rows.push({ path: `/under40/${p.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });
  }

  for (const v of VOLUMES) {
    rows.push({ path: v.path, lastmod: STAMP, changefreq: "weekly", priority: "0.8" });
    rows.push({ path: `${v.path}/metodologia`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });
    if (v.id === "cl") continue;
    for (const p of v.people) {
      if (SKIP.has(p.slug)) continue;
      rows.push({ path: `${v.path}/${p.slug}`, lastmod: STAMP, changefreq: "monthly", priority: "0.5" });
    }
  }

  const seen = new Set<string>();
  return rows.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}

function xml(s: string) {
  return s
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

export function sitemapXml() {
  const body = sitemapRows()
    .map((r) => {
      const loc = xml(canonical(r.path));
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${r.lastmod ?? STAMP}</lastmod>
    <changefreq>${r.changefreq ?? "monthly"}</changefreq>
    <priority>${r.priority ?? "0.5"}</priority>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function rssXml() {
  const items = latestArticles(ARTICLES, 40);
  const feedItems = items
    .map((a) => {
      const url = xml(canonical(`/story/${a.id}`));
      const title = xml(a.title);
      const desc = xml(a.summary);
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.publishedAt}T12:00:00-03:00`).toUTCString()}</pubDate>
      <description>${desc}</description>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xml(SITE.name)}</title>
    <link>${xml(SITE.url)}</link>
    <description>${xml(SITE.description)}</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${feedItems}
  </channel>
</rss>
`;
}
