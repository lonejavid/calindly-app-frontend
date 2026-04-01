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
  /** AI-powered personalized email outreach & follow-ups */
  AI_OUTREACH: "/services/ai-outreach",
  /** Qualified B2B leads & pipeline through targeted outreach systems */
  PIPELINE_GENERATION: "/services/pipeline-generation",
  /** Find, screen & hire — hiring infrastructure for growing teams */
  HIRING_INFRASTRUCTURE: "/services/hiring-infrastructure",
  /** Stop spam bookings — domain rules, lead quality, calendar you trust */
  CALENDAR_INTELLIGENCE: "/services/calendar-intelligence",
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
