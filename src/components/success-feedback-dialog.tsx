import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SuccessFeedbackDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  /** Called when the user clicks the primary action (after closing). */
  onConfirm?: () => void;
  className?: string;
};

export function SuccessFeedbackDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "OK",
  onConfirm,
  className,
}: SuccessFeedbackDialogProps) {
  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <div className="mb-2 flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </span>
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-center text-base text-muted-foreground">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            className="min-w-[120px] bg-[var(--blue)] hover:bg-[var(--blue-dark)]"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
