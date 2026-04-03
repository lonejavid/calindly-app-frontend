/** Calendly (or other) URL opened for “Book demo / Book meeting” across the app. */
export const DEFAULT_BOOK_MEETING_URL = import.meta.env.VITE_BOOK_MEETING_URL;

/** Frontend env. Defaults match backed_end_schedley (port 8000). Use .env to point to local backend. */
export const ENV = {
  VITE_API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api",
  VITE_GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
  VITE_APP_ORIGIN:
    import.meta.env.VITE_APP_ORIGIN ?? "http://localhost:3000",
  VITE_BOOK_MEETING_URL:
    import.meta.env.VITE_BOOK_MEETING_URL ?? DEFAULT_BOOK_MEETING_URL,
};
