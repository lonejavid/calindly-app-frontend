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
  Sparkles,
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
  color?: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { state } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

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
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Meetings",
      url: PROTECTED_ROUTES.MEETINGS,
      icon: CalendarRange,
      badge: "12",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Integrations & apps",
      url: PROTECTED_ROUTES.INTEGRATIONS,
      icon: LayoutGrid,
      separator: true,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Availability",
      url: PROTECTED_ROUTES.AVAILBILITIY,
      icon: ClockIcon,
      color: "from-orange-500 to-red-600",
    },
  ];

  const isCollapsed = state === "collapsed";

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px) translateY(-50%);
            width: 0;
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
            width: 4px;
          }
        }

        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99, 102, 241, 0.3); }
        }

        .animate-slideIn {
          animation: slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-bounceX {
          animation: bounceX 1.5s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <Sidebar
        collapsible="icon"
        variant="sidebar"
        className={`
          ${!isCollapsed ? "w-[300px]" : "w-[75px]"} 
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          relative overflow-hidden
        `}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        {...props}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-20 right-0 w-52 h-52 bg-purple-200 rounded-full mix-blend-overlay filter blur-xl animate-float" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-overlay filter blur-xl animate-float" 
               style={{ animationDelay: '4s' }} />
        </div>

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-5 bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
        
        {/* Header with Enhanced Logo */}
        <SidebarHeader
          className={`
            !py-8 relative z-20
            ${!isCollapsed ? "!px-6" : "!px-4"}
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          `}
        >
          <div className="flex h-[70px] items-center gap-4 justify-start">
            {/* Enhanced Logo Container */}
            <div
              className={`
                relative flex items-center justify-center rounded-2xl
                glassmorphism
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:scale-110 hover:rotate-3
                group cursor-pointer
                ${!isCollapsed ? "w-14 h-14" : "w-12 h-12"}
                animate-glow
              `}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              {/* Logo Image with Better Visibility */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm p-1">
                <img
                  src={mylogo}
                  alt="Schedley Logo"
                  className={`
                    w-full h-full object-contain
                    transition-all duration-300
                    ${logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  `}
                  onLoad={() => setLogoLoaded(true)}
                  onError={() => {
                    // Fallback if logo fails to load
                    setLogoLoaded(true);
                  }}
                />
                
                {/* Fallback Logo if image doesn't load */}
                {!logoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                )}
              </div>
              
              {/* Sparkle Effect */}
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 
                                 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 rounded-2xl animate-shimmer opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300" />
            </div>

            {/* Enhanced Brand Name */}
            <div
              className={`
                grid flex-1 text-left leading-tight overflow-hidden
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${!isCollapsed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
              `}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-lg">
                  Schedley
                </h2>
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 
                                animate-pulse shadow-lg shadow-green-400/50" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-20" />
                </div>
              </div>
              <p className="text-sm text-white/80 font-medium tracking-wide">
                ✨ Scheduling Reimagined
              </p>
            </div>

            {/* Enhanced Toggle Button */}
            <SidebarTrigger
              className={`
                relative p-3 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:scale-110 active:scale-95 group
                ${isCollapsed ? 
                  "absolute -right-5 z-30 glassmorphism shadow-2xl hover:shadow-3xl" : 
                  "glassmorphism hover:bg-white/10"
                }
              `}
            >
              <ChevronRight 
                className={`
                  w-5 h-5 text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  group-hover:text-yellow-300
                  ${isCollapsed ? "rotate-0" : "rotate-180"}
                `}
              />
            </SidebarTrigger>
          </div>
        </SidebarHeader>

        {/* Enhanced Navigation Content */}
        <SidebarContent className="!p-3 relative z-20">
          <SidebarMenu className="space-y-2">
            {items.map((item, index) => {
              const isActive = item.url === pathname;
              const isHovered = hoveredItem === item.title;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`
                      relative group overflow-hidden rounded-2xl border-0 p-0
                      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:scale-[1.02] hover:shadow-2xl
                      ${mounted ? 'animate-slideIn' : ''}
                      ${isActive ? 'shadow-2xl' : 'hover:shadow-xl'}
                    `}
                    style={{
                      animationDelay: `${index * 150}ms`,
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
                        relative !text-base !p-5 min-h-[64px] rounded-2xl
                        !font-bold flex items-center gap-4 overflow-hidden
                        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isActive ? '!text-white' : '!text-white/90 hover:!text-white'}
                      `}
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${item.color?.split(' ')[0] || 'from-blue-500'} 0%, ${item.color?.split(' ')[2] || 'to-purple-600'} 100%)`
                          : isHovered 
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: isActive 
                          ? '1px solid rgba(255, 255, 255, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {/* Background Shimmer Effect */}
                      {isHovered && !isActive && (
                        <div className="absolute inset-0 animate-shimmer" />
                      )}

                      {/* Icon Container with Enhanced Animation */}
                      <div className={`
                        relative flex items-center justify-center
                        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isHovered && !isCollapsed ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}
                      `}>
                        <item.icon 
                          className={`
                            !w-6 !h-6 !stroke-[2.5] z-10 relative
                            transition-all duration-300
                            ${isActive ? 'drop-shadow-lg filter brightness-110' : ''}
                          `}
                        />
                        
                        {/* Enhanced Glow Effect */}
                        {(isHovered || isActive) && (
                          <div 
                            className="absolute inset-0 w-10 h-10 -m-2 rounded-xl opacity-30 animate-pulse blur-sm" 
                            style={{
                              background: `linear-gradient(135deg, ${item.color?.split(' ')[0] || 'from-blue-500'} 0%, ${item.color?.split(' ')[2] || 'to-purple-600'} 100%)`
                            }}
                          />
                        )}
                      </div>

                      {/* Enhanced Label */}
                      <span
                        className={`
                          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                          ${!isCollapsed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                          ${isActive ? 'drop-shadow-sm' : ''}
                        `}
                      >
                        {item.title}
                      </span>

                      {/* Enhanced Badge */}
                      {item.badge && !isCollapsed && (
                        <div
                          className={`
                            ml-auto px-3 py-1.5 rounded-xl text-xs font-black
                            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                            animate-pulse shadow-lg
                            ${isActive ? 
                              'bg-white/25 text-white backdrop-blur-sm' : 
                              'bg-white/20 text-white/90 group-hover:bg-white/30'
                            }
                          `}
                        >
                          {item.badge}
                        </div>
                      )}

                      {/* Enhanced Hover Arrow */}
                      {isHovered && !isCollapsed && !isActive && (
                        <ChevronRight className="ml-auto w-5 h-5 text-white/80 
                                               animate-bounceX drop-shadow-sm" />
                      )}

                      {/* Enhanced Active Indicator */}
                      {isActive && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-10 
                                      bg-white rounded-full shadow-lg animate-slideInLeft 
                                      drop-shadow-sm" />
                      )}
                    </Link>
                  </SidebarMenuButton>

                  {/* Enhanced Separator */}
                  {item.separator && (
                    <div className={`
                      my-6 mx-6 h-px relative
                      transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                      ${!isCollapsed ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />
                    </div>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>

          {/* Enhanced Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-12 
                        bg-gradient-to-t from-black/10 via-transparent to-transparent 
                        pointer-events-none backdrop-blur-sm" />
        </SidebarContent>

        <SidebarRail className="!bg-white/20 backdrop-blur-sm" />
      </Sidebar>
    </>
  );
}