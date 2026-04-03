import { Loader } from "@/components/loader";

/** Shown while lazy route chunks load. */
export function RoutePageFallback() {
  return (
    <div
      className="flex min-h-[50dvh] w-full flex-1 items-center justify-center bg-[var(--white)]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <Loader size="lg" className="scale-125" />
    </div>
  );
}
