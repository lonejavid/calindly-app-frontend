import { Calendar } from "lucide-react";

const EmptyPanel = (props: { title: string }) => {
  const { title = "No upcoming meetings" } = props;
  return (
    <div className="b2b-page flex flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[320px] sm:py-20">
      <div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--surface)] shadow-[var(--sh-sm)] sm:h-28 sm:w-28"
        aria-hidden
      >
        <div className="relative">
          <Calendar
            className="h-12 w-12 text-[var(--blue)] sm:h-14 sm:w-14"
            strokeWidth={1.5}
          />
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[var(--white)] bg-[var(--ink-muted)] px-1 text-[10px] font-bold text-white">
            0
          </span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-[var(--ink)] sm:text-xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm font-normal leading-relaxed text-[var(--ink-muted)]">
        When bookings come in, they&apos;ll show up here for this tab.
      </p>
    </div>
  );
};

export default EmptyPanel;
