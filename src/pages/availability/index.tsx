import { useQuery } from "@tanstack/react-query";
import WeeklyHoursRow from "./_components/weekly-hours";
import { getUserAvailabilityQueryFn } from "@/lib/api";
import { Loader } from "@/components/loader";
import { ErrorAlert } from "@/components/ErrorAlert";

const Availability = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user_availability"],
    queryFn: getUserAvailabilityQueryFn,
  });

  const availability = data?.availability;
  const originalDays = availability?.days || [];
  const timeGap = availability?.timeGap || 30;
  const backendTimezone = availability?.timezone;

  return (
    <div className="b2b-page flex flex-col gap-4 p-4">
      <ErrorAlert isError={isError} error={error} />

      {isLoading || isError ? (
        <div className="flex min-h-[40vh] items-center justify-center rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--white)]">
          <Loader size="lg" color="black" />
        </div>
      ) : (
        <div className="overflow-hidden bg-[var(--white)]">
          <div className="bg-[var(--surface)]/70 px-5 sm:px-6">
          </div>
          <div className="b2b-page">
            <WeeklyHoursRow
              days={originalDays}
              timeGap={timeGap}
              userTimezone={backendTimezone}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Availability;
