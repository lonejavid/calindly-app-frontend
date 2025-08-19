

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
// import { useMemo } from "react";

// interface BookingCalendarProps {
//   eventId: string;
//   minValue?: DateValue;
//   maxValue?: DateValue;
//   defaultValue?: DateValue;
//   isDateUnavailable?: (date: DateValue) => boolean;
// }

// // Helper function to parse time slots that could be in either 12-hour or 24-hour format
// const parseTimeSlot = (timeSlot: string): { hours: number; minutes: number } | null => {
//   try {
//     // Check if it's 12-hour format (contains AM/PM)
//     if (timeSlot.includes('AM') || timeSlot.includes('PM')) {
//       const isAM = timeSlot.includes('AM');
//       const timePart = timeSlot.replace(/\s*(AM|PM)/i, '').trim();
//       const [hoursStr, minutesStr] = timePart.split(':');
      
//       let hours = parseInt(hoursStr, 10);
//       const minutes = parseInt(minutesStr || '0', 10);
      
//       // Convert to 24-hour format
//       if (!isAM && hours !== 12) {
//         hours += 12;
//       } else if (isAM && hours === 12) {
//         hours = 0;
//       }
      
//       return { hours, minutes };
//     } else {
//       // Assume 24-hour format
//       const [hoursStr, minutesStr] = timeSlot.split(':');
//       const hours = parseInt(hoursStr, 10);
//       const minutes = parseInt(minutesStr || '0', 10);
      
//       return { hours, minutes };
//     }
//   } catch (error) {
//     console.error('Error parsing time slot:', error, timeSlot);
//     return null;
//   }
// };

// // Helper function to safely format time slots
// const safeFormatSlot = (slot: string, timezone: string, hourType: string): string => {
//   try {
//     // If the slot is already in the desired format, try to use formatSlot
//     const formatted = formatSlot(slot, timezone, hourType);
//     return formatted;
//   } catch (error) {
//     console.error('Error in formatSlot, falling back to original slot:', error, slot);
    
//     // Fallback: if formatSlot fails, try to parse and format manually
//     try {
//       const parsedTime = parseTimeSlot(slot);
//       if (!parsedTime) return slot;
      
//       const { hours, minutes } = parsedTime;
//       const date = new Date();
//       date.setHours(hours, minutes, 0, 0);
      
//       if (hourType === '12h') {
//         return format(date, 'h:mm a');
//       } else {
//         return format(date, 'HH:mm');
//       }
//     } catch (fallbackError) {
//       console.error('Fallback formatting also failed:', fallbackError);
//       return slot; // Return original slot as last resort
//     }
//   }
// };

// // Helper function to get day of week considering timezone conversion
// const getDayInTimezone = (date: DateValue, timezone: string): string => {
//   const jsDate = date.toDate(timezone);
//   return format(jsDate, "EEEE").toUpperCase();
// };

// const BookingCalendar = ({
//   eventId,
//   minValue,
//   maxValue,
//   defaultValue,
//   isDateUnavailable: customIsDateUnavailable,
// }: BookingCalendarProps) => {
//   const {

//     selectedDate,
//     selectedSlot,
//     handleSelectDate,
//     handleSelectSlot,
//     handleNext,
   
//   } = useBookingState();

//   // Get user's browser timezone
//   const userTimezone = useMemo(() => {
//     try {
//       return Intl.DateTimeFormat().resolvedOptions().timeZone;
//     } catch (error) {
//       console.error('Error getting user timezone:', error);
//       return 'UTC';
//     }
//   }, []);

//   const { data, isFetching, isError, error } = useQuery({
//     queryKey: ["availbility_single_event", eventId],
//     queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
//   });

//   const availability = data?.data || [];
//   console.log("Original availability  from backend:", availability);

//   // Convert slots to user's local timezone if needed
//   const convertedAvailability = useMemo(() => {
//     if (!availability.length || !userTimezone) return availability;

//     return availability.map(dayAvailability => ({
//       ...dayAvailability,
//       slots: dayAvailability.slots?.map(slot => {

//         return slot;
//       }) || []
//     }));
//   }, [availability, userTimezone]);

//   console.log("Converted availability:", convertedAvailability);

//   // Get time slots for the selected date
//   const timeSlots = selectedDate
//     ? convertedAvailability?.find(
//         (day) => day.day === getDayInTimezone(selectedDate, userTimezone)
//       )?.slots || []
//     : [];

//   console.log("Time slots for selected date:", timeSlots);

//   // Combined isDateUnavailable function
//   const isDateUnavailable = (date: DateValue) => {
//     // First check custom restrictions (date range)
//     if (customIsDateUnavailable && customIsDateUnavailable(date)) {
//       console.log('Date unavailable due to custom restrictions:', date.toString());
//       return true;
//     }

//     // Then check day availability
//     const dayOfWeek = getDayInTimezone(date, userTimezone);
//     const dayAvailability = convertedAvailability.find((day) => day.day === dayOfWeek);
//     const isDayUnavailable = !dayAvailability?.isAvailable;
    
//     if (isDayUnavailable) {
//       console.log('Date unavailable due to day availability:', date.toString(), dayOfWeek);
//     }
    
//     return isDayUnavailable;
//   };

//   const handleChangeDate = (newDate: DateValue) => {
//     const calendarDate = newDate as CalendarDate;
//     handleSelectSlot(null);
//     handleSelectDate(calendarDate);
//   };

//   const handleSlotSelection = (slot: string) => {
//     try {
//       console.log('Selecting slot:', slot);
      
//        const parsedTime = parseTimeSlot(slot);
//        if (!parsedTime) {
//       console.error("Invalid slot string:", slot);
//       return;
//     }

//     const { hours, minutes } = parsedTime;
//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);

//     // Pass a valid Date instead of raw string
//     handleSelectSlot(date.toISOString());
//       // handleSelectSlot(slot);
//     } catch (error) {
//       console.error('Error selecting slot:', error, slot);
//     }
//   };

