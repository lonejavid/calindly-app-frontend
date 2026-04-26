import { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  AUTH_ROUTES,
  BLOG_ROUTE,
  CASE_STUDIES_ROUTE,
  CONTACT_ROUTE,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  RESOURCE_GUIDES_ROUTE,
  RESOURCE_HUB_ROUTE,
  SERVICE_ROUTES,
} from "./routePaths";

const SignIn = lazy(() => import("@/pages/auth/signin"));
const SignUp = lazy(() => import("@/pages/auth/signup"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password"));
const EventType = lazy(() => import("@/pages/event_type"));
const Meetings = lazy(() => import("@/pages/meeting"));
const Availability = lazy(() => import("@/pages/availability"));
const Integrations = lazy(() => import("@/pages/integrations"));
const UserSingleEventPage = lazy(() => import("@/pages/external_page/user-single-event"));
const ScheduleyLanding = lazy(() => import("@/pages/landing/ScheduleyLanding"));
const OAuthSuccess = lazy(() => import("@/pages/GoogleAothPages/OAuthSuccess"));
const TermsOfService = lazy(() => import("@/pages/Policy/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/Policy/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("@/pages/Policy/CookiePolicy"));
const CareersPage = lazy(() => import("@/pages/landing/CareersPage"));
const TalentHiringPage = lazy(() => import("@/pages/landing/TalentHiringPage"));
const B2BAppointmentSchedulingPage = lazy(() => import("@/pages/landing/B2BAppointmentSchedulingPage"));
const B2BLeadGenerationPage = lazy(() => import("@/pages/landing/B2BLeadGenerationPage"));
const RecruitingTalentPage = lazy(() => import("@/pages/landing/RecruitingTalentPage"));
const SchedleyManagementPage = lazy(() => import("@/pages/landing/SchedleyManagementPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ContactUsPage = lazy(() => import("@/pages/landing/ContactUsPage"));
const BlogIndexPage = lazy(() => import("@/pages/blog/BlogIndexPage"));
const BlogPostPage = lazy(() => import("@/pages/blog/BlogPostPage"));
const CaseStudiesPage = lazy(() => import("@/pages/landing/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("@/pages/landing/CaseStudyDetailPage"));
const ResourcesHubPage = lazy(() => import("@/pages/landing/ResourcesHubPage"));
const ResourceGuidePage = lazy(() => import("@/pages/landing/ResourceGuidePage"));
const Setup = lazy(() => import("@/pages/event_type/_components/Setup"));

export const authenticationRoutePaths = [
  { path: "/", element: <ScheduleyLanding /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/cookie-policy", element: <CookiePolicy /> },
  { path: "/careers", element: <CareersPage /> },
  { path: "/carrer", element: <Navigate to="/careers" replace /> },
  { path: AUTH_ROUTES.TALENT, element: <TalentHiringPage /> },
  { path: AUTH_ROUTES.PROFILE, element: <ProfilePage /> },
  {
    path: "/services/b2b-appointment-scheduling",
    element: <Navigate to={SERVICE_ROUTES.AI_OUTREACH} replace />,
  },
  { path: SERVICE_ROUTES.AI_OUTREACH, element: <B2BAppointmentSchedulingPage /> },
  {
    path: "/services/b2b-lead-generation",
    element: <Navigate to={SERVICE_ROUTES.PIPELINE_GENERATION} replace />,
  },
  { path: SERVICE_ROUTES.PIPELINE_GENERATION, element: <B2BLeadGenerationPage /> },
  {
    path: "/services/recruiting-talent",
    element: <Navigate to={SERVICE_ROUTES.HIRING_INFRASTRUCTURE} replace />,
  },
  { path: SERVICE_ROUTES.HIRING_INFRASTRUCTURE, element: <RecruitingTalentPage /> },
  {
    path: "/services/schedley-management",
    element: <Navigate to={SERVICE_ROUTES.CALENDAR_INTELLIGENCE} replace />,
  },
  { path: SERVICE_ROUTES.CALENDAR_INTELLIGENCE, element: <SchedleyManagementPage /> },
  { path: CONTACT_ROUTE, element: <ContactUsPage /> },
  { path: BLOG_ROUTE, element: <BlogIndexPage /> },
  { path: CASE_STUDIES_ROUTE, element: <CaseStudiesPage /> },
  { path: `${CASE_STUDIES_ROUTE}/:slug`, element: <CaseStudyDetailPage /> },
  { path: RESOURCE_HUB_ROUTE, element: <ResourcesHubPage /> },
  { path: `${RESOURCE_GUIDES_ROUTE}/:slug`, element: <ResourceGuidePage /> },
  { path: `${BLOG_ROUTE}/calendar-link-spam-qualified-pipeline`, element: <Navigate to={`${BLOG_ROUTE}/why-spam-bookings-kill-productivity-schedley`} replace /> },
  { path: `${BLOG_ROUTE}/outbound-to-booked-demo-framework`, element: <Navigate to={`${BLOG_ROUTE}/ai-outreach-personalized-sequences-schedley`} replace /> },
  { path: `${BLOG_ROUTE}/scheduling-tools-revenue-teams-2026`, element: <Navigate to={`${BLOG_ROUTE}/schedley-vs-calendly-cal-com-savvycal`} replace /> },
  { path: `${BLOG_ROUTE}/email-validation-spam-bookings`, element: <Navigate to={`${BLOG_ROUTE}/fake-email-addresses-meeting-funnel-cost`} replace /> },
  { path: `${BLOG_ROUTE}/sdr-coordinator-hiring-without-drag`, element: <Navigate to={`${BLOG_ROUTE}/hiring-infrastructure-find-screen-hire-faster`} replace /> },
  {
    path: `${BLOG_ROUTE}/revops-booking-hygiene-forecast-accuracy`,
    element: <Navigate to={`${BLOG_ROUTE}/calendar-qualified-lead-funnel-schedley`} replace />,
  },
  { path: `${BLOG_ROUTE}/:slug`, element: <BlogPostPage /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.EVENT_TYPES, element: <EventType /> },
  { path: PROTECTED_ROUTES.SETUP, element: <Setup /> },
  { path: PROTECTED_ROUTES.MEETINGS, element: <Meetings /> },
  { path: PROTECTED_ROUTES.AVAILBILITIY, element: <Availability /> },
  { path: PROTECTED_ROUTES.INTEGRATIONS, element: <Integrations /> },
];

export const publicRoutePaths = [
  { path: PUBLIC_ROUTES.USER_SINGLE_EVENT, element: <UserSingleEventPage /> },
  { path: PUBLIC_ROUTES.OAUTH_SUCCESS, element: <OAuthSuccess /> },
];
