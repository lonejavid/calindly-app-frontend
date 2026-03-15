import {
  Calendar,
  Clock,
  Link2,
  Video,
  Users,
  Shield,
  ArrowRight,
  LayoutGrid,
  CalendarCheck,
  Globe,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import SectionDivider from "@/components/SectionDivider";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal from "@/components/SectionReveal";
import { GrowthExpertCTA } from "@/components/landing/GrowthExpertCTA";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import leadGenHeroImage from "@/assets/Lead-Generation.webp";

const DEMO_URL =
  "https://www.schedley.com/lonejavida829/schedley-demo-see-how-client-acquisition-works-9040";

/**
 * Schedley Management – landing page for the product: event types, availability,
 * meetings, integrations, and public booking. Aligned with backend features and
 * /app/event_types implementation. Theme: src/theme/theme.css
 */
const SchedleyManagementPage = () => {
  const navigate = useNavigate();

  const handleBookDemo = () => window.open(DEMO_URL, "_blank");
  const handleGetStarted = () => navigate(AUTH_ROUTES.SIGN_UP);
  const handleGoToApp = () => navigate(PROTECTED_ROUTES.EVENT_TYPES);

  const containerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

  const features = [
    {
      icon: LayoutGrid,
      title: "Event types & scheduling links",
      description:
        "Create multiple event types (e.g. 15-min intro, 30-min demo). Each gets a unique booking link. Toggle visibility and manage everything from one dashboard.",
      accent: "var(--blue)",
    },
    {
      icon: Clock,
      title: "Availability & time zones",
      description:
        "Set your working hours, buffer times, and time zone. Guests see only slots you’re free. No more back-and-forth or double bookings.",
      accent: "var(--blue)",
    },
    {
      icon: CalendarCheck,
      title: "Meetings & calendar",
      description:
        "View upcoming and past meetings in one place. Cancel or reschedule when needed. Sync with your calendar so you’re always in control.",
      accent: "var(--blue)",
    },
    {
      icon: Video,
      title: "Video & calendar integrations",
      description:
        "Connect Google Meet, Zoom, Microsoft Teams, or Outlook. Schedley adds the right meeting link to each booking and can create calendar events automatically.",
      accent: "var(--blue)",
    },
    {
      icon: Globe,
      title: "Public booking page",
      description:
        "Share a clean, branded page (yourusername/event-slug). Guests pick a time, fill a short form, and get confirmed—no login required for them.",
      accent: "var(--blue)",
    },
    {
      icon: Shield,
      title: "Secure & private",
      description:
        "Control who can book (e.g. allow everyone or restrict by domain). Your data and availability stay under your control with JWT-backed auth.",
      accent: "var(--blue)",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create event types",
      desc: "Define what you offer: duration, description, location type, and optional questions. Get a unique slug and link per type.",
      icon: LayoutGrid,
    },
    {
      step: "02",
      title: "Set your availability",
      desc: "Choose your working days and hours. Add buffers and limits. Your calendar stays accurate across time zones.",
      icon: Clock,
    },
    {
      step: "03",
      title: "Share your link",
      desc: "Send your personalized booking page (e.g. yourapp.com/yourname/30-min-call). No more “when are you free?” threads.",
      icon: Link2,
    },
    {
      step: "04",
      title: "Get booked",
      desc: "Guests pick a slot and confirm. You get the meeting on your calendar and in Schedley. Integrations add video links when you connect them.",
      icon: CalendarCheck,
    },
  ];

  const integrations = [
    { name: "Google Meet & Calendar", icon: Video },
    { name: "Zoom", icon: Video },
    { name: "Microsoft Teams", icon: Users },
    { name: "Outlook", icon: Calendar },
    { name: "HubSpot", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main>
        {/* Hero */}
        <section className="relative bg-[var(--ink)] py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className={containerClass}>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative z-10">
                <p className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--blue)] mb-4 px-4 py-2 rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80">
                  Schedley Management
                </p>
                <h1 className="font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
                  Smart scheduling & calendar control in one place
                </h1>
                <p className="text-base text-white/90 leading-relaxed mb-6">
                  Create event types, set availability, connect your calendar and video tools, and share a single booking link. No more back-and-forth—let guests pick a time that works for both of you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleGetStarted}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] text-base font-semibold bg-[var(--blue)] text-white border-2 border-[var(--blue)] cursor-pointer transition-all duration-200 hover:bg-[var(--blue-dark)] hover:border-[var(--blue-dark)]"
                    style={{ boxShadow: "var(--sh-blue)" }}
                  >
                    Get started free <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleBookDemo}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] text-base font-semibold text-white border-2 border-white/50 hover:bg-white/10 cursor-pointer transition-all duration-200"
                  >
                    Book a demo
                  </button>
                </div>
              </div>
              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="relative rounded-[var(--r-2xl)] overflow-hidden shadow-[var(--sh-lg)] w-full max-w-lg aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={leadGenHeroImage}
                    alt="Schedley Management – smart scheduling and calendar control"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <SectionDivider />

        {/* What you get – features grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="Product"
                titleBefore="Everything you need to "
                titleAccent="manage scheduling"
                subtitle="Event types, availability, meetings, and integrations—all in the Schedley app at /app/event_types."
                className="mb-12"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map(({ icon: Icon, title, description, accent }) => (
                  <div
                    key={title}
                    className="group flex flex-col p-6 sm:p-7 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--white)] shadow-[var(--sh-sm)] hover:border-[var(--blue)] hover:shadow-[var(--sh-md)] hover:-translate-y-1 transition-all duration-200"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-white shrink-0"
                      style={{ background: accent, boxShadow: "var(--sh-blue)" }}
                    >
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[var(--ink)] mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed flex-1">{description}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* How it works – 4 steps */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="How it works"
                titleBefore="From event types to "
                titleAccent="booked meetings"
                subtitle="Set up once, then share one link. Guests book; you get the meeting."
                className="mb-12 lg:mb-16"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {howItWorks.map(({ step, title, desc, icon: Icon }) => (
                  <div
                    key={step}
                    className="group relative flex flex-col p-6 sm:p-7 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--blue)] hover:shadow-[var(--sh-md)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--blue-lite)] text-[var(--blue)] flex items-center justify-center mb-5 shrink-0 group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[var(--ink)] mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed flex-1">{desc}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Integrations – Connects with the tools you use (icon-led, minimal text) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="Integrations"
                titleBefore="Connects with the tools "
                titleAccent="you use"
                className="mb-10"
              />
              {/* Integration tools – icon cards only */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-14">
                {integrations.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] hover:border-[var(--blue)] hover:shadow-[var(--sh-sm)] transition-all duration-200 min-w-[120px] sm:min-w-[140px]"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--blue-lite)] text-[var(--blue)] group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-center leading-tight">{name}</span>
                  </div>
                ))}
              </div>
              {/* Benefits – icon-first row (no paragraph, visual only) */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 max-w-2xl mx-auto">
                {[
                  { icon: Video, label: "Video links in every booking" },
                  { icon: CalendarCheck, label: "Two-way calendar sync" },
                  { icon: Link2, label: "One link, all event types" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] px-5 py-4 hover:border-[var(--blue)]/50 hover:shadow-[var(--sh-sm)] transition-all"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--blue)]/10 text-[var(--blue)]">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </span>
                    <span className="font-semibold text-[var(--ink)] text-sm sm:text-base">{label}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* CTA */}
        <GrowthExpertCTA
          eyebrow="Schedley Management"
          titleBefore="Ready to take control of "
          titleAccent="your schedule?"
          subtitle="Create event types, set availability, and share one link. Get started free or book a demo to see it in action."
          buttonText="Get started free"
          onButtonClick={handleGetStarted}
          middleSlot={
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleBookDemo}
                className="px-5 py-2.5 rounded-[var(--r-s)] text-sm font-semibold text-white border border-white/50 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Book a demo
              </button>
              <button
                type="button"
                onClick={handleGoToApp}
                className="px-5 py-2.5 rounded-[var(--r-s)] text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                Go to app →
              </button>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default SchedleyManagementPage;
