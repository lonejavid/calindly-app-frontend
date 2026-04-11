import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

export type ConfirmActionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Primary confirm button style */
  variant?: "destructive" | "default";
  icon?: "trash" | "warning" | "none";
  isPending?: boolean;
  /** Shown on the confirm button while `isPending` (e.g. "Deleting…") */
  pendingConfirmLabel?: string;
  onConfirm: () => void;
  blockDismissWhilePending?: boolean;
};

export function ConfirmActionDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  icon = "trash",
  isPending = false,
  pendingConfirmLabel,
  onConfirm,
  blockDismissWhilePending = true,
}: ConfirmActionDialogProps) {
  const IconCmp =
    icon === "trash" ? Trash2 : icon === "warning" ? AlertTriangle : null;
  const iconWrapClass =
    variant === "destructive"
      ? "bg-red-100 text-red-600"
      : "bg-amber-100 text-amber-700";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md border-[var(--line-strong)] sm:rounded-[var(--r-m)] [&>button]:hidden"
        onPointerDownOutside={(e) => {
          if (blockDismissWhilePending && isPending) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (blockDismissWhilePending && isPending) e.preventDefault();
        }}
      >
        <DialogHeader className="items-center text-center sm:items-center sm:text-center">
          {IconCmp ? (
            <div
              className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${iconWrapClass}`}
            >
              <IconCmp className="h-6 w-6 shrink-0" aria-hidden />
            </div>
          ) : null}
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-balance text-[var(--ink-muted)]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-center">
          <Button
            type="button"
            variant="outline"
            className="rounded-sm"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            className="rounded-sm"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending
              ? (pendingConfirmLabel ?? "Please wait…")
              : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
