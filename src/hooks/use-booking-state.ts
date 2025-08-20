import { parseAsBoolean, useQueryState } from "nuqs";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

export const useBookingState = () => {
  console.log("this is a simple tect ");
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