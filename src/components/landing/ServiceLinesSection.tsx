import { type LucideIcon, Layers, CheckCircle } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal, { type SectionRevealEffect } from "@/components/SectionReveal";

export type ServiceLine = { title: string; items: string[] };

type ServiceLinesSectionProps = {
  eyebrow?: string;
  titleBefore: string;
  titleAccent?: string;
  subtitle?: string;
  lines: ServiceLine[];
  icon?: LucideIcon;
  containerClass?: string;
  sectionClassName?: string;
  scrollEffect?: SectionRevealEffect;
  /** If false, no SectionReveal wrapper is used. Default true. */
  useScrollEffect?: boolean;
};

const defaultContainerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

export function ServiceLinesSection({
  eyebrow,
  titleBefore,
  titleAccent,
  subtitle,
  lines,
  icon: Icon = Layers,
  containerClass = defaultContainerClass,
  sectionClassName = "py-16 sm:py-20 lg:py-24 bg-[var(--surface)]",
  scrollEffect = "slide-right",
  useScrollEffect = true,
}: ServiceLinesSectionProps) {
  const content = (
    <>
      <SectionHeader
        eyebrow={eyebrow}
        titleBefore={titleBefore}
        titleAccent={titleAccent}
        subtitle={subtitle}
        className="mb-12"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lines.map(({ title, items }) => (
          <div key={title} className="bg-[var(--white)] rounded-[var(--r-l)] p-6 border border-[var(--line)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-[var(--r-m)] bg-[var(--blue-lite)] flex items-center justify-center text-[var(--blue)]">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[var(--ink)]">{title}</h4>
            </div>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--ink-muted)]">
                  <span
                    className="flex h-5 w-5 shrink-0 mt-0.5 rounded-full bg-[var(--blue)] border border-[var(--blue-dark)] items-center justify-center"
                    aria-hidden
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[var(--white)]" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
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

export default ServiceLinesSection;
