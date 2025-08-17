

// import { useQuery } from "@tanstack/react-query";
// import PageTitle from "@/components/PageTitle";
// import { Card, CardContent } from "@/components/ui/card";
// import WeeklyHoursRow from "./_components/weekly-hours";
// import { Separator } from "@/components/ui/separator";
// import { ClockIcon } from "lucide-react";
// import { getUserAvailabilityQueryFn } from "@/lib/api";
// import { Loader } from "@/components/loader";
// import { ErrorAlert } from "@/components/ErrorAlert";
// import { useMemo } from "react";

// // Helper function to detect user timezone
// const detectUserTimezone = (): string => {
//   try {
//     return Intl.DateTimeFormat().resolvedOptions().timeZone;
//   } catch {
//     return 'UTC';
//   }
// };

// // Helper function to convert UTC time to local time
// const convertUTCTimeToLocal = (utcTime: string, timezone: string, dayName?: string): string => {
//   if (!utcTime) return utcTime;
  
//   try {
//     const [hours, minutes] = utcTime.split(':').map(Number);
    
//     // Create a date object with today's date and UTC time
//     const today = new Date();
//     const utcDate = new Date(Date.UTC(
//       today.getFullYear(), 
//       today.getMonth(), 
//       today.getDate(), 
//       hours, 
//       minutes, 
//       0, 
//       0
//     ));
    
//     // Format the time in the specified timezone
//     const localTimeString = utcDate.toLocaleTimeString('en-US', {
//       timeZone: timezone,
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit'
//     });
    
//     // Debug log for each time conversion
//     if (dayName) {
//       console.log(`🔄 ${dayName}: ${utcTime} UTC → ${localTimeString} ${timezone}`);
//     }
    
//     return localTimeString;
//   } catch (error) {
//     console.error('Error converting UTC time to local:', error);
//     return utcTime; // fallback to original time if conversion fails
//   }
// };

// // Helper function to convert days array from UTC to local timezone
// const convertDaysToLocalTimezone = (days: any[], timezone: string) => {
//   if (!days || !Array.isArray(days)) return [];
  
//   console.log("🌍 Starting timezone conversion...");
//   console.log("📍 Target timezone:", timezone);
//   console.log("📅 Total days to process:", days.length);
  
//   return days.map((day, index) => {
//     console.log(`\n--- Processing Day ${index + 1}: ${day.day} ---`);
//     console.log("📊 Original data:", {
//       day: day.day,
//       isAvailable: day.isAvailable,
//       startTime: day.startTime,
//       endTime: day.endTime
//     });
    
//     // Only convert times for available days
//     if (day.isAvailable && day.startTime && day.endTime) {
//       console.log("✅ Day is AVAILABLE - Converting times...");
      
//       const localStartTime = convertUTCTimeToLocal(day.startTime, timezone, `${day.day} Start`);
//       const localEndTime = convertUTCTimeToLocal(day.endTime, timezone, `${day.day} End`);
      
//       const convertedDay = {
//         ...day,
//         startTime: localStartTime,
//         endTime: localEndTime,
//       };
      
//       console.log("🎯 Converted data:", {
//         day: convertedDay.day,
//         isAvailable: convertedDay.isAvailable,
//         startTime: convertedDay.startTime,
//         endTime: convertedDay.endTime
//       });
      
//       return convertedDay;
//     } else {
//       console.log("❌ Day is NOT AVAILABLE - Skipping conversion");
//       return day; // Return unchanged for unavailable days
//     }
//   });
// };

// const Availability = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["user_availability"],
//     queryFn: getUserAvailabilityQueryFn,
//   });

//   const availability = data?.availability;
//   const originalDays = availability?.days || [];
//   const timeGap = availability?.timeGap || 30;

//   // Get user's current timezone
//   const userTimezone = useMemo(() => detectUserTimezone(), []);

