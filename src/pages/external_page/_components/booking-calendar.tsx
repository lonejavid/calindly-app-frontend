import { format, parse } from "date-fns";
import { Calendar } from "@/components/calendar";
import { CalendarDate, DateValue } from "@internationalized/date";
import { useBookingState } from "@/hooks/use-booking-state";

import { getPublicAvailabilityByEventIdQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";

import { useMemo, useEffect } from "react";

interface BookingCalendarProps {
  eventId: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  defaultValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
}

/** Match backend `dateStr` (yyyy-MM-dd). */
function calendarDateToDateStr(d: CalendarDate): string {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

/** API returns slots as HH:mm in the requested timezone; show 12h for guests. */
function apiSlotToDisplayLabel(slotHm: string): string {
  const t = slotHm.trim();
  try {
    const p = parse(t, "HH:mm", new Date(2000, 0, 1));
    return format(p, "h:mm a").toLowerCase();
  } catch {
    try {
      const p = parse(t, "h:mm a", new Date(2000, 0, 1));
      return format(p, "h:mm a").toLowerCase();
    } catch {
      return t.toLowerCase();
    }
  }
}

const BookingCalendar = ({
  eventId,
  minValue,
  maxValue,
  defaultValue,
  isDateUnavailable: customIsDateUnavailable,
}: BookingCalendarProps) => {
  const {
    selectedDate,
    selectedSlot,
    timezone: userTimezone,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
    handleBack,
  } = useBookingState();

  const detectedTimezone = useMemo(() => {
    try {
      let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Asia/Calcutta") tz = "Asia/Kolkata";
      return tz;
    } catch {
      return "UTC";
    }
  }, []);

  const finalUserTimezone = userTimezone || detectedTimezone;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["availbility_single_event", eventId, finalUserTimezone],
    queryFn: () =>
      getPublicAvailabilityByEventIdQueryFn(eventId, {
        timezone: finalUserTimezone,
      }),
    enabled: Boolean(eventId && finalUserTimezone),
  });

  const availability = data?.data ?? [];

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = calendarDateToDateStr(selectedDate);
    const row = availability.find((d) => d.dateStr === dateStr);
    if (!row?.isAvailable || !row.slots?.length) return [];
    return row.slots.map((apiValue) => ({
      apiValue,
      displayLabel: apiSlotToDisplayLabel(apiValue),
    }));
  }, [selectedDate, availability]);

  /** Drop URL/query selection if that slot is no longer returned (e.g. just booked). */
  useEffect(() => {
    if (isFetching || !selectedDate || !selectedSlot) return;
    const valid = timeSlots.some((s) => s.displayLabel === selectedSlot);
    if (!valid) {
      handleSelectSlot(null);
      handleBack();
    }
  }, [isFetching, selectedDate, selectedSlot, timeSlots, handleSelectSlot, handleBack]);

  const backendTimezoneForDay = useMemo(() => {
    if (!selectedDate) return finalUserTimezone;
    const row = availability.find(
      (d) => d.dateStr === calendarDateToDateStr(selectedDate),
    );
    return row?.timezone ?? finalUserTimezone;
  }, [selectedDate, availability, finalUserTimezone]);

  const showConversionInfo =
    backendTimezoneForDay && backendTimezoneForDay !== finalUserTimezone;

  const isDateUnavailable = (date: DateValue) => {
    if (customIsDateUnavailable?.(date)) return true;
    const calendarDate = date as CalendarDate;
    const jsDate = calendarDate.toDate(finalUserTimezone);
    const dateStr = calendarDateToDateStr(calendarDate);
    const row = availability.find((d) => d.dateStr === dateStr);
    if (!row?.isAvailable) return true;
    return !(row.slots?.length);
  };

  const handleChangeDate = (newDate: DateValue) => {
    handleSelectSlot(null);
    handleSelectDate(newDate as CalendarDate);
  };

  const handleSlotSelection = (displayLabel: string) => {
    handleSelectSlot(displayLabel);
  };

  const getUserTimezoneDisplay = () => {
    try {
      const now = new Date();
      const short = now
        .toLocaleTimeString("en", {
          timeZoneName: "short",
          timeZone: finalUserTimezone,
        })
        .split(" ")
        .pop();
      const name = finalUserTimezone.replace(/_/g, " ");
      return `${name} (${short})`;
    } catch {
      return finalUserTimezone;
    }
  };

  return (
    <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
      {isFetching && (
        <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader size="lg" color="black" />
            <div className="text-sm text-gray-600">Loading availability...</div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full mx-auto pt-[25px]">
        <h2 className="text-xl mb-5 font-bold">Select a Date &amp; Time</h2>

        <div className="text-sm text-gray-600 mb-3">
          <div className="font-medium flex items-center gap-2">
            🌍 Times shown in your timezone: {getUserTimezoneDisplay()}
          </div>
          {showConversionInfo && (
            <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              ⚡ Slot times from host availability (reference: {backendTimezoneForDay})
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
          <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
            <Calendar
              className="w-auto md:w-full lg:!w-auto"
              minValue={minValue}
              maxValue={maxValue}
              defaultValue={defaultValue}
              value={selectedDate}
              timezone={finalUserTimezone}
              onChange={handleChangeDate}
              isDateUnavailable={isDateUnavailable}
            />
          </div>
          {selectedDate ? (
            <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
              <div className="w-full pb-3 flex flex-col md:flex-row justify-between pr-8">
                <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px]">
                  {format(
                    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day),
                    "EEEE, MMMM d",
                  )}
                </h3>
              </div>

              <div className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scroll--bar h-[400px]">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slotRow, i) => {
                    const displayTime = slotRow.displayLabel;
                    const isSelected = selectedSlot === displayTime;

                    return (
                      <div role="list" key={`${slotRow.apiValue}-${i}`}>
                        <div
                          role="listitem"
                          className="m-[10px_10px_10px_0] relative text-[15px]"
                        >
                          <div
                            className={`absolute inset-0 z-20 flex items-center gap-1.5 justify-between transform transition-all duration-400 ease-in-out ${
                              isSelected
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                          >
                            <button
                              type="button"
                              className="w-full h-[52px] text-white rounded-[4px] bg-black/60 font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide"
                              disabled
                            >
                              <div className="flex flex-col items-center">
                                <div>{displayTime}</div>
                              </div>
                            </button>
                            <button
                              type="button"
                              className="w-full cursor-pointer h-[52px] bg-[rgb(0,105,255)] text-white rounded-[4px] hover:bg-[rgba(0,105,255,0.8)] font-semibold tracking-wide"
                              onClick={handleNext}
                            >
                              Next...
                            </button>
                          </div>

                          <button
                            type="button"
                            className={`w-full h-[52px] cursor-pointer border font-semibold tracking-wide transition-all duration-400 ease-in-out rounded-[4px] border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] hover:border-2 hover:border-[rgb(0,105,255)] ${
                              isSelected ? "opacity-0" : "opacity-100"
                            }`}
                            onClick={() => handleSlotSelection(displayTime)}
                          >
                            <div className="flex flex-col items-center">
                              <div>{displayTime}</div>
                              {showConversionInfo && (
                                <div className="text-xs opacity-60">
                                  {slotRow.apiValue}
                                </div>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No available time slots for this date
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <ErrorAlert isError={isError} error={error} />
    </div>
  );
};

export default BookingCalendar;
