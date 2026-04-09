import { User, LayoutGrid, LogOut, ChevronDown, BadgeCheck, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export type ProfileMenuUser = {
  name: string;
  email: string;
  imageUrl?: string | null;
};

type ProfileMenuProps = {
  user: ProfileMenuUser;
  onProfileClick: () => void;
  /** Show "Dashboard" when provided; otherwise show "Home" when onHomeClick is provided */
  onDashboardClick?: () => void;
  onHomeClick?: () => void;
  onLogout: () => void;
  /** Optional: custom class for the trigger button wrapper */
  triggerClassName?: string;
  /** Optional: custom class for the popover content */
  contentClassName?: string;
  /** Optional: "landing" uses theme vars; "app" uses same theme for consistency */
  variant?: "landing" | "app";
};

function getInitials(name: string | undefined): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase().slice(0, 2);
  }
  return (parts[0]?.[0] ?? "U").toUpperCase();
}

export function ProfileMenu({
  user,
  onProfileClick,
  onDashboardClick,
  onHomeClick,
  onLogout,
  triggerClassName = "",
  contentClassName = "",
  variant = "landing",
}: ProfileMenuProps) {
  const showHome = Boolean(onHomeClick);
  const showDashboard = Boolean(onDashboardClick);
  const isApp = variant === "app";
  const triggerCls =
    isApp
      ? "group flex max-w-[min(100%,320px)] cursor-pointer items-center gap-0 rounded-sm border border-[var(--line)] bg-white/60 p-1.5 shadow-sm transition-colors duration-200 hover:border-[var(--blue)]/40 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/25 sm:gap-2 sm:p-2 md:gap-3"
      : "flex max-w-[min(100%,280px)] cursor-pointer items-center gap-2 rounded-sm border-2 border-[var(--line)] p-2 transition-all duration-200 hover:border-[var(--blue)]/40 hover:bg-[var(--surface)]";
  const avatarRingCls = isApp
    ? "w-9 h-9 ring-2 ring-[var(--blue)] group-hover:ring-[var(--blue)] shadow-sm"
    : "w-9 h-9 ring-2 ring-[var(--blue)]";
  const avatarFallbackCls = isApp
    ? "bg-[var(--blue)] text-white font-semibold text-sm"
    : "bg-[var(--blue)] text-white font-semibold text-sm";
  const popoverCls = isApp
    ? "b2b-page w-72 rounded-xl p-0 bg-white border border-[var(--line)] shadow-[var(--sh-lg)] overflow-hidden"
    : "b2b-page w-72 rounded-xl p-0 border-[var(--line)] shadow-[var(--sh-lg)]";
  const userBlockCls = isApp
    ? "p-4 bg-[var(--surface)] border-b border-[var(--line)]"
    : "p-4 border-b border-[var(--line)]";
  const nameCls = "font-semibold text-[var(--ink)] truncate";
  const emailCls = "text-sm text-[var(--ink-muted)] truncate";
  const itemCls =
    "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[var(--ink)] rounded-lg hover:bg-[var(--surface)] cursor-pointer transition-colors";
  const logoutCls =
    "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[var(--ink)] rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={triggerClassName || triggerCls}
          aria-label={user.name ? `Account menu, ${user.name}` : "Account menu"}
        >
          <Avatar className={`${avatarRingCls} shrink-0`}>
            {user.imageUrl && (
              <AvatarImage src={user.imageUrl} alt={user.name || "Profile"} />
            )}
            <AvatarFallback className={avatarFallbackCls}>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span
            className={`hidden min-w-0 truncate text-left text-base font-semibold text-[var(--ink)] sm:inline ${isApp ? "max-w-[min(42vw,140px)] sm:max-w-[180px] md:max-w-[220px]" : "max-w-[200px]"}`}
            title={user.name || "User"}
          >
            {user.name?.trim() || "User"}
          </span>
          <ChevronDown className="hidden h-4 w-4 shrink-0 text-[var(--ink-muted)] sm:block" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className={contentClassName || popoverCls}>
        <div className={userBlockCls}>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-[var(--blue)] shrink-0">
              {user.imageUrl && (
                <AvatarImage src={user.imageUrl} alt={user.name || "Profile"} />
              )}
              <AvatarFallback className="bg-[var(--blue)] text-white font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className={`${nameCls} flex items-center gap-1.5 flex-wrap`}>
                <span className="truncate">{user.name || "User"}</span>
                <span
                  className="inline-flex shrink-0 text-[var(--blue)]"
                  title="Verified"
                  aria-hidden
                >
                  <BadgeCheck className="w-5 h-5" strokeWidth={2} />
                </span>
              </h3>
              <p className={emailCls}>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="p-2">
          {showHome && (
            <button type="button" role="menuitem" className={itemCls} onClick={onHomeClick}>
              <Home className="w-4 h-4" />
              Home
            </button>
          )}
          {showDashboard && (
            <button type="button" role="menuitem" className={itemCls} onClick={onDashboardClick}>
              <LayoutGrid className="w-4 h-4" />
              Dashboard
            </button>
          )}
          <button type="button" role="menuitem" className={itemCls} onClick={onProfileClick}>
            <User className="w-4 h-4" />
            Profile
          </button>
          <Separator className="my-2" />
          <button type="button" role="menuitem" className={logoutCls} onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileMenu;
