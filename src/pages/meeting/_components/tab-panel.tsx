


import { FC, useState } from "react";
import EmptyPanel from "./empty-panel";
import MeetingCard from "./meeting-card";
import { MeetingType, PeriodType } from "@/types/api.type";
import { Loader } from "@/components/loader";
import { PeriodEnum } from "@/hooks/use-meeting-filter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { ConfirmActionDialog } from "@/components/confirm-action-dialog";

interface PropsType {
  isFetching: boolean;
  period: PeriodType;
  meetings: MeetingType[];
  timezone?: string; // Added timezone prop
}

const TabPanel: FC<PropsType> = ({ period, meetings, isFetching, timezone }) => {
  const [pendingMeetingId, setPendingMeetingId] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<MeetingType | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: cancelMeetingMutationFn,
  });

  const confirmCancelMeeting = () => {
    if (!cancelTarget) return;
    const meetingId = cancelTarget.id;
    setPendingMeetingId(meetingId);
    mutate(meetingId, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["userMeetings"],
        });
        setPendingMeetingId(null);
        setCancelTarget(null);
        toast.success(
          response &&
            typeof response === "object" &&
            "message" in response &&
            typeof (response as { message?: unknown }).message === "string"
            ? (response as { message: string }).message
            : "Meeting cancelled successfully",
        );
      },
      onError: () => {
        setPendingMeetingId(null);
        toast.error("Failed to cancel meeting");
      },
    });
  };

  return (
    <div className="b2b-page w-full">
      <ConfirmActionDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            const cancellingThis =
              cancelTarget &&
              pendingMeetingId === cancelTarget.id &&
              isPending;
            if (!cancellingThis) setCancelTarget(null);
          }
        }}
        title="Cancel this meeting?"
        description={
          cancelTarget ? (
            <>
              This will cancel the booking with{" "}
              <span className="font-semibold text-[var(--ink)]">
                {cancelTarget.guestName}
              </span>{" "}
              for{" "}
              <span className="font-semibold text-[var(--ink)]">
                {cancelTarget.event.title}
              </span>
              . Calendar or Zoom events linked to this booking will be removed when possible.
            </>
          ) : null
        }
        confirmLabel="Cancel meeting"
        pendingConfirmLabel="Cancelling…"
        isPending={cancelTarget ? pendingMeetingId === cancelTarget.id && isPending : false}
        onConfirm={confirmCancelMeeting}
        variant="destructive"
        icon="trash"
      />
      {isFetching ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)]/50">
          <Loader size="lg" color="black" />
        </div>
      ) : meetings?.length === 0 ? (
        <EmptyPanel
          title={`No ${
            period === PeriodEnum.UPCOMING
              ? "Upcoming"
              : period === PeriodEnum.PAST
              ? "Past"
              : "Cancelled"
          } Meeting`}
        />
      ) : (
        <div className="data--list space-y-0">
          <ul className="list-none space-y-4 p-0" role="list">
            {meetings?.map((meeting) => (
              <li key={meeting.id}>
                <MeetingCard
                  period={period}
                  isPending={pendingMeetingId === meeting.id ? isPending : false}
                  meeting={meeting}
                  timezone={timezone} // Passing timezone to MeetingCard
                  onCancelClick={() => setCancelTarget(meeting)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TabPanel;

