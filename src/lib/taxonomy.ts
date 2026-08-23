export type CatGroup<T> = {
  label: string;
  slug: string;
  items: T[];
};

export function toCatSlug(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function groupByLabel<T>(items: T[], labelOf: (item: T) => string): CatGroup<T>[] {
  const map = new Map<string, CatGroup<T>>();
  for (const item of items) {
    const label = labelOf(item);
    const slug = toCatSlug(label);
    const cur = map.get(slug);
    if (cur) cur.items.push(item);
    else map.set(slug, { label, slug, items: [item] });
  }
  return [...map.values()].sort((a, b) => b.items.length - a.items.length || a.label.localeCompare(b.label, "es"));
}

export function findGroup<T>(groups: CatGroup<T>[], slug: string) {
  return groups.find((g) => g.slug === slug);
}
