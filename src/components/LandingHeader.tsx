import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CalendarCheck,
  Target,
  UserPlus,
  LayoutGrid,
  ChevronDown,
  Play,
  ExternalLink,
  Menu,
  X,
  Linkedin,
} from "lucide-react";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useStore } from "@/store/store";
import { AUTH_ROUTES, PROTECTED_ROUTES, SERVICE_ROUTES } from "@/routes/common/routePaths";

import mylogo from "../../mylogo-light.png";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { openBookMeeting } from "@/lib/book-meeting";

const SERVICES_MENU = [
  {
    icon: CalendarCheck,
    title: "AI Outreach",
    description: "Personalized email sequences that scale",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    path: SERVICE_ROUTES.AI_OUTREACH,
  },
  {
    icon: Target,
    title: "Pipeline Generation",
    description: "Consistent qualified B2B leads through targeted outreach",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    path: SERVICE_ROUTES.PIPELINE_GENERATION,
  },
  {
    icon: UserPlus,
    title: "Hiring Infrastructure",
    description: "Find, screen, and hire the right people—faster",
    iconBg: "bg-violet-500",
    iconColor: "text-white",
    path: SERVICE_ROUTES.HIRING_INFRASTRUCTURE,
  },
  {
    icon: LayoutGrid,
    title: "Calendar Intelligence",
    description: "Block spam bookings—only high-value calls get through",
    iconBg: "bg-sky-500",
    iconColor: "text-white",
    path: SERVICE_ROUTES.CALENDAR_INTELLIGENCE,
  },
];

type LandingHeaderProps = {
  /** When false, header uses transition (e.g. -translate-y-10 opacity-0). Default true. */
  isVisible?: boolean;
};

export function LandingHeader({ isVisible = true }: LandingHeaderProps) {
  const navigate = useNavigate();
  const { user, clearAuth } = useStore();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBookDemo = () => {
    openBookMeeting();
  };

  return (
    <nav
      className={`relative z-50 bg-white border-b border-[var(--line)] shadow-[var(--sh-xs)] transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div
        className={`${LANDING_PAGE_CONTAINER_CLASS} flex min-w-0 items-center justify-between gap-2 py-2.5 sm:py-3`}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex min-w-0 max-w-[min(100%,12rem)] items-center space-x-2 xs:space-x-3 sm:max-w-none sm:space-x-4 cursor-pointer"
        >
          <div className="w-14 h-16 xs:w-14 xs:h-14 sm:w-14 sm:h-14 shrink-0 rounded-sm overflow-hidden flex items-center justify-center">
            <img
              src={mylogo}
              alt="Schedley"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
          <span className="min-w-0 truncate text-lg xs:text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Schedley
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-2 lg:gap-3">
          <div
            className="relative"
            onMouseEnter={() => {
              if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
              setServicesOpen(true);
            }}
            onMouseLeave={() => {
              servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer"
            >
              Service
              <ChevronDown
                className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full pt-2 z-[100]">
                <div className="w-[min(650px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-xl bg-white border border-[var(--line)] shadow-[var(--sh-lg)] p-4 sm:p-5 grid grid-cols-1 min-[560px]:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                  {SERVICES_MENU.map(
                    ({ icon: Icon, title, description, iconBg, iconColor, path }) => {
                      const className =
                        "flex items-start gap-4 p-3.5 rounded-lg hover:bg-[var(--surface)] transition-colors group cursor-pointer";
                      const content = (
                        <>
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}
                          >
                            <Icon className="w-6 h-6" strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-base text-[var(--ink)] group-hover:text-[var(--blue)]">
                              {title}
                            </div>
                            <div className="text-sm text-[var(--ink-muted)] mt-1">
                              {description}
                            </div>
                          </div>
                        </>
                      );
                      return path ? (
                        <Link
                          key={title}
                          to={path}
                          className={className}
                          onClick={() => setServicesOpen(false)}
                        >
                          {content}
                        </Link>
                      ) : (
                        <a key={title} href="/#features" className={className}>
                          {content}
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/carrer")}
            className="px-4 py-2.5 rounded-sm text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer"
          >
            Careers
          </button>
          <a
            href="/#features"
            className="px-4 py-2.5 rounded-sm text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer"
          >
            Features
          </a>

          <button
            type="button"
            onClick={handleBookDemo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-base font-semibold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--blue)", boxShadow: "var(--sh-blue)" }}
          >
            <Play className="w-4 h-4" />
            <span className="hidden lg:inline">Book</span> Demo
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>

          <a
            href="https://www.linkedin.com/company/schedley-com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md text-[var(--ink-muted)] hover:text-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {user ? (
            <ProfileMenu
              user={user}
              variant="landing"
              onProfileClick={() => navigate(AUTH_ROUTES.PROFILE)}
              onDashboardClick={() => navigate(PROTECTED_ROUTES.EVENT_TYPES)}
              onLogout={() => {
                clearAuth();
                navigate(AUTH_ROUTES.SIGN_IN);
              }}
            />
          ) : (
            <Link
              to={AUTH_ROUTES.SIGN_IN}
              className="px-5 py-2.5 rounded-sm text-base font-semibold text-[var(--blue)] border-2 border-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer inline-block"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -mr-1 text-[var(--ink)] hover:bg-[var(--surface)] rounded-md cursor-pointer touch-manipulation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-[var(--line)] shadow-[var(--sh-md)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[min(85dvh,32rem)] overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Services
            </div>
            {SERVICES_MENU.map(({ icon: Icon, title, description, iconBg, path }) => {
              const content = (
                <>
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg} text-white`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-[var(--ink)]">{title}</div>
                    <div className="text-xs text-[var(--ink-muted)]">{description}</div>
                  </div>
                </>
              );
              const onClick = () => setMobileMenuOpen(false);
              return path ? (
                <Link
                  key={title}
                  to={path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--surface)] cursor-pointer"
                  onClick={onClick}
                >
                  {content}
                </Link>
              ) : (
                <a
                  key={title}
                  href="/#features"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--surface)] cursor-pointer"
                  onClick={onClick}
                >
                  {content}
                </a>
              );
            })}
            <div className="border-t border-[var(--line)] my-2" />
            <button
              type="button"
              onClick={() => {
                navigate("/carrer");
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 text-left font-medium text-[var(--ink)] rounded-lg hover:bg-[var(--surface)] cursor-pointer"
            >
              Careers
            </button>
            <a
              href="/#features"
              className="px-3 py-2.5 font-medium text-[var(--ink)] rounded-lg hover:bg-[var(--surface)] cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <button
              type="button"
              onClick={() => {
                handleBookDemo();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white mt-2 cursor-pointer"
              style={{ background: "var(--blue)" }}
            >
              <Play className="w-4 h-4" /> Book Demo
            </button>
            <a
              href="https://www.linkedin.com/company/schedley-com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 flex items-center gap-2 text-[var(--ink)] cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    navigate(AUTH_ROUTES.PROFILE);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg border-2 border-transparent px-3 py-2.5 text-left font-medium text-[var(--ink)] transition-colors hover:border-[var(--blue)]/40 hover:bg-[var(--surface)] cursor-pointer"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate(PROTECTED_ROUTES.EVENT_TYPES);
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2.5 text-left font-medium text-[var(--ink)] cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearAuth();
                    navigate(AUTH_ROUTES.SIGN_IN);
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2.5 text-left font-medium text-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={AUTH_ROUTES.SIGN_IN}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg font-semibold text-[var(--blue)] border-2 border-[var(--blue)] mt-2 cursor-pointer inline-block text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
