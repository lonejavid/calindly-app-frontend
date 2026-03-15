import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const effects = [
  "fade-up",
  "fade-up-slow",
  "slide-left",
  "slide-right",
  "zoom-in",
  "blur-in",
  "tilt-up",
] as const;

export type SectionRevealEffect = (typeof effects)[number];

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  effect?: SectionRevealEffect;
};

export function SectionReveal({ children, className = "", effect = "fade-up" }: SectionRevealProps) {
  const { ref, visible } = useScrollReveal({ once: true });

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal",
        `scroll-reveal--${effect}`,
        visible && "scroll-reveal--visible",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Cycle through effects by section index so each block feels distinct */
export function sectionEffectForIndex(i: number): SectionRevealEffect {
  return effects[i % effects.length];
}

export default SectionReveal;
