import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Library } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import {
  CONTACT_ROUTE,
  RESOURCE_HUB_ROUTE,
  SERVICE_ROUTES,
  resourceGuidePath,
} from "@/routes/common/routePaths";
import { resourceGuideNavLinks } from "@/data/resourceGuides/navLinks";
import { useSeoMeta } from "@/hooks/useSeoMeta";

/** Shared min-height on md+ so Blog / Case studies align with Guides column. */
const RESOURCE_CARD_MIN_H = "min-h-[380px] md:min-h-[420px]";

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
            <p className="mt-4 max-w-3xl text-sm sm:text-[15px] leading-relaxed text-[var(--ink-muted)]">
              <strong className="font-semibold text-[var(--ink)]">Schedley</strong> is built for B2B teams that need{" "}
              <Link to={SERVICE_ROUTES.AI_OUTREACH} className="font-medium text-[var(--blue)] hover:underline">
                AI outreach
              </Link>
              ,{" "}
              <Link to={SERVICE_ROUTES.PIPELINE_GENERATION} className="font-medium text-[var(--blue)] hover:underline">
                pipeline generation
              </Link>
              ,{" "}
              <Link to={SERVICE_ROUTES.HIRING_INFRASTRUCTURE} className="font-medium text-[var(--blue)] hover:underline">
                hiring infrastructure
              </Link>
              , and{" "}
              <Link to={SERVICE_ROUTES.CALENDAR_INTELLIGENCE} className="font-medium text-[var(--blue)] hover:underline">
                calendar intelligence
              </Link>
              . Start with a guide or post, then{" "}
              <Link to={CONTACT_ROUTE} className="font-medium text-[var(--blue)] hover:underline">
                contact us
              </Link>{" "}
              if you want a walkthrough.
            </p>
          </div>
        </section>
        <section className="py-12 sm:py-16">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <ul className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
              <li>
                <div
                  className={`flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 shadow-sm ${RESOURCE_CARD_MIN_H}`}
                >
                  <Library className="h-9 w-9 text-[var(--blue)]" aria-hidden />
                  <h2 className="mt-4 text-xl font-bold text-[var(--ink)]">Blog</h2>
                  <div className="mt-3 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-[var(--ink-muted)] sm:text-[15px]">
                    <p>
                      Deep dives on calendar hygiene, outbound and follow-up, hiring coordination, and how each Schedley
                      service fits a modern revenue stack—written for operators who need clear next steps, not generic
                      scheduling tips.
                    </p>
                    <p>
                      Use the posts to align your team on definitions (qualified vs. noisy pipeline, what “good” looks
                      like on a public booking link) before you change tooling or process.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className={`flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 shadow-sm ${RESOURCE_CARD_MIN_H}`}
                >
                  <BookOpen className="h-9 w-9 text-[var(--blue)]" aria-hidden />
                  <h2 className="mt-4 text-xl font-bold text-[var(--ink)]">Case studies</h2>
                  <div className="mt-3 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-[var(--ink-muted)] sm:text-[15px]">
                    <p>
                    Composite journeys across AI Outreach, Pipeline Generation, Hiring Infrastructure, and Calendar Intelligence—anonymized, with before/after workflows and key decisions.
                    </p>
                    <p>
                     They are not one-off testimonials; each story walks through constraints, what changed in the first
                     weeks, and how teams measured quality of meetings instead of vanity volume.
                    </p>
                  </div>
                </div>
              </li>
              <li className="md:col-span-1">
                <div
                  className={`flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm ${RESOURCE_CARD_MIN_H}`}
                >
                  <FileText className="h-9 w-9 text-[var(--blue)]" aria-hidden />
                  <h2 className="mt-4 text-xl font-bold text-[var(--ink)]">Guides</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                    Long-form evaluations—Schedley vs Calendly, Acuity, and the broader scheduling landscape.
                  </p>
                  <ul className="mt-4 flex flex-1 flex-col gap-2">
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
