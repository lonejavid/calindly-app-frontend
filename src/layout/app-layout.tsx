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

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const AppLayout = () => {
  const location = useLocation();
  const { user } = useStore();
  
  // Check if user is on setup page or not approved
  const isSetupPage = location.pathname === PROTECTED_ROUTES.SETUP;
  const isUserNotApproved = user && user.isApproved === false;
  
  // Hide sidebar if user is not approved or on setup page
  const shouldShowSidebar = !isSetupPage && !isUserNotApproved;

  return (
    <SidebarProvider>
      {/* Only render AppSidebar if user is approved */}
      {shouldShowSidebar && <AppSidebar />}
      
      <SidebarInset className={`overflow-x-hidden p-0 !bg-[#fafafa] ${!shouldShowSidebar ? 'ml-0' : ''}`}>
        <div
          className="w-full flex flex-1 flex-col gap-1 px-3 lg:px-8 max-w-[1300px] mx-auto"
        >
          <>
            <Header />
            <div className="pb-8">
              <Outlet />
            </div>
          </>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;