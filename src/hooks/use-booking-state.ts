
// import { parseAsBoolean, useQueryState } from "nuqs";
// import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// export const useBookingState = () => {
//   console.log("this is a simple test");
  
//   const [selectedDate, setSelectedDate] = useQueryState<CalendarDate | null>("date", {
//     parse: (value) => {
//       // Add null check and validation
//       if (!value || typeof value !== 'string') {
//         return null;
//       }
      
//       try {
//         const parts = value.split("-");
//         if (parts.length !== 3) {
//           return null;
//         }
         
//         const year = parseInt(parts[0]);
//         const month = parseInt(parts[1]);
//         const day = parseInt(parts[2]);
        
//         // Validate the parsed values
//         if (isNaN(year) || isNaN(month) || isNaN(day)) {
//           return null;
//         }
//          console.log("this is a simple test..........",year,"month ",month,"day ",day);
//         // Additional validation for reasonable date ranges
//         if (year < 1900 || year > 3000 || month < 1 || month > 12 || day < 1 || day > 31) {
//           return null;
//         }
//         console.log("this is what i wanted to have ",new CalendarDate(year, month, day));
        
//         return new CalendarDate(year, month, day);
//       } catch (error) {
//         console.error("Error parsing date:", error);
//         return null;
//       }
//     },
//     serialize: (value) => {
//       if (!value) return "";
//       return `${value.year}-${value.month}-${value.day}`;
//     },
//     defaultValue: null, // Explicitly set default value
//   });

//   const [selectedSlot, setSelectedSlot] = useQueryState("slot", {
//     defaultValue: null, // Add explicit default
//   });

//   const [next, setNext] = useQueryState(
//     "next",
//     parseAsBoolean.withDefault(false)
//   );

//   const [timezone, setTimezone] = useQueryState("timezone", {
//     defaultValue: getLocalTimeZone(), // Default to user's system timezone
//   });

//   const [isSuccess, setIsSuccess] = useQueryState(
//     "success",
//     parseAsBoolean.withDefault(false)
//   );

//   const handleSelectDate = (date: CalendarDate) => {
//     console.log('handleSelectDate called with:', date);
//     setSelectedDate(date);
//   };

//   const handleSelectSlot = (slot: string | null) => {
//     console.log('handleSelectSlot called with:', slot);
    
//     if (!slot) {
//       setSelectedSlot(null);
//       return;
//     }

//     if (!selectedDate) {
//       console.error("No date selected");
//       setSelectedSlot(null);
//       return;
//     }

//     try {
//       // For the simple approach, just store the display time directly
//       // This will be used for UI comparison
//       console.log("Storing slot:", slot);
//       setSelectedSlot(slot);
//     } catch (error) {
//       console.error("Error in handleSelectSlot:", error);
//       setSelectedSlot(null);
//     }
//   };

//   const handleNext = () => {
//     console.log('handleNext called, current selectedSlot:', selectedSlot);
    
//     // Add validation before setting next to true
//     if (!selectedSlot || !selectedDate) {
//       console.error("Cannot proceed: missing date or slot selection");
//       return;
//     }
    
//     setNext(true);
//   };

//   const handleBack = () => {
//     setNext(false);
//   };

//   const handleSuccess = (value: boolean) => {
//     setIsSuccess(value || true);
//   };

//   console.log("Current state - next:", next, "selectedSlot:", selectedSlot, "selectedDate:", selectedDate,"success is ",isSuccess);

//   return {
//     selectedDate,
//     selectedSlot,
//     next: next,
//     timezone,
//     isSuccess,
//     handleSelectDate,
//     handleSelectSlot,
//     handleNext,
//     handleBack,
//     handleSuccess,
//     setTimezone,
//   };
// };





import { parseAsBoolean, useQueryState } from "nuqs";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { format } from "date-fns";

// Safe helper functions to prevent invalid date errors

