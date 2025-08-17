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

//                         {/* Time Slot Button */}
//                         {/* Time Slot Button */}
//                         {/* Time Slot Button */}
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

interface BookingCalendarProps {
  eventId: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  defaultValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
}

// Utility function to convert UTC time slots to local time
const convertUTCSlotToLocal = (utcSlot: string): string => {
  try {
    const utcDate = new Date(utcSlot);
    // Convert to local time by using the browser's timezone
    const localDate = new Date(utcDate.toLocaleString());
    return localDate.toISOString();
  } catch (error) {
    console.error('Error converting UTC slot to local:', error);
    return utcSlot; // Return original if conversion fails
  }
};

// Utility function to convert local time slot back to UTC for backend
const convertLocalSlotToUTC = (localSlot: string): string => {
  try {
    const localDate = new Date(localSlot);
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
    return utcDate.toISOString();
  } catch (error) {
    console.error('Error converting local slot to UTC:', error);
    return localSlot; // Return original if conversion fails
  }
};

const BookingCalendar = ({
  eventId,
  minValue,
  maxValue,
  defaultValue,
  isDateUnavailable,
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
    select: (response) => ({
      ...response,
      data: response.data?.map((day: any) => ({
        ...day,
        // Convert UTC slots to local time for display
        slots: day.slots?.map((slot: string) => convertUTCSlotToLocal(slot)) || []
      })) || []
    })
  });

  const availability = data?.data || [];

  // Get time slots for the selected date (now in local time)
  const timeSlots = selectedDate
    ? availability?.find(
        (day) =>
          day.day ===
          format(selectedDate.toDate(timezone), "EEEE").toUpperCase()
      )?.slots || []
    : [];

  const isDateUnavailableDefault = (date: DateValue) => {
    // Get the day of the week (e.g., "MONDAY")
    const dayOfWeek = format(
      date.toDate(timezone),
      "EEEE"
    ).toUpperCase();
    // Check if the day is available
    const dayAvailability = availability.find((day) => day.day === dayOfWeek);
    return !dayAvailability?.isAvailable;
  };

  // Use provided isDateUnavailable or default one
  const finalIsDateUnavailable = isDateUnavailable || isDateUnavailableDefault;

  const handleChangeDate = (newDate: DateValue) => {
    const calendarDate = newDate as CalendarDate;
    handleSelectSlot(null);
    handleSelectDate(calendarDate);
  };

  const selectedTime = decodeSlot(selectedSlot, timezone, hourType);

  console.log('BookingCalendar debug:', {
    userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availabilityData: availability,
    timeSlots: timeSlots,
    selectedSlot: selectedSlot,
    selectedTime: selectedTime
  });

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
        <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
          <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
            <Calendar
              className="w-auto md:w-full lg:!w-auto"
              minValue={minValue}
              maxValue={maxValue}
              defaultValue={defaultValue}
              value={selectedDate}
              timezone={timezone}
              onChange={handleChangeDate}
              isDateUnavailable={finalIsDateUnavailable}
            />
          </div>
          {selectedDate && availability ? (
            <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
              <div className="w-full pb-3  flex flex-col md:flex-row justify-between pr-8">
                <h3 className=" mt-0 mb-[10px] font-normal text-base leading-[38px]">
                  {format(selectedDate.toDate(timezone), "EEEE d")}
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
                  // Format slot for display (slot is now in local time)
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

                        {/* Time Slot Button */}
                        <button
                          type="button"
                          className={`w-full h-[52px] cursor-pointer border border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] rounded-[4px] font-semibold hover:border-2 hover:border-[rgb(0,105,255)] tracking-wide transition-all duration-400 ease-in-out
                         ${
                           selectedTime === formattedSlot
                             ? "opacity-0"
                             : "opacity-100"
                         }
                           `}
                          onClick={() => {
                            // Convert local slot back to UTC before storing in state
                            // This ensures the selected slot is always in UTC format for backend
                            const utcSlot = convertLocalSlotToUTC(slot);
                            console.log('Slot selection:', {
                              localSlot: slot,
                              utcSlot: utcSlot,
                              formattedDisplay: formattedSlot
                            });
                            handleSelectSlot(utcSlot);
                          }}
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