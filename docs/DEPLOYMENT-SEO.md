# Deployment & SEO checklist

Steps you run in **hosting / Google**, not in CI code.

## 1. Apex → `www` (301)

- **Vercel:** This repo’s `vercel.json` redirects host `schedley.com` → `https://www.schedley.com/:path*` (308/301 style permanent redirect).
- **After deploy:** Open `http://schedley.com` and `https://schedley.com` in a browser; you should land on `https://www.schedley.com/...`.
- **DNS:** Ensure both apex and `www` point at Vercel (or your CDN) so the redirect can run.

## 2. Google Search Console (indexing)

1. Add property for `https://www.schedley.com` (URL-prefix or domain).
2. Verify ownership (DNS TXT or HTML file).
3. Submit sitemap: `https://www.schedley.com/sitemap.xml`.
4. Use **URL Inspection** on `/`, one service URL, one blog post, one guide.
5. Watch **Pages** → *Excluded* / *Error* for SPA or redirect issues.

## 3. Open Graph / Twitter image

- Default share image is **`/schedley-logo.png`** (file in `public/`). Confirm it returns **200** in production:  
  `https://www.schedley.com/schedley-logo.png`
- For a richer preview later, add a **1200×630** PNG (e.g. `public/og-default.png`) and point `index.html` + `src/lib/seoDefaults.ts` at that path.

## 4. Core Web Vitals (CWV)

1. Chrome DevTools → **Lighthouse** (mobile) on `/` and `/services/ai-outreach`.
2. [PageSpeed Insights](https://pagespeed.web.dev/) with the live `www` URL.
3. In GSC → **Experience** → Core Web Vitals (field data, when available).

This app uses a **manual chunk split** in `vite.config.ts` for React/router and Lucide to improve long-term caching; further wins usually come from **image weight**, **font loading**, and **lazy** below-the-fold media on large landings.

## 5. Optional prerender (HTML-first meta)

Google generally executes JS for this stack; some social scrapers are pickier. Options if previews are wrong:

- **Vercel:** Prerendering middleware / Edge SSR for selected paths (product decision).
- **Third-party:** e.g. Prerender.io, or a post-build **react-snap** crawl (needs extra setup and test time).

There is **no** prerender step in the default `npm run build`; add one only if you confirm a crawler issue in production.
