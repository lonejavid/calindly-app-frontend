import { IntegrationAppType, VideoConferencingPlatform } from "@/lib/types";

export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
  accessToken: string;
  expiresAt: number;
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

export type CreateEventPayloadType = {
  title: string;
  description: string;
  duration: number;
  locationType: VideoConferencingPlatform;
};

export interface UserType {
  name: string;
  imageUrl: string | null;
  timezone?: string; // Added timezone support for user
}

export interface EventType {
  questions: string;
  blockedDomains: string;
  timeSlotInterval: number;
  id: string;
  title: string;
  description: string;
  duration: number;
  slug: string;
  isPrivate: boolean;
  locationType: VideoConferencingPlatform;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  _count: number;
  accessSpecifier: string;
}

export interface ToggleEventVisibilityResponseType {
  message: string;
  event: EventType;
}

export interface UserEventListResponse {
  message: string;
  data: {
    events: EventType[];
    username: string;
  };
}

//***********Integration */
export interface IntegrationType {
  provider: "GOOGLE" | "ZOOM" | "MICROSOFT";
  title: string;
  app_type: IntegrationAppType;
  category: "VIDEO_CONFERENCING" | "CALENDAR";
  isConnected: boolean;
}

export interface GetAllIntegrationResponseType {
  message: string;
  integrations: IntegrationType[];
}

//************************* Availability (UPDATED WITH TIMEZONE SUPPORT) */
export interface DayAvailabilityType {
  day: string;
  startTime: string; // UTC time when stored in database
  endTime: string;   // UTC time when stored in database
  isAvailable: boolean;
}

export interface AvailabilityType {
  timeGap: number;
  timezone: string;  // User's selected timezone
  days: DayAvailabilityType[];
}

// Updated response type with timezone
export interface UserAvailabilityResponseType {
  message: string;
  availability: AvailabilityType;
}

// Legacy support - alias to maintain backward compatibility
export interface UserAvailabilityType extends AvailabilityType {}

export interface AvailabilityResponse {
  success: boolean;
  message: string;
  availability: UserAvailabilityType;
}

//************************* Meetings (UPDATED WITH TIMEZONE AWARENESS) */
type MeetingStatus = "SCHEDULED" | "CANCELLED" | "COMPLETED";

export interface MeetingType {
  questionAnswers: boolean;
  id: string;
  guestName: string;
  guestEmail: string;
  additionalInfo: string;
  startTime: string; // UTC time in database, converted to user timezone in frontend
  endTime: string;   // UTC time in database, converted to user timezone in frontend
  meetLink: string;
  calendarEventId: string;
  status: MeetingStatus;
  createdAt: string;
  updatedAt: string;
  event: EventType;
  timezone?: string; // Optional: guest's timezone for the meeting
}

export interface UserMeetingsResponseType {
  message: string;
  meetings: MeetingType[];
}

//************ALL PUBLIC API TYPES (UPDATED WITH TIMEZONE SUPPORT) */

export interface PublicEventResponseType {
  message: string;
  user: UserType;
  events: EventType[];
}

export interface PublicSingleEventDetailResponseType {
  message: string;
  event: EventType;
  creatorTimezone?: string; // Optional: event creator's timezone
}

export type DayOfWeekType =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

interface AvailabilitySlotType {
  day: DayOfWeekType;
  dateStr: string; // ISO date string (e.g., "2025-03-08")
  slots: string[]; // Array of time slots in the requester's timezone (e.g., ["10:00", "10:30"])
  isAvailable: boolean;
  timezone?: string; // Optional: timezone these slots are displayed in
}

export interface PublicAvailabilityEventResponseType {
  message: string;
  data: AvailabilitySlotType[];
  timezone?: string; // Timezone for the returned slots
}

export interface CreateMeetingType {
  eventId: string;
  startTime: string; // Should be converted to UTC before sending to backend
  endTime: string;   // Should be converted to UTC before sending to backend
  guestName: string;
  guestEmail: string;
  additionalInfo?: string;
  guestTimezone?: string; // Optional: guest's timezone
}

export type PeriodType = "UPCOMING" | "PAST" | "CANCELLED";

//************************* NEW TIMEZONE-SPECIFIC TYPES */

// Timezone option for the selector
export interface TimezoneOption {
  value: string;
  label: string;
  group: string;
}

// Request/response types for timezone operations
export interface UpdateUserTimezoneRequest {
  timezone: string;
}

export interface UpdateUserTimezoneResponse {
  message: string;
  timezone: string;
}

// Time conversion utility types
export interface TimeConversionRequest {
  time: string;
  fromTimezone: string;
  toTimezone: string;
  date?: string; // Optional date context
}

export interface TimeConversionResponse {
  originalTime: string;
  convertedTime: string;
  fromTimezone: string;
  toTimezone: string;
}

// Meeting booking with timezone context
export interface CreateMeetingWithTimezoneType extends CreateMeetingType {
  guestTimezone: string; // Required for timezone-aware booking
  creatorTimezone?: string; // Optional: for cross-timezone validation
}

// Enhanced meeting response with timezone info
export interface MeetingWithTimezoneType extends MeetingType {
  guestTimezone: string;
  creatorTimezone: string;
  displayStartTime?: string; // Time formatted for guest's timezone
  displayEndTime?: string;   // Time formatted for guest's timezone
}

// Calendar integration with timezone support
export interface CalendarEventType {
  id: string;
  title: string;
  startTime: string; // UTC
  endTime: string;   // UTC
  timezone: string;  // Event timezone
  attendees: string[];
  location?: string;
}