//   const selectedTime = selectedSlot ? (() => {
//     try {
//       return safeFormatSlot(selectedSlot, userTimezone, '12h');
//     } catch (error) {
//       console.error('Error formatting selected slot:', error, selectedSlot);
//       return selectedSlot; // Fallback to original slot value
//     }
//   })() : null;

//   return (
//     <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
//       {isFetching && (
//         <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
//           <Loader size="lg" color="black" />
//         </div>
//       )}

//       <div className="flex flex-col h-full mx-auto pt-[25px]">
//         <h2 className="text-xl mb-5 font-bold">Select a Date &amp; Time</h2>
        
//         <div className="text-sm text-gray-600 mb-3">
//           Times shown in your timezone: {userTimezone}
//         </div>

//         <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
//           <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
//             <Calendar
//               className="w-auto md:w-full lg:!w-auto"
//               minValue={minValue}
//               maxValue={maxValue}
//               defaultValue={defaultValue}
//               value={selectedDate}
//               timezone={userTimezone}
//               onChange={handleChangeDate}
//               isDateUnavailable={isDateUnavailable}
//             />
//           </div>
//           {selectedDate && convertedAvailability ? (
//             <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
//               <div className="w-full pb-3 flex flex-col md:flex-row justify-between pr-8">
//                 <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px]">
//                   {format(selectedDate.toDate(userTimezone), "EEEE d")}
//                 </h3>

           
//               </div>

//               <div className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scroll--bar h-[400px]">
//                 {timeSlots.length > 0 ? (
//                   timeSlots.map((slot, i) => {
//                     console.log('Processing slot:', slot);
//                     const formattedSlot = safeFormatSlot(slot, userTimezone, '12h');
//                     console.log('Formatted slot:', formattedSlot);
//                     return (
//                       <div role="list" key={i}>
//                         <div
//                           role="listitem"
//                           className="m-[10px_10px_10px_0] relative text-[15px]"
//                         >
//                           <div
//                             className={`absolute inset-0 z-20 flex items-center gap-1.5 justify-between transform transition-all duration-400 ease-in-out ${
//                               selectedTime === formattedSlot
//                                 ? "translate-x-0 opacity-100"
//                                 : "translate-x-full opacity-0"
//                             }`}
//                           >
//                             <button
//                               type="button"
//                               className="w-full h-[52px] text-white rounded-[4px] bg-black/60 font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide"
//                               disabled
//                             >
//                               {formattedSlot}
//                             </button>
//                             <button
//                               type="button"
//                               className="w-full cursor-pointer h-[52px] bg-[rgb(0,105,255)] text-white rounded-[4px] hover:bg-[rgba(0,105,255,0.8)] font-semibold tracking-wide"
//                               onClick={handleNext}
//                             >
//                               Next
//                             </button>
//                           </div>

//                           <button
//                             type="button"
//                             className={`w-full h-[52px] cursor-pointer border border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] rounded-[4px] font-semibold hover:border-2 hover:border-[rgb(0,105,255)] tracking-wide transition-all duration-400 ease-in-out ${
//                               selectedTime === formattedSlot
//                                 ? "opacity-0"
//                                 : "opacity-100"
//                             }`}
//                             onClick={() => handleSlotSelection(slot)}
//                           >
//                             {formattedSlot}
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     No available time slots for this date
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>

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
// import { useMemo } from "react";

// interface BookingCalendarProps {
//   eventId: string;
//   minValue?: DateValue;
//   maxValue?: DateValue;
//   defaultValue?: DateValue;
//   isDateUnavailable?: (date: DateValue) => boolean;
// }

// // Comprehensive list of supported timezones from backend
// const SUPPORTED_TIMEZONES = [
//   // North America
//   'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
//   'America/Anchorage', 'Pacific/Honolulu', 'America/Toronto', 'America/Vancouver',
//   'America/Montreal', 'America/Mexico_City', 'America/Tijuana',
  
//   // South America
//   'America/Sao_Paulo', 'America/Argentina/Buenos_Aires', 'America/Lima',
//   'America/Santiago', 'America/Bogota', 'America/Caracas',
  
//   // Europe
//   'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
//   'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna', 'Europe/Zurich',
//   'Europe/Stockholm', 'Europe/Copenhagen', 'Europe/Oslo', 'Europe/Helsinki',
//   'Europe/Warsaw', 'Europe/Prague', 'Europe/Budapest', 'Europe/Bucharest',
//   'Europe/Athens', 'Europe/Istanbul', 'Europe/Moscow', 'Europe/Kiev',
//   'Europe/Dublin', 'Europe/Lisbon',
  
//   // Asia
//   'Asia/Tokyo', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Beijing', 'Asia/Hong_Kong',
//   'Asia/Singapore', 'Asia/Bangkok', 'Asia/Jakarta', 'Asia/Manila',
//   'Asia/Kuala_Lumpur', 'Asia/Ho_Chi_Minh', 'Asia/Kolkata', 'Asia/Mumbai',
//   'Asia/New_Delhi', 'Asia/Dhaka', 'Asia/Karachi', 'Asia/Dubai', 'Asia/Riyadh',
//   'Asia/Kuwait', 'Asia/Doha', 'Asia/Tehran', 'Asia/Baghdad', 'Asia/Baku',
//   'Asia/Yerevan', 'Asia/Tbilisi', 'Asia/Almaty', 'Asia/Tashkent',
  
//   // Africa
//   'Africa/Lagos', 'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Nairobi',
//   'Africa/Accra', 'Africa/Casablanca', 'Africa/Algiers', 'Africa/Tunis',
//   'Africa/Addis_Ababa', 'Africa/Kampala', 'Africa/Dar_es_Salaam',
  
//   // Australia & Pacific
//   'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane',
//   'Australia/Perth', 'Australia/Adelaide', 'Australia/Darwin',
//   'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Guam', 'Pacific/Tahiti',
  
//   // UTC
//   'UTC'
// ];

// // Validate and normalize timezone
// const validateTimezone = (timezone: string): string => {
//   if (!timezone) return 'UTC';
  
