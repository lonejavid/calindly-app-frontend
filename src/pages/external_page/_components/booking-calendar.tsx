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
    <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 min-h-screen">
      
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
            <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-3xl border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 p-6">
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
                <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px] text-white font-semibold">
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
// import { format } from "date-fns";
// import { Calendar } from "@/components/calendar";
// import { CalendarDate, DateValue } from "@internationalized/date";
// import { useBookingState } from "@/hooks/use-booking-state";
// import { decodeSlot, formatSlot } from "@/lib/helper";
// import { getPublicAvailabilityByEventIdQueryFn } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { ErrorAlert } from "@/components/ErrorAlert";
// import { Loader } from "@/components/loader";

// import { Clock, Calendar as CalendarIcon, Sparkles, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";

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
//     <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-4 pr-0">
      
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
//       </div>

//       {/* Loader Overlay */}
//       {isFetching && (
//         <div className="fixed inset-0 bg-gradient-to-br from-purple-900/90 via-slate-900/90 to-indigo-900/90 backdrop-blur-3xl z-50 flex items-center justify-center">
//           <div className="text-center bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-2xl rounded-3xl p-12 border border-purple-400/50 shadow-2xl">
//             <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-spin">
//               <Sparkles className="w-10 h-10 text-white" />
//             </div>
//             <Loader size="lg" color="white" />
//             <p className="text-white font-bold text-lg mt-6 animate-pulse">Crafting your perfect booking experience...</p>
//           </div>
//         </div>
//       )}

//       <div className="relative z-10 flex flex-col h-full max-w-7xl mx-auto">
        
//         {/* Stunning Header Section */}
//         <div className="text-center mb-8 pt-8">
//           <div className="relative inline-block mb-6">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
//             <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-purple-300/30">
//               <CalendarIcon className="w-12 h-12 text-white drop-shadow-2xl" />
//             </div>
//           </div>
          
//           <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl bg-gradient-to-r from-purple-200 via-pink-200 to-violet-200 bg-clip-text text-transparent">
//             Choose Your Perfect Moment
//           </h2>
          
//           <p className="text-xl md:text-2xl text-gray-200 font-semibold mb-6 max-w-2xl mx-auto leading-relaxed">
//             Select your ideal date and time for an extraordinary experience
//           </p>

//           <div className="flex items-center justify-center space-x-8">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
//               <span className="text-green-300 font-bold text-sm">Instant Booking</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
//               <span className="text-yellow-300 font-bold text-sm">Premium Experience</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
//               <span className="text-purple-300 font-bold text-sm">Lightning Fast</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-12 pb-8">
          
//           {/* Calendar Section - Left Side */}
//           <div className="flex flex-col">
//             <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-3xl border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 p-8 h-full">
              
//               <div className="flex items-center justify-center mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
//                     <CalendarIcon className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-black text-white">Pick Your Date</h3>
//                 </div>
//               </div>

//               <div className="flex justify-center items-center h-full">
//                 <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 shadow-xl">
//                   <Calendar
//                     className="w-full max-w-none"
//                     minValue={minValue}
//                     defaultValue={defaultValue}
//                     value={selectedDate}
//                     timezone={timezone}
//                     onChange={handleChangeDate}
//                     isDateUnavailable={isDateUnavailable}
//                   />
//                 </div>
//               </div>

//               {/* Date Selection Status */}
//               <div className="mt-6 text-center">
//                 {selectedDate ? (
//                   <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-lg rounded-full border border-green-300/50 shadow-lg">
//                     <CheckCircle className="w-5 h-5 mr-3 text-green-200" />
//                     <span className="text-white font-bold">
//                       {format(selectedDate.toDate(timezone), "EEEE, MMMM d, yyyy")} Selected
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600/60 to-gray-700/60 backdrop-blur-lg rounded-full border border-gray-400/30">
//                     <CalendarIcon className="w-5 h-5 mr-3 text-gray-300" />
//                     <span className="text-gray-200 font-semibold">Select a date to continue</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Time Slots Section - Right Side */}
//           <div className="flex flex-col">
//             <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-3xl border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 h-full overflow-hidden">
              
//               {selectedDate && availability ? (
//                 <>
//                   {/* Time Slots Header */}
//                   <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-violet-600/30 backdrop-blur-lg p-8 border-b border-purple-400/30">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
//                           <Clock className="w-4 h-4 text-white" />
//                         </div>
//                         <h3 className="text-2xl font-black text-white">Available Times</h3>
//                       </div>

