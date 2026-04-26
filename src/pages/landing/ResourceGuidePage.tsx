import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { getResourceGuideBySlug, markdownToGuideHtml } from "@/data/resourceGuides";
import { RESOURCE_HUB_ROUTE, resourceGuidePath } from "@/routes/common/routePaths";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useJsonLdScript } from "@/hooks/useJsonLdScript";
import { canonicalUrl } from "@/lib/site";
import { defaultSocialImageUrl } from "@/lib/seoDefaults";

const GUIDE_HTML_CLASS =
  "resource-guide-html max-w-none text-[var(--ink)] " +
  "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--ink)] [&_h2]:sm:text-2xl [&_h2]:first:mt-0 " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--ink)] [&_h3]:sm:text-xl " +
  "[&_p]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-[var(--ink-muted)] [&_p]:sm:text-base " +
  "[&_em]:italic [&_em]:text-[var(--ink-muted)] " +
  "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-[15px] [&_ul]:leading-relaxed [&_ul]:text-[var(--ink-muted)] [&_ul]:sm:text-base " +
  "[&_li]:marker:text-[var(--blue)] " +
  "[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-[var(--r-l)] [&_table]:border [&_table]:border-[var(--line)] [&_table]:text-sm " +
  "[&_thead]:bg-[var(--surface)] " +
  "[&_th]:border-b [&_th]:border-[var(--line)] [&_th]:px-3 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[var(--ink)] sm:[&_th]:px-4 " +
  "[&_td]:border-b [&_td]:border-[var(--line)] [&_td]:px-3 [&_td]:py-3 [&_td]:align-top [&_td]:text-[var(--ink-muted)] sm:[&_td]:px-4 " +
  "[&_tr:last-child_td]:border-b-0 " +
  "[&_a]:font-medium [&_a]:text-[var(--blue)] [&_a]:underline-offset-2 hover:[&_a]:underline";

const ResourceGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = getResourceGuideBySlug(slug);

  const html = useMemo(() => {
    if (!guide) return "";
    return markdownToGuideHtml(guide.markdown);
  }, [guide]);

  const pagePath = slug ? resourceGuidePath(slug) : RESOURCE_HUB_ROUTE;
  const shareImage = useMemo(() => defaultSocialImageUrl(), []);

  useSeoMeta({
    title: guide ? `${guide.title} — Schedley` : "Resources — Schedley",
    description:
      guide?.subtitle ??
      "In-depth guides comparing Schedley to Calendly, Acuity Scheduling, and the broader scheduling landscape.",
    pathname: pagePath,
    ogType: "article",
    imageUrl: shareImage,
  });

  const jsonLdStr = useMemo(() => {
    if (!guide) return null;
    const url = canonicalUrl(resourceGuidePath(guide.slug));
    const resourcesUrl = canonicalUrl(RESOURCE_HUB_ROUTE);
    const home = canonicalUrl("/");
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: guide.title,
          description: guide.subtitle,
          articleSection: "Guide",
          author: { "@type": "Organization", name: "Schedley" },
          publisher: {
            "@type": "Organization",
            name: "Schedley",
            logo: { "@type": "ImageObject", url: shareImage },
          },
          url,
          image: [shareImage],
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: home },
            { "@type": "ListItem", position: 2, name: "Resources", item: resourcesUrl },
            { "@type": "ListItem", position: 3, name: guide.title, item: url },
          ],
        },
      ],
    });
  }, [guide, shareImage]);

  useJsonLdScript("schedley-resource-guide-jsonld", jsonLdStr);

  if (!slug || !guide) {
    return <Navigate to={RESOURCE_HUB_ROUTE} replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <header className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--white)] pt-8 pb-10 sm:pt-10 sm:pb-12">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <Link
              to={RESOURCE_HUB_ROUTE}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              All resources
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--blue)]">Guide</p>
            <h1 className="mt-2 b2b-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-[2.5rem] leading-tight">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-4xl text-lg text-[var(--ink-muted)] leading-relaxed">{guide.subtitle}</p>
            <p className="mt-3 text-sm text-[var(--ink-muted)]">{guide.metaLine}</p>
          </div>
        </header>
        <div className="py-10 sm:py-14">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <div className="w-full min-w-0 overflow-x-auto">
              <div className={GUIDE_HTML_CLASS} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            <div className="mt-12 border-t border-[var(--line)] pt-10">
              <p className="text-sm font-semibold text-[var(--ink)]">More guides</p>
              <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {["schedley-vs-calendly", "schedley-vs-acuity", "schedley-vs-scheduling-landscape"]
                  .filter((s) => s !== guide.slug)
                  .map((s) => {
                    const g = getResourceGuideBySlug(s);
                    if (!g) return null;
                    return (
                      <li key={s}>
                        <Link to={resourceGuidePath(s)} className="text-sm font-medium text-[var(--blue)] hover:underline">
                          {g.navLabel}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourceGuidePage;
