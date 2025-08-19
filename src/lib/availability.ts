// import { DayOfWeekType } from "@/types/api.type";

// export const dayMapping: Record<DayOfWeekType, string> = {
//   SUNDAY: "Sun",
//   MONDAY: "Mon",
//   TUESDAY: "Tue",
//   WEDNESDAY: "Wed",
//   THURSDAY: "Thu",
//   FRIDAY: "Fri",
//   SATURDAY: "Sat",
// };

// export type Availability = {
//   day: DayOfWeekType;
//   startTime: string;
//   endTime: string;
//   isAvailable: boolean;
// };

// export type WeeklyHoursFormData = {
//   timeGap: number;
//   availability: Availability[];
// };

// export const generateTimeSlots = (
//   timeGap: number = 30,
//   format: "12h" | "24h" = "24h"
// ) => {
//   const slots = [];
//   const totalMinutes = 24 * 60; // 24 hours in minutes

//   for (let minutes = 0; minutes < totalMinutes; minutes += timeGap) {
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;

//     const time =
//       format === "12h"
//         ? `${String(hours % 12 || 12).padStart(2, "0")}:${String(mins).padStart(
//             2,
//             "0"
//           )} ${hours < 12 ? "AM" : "PM"}`
//         : `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

//     slots.push(time);
//   }

//   return slots;
// };

// export const availabilityPlaceholder = [
//   { day: "MONDAY", isAvailable: true, slots: [] },
//   { day: "TUESDAY", isAvailable: true, slots: [] },
//   {
//     day: "WEDNESDAY",
//     isAvailable: true,
//     slots: [],
//   },
//   { day: "THURSDAY", isAvailable: true, slots: [] },
//   { day: "FRIDAY", isAvailable: true, slots: [] },
//   { day: "SATURDAY", isAvailable: false, slots: [] },
//   { day: "SUNDAY", isAvailable: false, slots: [] },
// ];

import { DayOfWeekType } from "@/types/api.type";

export const dayMapping: Record<DayOfWeekType, string> = {
  SUNDAY: "Sun",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
};

export type Availability = {
  day: DayOfWeekType;
  startTime: string; // always 12h format e.g. "09:00 AM"
  endTime: string;   // always 12h format e.g. "05:00 PM"
  isAvailable: boolean;
};

export type WeeklyHoursFormData = {
  timeGap: number;
  availability: Availability[];
};

/**
 * Generate time slots for a full day
 * @param timeGap minutes between slots (default: 30)
 * @param format "12h" | "24h" (default: "12h")
 */
export const generateTimeSlots = (
  timeGap: number = 30,
  format: "12h" | "24h" = "12h"
) => {
  const slots: string[] = [];
  const totalMinutes = 24 * 60; // full day in minutes

  for (let minutes = 0; minutes < totalMinutes; minutes += timeGap) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    let time: string;
    if (format === "12h") {
      const displayHour = hours % 12 || 12;
      const displayMins = String(mins).padStart(2, "0");
      const suffix = hours < 12 ? "AM" : "PM";
      time = `${String(displayHour).padStart(2, "0")}:${displayMins} ${suffix}`;
    } else {
      time = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    }

    slots.push(time);
  }

  return slots;
};

// Default availability placeholder with no slots yet
export const availabilityPlaceholder: Availability[] = [
  { day: "MONDAY", isAvailable: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "TUESDAY", isAvailable: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "WEDNESDAY", isAvailable: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "THURSDAY", isAvailable: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "FRIDAY", isAvailable: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "SATURDAY", isAvailable: false, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "SUNDAY", isAvailable: false, startTime: "09:00 AM", endTime: "05:00 PM" },
];
