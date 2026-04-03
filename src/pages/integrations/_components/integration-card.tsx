/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { connectAppIntegrationQueryFn } from "@/lib/api";
import {
  IntegrationAppEnum,
  IntegrationAppType,
  IntegrationDescriptions,
  IntegrationLogos,
} from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  appType: IntegrationAppType;
  title: string;
  isConnected?: boolean;
  isDisabled?: boolean;
}

interface ImageWrapperProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
}

const ERROR_MESSAGES: Record<any, string> = {
  [IntegrationAppEnum.GOOGLE_MEET_AND_CALENDAR]:
    "Failed to connect Google Calendar. Please try again.",
};

const IntegrationCard = ({
  appType,
  title,
  isConnected = false,
  isDisabled = false,
}: IntegrationCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<IntegrationAppType | null>(null);

  const logos = IntegrationLogos[appType];
  const description = IntegrationDescriptions[appType];

  const handleConnect = async (type: IntegrationAppType) => {
    setSelectedType(type);
    setIsLoading(true);
    try {
      const { url } = await connectAppIntegrationQueryFn(type);
      setSelectedType(null);
      setIsLoading(false);
      if (url) {
        window.location.href = url;
      } else {
        toast.info(
          "Google sign-in isn't configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the backend .env to enable Connect.",
        );
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Failed to connect:", err);
      toast.error(ERROR_MESSAGES[appType] ?? "Failed to connect. Please try again.");
    }
  };

  return (
    <div className="b2b-page flex w-full flex-col gap-4 rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--surface)]/50 p-4 transition-all hover:border-[var(--blue)]/30 hover:bg-[var(--white)] hover:shadow-[var(--sh-sm)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        {Array.isArray(logos) ? (
          <div className="flex items-center gap-3">
            <ImageWrapper src={logos[0]} alt="Logo" />
            <PlusIcon className="h-5 w-5 shrink-0 text-[var(--ink-muted)]" />
            <ImageWrapper src={logos[1]} alt="Logo" />
          </div>
        ) : (
          <ImageWrapper src={logos} alt={`${title} logo`} />
        )}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[var(--ink)] sm:text-lg">{title}</h3>
          <p className="mt-1 text-sm font-normal leading-relaxed text-[var(--ink-muted)]">
            {description}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
        {isConnected ? (
          <div
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border-2 border-[var(--blue)]/30 bg-[var(--blue-lite)] px-4 text-sm font-semibold text-[var(--blue-deep)] sm:w-[180px]"
          >
            Connected
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => handleConnect(appType)}
            variant="unstyled"
            className={cn(
              "inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all sm:w-[180px]",
              isDisabled
                ? "pointer-events-none border-2 border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)] opacity-80"
                : "border-2 border-[var(--blue)] bg-[var(--blue)] text-white shadow-[var(--sh-blue)] hover:bg-[var(--blue-dark)]",
            )}
            aria-disabled={isDisabled}
            disabled={isLoading}
          >
            {isLoading && selectedType === appType ? (
              <Loader size="sm" color="white" />
            ) : (
              <span>{isDisabled ? "Not available" : "Connect"}</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  height = 30,
  width = 30,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex size-[50px] items-center justify-center rounded-full border-2 border-[var(--line)] bg-[var(--white)] shadow-[var(--sh-xs)]",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        height={height}
        width={width}
        className="object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default IntegrationCard;
