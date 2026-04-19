/** Canonical / absolute URL base for SEO (no trailing slash). */
export const SITE_ORIGIN = (
  import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.schedley.com"
);

export function canonicalUrl(pathname: string): string {
  if (!pathname || pathname === "/") {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}${pathname}`;
}
