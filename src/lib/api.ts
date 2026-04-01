import { ENV } from "./get-env";
import {
  AvailabilityType,
  CreateEventPayloadType,
  CreateMeetingType,
  GetAllIntegrationResponseType,
  LoginResponseType,
  loginType,
  PeriodType,
  PublicAvailabilityEventResponseType,
  PublicEventResponseType,
  PublicSingleEventDetailResponseType,
  registerType,
  ToggleEventVisibilityResponseType,
  UserAvailabilityResponseType,
  UserEventListResponse,
  UserMeetingsResponseType,
} from "@/types/api.type";
import { API, PublicAPI } from "./axios-client";
import { IntegrationAppType, VideoConferencingPlatform } from "./types";

/** Check if the local backend is reachable (for connection verification). */
export async function checkBackendConnection(): Promise<{
  ok: boolean;
  message?: string;
}> {
  const base = ENV.VITE_API_BASE_URL ?? "";
  if (!base) return { ok: false, message: "No API URL configured" };
  // Backend root is GET / (no /api prefix); strip /api for health check to avoid 404
  const healthUrl = base.replace(/\/api\/?$/, "") || "http://localhost:8000";
  try {
    const res = await fetch(healthUrl, { method: "GET", mode: "cors" });
    return { ok: res.ok };
  } catch {
    return {
      ok: false,
      message:
        "Backend unreachable. Ensure the backend is running (e.g. port 8000) and CORS allows this origin.",
    };
  }
}

export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutationFn = async (
  data: registerType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

/** GET /auth/me – restore session (user) when we have a token (e.g. after refresh). */
export type AuthMeResponseType = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    timezone?: string;
    imageUrl?: string | null;
    isApproved?: boolean;
    setupStep?: number;
  } | null;
};
export async function getAuthMe(): Promise<AuthMeResponseType> {
  const response = await API.get("/auth/me");
  return response.data;
}

/** POST /auth/setup-progress – save current setup step so user can resume after refresh. */
export async function updateSetupProgress(step: number): Promise<{ step: number }> {
  const response = await API.post("/auth/setup-progress", { step });
  return response.data;
}

/** POST /auth/setup-complete – mark onboarding as done (first-time setup). */
export async function setupComplete(): Promise<AuthMeResponseType> {
  const response = await API.post("/auth/setup-complete");
  return response.data;
}

//*********** */ EVENT APIS
export const CreateEventMutationFn = async (data: CreateEventPayloadType) =>
  await API.post("/event/create", data);

export const toggleEventVisibilityMutationFn = async (data: {
  eventId: string;
}): Promise<ToggleEventVisibilityResponseType> => {
  const response = await API.put("/event/toggle-privacy", data);
  return response.data;
};

export async function deleteEventApi(eventId: string) {
  const response = await API.delete(`/event/${eventId}`);
  return response.data;
}

export const geteventListQueryFn = async (): Promise<UserEventListResponse> => {
  const response = await API.get(`/event/all`);
  return response.data;
};

//*********** */ INTEGRATION APIS

export const checkIntegrationQueryFn = async (
  appType: VideoConferencingPlatform
) => {
  const response = await API.get(`/integration/check/${appType}`);
  return response.data;
};

export const getAllIntegrationQueryFn =
  async (): Promise<GetAllIntegrationResponseType> => {
    const response = await API.get(`/integration/all`);
    return response.data;
  };

export const connectAppIntegrationQueryFn = async (
  appType: IntegrationAppType
) => {
  console.log("testing for teams");
  const response = await API.get(`/integration/connect/${appType}`);
  return response.data;
};

//*********** */ Availability APIS

export const getUserAvailabilityQueryFn =
  async (): Promise<UserAvailabilityResponseType> => {
    const response = await API.get(`/availability/me`);
    return response.data;
  };

export const updateUserAvailabilityMutationFn = async (
  data: AvailabilityType
) => {
  const response = await API.put("/availability/update", data);
  return response.data;
};

//*********** */ Meeting APIS

export const getUserMeetingsQueryFn = async (
  filter: PeriodType
): Promise<UserMeetingsResponseType> => {
  const response = await API.get(
    `/meeting/user/all${filter ? `?filter=${filter}` : ""}`
  );
  return response.data;
};

export const cancelMeetingMutationFn = async (meetingId: string) => {
  const response = await API.put(`/meeting/cancel/${meetingId}`, {});
  return response.data;
};

//*********** */ All EXTERNAL/PUBLIC APIS
export const getAllPublicEventQueryFn = async (
  username: string
): Promise<PublicEventResponseType> => {
  const response = await PublicAPI.get(`/event/public/${username}`);
  return response.data;
};

export const getSinglePublicEventBySlugQueryFn = async (data: {
  username: string;
  slug: string;
}): Promise<PublicSingleEventDetailResponseType> => {
  const response = await PublicAPI.get(
    `/event/public/${data.username}/${data.slug}`
  );
  return response.data;
};

export const getPublicAvailabilityByEventIdQueryFn = async (
  eventId: string,
  options?: { timezone?: string; from?: string; to?: string },
): Promise<PublicAvailabilityEventResponseType> => {
  const params = new URLSearchParams();
  if (options?.timezone) params.set("timezone", options.timezone);
  if (options?.from) params.set("from", options.from);
  if (options?.to) params.set("to", options.to);
  const query = params.toString();
  const url = `/availability/public/${eventId}${query ? `?${query}` : ""}`;
  const response = await PublicAPI.get(url);
  return response.data;
};

//Create Meeting Eventid
export const scheduleMeetingMutationFn = async (data: CreateMeetingType) => {
  const response = await API.post("/meeting/public/create", data);
  return response.data;
};

/** Contact form submission – no auth required. Backend: POST /api/contact. */
export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactForm(
  data: ContactFormPayload
): Promise<{ message?: string }> {
  const response = await PublicAPI.post("/contact", data);
  return response.data;
}