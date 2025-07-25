import { EventType } from "@/types/api.type";
import EventCard from "./event-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEventVisibilityMutationFn ,deleteEventApi} from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

const EventListSection = (props: { events: EventType[]; username: string }) => {
  const { events, username } = props;
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);

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
const handleDelete = (eventId: string) => {
  const confirmed = window.confirm("Are you sure you want to delete this event?");
  if (!confirmed) return;

  deleteMutation.mutate(eventId);
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
          toast.success(`${response.message}`);
        },
        onError: () => {
          toast.success("Failed to switch event");
        },
      }
    );
  };
  return (
    <div className="w-full">
      <div
        className="
        grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(min(calc(100%/3-24px),max(280px,calc(100%-48px)/3)),1fr))]
         gap-6 py-[10px] pb-[25px]
        "
      >
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
            onDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventListSection;