//   // Check if timezone is in our supported list
//   if (SUPPORTED_TIMEZONES.includes(timezone)) {
//     return timezone;
//   }
  
//   // Try to find a close match (case-insensitive)
//   const normalizedTimezone = SUPPORTED_TIMEZONES.find(
//     tz => tz.toLowerCase() === timezone.toLowerCase()
//   );
  
//   if (normalizedTimezone) {
//     console.warn(`Timezone "${timezone}" normalized to "${normalizedTimezone}"`);
//     return normalizedTimezone;
//   }
  
//   // Fallback to UTC if timezone is not supported
//   console.warn(`Unsupported timezone "${timezone}", falling back to UTC`);
//   return 'UTC';
// };

// // Helper function to parse time slots that could be in either 12-hour or 24-hour format
// const parseTimeSlot = (timeSlot: string): { hours: number; minutes: number } | null => {
//   try {
//     // Check if it's 12-hour format (contains AM/PM)
//     if (timeSlot.includes('AM') || timeSlot.includes('PM')) {
//       const isAM = timeSlot.includes('AM');
//       const timePart = timeSlot.replace(/\s*(AM|PM)/i, '').trim();
//       const [hoursStr, minutesStr] = timePart.split(':');
      
//       let hours = parseInt(hoursStr, 10);
//       const minutes = parseInt(minutesStr || '0', 10);
      
//       // Convert to 24-hour format
//       if (!isAM && hours !== 12) {
//         hours += 12;
//       } else if (isAM && hours === 12) {
//         hours = 0;
//       }
      
//       return { hours, minutes };
//     } else {
//       // Assume 24-hour format
//       const [hoursStr, minutesStr] = timeSlot.split(':');
//       const hours = parseInt(hoursStr, 10);
//       const minutes = parseInt(minutesStr || '0', 10);
      
//       return { hours, minutes };
//     }
//   } catch (error) {
//     console.error('Error parsing time slot:', error, timeSlot);
//     return null;
//   }
// };

// // Convert time from backend timezone to user's local timezone using native Date methods
// const convertTimeSlotToUserTimezone = (
//   timeSlot: string,
//   date: Date,
//   backendTimezone: string,
//   userTimezone: string
// ): string => {
//   try {
//     const parsedTime = parseTimeSlot(timeSlot);
//     if (!parsedTime) return timeSlot;

//     const { hours, minutes } = parsedTime;
    
//     // Validate and normalize timezones
//     const validBackendTz = validateTimezone(backendTimezone);
//     const validUserTz = validateTimezone(userTimezone);
    
//     // If timezones are the same, no conversion needed
//     if (validBackendTz === validUserTz) {
//       const tempDate = new Date();
//       tempDate.setHours(hours, minutes, 0, 0);
//       return format(tempDate, 'h:mm a');
//     }
    
//     // Create a date string in the backend timezone and parse it
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    
//     // Create date in backend timezone using toLocaleString
//     const backendDateString = `${year}-${month}-${day}T${timeString}`;
//     const backendDate = new Date(backendDateString);
    
//     // Get the offset difference between timezones
//     const backendOffset = getTimezoneOffset(validBackendTz);
//     const userOffset = getTimezoneOffset(validUserTz);
//     const offsetDifference = (backendOffset - userOffset) * 60000; // Convert to milliseconds
    
//     // Apply the offset difference
//     const userDate = new Date(backendDate.getTime() - offsetDifference);
    
//     // Format in user's preferred format (12-hour)
//     return format(userDate, 'h:mm a');
//   } catch (error) {
//     console.error('Error converting timezone:', error, {
//       timeSlot,
//       backendTimezone,
//       userTimezone
//     });
    
//     // Fallback: return original time slot formatted
//     try {
//       const parsedTime = parseTimeSlot(timeSlot);
//       if (parsedTime) {
//         const tempDate = new Date();
//         tempDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
//         return format(tempDate, 'h:mm a');
//       }
//     } catch (fallbackError) {
//       console.error('Fallback formatting also failed:', fallbackError);
//     }
    
//     return timeSlot;
//   }
// };

// // Get timezone offset in minutes (simplified version)
// const getTimezoneOffset = (timezone: string): number => {
//   try {
//     const now = new Date();
//     const utc = new Date(now.toLocaleString('en-US', {timeZone: 'UTC'}));
//     const tz = new Date(now.toLocaleString('en-US', {timeZone: timezone}));
//     return (utc.getTime() - tz.getTime()) / (1000 * 60);
//   } catch (error) {
//     console.error('Error getting timezone offset:', error);
//     return 0;
//   }
// };

// // Get the original time slot data for storage/backend communication
// const getOriginalTimeSlotData = (
//   timeSlot: string,
//   date: Date,
//   backendTimezone: string,
//   userTimezone: string
// ): { originalSlot: string; convertedTime: Date; userDisplayTime: string; backendTimezone: string } => {
//   try {
//     const parsedTime = parseTimeSlot(timeSlot);
//     if (!parsedTime) {
//       return {
//         originalSlot: timeSlot,
//         convertedTime: new Date(),
//         userDisplayTime: timeSlot,
//         backendTimezone: validateTimezone(backendTimezone)
//       };
//     }

//     const { hours, minutes } = parsedTime;
    
//     // Validate and normalize timezones
//     const validBackendTz = validateTimezone(backendTimezone);
//     const validUserTz = validateTimezone(userTimezone);
    
//     // Create a date object with the parsed time
//     const backendDate = new Date(date);
//     backendDate.setHours(hours, minutes, 0, 0);
    
//     let convertedTime: Date;
//     let userDisplayTime: string;
    
//     // If timezones are the same, no conversion needed
//     if (validBackendTz === validUserTz) {
//       convertedTime = backendDate;
//       userDisplayTime = format(backendDate, 'h:mm a');
//     } else {
//       // Apply timezone conversion
//       const backendOffset = getTimezoneOffset(validBackendTz);
//       const userOffset = getTimezoneOffset(validUserTz);
//       const offsetDifference = (backendOffset - userOffset) * 60000;
      
