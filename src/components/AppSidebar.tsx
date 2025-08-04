// import {
//   CalendarRange,
//   ClockIcon,

//   LayoutGrid,
//   LinkIcon,
//   LucideIcon,
// } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarTrigger,
//   SidebarRail,
//   useSidebar,
// } from "./ui/sidebar";
// import mylogo from '../../mylogo.png'
// //import { Separator } from "./ui/separator";
// import { Link, useLocation } from "react-router-dom";
// import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

// type ItemType = {
//   title: string;
//   url: string;
//   icon: LucideIcon;
//   separator?: boolean;
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const location = useLocation();
//   const { state } = useSidebar();

//   const pathname = location.pathname;

//   const items: ItemType[] = [
//     {
//       title: "Event types",
//       url: PROTECTED_ROUTES.EVENT_TYPES,
//       icon: LinkIcon,
//     },
//     {
//       title: "Meetings",
//       url: PROTECTED_ROUTES.MEETINGS,
//       icon: CalendarRange,
//     },
//     {
//       title: "Integrations & apps",
//       url: PROTECTED_ROUTES.INTEGRATIONS,
//       icon: LayoutGrid,
//       separator: true,
//     },

//     {
//       title: "Availability",
//       url: PROTECTED_ROUTES.AVAILBILITIY,
//       icon: ClockIcon,
//     },
//   ];

//   return (
//     <Sidebar
//       collapsible="icon"
//       variant="sidebar"
//       className={`${
//         state !== "collapsed" ? "w-[260px]" : ""
//       } !bg-white !border-[#D4E162]`}
//       {...props}
//     >
//       <SidebarHeader
//         className={`!py-2 relative ${
//           state !== "collapsed" ? "!px-5" : "!px-3"
//         }`}
//       >
//         <div className="flex h-[50px] items-center gap-1 justify-start ">
//           <div
//             className="flex aspect-square size-6 items-center 
//           justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
//           >
//             {/* <Command className="size-4" /> */}
//               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-lg">
//     <img
//       src={mylogo}
//       alt="Schedley Logo"
//       className="w-full h-full object-contain"
//     />
//   </div>
//           </div>
//           {state !== "collapsed" && (
//             <div className="grid flex-1 text-left text-2xl leading-tight ml-px">
//               {/* <h2 className="truncate font-medium">Schedley.com</h2> */}
//               <h2 className="truncate font-medium" style={{ color: 'blue' }}>Schedley</h2>
//             </div>
//           )}

