import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating?: number;
}

const CONTAINER_CLASS =
  "max-w-[1200px] w-full min-w-0 mx-auto px-4 xs:px-5 sm:px-6 lg:px-8";

export interface WhatClientsSayProps {
  testimonials: TestimonialItem[];
  /** Section title, e.g. "What clients say" */
  title?: string;
  /** Optional eyebrow label above title (section-header style) */
  eyebrow?: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Auto-advance interval in ms; set to 0 to disable. Default 5000 */
  autoSlideInterval?: number;
}

/**
 * Reusable "What clients say" testimonial carousel.
 * Always uses bg-[var(--ink)] for consistent dark section across landing pages.
 */
export const WhatClientsSay = ({
  testimonials,
  title = "What clients say",
  eyebrow,
  subtitle,
  autoSlideInterval = 5000,
}: WhatClientsSayProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (autoSlideInterval <= 0 || testimonials.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      autoSlideInterval
    );
    return () => clearInterval(t);
  }, [autoSlideInterval, testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[index];
  const rating = current?.rating ?? 5;

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[var(--ink)] text-white overflow-x-hidden">
      <div className={CONTAINER_CLASS}>
        <div className="text-center mb-6">
          {eyebrow && (
            <span className="inline-flex rounded-full border border-white/40 bg-white/10 text-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4">
              {eyebrow}
            </span>
          )}
          <div className="flex items-center justify-center gap-3">
            <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--blue-mid)] shrink-0" aria-hidden />
            <p className="text-[var(--blue-mid)] font-semibold text-lg sm:text-xl">
              {title}
            </p>
          </div>
        </div>
        {subtitle && (
          <p className="text-white/70 text-center mb-6 max-w-2xl mx-auto text-sm">
            {subtitle}
          </p>
        )}
        {!subtitle && <div className="mb-6" />}
        <div className="relative max-w-3xl w-full min-w-0 mx-auto">
          <div className="relative rounded-[var(--r-l)] bg-[var(--ink-mid)]/50 border border-white/10 p-5 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[260px] flex flex-col">
            <Quote
              className="w-9 h-9 sm:w-10 sm:h-10 text-[var(--blue-mid)]/60 shrink-0 mb-3 sm:mb-4"
              aria-hidden
            />
            <div
              className="absolute top-5 right-5 sm:top-8 sm:right-8 flex gap-0.5"
              aria-label={`${rating} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    n <= Math.round(rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-white/20 fill-white/20"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
            <blockquote className="text-base sm:text-lg md:text-xl leading-relaxed mb-5 sm:mb-6 flex-1 pr-12 sm:pr-16 min-w-0">
              {current?.quote}
            </blockquote>
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 min-w-0">
              <img
                src={current?.avatar}
                alt=""
                className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
              />
              <div className="min-w-0 text-left">
                <p className="font-semibold text-white break-words">{current?.name}</p>
                <p className="text-sm text-white/70 break-words">{current?.role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--blue-mid)] bg-transparent text-[var(--blue-mid)] hover:bg-[var(--blue-mid)]/20 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === index
                      ? "w-6 bg-[var(--blue-mid)]"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i + 1) % testimonials.length)
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--blue-mid)] bg-transparent text-[var(--blue-mid)] hover:bg-[var(--blue-mid)]/20 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
