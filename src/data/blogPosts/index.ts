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

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