// Availability request with timezone context
export interface GetAvailabilityRequest {
  eventId?: string;
  startDate?: string;
  endDate?: string;
  timezone?: string; // Timezone to return slots in
}

// Enhanced availability response
export interface GetAvailabilityResponse {
  message: string;
  data: AvailabilitySlotType[];
  requestedTimezone: string;
  creatorTimezone: string;
}

//************************* FORM VALIDATION TYPES */

// Form data types for timezone-aware forms
export interface AvailabilityFormData {
  timeGap: number;
  timezone: string;
  days: DayAvailabilityType[];
}

export interface MeetingBookingFormData {
  guestName: string;
  guestEmail: string;
  additionalInfo?: string;
  selectedSlot: {
    date: string;
    time: string;
    timezone: string;
  };
}

//************************* API ENDPOINT TYPES */

// Standard API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Timezone-aware API responses
export type TimezoneAwareAvailabilityResponse = ApiResponse<{
  availability: AvailabilityType;
  timezone: string;
}>;

export type TimezoneMeetingResponse = ApiResponse<{
  meeting: MeetingWithTimezoneType;
}>;

export type TimezoneUserResponse = ApiResponse<{
  user: UserType & { timezone: string };
}>;

//************************* UTILITY TYPES */

// For frontend state management
export interface TimezoneState {
  selectedTimezone: string;
  detectedTimezone: string;
  availableTimezones: TimezoneOption[];
  isLoading: boolean;
  error?: string;
}

// For time conversion caching
export interface TimeConversionCache {
  [key: string]: {
    convertedTime: string;
    cachedAt: number;
  };
}

// For meeting display preferences
export interface DisplayPreferences {
  timezone: string;
  timeFormat: '12h' | '24h';
  dateFormat: string;
  showTimezone: boolean;
}


// import { IntegrationAppType, VideoConferencingPlatform } from "@/lib/types";

// export type loginType = { email: string; password: string };
// export type LoginResponseType = {
//   message: string;
//   user: {
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//   };
//   accessToken: string;
//   expiresAt: number;
// };

// export type registerType = {
//   name: string;
//   email: string;
//   password: string;
// };

// export type CreateEventPayloadType = {
//   title: string;
//   description: string;
//   duration: number;
//   locationType: VideoConferencingPlatform;
// };

// export interface UserType {
//   name: string;
//   imageUrl: string | null;
// }
// export interface EventType {
//   questions: string;
//   blockedDomains: string;
//   timeSlotInterval: number;
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   slug: string;
//   isPrivate: boolean;
//   locationType: VideoConferencingPlatform;
//   createdAt: string;
//   updatedAt: string;
//   user: UserType;
//   _count: number;
//   accessSpecifier:string
// }

// export interface ToggleEventVisibilityResponseType {
//   message: string;
//   event: EventType;
// }

// export interface UserEventListResponse {
//   message: string;
//   data: {
//     events: EventType[];
//     username: string;
//   };
// }

// //***********Integration */
// export interface IntegrationType {
//   provider: "GOOGLE" | "ZOOM" | "MICROSOFT";
//   title: string;
//   app_type: IntegrationAppType;
//   category: "VIDEO_CONFERENCING" | "CALENDAR";
//   isConnected: boolean;
// }

// export interface GetAllIntegrationResponseType {
//   message: string;
//   integrations: IntegrationType[];
// }

// //************************* Availablity */
// export interface DayAvailabilityType {
//   day: string;
//   startTime: string;
//   endTime: string;
//   isAvailable: boolean;
// }
// export interface AvailabilityType {
//   timeGap: number;
//   days: DayAvailabilityType[];
// }

// export interface UserAvailabilityResponseType {
//   message: string;
//   availability: AvailabilityType;
// }

// //************************* Meetings */
// type MeetingStatus = "SCHEDULED" | "CANCELLED" | "COMPLETED";

// export interface MeetingType {
//   questionAnswers: boolean;
//   id: string;
//   guestName: string;
//   guestEmail: string;
//   additionalInfo: string;
//   startTime: string;
//   endTime: string;
//   meetLink: string;
//   calendarEventId: string;
//   status: MeetingStatus;
//   createdAt: string;
//   updatedAt: string;
//   event: EventType;
// }
// export interface UserMeetingsResponseType {
//   message: string;
//   meetings: MeetingType[];
// }

// //************ALL PUBLIC API TYPES */

// export interface PublicEventResponseType {
//   message: string;
//   user: UserType;
//   events: EventType[];
// }

// export interface PublicSingleEventDetailResponseType {
//   message: string;
//   event: EventType;
// }

// export type DayOfWeekType =
//   | "SUNDAY"
//   | "MONDAY"
//   | "TUESDAY"
//   | "WEDNESDAY"
//   | "THURSDAY"
//   | "FRIDAY"
//   | "SATURDAY";

// interface AvailabilitySlotType {
//   day: DayOfWeekType;
//   dateStr: string; // ISO date string (e.g., "2025-03-08")
//   slots: string[]; // Array of time slots (e.g., ["10:00", "10:30"])
//   isAvailable: boolean;
// }

// export interface PublicAvailabilityEventResponseType {
//   message: string;
//   data: AvailabilitySlotType[];
// }

// export interface CreateMeetingType {
//   eventId: string;
//   startTime: string;
//   endTime: string;
//   guestName: string;
//   guestEmail: string;
//   additionalInfo?: string;
// }

// export type PeriodType = "UPCOMING" | "PAST" | "CANCELLED";
