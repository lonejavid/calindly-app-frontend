import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { getBlogPostBySlug, getContinueReadingPosts } from "@/data/blogPosts";
import { BLOG_ROUTE } from "@/routes/common/routePaths";
import { canonicalUrl } from "@/lib/site";
import { defaultSocialImageUrl } from "@/lib/seoDefaults";
import { openBookMeeting } from "@/lib/book-meeting";
import { BlogContent } from "./BlogContent";
import { BlogContinueReading } from "./BlogContinueReading";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useJsonLdScript } from "@/hooks/useJsonLdScript";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00`));
  } catch {
    return iso;
  }
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const pagePath = slug ? `${BLOG_ROUTE}/${slug}` : BLOG_ROUTE;
  const shareImage = useMemo(() => defaultSocialImageUrl(), []);

  useSeoMeta({
    title: post ? `${post.title} — Schedley` : "Blog — Schedley",
    description:
      post?.description ??
      "Product insights, scheduling strategy, and how Schedley helps B2B teams protect the calendar and grow pipeline.",
    pathname: pagePath,
    ogType: "article",
    imageUrl: shareImage,
  });

  const jsonLdStr = useMemo(() => {
    if (!post) return null;
    const url = canonicalUrl(`${BLOG_ROUTE}/${post.slug}`);
    const blogIndex = canonicalUrl(BLOG_ROUTE);
    const home = canonicalUrl("/");
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url,
          image: [shareImage],
          author: {
            "@type": "Organization",
            name: "Schedley",
          },
          publisher: {
            "@type": "Organization",
            name: "Schedley",
            logo: {
              "@type": "ImageObject",
              url: shareImage,
            },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: home },
            { "@type": "ListItem", position: 2, name: "Blog", item: blogIndex },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        },
      ],
    });
  }, [post, shareImage]);

  useJsonLdScript("schedley-blog-jsonld", jsonLdStr);

  const continueReading = useMemo(
    () => (post ? getContinueReadingPosts(post.slug, 3) : []),
    [post],
  );

  if (!slug || !post) {
    return <Navigate to={BLOG_ROUTE} replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <article>
          <header className="pt-8 sm:pt-10 pb-10 sm:pb-12 border-b border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--white)]">
            <div className={LANDING_PAGE_CONTAINER_CLASS}>
              <Link
                to={BLOG_ROUTE}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)] hover:underline mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] rounded-sm"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden />
                Back to blog
              </Link>
              <div className="w-full min-w-0 max-w-none">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--blue)] mb-3">
                  {post.category}
                </p>
                <h1 className="b2b-display text-3xl sm:text-4xl lg:text-[2.6rem] text-[var(--ink)] tracking-tight leading-tight">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg text-[var(--ink-muted)] leading-relaxed">{post.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-[var(--blue)] shrink-0" aria-hidden />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[var(--blue)] shrink-0" aria-hidden />
                    {post.readMinutes} min read
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div
            className={`${LANDING_PAGE_CONTAINER_CLASS} py-10 sm:py-14`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <div className="w-full min-w-0 max-w-none">
              <BlogContent blocks={post.blocks} />
            </div>
          </div>

          <BlogContinueReading posts={continueReading} />

          <footer className="bg-[var(--surface)] py-12 sm:py-14">
            <div className={LANDING_PAGE_CONTAINER_CLASS}>
              <div className="w-full min-w-0 max-w-none rounded-[var(--r-l)] border border-[var(--line-strong)] bg-[var(--white)] p-8 sm:p-10 shadow-[var(--sh-sm)]">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--ink)] tracking-tight">
                  Put these ideas into practice
                </h2>
                <p className="mt-3 text-[var(--ink-muted)] leading-relaxed">
                  See how Schedley combines intelligent scheduling, pipeline generation, and optional managed
                  services for B2B teams that cannot afford noisy calendars.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openBookMeeting()}
                    className="inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    style={{ background: "var(--blue)", boxShadow: "var(--sh-blue)" }}
                  >
                    Book a demo
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-base font-semibold text-[var(--blue)] border-2 border-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage;
