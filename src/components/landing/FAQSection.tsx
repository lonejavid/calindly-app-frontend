import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal, { type SectionRevealEffect } from "@/components/SectionReveal";

export type FAQItem = { q: string; a: string };

type FAQSectionProps = {
  eyebrow?: string;
  titleBefore: string;
  titleAccent?: string;
  subtitle?: string;
  items: FAQItem[];
  containerClass?: string;
  sectionClassName?: string;
  /** Card background: 'white' or 'surface'. Default 'white'. */
  cardVariant?: "white" | "surface";
  scrollEffect?: SectionRevealEffect;
  useScrollEffect?: boolean;
};

const defaultContainerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

export function FAQSection({
  eyebrow = "FAQ",
  titleBefore,
  titleAccent,
  subtitle,
  items,
  containerClass = defaultContainerClass,
  sectionClassName = "py-16 sm:py-20 lg:py-24 bg-[var(--surface)]",
  cardVariant = "white",
  scrollEffect = "fade-up",
  useScrollEffect = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const cardBg = cardVariant === "surface" ? "bg-[var(--surface)]" : "bg-[var(--white)]";

  const content = (
    <>
      <SectionHeader
        eyebrow={eyebrow}
        titleBefore={titleBefore}
        titleAccent={titleAccent}
        subtitle={subtitle}
        className="mb-12"
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map(({ q, a }, index) => {
          const isOpen = openIndex === index;
          const num = index + 1;
          return (
            <div
              key={q}
              className={`${cardBg} rounded-[var(--r-m)] border border-[var(--line)] overflow-hidden`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer hover:bg-[var(--blue-ghost)] transition-colors"
              >
                <span className="flex items-center gap-3 shrink-0">
                  <span className="flex h-9 w-9 rounded-[var(--r-s)] bg-[var(--blue)] text-white items-center justify-center">
                    <HelpCircle className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <span className="text-[var(--blue)] font-bold tabular-nums">{num}.</span>
                </span>
                <h3 className="font-semibold text-[var(--ink)] pr-4 flex-1 min-w-0">{q}</h3>
                <span className="shrink-0 text-[var(--ink-muted)]">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed pl-14">{a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <section className={sectionClassName}>
      <div className={containerClass}>
        {useScrollEffect ? (
          <SectionReveal effect={scrollEffect}>{content}</SectionReveal>
        ) : (
          content
        )}
      </div>
    </section>
  );
}

export default FAQSection;
