import useMeetingFilter from "@/hooks/use-meeting-filter";
import { cn } from "@/lib/utils";

const TabHeader = () => {
  const { PeriodEnum, period, setPeriod } = useMeetingFilter();

  const tabs = [
    { id: PeriodEnum.UPCOMING, label: "Upcoming" },
    { id: PeriodEnum.PAST, label: "Past" },
    { id: PeriodEnum.CANCELLED, label: "Cancelled" },
  ] as const;

  return (
    <div className="b2b-page border-b border-[var(--line)] bg-[var(--surface)]/60 px-4 py-4 sm:px-4">
      <div
        className="inline-flex w-full max-w-xl flex-wrap gap-2 rounded-[var(--r-m)] border border-[var(--line)] bg-[var(--white)] p-1.5 sm:inline-flex sm:w-auto"
        role="tablist"
        aria-label="Meeting period"
      >
        {tabs.map(({ id, label }) => {
          const active = period === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPeriod(id)}
              className={cn(
                "min-h-[44px] flex-1 rounded-[var(--r-s)] px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-6",
                active
                  ? "border-2 border-[var(--blue)] bg-[var(--blue-lite)] text-[var(--blue-deep)] shadow-[var(--sh-sm)]"
                  : "border-2 border-transparent text-[var(--ink-mid)] hover:border-[var(--line)] hover:bg-[var(--surface)]",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabHeader;
