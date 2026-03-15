export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  LANDING: "/",
  SIGN_IN: "/login",
  SIGN_UP: "/sign-up",
  SETUPAI: "/setup",
  TALENT: "/talent",
  PROFILE: "/profile",
};

export const SERVICE_ROUTES = {
  B2B_APPOINTMENT_SCHEDULING: "/services/b2b-appointment-scheduling",
  B2B_LEAD_GENERATION: "/services/b2b-lead-generation",
  RECRUITING_TALENT: "/services/recruiting-talent",
  SCHEDLEY_MANAGEMENT: "/services/schedley-management",
};

export const CONTACT_ROUTE = "/contact";

export const PROTECTED_ROUTES = {
  EVENT_TYPES: "/app/event_types",
  INTEGRATIONS: "/app/integrations",
  AVAILBILITIY: "/app/availability/schedules",
  MEETINGS: "/app/scheduled_events",
  SETUP: "/setup",
};

export const PUBLIC_ROUTES = {
  // USER_EVENTS: "/:username",
  USER_SINGLE_EVENT: "/:username/:slug",
  OAUTH_SUCCESS: "/oauth-success",
};
