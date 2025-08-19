

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
import { format, parseISO } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
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

// Convert time from backend timezone to user's local timezone
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
    
    // Create a date object with the parsed time in the backend timezone
    const backendDate = new Date(date);
    backendDate.setHours(hours, minutes, 0, 0);
    
    // Convert from backend timezone to UTC, then to user timezone
    const utcDate = zonedTimeToUtc(backendDate, validBackendTz);
    const userDate = utcToZonedTime(utcDate, validUserTz);
    
    // Format in user's preferred format (12-hour)
    return format(userDate, 'h:mm a');
  } catch (error) {
    console.error('Error converting timezone:', error, {
      timeSlot,
      backendTimezone,
      userTimezone
    });
    
    // Fallback: return original time slot
    return timeSlot;
  }
};

// Get the original time slot data for storage/backend communication
const getOriginalTimeSlotData = (
  timeSlot: string,
  date: Date,
  backendTimezone: string,
  userTimezone: string
): { originalSlot: string; convertedTime: Date; userDisplayTime: string; backendTimezone: string } => {
  try {
    const parsedTime = parseTimeSlot(timeSlot);
    if (!parsedTime) {
      return {
        originalSlot: timeSlot,
        convertedTime: new Date(),
        userDisplayTime: timeSlot,
        backendTimezone: validateTimezone(backendTimezone)
      };
    }

    const { hours, minutes } = parsedTime;
    
    // Validate and normalize timezones
    const validBackendTz = validateTimezone(backendTimezone);
    const validUserTz = validateTimezone(userTimezone);
    
    // Create a date object with the parsed time in the backend timezone
    const backendDate = new Date(date);
    backendDate.setHours(hours, minutes, 0, 0);
    
    let convertedTime: Date;
    let userDisplayTime: string;
    
    // If timezones are the same, no conversion needed
    if (validBackendTz === validUserTz) {
      convertedTime = backendDate;
      userDisplayTime = format(backendDate, 'h:mm a');
    } else {
      // Convert from backend timezone to UTC, then to user timezone
      const utcDate = zonedTimeToUtc(backendDate, validBackendTz);
      convertedTime = utcToZonedTime(utcDate, validUserTz);
      userDisplayTime = format(convertedTime, 'h:mm a');
    }
    
    return {
      originalSlot: timeSlot,
      convertedTime,
      userDisplayTime,
      backendTimezone: validBackendTz
    };
  } catch (error) {
    console.error('Error processing time slot data:', error, {
      timeSlot,
      backendTimezone,
      userTimezone
    });
    
    return {
      originalSlot: timeSlot,
      convertedTime: new Date(),
      userDisplayTime: timeSlot,
      backendTimezone: validateTimezone(backendTimezone)
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
      // Extract timezone from the availability data (assuming it's provided by backend)
      const backendTimezone = validateTimezone(dayAvailability.timezone || 'UTC');
      
      console.log(`Processing day: ${dayAvailability.day}, Backend TZ: ${backendTimezone}, User TZ: ${userTimezone}`);
      
      return {
        ...dayAvailability,
        backendTimezone, // Store validated timezone
        slots: dayAvailability.slots?.map(slot => {
          // If selectedDate is available, use it for accurate date conversion
          if (selectedDate) {
            const selectedDateJs = selectedDate.toDate(userTimezone);
            const convertedSlot = convertTimeSlotToUserTimezone(
              slot,
              selectedDateJs,
              backendTimezone,
              userTimezone
            );
            
            return {
              original: slot,
              converted: convertedSlot,
              backendTimezone: backendTimezone
            };
          }
          
          // Fallback for when no date is selected yet - use current date
          const currentDate = new Date();
          const convertedSlot = convertTimeSlotToUserTimezone(
            slot,
            currentDate,
            backendTimezone,
            userTimezone
          );
          
          return {
            original: slot,
            converted: convertedSlot,
            backendTimezone: backendTimezone
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
        displayTime: timeSlotData.userDisplayTime
      };

      handleSelectSlot(JSON.stringify(slotInfo));
    } catch (error) {
      console.error('Error selecting slot:', error, slotData);
    }
  };

  const selectedTime = selectedSlot ? (() => {
    try {
      const slotInfo = JSON.parse(selectedSlot);
      return slotInfo.displayTime || slotInfo.original;
    } catch (error) {
      console.error('Error parsing selected slot:', error, selectedSlot);
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
        
        <div className="text-sm text-gray-600 mb-3">
          Times shown in your timezone: {userTimezone}
          {convertedAvailability.length > 0 && convertedAvailability[0].backendTimezone !== userTimezone && (
            <div className="text-xs text-blue-600 mt-1">
              ⏰ Times converted from: {convertedAvailability[0].backendTimezone}
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
              </div>

              <div className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scroll--bar h-[400px]">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slotData, i) => {
                    console.log('Processing slot:', slotData);
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
                          >
                            {displayTime}
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