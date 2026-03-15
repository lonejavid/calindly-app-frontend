import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useStore } from "@/store/store";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import { SidebarTrigger } from "./ui/sidebar";
import type { LucideIcon } from "lucide-react";

type HeaderProps = {
  /** Optional page title shown in the header (e.g. "Event types") */
  title?: string;
  /** Optional subtitle shown below the title */
  subtitle?: string;
  /** Optional icon shown before the title */
  icon?: LucideIcon;
};

const Header = ({ title, subtitle, icon: Icon }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, setAccessToken, setUser } = useStore();

  const onLogout = () => {
    setUser(null);
    setAccessToken(null);
    navigate(AUTH_ROUTES.SIGN_IN);
  };

  return (
    <header className="flex min-h-12 pt-3 pb-4 shrink-0 items-center transition-all duration-300 ease-in-out bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60">
      <div className="w-full flex items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <SidebarTrigger
            className="group -ml-5 cursor-pointer lg:hidden bg-white/80 backdrop-blur-sm border border-slate-200 
                     transform rotate-180 hover:bg-white hover:border-slate-300 hover:shadow-sm 
                     transition-all duration-200 rounded-lg p-2"
          />
          {title ? (
            <div className="flex items-center gap-2.5 pl-1 min-w-0">
              {Icon ? (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--blue)]/10 text-[var(--blue)] shrink-0">
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
    </header>
  );
};

export default Header;
