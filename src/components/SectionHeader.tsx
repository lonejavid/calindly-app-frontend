/**
 * Reusable section header: pill label + headline with optional blue accent + subtitle.
 * Use on landing sections for consistent "section-start" pattern.
 */
export const SectionHeader = ({
  eyebrow,
  titleBefore,
  titleAccent,
  subtitle,
  variant = "default",
  className = "",
  headingId,
  compact = false,
}: {
  eyebrow?: string;
  titleBefore: string;
  titleAccent?: string;
  subtitle?: string;
  variant?: "default" | "light";
  className?: string;
  /** For aria-labelledby on parent <section> */
  headingId?: string;
  /** Tighter spacing and smaller type (e.g. problem section) */
  compact?: boolean;
}) => (
  <div className={`text-center max-w-3xl mx-auto ${className}`}>
    {eyebrow && (
      <span
        className={`font-urbanist inline-flex rounded-full border font-semibold uppercase tracking-[0.15em] ${
          compact
            ? "px-3 py-1 text-[10px] sm:text-[11px] mb-3 sm:mb-4"
            : "px-4 py-1.5 text-[11px] sm:text-xs mb-6"
        } ${
          variant === "light"
            ? "border-white/30 bg-white/[0.08] text-white/95"
            : "border-[var(--blue)]/20 bg-[var(--blue-ghost)] text-[var(--blue)]"
        }`}
      >
        {eyebrow}
      </span>
    )}
    <h2
      id={headingId}
      className={`font-urbanist font-bold tracking-tight leading-[1.12] px-1 sm:px-0 ${
        compact
          ? "text-[1.35rem] xs:text-2xl sm:text-3xl lg:text-[2rem] mb-2 sm:mb-3"
          : "text-[1.65rem] xs:text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-5"
      } ${variant === "light" ? "text-white" : "text-[var(--ink)]"}`}
    >
      {titleBefore}
      {titleAccent != null && titleAccent !== "" && (
        <span className={variant === "light" ? "text-white drop-shadow-sm" : "text-[var(--blue)]"}>
          {titleAccent}
        </span>
      )}
    </h2>
    {subtitle && (
      <p
        className={`font-urbanist max-w-2xl mx-auto px-1 sm:px-0 ${
          variant === "light"
            ? "text-white/90 text-[15px] sm:text-base md:text-lg leading-relaxed"
            : "text-[var(--ink-muted)] text-[15px] sm:text-base md:text-lg leading-relaxed"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);
