import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { BlogBlock } from "@/data/blogPosts";
import { BLOG_SERIES_SLUGS } from "@/data/blogPosts";
import { BLOG_ROUTE } from "@/routes/common/routePaths";
import { SITE_ORIGIN } from "@/lib/site";

/** Matches schedley.com with optional protocol, www, and path (blog bodies only). */
const SCHEDLEY_HOST_RE = /\b(?:https?:\/\/)?(?:www\.)?schedley\.com(\/[\w\-./?%&=#]*)?\b/gi;

/**
 * Turns schedley.com (and www / https variants) into links to SITE_ORIGIN.
 * Does not alter other domains.
 */
function linkifySchedleyHost(segment: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  const re = new RegExp(SCHEDLEY_HOST_RE.source, SCHEDLEY_HOST_RE.flags);
  let match: RegExpExecArray | null;
  while ((match = re.exec(segment)) !== null) {
    if (match.index > last) {
      nodes.push(<span key={`${keyPrefix}-s-${last}`}>{segment.slice(last, match.index)}</span>);
    }
    const rawPath = match[1];
    const suffix =
      rawPath && rawPath !== "/" ? (rawPath.startsWith("/") ? rawPath : `/${rawPath}`) : "/";
    const href = suffix === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${suffix}`;
    nodes.push(
      <a
        key={`${keyPrefix}-a-${match.index}`}
        href={href}
        className="font-medium text-[var(--blue)] underline-offset-2 hover:underline"
        rel="noopener noreferrer"
      >
        {match[0]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < segment.length) {
    nodes.push(<span key={`${keyPrefix}-s-end`}>{segment.slice(last)}</span>);
  }
  return nodes.length ? nodes : [<span key={`${keyPrefix}-empty`}>{segment}</span>];
}

/** Renders `**bold**` segments and linkifies schedley.com inside each segment. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="font-semibold text-[var(--ink)]">
              {linkifySchedleyHost(m[1], `b${i}`)}
            </strong>
          );
        }
        return <span key={i}>{linkifySchedleyHost(part, `p${i}`)}</span>;
      })}
    </>
  );
}

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="w-full min-w-0 space-y-5 text-[var(--ink-soft)] text-base sm:text-[17px] leading-relaxed">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i}>
              <RichText text={block.text} />
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="b2b-display text-2xl sm:text-[1.65rem] text-[var(--ink)] pt-4 first:pt-0 scroll-mt-28"
            >
              <RichText text={block.text} />
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="text-lg sm:text-xl font-semibold text-[var(--ink)] pt-2 scroll-mt-28">
              <RichText text={block.text} />
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 sm:pl-6 marker:text-[var(--blue)]">
              {block.items.map((item, j) => (
                <li key={j}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "blockquote") {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-[var(--blue)] bg-[var(--surface)] py-4 pl-5 pr-4 text-[var(--ink-mid)] not-italic sm:pl-6"
            >
              <p className="leading-relaxed">
                <RichText text={block.quote} />
              </p>
              {block.attribution ? (
                <footer className="mt-3 text-sm text-[var(--ink-muted)]">— {block.attribution}</footer>
              ) : null}
            </blockquote>
          );
        }
        if (block.type === "callout") {
          return (
            <aside
              key={i}
              className="rounded-[var(--r-l)] border border-[var(--line-strong)] bg-[var(--blue-lite)] px-5 py-4 text-[var(--ink-mid)] sm:px-6"
            >
              <p className="leading-relaxed">
                <span className="mr-2" aria-hidden>
                  💡
                </span>
                <RichText text={block.text} />
              </p>
            </aside>
          );
        }
        if (block.type === "table") {
          return (
            <div key={i} className="w-full overflow-x-auto rounded-[var(--r-l)] border border-[var(--line)] shadow-sm">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm sm:text-[15px]">
                <thead>
                  <tr className="border-b border-[var(--line)] bg-[var(--surface)]">
                    {block.headers.map((h, hi) => (
                      <th
                        key={hi}
                        className="px-3 py-3 font-semibold text-[var(--ink)] sm:px-4"
                        scope="col"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-[var(--line)] last:border-0 odd:bg-[var(--white)] even:bg-[var(--surface)]/60">
                      {row.map((cell, ci) => {
                        const slug =
                          block.linkBlogSeries && ci === 0 ? BLOG_SERIES_SLUGS[ri] : undefined;
                        const linked = Boolean(slug && slug.length > 0);
                        return (
                          <td key={ci} className="px-3 py-2.5 align-top text-[var(--ink-soft)] sm:px-4">
                            {linked ? (
                              <Link
                                to={`${BLOG_ROUTE}/${slug}`}
                                className="font-semibold text-[var(--blue)] underline-offset-2 hover:underline"
                              >
                                {cell}
                              </Link>
                            ) : (
                              <RichText text={cell} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