//       convertedTime = new Date(backendDate.getTime() - offsetDifference);
//       userDisplayTime = format(convertedTime, 'h:mm a');
//     }
    
//     return {
//       originalSlot: timeSlot,
//       convertedTime,
//       userDisplayTime,
//       backendTimezone: validBackendTz
//     };
//   } catch (error) {
//     console.error('Error processing time slot data:', error, {
//       timeSlot,
//       backendTimezone,
//       userTimezone
//     });
    
//     return {
//       originalSlot: timeSlot,
//       convertedTime: new Date(),
//       userDisplayTime: timeSlot,
//       backendTimezone: validateTimezone(backendTimezone)
//     };
//   }
// };

// // Helper function to get day of week considering timezone conversion
// const getDayInTimezone = (date: DateValue, timezone: string): string => {
//   const jsDate = date.toDate(timezone);
//   return format(jsDate, "EEEE").toUpperCase();
// };

// const BookingCalendar = ({
//   eventId,
//   minValue,
//   maxValue,
//   defaultValue,
//   isDateUnavailable: customIsDateUnavailable,
// }: BookingCalendarProps) => {
//   const {
//     selectedDate,
//     selectedSlot,
//     handleSelectDate,
//     handleSelectSlot,
//     handleNext,
//   } = useBookingState();

//   // Get user's browser timezone
//   const userTimezone = useMemo(() => {
//     try {
//       const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//       return validateTimezone(detectedTimezone);
//     } catch (error) {
//       console.error('Error getting user timezone:', error);
//       return 'UTC';
//     }
//   }, []);

//   const { data, isFetching, isError, error } = useQuery({
//     queryKey: ["availbility_single_event", eventId],
//     queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
//   });

//   const availability = data?.data || [];
//   console.log("Original availability from backend:", availability);

//   // Convert slots to user's local timezone
//   const convertedAvailability = useMemo(() => {
//     if (!availability.length || !userTimezone) return availability;

//     return availability.map(dayAvailability => {
//       // Extract timezone from the availability data - based on screenshot, it shows 'Europe/Vienna'
//       const backendTimezone = validateTimezone(dayAvailability.timezone || 'UTC');
      
//       console.log(`Processing day: ${dayAvailability.day}, Backend TZ: ${backendTimezone}, User TZ: ${userTimezone}`);
      
//       return {
//         ...dayAvailability,
//         backendTimezone, // Store validated timezone
//         slots: dayAvailability.slots?.map(slot => {
//           // Use selectedDate or current date for conversion
//           const dateToUse = selectedDate ? selectedDate.toDate(userTimezone) : new Date();
//           const convertedSlot = convertTimeSlotToUserTimezone(
//             slot,
//             dateToUse,
//             backendTimezone,
//             userTimezone
//           );
          
//           return {
//             original: slot,
//             converted: convertedSlot,
//             backendTimezone: backendTimezone
//           };
//         }) || []
//       };
//     });
//   }, [availability, userTimezone, selectedDate]);

//   console.log("Converted availability:", convertedAvailability);

//   // Get time slots for the selected date
//   const timeSlots = selectedDate
//     ? convertedAvailability?.find(
//         (day) => day.day === getDayInTimezone(selectedDate, userTimezone)
//       )?.slots || []
//     : [];

//   console.log("Time slots for selected date:", timeSlots);

//   // Combined isDateUnavailable function
//   const isDateUnavailable = (date: DateValue) => {
//     // First check custom restrictions (date range)
//     if (customIsDateUnavailable && customIsDateUnavailable(date)) {
//       console.log('Date unavailable due to custom restrictions:', date.toString());
//       return true;
//     }

//     // Then check day availability
//     const dayOfWeek = getDayInTimezone(date, userTimezone);
//     const dayAvailability = convertedAvailability.find((day) => day.day === dayOfWeek);
//     const isDayUnavailable = !dayAvailability?.isAvailable;
    
//     if (isDayUnavailable) {
//       console.log('Date unavailable due to day availability:', date.toString(), dayOfWeek);
//     }
    
//     return isDayUnavailable;
//   };

//   const handleChangeDate = (newDate: DateValue) => {
//     const calendarDate = newDate as CalendarDate;
//     handleSelectSlot(null);
//     handleSelectDate(calendarDate);
//   };

//   const handleSlotSelection = (slotData: any) => {
//     try {
//       console.log('Selecting slot:', slotData);
      
//       if (!selectedDate) {
//         console.error("No date selected");
//         return;
//       }

//       // Get the backend timezone for this slot
//       const backendTimezone = slotData.backendTimezone || 'UTC';
//       const selectedDateJs = selectedDate.toDate(userTimezone);
      
//       // Get the original time slot data for backend communication
//       const timeSlotData = getOriginalTimeSlotData(
//         slotData.original,
//         selectedDateJs,
//         backendTimezone,
//         userTimezone
//       );

//       // Store both original slot info and converted time
//       const slotInfo = {
//         original: slotData.original,
//         backendTimezone: backendTimezone,
//         userTime: timeSlotData.convertedTime.toISOString(),
//         displayTime: timeSlotData.userDisplayTime
//       };

//       handleSelectSlot(JSON.stringify(slotInfo));
//     } catch (error) {
//       console.error('Error selecting slot:', error, slotData);
//       // Fallback to simple slot selection
//       handleSelectSlot(slotData.original || slotData.converted);
//     }
//   };

//   const selectedTime = selectedSlot ? (() => {
//     try {
//       const slotInfo = JSON.parse(selectedSlot);
//       return slotInfo.displayTime || slotInfo.original;
//     } catch (error) {
//       console.error('Error parsing selected slot:', error, selectedSlot);
//       // Fallback for old format
//       return selectedSlot;
//     }
//   })() : null;

//   return (
//     <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
//       {isFetching && (
//         <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
//           <Loader size="lg" color="black" />
//         </div>
//       )}

