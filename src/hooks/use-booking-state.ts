import { parseAsBoolean, useQueryState } from "nuqs";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { parse } from "date-fns";
import { toZonedTime } from "date-fns-tz";

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

  const [hourType, setHourType] = useQueryState<"12h" | "24h">("hourType", {
    defaultValue: "24h",
    parse: (value) => (value === "12h" ? "12h" : "24h"),
    serialize: (value) => value,
  });

  const [isSuccess, setIsSuccess] = useQueryState(
    "success",
    parseAsBoolean.withDefault(false)
  );

  const handleSelectDate = (date: CalendarDate) => {
    setSelectedDate(date);
  };

  // const handleSelectSlot = (slot: string | null) => {
  //   if (!selectedDate || !slot) {
  //     setSelectedSlot(null);
  //     return;
  //   }

  const handleSlotSelection = (slot: string) => {
  try {
    console.log("Selecting slot:", slot);

    if (!selectedDate) {
      console.error("No date selected for slot:", slot);
      return;
    }

    const parsedTime = parseTimeSlot(slot);
    if (!parsedTime) {
      console.error("Invalid slot string:", slot);
      return;
    }

    const { hours, minutes } = parsedTime;

    // Create a proper JS Date for the selected day + slot time
    const jsDate = selectedDate.toDate(userTimezone);
    jsDate.setHours(hours, minutes, 0, 0);

    const isoString = jsDate.toISOString();
    console.log("Passing to handleSelectSlot:", isoString);

    handleSelectSlot(isoString); // ✅ valid ISO string
  } catch (error) {
    console.error("Error selecting slot:", error, slot);
  }
};

    // Parse the slot time (e.g., "09:00") and set it on the selected date
    const parsedSlotTime = parse(slot, "HH:mm", new Date());
    const slotDate = selectedDate.toDate(getLocalTimeZone());
    slotDate.setHours(
      parsedSlotTime.getHours(),
      parsedSlotTime.getMinutes(),
      0,
      0
    );
    // Convert to UTC, format, and encode
    const slotDateInUTC = toZonedTime(slotDate, timezone);
    //console.log(slotDateInUTC.toISOString(), ".toISOString()");
    const encodedSlot = encodeURIComponent(slotDateInUTC.toISOString());
    setSelectedSlot(encodedSlot);
  };

  const handleNext = () => {
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
    hourType,
    isSuccess,
    handleSelectDate,
    handleSelectSlot,
    handleNext,
    handleBack,
    handleSuccess,
    setTimezone,
    setHourType,
  };
};
