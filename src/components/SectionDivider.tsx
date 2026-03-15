/**
 * Reusable section divider using theme colors.
 * Thick horizontal bar with gradient and angled end. Use between page sections.
 */
type SectionDividerProps = {
  className?: string;
};

const SectionDivider = ({ className = "" }: SectionDividerProps) => (
  <div
    className={`h-1.5 w-full ${className}`.trim()}
    style={{
      background: "linear-gradient(to bottom, var(--blue) 0%, var(--blue-dark) 100%)",
      clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
    }}
    aria-hidden
  />
);

export default SectionDivider;