//   // Convert UTC times to local timezone
//   const convertedDays = useMemo(() => {
//     // If we have stored timezone preference, use it; otherwise use detected timezone
//     const targetTimezone = availability?.timezone || userTimezone;
    
//     console.log("🚀 TIMEZONE CONVERSION STARTED");
//     console.log("==========================================");
//     console.log("📥 Raw data from database (UTC times):", originalDays);
//     console.log("🌍 User's detected timezone:", userTimezone);
//     console.log("🎯 Target timezone for conversion:", targetTimezone);
//     console.log("==========================================");
    
//     const converted = convertDaysToLocalTimezone(originalDays, targetTimezone);
    
//     console.log("==========================================");
//     console.log("✨ CONVERSION COMPLETED!");
//     console.log("📤 Final converted data (Local times):", converted);
//     console.log("==========================================");
    
//     return converted;
//   }, [originalDays, availability?.timezone, userTimezone]);

//   return (
//     <div className="flex flex-col !gap-3">
//       <PageTitle title="Availability" />

//       <ErrorAlert isError={isError} error={error} />

//       <div className="w-full">
//         {isLoading || isError ? (
//           <div className="flex items-center justify-center min-h-[30vh]">
//             <Loader size="lg" color="black" />
//           </div>
//         ) : (
//           <Card className="p-0 shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)]min-h-[220px] border border-[#D4E16F)] bg-white rounded-[8px]">
//             <CardContent className="!py-[24px] px-0 !pb-10">
//               <div>
//                 <fieldset>
//                   <legend>
//                     <h3 className="text-lg px-[24px] inline-flex gap-1 font-bold tracking-wide mb-3">
//                       <ClockIcon />
//                       <span>Weekly hours</span>
//                     </h3>
//                   </legend>
//                   <Separator className="bg-[#D4E16F]" />
//                   <div className="w-full max-w-lg px-[24px]">
//                     {/* Pass the converted local times to the component */}
//                     <WeeklyHoursRow days={convertedDays} timeGap={timeGap} />
//                   </div>
//                 </fieldset>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Availability;



import { useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import WeeklyHoursRow from "./_components/weekly-hours";
import { Separator } from "@/components/ui/separator";
import { ClockIcon } from "lucide-react";
import { getUserAvailabilityQueryFn } from "@/lib/api";
import { Loader } from "@/components/loader";
import { ErrorAlert } from "@/components/ErrorAlert";

const Availability = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user_availability"],
    queryFn: getUserAvailabilityQueryFn,
  });

  const availability = data?.availability;
  const originalDays = availability?.days || [];
  const timeGap = availability?.timeGap || 30;
  const backendTimezone = availability?.timezone;

  // Single console log to show the timezone coming from backend
  console.log("full data comming from the backedn as avialiability",availability);
  console.log("🌍 Timezone received from backend:", backendTimezone);

  return (
    <div className="flex flex-col !gap-3">
      <PageTitle title="Availability" />

      <ErrorAlert isError={isError} error={error} />

      <div className="w-full">
        {isLoading || isError ? (
          <div className="flex items-center justify-center min-h-[30vh]">
            <Loader size="lg" color="black" />
          </div>
        ) : (
          <Card className="p-0 shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)]min-h-[220px] border border-[#D4E16F)] bg-white rounded-[8px]">
            <CardContent className="!py-[24px] px-0 !pb-10">
              <div>
                <fieldset>
                  <legend>
                    <h3 className="text-lg px-[24px] inline-flex gap-1 font-bold tracking-wide mb-3">
                      <ClockIcon />
                      <span>Weekly hours</span>
                    </h3>
                  </legend>
                  <Separator className="bg-[#D4E16F]" />
                  <div className="w-full max-w-lg px-[24px]">
                    {/* Pass the original data without any conversion */}
                    <WeeklyHoursRow 
                      days={originalDays} 
                      timeGap={timeGap}
                      userTimezone={backendTimezone}
                    />
                  </div>
                </fieldset>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Availability;