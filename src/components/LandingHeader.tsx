import { useState, useRef, useEffect } from "react";
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
  BookOpen,
  Library,
  FileText,
} from "lucide-react";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useStore } from "@/store/store";
import {
  AUTH_ROUTES,
  BLOG_ROUTE,
  CASE_STUDIES_ROUTE,
  PROTECTED_ROUTES,
  RESOURCE_HUB_ROUTE,
  SERVICE_ROUTES,
  resourceGuidePath,
} from "@/routes/common/routePaths";
import { resourceGuideNavLinks } from "@/data/resourceGuides/navLinks";

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
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileServicesOpen(false);
      setMobileResourcesOpen(false);
    }
  }, [mobileMenuOpen]);

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
            onClick={() => navigate("/careers")}
            className="px-4 py-2.5 rounded-sm text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer"
          >
            Careers
          </button>
          <div
            className="relative"
            onMouseEnter={() => {
              if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
              setResourcesOpen(true);
            }}
            onMouseLeave={() => {
              resourcesTimeoutRef.current = setTimeout(() => setResourcesOpen(false), 120);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors cursor-pointer"
            >
              Resources
              <ChevronDown
                className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute right-0 top-full z-[100] pt-2">
                <div className="flex w-[min(27rem,calc(100vw-1.25rem))] max-w-[calc(100vw-1.25rem)] flex-col rounded-xl border border-[var(--line)] bg-white p-3 shadow-[var(--sh-lg)] sm:w-[min(30rem,calc(100vw-1.5rem))] sm:max-w-[calc(100vw-1.5rem)] sm:p-4">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <Link
                      to={BLOG_ROUTE}
                      className="flex flex-col gap-2 rounded-lg border border-transparent p-2 hover:border-[var(--line)] hover:bg-[var(--surface)] transition-colors group sm:p-2.5"
                      onClick={() => setResourcesOpen(false)}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                        <Library className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--blue)] sm:text-[15px]">
                          Blog
                        </div>
                        <div className="mt-1 text-[11px] leading-snug text-[var(--ink-muted)] sm:text-xs">
                          Scheduling insights and how Schedley fits your funnel.
                        </div>
                      </div>
                    </Link>
                    <Link
                      to={CASE_STUDIES_ROUTE}
                      className="flex flex-col gap-2 rounded-lg border border-transparent p-2 hover:border-[var(--line)] hover:bg-[var(--surface)] transition-colors group sm:p-2.5"
                      onClick={() => setResourcesOpen(false)}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600">
                        <BookOpen className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--blue)] sm:text-[15px]">
                          Case studies
                        </div>
                        <div className="mt-1 text-[11px] leading-snug text-[var(--ink-muted)] sm:text-xs">
                          Stories from teams and solo pros using Schedley.
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 w-full min-w-0 border-t border-[var(--line)] pt-3">
                    <div className="rounded-lg bg-[var(--surface)] px-3 py-2.5 sm:px-3.5 sm:py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-700">
                          <FileText className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[var(--ink)]">Guides</div>
                          <p className="text-[11px] leading-snug text-[var(--ink-muted)] sm:text-xs">
                            Vs Calendly, Acuity, and the scheduling market.
                          </p>
                        </div>
                      </div>
                      <ul className="mt-2.5 space-y-0.5 border-t border-[var(--line)]/80 pt-2.5">
                        {resourceGuideNavLinks.map((g) => (
                          <li key={g.slug}>
                            <Link
                              to={resourceGuidePath(g.slug)}
                              onClick={() => setResourcesOpen(false)}
                              className="group block rounded-md px-1.5 py-1.5 transition-colors hover:bg-white/80"
                            >
                              <span className="text-xs font-semibold text-[var(--blue)] group-hover:underline sm:text-[13px]">
                                {g.navLabel}
                              </span>
                              <span className="mt-0.5 block text-[10px] leading-snug text-[var(--ink-muted)] line-clamp-2 sm:text-[11px]">
                                {g.navDescription}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end border-t border-[var(--line)] pt-2.5">
                    <Link
                      to={RESOURCE_HUB_ROUTE}
                      className="text-sm font-semibold text-[var(--blue)] hover:underline"
                      onClick={() => setResourcesOpen(false)}
                    >
                      View all resources →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
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
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface)] cursor-pointer"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((o) => !o)}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[var(--ink)] opacity-60 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {mobileServicesOpen ? (
              <div className="flex flex-col gap-0.5 border-l-2 border-[var(--line)] pl-2 ml-1">
                {SERVICES_MENU.map(({ icon: Icon, title, description, iconBg, path }) => {
                  const content = (
                    <>
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg} text-white`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
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
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[var(--surface)] cursor-pointer"
                      onClick={onClick}
                    >
                      {content}
                    </Link>
                  ) : (
                    <a
                      key={title}
                      href="/#features"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[var(--surface)] cursor-pointer"
                      onClick={onClick}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            ) : null}
            <div className="border-t border-[var(--line)] my-2" />
            <button
              type="button"
              onClick={() => {
                navigate("/careers");
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 text-left font-medium text-[var(--ink)] rounded-lg hover:bg-[var(--surface)] cursor-pointer"
            >
              Careers
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface)] cursor-pointer"
              aria-expanded={mobileResourcesOpen}
              onClick={() => setMobileResourcesOpen((o) => !o)}
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[var(--ink)] opacity-60 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {mobileResourcesOpen ? (
              <div className="flex flex-col gap-0.5 border-l-2 border-[var(--line)] pl-2 ml-1">
                <Link
                  to={RESOURCE_HUB_ROUTE}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-[var(--blue)] hover:bg-[var(--surface)]"
                >
                  All resources
                </Link>
                <Link
                  to={BLOG_ROUTE}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
                >
                  Blog
                </Link>
                <Link
                  to={CASE_STUDIES_ROUTE}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
                >
                  Case studies
                </Link>
                <p className="px-3 pt-1 text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                  Guides
                </p>
                {resourceGuideNavLinks.map((g) => (
                  <Link
                    key={g.slug}
                    to={resourceGuidePath(g.slug)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
                  >
                    {g.navLabel}
                  </Link>
                ))}
              </div>
            ) : null}
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