//           <SidebarTrigger
//             className={`-ml-1 cursor-pointer ${
//               state === "collapsed" &&
//               "absolute -right-5 z-20 rounded-full bg-white border transform rotate-180"
//             }`}
//           />
//         </div>
//       </SidebarHeader>
//       <SidebarContent className="!p-[4px_8px] dark:bg-background">
//         <SidebarMenu>
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <SidebarMenuButton
//                 className="hover:!bg-[#e5efff] data-[active=true]:!bg-[#e5efff]"
//                 isActive={item.url === pathname}
//                 asChild
//               >
//                 <Link
//                   to={item.url}
//                   className="!text-[16px] !p-[12px_8px_12px_16px] min-h-[48px] rounded-[8px]
//                   !font-semibold
//                   "
//                 >
//                   <item.icon className="!w-5 !h-5 !stroke-2" />
//                   <span>{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }


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
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";
import mylogo from '../../mylogo.png'
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
  const { state } = useSidebar();
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

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className={`
        ${!isCollapsed ? "w-[280px]" : "w-[70px]"} 
        transition-all duration-300 ease-in-out
        !bg-gradient-to-b !from-slate-50 !to-white
        !border-r !border-slate-200/60
        shadow-xl shadow-slate-200/40
        backdrop-blur-sm
      `}
      {...props}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />
      
      {/* Header with Logo */}
      <SidebarHeader
        className={`
          !py-6 relative z-10
          ${!isCollapsed ? "!px-6" : "!px-4"}
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="flex h-[60px] items-center gap-3 justify-start">
          {/* Logo Container with Hover Effect */}
          <div
            className={`
              relative flex items-center justify-center rounded-xl
              bg-gradient-to-br from-blue-500 to-blue-600
              shadow-lg shadow-blue-500/25
              transition-all duration-300 ease-in-out
              hover:shadow-xl hover:shadow-blue-500/40
              hover:scale-105
              ${!isCollapsed ? "w-12 h-12" : "w-10 h-10"}
            `}
          >
            <img
              src={mylogo}
              alt="Schedley Logo"
              className="w-8 h-8 object-contain filter brightness-0 invert"
            />
            
            {/* Animated Ring */}
            <div className="absolute inset-0 rounded-xl border-2 border-blue-400/0 
                          hover:border-blue-400/30 transition-all duration-300" />
          </div>

          {/* Brand Name with Slide Animation */}
          <div
            className={`
              grid flex-1 text-left leading-tight overflow-hidden
              transition-all duration-300 ease-in-out
              ${!isCollapsed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
            `}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 
                           bg-clip-text text-transparent tracking-tight">
                Schedley
              </h2>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 
                            animate-pulse shadow-sm shadow-green-400/50" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Scheduling Made Simple</p>
          </div>

          {/* Toggle Button with Enhanced Animation */}
          <SidebarTrigger
            className={`
              relative p-2 rounded-lg transition-all duration-300 ease-in-out
              hover:bg-slate-100 active:scale-95
              ${isCollapsed ? 
                "absolute -right-4 z-30 bg-white border border-slate-200 shadow-lg hover:shadow-xl" : 
                "bg-transparent hover:bg-slate-100"
              }
            `}
          >
            <ChevronRight 
              className={`
                w-4 h-4 transition-transform duration-300 ease-in-out
                ${isCollapsed ? "rotate-0" : "rotate-180"}
              `}
            />
          </SidebarTrigger>
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
                    ${mounted ? 'animate-slideIn' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
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
                      ${isActive ? '!text-white' : '!text-slate-700 hover:!text-blue-700'}
                    `}
                  >
                    {/* Icon Container with Animation */}
                    <div className={`
                      relative flex items-center justify-center
                      transition-all duration-300 ease-in-out
                      ${isHovered && !isCollapsed ? 'scale-110' : 'scale-100'}
                    `}>
                      <item.icon 
                        className={`
                          !w-5 !h-5 !stroke-2 z-10 relative
                          transition-all duration-300 ease-in-out
                          ${isActive ? 'drop-shadow-sm' : ''}
                        `}
                      />
                      
                      {/* Animated Background Circle */}
                      {isHovered && !isActive && (
                        <div className="absolute inset-0 w-8 h-8 -m-1.5 bg-blue-100 
                                      rounded-lg animate-pulse opacity-50" />
                      )}
                    </div>

                    {/* Label with Slide Animation */}
                    <span
                      className={`
                        transition-all duration-300 ease-in-out
                        ${!isCollapsed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                      `}
                    >
                      {item.title}
                    </span>

                    {/* Badge with Pulse Animation */}
                    {item.badge && !isCollapsed && (
                      <div
                        className={`
                          ml-auto px-2 py-1 rounded-full text-xs font-bold
                          transition-all duration-300 ease-in-out
                          ${isActive ? 
                            'bg-white/20 text-white' : 
                            'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                          }
                          animate-pulse
                        `}
                      >
                        {item.badge}
                      </div>
                    )}

                    {/* Hover Arrow */}
                    {isHovered && !isCollapsed && !isActive && (
                      <ChevronRight className="ml-auto w-4 h-4 text-blue-500 
                                             animate-bounceX opacity-70" />
                    )}

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 
                                    bg-white rounded-full shadow-sm animate-slideInLeft" />
                    )}
                  </Link>
                </SidebarMenuButton>

                {/* Separator with Animation */}
                {item.separator && (
                  <div className={`
                    my-4 mx-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent
                    transition-all duration-500 ease-in-out
                    ${!isCollapsed ? 'opacity-100' : 'opacity-0'}
                  `} />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 
                      bg-gradient-to-t from-white via-white/80 to-transparent 
                      pointer-events-none" />
      </SidebarContent>

      <SidebarRail className="!bg-slate-200/60" />

      {/* Custom Styles */}
      <style jsx>{`
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }

        @keyframes bounceX {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }

        .animate-bounceX {
          animation: bounceX 1s ease-in-out infinite;
        }
      `}</style>
    </Sidebar>
  );
}