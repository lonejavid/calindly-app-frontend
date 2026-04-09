import { EventType } from "@/types/api.type";
import EventCard from "./event-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEventVisibilityMutationFn, deleteEventApi } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
          toast.success(`${response.message}`);
        },
        onError: () => {
          toast.error("Failed to switch event");
        },
      }
    );
  };

  return (
    <>
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent
          className="max-w-md border-[var(--line-strong)] sm:rounded-[var(--r-m)] [&>button]:hidden"
          onPointerDownOutside={(e) => {
            if (deleteMutation.isPending) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (deleteMutation.isPending) e.preventDefault();
          }}
        >
          <DialogHeader className="items-center text-center sm:items-center sm:text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" aria-hidden />
            </div>
            <DialogTitle className="text-center">Delete this event type?</DialogTitle>
            <DialogDescription className="text-center">
              {deleteTarget ? (
                <>
                  <span className="font-medium text-foreground">&ldquo;{deleteTarget.title}&rdquo;</span> will be
                  permanently removed. This cannot be undone.
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-sm"
              disabled={deleteMutation.isPending}
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="rounded-sm"
              disabled={deleteMutation.isPending}
              onClick={confirmDelete}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full px-4 py-4 sm:px-4 lg:px-4">
        <div
          className="grid max-sm:grid-cols-1 grid-cols-2 gap-6 pb-6 lg:grid-cols-[repeat(auto-fill,minmax(min(calc(100%/3-24px),max(280px,calc((100%-48px)/3))),1fr))]"
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






