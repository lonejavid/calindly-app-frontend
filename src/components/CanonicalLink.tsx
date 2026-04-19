import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalUrl } from "@/lib/site";

/**
 * SPA-safe canonical: updates or creates <link rel="canonical"> from the current path (query stripped).
 */
export function CanonicalLink() {
  const { pathname } = useLocation();
  const href = canonicalUrl(pathname);

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [href]);

  return null;
}
