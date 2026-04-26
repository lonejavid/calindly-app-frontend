export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "blockquote"; quote: string; attribution?: string }
  | { type: "callout"; text: string }
  | { type: "table"; headers: string[]; rows: string[][]; linkBlogSeries?: boolean };

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  readMinutes: number;
  category: string;
};

export type BlogPost = BlogPostMeta & {
  blocks: BlogBlock[];
};
