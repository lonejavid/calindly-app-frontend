// import { parseAsBoolean, useQueryState } from "nuqs";
// import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// export const useBookingState = () => {
//   console.log("this is a simple tect ");
//   const [selectedDate, setSelectedDate] = useQueryState<CalendarDate>("date", {
//     parse: (value) =>
//       new CalendarDate(
//         parseInt(value.split("-")[0]),
//         parseInt(value.split("-")[1]),
//         parseInt(value.split("-")[2])
//       ),
//     serialize: (value) => `${value.year}-${value.month}-${value.day}`,
//   });

//   const [selectedSlot, setSelectedSlot] = useQueryState("slot");

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
//     setNext(true);
//   };

//   const handleBack = () => {
//     setNext(false);
//   };

//   const handleSuccess = (value: boolean) => {
//     setIsSuccess(value || true);
//   };

//   console.log("Current state - next:", next, "selectedSlot:", selectedSlot, "selectedDate:", selectedDate);

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
         console.log("this is a simple test..........");
        // Additional validation for reasonable date ranges
        if (year < 1900 || year > 3000 || month < 1 || month > 12 || day < 1 || day > 31) {
          return null;
        }
        console.log("this is what i wanted to have ",new CalendarDate(year, month, day));
        
        return new CalendarDate(year, month, day);
      } catch (error) {
        console.error("Error parsing date:", error);
        return null;
      }
    },
    serialize: (value) => {
      if (!value) return "";
      return `${value.year}-${value.month}-${value.day}`;
    },
    defaultValue: null, // Explicitly set default value
  });

  const [selectedSlot, setSelectedSlot] = useQueryState("slot", {
    defaultValue: null, // Add explicit default
  });

  const [next, setNext] = useQueryState(
    "next",
    parseAsBoolean.withDefault(false)
  );

  const [timezone, setTimezone] = useQueryState("timezone", {
    defaultValue: getLocalTimeZone(), // Default to user's system timezone
  });

  const [isSuccess, setIsSuccess] = useQueryState(
    "success",
    parseAsBoolean.withDefault(false)
  );

  const handleSelectDate = (date: CalendarDate) => {
    console.log('handleSelectDate called with:', date);
    setSelectedDate(date);
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
      // For the simple approach, just store the display time directly
      // This will be used for UI comparison
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
    
    setNext(true);
  };

  const handleBack = () => {
    setNext(false);
  };

  const handleSuccess = (value: boolean) => {
    setIsSuccess(value || true);
  };

  console.log("Current state - next:", next, "selectedSlot:", selectedSlot, "selectedDate:", selectedDate,"success is ",isSuccess);

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