import { marked } from "marked";
import calendlyRaw from "./markdown/schedley-vs-calendly.md?raw";
import acuityRaw from "./markdown/schedley-vs-acuity.md?raw";
import landscapeRaw from "./markdown/schedley-vs-scheduling-landscape.md?raw";
import { resourceGuideNavLinks } from "./navLinks";

marked.setOptions({ gfm: true, breaks: true });

const RAW_BY_SLUG: Record<string, string> = {
  "schedley-vs-calendly": calendlyRaw,
  "schedley-vs-acuity": acuityRaw,
  "schedley-vs-scheduling-landscape": landscapeRaw,
};

export type ResourceGuideMeta = {
  slug: string;
  title: string;
  subtitle: string;
  metaLine: string;
  navLabel: string;
  navDescription: string;
};

function splitFrontMatter(raw: string) {
  const lines = raw.split(/\r?\n/);
  const title = lines[0]?.trim() ?? "";
  const subtitle = lines[1]?.trim() ?? "";
  let i = 2;
  while (i < lines.length && !lines[i]?.trim()) i++;
  const metaLine = lines[i]?.trim() ?? "";
  i += 1;
  while (i < lines.length && !lines[i]?.trim()) i++;
  const body = lines.slice(i).join("\n").trim();
  /** Body only — page shell renders title, subtitle, and meta. */
  const markdown = body;
  return { title, subtitle, metaLine, markdown };
}

export const resourceGuideEntries: ResourceGuideMeta[] = resourceGuideNavLinks.map((link) => {
  const raw = RAW_BY_SLUG[link.slug];
  if (!raw) throw new Error(`Missing raw markdown for ${link.slug}`);
  const parsed = splitFrontMatter(raw);
  return {
    slug: link.slug,
    navLabel: link.navLabel,
    navDescription: link.navDescription,
    ...parsed,
  };
});

export function getResourceGuideBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return resourceGuideEntries.find((g) => g.slug === slug);
}

export function markdownToGuideHtml(markdown: string): string {
  return marked.parse(markdown) as string;
}
