import IntegrationCard from "./_components/integration-card";
import { useQuery } from "@tanstack/react-query";
import { getAllIntegrationQueryFn } from "@/lib/api";
import { Loader } from "@/components/loader";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Integrations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const zoom = searchParams.get("zoom");
    const google = searchParams.get("google");
    const err = searchParams.get("error");
    if (zoom === "connected") {
      toast.success("Zoom connected successfully.");
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("zoom");
          return next;
        },
        { replace: true },
      );
    } else if (google === "connected") {
      toast.success("Google Calendar connected successfully.");
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("google");
          return next;
        },
        { replace: true },
      );
    } else if (err === "zoom_callback_failed") {
      toast.error(
        "Zoom connection failed. Check backend logs and redirect URL.",
      );
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("error");
          return next;
        },
        { replace: true },
      );
    } else if (err === "google_callback_failed") {
      toast.error(
        "Google connection failed. Check backend logs and redirect URL.",
      );
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("error");
          return next;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["integration_list"],
    queryFn: getAllIntegrationQueryFn,
  });

  const integrations = data?.integrations || [];

  return (
    <div className="b2b-page flex flex-col gap-4">
      <ErrorAlert isError={isError} error={error} />

      <div className="overflow-hidden bg-[var(--white)]">
        <div className="b2b-page px-4 py-4">
          {isFetching || isError ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)]/40">
              <Loader size="lg" color="black" />
            </div>
          ) : (
            <ul className="m-0 list-none space-y-3 p-0 sm:space-y-4">
              {integrations.map((integration) => (
                <li key={integration.app_type}>
                  <IntegrationCard
                    appType={integration.app_type}
                    title={integration.title}
                    isConnected={integration.isConnected}
                    isDisabled={
                      integration.app_type === "GOOGLE_MEET_AND_CALENDAR" ||
                      integration.app_type === "MICROSOFT_TEAMS" ||
                      integration.app_type === "ZOOM_MEETING" ||
                      integration.app_type === "OUTLOOK_CALENDAR"
                        ? false
                        : true
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
