




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
        
     
        
        // Additional validation for reasonable date ranges
        if (year < 1900 || year > 3000 || month < 1 || month > 12 || day < 1 || day > 31) {
          return null;
        }
        
        const calendarDate = new CalendarDate(year, month, day);
   
        
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

    
    // Ensure we're working with a proper CalendarDate
    if (date && typeof date.year !== 'undefined' && typeof date.month !== 'undefined' && typeof date.day !== 'undefined') {
      setSelectedDate(date);
    } else {
      console.error('Invalid CalendarDate object:', date);
    }
  };

  const handleSelectSlot = (slot: string | null) => {

    
    if (!slot) {
      setSelectedSlot(null);
      return;
    }

    if (!selectedDate) {

      setSelectedSlot(null);
      return;
    }

    try {

      setSelectedSlot(slot);
    } catch (error) {
      console.error("Error in handleSelectSlot:", error);
      setSelectedSlot(null);
    }
  };

  const handleNext = () => {
  
    
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