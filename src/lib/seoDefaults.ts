import { SITE_ORIGIN } from "@/lib/site";

/** Root-relative asset used for OG/Twitter when no page-specific image exists (must exist under `public/`). */
export const DEFAULT_SOCIAL_IMAGE_PATH = "/schedley-logo.png";

export function defaultSocialImageUrl(): string {
  return `${SITE_ORIGIN}${DEFAULT_SOCIAL_IMAGE_PATH}`;
}

export const HOME_PAGE_SEO = {
  title: "Schedley — B2B lead generation, AI email & calendar you trust",
  description:
    "Schedley combines AI email validation, qualified pipeline, hiring support, and spam-resistant scheduling so revenue teams book real conversations—not junk.",
} as const;
