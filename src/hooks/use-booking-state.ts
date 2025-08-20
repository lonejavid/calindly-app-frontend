// import { parseAsBoolean, useQueryState } from "nuqs";
// import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
// import { parse } from "date-fns";
// import { toZonedTime } from "date-fns-tz";

// export const useBookingState = () => {
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

//   const [hourType, setHourType] = useQueryState<"12h" | "24h">("hourType", {
//     defaultValue: "24h",
//     parse: (value) => (value === "12h" ? "12h" : "24h"),
//     serialize: (value) => value,
//   });

//   const [isSuccess, setIsSuccess] = useQueryState(
//     "success",
//     parseAsBoolean.withDefault(false)
//   );

//   const handleSelectDate = (date: CalendarDate) => {
//     setSelectedDate(date);
//   };

//   const handleSelectSlot = (slot: string | null) => {
//     if (!selectedDate || !slot) {
//       setSelectedSlot(null);
//       return;
//     }
//     // Parse the slot time (e.g., "09:00") and set it on the selected date
//     console.log("till here contriol reached with slot",slot);
//     const parsedSlotTime = parse(slot, "HH:mm", new Date());
//     const slotDate = selectedDate.toDate(getLocalTimeZone());
//     slotDate.setHours(
//       parsedSlotTime.getHours(),
//       parsedSlotTime.getMinutes(),
//       0,
//       0
//     );
//     // Convert to UTC, format, and encodehandleSelectSlot
//     const slotDateInUTC = toZonedTime(slotDate, timezone);
//     //console.log(slotDateInUTC.toISOString(), ".toISOString()");
//     const encodedSlot = encodeURIComponent(slotDateInUTC.toISOString());
//     console.log("slot things",encodedSlot);
//     setSelectedSlot(encodedSlot);
//   };

//   const handleNext = () => {
//     setNext(true);
//   };

//   const handleBack = () => {
//     setNext(false);
//   };

//   const handleSuccess = (value: boolean) => {
//     setIsSuccess(value || true);
//   };
//   return {
//     selectedDate,
//     selectedSlot,
//     next: next,
//     timezone,
//     hourType,
//     isSuccess,
//     handleSelectDate,
//     handleSelectSlot,
//     handleNext,
//     handleBack,
//     handleSuccess,
//     setTimezone,
//     setHourType,
//   };
// };

// import { parseAsBoolean, useQueryState } from "nuqs";
// import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// export const useBookingState = () => {
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
//     setSelectedDate(date);
//   };

//   const handleSelectSlot = (slot: string | null) => {
//     if (!selectedDate || !slot) {
//       setSelectedSlot(null);
//       return;
//     }

//     try {
//       console.log("Control reached with slot:", slot);
      
//       // Parse different time formats
//       let hours = 0;
//       let minutes = 0;
      
//       // Handle "3:00 pm", "4:30 pm" format
//       if (slot.includes('pm') || slot.includes('am')) {
//         const timeMatch = slot.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
//         if (timeMatch) {
//           hours = parseInt(timeMatch[1]);
//           minutes = parseInt(timeMatch[2]);
//           const period = timeMatch[3].toLowerCase();
          
//           // Convert to 24-hour format
//           if (period === 'pm' && hours !== 12) {
//             hours += 12;
//           } else if (period === 'am' && hours === 12) {
//             hours = 0;
//           }
//         }
//       } 
//       // Handle "15:00", "09:30" format (24-hour)
//       else if (slot.includes(':')) {
//         const timeMatch = slot.match(/(\d{1,2}):(\d{2})/);
//         if (timeMatch) {
//           hours = parseInt(timeMatch[1]);
//           minutes = parseInt(timeMatch[2]);
//         }
//       }
      
//       console.log("Parsed time:", { hours, minutes });
      
//       // Validate parsed time
//       if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
//         console.error("Invalid time values:", { hours, minutes });
//         setSelectedSlot(null);
//         return;
//       }
      
//       // Create a proper Date object from CalendarDate
//       const slotDate = new Date(
//         selectedDate.year,
//         selectedDate.month - 1, // JavaScript months are 0-indexed
//         selectedDate.day,
//         hours,
//         minutes,
//         0,
//         0
//       );

//       console.log("Slot date created:", slotDate);
      
//       // Validate the created date
//       if (isNaN(slotDate.getTime())) {
//         console.error("Invalid date created");
//         setSelectedSlot(null);
//         return;
//       }
      
//       // Format as ISO string in local time (no UTC conversion)
//       const year = slotDate.getFullYear();
//       const month = String(slotDate.getMonth() + 1).padStart(2, '0');
//       const day = String(slotDate.getDate()).padStart(2, '0');
//       const hoursStr = String(slotDate.getHours()).padStart(2, '0');
//       const minutesStr = String(slotDate.getMinutes()).padStart(2, '0');
      
//       const localISOString = `${year}-${month}-${day}T${hoursStr}:${minutesStr}:00`;
//       console.log("Local ISO string:", localISOString);
      
//       // Encode for URL
//       const encodedSlot = encodeURIComponent(localISOString);
//       console.log("Encoded slot:", encodedSlot);
      
//       setSelectedSlot(encodedSlot);
//     } catch (error) {
//       console.error("Error in handleSelectSlot:", error);
//       setSelectedSlot(null);
//     }
//   };

//   const handleNext = () => {
//     setNext(true);
//   };

//   const handleBack = () => {
//     setNext(false);
//   };

//   const handleSuccess = (value: boolean) => {
//     setIsSuccess(value || true);
//   };
//   console.log("main next value",next);

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
  const [selectedDate, setSelectedDate] = useQueryState<CalendarDate>("date", {
    parse: (value) =>
      new CalendarDate(
        parseInt(value.split("-")[0]),
        parseInt(value.split("-")[1]),
        parseInt(value.split("-")[2])
      ),
    serialize: (value) => `${value.year}-${value.month}-${value.day}`,
  });

  const [selectedSlot, setSelectedSlot] = useQueryState("slot");

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
    setNext(true);
  };

  const handleBack = () => {
    setNext(false);
  };

  const handleSuccess = (value: boolean) => {
    setIsSuccess(value || true);
  };

  console.log("Current state - next:", next, "selectedSlot:", selectedSlot, "selectedDate:", selectedDate);

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