// Helper function to safely create a Date object with validation
const createSafeDate = (year: number, month: number, day: number, hours: number = 0, minutes: number = 0): Date | null => {
  try {
    // Basic range validation
    if (year < 1900 || year > 3000 || month < 0 || month > 11 || day < 1 || day > 31 || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return null;
    }

    const date = new Date(year, month, day, hours, minutes, 0, 0);
    
    // Validate the date actually exists (handles Feb 30, etc.)
    if (date.getFullYear() !== year || 
        date.getMonth() !== month || 
        date.getDate() !== day ||
        date.getHours() !== hours ||
        date.getMinutes() !== minutes) {
      return null;
    }

    return date;
  } catch (error) {
    console.error("Error creating safe date:", error);
    return null;
  }
};

// Safe parseTimeSlot with better validation
const parseTimeSlotSafe = (timeSlot: string): { hours: number; minutes: number } | null => {
  try {
    if (!timeSlot || typeof timeSlot !== 'string') {
      return null;
    }

    // Check if it's 12-hour format (contains AM/PM)
    if (timeSlot.includes('AM') || timeSlot.includes('PM')) {
      const isAM = timeSlot.toLowerCase().includes('am');
      const timePart = timeSlot.replace(/\s*(AM|PM)/gi, '').trim();
      const parts = timePart.split(':');
      
      if (parts.length < 1 || parts.length > 2) {
        return null;
      }

      let hours = parseInt(parts[0], 10);
      const minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;

      // Validate parsed values
      if (isNaN(hours) || isNaN(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
        return null;
      }

      // Convert to 24-hour format
      if (!isAM && hours !== 12) {
        hours += 12;
      } else if (isAM && hours === 12) {
        hours = 0;
      }

      return { hours, minutes };
    } else {
      // Assume 24-hour format
      const parts = timeSlot.split(':');
      
      if (parts.length < 1 || parts.length > 2) {
        return null;
      }

      const hours = parseInt(parts[0], 10);
      const minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;

      // Validate ranges
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return null;
      }

      return { hours, minutes };
    }
  } catch (error) {
    console.error('Error parsing time slot:', error, timeSlot);
    return null;
  }
};

// Helper function to validate timezone
const validateTimezone = (timezone: string): string => {
  try {
    // Test if timezone is valid by trying to format a date with it
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return timezone;
  } catch (error) {
    console.error('Invalid timezone:', timezone, 'falling back to local timezone');
    return getLocalTimeZone();
  }
};

// Helper function to get timezone offset in minutes
const getTimezoneOffset = (timezone: string, date: Date): number => {
  try {
    const utc1 = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const utc2 = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    return (utc2.getTime() - utc1.getTime());
  } catch (error) {
    console.error('Error getting timezone offset:', error);
    return 0;
  }
};

// Safe version of addHoursToTime
const addHoursToTimeSafe = (timeString: string, hoursToAdd: number): string => {
  try {
    const parsedTime = parseTimeSlotSafe(timeString);
    if (!parsedTime) return timeString;

    const { hours, minutes } = parsedTime;
    
    // Convert to minutes for easier calculation
    const totalMinutes = (hours * 60) + minutes + (hoursToAdd * 60);
    
    // Handle day overflow/underflow
    const finalMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
    
    const finalHours = Math.floor(finalMinutes / 60);
    const finalMins = finalMinutes % 60;
    
    const resultDate = createSafeDate(2000, 0, 1, finalHours, finalMins);
    if (!resultDate) {
      return timeString;
    }
    
    return format(resultDate, 'h:mm a');
  } catch (error) {
    console.error('Error in addHoursToTimeSafe:', error);
    return timeString;
  }
};

// Fallback conversion for common timezone pairs
const fallbackTimeConversion = (timeSlot: string, fromTz: string, toTz: string): string => {
  try {
    // Manual mapping for common conversions
    const conversionMap: Record<string, Record<string, number>> = {
      'America/Chicago': {
        'Asia/Kolkata': 10.5, // CDT to IST
        'Asia/Calcutta': 10.5
      },
      'America/New_York': {
        'Asia/Kolkata': 9.5, // EDT to IST  
        'Asia/Calcutta': 9.5
      }
    };

    const hoursToAdd = conversionMap[fromTz]?.[toTz];
    if (hoursToAdd !== undefined) {
      return addHoursToTimeSafe(timeSlot, hoursToAdd);
    }

    // If no mapping found, return original
    return timeSlot;
  } catch (error) {
    console.error('Fallback conversion failed:', error);
    return timeSlot;
  }
};

