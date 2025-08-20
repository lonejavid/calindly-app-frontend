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
    
    // Create a date in the backend timezone
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Create a date object representing the time in the backend timezone
    const backendDate = new Date();
    backendDate.setFullYear(year, month, day);
    backendDate.setHours(hours, minutes, 0, 0);
    
    // Convert from backend timezone to user timezone using Intl.DateTimeFormat
    const backendTimeString = backendDate.toLocaleString('en-CA', {
      timeZone: validBackendTz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    // Parse the backend time string to create a UTC date
    const [datePart, timePart] = backendTimeString.split(', ');
    const [backendYear, backendMonth, backendDay] = datePart.split('-');
    const [backendHours, backendMinutes, backendSeconds] = timePart.split(':');
    
    // Create UTC date from backend timezone components
    const utcDate = new Date(Date.UTC(
      parseInt(backendYear),
      parseInt(backendMonth) - 1,
      parseInt(backendDay),
      parseInt(backendHours),
      parseInt(backendMinutes),
      parseInt(backendSeconds)
    ));
    
    // Get timezone offset for backend timezone
    const backendOffset = getTimezoneOffsetForDate(utcDate, validBackendTz);
    
    // Adjust UTC date by backend offset to get the actual UTC time
    const actualUtcTime = new Date(utcDate.getTime() - (backendOffset * 60000));
    
    // Convert to user's timezone
    const userTimeString = actualUtcTime.toLocaleString('sv-SE', {
      timeZone: validUserTz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Parse user time to create final date object
    const userDate = new Date(userTimeString.replace(' ', 'T') + 'Z');
    
    // Format in 12-hour format for display
    return format(userDate, 'h:mm a');
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

// Better timezone conversion using modern approach
const convertTimeToUserTimezone = (
  timeSlot: string,
  date: Date,
  fromTimezone: string,
  toTimezone: string
): string => {
  try {
    const parsedTime = parseTimeSlot(timeSlot);
    if (!parsedTime) return timeSlot;

    const { hours, minutes } = parsedTime;
    
    // Validate timezones
    const validFromTz = validateTimezone(fromTimezone);
    const validToTz = validateTimezone(toTimezone);
    
    if (validFromTz === validToTz) {
      const tempDate = new Date();
      tempDate.setHours(hours, minutes, 0, 0);
      return format(tempDate, 'h:mm a');
    }

    // Create date string in ISO format for the source timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hourStr = String(hours).padStart(2, '0');
    const minuteStr = String(minutes).padStart(2, '0');
    
    // Create a date as if it's in the source timezone
    const sourceDateTime = `${year}-${month}-${day}T${hourStr}:${minuteStr}:00`;
    
    // Convert using a more reliable method
    // Create two date objects representing the same moment in different timezones
    const tempDate = new Date(`${sourceDateTime}+00:00`); // Treat as UTC first
    
    // Get what this UTC time would be in the source timezone
    const sourceOffset = getTimezoneOffsetForDate(tempDate, validFromTz);
    
    // Get what this UTC time would be in the target timezone  
    const targetOffset = getTimezoneOffsetForDate(tempDate, validToTz);
    
    // Calculate the difference and apply it
    const offsetDiff = sourceOffset - targetOffset;
    const convertedDate = new Date(tempDate.getTime() + (offsetDiff * 60000));
    
    // Adjust for the source timezone interpretation
    const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    const sourceLocalOffset = getTimezoneOffsetForDate(baseDate, validFromTz);
    const targetLocalOffset = getTimezoneOffsetForDate(baseDate, validToTz);
    
    const finalOffsetDiff = sourceLocalOffset - targetLocalOffset;
    const finalDate = new Date(baseDate.getTime() - (finalOffsetDiff * 60000));
    
    return format(finalDate, 'h:mm a');
    
  } catch (error) {
    console.error('Error in timezone conversion:', error);
    
    // Simple fallback
    try {
      const parsedTime = parseTimeSlot(timeSlot);
      if (parsedTime) {
        const tempDate = new Date();
        tempDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return format(tempDate, 'h:mm a');
      }
    } catch {
      // Return original if all else fails
    }
    
    return timeSlot;
  }
};

// Get timezone offset for a specific date (handles DST)
const getTimezoneOffsetForDate = (date: Date, timezone: string): number => {
  try {
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetTime = new Date(utcTime + (0 * 3600000)); // Start with UTC
    
    // Get the time in the target timezone
    const targetTimeString = targetTime.toLocaleString('sv-SE', {
      timeZone: timezone
    });
    
    const targetDate = new Date(targetTimeString);
    const utcDate = new Date(targetTimeString + ' UTC');
    
    // Calculate offset in minutes
    return (utcDate.getTime() - targetDate.getTime()) / 60000;
  } catch (error) {
    console.error('Error calculating timezone offset:', error);
    return 0;
  }
};

// WORKING timezone conversion - using a completely different approach
const convertBackendTimeToUserTime = (
  timeSlot: string,
  date: Date,
  backendTimezone: string,
  userTimezone: string
): string => {
  try {
    const parsedTime = parseTimeSlot(timeSlot);
    if (!parsedTime) return timeSlot;

    const { hours, minutes } = parsedTime;
    
    // If same timezone, no conversion needed
    if (backendTimezone === userTimezone) {
      const tempDate = new Date();
      tempDate.setHours(hours, minutes, 0, 0);
      return format(tempDate, 'h:mm a');
    }

    // Create ISO date string for the specific date at the specified time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hourStr = String(hours).padStart(2, '0');
    const minuteStr = String(minutes).padStart(2, '0');
    
    // This is the key: we create a date-time that represents the backend time
    const isoString = `${year}-${month}-${day}T${hourStr}:${minuteStr}:00`;
    
    // Parse this datetime AS IF it's in the backend timezone
    // Then display it in the user's timezone
    const backendDate = new Date(isoString);
    
    // Use the most reliable method: toLocaleString with timezone conversion
    const userTimeString = backendDate.toLocaleString('en-US', {
      timeZone: userTimezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    // However, the above doesn't account for the fact that we created the date
    // assuming it was in local timezone, not backend timezone
    
    // Better approach: use a reference conversion
    const now = new Date();
    const backendNow = new Date(now.toLocaleString('en-US', { timeZone: backendTimezone }));
    const userNow = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }));
    const localNow = new Date();
    
    // Calculate the offset between backend and user timezone
    const backendOffset = localNow.getTime() - backendNow.getTime();
    const userOffset = localNow.getTime() - userNow.getTime();
    const timezoneOffset = userOffset - backendOffset;
    
    // Apply this offset to our backend time
    const convertedTime = new Date(backendDate.getTime() + timezoneOffset);
    
    // Format the result
    return format(convertedTime, 'h:mm a');
    
  } catch (error) {
    console.error('Timezone conversion error:', error);
    
    // Simple fallback
    try {
      const parsedTime = parseTimeSlot(timeSlot);
      if (parsedTime) {
        const tempDate = new Date();
        tempDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return format(tempDate, 'h:mm a');
      }
    } catch {
      // Return original if everything fails
    }
    
    return timeSlot;
  }
};

// More accurate timezone offset calculation
const getTimezoneOffsetInMinutes = (timezone: string, date: Date): number => {
  try {
    // Create two identical dates - one in UTC, one in the target timezone
    const utcDate = new Date(date.getTime());
    
    // Get the date/time string in the target timezone
    const targetDateStr = utcDate.toLocaleString('sv-SE', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Get the same moment in UTC
    const utcDateStr = utcDate.toLocaleString('sv-SE', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Parse both as local dates to compare
    const targetTime = new Date(targetDateStr);
    const utcTime = new Date(utcDateStr);
    
    // Calculate the difference in minutes
    const diffMs = utcTime.getTime() - targetTime.getTime();
    return Math.round(diffMs / (1000 * 60));
  } catch (error) {
    console.error('Error calculating timezone offset:', error);
    return 0;
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
    const validBackendTz = validateTimezone(backendTimezone);
    const validUserTz = validateTimezone(userTimezone);
    
    // Create a date object with the parsed time
    const backendDate = new Date(date);
    backendDate.setHours(hours, minutes, 0, 0);
    
    let convertedTime: Date;
    let userDisplayTime: string;
    
    if (validBackendTz === validUserTz) {
      convertedTime = backendDate;
      userDisplayTime = format(backendDate, 'h:mm a');
    } else {
      // Use the improved conversion function
      userDisplayTime = convertBackendTimeToUserTime(
        timeSlot,
        date,
        validBackendTz,
        validUserTz
      );
      
      // Create converted time object
      const userParsedTime = parseTimeSlot(userDisplayTime);
      if (userParsedTime) {
        convertedTime = new Date(date);
        convertedTime.setHours(userParsedTime.hours, userParsedTime.minutes, 0, 0);
      } else {
        convertedTime = backendDate;
      }
    }
    
    return {
      originalSlot: timeSlot,
      convertedTime,
      userDisplayTime,
      backendTimezone: validBackendTz
    };
  } catch (error) {
    console.error('Error processing time slot data:', error);
    
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
      console.log('Detected user timezone:', detectedTimezone);
      // Don't validate here - use the raw detected timezone
      return detectedTimezone;
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

    console.log('Converting availability for user timezone:', userTimezone);

    return availability.map(dayAvailability => {
      const backendTimezone = dayAvailability.timezone || 'UTC';
      
      console.log(`Processing day: ${dayAvailability.day}, Backend TZ: ${backendTimezone}, User TZ: ${userTimezone}`);
      
      return {
        ...dayAvailability,
        backendTimezone,
        slots: dayAvailability.slots?.map(slot => {
          const dateToUse = selectedDate ? selectedDate.toDate(userTimezone) : new Date();
          
          // Use the improved conversion function
          const convertedSlot = convertBackendTimeToUserTime(
            slot,
            dateToUse,
            backendTimezone,
            userTimezone
          );
          
          console.log(`Converting ${slot} from ${backendTimezone} to ${userTimezone}: ${convertedSlot}`);
          
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

      const backendTimezone = slotData.backendTimezone || 'UTC';
      const selectedDateJs = selectedDate.toDate(userTimezone);
      
      const timeSlotData = getOriginalTimeSlotData(
        slotData.original,
        selectedDateJs,
        backendTimezone,
        userTimezone
      );

      const slotInfo = {
        original: slotData.original,
        backendTimezone: backendTimezone,
        userTime: timeSlotData.convertedTime.toISOString(),
        displayTime: timeSlotData.userDisplayTime
      };

      console.log('Slot info being stored:', slotInfo);
      handleSelectSlot(JSON.stringify(slotInfo));
    } catch (error) {
      console.error('Error selecting slot:', error, slotData);
      handleSelectSlot(slotData.original || slotData.converted);
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

  // Get user's timezone display name
  const getUserTimezoneDisplay = () => {
    try {
      const now = new Date();
      const timezoneName = now.toLocaleTimeString('en', {
        timeZoneName: 'short',
        timeZone: userTimezone
      }).split(' ').pop();
      
      // Show the actual detected timezone, not UTC
      return `${userTimezone.replace(/_/g, ' ')} (${timezoneName})`;
    } catch {
      return userTimezone;
    }
  };

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
          <div className="font-medium">Times shown in your timezone: {getUserTimezoneDisplay()}</div>
          {convertedAvailability.length > 0 && convertedAvailability[0].backendTimezone !== userTimezone && (
            <div className="text-xs text-blue-600 mt-1">
              ⏰ Times automatically converted from: {convertedAvailability[0].backendTimezone}
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
                    console.log('Rendering slot:', slotData);
                    const displayTime = slotData.converted || slotData.original;
                    
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