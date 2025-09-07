

import { useRef, useState } from "react";
import { ChevronDown, Trash2Icon, Mail, MapPin, MessageSquare, Calendar, Clock, User, ExternalLink } from "lucide-react";
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

  // Parse the ISO dates
  const startTime = parseISO(meeting.startTime);
  const endTime = parseISO(meeting.endTime);

  // Format dates with timezone conversion if timezone is provided
  const formatDateWithTimezone = (date: Date, formatStr: string) => {
    if (timezone) {
      return formatInTimeZone(date, timezone, formatStr);
    }
    return format(date, formatStr);
  };

  const formattedDate = formatDateWithTimezone(startTime, "EEEE, d MMMM yyyy");
  const formattedTime = `${formatDateWithTimezone(startTime, "h:mm a")} – ${formatDateWithTimezone(endTime, "h:mm a")}`;

  const locationOption = locationOptions.find(
    (option) => option.value === meeting.event.locationType
  );

  const toggleDetails = () => {
    setIsShow(!isShow);
  };

  const openMeetLink = () => {
    if (meeting.meetLink) {
      window.open(meeting.meetLink, '_blank');
    }
  };

  return (
    <div className="w-full shadow-sm border border-gray-100 rounded-lg overflow-hidden bg-white mb-4">
      {/* Date Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <h2 className="text-base font-semibold text-gray-800 tracking-wide">
            {formattedDate}
          </h2>
          {timezone && (
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full ml-auto">
              {timezone}
            </span>
          )}
        </div>
      </div>

      {/* Event Summary */}
      <div 
        role="button" 
        className="event-list-body cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
        onClick={toggleDetails}
      >
        <div className="flex items-center p-6 gap-4">
          {/* Time indicator */}
          <div className="flex-shrink-0 relative">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium",
                  period === PeriodEnum.CANCELLED 
                    ? "bg-red-500" 
                    : period === PeriodEnum.UPCOMING
                    ? "bg-blue-500"
                    : "bg-green-500"
                )}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-900">
                  {formatDateWithTimezone(startTime, "h:mm")}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDateWithTimezone(startTime, "a")}
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {meeting.guestName}
              </h3>
              {meeting.meetLink && period === PeriodEnum.UPCOMING && (
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto flex items-center gap-1 text-xs px-2 py-1 h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMeetLink();
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                  Join
                </Button>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Event:</span>
              <span className="font-medium text-gray-800">{meeting.event.title}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "px-2 py-1 text-xs rounded-full font-medium",
                period === PeriodEnum.CANCELLED 
                  ? "bg-red-100 text-red-700" 
                  : period === PeriodEnum.UPCOMING
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              )}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600">{formattedTime}</span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <div className="flex-shrink-0">
            <button 
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={isShow ? "Hide details" : "Show details"}
            >
              <ChevronDown
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isShow && "rotate-180"
                )}
              />
              <span className="hidden sm:inline">
                {isShow ? "Less" : "More"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div
        ref={detailsRef}
        className="event-details overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/30"
        style={{
          maxHeight: isShow ? `${detailsRef.current?.scrollHeight}px` : "0px",
          padding: isShow ? "24px" : "0 24px",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Contact & Location Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                <Mail className="w-4 h-4 text-blue-500" />
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-12">Email:</span>
                  <span className="font-medium text-gray-900">{meeting.guestEmail}</span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                <MapPin className="w-4 h-4 text-green-500" />
                Meeting Location
              </h4>
              <div className="flex items-center gap-3">
                {locationOption && (
                  <>
                    <img
                      src={locationOption.logo as string}
                      alt={locationOption.label}
                      className="w-6 h-6"
                    />
                    <span className="font-medium text-gray-900">
                      {locationOption.label}
                    </span>
                  </>
                )}
              </div>
              {meeting.meetLink && (
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={openMeetLink}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Join Meeting
                  </Button>
                </div>
              )}
            </div>

            {/* Questions and Answers */}
            {meeting.questionAnswers && meeting.questionAnswers.length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                  Questions & Answers
                </h4>
                <div className="space-y-4">
                  {meeting.questionAnswers.map((qa, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2 bg-gray-50/50 rounded-r-lg">
                      <div className="mb-2">
                        <h5 className="text-sm font-medium text-gray-800 leading-relaxed">
                          Q: {qa.question}
                        </h5>
                      </div>
                      <div className="pl-4">
                        <p className="text-sm text-gray-700 font-medium bg-blue-50 px-3 py-2 rounded-lg inline-block">
                          {qa.answer || "No answer provided"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {meeting.additionalInfo && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  Additional Notes
                </h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {meeting.additionalInfo}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Action Panel */}
          {period === PeriodEnum.UPCOMING && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 border border-gray-200 sticky top-4">
                <h4 className="font-semibold text-gray-900 mb-4">Actions</h4>
                <div className="space-y-3">
                  {meeting.meetLink && (
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={openMeetLink}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Join Meeting
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    onClick={onCancel}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader color="#dc2626" />
                    ) : (
                      <>
                        <Trash2Icon className="w-4 h-4" />
                        <span>Cancel Meeting</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Meeting Details Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Meeting Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{meeting.event.duration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={cn(
                        "font-medium",
                        period === PeriodEnum.CANCELLED ? "text-red-600" : "text-green-600"
                      )}>
                        {meeting.status}
                      </span>
                    </div>
                    {timezone && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Timezone:</span>
                        <span className="font-medium text-gray-900">{timezone}</span>
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