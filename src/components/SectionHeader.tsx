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
}: {
  eyebrow?: string;
  titleBefore: string;
  titleAccent?: string;
  subtitle?: string;
  variant?: "default" | "light";
  className?: string;
}) => (
  <div className={`text-center max-w-3xl mx-auto ${className}`}>
    {eyebrow && (
      <span
        className={`font-urbanist inline-flex rounded-full border px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] mb-6 ${
          variant === "light"
            ? "border-white/30 bg-white/[0.08] text-white/95"
            : "border-[var(--blue)]/20 bg-[var(--blue-ghost)] text-[var(--blue)]"
        }`}
      >
        {eyebrow}
      </span>
    )}
    <h2
      className={`font-urbanist font-bold text-3xl sm:text-4xl lg:text-5xl mb-5 tracking-tight leading-[1.12] ${
        variant === "light" ? "text-white" : "text-[var(--ink)]"
      }`}
    >
      {titleBefore}
      {titleAccent != null && titleAccent !== "" && (
        <span className={variant === "light" ? "text-white drop-shadow-sm" : "text-[var(--blue)]"}>
          {titleAccent}
        </span>
      )}
    </h2>
    {subtitle && (
      <p className={`font-urbanist ${variant === "light" ? "text-white/90 text-lg leading-relaxed" : "text-[var(--ink-muted)] text-lg leading-relaxed"}`}>
        {subtitle}
      </p>
    )}
  </div>
);