//                       {/* Hour Format Selector */}
//                       <div className="flex h-12 w-32 items-center bg-slate-700/50 border-2 border-purple-400/40 rounded-xl overflow-hidden shadow-inner">
//                         <button
//                           onClick={() => setHourType("12h")}
//                           className={`flex-1 h-full text-sm font-bold transition-all duration-300 ${
//                             hourType === "12h"
//                               ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                               : "text-purple-200 hover:text-white hover:bg-purple-600/30"
//                           }`}
//                         >
//                           12h
//                         </button>
//                         <button
//                           onClick={() => setHourType("24h")}
//                           className={`flex-1 h-full text-sm font-bold transition-all duration-300 ${
//                             hourType === "24h"
//                               ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                               : "text-purple-200 hover:text-white hover:bg-purple-600/30"
//                           }`}
//                         >
//                           24h
//                         </button>
//                       </div>
//                     </div>

//                     <p className="text-purple-200 font-semibold">
//                       {format(selectedDate.toDate(timezone), "EEEE, MMMM d")} • {timeSlots.length} slots available
//                     </p>
//                   </div>

//                   {/* Time Slots Grid */}
//                   <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-400/50">
//                     {timeSlots.length > 0 ? (
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {timeSlots.map((slot, i) => {
//                           const formattedSlot = formatSlot(slot, timezone, hourType);
//                           const isSelected = selectedTime === formattedSlot;
                          
//                           return (
//                             <div key={i} className="relative group">
//                               {/* Selected State */}
//                               {isSelected && (
//                                 <div className="absolute inset-0 z-20 grid grid-cols-1 gap-2">
//                                   <div className="relative overflow-hidden rounded-2xl">
//                                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 animate-pulse"></div>
//                                     <div className="relative bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-violet-600/90 backdrop-blur-lg p-4 text-center border-2 border-purple-300/50 shadow-2xl">
//                                       <div className="text-white font-black text-lg mb-2">{formattedSlot}</div>
//                                       <button
//                                         onClick={handleNext}
//                                         className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group border border-white/30 shadow-lg"
//                                       >
//                                         <span>Book This Time</span>
//                                         <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}

//                               {/* Default Time Slot */}
//                               <div
//                                 className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
//                                   isSelected ? "opacity-0 pointer-events-none" : "opacity-100"
//                                 }`}
//                                 onClick={() => handleSelectSlot(slot)}
//                               >
//                                 <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-purple-800/40 to-indigo-800/60"></div>
//                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-violet-600/0 group-hover:from-purple-600/20 group-hover:via-pink-600/20 group-hover:to-violet-600/20 transition-all duration-300"></div>
                                
//                                 <div className="relative p-6 text-center border-2 border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300 shadow-xl">
//                                   <div className="text-purple-100 group-hover:text-white font-black text-xl mb-2 transition-colors duration-300">
//                                     {formattedSlot}
//                                   </div>
//                                   <div className="text-purple-300 group-hover:text-purple-200 font-semibold text-sm transition-colors duration-300">
//                                     Click to select
//                                   </div>
                                  
//                                   {/* Hover Effect Elements */}
//                                   <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center justify-center h-full text-center py-16">
//                         <div className="w-24 h-24 bg-gradient-to-br from-gray-600/30 to-gray-700/30 rounded-full flex items-center justify-center mb-6 shadow-xl">
//                           <Clock className="w-12 h-12 text-gray-400" />
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-300 mb-3">No Available Times</h3>
//                         <p className="text-gray-400 text-lg">Please try selecting a different date</p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 /* No Date Selected State */
//                 <div className="flex flex-col items-center justify-center h-full text-center p-16">
//                   <div className="relative mb-8">
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl animate-pulse"></div>
//                     <div className="relative w-32 h-32 bg-gradient-to-br from-slate-700/50 to-purple-800/30 rounded-full flex items-center justify-center shadow-2xl border border-purple-400/30">
//                       <Clock className="w-16 h-16 text-purple-300 animate-pulse" />
//                     </div>
//                   </div>
                  
//                   <h3 className="text-3xl font-black text-white mb-4">Select a Date First</h3>
//                   <p className="text-xl text-purple-200 mb-8 max-w-md">
//                     Choose your preferred date from the calendar to see all available time slots
//                   </p>
                  
//                   <div className="flex items-center space-x-2 text-purple-300">
//                     <ArrowRight className="w-5 h-5 rotate-180" />
//                     <span className="font-semibold">Pick a date to get started</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Error Alert */}
//       <ErrorAlert isError={isError} error={error} />
//     </div>
//   );
// };

// export default BookingCalendar;




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
