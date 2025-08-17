// import React from "react";
// import { Loader } from "@/components/loader";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// const PageContainer = (props: {
//   isLoading?: boolean;
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   const { children, className, isLoading } = props;
//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-center mt-[66px] mb-[30px]">
//         {isLoading ? (
//           <div className="flex items-center justify-center min-h-[10vh]">
//             <Loader size="lg" color="black" />
//           </div>
//         ) : (
//           <Card
//             className={cn(
//               `booking--card w-full md:min-w-[900px] md:max-w-[1000px] min-h-[540px]
//         mx-auto shadow-[0px_1px_8px_0px_rgba(0,0,0,0.08)] 
//         border border-[rgba(26,26,26,0.1)] rounded-lg
//         `,
//               className && className
//             )}
//           >
//             <CardContent className="relative py-0 px-0">
//               <a
//                 href="/"
//                 target="_blank"
//                 className="absolute top-[-1px] !z-50 right-[-5px] w-[100px] h-[100px] pointer-events-none will-change-transform overflow-hidden no-underline transition-all duration-100 ease-in"
//               >
//                 <div
//                   className="relative top-[21px] left-[-11px]  block w-[160px] bg-[rgb(80,89,96)] text-white 
//                shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] 
//               font-bold leading-[1.2] text-center pointer-events-auto 
//               rotate-45 py-[3px] pt-2 px-0 
//               no-underline transition-all duration-100 ease-in"
//                 >
//                   <div className="text-[8px] -ml-[19px] text-[#F2F2F2] uppercase">
//                     powered by
//                   </div>
//                   <div className="text-lg -ml-[19px] font-semibold">Schedley.com</div>
//                 </div>
//               </a>

//               <div>{children}</div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PageContainer;



import React from "react";
import { Loader } from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageContainer = (props: {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className, isLoading } = props;

  // Get user's timezone information for debugging
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = new Date();

  // Log timezone info for debugging purposes
  console.log('PageContainer timezone info:', {
    userTimezone,
    currentLocalTime: currentTime.toLocaleString(),
    currentUTCTime: currentTime.toISOString(),
    timezoneOffset: currentTime.getTimezoneOffset()
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mt-[66px] mb-[30px]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[10vh]">
            <Loader size="lg" color="black" />
          </div>
        ) : (
          <Card
            className={cn(
              `booking--card w-full md:min-w-[900px] md:max-w-[1000px] min-h-[540px]
        mx-auto shadow-[0px_1px_8px_0px_rgba(0,0,0,0.08)] 
         border border-[rgba(26,26,26,0.1)] rounded-lg
        `,
              className && className
            )}
          >
            <CardContent className="relative py-0 px-0">
              <a
                href="/"
                target="_blank"
                className="absolute top-[-1px] !z-50 right-[-5px] w-[100px] h-[100px] pointer-events-none will-change-transform overflow-hidden no-underline transition-all duration-100 ease-in"
              >
                <div
                  className="relative top-[21px] left-[-11px]  block w-[160px] bg-[rgb(80,89,96)] text-white
                shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]
               font-bold leading-[1.2] text-center pointer-events-auto
               rotate-45 py-[3px] pt-2 px-0
               no-underline transition-all duration-100 ease-in"
                >
                  <div className="text-[8px] -ml-[19px] text-[#F2F2F2] uppercase">
                    powered by
                  </div>
                  <div className="text-lg -ml-[19px] font-semibold">Schedley.com</div>
                </div>
              </a>

              {/* Optional: Display timezone info for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-2 left-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded z-40">
                  {userTimezone}
                </div>
              )}

              <div>{children}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PageContainer;