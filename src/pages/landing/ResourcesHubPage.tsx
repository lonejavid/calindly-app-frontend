import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Library } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import {
  BLOG_ROUTE,
  CASE_STUDIES_ROUTE,
  RESOURCE_HUB_ROUTE,
  resourceGuidePath,
} from "@/routes/common/routePaths";
import { resourceGuideNavLinks } from "@/data/resourceGuides/navLinks";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const ResourcesHubPage = () => {
  useSeoMeta({
    title: "Resources — Schedley",
    description:
      "Blog, customer case studies, and in-depth guides (Schedley vs Calendly, Acuity, and the broader scheduling landscape).",
    pathname: RESOURCE_HUB_ROUTE,
  });

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="pt-12 sm:pt-16 pb-10 sm:pb-14 border-b border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--white)]">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <div className="b2b-eyebrow mb-4">
              <span className="b2b-eyebrow-line" aria-hidden />
              <span className="b2b-eyebrow-text uppercase tracking-wider text-[var(--ink-muted)]">
                Schedley
              </span>
            </div>
            <h1 className="b2b-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--ink)] tracking-tight">Resources</h1>
            <p className="mt-4 max-w-3xl text-[var(--ink-muted)] text-base sm:text-lg leading-relaxed">
              Blog posts, customer case studies, and in-depth guides that show how Schedley compares to popular scheduling
              tools—same ideas as our Word reports, formatted for the web.
            </p>
          </div>
        </section>
        <section className="py-12 sm:py-16">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <li>
                <Link
                  to={BLOG_ROUTE}
                  className="group flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 shadow-sm transition-all hover:border-[var(--blue)]/40 hover:shadow-[var(--sh-md)]"
                >
                  <Library className="h-9 w-9 text-[var(--blue)]" aria-hidden />
                  <h2 className="mt-4 text-xl font-bold text-[var(--ink)] group-hover:text-[var(--blue)]">Blog</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    Product insights, scheduling strategy, and how Schedley services fit your funnel.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--blue)]">
                    Open blog
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={CASE_STUDIES_ROUTE}
                  className="group flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 shadow-sm transition-all hover:border-[var(--blue)]/40 hover:shadow-[var(--sh-md)]"
                >
                  <BookOpen className="h-9 w-9 text-[var(--blue)]" aria-hidden />
                  <h2 className="mt-4 text-xl font-bold text-[var(--ink)] group-hover:text-[var(--blue)]">Case studies</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    Composite stories from teams and solo pros using AI Outreach, Pipeline, Hiring, and Calendar
                    Intelligence.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--blue)]">
                    View case studies
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
              <li className="md:col-span-1">
                <div className="flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                  <FileText className="h-9 w-9 text-[var(--blue)]" aria-hidden />
                  <h2 className="mt-4 text-xl font-bold text-[var(--ink)]">Guides</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                    Long-form evaluations—Schedley vs Calendly, Acuity, and the broader scheduling landscape.
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {resourceGuideNavLinks.map((g) => (
                      <li key={g.slug}>
                        <Link
                          to={resourceGuidePath(g.slug)}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--blue)] hover:underline"
                        >
                          {g.navLabel}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                        </Link>
                        <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{g.navDescription}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResourcesHubPage;
