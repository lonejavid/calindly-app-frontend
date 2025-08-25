

import { format, addMinutes, parseISO, parse } from "date-fns";

/**
 * Format Selected Date & Slot Time to a Human Readable Format
 * Example: Wednesday, March 12, 2025, 10:00 AM – 10:15 AM
 */
export const formatSelectedSlot = (
  slot: string | null,
  duration: number
) => {
  if (!slot) return null;
  console.log("angggg voh");

  const decodedSlot = decodeURIComponent(slot);
  let startTime: Date;

  // Detect if slot is ISO format (contains 'T') or plain time string
  if (decodedSlot.includes("T")) {
    startTime = parseISO(decodedSlot); // ISO date-time string
  } else {
    // Attempt to parse as 12-hour time string
    startTime = parse(decodedSlot, "h:mm a", new Date());
  }

  // Validate Date
  if (isNaN(startTime.getTime())) {
    console.error("Invalid date from slot:", decodedSlot);
    return "Invalid date/time";
  }

  // Add duration to calculate end time
  const endTime = addMinutes(startTime, duration);

  // Format to 12-hour human-readable string
  const formattedDate = format(startTime, "EEEE, MMMM d, yyyy");
  const formattedTime = `${format(startTime, "h:mm a")} – ${format(
    endTime,
    "h:mm a"
  )}`;

  return `${formattedDate}, ${formattedTime}`;
};

/**
 * Format Slot in 12-hour Format (No Timezone Conversion)
 */
export const formatSlot = (slot: string) => {
  const parsedTime = parse(slot, "HH:mm", new Date());
  if (isNaN(parsedTime.getTime())) {
    console.error("Invalid slot time:", slot);
    return "Invalid time";
  }
  return format(parsedTime, "h:mm a");
};

/**
 * Decode the Selected Time Slot and Return in 12-hour Format
 */
export const decodeSlot = (encodedSlot: string | null) => {
  if (!encodedSlot) return null;
  const decodedSlot = decodeURIComponent(encodedSlot);

  let slotDate: Date;
  if (decodedSlot.includes("T")) {
    slotDate = parseISO(decodedSlot);
  } else {
    slotDate = parse(decodedSlot, "h:mm a", new Date());
  }

  if (isNaN(slotDate.getTime())) {
    console.error("Invalid decoded slot:", decodedSlot);
    return "Invalid time";
  }

  return format(slotDate, "h:mm a");
};
