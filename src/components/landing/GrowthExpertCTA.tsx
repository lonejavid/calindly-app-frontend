import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Calendar, Target, TrendingUp, Users, Play } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal, { type SectionRevealEffect } from "@/components/SectionReveal";

type GrowthExpertCTAProps = {
  eyebrow?: string;
  titleBefore: string;
  titleAccent?: string;
  subtitle?: string;
  buttonText: string;
  onButtonClick: () => void;
  /** Icon component to render inside the button (e.g. Play, UserPlus). Default: Play */
  buttonIcon?: ReactNode;
  /** Optional: custom privacy text. If provided, replaces default Privacy Policy line. Pass null to hide. */
  privacySlot?: ReactNode | null;
  /** Optional: content between header and button (e.g. feature cards). */
  middleSlot?: ReactNode;
  /** Optional: custom top icon row. If not provided, uses default 4 icons (Calendar, Target, TrendingUp, Users). */
  topIcons?: ReactNode;
  containerClass?: string;
  sectionClassName?: string;
  scrollEffect?: SectionRevealEffect;
  useScrollEffect?: boolean;
};

const defaultContainerClass = "max-w-[1200px] w-full min-w-0 mx-auto px-4 sm:px-6 lg:px-8";

const defaultPrivacySlot = (
  <p className="text-sm text-white/70 text-center">
    We keep any info you share with us private and confidential. For more on how we process and
    protect your data, please review Schedley's{" "}
    <Link to="/privacy" className="text-white underline hover:no-underline">
      Privacy Policy
    </Link>
    .
  </p>
);

const defaultTopIcons = (
  <>
    <span
      className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white/90"
      aria-hidden
    >
      <Calendar className="w-6 h-6" />
    </span>
    <span
      className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white/90"
      aria-hidden
    >
      <Target className="w-6 h-6" />
    </span>
    <span
      className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white/90"
      aria-hidden
    >
      <TrendingUp className="w-6 h-6" />
    </span>
    <span
      className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white/90"
      aria-hidden
    >
      <Users className="w-6 h-6" />
    </span>
  </>
);

export function GrowthExpertCTA({
  eyebrow = "Get Started",
  titleBefore,
  titleAccent,
  subtitle,
  buttonText,
  onButtonClick,
  buttonIcon = <Play className="w-5 h-5" />,
  privacySlot = defaultPrivacySlot,
  middleSlot,
  topIcons = defaultTopIcons,
  containerClass = defaultContainerClass,
  sectionClassName = "py-12 sm:py-20 lg:py-24 bg-[var(--blue)] text-white relative overflow-x-hidden",
  scrollEffect = "zoom-in",
  useScrollEffect = true,
}: GrowthExpertCTAProps) {
  const content = (
    <>
      <div className="relative z-10 flex justify-center gap-4 xs:gap-6 sm:gap-8 mb-6 flex-wrap px-1">
        {topIcons}
      </div>
      <SectionHeader
        variant="light"
        eyebrow={eyebrow}
        titleBefore={titleBefore}
        titleAccent={titleAccent}
        subtitle={subtitle}
        className="mb-8 relative z-10"
      />
      {middleSlot && <div className="mb-8 relative z-10">{middleSlot}</div>}
      <div className="flex justify-center mb-8 relative z-10 px-2">
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex w-full max-w-md sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[var(--r-m)] text-sm sm:text-base font-semibold bg-[var(--white)] text-[var(--blue)] transition-all duration-200 cursor-pointer hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl hover:bg-[var(--white)] active:scale-[1.02] touch-manipulation"
          style={{ boxShadow: "var(--sh-lg)" }}
        >
          {buttonIcon}
          {buttonText}
        </button>
      </div>
      {privacySlot != null && <div className="relative z-10">{privacySlot}</div>}
    </>
  );

  return (
    <section className={sectionClassName}>
      <div className={`${containerClass} relative z-10 max-w-[min(100%,800px)]`}>
        {/* Decorative gradient orbs for depth */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        </div>
        {useScrollEffect ? (
          <SectionReveal effect={scrollEffect}>{content}</SectionReveal>
        ) : (
          content
        )}
      </div>
    </section>
  );
}

export default GrowthExpertCTA;
