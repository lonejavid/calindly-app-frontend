import { ENV } from "@/lib/get-env";

/** URL used for “Book demo / Book meeting” CTAs (from `VITE_BOOK_MEETING_URL`). */
export function getBookMeetingUrl(): string {
  return ENV.VITE_BOOK_MEETING_URL.trim();
}

/** Open book-a-meeting URL in a new tab. */
export function openBookMeeting(): void {
  const url = getBookMeetingUrl();
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}
