

import {
  CalendarRange,
  ClockIcon,
  LayoutGrid,
  LinkIcon,
  LucideIcon,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import mylogo from "../../mylogo-light.png";
import { Link, useLocation } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";
import { useState, useEffect } from "react";

type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
  separator?: boolean;
  badge?: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = location.pathname;

  useEffect(() => {
    setMounted(true);
  }, []);

  const items: ItemType[] = [
    {
      title: "Event types",
      url: PROTECTED_ROUTES.EVENT_TYPES,
      icon: LinkIcon,
      badge: "3",
    },
    {
      title: "Meetings",
      url: PROTECTED_ROUTES.MEETINGS,
      icon: CalendarRange,
      badge: "12",
    },
    {
      title: "Integrations & apps",
      url: PROTECTED_ROUTES.INTEGRATIONS,
      icon: LayoutGrid,
      separator: true,
    },
    {
      title: "Availability",
      url: PROTECTED_ROUTES.AVAILBILITIY,
      icon: ClockIcon,
    },
  ];

  return (
    <Sidebar
      collapsible="none"
      variant="sidebar"
      className={`
        w-[280px] shrink-0
        !bg-gradient-to-b !from-slate-50 !to-white
        border-r border-slate-200/90
        shadow-sm shadow-slate-200/30
        backdrop-blur-sm
      `}
      {...props}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />

      {/* Header with Logo */}
      <SidebarHeader className="relative z-10 !px-4 !py-2 sm:!px-5 sm:!py-2.5">
        <div className="flex min-h-0 items-center gap-2.5 justify-start sm:gap-3">
          {/* Logo Container with Hover Effect */}
          <div
            className={`
              relative flex items-center justify-center rounded-sm
              w-16 h-16
            `}
          >
            <img src={mylogo} alt="Schedley Logo" loading="eager" decoding="async" />

          </div>

          {/* Brand Name */}
          <div className="grid flex-1 min-w-0 text-left leading-tight overflow-hidden">
            <div className="flex items-center gap-2">
              <h2
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 
                           bg-clip-text text-transparent tracking-tight"
              >
                Schedley
              </h2>
              <div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 
                            animate-pulse shadow-sm shadow-green-400/50"
              />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Scheduling Made Simple
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="!p-2 relative z-10">
        <SidebarMenu className="space-y-1">
          {items.map((item, index) => {
            const isActive = item.url === pathname;
            const isHovered = hoveredItem === item.title;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={`
                    relative group overflow-hidden rounded-xl
                    transition-all duration-300 ease-in-out
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50
                    data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-blue-600
                    data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-blue-500/25
                    ${mounted ? "animate-slideIn" : ""}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                  isActive={isActive}
                  asChild
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.url}
                    className={`
                      !text-base !p-4 min-h-[56px] rounded-xl
                      !font-semibold flex items-center gap-4
                      transition-all duration-300 ease-in-out
                      ${isActive ? "!text-white" : "!text-slate-700 hover:!text-blue-700"}
                    `}
                  >
                    {/* Icon Container with Animation */}
                    <div
                      className={`
                      relative flex items-center justify-center
                      transition-all duration-300 ease-in-out
                      ${isHovered ? "scale-110" : "scale-100"}
                    `}
                    >
                      <item.icon
                        className={`
                          !w-5 !h-5 !stroke-2 z-10 relative
                          transition-all duration-300 ease-in-out
                          ${isActive ? "drop-shadow-sm" : ""}
                        `}
                      />

                      {/* Animated Background Circle */}
                      {isHovered && !isActive && (
                        <div
                          className="absolute inset-0 w-8 h-8 -m-1.5 bg-blue-100 
                                      rounded-lg animate-pulse opacity-50"
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span className="min-w-0 flex-1 truncate text-left transition-all duration-300 ease-in-out">
                      {item.title}
                    </span>

                    {/* Badge + hover chevron: fixed-width cluster so layout does not shift */}
                    <div className="flex shrink-0 items-center gap-2">
                      {item.badge ? (
                        <span
                          className={`
                              inline-flex min-h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold tabular-nums
                              transition-colors duration-200
                              ${
                                isActive
                                  ? "bg-white/25 text-white"
                                  : "bg-blue-100 text-blue-700 group-hover:bg-blue-200/90"
                              }
                            `}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center"
                        aria-hidden
                      >
                        {isHovered && !isActive ? (
                          <ChevronRight className="h-4 w-4 text-blue-500 opacity-80" />
                        ) : null}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>

                {/* Separator with Animation */}
                {item.separator && (
                  <div
                    className={`
                    my-4 mx-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent
                    transition-all duration-500 ease-in-out opacity-100
                  `}
                  />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Bottom Gradient Fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 
                      bg-gradient-to-t from-white via-white/80 to-transparent 
                      pointer-events-none"
        />
      </SidebarContent>

      {/* Custom Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </Sidebar>
  );
}
