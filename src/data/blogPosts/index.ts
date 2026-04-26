import type { BlogPost } from "./types";
import { blog01 } from "./posts/01-spam-bookings";
import { blog02 } from "./posts/02-comparison";
import { blog03 } from "./posts/03-fake-emails";
import { blog04 } from "./posts/04-five-signs";
import { blog05 } from "./posts/05-calendar-funnel";
import { blog06 } from "./posts/06-ai-outreach";
import { blog07 } from "./posts/07-pipeline-generation";
import { blog08 } from "./posts/08-hiring-infrastructure";
import { blog09 } from "./posts/09-calendar-intelligence";

export type { BlogPost, BlogPostMeta, BlogBlock } from "./types";

export const blogPosts: BlogPost[] = [
  blog01,
  blog02,
  blog03,
  blog04,
  blog05,
  blog06,
  blog07,
  blog08,
  blog09,
];

/** Slugs for “Blog 1” … “Blog 9” series tables (same order as `blogPosts` above). */
export const BLOG_SERIES_SLUGS: readonly string[] = blogPosts.map((p) => p.slug);

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Deterministic shuffle so the same post always shows the same “random” picks until slugs change. */
function shuffleWithSeed<T>(items: T[], seedStr: string): T[] {
  const arr = [...items];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = (seed >>> 0) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Three other posts for “continue reading” (excludes current slug). */
export function getContinueReadingPosts(excludeSlug: string, count = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== excludeSlug);
  if (others.length === 0) return [];
  const shuffled = shuffleWithSeed(others, `${excludeSlug}:${others.length}`);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
