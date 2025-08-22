


import { format } from "date-fns";
import { Calendar } from "@/components/calendar";
import { CalendarDate, DateValue } from "@internationalized/date";
import { useBookingState } from "@/hooks/use-booking-state";

import { getPublicAvailabilityByEventIdQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";

import { useMemo, useState, useEffect } from "react";

interface BookingCalendarProps {
  eventId: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  defaultValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
}

interface ConvertedSlot {
  original: string;
  converted: string;
  backendTimezone: string;
  timeDifferenceMinutes?: number;
  conversionError?: string;
}

interface TimezoneCache {
  [key: string]: {
    offsetMinutes: number;
    cachedAt: number;
  };
}

// Cache for timezone differences
const timezoneOffsetCache: TimezoneCache = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Helper function to parse time slots in 12-hour or 24-hour format
const parseTimeSlot = (timeSlot: string): { hours: number; minutes: number } | null => {
  try {
    // Clean up the time slot string
    const cleanTimeSlot = timeSlot.trim().toUpperCase();
    
    // Check if it's 12-hour format (contains AM/PM)
    if (cleanTimeSlot.includes('AM') || cleanTimeSlot.includes('PM')) {
      const isAM = cleanTimeSlot.includes('AM');
      const timePart = cleanTimeSlot.replace(/\s*(AM|PM)/i, '').trim();
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

// Convert time slot by applying offset in minutes
const applyTimeOffset = (timeSlot: string, offsetMinutes: number): string => {
  const parsed = parseTimeSlot(timeSlot);
  if (!parsed) return timeSlot;

  const totalMinutes = parsed.hours * 60 + parsed.minutes + offsetMinutes;
  
  // Handle day overflow/underflow
  const adjustedMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  
  const newHours = Math.floor(adjustedMinutes / 60);
  const newMinutes = adjustedMinutes % 60;
  
  // Convert back to 12-hour format
  const period = newHours >= 12 ? 'PM' : 'AM';
  const displayHours = newHours === 0 ? 12 : newHours > 12 ? newHours - 12 : newHours;
  
  return `${displayHours}:${newMinutes.toString().padStart(2, '0')} ${period}`.toLowerCase();
};


const getTimezoneOffsetUsingBrowser = (
  sampleTimeSlot: string,
  date: Date,
  fromTimezone: string,
  toTimezone: string
): number => {
  const cacheKey = `${fromTimezone}-${toTimezone}`;
  const now = Date.now();
  
  // Check cache first
  if (timezoneOffsetCache[cacheKey] && 
      (now - timezoneOffsetCache[cacheKey].cachedAt) < CACHE_DURATION) {
    console.log(`🚀 Using cached offset for ${cacheKey}:`, timezoneOffsetCache[cacheKey].offsetMinutes);
    return timezoneOffsetCache[cacheKey].offsetMinutes;
  }

  try {
    const parsedTime = parseTimeSlot(sampleTimeSlot);
    if (!parsedTime) throw new Error('Could not parse sample time slot');

    // Normalize timezone names
    const normalizedFromTz = fromTimezone === 'Asia/Calcutta' ? 'Asia/Kolkata' : fromTimezone;
    const normalizedToTz = toTimezone === 'Asia/Calcutta' ? 'Asia/Kolkata' : toTimezone;
    
    // If same timezone, no conversion needed
    if (normalizedFromTz === normalizedToTz) {
      timezoneOffsetCache[cacheKey] = { offsetMinutes: 0, cachedAt: now };
      return 0;
    }

    const { hours, minutes } = parsedTime;
    
    // Create date objects in both timezones for the same local time
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Create a date with the parsed time in the 'from' timezone
    const fromDateTime = new Date();
    fromDateTime.setFullYear(year, month, day);
    fromDateTime.setHours(hours, minutes, 0, 0);
    
    // Get the timezone offset for both zones at this date
    const getTimezoneOffset = (timezone: string, date: Date): number => {
      try {
        // Create a date formatter for the specific timezone
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        return (utcDate.getTime() - tzDate.getTime()) / (1000 * 60); // offset in minutes
      } catch (error) {
        console.error(`Error getting offset for ${timezone}:`, error);
        return 0;
      }
    };
    
    const fromOffset = getTimezoneOffset(normalizedFromTz, fromDateTime);
    const toOffset = getTimezoneOffset(normalizedToTz, fromDateTime);
    
    // Calculate the difference
    //const offsetMinutes = fromOffset - toOffset;
    const offsetMinutes = -toOffset - (-fromOffset); 
    // Cache the result
    timezoneOffsetCache[cacheKey] = { offsetMinutes, cachedAt: now };
    
    console.log(`✅ Calculated offset for ${normalizedFromTz} -> ${normalizedToTz}: ${offsetMinutes} minutes`);
    console.log(`From offset: ${fromOffset}, To offset: ${toOffset}`);
    
    return offsetMinutes;
    
  } catch (error) {
    console.error('Browser timezone offset calculation failed:', error);
    
    // Fallback: Use a simple calculation based on known offsets
    const commonOffsets: { [key: string]: number } = {
      'UTC': 0,
      'Europe/London': 60, // UTC+1 (BST)
      'Asia/Kolkata': 330, // UTC+5:30
      'Asia/Calcutta': 330, // Same as Kolkata
      'America/New_York': -240, // UTC-4 (EDT)
      'America/Los_Angeles': -420, // UTC-7 (PDT)
    };
    
    const fromOffsetFallback = commonOffsets[fromTimezone] || 0;
    const toOffsetFallback = commonOffsets[toTimezone] || 0;
    const fallbackOffset = toOffsetFallback - fromOffsetFallback;
    
    timezoneOffsetCache[cacheKey] = { offsetMinutes: fallbackOffset, cachedAt: now };
    console.log(`🔄 Using fallback offset: ${fallbackOffset} minutes`);
    
    return fallbackOffset;
  }
};
// Helper function to parse time slots using a more reliable regex


// Helper function to get day of week considering timezone
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
    timezone: userTimezone,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
  } = useBookingState();

  // State for converted slots
  const [convertedSlots, setConvertedSlots] = useState<{ [key: string]: ConvertedSlot[] }>({});
  const [isConverting, setIsConverting] = useState(false);

  // Get user's browser timezone as fallback with proper Asia/Kolkata handling
  const detectedTimezone = useMemo(() => {
    try {
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Handle Asia/Calcutta -> Asia/Kolkata mapping
      if (timezone === 'Asia/Calcutta') {
        timezone = 'Asia/Kolkata';
      }
      console.log('🌍 Detected user timezone:', timezone);
      return timezone;
    } catch (error) {
      console.error('Error getting user timezone:', error);
      return 'UTC';
    }
  }, []);

  // Use timezone from useBookingState or fallback to detected
  const finalUserTimezone = userTimezone || detectedTimezone;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["availbility_single_event", eventId],
    queryFn: () => getPublicAvailabilityByEventIdQueryFn(eventId),
  });

  const availability = data?.data || [];
  console.log("📅 Original availability from backend:", availability);

  // Optimized function to convert all slots using browser-based offset calculation
  const convertSlotsForDay = async (
    day: any,
    selectedDate: DateValue,
    userTimezone: string
  ) => {
    if (!day.slots || day.slots.length === 0) return [];
    
    const backendTimezone = day.timezone || 'UTC';
    const dateToUse = selectedDate.toDate(userTimezone);
    const dayKey = `${day.day}-${backendTimezone}-${userTimezone}`;
    
    // Check if we already have conversions for this day
    if (convertedSlots[dayKey]) {
      return convertedSlots[dayKey];
    }

    console.log(`🔄 Converting slots for ${day.day} from ${backendTimezone} to ${userTimezone}`);
    console.log('📋 Original slots:', day.slots);
    
    setIsConverting(true);
    
    try {
      // Step 1: Get timezone offset using the first slot (browser-based)
      const sampleSlot = day.slots[0];
      const offsetMinutes = getTimezoneOffsetUsingBrowser(
        sampleSlot,
        dateToUse,
        backendTimezone,
        userTimezone
      );
      
      console.log(`⚡ Using offset of ${offsetMinutes} minutes for all slots`);
      
      // Step 2: Apply the same offset to all slots
      const results: ConvertedSlot[] = day.slots.map((slot: string) => {
        try {
          const convertedTime = applyTimeOffset(slot, offsetMinutes);
          
          console.log(`🔄 ${slot} -> ${convertedTime} (offset: ${offsetMinutes}min)`);
          
          return {
            original: slot,
            converted: convertedTime,
            backendTimezone: backendTimezone,
            timeDifferenceMinutes: offsetMinutes
          };
        } catch (error) {
          console.error(`Failed to convert slot ${slot}:`, error);
          return {
            original: slot,
            converted: slot, // Fallback to original
            backendTimezone: backendTimezone,
            conversionError: error instanceof Error ? error.message : 'Conversion failed'
          };
        }
      });
      
      // Cache the results
      setConvertedSlots(prev => ({
        ...prev,
        [dayKey]: results
      }));
      
      console.log(`✅ Converted ${results.length} slots in one operation`);
      console.log('🎯 Final converted slots:', results);
      
      return results;
      
    } catch (error) {
      console.error('Failed to convert slots:', error);
      
      // Fallback: return original slots
      const fallbackResults = day.slots.map((slot: string) => ({
        original: slot,
        converted: slot,
        backendTimezone: backendTimezone,
        conversionError: 'Conversion failed, showing original time'
      }));
      
      setConvertedSlots(prev => ({
        ...prev,
        [dayKey]: fallbackResults
      }));
      
      return fallbackResults;
    } finally {
      setIsConverting(false);
    }
  };

  // Convert slots when date is selected
  useEffect(() => {
    if (selectedDate && availability.length > 0 && finalUserTimezone) {
      const dayOfWeek = getDayInTimezone(selectedDate, finalUserTimezone);
      const dayAvailability = availability.find((day) => day.day === dayOfWeek);
      
      if (dayAvailability && dayAvailability.isAvailable) {
        convertSlotsForDay(dayAvailability, selectedDate, finalUserTimezone);
      }
    }
  }, [selectedDate, availability, finalUserTimezone]);

  // Get time slots for the selected date
  const timeSlots = useMemo(() => {
    if (!selectedDate || !availability.length) return [];
    
    const dayOfWeek = getDayInTimezone(selectedDate, finalUserTimezone);
    const dayAvailability = availability.find((day) => day.day === dayOfWeek);
    
    if (!dayAvailability?.isAvailable) return [];
    
    const backendTimezone = dayAvailability.timezone || 'UTC';
    const dayKey = `${dayOfWeek}-${backendTimezone}-${finalUserTimezone}`;
    
    return convertedSlots[dayKey] || [];
  }, [selectedDate, availability, finalUserTimezone, convertedSlots]);

  console.log("⏰ Time slots for selected date:", timeSlots);

  // Combined isDateUnavailable function
  const isDateUnavailable = (date: DateValue) => {
    // First check custom restrictions (date range)
    if (customIsDateUnavailable && customIsDateUnavailable(date)) {
      console.log('❌ Date unavailable due to custom restrictions:', date.toString());
      return true;
    }

    // Then check day availability
    const dayOfWeek = getDayInTimezone(date, finalUserTimezone);
    const dayAvailability = availability.find((day) => day.day === dayOfWeek);
    const isDayUnavailable = !dayAvailability?.isAvailable;
    
    if (isDayUnavailable) {
      console.log('❌ Date unavailable due to day availability:', date.toString(), dayOfWeek);
    }
    
    return isDayUnavailable;
  };

  const handleChangeDate = (newDate: DateValue) => {
    const calendarDate = newDate as CalendarDate;
    handleSelectSlot(null);
    handleSelectDate(calendarDate);
  };

  const handleSlotSelection = (slotData: ConvertedSlot) => {
    try {
      console.log('🎯 Selecting slot:', slotData);
      
      if (!selectedDate) {
        console.error("❌ No date selected");
        return;
      }

      // Store the converted time as the slot value
      const displayTime = slotData.converted || slotData.original;
      console.log('✅ Setting selected slot to:', displayTime);
      handleSelectSlot(displayTime);
      
    } catch (error) {
      console.error('❌ Error selecting slot:', error, slotData);
      handleSelectSlot(slotData.original || slotData.converted);
    }
  };

  const selectedTime = selectedSlot;

  console.log('🎯 Current selectedSlot:', selectedSlot);
  console.log('🎯 Current selectedTime:', selectedTime);

  // Get user's timezone display name
  const getUserTimezoneDisplay = () => {
    try {
      const now = new Date();
      const timezoneName = now.toLocaleTimeString('en', {
        timeZoneName: 'short',
        timeZone: finalUserTimezone
      }).split(' ').pop();
      
      const displayName = finalUserTimezone.replace(/_/g, ' ').replace('Asia/Kolkata', 'Asia/Kolkata (India)');
      return `${displayName} (${timezoneName})`;
    } catch {
      return finalUserTimezone;
    }
  };

  // Get backend timezone for display
  const getBackendTimezone = () => {
    if (!selectedDate || !availability.length) return null;
    
    const dayOfWeek = getDayInTimezone(selectedDate, finalUserTimezone);
    const dayAvailability = availability.find((day) => day.day === dayOfWeek);
    
    return dayAvailability?.timezone || 'UTC';
  };

  const backendTimezone = getBackendTimezone();
  const showConversionInfo = backendTimezone && backendTimezone !== finalUserTimezone;

  return (
    <div className="relative lg:flex-[1_1_50%] w-full flex-shrink-0 transition-all duration-220 ease-out p-4 pr-0">
      {(isFetching || isConverting) && (
        <div className="flex bg-white/60 !z-30 absolute w-[95%] h-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader size="lg" color="black" />
            <div className="text-sm text-gray-600">
              {isFetching ? 'Loading availability...' : 'Converting timezone...'}
            </div>
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
              ⚡ Times automatically converted from: {backendTimezone}
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
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
            
              timezone={finalUserTimezone}
              onChange={handleChangeDate}
              isDateUnavailable={isDateUnavailable}
            />
          </div>
          {selectedDate && availability ? (
            <div className="w-full flex-shrink-0 mt-3 lg:mt-0 max-w-xs md:max-w-[40%] pt-0 overflow-hidden md:ml-[-15px]">
              <div className="w-full pb-3 flex flex-col md:flex-row justify-between pr-8">
                <h3 className="mt-0 mb-[10px] font-normal text-base leading-[38px]">
                  {format(selectedDate.toDate(finalUserTimezone), "EEEE d")}
                </h3>
              </div>

              <div className="flex-[1_1_100px] pr-[8px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scroll--bar h-[400px]">
                {isConverting ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <Loader size="md" />
                      <div>Converting timezone...</div>
                      <div className="text-xs">Using browser-based conversion...</div>
                    </div>
                  </div>
                ) : timeSlots.length > 0 ? (
                  timeSlots.map((slotData, i) => {
                    console.log('🎨 Rendering slot:', slotData);
                    const displayTime = slotData.converted || slotData.original;
                    const isSelected = selectedTime === displayTime;
                    const hasError = slotData.conversionError;
                    
                    console.log(`Slot ${displayTime}: selected=${isSelected}, selectedTime=${selectedTime}, error=${hasError}`);
                    
                    return (
                      <div role="list" key={i}>
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
                              {displayTime}
                              {showConversionInfo && !hasError && (
                                <div className="text-xs opacity-75">
                                  (from {slotData.original})
                                </div>
                              )}
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
                            className={`w-full h-[52px] cursor-pointer border font-semibold tracking-wide transition-all duration-400 ease-in-out rounded-[4px] ${
                              hasError
                                ? "border-orange-400 text-orange-600 hover:border-orange-500"
                                : "border-[rgba(0,105,255,0.5)] text-[rgb(0,105,255)] hover:border-2 hover:border-[rgb(0,105,255)]"
                            } ${
                              isSelected
                                ? "opacity-0"
                                : "opacity-100"
                            }`}
                            onClick={() => handleSlotSelection(slotData)}
                          >
                            <div className="flex flex-col items-center">
                              <div>{displayTime}</div>
                              {hasError && (
                                <div className="text-xs text-orange-500">
                                  (conversion failed)
                                </div>
                              )}
                              {showConversionInfo && !hasError && slotData.original !== displayTime && (
                                <div className="text-xs opacity-60">
                                  from {slotData.original}
                                  {slotData.timeDifferenceMinutes !== undefined && (
                                    <span className="ml-1 text-green-600">
                                      ({slotData.timeDifferenceMinutes > 0 ? '+' : ''}{Math.round(slotData.timeDifferenceMinutes/60 * 10)/10}h)
                                    </span>
                                  )}
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