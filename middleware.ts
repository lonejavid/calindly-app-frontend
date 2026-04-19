import { next } from "@vercel/edge";

const DEFAULT_ORIGIN = "https://www.schedley.com";

function canonicalHref(request: Request): string {
  const envOrigin = process.env.CANONICAL_SITE_ORIGIN?.replace(/\/$/, "");
  const origin = envOrigin || DEFAULT_ORIGIN;
  const url = new URL(request.url);
  const path = url.pathname || "/";
  if (path === "/") {
    return `${origin}/`;
  }
  return `${origin}${path}`;
}

function shouldSkipCanonical(pathname: string): boolean {
  if (pathname.startsWith("/assets/")) return true;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
  if (pathname.startsWith("/.well-known/")) return true;
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".") && !pathname.endsWith("/")) {
    return true;
  }
  return false;
}

export default function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  if (shouldSkipCanonical(pathname)) {
    return next();
  }

  const href = canonicalHref(request);
  return next({
    headers: {
      Link: `<${href}>; rel="canonical"`,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
