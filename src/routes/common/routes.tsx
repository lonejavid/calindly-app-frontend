import { AUTH_ROUTES, CONTACT_ROUTE, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routePaths";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import EventType from "@/pages/event_type";
import Meetings from "@/pages/meeting";
import Availability from "@/pages/availability";
import Integrations from "@/pages/integrations";
import UserSingleEventPage from "@/pages/external_page/user-single-event";
import ScheduleyLanding from "@/pages/landing/ScheduleyLanding";
import OAuthSuccess from "@/pages/GoogleAothPages/OAuthSuccess";
import TermsOfService from "@/pages/Policy/TermsOfService";
import PrivacyPolicy from "@/pages/Policy/PrivacyPolicy";
import CookiePolicy from "@/pages/Policy/CookiePolicy";
import CareersPage from "@/pages/landing/CareersPage";
import TalentHiringPage from "@/pages/landing/TalentHiringPage";
import B2BAppointmentSchedulingPage from "@/pages/landing/B2BAppointmentSchedulingPage";
import B2BLeadGenerationPage from "@/pages/landing/B2BLeadGenerationPage";
import RecruitingTalentPage from "@/pages/landing/RecruitingTalentPage";
import SchedleyManagementPage from "@/pages/landing/SchedleyManagementPage";
import ProfilePage from "@/pages/ProfilePage";
import ContactUsPage from "@/pages/landing/ContactUsPage";
import Setup from "@/pages/event_type/_components/Setup";
import { SERVICE_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: "/", element: <ScheduleyLanding /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/cookie-policy", element: <CookiePolicy /> },
  { path: "/carrer", element: <CareersPage /> },
  { path: AUTH_ROUTES.TALENT, element: <TalentHiringPage /> },
  { path: AUTH_ROUTES.PROFILE, element: <ProfilePage /> },
  { path: SERVICE_ROUTES.B2B_APPOINTMENT_SCHEDULING, element: <B2BAppointmentSchedulingPage /> },
  { path: SERVICE_ROUTES.B2B_LEAD_GENERATION, element: <B2BLeadGenerationPage /> },
  { path: SERVICE_ROUTES.RECRUITING_TALENT, element: <RecruitingTalentPage /> },
  { path: SERVICE_ROUTES.SCHEDLEY_MANAGEMENT, element: <SchedleyManagementPage /> },
  { path: CONTACT_ROUTE, element: <ContactUsPage /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
 
  { path: PROTECTED_ROUTES.EVENT_TYPES, element: <EventType /> },
  {path:PROTECTED_ROUTES.SETUP,element:<Setup/>},
  { path: PROTECTED_ROUTES.MEETINGS, element: <Meetings /> },
  { path: PROTECTED_ROUTES.AVAILBILITIY, element: <Availability /> },
  { path: PROTECTED_ROUTES.INTEGRATIONS, element: <Integrations /> },
];

export const publicRoutePaths = [
  // { path: PUBLIC_ROUTES.USER_EVENTS, element: <UserEventsPage /> },
  { path: PUBLIC_ROUTES.USER_SINGLE_EVENT, element: <UserSingleEventPage /> },
  { path: PUBLIC_ROUTES.OAUTH_SUCCESS, element: <OAuthSuccess /> },
];
