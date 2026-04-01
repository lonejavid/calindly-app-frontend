import { useQuery } from "@tanstack/react-query";
import TabHeader from "./_components/tab-header";
import TabPanel from "./_components/tab-panel";
import useMeetingFilter from "@/hooks/use-meeting-filter";
import { getUserMeetingsQueryFn } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";

const Meetings = () => {
  const { period } = useMeetingFilter();

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["userMeetings", period],
    queryFn: () => getUserMeetingsQueryFn(period),
  });
  const meetings = data?.meetings || [];

  return (
    <div className="b2b-page flex flex-col gap-4">
      <ErrorAlert isError={isError} error={error} />

      {isLoading || isError ? (
        <div className="flex min-h-[40vh] items-center justify-center rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--white)]">
          <Loader size="lg" color="black" />
        </div>
      ) : (
        <div className="w-full overflow-hidden bg-[var(--white)] shadow-[var(--sh-md)] h-[calc(100dvh-5rem)]">
          <TabHeader />
          <div className="b2b-page bg-[var(--white)] px-4 py-5 sm:px-6 sm:py-6">
            <TabPanel
              isFetching={isFetching}
              meetings={meetings}
              period={period}
              timezone={data?.timezone}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
