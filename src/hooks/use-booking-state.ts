
// import { parseAsBoolean, useQueryState } from "nuqs";
// import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// export const useBookingState = () => {

  
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

export const useBookingState = () => {
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
        
        console.log("Parsing date from URL:", year, "month", month, "day", day);
        
        // Additional validation for reasonable date ranges
        if (year < 1900 || year > 3000 || month < 1 || month > 12 || day < 1 || day > 31) {
          return null;
        }
        
        const calendarDate = new CalendarDate(year, month, day);
        console.log("Parsed CalendarDate:", calendarDate.toString());
        
        return calendarDate;
      } catch (error) {
        console.error("Error parsing date:", error);
        return null;
      }
    },
    serialize: (value) => {
      if (!value) return "";
      
      // Ensure we're serializing the CalendarDate correctly
      const serialized = `${value.year}-${value.month.toString().padStart(2, '0')}-${value.day.toString().padStart(2, '0')}`;
      console.log("Serializing date:", value.toString(), "as:", serialized);
      
      return serialized;
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
    console.log('handleSelectDate called with:', date.toString());
    
    // Ensure we're working with a proper CalendarDate
    if (date && typeof date.year !== 'undefined' && typeof date.month !== 'undefined' && typeof date.day !== 'undefined') {
      setSelectedDate(date);
    } else {
      console.error('Invalid CalendarDate object:', date);
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
      console.log("Storing slot:", slot, "for date:", selectedDate.toString());
      setSelectedSlot(slot);
    } catch (error) {
      console.error("Error in handleSelectSlot:", error);
      setSelectedSlot(null);
    }
  };

  const handleNext = () => {
    console.log('handleNext called');
    console.log('Current selectedSlot:', selectedSlot);
    console.log('Current selectedDate:', selectedDate?.toString());
    
    // Add validation before setting next to true
    if (!selectedSlot || !selectedDate) {
      console.error("Cannot proceed: missing date or slot selection");
      console.error("selectedSlot:", selectedSlot);
      console.error("selectedDate:", selectedDate?.toString());
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

  // Add better logging
  console.log("=== useBookingState Current State ===");
  console.log("selectedDate:", selectedDate?.toString());
  console.log("selectedSlot:", selectedSlot);
  console.log("next:", next);
  console.log("timezone:", timezone);
  console.log("isSuccess:", isSuccess);
  console.log("=====================================");

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
  };
};