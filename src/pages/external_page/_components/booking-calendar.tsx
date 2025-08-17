// import { format } from "date-fns";
// import { Calendar } from "@/components/calendar";
// import { CalendarDate, DateValue } from "@internationalized/date";
// import { useBookingState } from "@/hooks/use-booking-state";
// import { decodeSlot, formatSlot } from "@/lib/helper";
// import { getPublicAvailabilityByEventIdQueryFn } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { ErrorAlert } from "@/components/ErrorAlert";
// import { Loader } from "@/components/loader";
// import HourButton from "@/components/HourButton";

// interface BookingCalendarProps {
//   eventId: string;
//   minValue?: DateValue;
//   defaultValue?: DateValue;
// }

// const BookingCalendar = ({
//   eventId,
//   minValue,
//   defaultValue,
// }: BookingCalendarProps) => {
//   const {
//     timezone,
//     hourType,
//     selectedDate,
//     selectedSlot,
//     handleSelectDate,
//     handleSelectSlot,
//     handleNext,
//     setHourType,
//   } = useBookingState();

//   const { data, isFetching, isError, error } = useQuery({
//     queryKey: ["availbility_single_event", eventId],
//     queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
//   });

//   const availability = data?.data || [];
//   console.log("check this avialivity option what it is ",availability);

//   // Get time slots for the selected date
//   const timeSlots = selectedDate
//     ? availability?.find(
//         (day) =>
//           day.day ===
//           format(selectedDate.toDate(timezone), "EEEE").toUpperCase()
//       )?.slots || []
//     : [];

//   const isDateUnavailable = (date: DateValue) => {
//     // Get the day of the week (e.g., "MONDAY")
//     const dayOfWeek = format(
//       date.toDate(timezone), // the same as getLocalTimeZone()
//       "EEEE"
//     ).toUpperCase();
//     // Check if the day is available
//     const dayAvailability = availability.find((day) => day.day === dayOfWeek);
//     return !dayAvailability?.isAvailable;
//   };

//   const handleChangeDate = (newDate: DateValue) => {
//     const calendarDate = newDate as CalendarDate;
//     handleSelectSlot(null);
//     handleSelectDate(calendarDate); // Update useBookingState hook
//   };

//   const selectedTime = decodeSlot(selectedSlot, timezone, hourType);

//   return (
//     <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
//       {/* Loader Overlay */}
//       {isFetching && (
//         <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
//           <Loader size="lg" color="black" />
//         </div>
//       )}

//       <div className="flex flex-col h-full mx-auto pt-[25px]">
//         <h2 className="text-xl mb-5 font-bold">Select a Date &amp; Time</h2>
//         <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
//           <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
//             <Calendar
//               className="w-auto md:w-full lg:!w-auto"
//               minValue={minValue}
//               defaultValue={defaultValue}
//               value={selectedDate}
//               timezone={timezone}
//               onChange={handleChangeDate}
//               isDateUnavailable={isDateUnavailable}
//             />
//           </div>
//           {selectedDate && availability ? (
//             <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
//               <div className="w-full pb-3  flex flex-col md:flex-row justify-between pr-8">
//                 <h3 className=" mt-0 mb-[10px] font-normal text-base leading-[38px]">
//                   {format(selectedDate.toDate(timezone), "EEEE d")}
//                 </h3>

//                 <div className="flex h-9 w-full max-w-[107px] items-center border rounded-sm">
//                   <HourButton
//                     label="12h"
//                     isActive={hourType === "12h"}
//                     onClick={() => setHourType("12h")}
//                   />
//                   <HourButton
//                     label="24h"
//                     isActive={hourType === "24h"}
//                     onClick={() => setHourType("24h")}
//                   />
//                 </div>
//               </div>

//               <div
//                 className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin
//              scrollbar-track-transparent scroll--bar h-[400px]"
//               >
//                 {timeSlots.map((slot, i) => {
//                   const formattedSlot = formatSlot(slot, timezone, hourType);
//                   return (
//                     <div role="list" key={i}>
//                       <div
//                         role="listitem"
//                         className="m-[10px_10px_10px_0] relative text-[15px]"
//                       >
//                         {/* Selected Time and Next Button */}
//                         {/* Selected Time and Next Button */}
//                         <div
//                           className={`absolute inset-0 z-20 flex items-center gap-1.5 justify-between
//                              transform transition-all duration-400 ease-in-out ${
//                                selectedTime === formattedSlot
//                                  ? "translate-x-0 opacity-100"
//                                  : "translate-x-full opacity-0"
//                              }`}
//                         >
//                           <button
//                             type="button"
//                             className="w-full h-[52px] text-white rounded-[4px] bg-black/60 font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide"
//                             disabled
//                           >
//                             {formattedSlot}
//                           </button>
//                           <button
//                             type="button"
//                             className="w-full cursor-pointer h-[52px] bg-[rgb(0,105,255)] text-white rounded-[4px] hover:bg-[rgba(0,105,255,0.8)] font-semibold tracking-wide"
//                             onClick={handleNext}
//                           >
//                             Next
//                           </button>
//                         </div>

                    
//                         <button
//                           type="button"
//                           className={`w-full h-[52px] cursor-pointer border border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] rounded-[4px] font-semibold hover:border-2 hover:border-[rgb(0,105,255)] tracking-wide transition-all duration-400 ease-in-out
//                          ${
//                            selectedTime === formattedSlot
//                              ? "opacity-0"
//                              : "opacity-100"
//                          }
//                            `}
//                           onClick={() => handleSelectSlot(slot)}
//                         >
//                           {formattedSlot}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>

