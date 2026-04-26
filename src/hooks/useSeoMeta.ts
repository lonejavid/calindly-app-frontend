import { useEffect } from "react";
import { canonicalUrl } from "@/lib/site";
import { defaultSocialImageUrl } from "@/lib/seoDefaults";

export type SeoMetaOptions = {
  title: string;
  description: string;
  pathname: string;
  /** Absolute image URL for og:image / twitter:image */
  imageUrl?: string;
  ogType?: "website" | "article";
};

function ensureMeta(attr: "name" | "property", key: string, content: string) {
  const sel = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * SPA-safe document title, meta description, and Open Graph / Twitter tags.
 * Relies on base tags in index.html where possible; creates any missing og/twitter tags.
 */
export function useSeoMeta({ title, description, pathname, imageUrl, ogType = "website" }: SeoMetaOptions) {
  const pageUrl = canonicalUrl(pathname);
  const image = imageUrl ?? defaultSocialImageUrl();

  useEffect(() => {
    document.title = title;
    ensureMeta("name", "description", description);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", pageUrl);
    ensureMeta("property", "og:type", ogType);
    ensureMeta("property", "og:image", image);
    ensureMeta("property", "og:image:alt", title);
    ensureMeta("property", "og:site_name", "Schedley");
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", image);
  }, [title, description, pageUrl, image, ogType]);
}
