import { useEffect } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { caseStudiesData } from "@/data/caseStudies";
import { caseStudyDetailPath, CASE_STUDIES_ROUTE } from "@/routes/common/routePaths";
import { BlockRenderer } from "@/pages/landing/caseStudies/CaseStudyArticle";

const CaseStudiesPage = () => {
  const { cover, studies, closing } = caseStudiesData;
  const location = useLocation();
  const navigate = useNavigate();

  useSeoMeta({
    title: "Customer case studies — Schedley",
    description:
      "Composite stories from teams using Schedley for AI Outreach, Pipeline Generation, Hiring Infrastructure, and Calendar Intelligence—typical outcomes, anonymized for clarity.",
    pathname: CASE_STUDIES_ROUTE,
  });

  useEffect(() => {
    const hash = location.hash.replace(/^#/, "");
    if (hash && studies.some((s) => s.id === hash)) {
      navigate(caseStudyDetailPath(hash), { replace: true });
    }
  }, [location.hash, navigate, studies]);

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="pt-12 sm:pt-16 pb-10 sm:pb-12 border-b border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--white)]">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <div className="w-full min-w-0">
              <div className="b2b-eyebrow mb-4">
                <span className="b2b-eyebrow-line" aria-hidden />
                <span className="b2b-eyebrow-text uppercase tracking-wider text-[var(--ink-muted)]">
                  {cover.brand}
                </span>
              </div>
              <h1 className="b2b-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--ink)] tracking-tight">
                {cover.title}
              </h1>
              <p className="mt-4 max-w-4xl text-[var(--ink-muted)] text-base sm:text-lg leading-relaxed italic">
                {cover.subtitle}
              </p>
              <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
                {studies.map((study) => {
                  const teaser = cover.teasers.find((t) => t.num === study.num);
                  const name = teaser?.name ?? study.title.split("—")[0]?.trim() ?? study.title;
                  const meta = teaser?.meta ?? study.industryLine;
                  const challenge = teaser?.challenge ?? "";
                  return (
                    <li key={study.id} className="min-w-0 flex">
                      <Link
                        to={caseStudyDetailPath(study.id)}
                        className="group flex h-full w-full min-w-0 flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-5 text-left shadow-sm transition-all hover:border-[var(--blue)]/40 hover:shadow-[var(--sh-md)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 sm:p-6"
                      >
                        <p className="text-sm font-bold text-[var(--ink)]">Case Study {study.num}</p>
                        <p className="mt-1 text-base font-semibold text-[var(--ink)] group-hover:text-[var(--blue)]">
                          {name}
                        </p>
                        <p className="mt-1 text-sm text-[var(--ink-muted)]">{meta}</p>
                        {challenge ? (
                          <p className="mt-2 text-sm italic text-[var(--ink-muted)]">{challenge}</p>
                        ) : null}
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-muted)] sm:text-[15px]">
                          {study.cardPreview}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--blue)]">
                          Read case study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-[var(--surface)] py-14 sm:py-16">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <div className="w-full min-w-0">
              <h2 className="b2b-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                {closing.title}
              </h2>
              <p className="mt-3 text-base italic text-[var(--ink-muted)] sm:text-lg">{closing.subtitle}</p>
              <div className="mt-8">
                {closing.blocks.map((b, i) => (
                  <BlockRenderer key={i} block={b} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseStudiesPage;
