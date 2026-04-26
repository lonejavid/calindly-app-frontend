import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import { BLOG_ROUTE } from "@/routes/common/routePaths";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";

type Props = { posts: BlogPost[] };

export function BlogContinueReading({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section
      className="border-t border-[var(--line)] bg-[var(--surface)] py-10 sm:py-12"
      aria-labelledby="blog-continue-heading"
    >
      <div className={LANDING_PAGE_CONTAINER_CLASS}>
        <h2 id="blog-continue-heading" className="text-lg font-semibold text-[var(--ink)] sm:text-xl">
          Continue reading
        </h2>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">More posts from the Schedley blog</p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                to={`${BLOG_ROUTE}/${p.slug}`}
                className="group flex h-full min-h-[11rem] flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-5 shadow-sm transition-colors hover:border-[var(--blue)]/40 hover:shadow-[var(--sh-md)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--blue)]">{p.category}</p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--ink)] line-clamp-2 group-hover:text-[var(--blue)]">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-muted)] line-clamp-3">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--blue)]">
                  Read post
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
