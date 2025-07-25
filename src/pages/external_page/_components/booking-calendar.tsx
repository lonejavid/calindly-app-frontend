




import { format } from "date-fns";
import { Calendar } from "@/components/calendar";
import { CalendarDate, DateValue } from "@internationalized/date";
import { useBookingState } from "@/hooks/use-booking-state";
import { decodeSlot, formatSlot } from "@/lib/helper";
import { getPublicAvailabilityByEventIdQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";
import HourButton from "@/components/HourButton";

interface BookingCalendarProps {
  eventId: string;
  minValue?: DateValue;
  defaultValue?: DateValue;
}

const BookingCalendar = ({
  eventId,
  minValue,
  defaultValue,
}: BookingCalendarProps) => {
  const {
    timezone,
    hourType,
    selectedDate,
    selectedSlot,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
    setHourType,
  } = useBookingState();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["availbility_single_event", eventId],
    queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
  });

  const availability = data?.data || [];

  // Get time slots for the selected date
  const timeSlots = selectedDate
    ? availability?.find(
        (day) =>
          day.day ===
          format(selectedDate.toDate(timezone), "EEEE").toUpperCase()
      )?.slots || []
    : [];

  const isDateUnavailable = (date: DateValue) => {
    // Get the day of the week (e.g., "MONDAY")
    const dayOfWeek = format(
      date.toDate(timezone), // the same as getLocalTimeZone()
      "EEEE"
    ).toUpperCase();
    // Check if the day is available
    const dayAvailability = availability.find((day) => day.day === dayOfWeek);
    return !dayAvailability?.isAvailable;
  };

  const handleChangeDate = (newDate: DateValue) => {
    const calendarDate = newDate as CalendarDate;
    handleSelectSlot(null);
    handleSelectDate(calendarDate); // Update useBookingState hook
  };

  const selectedTime = decodeSlot(selectedSlot, timezone, hourType);

  return (
    // <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 min-h-screen">
      <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0 bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-400 min-h-screen">

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Loader Overlay */}
      {isFetching && (
        <div className="flex bg-gradient-to-br from-purple-900/80 via-slate-900/80 to-indigo-900/80 backdrop-blur-2xl !z-30 absolute w-[95%] h-full items-center justify-center rounded-2xl">
          <Loader size="lg" color="white" />
        </div>
      )}

      <div className="flex flex-col h-full mx-auto pt-[25px] relative z-10">
        <h2 className="text-xl mb-5 font-bold text-white drop-shadow-lg">Select a Date &amp; Time</h2>
        <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
          
          {/* Calendar Section */}
          <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
            {/* <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-3xl border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 p-6"> */}
            <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-200 backdrop-blur-3xl rounded-3xl border border-purple-400/40 shadow-2xl ring-1 ring-purple-300/10 p-6">

              <Calendar
                className="w-auto md:w-full lg:!w-auto"
                minValue={minValue}
                defaultValue={defaultValue}
                value={selectedDate}
                timezone={timezone}
                onChange={handleChangeDate}
                isDateUnavailable={isDateUnavailable}
              />
            </div>
          </div>

          {selectedDate && availability ? (
            <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
              
              {/* Time Header */}
              <div className="w-full pb-3 flex flex-col md:flex-row justify-between pr-8">
                {/* <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px] text-white font-semibold">
                  {format(selectedDate.toDate(timezone), "EEEE d")}
                </h3> */}
                <h3 className="text-lg font-semibold text-white mb-2 ml-6">
                  {format(selectedDate.toDate(timezone), "EEEE d")}
                </h3>

     

                <div className="flex h-9 w-full max-w-[107px] items-center bg-slate-800/50 backdrop-blur-lg border border-purple-400/40 rounded-lg overflow-hidden shadow-inner">
                  <HourButton
                    label="12h"
                    isActive={hourType === "12h"}
                    onClick={() => setHourType("12h")}
                  />
                  <HourButton
                    label="24h"
                    isActive={hourType === "24h"}
                    onClick={() => setHourType("24h")}
                  />
                </div>
              </div>

              {/* Time Slots Container */}
              <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-2xl border border-purple-400/50 shadow-xl ring-1 ring-purple-300/20 p-4">
                <div
                  className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-400/50 h-[400px]"
                >
                  {timeSlots.map((slot, i) => {
                    const formattedSlot = formatSlot(slot, timezone, hourType);
                    return (
                      <div role="list" key={i}>
                        <div
                          role="listitem"
                          className="m-[10px_10px_10px_0] relative text-[15px]"
                        >
                          {/* Selected Time and Next Button */}
                          <div
                            className={`absolute inset-0 z-20 flex items-center gap-1.5 justify-between
                               transform transition-all duration-400 ease-in-out ${
                                 selectedTime === formattedSlot
                                   ? "translate-x-0 opacity-100"
                                   : "translate-x-full opacity-0"
                               }`}
                          >
                            <button
                              type="button"
                              className="w-full h-[52px] text-white rounded-xl bg-slate-700/80 backdrop-blur-sm font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide border border-slate-500/50 shadow-lg"
                              disabled
                            >
                              {formattedSlot}
                            </button>
                            <button
                              type="button"
                              className="w-full cursor-pointer h-[52px] bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 text-white rounded-xl font-semibold tracking-wide transform hover:scale-105 transition-all duration-200 shadow-xl border border-purple-300/50"
                              onClick={handleNext}
                            >
                              Next
                            </button>
                          </div>

                          {/* Time Slot Button */}
                          <button
                            type="button"
                            className={`w-full h-[52px] cursor-pointer bg-gradient-to-r from-slate-800/50 to-purple-900/30 border-2 border-purple-400/60 text-purple-200 rounded-xl font-semibold hover:border-purple-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-purple-800/40 hover:text-purple-100 hover:shadow-xl hover:scale-102 tracking-wide transition-all duration-400 ease-in-out shadow-lg
                             ${
                               selectedTime === formattedSlot
                                 ? "opacity-0"
                                 : "opacity-100"
                             }
                              `}
                            onClick={() => handleSelectSlot(slot)}
                          >
                            {formattedSlot}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Error Alert */}
      <ErrorAlert isError={isError} error={error} />
    </div>
  );
};

export default BookingCalendar;

