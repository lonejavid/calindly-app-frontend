import { useRef, useState } from "react";
import {
  ChevronDown,
  Trash2Icon,
  Mail,
  MapPin,
  MessageSquare,
  Calendar,
  Clock,
  User,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingType, PeriodType } from "@/types/api.type";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { locationOptions } from "@/lib/types";
import { PeriodEnum } from "@/hooks/use-meeting-filter";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

const MeetingCard = (props: {
  meeting: MeetingType;
  period: PeriodType;
  isPending: boolean;
  timezone?: string;
  onCancel: () => void;
}) => {
  const { meeting, isPending, period, timezone, onCancel } = props;

  const [isShow, setIsShow] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const startTime = parseISO(meeting.startTime);
  const endTime = parseISO(meeting.endTime);

  const formatDateWithTimezone = (date: Date, formatStr: string) => {
    if (timezone) {
      return formatInTimeZone(date, timezone, formatStr);
    }
    return format(date, formatStr);
  };

  const formattedDate = formatDateWithTimezone(startTime, "EEEE, d MMMM yyyy");
  const formattedTime = `${formatDateWithTimezone(startTime, "h:mm a")} – ${formatDateWithTimezone(endTime, "h:mm a")}`;

  const locationOption = locationOptions.find(
    (option) => option.value === meeting.event.locationType,
  );

  const toggleDetails = () => setIsShow(!isShow);

  const openMeetLink = () => {
    if (meeting.meetLink) {
      window.open(meeting.meetLink, "_blank");
    }
  };

  const statusDotClass =
    period === PeriodEnum.CANCELLED
      ? "bg-red-500"
      : period === PeriodEnum.UPCOMING
        ? "bg-[var(--blue)]"
        : "bg-emerald-500";

  const statusBadgeClass =
    period === PeriodEnum.CANCELLED
      ? "border border-red-200 bg-red-50 text-red-700"
      : period === PeriodEnum.UPCOMING
        ? "border border-[var(--blue)]/25 bg-[var(--blue-lite)] text-[var(--blue-deep)]"
        : "border border-emerald-200 bg-emerald-50 text-emerald-800";

  return (
    <div className="b2b-page mb-4 w-full overflow-hidden rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--white)] shadow-[var(--sh-sm)] transition-shadow hover:shadow-[var(--sh-md)]">
      <div className="border-b border-[var(--line)] bg-gradient-to-r from-[var(--surface)] to-[var(--surface-2)] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={2} />
          <h2 className="text-base font-semibold tracking-tight text-[var(--ink)]">
            {formattedDate}
          </h2>
          {timezone && (
            <span className="ml-auto rounded-full border border-[var(--line)] bg-[var(--white)] px-2.5 py-0.5 text-xs font-medium text-[var(--ink-muted)]">
              {timezone}
            </span>
          )}
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className="event-list-body cursor-pointer transition-colors hover:bg-[var(--surface)]/40"
        onClick={toggleDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDetails();
          }
        }}
      >
        <div className="flex items-center gap-4 p-5 sm:gap-5 sm:p-6">
          <div className="relative shrink-0">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[var(--sh-sm)]",
                  statusDotClass,
                )}
              >
                <Clock className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-semibold text-[var(--ink)]">
                  {formatDateWithTimezone(startTime, "h:mm")}
                </div>
                <div className="text-xs text-[var(--ink-muted)]">
                  {formatDateWithTimezone(startTime, "a")}
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <User className="h-4 w-4 shrink-0 text-[var(--ink-muted)]" />
              <h3 className="truncate text-base font-semibold text-[var(--ink)] sm:text-lg">
                {meeting.guestName}
              </h3>
              {meeting.meetLink && period === PeriodEnum.UPCOMING && (
                <Button
                  size="sm"
                  type="button"
                  className="ml-auto h-8 border-2 border-[var(--blue)] bg-[var(--blue)] text-xs font-semibold text-white shadow-[var(--sh-blue)] hover:bg-[var(--blue-dark)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMeetLink();
                  }}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Join
                </Button>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-[var(--ink-muted)]">
              <span>Event:</span>
              <span className="font-semibold text-[var(--ink)]">{meeting.event.title}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  statusBadgeClass,
                )}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </span>
              <span className="text-[var(--ink-muted)]">•</span>
              <span className="text-sm text-[var(--ink-soft)]">{formattedTime}</span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--blue)]"
              aria-label={isShow ? "Hide details" : "Show details"}
            >
              <ChevronDown
                className={cn("h-5 w-5 transition-transform duration-200", isShow && "rotate-180")}
              />
              <span className="hidden sm:inline">{isShow ? "Less" : "More"}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={detailsRef}
        className="event-details overflow-hidden border-t border-[var(--line)] bg-[var(--surface)]/50 transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isShow ? `${detailsRef.current?.scrollHeight ?? 2000}px` : "0px",
          padding: isShow ? "24px" : "0 24px",
        }}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-4 sm:p-5">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-[var(--ink)]">
                <Mail className="h-4 w-4 text-[var(--blue)]" />
                Contact information
              </h4>
              <div className="text-sm">
                <span className="text-[var(--ink-muted)]">Email: </span>
                <span className="font-medium text-[var(--ink)]">{meeting.guestEmail}</span>
              </div>
            </div>

            <div className="rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-4 sm:p-5">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-[var(--ink)]">
                <MapPin className="h-4 w-4 text-[var(--blue)]" />
                Meeting location
              </h4>
              <div className="flex items-center gap-3">
                {locationOption && (
                  <>
                    <img
                      src={locationOption.logo as string}
                      alt={locationOption.label}
                      className="h-6 w-6"
                    />
                    <span className="font-medium text-[var(--ink)]">{locationOption.label}</span>
                  </>
                )}
              </div>
              {meeting.meetLink && (
                <div className="mt-3">
                  <Button
                    type="button"
                    size="sm"
                    className="border-2 border-[var(--blue)] bg-[var(--blue)] font-semibold text-white hover:bg-[var(--blue-dark)]"
                    onClick={openMeetLink}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Join meeting
                  </Button>
                </div>
              )}
            </div>

            {meeting.questionAnswers && meeting.questionAnswers.length > 0 && (
              <div className="rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-4 sm:p-5">
                <h4 className="mb-4 flex items-center gap-2 font-semibold text-[var(--ink)]">
                  <MessageSquare className="h-4 w-4 text-[var(--blue)]" />
                  Questions &amp; answers
                </h4>
                <div className="space-y-4">
                  {meeting.questionAnswers.map((qa, index) => (
                    <div
                      key={index}
                      className="rounded-[var(--r-s)] border-l-4 border-[var(--blue)] bg-[var(--surface)] py-2 pl-4"
                    >
                      <h5 className="mb-2 text-sm font-semibold text-[var(--ink)]">Q: {qa.question}</h5>
                      <p className="inline-block rounded-[var(--r-s)] border border-[var(--line)] bg-[var(--blue-lite)] px-3 py-2 text-sm text-[var(--ink)]">
                        {qa.answer || "No answer provided"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {meeting.additionalInfo && (
              <div className="rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-4 sm:p-5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-[var(--ink)]">
                  <MessageSquare className="h-4 w-4 text-[var(--amber)]" />
                  Additional notes
                </h4>
                <div className="rounded-[var(--r-s)] border border-[var(--amber)]/30 bg-[var(--amber-lite)]/50 p-3">
                  <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{meeting.additionalInfo}</p>
                </div>
              </div>
            )}
          </div>

          {period === PeriodEnum.UPCOMING && (
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-4 sm:p-5">
                <h4 className="mb-4 font-semibold text-[var(--ink)]">Actions</h4>
                <div className="space-y-3">
                  {meeting.meetLink && (
                    <Button
                      type="button"
                      className="w-full border-2 border-[var(--blue)] bg-[var(--blue)] font-semibold text-white shadow-[var(--sh-blue)] hover:bg-[var(--blue-dark)]"
                      onClick={openMeetLink}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Join meeting
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2 border-red-200 font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={onCancel}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader color="#dc2626" />
                    ) : (
                      <>
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Cancel meeting
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-6 border-t border-[var(--line)] pt-4">
                  <h5 className="mb-3 text-sm font-semibold text-[var(--ink)]">Meeting details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-[var(--ink-muted)]">Duration</span>
                      <span className="font-medium text-[var(--ink)]">{meeting.event.duration} min</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[var(--ink-muted)]">Status</span>
                      <span
                        className={cn(
                          "font-medium",
                          period === PeriodEnum.CANCELLED ? "text-red-600" : "text-emerald-600",
                        )}
                      >
                        {meeting.status}
                      </span>
                    </div>
                    {timezone && (
                      <div className="flex justify-between gap-2">
                        <span className="text-[var(--ink-muted)]">Timezone</span>
                        <span className="font-medium text-[var(--ink)]">{timezone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
