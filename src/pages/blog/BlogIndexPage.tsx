import { Link } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { getAllBlogPosts } from "@/data/blogPosts";
import { BLOG_ROUTE } from "@/routes/common/routePaths";
import { useSeoMeta } from "@/hooks/useSeoMeta";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00`));
  } catch {
    return iso;
  }
}

const BlogIndexPage = () => {
  const posts = getAllBlogPosts();

  useSeoMeta({
    title: "Blog — Schedley",
    description:
      "Product insights, scheduling strategy, pipeline, hiring, and calendar hygiene—how Schedley helps B2B teams book real conversations.",
    pathname: BLOG_ROUTE,
  });

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
                  Insights
                </span>
              </div>
              <h1 className="b2b-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--ink)] tracking-tight">
                Schedley blog
              </h1>
              <p className="mt-4 text-[var(--ink-muted)] text-base sm:text-lg leading-relaxed">
                Nine full-length posts from the Schedley master suite: spam prevention, Schedley vs. Calendly /
                Cal.com / SavvyCal, fake-email funnel cost, five signs you need a smarter tool, your calendar as a
                qualified lead funnel, AI Outreach, Pipeline Generation, Hiring Infrastructure, and Calendar
                Intelligence—covering services, competitors, and objections in one library.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <ul className="grid w-full min-w-0 grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="group flex h-full flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-200 hover:border-[var(--line-strong)] hover:shadow-[var(--sh-md)] sm:p-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--blue)]">
                      {post.category}
                    </p>
                    <h2 className="text-xl font-semibold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--blue)] sm:text-[1.28rem]">
                      <Link
                        to={`${BLOG_ROUTE}/${post.slug}`}
                        className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-muted)] sm:text-[15px]">
                      {post.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 shrink-0 text-[var(--blue)]" aria-hidden />
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 shrink-0 text-[var(--blue)]" aria-hidden />
                        {post.readMinutes} min read
                      </span>
                    </div>
                    <Link
                      to={`${BLOG_ROUTE}/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)] transition-all group-hover:gap-3"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogIndexPage;
