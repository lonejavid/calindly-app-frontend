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
import { Clock, Calendar as CalendarIcon, Sparkles, ArrowRight } from "lucide-react";

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
    <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-300 ease-out">
      {/* Beautiful Background with Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 rounded-3xl overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-3xl border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 p-8 m-4">
        
        {/* Loader Overlay */}
        {isFetching && (
          <div className="flex bg-gradient-to-br from-purple-900/80 via-slate-900/80 to-indigo-900/80 backdrop-blur-2xl !z-30 absolute inset-4 rounded-2xl items-center justify-center">
            <div className="text-center">
              <Loader size="lg" color="white" />
              <p className="text-white font-semibold mt-4 animate-pulse">Loading your perfect time slots...</p>
            </div>
          </div>
        )}

        <div className="flex flex-col h-full mx-auto">
          {/* Beautiful Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full shadow-xl ring-4 ring-purple-300/30 mb-4">
              <CalendarIcon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 drop-shadow-2xl">Select Your Perfect Time</h2>
            <p className="text-lg text-gray-200 font-medium">Choose a date and time that works best for you</p>
            <div className="flex items-center justify-center mt-3">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-sm text-purple-300 font-semibold">Easy booking in just two steps</span>
              <Sparkles className="w-4 h-4 text-yellow-400 ml-2 animate-pulse" />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px] gap-8">
            {/* Calendar Section */}
            <div className="w-full flex justify-center">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 shadow-xl">
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

            {/* Time Slots Section */}
            {selectedDate && availability ? (
              <div className="w-full flex-shrink-0 max-w-xs md:max-w-[40%] overflow-hidden">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-400/30 shadow-xl overflow-hidden">
                  
                  {/* Time Slots Header */}
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 border-b border-purple-400/30">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-300 mr-3" />
                        <h3 className="font-bold text-xl text-white">
                          {format(selectedDate.toDate(timezone), "EEEE, MMMM d")}
                        </h3>
                      </div>

                      {/* Hour Format Toggle */}
                      <div className="flex h-10 w-full max-w-[120px] items-center bg-slate-700/50 border border-purple-400/40 rounded-lg overflow-hidden shadow-inner">
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
                  </div>

                  {/* Time Slots List */}
                  <div className="flex-[1_1_100px] p-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-400/50 h-[400px]">
                    {timeSlots.length > 0 ? (
                      <div className="space-y-3">
                        {timeSlots.map((slot, i) => {
                          const formattedSlot = formatSlot(slot, timezone, hourType);
                          const isSelected = selectedTime === formattedSlot;
                          
                          return (
                            <div key={i} className="relative">
                              {/* Selected State - Next Button Overlay */}
                              <div
                                className={`absolute inset-0 z-20 grid grid-cols-2 gap-2 transform transition-all duration-500 ease-in-out ${
                                  isSelected
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-full opacity-0"
                                }`}
                              >
                                <button
                                  type="button"
                                  className="h-12 text-white rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 font-bold text-sm tracking-wide shadow-lg border border-slate-500/50 cursor-default"
                                  disabled
                                >
                                  {formattedSlot}
                                </button>
                                <button
                                  type="button"
                                  className="h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 text-white rounded-xl font-bold text-sm tracking-wide shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group border border-purple-300/50"
                                  onClick={handleNext}
                                >
                                  Next
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                                </button>
                              </div>

                              {/* Default Time Slot Button */}
                              <button
                                type="button"
                                className={`w-full h-12 rounded-xl font-bold text-sm tracking-wide transition-all duration-500 ease-in-out border-2 transform hover:scale-102 shadow-lg ${
                                  isSelected
                                    ? "opacity-0 pointer-events-none"
                                    : "opacity-100 border-purple-400/60 text-purple-300 bg-gradient-to-r from-slate-800/50 to-purple-900/30 hover:border-purple-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-purple-800/40 hover:text-purple-200 hover:shadow-xl"
                                }`}
                                onClick={() => handleSelectSlot(slot)}
                              >
                                {formattedSlot}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-600/50 to-gray-700/50 rounded-full flex items-center justify-center mb-4 shadow-xl">
                          <Clock className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-300 mb-2">No Times Available</h3>
                        <p className="text-sm text-gray-400">Please select a different date</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : selectedDate ? (
              <div className="w-full flex-shrink-0 max-w-xs md:max-w-[40%]">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-400/30 shadow-xl p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <Clock className="w-8 h-8 text-purple-300 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Loading Time Slots</h3>
                    <p className="text-sm text-gray-300">Finding available times for your selected date...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex-shrink-0 max-w-xs md:max-w-[40%]">
                <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-purple-400/20 shadow-xl p-8">
                  <div className="text-center opacity-60">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600/30 to-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-300 mb-2">Select a Date</h3>
                    <p className="text-sm text-gray-400">Choose a date to see available time slots</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subtle Enhancement Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-3xl pointer-events-none"></div>
      </div>

      {/* Error Alert */}
      <ErrorAlert isError={isError} error={error} />
    </div>
  );
};

export default BookingCalendar;




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
