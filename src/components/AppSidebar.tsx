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
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { geteventListQueryFn, getUserMeetingsQueryFn } from "@/lib/api";

type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
  separator?: boolean;
  badge?: number;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = location.pathname;

  const { data: eventListRes } = useQuery({
    queryKey: ["event_list"],
    queryFn: geteventListQueryFn,
    staleTime: 30_000,
  });

  const { data: meetingsRes } = useQuery({
    queryKey: ["userMeetings", "SIDEBAR_ALL"],
    queryFn: () => getUserMeetingsQueryFn(),
    staleTime: 30_000,
  });

  const eventCount = eventListRes?.data?.events?.length ?? 0;
  const meetingCount = meetingsRes?.meetings?.length ?? 0;

  const items: ItemType[] = useMemo(
    () => [
      {
        title: "Event types",
        url: PROTECTED_ROUTES.EVENT_TYPES,
        icon: LinkIcon,
        badge: eventCount > 0 ? eventCount : undefined,
      },
      {
        title: "Meetings",
        url: PROTECTED_ROUTES.MEETINGS,
        icon: CalendarRange,
        badge: meetingCount > 0 ? meetingCount : undefined,
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
    ],
    [eventCount, meetingCount],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--blue-ghost)] via-transparent to-[var(--blue-lite)]/40"
        aria-hidden
      />

      <SidebarHeader className="relative z-10 border-b border-slate-200/90 !px-4 !py-2 sm:!px-5 sm:!py-2.5">
        <div className="flex min-h-0 items-center justify-start gap-2.5 sm:gap-3">
          <div className="relative flex h-14.5 w-14.5 items-center justify-center rounded-sm">
            <img src={mylogo} alt="Schedley Logo" loading="eager" decoding="async" />
          </div>

          <div className="grid min-w-0 flex-1 overflow-hidden text-left leading-tight">
            <div className="flex items-center gap-2">
              <h2
                className="bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--blue-dark)] bg-clip-text text-2xl font-bold tracking-tight text-transparent"
              >
                Schedley
              </h2>
              <div
                className="h-2 w-2 animate-pulse rounded-full shadow-sm"
                style={{
                  backgroundColor: "var(--wa)",
                  boxShadow: "0 0 8px var(--wa-glow)",
                }}
              />
            </div>
            <p className="text-xs font-medium text-slate-500">Scheduling Made Simple</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="relative z-10 !p-2">
        <SidebarMenu className="space-y-1">
          {items.map((item, index) => {
            const isActive = item.url === pathname;
            const isHovered = hoveredItem === item.title;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={`
                    group relative overflow-hidden rounded-sm
                    transition-all duration-300 ease-in-out
                    hover:bg-[var(--blue-lite)]
                    data-[active=true]:shadow-[var(--sh-blue)]
                    data-[active=true]:bg-[color:var(--blue)]
                    data-[active=true]:text-white
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
                      !flex !min-h-[56px] !items-center !gap-4 !rounded-sm !p-4 !text-base
                      !font-semibold transition-all duration-300 ease-in-out
                      ${isActive ? "!text-white" : "!text-slate-700 hover:!text-[color:var(--blue)]"}
                    `}
                  >
                    <div
                      className={`
                      relative flex items-center justify-center
                      transition-all duration-300 ease-in-out
                      ${isHovered ? "scale-110" : "scale-100"}
                    `}
                    >
                      <item.icon
                        className={`
                          !relative !z-10 !h-5 !w-5 !stroke-2
                          transition-all duration-300 ease-in-out
                          ${isActive ? "drop-shadow-sm" : ""}
                        `}
                        style={
                          !isActive
                            ? { color: "var(--blue)" }
                            : undefined
                        }
                      />

                      {isHovered && !isActive ? (
                        <div
                          className="absolute -m-1.5 h-8 w-8 animate-pulse rounded-sm opacity-50"
                          style={{ backgroundColor: "var(--blue-ghost)" }}
                        />
                      ) : null}
                    </div>

                    <span className="min-w-0 flex-1 truncate text-left transition-all duration-300 ease-in-out">
                      {item.title}
                    </span>

                    <div className="flex shrink-0 items-center gap-2">
                      {item.badge != null ? (
                        <span
                          className={`
                              inline-flex min-h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold tabular-nums
                              transition-colors duration-200
                              ${
                                isActive
                                  ? "bg-white/25 text-white"
                                  : "bg-[var(--blue-lite)] text-[color:var(--blue)] group-hover:bg-[var(--blue-ghost)]"
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
                          <ChevronRight
                            className="h-4 w-4 opacity-80"
                            style={{ color: "var(--blue)" }}
                          />
                        ) : null}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>

                {item.separator ? (
                  <div
                    className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-100 transition-all duration-500 ease-in-out"
                    aria-hidden
                  />
                ) : null}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent"
          aria-hidden
        />
      </SidebarContent>

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