// Safe conversion function with extensive validation
const convertBackendTimeToUserTimeSafe = (
  timeSlot: string,
  date: Date,
  backendTimezone: string,
  userTimezone: string
): string => {
  try {
    // Validate inputs
    if (!timeSlot || !date || isNaN(date.getTime()) || !backendTimezone || !userTimezone) {
      console.error("Invalid inputs for time conversion");
      return timeSlot;
    }

    const parsedTime = parseTimeSlotSafe(timeSlot);
    if (!parsedTime) {
      console.error("Could not parse time slot:", timeSlot);
      return timeSlot;
    }

    const { hours, minutes } = parsedTime;
    
    // Validate and normalize timezones
    const validBackendTz = validateTimezone(backendTimezone);
    const validUserTz = validateTimezone(userTimezone);
    
    // If same timezone, no conversion needed
    if (validBackendTz === validUserTz) {
      const safeDate = createSafeDate(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
      if (!safeDate) {
        return timeSlot;
      }
      return format(safeDate, 'h:mm a');
    }

    console.log(`Converting ${timeSlot} from ${validBackendTz} to ${validUserTz}`);

    // Create a safe date for the backend time
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    const safeBackendDate = createSafeDate(year, month, day, hours, minutes);
    if (!safeBackendDate) {
      console.error("Could not create safe backend date");
      return timeSlot;
    }

    try {
      // Use Intl.DateTimeFormat for safe timezone conversion
      const backendFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: validBackendTz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      const userFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: validUserTz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      // Create a UTC date that represents the backend time
      const utcDate = new Date(Date.UTC(year, month, day, hours, minutes));
      
      // Get the offset difference
      const backendOffset = getTimezoneOffset(validBackendTz, utcDate);
      const userOffset = getTimezoneOffset(validUserTz, utcDate);
      
      // Apply the offset difference
      const offsetDifference = userOffset - backendOffset;
      const convertedUTC = new Date(utcDate.getTime() + offsetDifference);
      
      // Format in user timezone
      const userDisplay = userFormatter.format(convertedUTC);
      
      console.log(`${timeSlot} (${validBackendTz}) -> ${userDisplay} (${validUserTz})`);
      return userDisplay.toLowerCase();
      
    } catch (conversionError) {
      console.error('Timezone conversion failed:', conversionError);
      // Fallback to manual calculation for common cases
      return fallbackTimeConversion(timeSlot, validBackendTz, validUserTz);
    }
    
  } catch (error) {
    console.error('Time conversion error:', error);
    return timeSlot;
  }
};

// Main hook with integrated safe date handling
export const useBookingState = () => {
  console.log("this is a simple test");

  const [selectedDate, setSelectedDate] = useQueryState<CalendarDate | null>("date", {
    parse: (value) => {
      // Add null check and validation
      if (!value || typeof value !== 'string') {
        return null;
      }

      try {
        const parts = value.split("-");
        if (parts.length !== 3) {
          return null;
        }

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        // Validate the parsed values
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
          return null;
        }

        console.log("this is a simple test..........", year, "month ", month, "day ", day);
        
        // Additional validation for reasonable date ranges
        if (year < 1900 || year > 3000 || month < 1 || month > 12 || day < 1 || day > 31) {
          return null;
        }

        // Use safe date creation for validation
        const testDate = createSafeDate(year, month - 1, day);
        if (!testDate) {
          console.error("Invalid date detected:", year, month, day);
          return null;
        }

        const calendarDate = new CalendarDate(year, month, day);
        console.log("this is what i wanted to have ", calendarDate);
        
        return calendarDate;
      } catch (error) {
        console.error("Error parsing date:", error);
        return null;
      }
    },
    serialize: (value) => {
      if (!value) return "";
      
      // Add validation before serializing
      try {
        // Ensure the CalendarDate is valid using safe date creation
        const testDate = createSafeDate(value.year, value.month - 1, value.day);
        if (!testDate) {
          console.error("Invalid CalendarDate for serialization:", value);
          return "";
        }
        return `${value.year}-${value.month}-${value.day}`;
      } catch (error) {
        console.error("Error serializing date:", error);
        return "";
      }
    },
    defaultValue: null,
  });

  const [selectedSlot, setSelectedSlot] = useQueryState("slot", {
    defaultValue: null,
  });

  const [next, setNext] = useQueryState(
    "next",
    parseAsBoolean.withDefault(false)
  );

  const [timezone, setTimezone] = useQueryState("timezone", {
    defaultValue: getLocalTimeZone(),
  });

  const [isSuccess, setIsSuccess] = useQueryState(
    "success",
    parseAsBoolean.withDefault(false)
  );

  const handleSelectDate = (date: CalendarDate) => {
    console.log('handleSelectDate called with:', date);
    
    // Validate the date using safe date creation
    try {
      const testDate = createSafeDate(date.year, date.month - 1, date.day);
      if (!testDate) {
        console.error("Invalid date provided to handleSelectDate");
        return;
      }
      setSelectedDate(date);
    } catch (error) {
      console.error("Error validating date in handleSelectDate:", error);
    }
  };

  const handleSelectSlot = (slot: string | null) => {
    console.log('handleSelectSlot called with:', slot);

    if (!slot) {
      setSelectedSlot(null);
      return;
    }

    if (!selectedDate) {
      console.error("No date selected");
      setSelectedSlot(null);
      return;
    }

    try {
      // Validate that we can create a proper date/time combination
      const testDate = createSafeDate(selectedDate.year, selectedDate.month - 1, selectedDate.day);
      if (!testDate) {
        console.error("Invalid selected date for slot selection");
        setSelectedSlot(null);
        return;
      }

      // Additional validation of the time slot format
      const parsedSlot = parseTimeSlotSafe(slot);
      if (!parsedSlot) {
        console.error("Invalid time slot format:", slot);
        setSelectedSlot(null);
        return;
      }

      console.log("Storing slot:", slot);
      setSelectedSlot(slot);
    } catch (error) {
      console.error("Error in handleSelectSlot:", error);
      setSelectedSlot(null);
    }
  };

  const handleNext = () => {
    console.log('handleNext called, current selectedSlot:', selectedSlot);

    // Add validation before setting next to true
    if (!selectedSlot || !selectedDate) {
      console.error("Cannot proceed: missing date or slot selection");
      return;
    }

    // Additional validation that the date is valid using safe date creation
    try {
      const testDate = createSafeDate(selectedDate.year, selectedDate.month - 1, selectedDate.day);
      if (!testDate) {
        console.error("Cannot proceed: invalid date selected");
        return;
      }

      // Validate the time slot
      const parsedSlot = parseTimeSlotSafe(selectedSlot);
      if (!parsedSlot) {
        console.error("Cannot proceed: invalid time slot format");
        return;
      }
    } catch (error) {
      console.error("Error validating date/slot in handleNext:", error);
      return;
    }

    setNext(true);
  };

  const handleBack = () => {
    setNext(false);
  };

  const handleSuccess = (value: boolean) => {
    setIsSuccess(value || true);
  };

  // Helper method to convert time slots safely
  const convertTimeSlot = (
    timeSlot: string,
    backendTimezone: string,
    userTimezone: string = timezone
  ): string => {
    if (!selectedDate) {
      return timeSlot;
    }

    try {
      const date = createSafeDate(selectedDate.year, selectedDate.month - 1, selectedDate.day);
      if (!date) {
        return timeSlot;
      }

      return convertBackendTimeToUserTimeSafe(timeSlot, date, backendTimezone, userTimezone);
    } catch (error) {
      console.error("Error converting time slot:", error);
      return timeSlot;
    }
  };

  console.log("Current state - next:", next, "selectedSlot:", selectedSlot, "selectedDate:", selectedDate, "success is ", isSuccess);

  return {
    selectedDate,
    selectedSlot,
    next: next,
    timezone,
    isSuccess,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
    handleBack,
    handleSuccess,
    setTimezone,
    convertTimeSlot,
    // Export helper functions for use in other components
    createSafeDate,
    parseTimeSlotSafe,
    convertBackendTimeToUserTimeSafe,
    addHoursToTimeSafe,
  };
};