import { EventType } from "@/types/api.type";
import EventCard from "./event-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEventVisibilityMutationFn, deleteEventApi } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmActionDialog } from "@/components/confirm-action-dialog";

const EventListSection = (props: { events: EventType[]; username: string }) => {
  
  const { events, username } = props;
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: toggleEventVisibilityMutationFn,
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteEventApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["event_list"] });
      toast.success(response.message || "Event deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete the event");
    },
  });

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const toggleEventVisibility = (eventId: string) => {
    setPendingEventId(eventId);
    mutate(
      {
        eventId: eventId,
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: ["event_list"],
          });
          setPendingEventId(null);
          const msg =
            response.message && response.message !== "OK"
              ? response.message
              : response.event?.isPrivate
                ? "This event is off and hidden from your public booking page."
                : "This event is on and bookable from your public page.";
          toast.success(msg);
        },
        onError: () => {
          toast.error("Failed to switch event");
        },
      }
    );
  };

  return (
    <>
      <ConfirmActionDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete this event type?"
        description={
          deleteTarget ? (
            <>
              <span className="font-medium text-foreground">
                &ldquo;{deleteTarget.title}&rdquo;
              </span>{" "}
              will be permanently removed. This cannot be undone.
            </>
          ) : null
        }
        confirmLabel="Delete event"
        pendingConfirmLabel="Deleting…"
        isPending={deleteMutation.isPending}
        onConfirm={confirmDelete}
        variant="destructive"
        icon="trash"
      />

      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {events?.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              slug={event.slug}
              duration={event.duration}
              isPrivate={event.isPrivate}
              username={username}
              isPending={pendingEventId === event.id ? isPending : false}
              onToggle={() => toggleEventVisibility(event.id)}
              onDelete={() => setDeleteTarget({ id: event.id, title: event.title })}
              event={event}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventListSection;