//       {/* {Error Alert } */}
//       <ErrorAlert isError={isError} error={error} />
//     </div>
//   );
// };

// export default BookingCalendar;




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
import { useMemo } from "react";

interface BookingCalendarProps {
  eventId: string;
  minValue?: DateValue;
  defaultValue?: DateValue;
}

// Helper function to convert UTC time slot to user's local timezone
const convertUTCSlotToLocal = (utcSlot: string, userTimezone: string): string => {
  try {
    // Parse the UTC time slot (assuming format like "07:00", "08:00", etc.)
    const [hours, minutes] = utcSlot.split(':').map(Number);
    
    // Create a date object with today's date and the UTC time
    const utcDate = new Date();
    utcDate.setUTCHours(hours, minutes, 0, 0);
    
    // Convert to user's timezone
    const localTime = new Intl.DateTimeFormat('en-US', {
      timeZone: userTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(utcDate);
    
    return localTime;
  } catch (error) {
    console.error('Error converting UTC slot to local:', error);
    return utcSlot; // Return original if conversion fails
  }
};

// Helper function to get day of week considering timezone conversion
const getDayInTimezone = (date: DateValue, timezone: string): string => {
  const jsDate = date.toDate(timezone);
  return format(jsDate, "EEEE").toUpperCase();
};

const BookingCalendar = ({
  eventId,
  minValue,
  defaultValue,
}: BookingCalendarProps) => {
  const {
    hourType,
    selectedDate,
    selectedSlot,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
    setHourType,
  } = useBookingState();

  // Get user's browser timezone
  const userTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      console.error('Error getting user timezone:', error);
      return 'UTC'; // Fallback to UTC
    }
  }, []);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["availbility_single_event", eventId],
    queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
  });

  const availability = data?.data || [];
  console.log("Original availability from backend (UTC):", availability);

  // Convert UTC slots to user's local timezone
  const convertedAvailability = useMemo(() => {
    if (!availability.length || !userTimezone) return availability;

    return availability.map(dayAvailability => ({
      ...dayAvailability,
      slots: dayAvailability.slots?.map(slot => 
        convertUTCSlotToLocal(slot, userTimezone)
      ) || []
    }));
  }, [availability, userTimezone]);

  console.log("Converted availability to user timezone:", convertedAvailability);
  console.log("User's detected timezone:", userTimezone);

  // Get time slots for the selected date using converted availability
  const timeSlots = selectedDate
    ? convertedAvailability?.find(
        (day) =>
          day.day === getDayInTimezone(selectedDate, userTimezone)
      )?.slots || []
    : [];

  const isDateUnavailable = (date: DateValue) => {
    // Get the day of the week in user's timezone
    const dayOfWeek = getDayInTimezone(date, userTimezone);
    
    // Check if the day is available
    const dayAvailability = convertedAvailability.find((day) => day.day === dayOfWeek);
    return !dayAvailability?.isAvailable;
  };

  const handleChangeDate = (newDate: DateValue) => {
    const calendarDate = newDate as CalendarDate;
    handleSelectSlot(null);
    handleSelectDate(calendarDate);
  };

  // Use user's timezone for decoding the selected slot
  const selectedTime = decodeSlot(selectedSlot, userTimezone, hourType);

  return (
    <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
      {/* Loader Overlay */}
      {isFetching && (
        <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
          <Loader size="lg" color="black" />
        </div>
      )}

      <div className="flex flex-col h-full mx-auto pt-[25px]">
        <h2 className="text-xl mb-5 font-bold">Select a Date &amp; Time</h2>
        
        {/* Display user's timezone info */}
        <div className="text-sm text-gray-600 mb-3">
          Times shown in your timezone: {userTimezone}
        </div>
        
        <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
          <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
            <Calendar
              className="w-auto md:w-full lg:!w-auto"
              minValue={minValue}
              defaultValue={defaultValue}
              value={selectedDate}
              timezone={userTimezone} // Use user's timezone for calendar
              onChange={handleChangeDate}
              isDateUnavailable={isDateUnavailable}
            />
          </div>
          {selectedDate && convertedAvailability ? (
            <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
              <div className="w-full pb-3 flex flex-col md:flex-row justify-between pr-8">
                <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px]">
                  {format(selectedDate.toDate(userTimezone), "EEEE d")}
                </h3>

                <div className="flex h-9 w-full max-w-[107px] items-center border rounded-sm">
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

              <div
                className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin
             scrollbar-track-transparent scroll--bar h-[400px]"
              >
                {timeSlots.map((slot, i) => {
                  const formattedSlot = formatSlot(slot, userTimezone, hourType);
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
                            className="w-full h-[52px] text-white rounded-[4px] bg-black/60 font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide"
                            disabled
                          >
                            {formattedSlot}
                          </button>
                          <button
                            type="button"
                            className="w-full cursor-pointer h-[52px] bg-[rgb(0,105,255)] text-white rounded-[4px] hover:bg-[rgba(0,105,255,0.8)] font-semibold tracking-wide"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        </div>

                        <button
                          type="button"
                          className={`w-full h-[52px] cursor-pointer border border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] rounded-[4px] font-semibold hover:border-2 hover:border-[rgb(0,105,255)] tracking-wide transition-all duration-400 ease-in-out
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
          ) : null}
        </div>
      </div>

      {/* Error Alert */}
      <ErrorAlert isError={isError} error={error} />
    </div>
  );
};

export default BookingCalendar;