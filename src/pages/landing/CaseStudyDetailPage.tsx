import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { CASE_STUDIES_ROUTE, caseStudyDetailPath } from "@/routes/common/routePaths";
import { StudySection } from "@/pages/landing/caseStudies/CaseStudyArticle";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useJsonLdScript } from "@/hooks/useJsonLdScript";
import { canonicalUrl } from "@/lib/site";
import { defaultSocialImageUrl } from "@/lib/seoDefaults";

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug);

  const pagePath = slug ? caseStudyDetailPath(slug) : CASE_STUDIES_ROUTE;
  const shareImage = useMemo(() => defaultSocialImageUrl(), []);

  useSeoMeta({
    title: study ? `${study.title} — Case study — Schedley` : "Case studies — Schedley",
    description:
      study?.subtitle ??
      "Composite case studies based on typical customer outcomes across AI Outreach, Pipeline Generation, Hiring, and Calendar Intelligence.",
    pathname: pagePath,
    ogType: "article",
    imageUrl: shareImage,
  });

  const jsonLdStr = useMemo(() => {
    if (!study) return null;
    const url = canonicalUrl(caseStudyDetailPath(study.id));
    const indexUrl = canonicalUrl(CASE_STUDIES_ROUTE);
    const home = canonicalUrl("/");
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: study.title,
          description: study.subtitle,
          articleSection: "Case study",
          author: { "@type": "Organization", name: "Schedley" },
          publisher: {
            "@type": "Organization",
            name: "Schedley",
            logo: { "@type": "ImageObject", url: shareImage },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          image: [shareImage],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: home },
            { "@type": "ListItem", position: 2, name: "Case studies", item: indexUrl },
            { "@type": "ListItem", position: 3, name: study.title, item: url },
          ],
        },
      ],
    });
  }, [study, shareImage]);

  useJsonLdScript("schedley-case-study-jsonld", jsonLdStr);

  if (!slug || !study) {
    return <Navigate to={CASE_STUDIES_ROUTE} replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--white)] pt-8 pb-10 sm:pt-10 sm:pb-12">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <Link
              to={CASE_STUDIES_ROUTE}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              All case studies
            </Link>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <div className="mb-10 flex w-full min-w-0 items-start gap-3 rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
              <BookOpen className="h-6 w-6 shrink-0 text-[var(--blue)]" aria-hidden />
              <p className="text-sm leading-relaxed text-[var(--ink-muted)] sm:text-[15px]">
                This is a <strong className="font-semibold text-[var(--ink)]">composite case study</strong> based on
                typical customer outcomes. The organization name illustrates how teams use Schedley services.
              </p>
            </div>
            <div className="w-full min-w-0">
              <StudySection study={study} standalone />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseStudyDetailPage;