//       <div className="flex flex-col h-full mx-auto pt-[25px]">
//         <h2 className="text-xl mb-5 font-bold">Select a Date &amp; Time</h2>
        
//         <div className="text-sm text-gray-600 mb-3">
//           Times shown in your timezone: {userTimezone}
//           {convertedAvailability.length > 0 && convertedAvailability[0].backendTimezone !== userTimezone && (
//             <div className="text-xs text-blue-600 mt-1">
//               ⏰ Times converted from: {convertedAvailability[0].backendTimezone}
//             </div>
//           )}
//         </div>

//         <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
//           <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
//             <Calendar
//               className="w-auto md:w-full lg:!w-auto"
//               minValue={minValue}
//               maxValue={maxValue}
//               defaultValue={defaultValue}
//               value={selectedDate}
//               timezone={userTimezone}
//               onChange={handleChangeDate}
//               isDateUnavailable={isDateUnavailable}
//             />
//           </div>
//           {selectedDate && convertedAvailability ? (
//             <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
//               <div className="w-full pb-3 flex flex-col md:flex-row justify-between pr-8">
//                 <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px]">
//                   {format(selectedDate.toDate(userTimezone), "EEEE d")}
//                 </h3>
//               </div>

//               <div className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scroll--bar h-[400px]">
//                 {timeSlots.length > 0 ? (
//                   timeSlots.map((slotData, i) => {
//                     console.log('Processing slot:', slotData);
//                     const displayTime = slotData.converted || slotData.original;
//                     console.log('Display time:', displayTime);
                    
//                     return (
//                       <div role="list" key={i}>
//                         <div
//                           role="listitem"
//                           className="m-[10px_10px_10px_0] relative text-[15px]"
//                         >
//                           <div
//                             className={`absolute inset-0 z-20 flex items-center gap-1.5 justify-between transform transition-all duration-400 ease-in-out ${
//                               selectedTime === displayTime
//                                 ? "translate-x-0 opacity-100"
//                                 : "translate-x-full opacity-0"
//                             }`}
//                           >
//                             <button
//                               type="button"
//                               className="w-full h-[52px] text-white rounded-[4px] bg-black/60 font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide"
//                               disabled
//                             >
//                               {displayTime}
//                             </button>
//                             <button
//                               type="button"
//                               className="w-full cursor-pointer h-[52px] bg-[rgb(0,105,255)] text-white rounded-[4px] hover:bg-[rgba(0,105,255,0.8)] font-semibold tracking-wide"
//                               onClick={handleNext}
//                             >
//                               Next
//                             </button>
//                           </div>

//                           <button
//                             type="button"
//                             className={`w-full h-[52px] cursor-pointer border border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] rounded-[4px] font-semibold hover:border-2 hover:border-[rgb(0,105,255)] tracking-wide transition-all duration-400 ease-in-out ${
//                               selectedTime === displayTime
//                                 ? "opacity-0"
//                                 : "opacity-100"
//                             }`}
//                             onClick={() => handleSlotSelection(slotData)}
//                           >
//                             {displayTime}
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     No available time slots for this date
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>

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
  maxValue?: DateValue;
  defaultValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
}

// Comprehensive list of supported timezones from backend
const SUPPORTED_TIMEZONES = [
  // North America
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'America/Toronto', 'America/Vancouver',
  'America/Montreal', 'America/Mexico_City', 'America/Tijuana',
  
  // South America
  'America/Sao_Paulo', 'America/Argentina/Buenos_Aires', 'America/Lima',
  'America/Santiago', 'America/Bogota', 'America/Caracas',
  
  // Europe
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
  'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna', 'Europe/Zurich',
  'Europe/Stockholm', 'Europe/Copenhagen', 'Europe/Oslo', 'Europe/Helsinki',
  'Europe/Warsaw', 'Europe/Prague', 'Europe/Budapest', 'Europe/Bucharest',
  'Europe/Athens', 'Europe/Istanbul', 'Europe/Moscow', 'Europe/Kiev',
  'Europe/Dublin', 'Europe/Lisbon',
  
  // Asia
  'Asia/Tokyo', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Beijing', 'Asia/Hong_Kong',
  'Asia/Singapore', 'Asia/Bangkok', 'Asia/Jakarta', 'Asia/Manila',
  'Asia/Kuala_Lumpur', 'Asia/Ho_Chi_Minh', 'Asia/Kolkata', 'Asia/Mumbai',
  'Asia/New_Delhi', 'Asia/Dhaka', 'Asia/Karachi', 'Asia/Dubai', 'Asia/Riyadh',
  'Asia/Kuwait', 'Asia/Doha', 'Asia/Tehran', 'Asia/Baghdad', 'Asia/Baku',
  'Asia/Yerevan', 'Asia/Tbilisi', 'Asia/Almaty', 'Asia/Tashkent',
  
  // Africa
  'Africa/Lagos', 'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Nairobi',
  'Africa/Accra', 'Africa/Casablanca', 'Africa/Algiers', 'Africa/Tunis',
  'Africa/Addis_Ababa', 'Africa/Kampala', 'Africa/Dar_es_Salaam',
  
  // Australia & Pacific
  'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane',
  'Australia/Perth', 'Australia/Adelaide', 'Australia/Darwin',
  'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Guam', 'Pacific/Tahiti',
  
  // UTC
  'UTC'
];

// Validate and normalize timezone
const validateTimezone = (timezone: string): string => {
  if (!timezone) return 'UTC';
  
  // Check if timezone is in our supported list
  if (SUPPORTED_TIMEZONES.includes(timezone)) {
    return timezone;
  }
  
  // Try to find a close match (case-insensitive)
  const normalizedTimezone = SUPPORTED_TIMEZONES.find(
    tz => tz.toLowerCase() === timezone.toLowerCase()
  );
  
  if (normalizedTimezone) {
    console.warn(`Timezone "${timezone}" normalized to "${normalizedTimezone}"`);
    return normalizedTimezone;
  }
  
  // Fallback to UTC if timezone is not supported
  console.warn(`Unsupported timezone "${timezone}", falling back to UTC`);
  return 'UTC';
};

