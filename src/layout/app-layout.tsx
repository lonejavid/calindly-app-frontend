// import { AppSidebar } from "@/components/AppSidebar";
// import Header from "@/components/Header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";

// const AppLayout = () => {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset className={`overflow-x-hidden p-0 !bg-[#fafafa]`}>
//         <div
//           className="w-full flex flex-1 flex-col gap-1 px-3 lg:px-8 max-w-[1300px]
//          mx-auto
//         "
//         >
//           <>
//             <Header />
//             <div className="pb-8">
//               <Outlet />
//             </div>
//           </>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default AppLayout;

import { LinkIcon, CalendarRange, ClockIcon, LayoutGrid, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const PAGE_TITLES: Record<string, string> = {
  [PROTECTED_ROUTES.EVENT_TYPES]: "Event types",
  [PROTECTED_ROUTES.MEETINGS]: "Meetings",
  [PROTECTED_ROUTES.AVAILBILITIY]: "Availability",
  [PROTECTED_ROUTES.INTEGRATIONS]: "Integrations & apps",
  [PROTECTED_ROUTES.SETUP]: "Setup",
};

const PAGE_ICONS: Record<string, LucideIcon> = {
  [PROTECTED_ROUTES.EVENT_TYPES]: LinkIcon,
  [PROTECTED_ROUTES.MEETINGS]: CalendarRange,
  [PROTECTED_ROUTES.AVAILBILITIY]: ClockIcon,
  [PROTECTED_ROUTES.INTEGRATIONS]: LayoutGrid,
  [PROTECTED_ROUTES.SETUP]: Settings,
};

const PAGE_SUBTITLES: Record<string, string> = {
  [PROTECTED_ROUTES.EVENT_TYPES]: "Create and manage your scheduling links",
  [PROTECTED_ROUTES.MEETINGS]: "View and manage your scheduled meetings",
  [PROTECTED_ROUTES.AVAILBILITIY]: "Set when you're available for meetings",
  [PROTECTED_ROUTES.INTEGRATIONS]: "Connect your calendar and other tools",
  [PROTECTED_ROUTES.SETUP]: "Get your account ready",
};

const AppLayout = () => {
  const location = useLocation();
  const { user } = useStore();
  const pageTitle = PAGE_TITLES[location.pathname];
  const pageIcon = PAGE_ICONS[location.pathname];
  const pageSubtitle = PAGE_SUBTITLES[location.pathname];

  // Check if user is on setup page or not approved
  const isSetupPage = location.pathname === PROTECTED_ROUTES.SETUP;
  const isUserNotApproved = user && user.isApproved === false;

  // Hide sidebar if user is not approved or on setup page
  const shouldShowSidebar = !isSetupPage && !isUserNotApproved;

  return (
    <SidebarProvider>
      {/* Only render AppSidebar if user is approved */}
      {shouldShowSidebar && <AppSidebar />}

      <SidebarInset className={`overflow-x-hidden p-0 !bg-[#fafafa] flex flex-col min-h-0 ${!shouldShowSidebar ? "ml-0" : "border-l-2 border-[var(--blue)]"}`}>
        <div className="b2b-page w-full flex flex-1 flex-col min-h-0 px-3">
          <Header title={pageTitle} subtitle={pageSubtitle} icon={pageIcon} />
          <div className="flex-1 flex flex-col min-h-0 overflow-auto pb-8">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;