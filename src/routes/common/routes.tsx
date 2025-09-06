import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routePaths";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import EventType from "@/pages/event_type";
import Meetings from "@/pages/meeting";
import Availability from "@/pages/availability";
import Integrations from "@/pages/integrations";
// import UserEventsPage from "@/pages/external_page/user-events";
import UserSingleEventPage from "@/pages/external_page/user-single-event";
import ScheduleyLanding from "@/pages/landing/ScheduleyLanding";
import OAuthSuccess from "@/pages/GoogleAothPages/OAuthSuccess";
import TermsOfService from "@/pages/Policy/TermsOfService";
import PrivacyPolicy from "@/pages/Policy/PrivacyPolicy";
import CareersPage from "@/pages/landing/CareersPage";
import Setup from "@/pages/auth/components/Setup";
export const authenticationRoutePaths = [
   { path: "/", element: <ScheduleyLanding /> },
   {path:"/terms",element:<TermsOfService/>},
   {path:"/privacy",element:<PrivacyPolicy/>},
    {path:"/carrer",element:<CareersPage/>},
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.SETUP, element: <Setup/> },
  { path: PROTECTED_ROUTES.EVENT_TYPES, element: <EventType /> },
  { path: PROTECTED_ROUTES.MEETINGS, element: <Meetings /> },
  { path: PROTECTED_ROUTES.AVAILBILITIY, element: <Availability /> },
  { path: PROTECTED_ROUTES.INTEGRATIONS, element: <Integrations /> },
];

export const publicRoutePaths = [
  // { path: PUBLIC_ROUTES.USER_EVENTS, element: <UserEventsPage /> },
  { path: PUBLIC_ROUTES.USER_SINGLE_EVENT, element: <UserSingleEventPage /> },
  { path: PUBLIC_ROUTES.OAUTH_SUCCESS, element: <OAuthSuccess /> },
];