// Helper function to parse time slots that could be in either 12-hour or 24-hour format
const parseTimeSlot = (timeSlot: string): { hours: number; minutes: number } | null => {
  try {
    // Check if it's 12-hour format (contains AM/PM)
    if (timeSlot.includes('AM') || timeSlot.includes('PM')) {
      const isAM = timeSlot.includes('AM');
      const timePart = timeSlot.replace(/\s*(AM|PM)/i, '').trim();
      const [hoursStr, minutesStr] = timePart.split(':');
      
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr || '0', 10);
      
      // Convert to 24-hour format
      if (!isAM && hours !== 12) {
        hours += 12;
      } else if (isAM && hours === 12) {
        hours = 0;
      }
      
      return { hours, minutes };
    } else {
      // Assume 24-hour format
      const [hoursStr, minutesStr] = timeSlot.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr || '0', 10);
      
      return { hours, minutes };
    }
  } catch (error) {
    console.error('Error parsing time slot:', error, timeSlot);
    return null;
  }
};

// FIXED: Convert time from backend timezone to user's local timezone
const convertTimeSlotToUserTimezone = (
  timeSlot: string,
  date: Date,
  backendTimezone: string,
  userTimezone: string
): string => {
  try {
    const parsedTime = parseTimeSlot(timeSlot);
    if (!parsedTime) return timeSlot;

    const { hours, minutes } = parsedTime;
    
    // Validate and normalize timezones
    const validBackendTz = validateTimezone(backendTimezone);
    const validUserTz = validateTimezone(userTimezone);
    
    // If timezones are the same, no conversion needed
    if (validBackendTz === validUserTz) {
      const tempDate = new Date();
      tempDate.setHours(hours, minutes, 0, 0);
      return format(tempDate, 'h:mm a');
    }
    
    // Create a specific date with the time in the backend timezone
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Create date object with backend time
    const backendDate = new Date(year, month, day, hours, minutes, 0, 0);
    
    // PROPER TIMEZONE CONVERSION USING toLocaleString
    // First, get the time as if it were in the backend timezone
    const backendTimeString = backendDate.toLocaleString('sv-SE'); // ISO format
    const backendDateTime = new Date(backendTimeString);
    
    // Calculate offset difference manually using Intl.DateTimeFormat
    const backendFormatter = new Intl.DateTimeFormat('en', {
      timeZone: validBackendTz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const userFormatter = new Intl.DateTimeFormat('en', {
      timeZone: validUserTz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    // Use a reference date to calculate offset
    const referenceDate = new Date(year, month, day, hours, minutes, 0, 0);
    
    // Create the datetime string as if it's in the backend timezone
    const isoString = `${year.toString().padStart(4, '0')}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    
    // Parse as UTC then adjust
    const utcDate = new Date(isoString + 'Z');
    
    // Get timezone offsets in minutes
    const getTimezoneOffsetInMinutes = (tz: string, date: Date): number => {
      const utcTime = date.getTime();
      const tzTime = new Date(date.toLocaleString('en-US', { timeZone: tz })).getTime();
      return (tzTime - utcTime) / (1000 * 60);
    };
    
    const backendOffset = getTimezoneOffsetInMinutes(validBackendTz, referenceDate);
    const userOffset = getTimezoneOffsetInMinutes(validUserTz, referenceDate);
    
    // Calculate the time difference
    const offsetDifference = userOffset - backendOffset;
    
    // Apply the offset to get user's local time
    const userLocalTime = new Date(utcDate.getTime() + (offsetDifference * 60000));
    
    // Alternative method using direct conversion
    const alternativeConversion = (() => {
      // Create a date string that represents the time in backend timezone
      const backendDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
      
      // Create two dates: one assuming the time is in backend timezone, another in user timezone
      const now = new Date();
      const backendTime = new Date(now.toLocaleString("en-US", {timeZone: validBackendTz}));
      const userTime = new Date(now.toLocaleString("en-US", {timeZone: validUserTz}));
      
      // Get the difference
      const diff = userTime.getTime() - backendTime.getTime();
      
      // Apply this difference to our target time
      const baseDateTime = new Date(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
      return new Date(baseDateTime.getTime() + diff);
    })();
    
    // Format the result
    return format(alternativeConversion, 'h:mm a');
    
  } catch (error) {
    console.error('Error converting timezone:', error, {
      timeSlot,
      backendTimezone,
      userTimezone
    });
    
    // Fallback: return original time slot formatted
    try {
      const parsedTime = parseTimeSlot(timeSlot);
      if (parsedTime) {
        const tempDate = new Date();
        tempDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return format(tempDate, 'h:mm a');
      }
    } catch (fallbackError) {
      console.error('Fallback formatting also failed:', fallbackError);
    }
    
    return timeSlot;
  }
};

// IMPROVED: More accurate timezone conversion
const convertTimeSlotToUserTimezoneV2 = (
  timeSlot: string,
  date: Date,
  backendTimezone: string,
  userTimezone: string
): { convertedTime: string; originalTime: string; debugInfo: any } => {
  try {
    const parsedTime = parseTimeSlot(timeSlot);
    if (!parsedTime) {
      return {
        convertedTime: timeSlot,
        originalTime: timeSlot,
        debugInfo: { error: 'Could not parse time slot' }
      };
    }

    const { hours, minutes } = parsedTime;
    
    // Validate and normalize timezones
    const validBackendTz = validateTimezone(backendTimezone);
    const validUserTz = validateTimezone(userTimezone);
    
    // If timezones are the same, no conversion needed
    if (validBackendTz === validUserTz) {
      const tempDate = new Date();
      tempDate.setHours(hours, minutes, 0, 0);
      const formatted = format(tempDate, 'h:mm a');
      return {
        convertedTime: formatted,
        originalTime: timeSlot,
        debugInfo: { sameTimezone: true }
      };
    }
    
    // Create the datetime for the specified date and time
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Method 1: Using Intl.DateTimeFormat to handle timezone conversion properly
    // Create a date object representing the time in backend timezone
    const targetDate = new Date(year, month, day, hours, minutes, 0, 0);
    
    // Get current time in both timezones to calculate offset
    const now = new Date();
    
    // Create dates representing the same moment in different timezones
    const backendNow = new Date(now.toLocaleString('sv-SE', { timeZone: validBackendTz }));
    const userNow = new Date(now.toLocaleString('sv-SE', { timeZone: validUserTz }));
    
    // Calculate offset difference in milliseconds
    const offsetDifference = userNow.getTime() - backendNow.getTime();
    
    // Apply offset to target time
    const convertedDate = new Date(targetDate.getTime() + offsetDifference);
    
    const debugInfo = {
      originalTime: timeSlot,
      parsedHours: hours,
      parsedMinutes: minutes,
      backendTimezone: validBackendTz,
      userTimezone: validUserTz,
      targetDate: targetDate.toISOString(),
      backendNow: backendNow.toISOString(),
      userNow: userNow.toISOString(),
      offsetDifference: offsetDifference / (1000 * 60), // in minutes
      convertedDate: convertedDate.toISOString()
    };
    
    return {
      convertedTime: format(convertedDate, 'h:mm a'),
      originalTime: timeSlot,
      debugInfo
    };
    
  } catch (error) {
    console.error('Error converting timezone V2:', error);
    return {
      convertedTime: timeSlot,
      originalTime: timeSlot,
      debugInfo: { error: error.message }
    };
  }
};

// Get the original time slot data for storage/backend communication
const getOriginalTimeSlotData = (
  timeSlot: string,
  date: Date,
  backendTimezone: string,
  userTimezone: string
): { originalSlot: string; convertedTime: Date; userDisplayTime: string; backendTimezone: string; debugInfo?: any } => {
  try {
    const conversionResult = convertTimeSlotToUserTimezoneV2(timeSlot, date, backendTimezone, userTimezone);
    
    const parsedTime = parseTimeSlot(timeSlot);
    if (!parsedTime) {
      return {
        originalSlot: timeSlot,
        convertedTime: new Date(),
        userDisplayTime: timeSlot,
        backendTimezone: validateTimezone(backendTimezone),
        debugInfo: { error: 'Could not parse original time' }
      };
    }

    // Create converted time as Date object
    const convertedTimeDate = new Date(date);
    const convertedParsed = parseTimeSlot(conversionResult.convertedTime);
    if (convertedParsed) {
      convertedTimeDate.setHours(convertedParsed.hours, convertedParsed.minutes, 0, 0);
    }

    return {
      originalSlot: timeSlot,
      convertedTime: convertedTimeDate,
      userDisplayTime: conversionResult.convertedTime,
      backendTimezone: validateTimezone(backendTimezone),
      debugInfo: conversionResult.debugInfo
    };
  } catch (error) {
    console.error('Error processing time slot data:', error);
    
    return {
      originalSlot: timeSlot,
      convertedTime: new Date(),
      userDisplayTime: timeSlot,
      backendTimezone: validateTimezone(backendTimezone),
      debugInfo: { error: error.message }
    };
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
  maxValue,
  defaultValue,
  isDateUnavailable: customIsDateUnavailable,
}: BookingCalendarProps) => {
  const {
    selectedDate,
    selectedSlot,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
  } = useBookingState();

  // Get user's browser timezone
  const userTimezone = useMemo(() => {
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return validateTimezone(detectedTimezone);
    } catch (error) {
      console.error('Error getting user timezone:', error);
      return 'UTC';
    }
  }, []);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["availbility_single_event", eventId],
    queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
  });

  const availability = data?.data || [];
  console.log("Original availability from backend:", availability);

  // Convert slots to user's local timezone
  const convertedAvailability = useMemo(() => {
    if (!availability.length || !userTimezone) return availability;

    return availability.map(dayAvailability => {
      // Extract timezone from the availability data
      const backendTimezone = validateTimezone(dayAvailability.timezone || 'UTC');
      
      console.log(`Processing day: ${dayAvailability.day}, Backend TZ: ${backendTimezone}, User TZ: ${userTimezone}`);
      
      return {
        ...dayAvailability,
        backendTimezone, // Store validated timezone
        slots: dayAvailability.slots?.map(slot => {
          // Use selectedDate or current date for conversion
          const dateToUse = selectedDate ? selectedDate.toDate(userTimezone) : new Date();
          const conversionResult = convertTimeSlotToUserTimezoneV2(
            slot,
            dateToUse,
            backendTimezone,
            userTimezone
          );
          
          console.log(`Converting slot ${slot}:`, conversionResult);
          
          return {
            original: slot,
            converted: conversionResult.convertedTime,
            backendTimezone: backendTimezone,
            debugInfo: conversionResult.debugInfo
          };
        }) || []
      };
    });
  }, [availability, userTimezone, selectedDate]);

  console.log("Converted availability:", convertedAvailability);

  // Get time slots for the selected date
  const timeSlots = selectedDate
    ? convertedAvailability?.find(
        (day) => day.day === getDayInTimezone(selectedDate, userTimezone)
      )?.slots || []
    : [];

  console.log("Time slots for selected date:", timeSlots);

  // Combined isDateUnavailable function
  const isDateUnavailable = (date: DateValue) => {
    // First check custom restrictions (date range)
    if (customIsDateUnavailable && customIsDateUnavailable(date)) {
      console.log('Date unavailable due to custom restrictions:', date.toString());
      return true;
    }

    // Then check day availability
    const dayOfWeek = getDayInTimezone(date, userTimezone);
    const dayAvailability = convertedAvailability.find((day) => day.day === dayOfWeek);
    const isDayUnavailable = !dayAvailability?.isAvailable;
    
    if (isDayUnavailable) {
      console.log('Date unavailable due to day availability:', date.toString(), dayOfWeek);
    }
    
    return isDayUnavailable;
  };

  const handleChangeDate = (newDate: DateValue) => {
    const calendarDate = newDate as CalendarDate;
    handleSelectSlot(null);
    handleSelectDate(calendarDate);
  };

  const handleSlotSelection = (slotData: any) => {
    try {
      console.log('Selecting slot:', slotData);
      
      if (!selectedDate) {
        console.error("No date selected");
        return;
      }

      // Get the backend timezone for this slot
      const backendTimezone = slotData.backendTimezone || 'UTC';
      const selectedDateJs = selectedDate.toDate(userTimezone);
      
      // Get the original time slot data for backend communication
      const timeSlotData = getOriginalTimeSlotData(
        slotData.original,
        selectedDateJs,
        backendTimezone,
        userTimezone
      );

      // Store both original slot info and converted time
      const slotInfo = {
        original: slotData.original,
        backendTimezone: backendTimezone,
        userTime: timeSlotData.convertedTime.toISOString(),
        displayTime: timeSlotData.userDisplayTime,
        debugInfo: {
          slotData: slotData.debugInfo,
          conversion: timeSlotData.debugInfo
        }
      };

      console.log('Slot selection info:', slotInfo);
      handleSelectSlot(JSON.stringify(slotInfo));
    } catch (error) {
      console.error('Error selecting slot:', error, slotData);
      // Fallback to simple slot selection
      handleSelectSlot(slotData.original || slotData.converted);
    }
  };

  const selectedTime = selectedSlot ? (() => {
    try {
      const slotInfo = JSON.parse(selectedSlot);
      return slotInfo.displayTime || slotInfo.original;
    } catch (error) {
      console.error('Error parsing selected slot:', error, selectedSlot);
      // Fallback for old format
      return selectedSlot;
    }
  })() : null;

  return (
    <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
      {isFetching && (
        <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
          <Loader size="lg" color="black" />
        </div>
      )}

      <div className="flex flex-col h-full mx-auto pt-[25px]">
        <h2 className="text-xl mb-5 font-bold">Select a Date &amp; Time</h2>
        
        {/* Enhanced timezone info display */}
        <div className="text-sm text-gray-600 mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">🕐 Your timezone:</span>
            <span className="font-mono text-blue-800">{userTimezone}</span>
          </div>
          {convertedAvailability.length > 0 && convertedAvailability[0].backendTimezone !== userTimezone && (
            <div className="text-xs text-blue-600 flex items-center gap-2">
              <span>⚡ Converting from:</span>
              <span className="font-mono">{convertedAvailability[0].backendTimezone}</span>
              <span>→</span>
              <span className="font-mono">{userTimezone}</span>
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            All times below are shown in your local timezone
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row lg:flex-[1_1_300px]">
          <div className="w-full flex justify-start max-w-xs md:max-w-full lg:max-w-sm">
            <Calendar
              className="w-auto md:w-full lg:!w-auto"
              minValue={minValue}
              maxValue={maxValue}
              defaultValue={defaultValue}
              value={selectedDate}
              timezone={userTimezone}
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
                {timeSlots.length > 0 && (
                  <div className="text-xs text-gray-500">
                    {timeSlots.length} slot{timeSlots.length !== 1 ? 's' : ''} available
                  </div>
                )}
              </div>

              <div className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scroll--bar h-[400px]">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slotData, i) => {
                    console.log('Processing slot for display:', slotData);
                    const displayTime = slotData.converted || slotData.original;
                    console.log('Display time:', displayTime);
                    
                    return (
                      <div role="list" key={i}>
                        <div
                          role="listitem"
                          className="m-[10px_10px_10px_0] relative text-[15px]"
                        >
                          <div
                            className={`absolute inset-0 z-20 flex items-center gap-1.5 justify-between transform transition-all duration-400 ease-in-out ${
                              selectedTime === displayTime
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                          >
                            <button
                              type="button"
                              className="w-full h-[52px] text-white rounded-[4px] bg-black/60 font-semibold disabled:opacity-100 disabled:pointer-events-none tracking-wide"
                              disabled
                            >
                              {displayTime}
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
                            className={`w-full h-[52px] cursor-pointer border border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] rounded-[4px] font-semibold hover:border-2 hover:border-[rgb(0,105,255)] tracking-wide transition-all duration-400 ease-in-out ${
                              selectedTime === displayTime
                                ? "opacity-0"
                                : "opacity-100"
                            }`}
                            onClick={() => handleSlotSelection(slotData)}
                            title={`Original: ${slotData.original} (${slotData.backendTimezone})`}
                          >
                            <div className="flex flex-col items-center">
                              <div className="text-base font-semibold">
                                {displayTime}
                              </div>
                              {slotData.backendTimezone !== userTimezone && (
                                <div className="text-xs opacity-70">
                                  {slotData.original} {slotData.backendTimezone.split('/')[1]}
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
                    <div className="text-lg mb-2">📅</div>
                    <div>No available time slots for this date</div>
                    <div className="text-xs mt-1">Try selecting a different date</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            selectedDate && (
              <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
                <div className="text-center py-8 text-gray-400">
                  <div className="text-lg mb-2">⏰</div>
                  <div>Loading time slots...</div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Debug panel (remove in production) */}
        {process.env.NODE_ENV === 'development' && selectedDate && timeSlots.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs">
            <details>
              <summary className="cursor-pointer font-medium text-gray-700">
                🔍 Debug Info (Dev Only)
              </summary>
              <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded border">
                {JSON.stringify(
                  {
                    userTimezone,
                    selectedDate: selectedDate.toString(),
                    backendTimezone: convertedAvailability[0]?.backendTimezone,
                    timeSlots: timeSlots.map(slot => ({
                      original: slot.original,
                      converted: slot.converted,
                      debugInfo: slot.debugInfo
                    }))
                  },
                  null,
                  2
                )}
              </pre>
            </details>
          </div>
        )}
      </div>

      <ErrorAlert isError={isError} error={error} />
    </div>
  );
};

export default BookingCalendar;