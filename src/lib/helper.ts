// import { format, addMinutes, parseISO, parse } from "date-fns";
// import { toZonedTime } from "date-fns-tz";

// //************Format Selected Date & slot time to a human readable format */
// //Wednesday, March 12, 2025, 10:00 – 10:15
// export const formatSelectedSlot = (
//   slot: string | null,
//   duration: number,
//   timezone: string = "UTC",
//   hourType: "12h" | "24h" = "24h"
// ) => {
//   if (!slot) return null;
//   // Decode the slot
//   const decodedSlot = decodeURIComponent(slot);
//   const startTime = parseISO(decodedSlot);
//   // Convert the start time to the user's timezone
//   const zonedStartTime = toZonedTime(startTime, timezone);
//   // Calculate the end time using the duration
//   const zonedEndTime = addMinutes(zonedStartTime, duration);

//   // Format the date
//   const formattedDate = format(zonedStartTime, "EEEE, MMMM d, yyyy");

//   // Format the time based on `hourType`
//   const timeFormat = hourType === "12h" ? "h:mm a" : "HH:mm";
//   const formattedTime = `${format(zonedStartTime, timeFormat)} – ${format(
//     zonedEndTime,
//     timeFormat
//   )}`;

//   return `${formattedDate}, ${formattedTime}`;
// };

// //************Format Slot to timeZone and return in 24 or 12 hours */
// export const formatSlot = (
//   slot: string,
//   timezone: string = "UTC",
//   hourType: "12h" | "24h" = "24h"
// ) => {
//   const parsedTime = parse(slot, "HH:mm", new Date()); // Parse the slot time (e.g., "14:00")
//   const zonedTime = toZonedTime(parsedTime, timezone); // Convert to the user's timezone
//   return hourType === "12h"
//     ? format(zonedTime, "h:mm a") // 12-hour format (e.g., "2:00 PM")
//     : format(zonedTime, "HH:mm"); // 24-hour format (e.g., "14:00")
// };

// //************ Decode the Selected Time Slot and return it
// //  to the slot format plsu hourType */
// export const decodeSlot = (
//   encodedSlot: string | null,
//   timezone: string = "UTC",
//   hourType: "12h" | "24h" = "24h"
// ) => {
//   if (!encodedSlot) return null;
//   const decodedSlot = decodeURIComponent(encodedSlot);
//   const slotDate = parseISO(decodedSlot);
//   const zonedSlotDate = toZonedTime(slotDate, timezone);
//   return hourType === "12h"
//     ? format(zonedSlotDate, "h:mm a") // 12-hour format
//     : format(zonedSlotDate, "HH:mm"); // 24-hour format
// };


// import { format, addMinutes, parseISO, parse } from "date-fns";
// import { toZonedTime } from "date-fns-tz";

// /**
//  * Format Selected Date & Slot Time to a Human Readable Format
//  * Example: Wednesday, March 12, 2025, 10:00 – 10:15
//  */
// export const formatSelectedSlot = (
//   slot: string | null,
//   duration: number,
//   timezone: string = "UTC",
//   hourType: "12h" | "24h" = "24h"
// ) => {
//   if (!slot) return null;

//   const decodedSlot = decodeURIComponent(slot);
//   let startTime: Date;

//   // Detect if slot is ISO format (contains 'T') or plain time string
//   if (decodedSlot.includes("T")) {
//     startTime = parseISO(decodedSlot);
//   } else {
//     startTime = parse(
//       decodedSlot,
//       hourType === "12h" ? "h:mm a" : "HH:mm",
//       new Date()
//     );
//   }

//   if (isNaN(startTime.getTime())) {
//     console.error("Invalid date from slot:", decodedSlot);
//     return "Invalid date/time";
//   }

//   const zonedStartTime = toZonedTime(startTime, timezone);
//   const zonedEndTime = addMinutes(zonedStartTime, duration);

//   const formattedDate = format(zonedStartTime, "EEEE, MMMM d, yyyy");
//   const timeFormat = hourType === "12h" ? "h:mm a" : "HH:mm";
//   const formattedTime = `${format(zonedStartTime, timeFormat)} – ${format(
//     zonedEndTime,
//     timeFormat
//   )}`;

//   return `${formattedDate}, ${formattedTime}`;
// };

// /**
//  * Format Slot to TimeZone and Return in 24 or 12 Hour Format
//  */
// export const formatSlot = (
//   slot: string,
//   timezone: string = "UTC",
//   hourType: "12h" | "24h" = "24h"
// ) => {
//   const parsedTime = parse(slot, "HH:mm", new Date());
//   const zonedTime = toZonedTime(parsedTime, timezone);
//   return hourType === "12h"
//     ? format(zonedTime, "h:mm a")
//     : format(zonedTime, "HH:mm");
// };

// /**
//  * Decode the Selected Time Slot and Return It in Proper Format
//  */
// export const decodeSlot = (
//   encodedSlot: string | null,
//   timezone: string = "UTC",
//   hourType: "12h" | "24h" = "24h"
// ) => {
//   if (!encodedSlot) return null;
//   const decodedSlot = decodeURIComponent(encodedSlot);
//   const slotDate = parseISO(decodedSlot);
//   const zonedSlotDate = toZonedTime(slotDate, timezone);
//   return hourType === "12h"
//     ? format(zonedSlotDate, "h:mm a")
//     : format(zonedSlotDate, "HH:mm");
// };



// import { format, addMinutes, parseISO, parse } from "date-fns";

// /**
//  * Format Selected Date & Slot Time to a Human Readable Format
//  * Example: Wednesday, March 12, 2025, 10:00 AM – 10:15 AM
//  */
// export const formatSelectedSlot = (
//   slot: string | null,
//   duration: number
// ) => {
//   if (!slot) return null;

//   const decodedSlot = decodeURIComponent(slot);
//   let startTime: Date;

//   // Detect if slot is ISO format or plain time string
//   if (decodedSlot.includes("T")) {
//     startTime = parseISO(decodedSlot);
//   } else {
//     startTime = parse(decodedSlot, "h:mm a", new Date());
//   }

//   if (isNaN(startTime.getTime())) {
//     console.error("Invalid date from slot:", decodedSlot);
//     return "Invalid date/time";
//   }

//   const endTime = addMinutes(startTime, duration);

//   const formattedDate = format(startTime, "EEEE, MMMM d, yyyy");
//   const formattedTime = `${format(startTime, "h:mm a")} – ${format(
//     endTime,
//     "h:mm a"
//   )}`;

//   return `${formattedDate}, ${formattedTime}`;
// };

// /**
//  * Format Slot in 12-hour Format (No Timezone Conversion)
//  */
// export const formatSlot = (slot: string) => {
//   const parsedTime = parse(slot, "HH:mm", new Date());
//   return format(parsedTime, "h:mm a");
// };

// /**
//  * Decode the Selected Time Slot and Return in 12-hour Format
//  */
// export const decodeSlot = (encodedSlot: string | null) => {
//   if (!encodedSlot) return null;
//   const decodedSlot = decodeURIComponent(encodedSlot);
//   const slotDate = parseISO(decodedSlot);
//   return format(slotDate, "h:mm a");
// };


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
