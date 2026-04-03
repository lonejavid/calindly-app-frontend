import { useNavigate, useLocation } from "react-router-dom";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useStore } from "@/store/store";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import { SidebarTrigger } from "./ui/sidebar";
import type { LucideIcon } from "lucide-react";
import schedleyLogo from "../../mylogo-light.png";

type HeaderProps = {
  /** Optional page title shown in the header (e.g. "Event types") */
  title?: string;
  /** Optional subtitle shown below the title */
  subtitle?: string;
  /** Optional icon shown before the title */
  icon?: LucideIcon;
  /** Hide menu trigger (e.g. Setup / no sidebar) */
  hideSidebarTrigger?: boolean;
};

const SETUP_TOTAL_STEPS = 4;

const Header = ({
  title,
  subtitle,
  icon: Icon,
  hideSidebarTrigger,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setAccessToken, setUser } = useStore();
  const isSetupPage = location.pathname === PROTECTED_ROUTES.SETUP;
  const setupStep = user?.setupStep ?? 0;
  const displayStep = Math.min(SETUP_TOTAL_STEPS, setupStep + 1);

  const onLogout = () => {
    setUser(null);
    setAccessToken(null);
    navigate(AUTH_ROUTES.SIGN_IN);
  };

  return (
    <header className="flex min-h-12 shrink-0 items-center transition-all duration-300 ease-in-out bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60">
      <div className="w-full flex items-center justify-between gap-4 px-4 sm:px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {!hideSidebarTrigger ? (
            <SidebarTrigger
              className="group -ml-1 cursor-pointer lg:hidden bg-white/80 backdrop-blur-sm border border-slate-200 
                     transform rotate-180 hover:bg-white hover:border-slate-300 hover:shadow-sm 
                     transition-all duration-200 rounded-lg p-2"
            />
          ) : null}
          {isSetupPage && user ? (
            <div
              className={`flex min-w-0 items-center gap-3 sm:gap-4 ${hideSidebarTrigger ? "pl-0 sm:pl-1" : "pl-1"}`}
            >
              <img
                src={schedleyLogo}
                alt="Schedley"
                className="h-12 w-auto max-h-20 shrink-0 object-contain"
              />
              <div className="flex min-w-0 flex-col">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "var(--blue)" }}
                >
                  Schedley
                </p>
                <p
                  className="mt-0.5 text-sm font-medium"
                  style={{ color: "var(--ink-mid)" }}
                >
                  Step {displayStep} of {SETUP_TOTAL_STEPS}
                </p>
              </div>
            </div>
          ) : title ? (
            <div
              className={`flex min-w-0 items-center gap-2.5 ${hideSidebarTrigger ? "pl-0 sm:pl-1" : "pl-1"}`}
            >
              {Icon ? (
                <span className="flex items-center justify-center w-12 h-12 rounded-sm bg-[var(--blue)]/10 text-[var(--blue)] shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </span>
              ) : null}
              <div className="flex flex-col min-w-0">
                <h1 className="text-lg font-bold text-[var(--ink)] truncate">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="text-sm text-slate-600 font-normal truncate pt-0.5">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {user ? (
            <ProfileMenu
              user={user}
              variant="app"
              onProfileClick={() => navigate(AUTH_ROUTES.PROFILE)}
              onHomeClick={() => navigate(PROTECTED_ROUTES.EVENT_TYPES)}
              onLogout={onLogout}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
