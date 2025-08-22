

// import { z } from "zod";
// import { toast } from "sonner";
// import { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { dayMapping } from "@/lib/availability";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Label } from "@/components/ui/label";
// import DayAvailability from "./day-availability";
// import { DayAvailabilityType } from "@/types/api.type";
// import { updateUserAvailabilityMutationFn } from "@/lib/api";
// import { Loader } from "@/components/loader";
// import { Check, ChevronsUpDown, Globe, Clock, Sparkles, Calendar } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// // Comprehensive timezone options with all major world timezones
// const TIMEZONE_OPTIONS = [
//   // North America
//   { value: 'America/New_York', label: 'Eastern Time (New York)', group: 'NORTH_AMERICA', country: '🇺🇸' },
//   { value: 'America/Chicago', label: 'Central Time (Chicago)', group: 'NORTH_AMERICA', country: '🇺🇸' },
//   { value: 'America/Denver', label: 'Mountain Time (Denver)', group: 'NORTH_AMERICA', country: '🇺🇸' },
//   { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles)', group: 'NORTH_AMERICA', country: '🇺🇸' },
//   { value: 'America/Anchorage', label: 'Alaska Time (Anchorage)', group: 'NORTH_AMERICA', country: '🇺🇸' },
//   { value: 'Pacific/Honolulu', label: 'Hawaii Time (Honolulu)', group: 'NORTH_AMERICA', country: '🇺🇸' },
//   { value: 'America/Toronto', label: 'Eastern Time (Toronto)', group: 'NORTH_AMERICA', country: '🇨🇦' },
//   { value: 'America/Vancouver', label: 'Pacific Time (Vancouver)', group: 'NORTH_AMERICA', country: '🇨🇦' },
//   { value: 'America/Montreal', label: 'Eastern Time (Montreal)', group: 'NORTH_AMERICA', country: '🇨🇦' },
//   { value: 'America/Mexico_City', label: 'Central Time (Mexico City)', group: 'NORTH_AMERICA', country: '🇲🇽' },
//   { value: 'America/Tijuana', label: 'Pacific Time (Tijuana)', group: 'NORTH_AMERICA', country: '🇲🇽' },
  
//   // South America
//   { value: 'America/Sao_Paulo', label: 'Brasília Time (São Paulo)', group: 'SOUTH_AMERICA', country: '🇧🇷' },
//   { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (Buenos Aires)', group: 'SOUTH_AMERICA', country: '🇦🇷' },
//   { value: 'America/Lima', label: 'Peru Time (Lima)', group: 'SOUTH_AMERICA', country: '🇵🇪' },
//   { value: 'America/Santiago', label: 'Chile Time (Santiago)', group: 'SOUTH_AMERICA', country: '🇨🇱' },
//   { value: 'America/Bogota', label: 'Colombia Time (Bogotá)', group: 'SOUTH_AMERICA', country: '🇨🇴' },
//   { value: 'America/Caracas', label: 'Venezuela Time (Caracas)', group: 'SOUTH_AMERICA', country: '🇻🇪' },
  
//   // Europe
//   { value: 'Europe/London', label: 'Greenwich Mean Time (London)', group: 'EUROPE', country: '🇬🇧' },
//   { value: 'Europe/Paris', label: 'Central European Time (Paris)', group: 'EUROPE', country: '🇫🇷' },
//   { value: 'Europe/Berlin', label: 'Central European Time (Berlin)', group: 'EUROPE', country: '🇩🇪' },
//   { value: 'Europe/Rome', label: 'Central European Time (Rome)', group: 'EUROPE', country: '🇮🇹' },
//   { value: 'Europe/Madrid', label: 'Central European Time (Madrid)', group: 'EUROPE', country: '🇪🇸' },
//   { value: 'Europe/Amsterdam', label: 'Central European Time (Amsterdam)', group: 'EUROPE', country: '🇳🇱' },
//   { value: 'Europe/Brussels', label: 'Central European Time (Brussels)', group: 'EUROPE', country: '🇧🇪' },
//   { value: 'Europe/Vienna', label: 'Central European Time (Vienna)', group: 'EUROPE', country: '🇦🇹' },
//   { value: 'Europe/Zurich', label: 'Central European Time (Zurich)', group: 'EUROPE', country: '🇨🇭' },
//   { value: 'Europe/Stockholm', label: 'Central European Time (Stockholm)', group: 'EUROPE', country: '🇸🇪' },
//   { value: 'Europe/Copenhagen', label: 'Central European Time (Copenhagen)', group: 'EUROPE', country: '🇩🇰' },
//   { value: 'Europe/Oslo', label: 'Central European Time (Oslo)', group: 'EUROPE', country: '🇳🇴' },
//   { value: 'Europe/Helsinki', label: 'Eastern European Time (Helsinki)', group: 'EUROPE', country: '🇫🇮' },
//   { value: 'Europe/Warsaw', label: 'Central European Time (Warsaw)', group: 'EUROPE', country: '🇵🇱' },
//   { value: 'Europe/Prague', label: 'Central European Time (Prague)', group: 'EUROPE', country: '🇨🇿' },
//   { value: 'Europe/Budapest', label: 'Central European Time (Budapest)', group: 'EUROPE', country: '🇭🇺' },
//   { value: 'Europe/Bucharest', label: 'Eastern European Time (Bucharest)', group: 'EUROPE', country: '🇷🇴' },
//   { value: 'Europe/Athens', label: 'Eastern European Time (Athens)', group: 'EUROPE', country: '🇬🇷' },
//   { value: 'Europe/Istanbul', label: 'Turkey Time (Istanbul)', group: 'EUROPE', country: '🇹🇷' },
//   { value: 'Europe/Moscow', label: 'Moscow Standard Time', group: 'EUROPE', country: '🇷🇺' },
//   { value: 'Europe/Kiev', label: 'Eastern European Time (Kyiv)', group: 'EUROPE', country: '🇺🇦' },
//   { value: 'Europe/Dublin', label: 'Greenwich Mean Time (Dublin)', group: 'EUROPE', country: '🇮🇪' },
//   { value: 'Europe/Lisbon', label: 'Western European Time (Lisbon)', group: 'EUROPE', country: '🇵🇹' },
  
//   // Asia
//   { value: 'Asia/Tokyo', label: 'Japan Standard Time (Tokyo)', group: 'ASIA', country: '🇯🇵' },
//   { value: 'Asia/Seoul', label: 'Korea Standard Time (Seoul)', group: 'ASIA', country: '🇰🇷' },
//   { value: 'Asia/Shanghai', label: 'China Standard Time (Shanghai)', group: 'ASIA', country: '🇨🇳' },
//   { value: 'Asia/Beijing', label: 'China Standard Time (Beijing)', group: 'ASIA', country: '🇨🇳' },
//   { value: 'Asia/Hong_Kong', label: 'Hong Kong Time', group: 'ASIA', country: '🇭🇰' },
//   { value: 'Asia/Singapore', label: 'Singapore Standard Time', group: 'ASIA', country: '🇸🇬' },
//   { value: 'Asia/Bangkok', label: 'Indochina Time (Bangkok)', group: 'ASIA', country: '🇹🇭' },
//   { value: 'Asia/Jakarta', label: 'Western Indonesian Time (Jakarta)', group: 'ASIA', country: '🇮🇩' },
//   { value: 'Asia/Manila', label: 'Philippine Standard Time (Manila)', group: 'ASIA', country: '🇵🇭' },
//   { value: 'Asia/Kuala_Lumpur', label: 'Malaysia Time (Kuala Lumpur)', group: 'ASIA', country: '🇲🇾' },
//   { value: 'Asia/Ho_Chi_Minh', label: 'Indochina Time (Ho Chi Minh)', group: 'ASIA', country: '🇻🇳' },
//   { value: 'Asia/Kolkata', label: 'India Standard Time (Kolkata)', group: 'ASIA', country: '🇮🇳' },
//   { value: 'Asia/Mumbai', label: 'India Standard Time (Mumbai)', group: 'ASIA', country: '🇮🇳' },
//   { value: 'Asia/New_Delhi', label: 'India Standard Time (New Delhi)', group: 'ASIA', country: '🇮🇳' },
//   { value: 'Asia/Dhaka', label: 'Bangladesh Standard Time (Dhaka)', group: 'ASIA', country: '🇧🇩' },
//   { value: 'Asia/Karachi', label: 'Pakistan Standard Time (Karachi)', group: 'ASIA', country: '🇵🇰' },
//   { value: 'Asia/Dubai', label: 'Gulf Standard Time (Dubai)', group: 'ASIA', country: '🇦🇪' },
//   { value: 'Asia/Riyadh', label: 'Arabia Standard Time (Riyadh)', group: 'ASIA', country: '🇸🇦' },
//   { value: 'Asia/Kuwait', label: 'Arabia Standard Time (Kuwait)', group: 'ASIA', country: '🇰🇼' },
//   { value: 'Asia/Doha', label: 'Arabia Standard Time (Doha)', group: 'ASIA', country: '🇶🇦' },
//   { value: 'Asia/Tehran', label: 'Iran Standard Time (Tehran)', group: 'ASIA', country: '🇮🇷' },
//   { value: 'Asia/Baghdad', label: 'Arabia Standard Time (Baghdad)', group: 'ASIA', country: '🇮🇶' },
//   { value: 'Asia/Baku', label: 'Azerbaijan Time (Baku)', group: 'ASIA', country: '🇦🇿' },
//   { value: 'Asia/Yerevan', label: 'Armenia Time (Yerevan)', group: 'ASIA', country: '🇦🇲' },
//   { value: 'Asia/Tbilisi', label: 'Georgia Standard Time (Tbilisi)', group: 'ASIA', country: '🇬🇪' },
//   { value: 'Asia/Almaty', label: 'Almaty Time', group: 'ASIA', country: '🇰🇿' },
//   { value: 'Asia/Tashkent', label: 'Uzbekistan Time (Tashkent)', group: 'ASIA', country: '🇺🇿' },
  
//   // Africa
//   { value: 'Africa/Lagos', label: 'West Africa Time (Lagos)', group: 'AFRICA', country: '🇳🇬' },
//   { value: 'Africa/Cairo', label: 'Eastern European Time (Cairo)', group: 'AFRICA', country: '🇪🇬' },
//   { value: 'Africa/Johannesburg', label: 'South Africa Standard Time', group: 'AFRICA', country: '🇿🇦' },
//   { value: 'Africa/Nairobi', label: 'East Africa Time (Nairobi)', group: 'AFRICA', country: '🇰🇪' },
//   { value: 'Africa/Accra', label: 'Greenwich Mean Time (Accra)', group: 'AFRICA', country: '🇬🇭' },
//   { value: 'Africa/Casablanca', label: 'Western European Time (Casablanca)', group: 'AFRICA', country: '🇲🇦' },
//   { value: 'Africa/Algiers', label: 'Central European Time (Algiers)', group: 'AFRICA', country: '🇩🇿' },
//   { value: 'Africa/Tunis', label: 'Central European Time (Tunis)', group: 'AFRICA', country: '🇹🇳' },
//   { value: 'Africa/Addis_Ababa', label: 'East Africa Time (Addis Ababa)', group: 'AFRICA', country: '🇪🇹' },
//   { value: 'Africa/Kampala', label: 'East Africa Time (Kampala)', group: 'AFRICA', country: '🇺🇬' },
//   { value: 'Africa/Dar_es_Salaam', label: 'East Africa Time (Dar es Salaam)', group: 'AFRICA', country: '🇹🇿' },
  
//   // Australia & Pacific
//   { value: 'Australia/Sydney', label: 'Australian Eastern Time (Sydney)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
//   { value: 'Australia/Melbourne', label: 'Australian Eastern Time (Melbourne)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
//   { value: 'Australia/Brisbane', label: 'Australian Eastern Time (Brisbane)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
//   { value: 'Australia/Perth', label: 'Australian Western Time (Perth)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
//   { value: 'Australia/Adelaide', label: 'Australian Central Time (Adelaide)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
//   { value: 'Australia/Darwin', label: 'Australian Central Time (Darwin)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
//   { value: 'Pacific/Auckland', label: 'New Zealand Standard Time (Auckland)', group: 'AUSTRALIA_PACIFIC', country: '🇳🇿' },
//   { value: 'Pacific/Fiji', label: 'Fiji Time', group: 'AUSTRALIA_PACIFIC', country: '🇫🇯' },
//   { value: 'Pacific/Guam', label: 'Chamorro Standard Time (Guam)', group: 'AUSTRALIA_PACIFIC', country: '🇬🇺' },
//   { value: 'Pacific/Tahiti', label: 'Tahiti Time', group: 'AUSTRALIA_PACIFIC', country: '🇵🇫' },
  
//   // UTC
//   { value: 'UTC', label: 'Coordinated Universal Time (UTC)', group: 'UTC', country: '🌍' },
// ];

// // Helper function to get current time in a timezone
// const getCurrentTimeInTimezone = (timezone: string): string => {
//   try {
//     const now = new Date();
//     return new Intl.DateTimeFormat('en-US', {
//       timeZone: timezone,
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZoneName: 'short'
//     }).format(now);
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // Helper function to detect user timezone - only used as fallback
// const detectUserTimezone = (): string => {
//   try {
//     return Intl.DateTimeFormat().resolvedOptions().timeZone;
//   } catch {
//     return 'UTC';
//   }
// };

// // Enhanced Custom Command Components
// const CustomCommand = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <div className={cn(
//     "flex flex-col bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-900/90", 
//     "text-popover-foreground rounded-xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl", 
//     "backdrop-blur-sm",
//     className
//   )}>
//     {children}
//   </div>
// );

// const CustomCommandInput = ({ placeholder, value, onValueChange }: { 
//   placeholder: string; 
//   value?: string; 
//   onValueChange?: (value: string) => void 
// }) => (
//   <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
//     <div className="relative">
//       <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onValueChange?.(e.target.value)}
//         className="w-full pl-10 pr-4 py-2 bg-transparent outline-none placeholder:text-muted-foreground text-sm font-medium focus:placeholder:opacity-50 transition-all rounded-lg border border-transparent focus:border-blue-200 dark:focus:border-blue-700"
//       />
//     </div>
//   </div>
// );

// const CustomCommandList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <div className={cn("overflow-y-auto overflow-x-hidden max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600", className)}>
//     {children}
//   </div>
// );

// const CustomCommandEmpty = ({ children }: { children: React.ReactNode }) => (
//   <div className="py-12 text-center">
//     <Globe className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//     <div className="text-sm text-muted-foreground font-medium">{children}</div>
//   </div>
// );

// const CustomCommandGroup = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
//   <div className="overflow-hidden">
//     <div className="py-3 px-6 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gradient-to-r from-gray-100/70 to-gray-50/70 dark:from-gray-800/50 dark:to-gray-700/50 border-b border-gray-100 dark:border-gray-700/30">
//       {heading.replace('_', ' & ')}
//     </div>
//     <div className="p-2 space-y-1">
//       {children}
//     </div>
//   </div>
// );

// const CustomCommandItem = ({ 
//   children, 
//   onSelect, 
//   isSelected,
//   timezone,
//   country
// }: { 
//   children: React.ReactNode; 
//   onSelect: () => void; 
//   isSelected: boolean;
//   timezone: string;
//   country: string;
// }) => {
//   const currentTime = getCurrentTimeInTimezone(timezone);
  
//   return (
//     <div
//       onClick={onSelect}
//       className={cn(
//         "relative flex items-center justify-between cursor-pointer select-none rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 group",
//         isSelected 
//           ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-[1.02]" 
//           : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:shadow-md hover:scale-[1.01]"
//       )}
//     >
//       <div className="flex items-center gap-3 flex-1">
//         <div className="flex items-center gap-2">
//           <span className="text-lg">{country}</span>
//           <Check className={cn("h-4 w-4 transition-all", isSelected ? "opacity-100 scale-110" : "opacity-0 scale-95")} />
//         </div>
//         <div className="flex flex-col gap-0.5">
//           <span className="font-semibold">{children}</span>
//           <span className={cn("text-xs font-mono", isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400")}>
//             {timezone}
//           </span>
//         </div>
//       </div>
//       <div className="text-right">
//         <div className={cn(
//           "text-sm font-semibold px-2 py-1 rounded-md transition-all",
//           isSelected 
//             ? "bg-white/20 text-white" 
//             : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-white/80 group-hover:shadow-sm"
//         )}>
//           {currentTime}
//         </div>
//       </div>
//     </div>
//   );
// };

// const WeeklyHoursRow = ({
//   days,
//   timeGap,
//   userTimezone: existingUserTimezone,
// }: {
//   days: DayAvailabilityType[];
//   timeGap: number;
//   userTimezone?: string;
// }) => {
//   const [selectedTimezone, setSelectedTimezone] = useState<string>(
//     existingUserTimezone || detectUserTimezone()
//   );
//   const [searchValue, setSearchValue] = useState("");
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
//   const { mutate, isPending } = useMutation({
//     mutationFn: updateUserAvailabilityMutationFn,
//   });

//   // Update current time every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const timeGapSchema = z
//     .number()
//     .int({ message: "Time gap must be an integer" })
//     .min(1, { message: "Time gap must be at least 1 minute" })
//     .refine((value) => [15, 30, 45, 60, 120].includes(value), {
//       message: "Time gap must be 15, 30, 45, 60, or 120 minutes",
//     });

//   const availabilitySchema = z
//     .object({
//       timeGap: timeGapSchema,
//       timezone: z.string().min(1, "Please select a timezone"),
//       days: z.array(
//         z.object({
//           day: z.string(),
//           startTime: z.string(),
//           endTime: z.string(),
//           isAvailable: z.boolean(),
//         })
//       ),
//     })
//     .superRefine((data, ctx) => {
//       data.days.forEach((item, index) => {
//         if (item.isAvailable && item.startTime && item.endTime) {
//           // Parse times to compare (assuming 12-hour format like "9:00 AM")
//           const parseTime12 = (timeStr: string) => {
//             const [time, period] = timeStr.split(' ');
//             const [hours, minutes] = time.split(':').map(Number);
//             let hour24 = hours;
//             if (period === 'PM' && hours !== 12) hour24 += 12;
//             if (period === 'AM' && hours === 12) hour24 = 0;
//             return hour24 * 60 + minutes;
//           };
          
//           const startMinutes = parseTime12(item.startTime);
//           const endMinutes = parseTime12(item.endTime);
          
//           if (endMinutes <= startMinutes) {
//             ctx.addIssue({
//               code: z.ZodIssueCode.custom,
//               message: "End time must be greater than start time",
//               path: ["days", index, "startTime"],
//             });
//             ctx.addIssue({
//               code: z.ZodIssueCode.custom,
//               message: "End time must be greater than start time",
//               path: ["days", index, "endTime"],
//             });
//           }
//         }
//       });
//     });

//   type WeeklyHoursFormData = z.infer<typeof availabilitySchema>;

//   const form = useForm<WeeklyHoursFormData>({
//     resolver: zodResolver(availabilitySchema),
//     mode: "onChange",
//     defaultValues: {
//       timeGap: timeGap || 30,
//       timezone: selectedTimezone,
//       days: days || [],
//     },
//   });

//   // Auto-populate form when component loads and when props change
//   useEffect(() => {
//     if (days && days.length > 0) {
//       form.setValue("days", days);
//     }
//     if (timeGap) {
//       form.setValue("timeGap", timeGap);
//     }
//     if (existingUserTimezone) {
//       form.setValue("timezone", existingUserTimezone);
//       setSelectedTimezone(existingUserTimezone);
//     }
    
//     form.trigger();
//   }, [days, form, timeGap, existingUserTimezone]);

//   const onSubmit = (values: WeeklyHoursFormData) => {
//     if (isPending) return;
    
//     // Send the data as-is (all times are already in 12-hour format)
//     const dataToSend = {
//       timeGap: values.timeGap,
//       timezone: values.timezone,
//       days: values.days, // Times are already in 12-hour format
//     };
//     console.log("This is the information to be saved along with the time zone", dataToSend);
//     mutate(dataToSend, {
//       onSuccess: (response) => {
//         toast.success(response.message || "Availability updated successfully");
//       },
//       onError: (error) => {
//         console.log(error);
//         toast.error(error.message || "Failed to update availability");
//       },
//     });
//   };

//   const handleTimeSelect = useCallback(
//     (day: string, field: "startTime" | "endTime", time: string) => {
//       const index = form
//         .getValues("days")
//         .findIndex((item) => item.day === day);
//       if (index !== -1) {
//         // Store time directly in 12-hour format (no conversion needed)
//         form.setValue(`days.${index}.${field}`, time, {
//           shouldValidate: true,
//         });
//         form.trigger(`days.${index}.startTime`);
//         form.trigger(`days.${index}.endTime`);
//       }
//     },
//     [form]
//   );

//   const onRemove = useCallback(
//     (day: string) => {
//       const index = form
//         .getValues("days")
//         .findIndex((item) => item.day === day);
//       if (index !== -1) {
//         form.setValue(`days.${index}.isAvailable`, false);
//         form.setValue(`days.${index}.startTime`, "09:00 AM");
//         form.setValue(`days.${index}.endTime`, "05:00 PM");
//       }
//     },
//     [form]
//   );

//   // Filter timezones based on search
//   const filteredTimezones = TIMEZONE_OPTIONS.filter(tz => 
//     tz.label.toLowerCase().includes(searchValue.toLowerCase()) ||
//     tz.value.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   // Group filtered timezones
//   const groupedTimezones = filteredTimezones.reduce((acc, timezone) => {
//     if (!acc[timezone.group]) {
//       acc[timezone.group] = [];
//     }
//     acc[timezone.group].push(timezone);
//     return acc;
//   }, {} as Record<string, typeof TIMEZONE_OPTIONS>);

//   const selectedTimezoneInfo = TIMEZONE_OPTIONS.find(tz => tz.value === form.watch("timezone"));

//   return (
//     <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Timezone Selector */}
//           <div className="p-8 pb-4">
//             <FormField
//               name="timezone"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                         <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                         Select Your Timezone
//                       </Label>
//                     </div>
                    
//                     <FormControl>
//                       <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             className={cn(
//                               "justify-between w-full h-14 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700",
//                               "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200",
//                               "bg-white dark:bg-gray-800",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             <div className="flex items-center gap-3 text-left flex-1">
//                               {selectedTimezoneInfo ? (
//                                 <>
//                                   <span className="text-xl">{selectedTimezoneInfo.country}</span>
//                                   <div className="flex flex-col">
//                                     <span className="font-semibold text-gray-800 dark:text-gray-200">
//                                       {selectedTimezoneInfo.label}
//                                     </span>
//                                     <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
//                                       {selectedTimezoneInfo.value}
//                                     </span>
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>
//                                   <Globe className="h-5 w-5 text-gray-400" />
//                                   <span className="font-medium text-gray-600 dark:text-gray-400">
//                                     Select your timezone...
//                                   </span>
//                                 </>
//                               )}
//                             </div>
//                             <div className="flex items-center gap-2">
//                               {selectedTimezoneInfo && (
//                                 <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs font-mono text-green-700 dark:text-green-400">
//                                   {getCurrentTimeInTimezone(selectedTimezoneInfo.value)}
//                                 </div>
//                               )}
//                               <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
//                             </div>
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-[600px] p-0" align="start">
//                           <CustomCommand>
//                             <CustomCommandInput 
//                               placeholder="Search timezones by city or country..." 
//                               value={searchValue}
//                               onValueChange={setSearchValue}
//                             />
//                             <CustomCommandList>
//                               {Object.keys(groupedTimezones).length === 0 ? (
//                                 <CustomCommandEmpty>
//                                   No timezone found matching "{searchValue}"
//                                 </CustomCommandEmpty>
//                               ) : (
//                                 Object.entries(groupedTimezones).map(([groupName, timezones]) => (
//                                   <CustomCommandGroup key={groupName} heading={groupName}>
//                                     {timezones.map((timezone) => (
//                                       <CustomCommandItem
//                                         key={timezone.value}
//                                         onSelect={() => {
//                                           form.setValue("timezone", timezone.value);
//                                           setSelectedTimezone(timezone.value);
//                                           setSearchValue("");
//                                           setIsPopoverOpen(false);
//                                         }}
//                                         isSelected={timezone.value === field.value}
//                                         timezone={timezone.value}
//                                         country={timezone.country}
//                                       >
//                                         {timezone.label}
//                                       </CustomCommandItem>
//                                     ))}
//                                   </CustomCommandGroup>
//                                 ))
//                               )}
//                             </CustomCommandList>
//                           </CustomCommand>
//                         </PopoverContent>
//                       </Popover>
//                     </FormControl>
//                     <FormMessage className="text-red-500 font-medium" />
                    
//                     {/* Timezone Info */}
//                     {selectedTimezoneInfo && (
//                       <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-3 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
//                         <div className="flex items-center justify-between text-sm">
//                           <span className="text-blue-700 dark:text-blue-300 font-medium">
//                             Current Time in Your Selected Zone
//                           </span>
//                           <div className="flex items-center gap-2">
//                             <span className="font-mono font-bold text-blue-800 dark:text-blue-200">
//                               {getCurrentTimeInTimezone(selectedTimezoneInfo.value)}
//                             </span>
//                             <span className="text-xs text-blue-600 dark:text-blue-400">
//                               {new Date().toLocaleDateString('en-US', { 
//                                 timeZone: selectedTimezoneInfo.value,
//                                 weekday: 'short',
//                                 month: 'short',
//                                 day: 'numeric'
//                               })}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Time Gap Input */}
//           <div className="px-8">
//             <FormField
//               name="timeGap"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-lg border border-purple-200/30 dark:border-purple-700/30">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                           <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <div>
//                           <Label className="text-base font-semibold text-gray-800 dark:text-gray-200">
//                             Time Gap Between Appointments
//                           </Label>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">
//                             Buffer time to prepare for your next meeting
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative">
//                         <FormControl>
//                           <div className="flex items-center gap-2">
//                             <Input
//                               {...field}
//                               type="number"
//                               className="w-[80px] h-10 text-center font-semibold rounded-lg border border-purple-200 dark:border-purple-600 focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800"
//                               value={field.value || ""}
//                               min="1"
//                               onChange={(e) => {
//                                 const value = e.target.value.trim();
//                                 if (value === "") {
//                                   field.onChange(null);
//                                 } else {
//                                   const parsedValue = parseInt(value, 10);
//                                   if (!isNaN(parsedValue) && parsedValue > 0) {
//                                     field.onChange(parsedValue);
//                                   }
//                                 }
//                               }}
//                             />
//                             <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                               minutes
//                             </span>
//                           </div>
//                         </FormControl>
//                         <FormMessage className="absolute top-full left-0 mt-1 whitespace-nowrap text-red-500 text-xs" />
//                       </div>
//                     </div>
                    
//                     {/* Quick Select Options */}
//                     <div className="mt-3 flex gap-1 flex-wrap">
//                       {[15, 30, 45, 60, 120].map((minutes) => (
//                         <button
//                           key={minutes}
//                           type="button"
//                           onClick={() => form.setValue("timeGap", minutes)}
//                           className={cn(
//                             "px-3 py-1 rounded text-xs font-medium transition-all duration-200",
//                             field.value === minutes
//                               ? "bg-purple-500 text-white shadow-sm"
//                               : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
//                           )}
//                         >
//                           {minutes}m
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Days Availability */}
//           <div className="px-8">
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                   <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                     Weekly Schedule
//                   </h3>
//                   <p className="text-xs text-gray-600 dark:text-gray-400">
//                     Set your availability for each day of the week in your selected timezone
//                   </p>
//                 </div>
//               </div>
              
//               <div className="bg-gradient-to-br from-green-50/30 to-blue-50/30 dark:from-green-900/5 dark:to-blue-900/5 p-4 rounded-lg border border-gray-200/40 dark:border-gray-700/40">
//                 <div className="space-y-2">
//                   {form.watch("days").map((day, index) => (
//                     <div key={day.day} className="transform transition-all duration-200 hover:scale-[1.01]">
//                       <DayAvailability
//                         day={day.day}
//                         startTime={day.startTime}
//                         endTime={day.endTime}
//                         isAvailable={day.isAvailable}
//                         index={index}
//                         form={form}
//                         dayMapping={dayMapping}
//                         onRemove={onRemove}
//                         onTimeSelect={handleTimeSelect}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="p-8 pt-6">
//             <Button 
//               disabled={isPending} 
//               type="submit" 
//               className={cn(
//                 "w-full h-12 text-base font-semibold rounded-lg transition-all duration-300",
//                 "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700",
//                 "shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]",
//                 "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               )}
//             >
//               {isPending ? (
//                 <div className="flex items-center gap-3">
//                   <Loader color="white" />
//                   <span>Saving Changes...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-3">
//                   <Sparkles className="h-5 w-5" />
//                   <span>Save Availability Settings</span>
//                 </div>
//               )}
//             </Button>
            
//             {/* Additional Info */}
//             <div className="mt-3 text-center">
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Your schedule will be saved in your selected timezone ({form.watch("timezone")})
//               </p>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default WeeklyHoursRow;




import { z } from "zod";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { dayMapping } from "@/lib/availability";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import DayAvailability from "./day-availability";
import { DayAvailabilityType } from "@/types/api.type";
import { updateUserAvailabilityMutationFn } from "@/lib/api";
import { Loader } from "@/components/loader";
import { Check, ChevronsUpDown, Globe, Clock, Sparkles, Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Types for API response
interface TimezoneApiResponse {
  status: string;
  message: string;
  zones: TimezoneZone[];
}

interface TimezoneZone {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
}

interface TimezoneOption {
  value: string;
  label: string;
  group: string;
  country: string;
  countryCode: string;
  gmtOffset: number;
}

// Helper function to get country flag emoji from country code
const getCountryFlag = (countryCode: string): string => {
  const flagMap: { [key: string]: string } = {
    'US': '🇺🇸', 'CA': '🇨🇦', 'MX': '🇲🇽', 'BR': '🇧🇷', 'AR': '🇦🇷', 'PE': '🇵🇪',
    'CL': '🇨🇱', 'CO': '🇨🇴', 'VE': '🇻🇪', 'GB': '🇬🇧', 'FR': '🇫🇷', 'DE': '🇩🇪',
    'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'BE': '🇧🇪', 'AT': '🇦🇹', 'CH': '🇨🇭',
    'SE': '🇸🇪', 'DK': '🇩🇰', 'NO': '🇳🇴', 'FI': '🇫🇮', 'PL': '🇵🇱', 'CZ': '🇨🇿',
    'HU': '🇭🇺', 'RO': '🇷🇴', 'GR': '🇬🇷', 'TR': '🇹🇷', 'RU': '🇷🇺', 'UA': '🇺🇦',
    'IE': '🇮🇪', 'PT': '🇵🇹', 'JP': '🇯🇵', 'KR': '🇰🇷', 'CN': '🇨🇳', 'HK': '🇭🇰',
    'SG': '🇸🇬', 'TH': '🇹🇭', 'ID': '🇮🇩', 'PH': '🇵🇭', 'MY': '🇲🇾', 'VN': '🇻🇳',
    'IN': '🇮🇳', 'BD': '🇧🇩', 'PK': '🇵🇰', 'AE': '🇦🇪', 'SA': '🇸🇦', 'KW': '🇰🇼',
    'QA': '🇶🇦', 'IR': '🇮🇷', 'IQ': '🇮🇶', 'AZ': '🇦🇿', 'AM': '🇦🇲', 'GE': '🇬🇪',
    'KZ': '🇰🇿', 'UZ': '🇺🇿', 'NG': '🇳🇬', 'EG': '🇪🇬', 'ZA': '🇿🇦', 'KE': '🇰🇪',
    'GH': '🇬🇭', 'MA': '🇲🇦', 'DZ': '🇩🇿', 'TN': '🇹🇳', 'ET': '🇪🇹', 'UG': '🇺🇬',
    'TZ': '🇹🇿', 'AU': '🇦🇺', 'NZ': '🇳🇿', 'FJ': '🇫🇯', 'GU': '🇬🇺', 'PF': '🇵🇫'
  };
  return flagMap[countryCode] || '🌍';
};

// Helper function to determine timezone group based on zone name
const getTimezoneGroup = (zoneName: string): string => {
  if (zoneName.startsWith('America/')) {
    if (zoneName.includes('Argentina') || zoneName.includes('Sao_Paulo') || 
        zoneName.includes('Santiago') || zoneName.includes('Lima') || 
        zoneName.includes('Bogota') || zoneName.includes('Caracas')) {
      return 'SOUTH_AMERICA';
    }
    return 'NORTH_AMERICA';
  }
  if (zoneName.startsWith('Europe/')) return 'EUROPE';
  if (zoneName.startsWith('Asia/')) return 'ASIA';
  if (zoneName.startsWith('Africa/')) return 'AFRICA';
  if (zoneName.startsWith('Australia/') || zoneName.startsWith('Pacific/')) return 'AUSTRALIA_PACIFIC';
  if (zoneName === 'UTC') return 'UTC';
  return 'OTHER';
};

// Helper function to format timezone display name
const formatTimezoneLabel = (zone: TimezoneZone): string => {
  const city = zone.zoneName.split('/').pop()?.replace(/_/g, ' ');
  const offsetHours = Math.floor(Math.abs(zone.gmtOffset) / 3600);
  const offsetMinutes = Math.floor((Math.abs(zone.gmtOffset) % 3600) / 60);
  const offsetSign = zone.gmtOffset >= 0 ? '+' : '-';
  const offsetString = offsetMinutes > 0 
    ? `UTC${offsetSign}${offsetHours}:${offsetMinutes.toString().padStart(2, '0')}`
    : `UTC${offsetSign}${offsetHours}`;
  
  return `${city} (${offsetString})`;
};

// API function to fetch timezones
const fetchTimezones = async (): Promise<TimezoneOption[]> => {
  const response = await fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=1Q8FTQ9WLZIV&format=json');
  if (!response.ok) {
    throw new Error('Failed to fetch timezones');
  }
  
  const data: TimezoneApiResponse = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error(data.message || 'API returned error status');
  }

  // Convert API zones to our format and sort by popular zones first
  const popularZones = [
    'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'America/Denver',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
    'Asia/Kolkata', 'Australia/Sydney', 'UTC'
  ];

  return data.zones
    .map((zone): TimezoneOption => ({
      value: zone.zoneName,
      label: formatTimezoneLabel(zone),
      group: getTimezoneGroup(zone.zoneName),
      country: getCountryFlag(zone.countryCode),
      countryCode: zone.countryCode,
      gmtOffset: zone.gmtOffset
    }))
    .sort((a, b) => {
      // Prioritize popular zones
      const aPopular = popularZones.indexOf(a.value);
      const bPopular = popularZones.indexOf(b.value);
      
      if (aPopular !== -1 && bPopular !== -1) return aPopular - bPopular;
      if (aPopular !== -1) return -1;
      if (bPopular !== -1) return 1;
      
      // Then sort by group and label
      if (a.group !== b.group) return a.group.localeCompare(b.group);
      return a.label.localeCompare(b.label);
    });
};

// Helper function to get current time in a timezone
const getCurrentTimeInTimezone = (timezone: string): string => {
  try {
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }).format(now);
  } catch (error) {
    return 'N/A';
  }
};

// Helper function to detect user timezone - only used as fallback
const detectUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
};

// Enhanced Custom Command Components
const CustomCommand = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "flex flex-col bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-900/90", 
    "text-popover-foreground rounded-xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl", 
    "backdrop-blur-sm",
    className
  )}>
    {children}
  </div>
);

const CustomCommandInput = ({ placeholder, value, onValueChange }: { 
  placeholder: string; 
  value?: string; 
  onValueChange?: (value: string) => void 
}) => (
  <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
    <div className="relative">
      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-transparent outline-none placeholder:text-muted-foreground text-sm font-medium focus:placeholder:opacity-50 transition-all rounded-lg border border-transparent focus:border-blue-200 dark:focus:border-blue-700"
      />
    </div>
  </div>
);

const CustomCommandList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("overflow-y-auto overflow-x-hidden max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600", className)}>
    {children}
  </div>
);

const CustomCommandEmpty = ({ children }: { children: React.ReactNode }) => (
  <div className="py-12 text-center">
    <Globe className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
    <div className="text-sm text-muted-foreground font-medium">{children}</div>
  </div>
);

const CustomCommandGroup = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
  <div className="overflow-hidden">
    <div className="py-3 px-6 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gradient-to-r from-gray-100/70 to-gray-50/70 dark:from-gray-800/50 dark:to-gray-700/50 border-b border-gray-100 dark:border-gray-700/30">
      {heading.replace('_', ' & ')}
    </div>
    <div className="p-2 space-y-1">
      {children}
    </div>
  </div>
);

const CustomCommandItem = ({ 
  children, 
  onSelect, 
  isSelected,
  timezone,
  country
}: { 
  children: React.ReactNode; 
  onSelect: () => void; 
  isSelected: boolean;
  timezone: string;
  country: string;
}) => {
  const currentTime = getCurrentTimeInTimezone(timezone);
  
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex items-center justify-between cursor-pointer select-none rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 group",
        isSelected 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-[1.02]" 
          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:shadow-md hover:scale-[1.01]"
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{country}</span>
          <Check className={cn("h-4 w-4 transition-all", isSelected ? "opacity-100 scale-110" : "opacity-0 scale-95")} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{children}</span>
          <span className={cn("text-xs font-mono", isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400")}>
            {timezone}
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className={cn(
          "text-sm font-semibold px-2 py-1 rounded-md transition-all",
          isSelected 
            ? "bg-white/20 text-white" 
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-white/80 group-hover:shadow-sm"
        )}>
          {currentTime}
        </div>
      </div>
    </div>
  );
};

const WeeklyHoursRow = ({
  days,
  timeGap,
  userTimezone: existingUserTimezone,
}: {
  days: DayAvailabilityType[];
  timeGap: number;
  userTimezone?: string;
}) => {
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    existingUserTimezone || detectUserTimezone()
  );
  const [searchValue, setSearchValue] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  // Fetch timezones from API
  const { 
    data: timezoneOptions = [], 
    isLoading: isLoadingTimezones, 
    error: timezoneError 
  } = useQuery({
    queryKey: ['timezones'],
    queryFn: fetchTimezones,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    retry: 3,
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAvailabilityMutationFn,
  });

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeGapSchema = z
    .number()
    .int({ message: "Time gap must be an integer" })
    .min(1, { message: "Time gap must be at least 1 minute" })
    .refine((value) => [15, 30, 45, 60, 120].includes(value), {
      message: "Time gap must be 15, 30, 45, 60, or 120 minutes",
    });

  const availabilitySchema = z
    .object({
      timeGap: timeGapSchema,
      timezone: z.string().min(1, "Please select a timezone"),
      days: z.array(
        z.object({
          day: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          isAvailable: z.boolean(),
        })
      ),
    })
    .superRefine((data, ctx) => {
      data.days.forEach((item, index) => {
        if (item.isAvailable && item.startTime && item.endTime) {
          // Parse times to compare (assuming 12-hour format like "9:00 AM")
          const parseTime12 = (timeStr: string) => {
            const [time, period] = timeStr.split(' ');
            const [hours, minutes] = time.split(':').map(Number);
            let hour24 = hours;
            if (period === 'PM' && hours !== 12) hour24 += 12;
            if (period === 'AM' && hours === 12) hour24 = 0;
            return hour24 * 60 + minutes;
          };
          
          const startMinutes = parseTime12(item.startTime);
          const endMinutes = parseTime12(item.endTime);
          
          if (endMinutes <= startMinutes) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "End time must be greater than start time",
              path: ["days", index, "startTime"],
            });
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "End time must be greater than start time",
              path: ["days", index, "endTime"],
            });
          }
        }
      });
    });

  type WeeklyHoursFormData = z.infer<typeof availabilitySchema>;

  const form = useForm<WeeklyHoursFormData>({
    resolver: zodResolver(availabilitySchema),
    mode: "onChange",
    defaultValues: {
      timeGap: timeGap || 30,
      timezone: selectedTimezone,
      days: days || [],
    },
  });

  // Auto-populate form when component loads and when props change
  useEffect(() => {
    if (days && days.length > 0) {
      form.setValue("days", days);
    }
    if (timeGap) {
      form.setValue("timeGap", timeGap);
    }
    if (existingUserTimezone) {
      form.setValue("timezone", existingUserTimezone);
      setSelectedTimezone(existingUserTimezone);
    }
    
    form.trigger();
  }, [days, form, timeGap, existingUserTimezone]);

  const onSubmit = (values: WeeklyHoursFormData) => {
    if (isPending) return;
    
    // Send the data as-is (all times are already in 12-hour format)
    const dataToSend = {
      timeGap: values.timeGap,
      timezone: values.timezone,
      days: values.days, // Times are already in 12-hour format
    };
    console.log("This is the information to be saved along with the time zone", dataToSend);
    mutate(dataToSend, {
      onSuccess: (response) => {
        toast.success(response.message || "Availability updated successfully");
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Failed to update availability");
      },
    });
  };

  const handleTimeSelect = useCallback(
    (day: string, field: "startTime" | "endTime", time: string) => {
      const index = form
        .getValues("days")
        .findIndex((item) => item.day === day);
      if (index !== -1) {
        // Store time directly in 12-hour format (no conversion needed)
        form.setValue(`days.${index}.${field}`, time, {
          shouldValidate: true,
        });
        form.trigger(`days.${index}.startTime`);
        form.trigger(`days.${index}.endTime`);
      }
    },
    [form]
  );

  const onRemove = useCallback(
    (day: string) => {
      const index = form
        .getValues("days")
        .findIndex((item) => item.day === day);
      if (index !== -1) {
        form.setValue(`days.${index}.isAvailable`, false);
        form.setValue(`days.${index}.startTime`, "09:00 AM");
        form.setValue(`days.${index}.endTime`, "05:00 PM");
      }
    },
    [form]
  );

  // Filter timezones based on search
  const filteredTimezones = timezoneOptions.filter(tz => 
    tz.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    tz.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Group filtered timezones
  const groupedTimezones = filteredTimezones.reduce((acc, timezone) => {
    if (!acc[timezone.group]) {
      acc[timezone.group] = [];
    }
    acc[timezone.group].push(timezone);
    return acc;
  }, {} as Record<string, typeof timezoneOptions>);

  const selectedTimezoneInfo = timezoneOptions.find(tz => tz.value === form.watch("timezone"));

  // Handle timezone loading and error states
  if (isLoadingTimezones) {
    return (
      <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden p-8">
        <div className="flex items-center justify-center space-y-4">
          <div className="flex items-center gap-3">
            <Loader />
            <span className="text-gray-600 dark:text-gray-400">Loading timezones...</span>
          </div>
        </div>
      </div>
    );
  }

  if (timezoneError) {
    return (
      <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden p-8">
        <div className="text-center space-y-4">
          <div className="text-red-600 dark:text-red-400">
            Failed to load timezones. Please check your internet connection.
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="mx-auto"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Timezone Selector */}
          <div className="p-8 pb-4">
            <FormField
              name="timezone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Select Your Timezone
                      </Label>
                    </div>
                    
                    <FormControl>
                      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-full h-14 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700",
                              "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200",
                              "bg-white dark:bg-gray-800",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3 text-left flex-1">
                              {selectedTimezoneInfo ? (
                                <>
                                  <span className="text-xl">{selectedTimezoneInfo.country}</span>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                      {selectedTimezoneInfo.label}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                      {selectedTimezoneInfo.value}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Globe className="h-5 w-5 text-gray-400" />
                                  <span className="font-medium text-gray-600 dark:text-gray-400">
                                    Select your timezone...
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {selectedTimezoneInfo && (
                                <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs font-mono text-green-700 dark:text-green-400">
                                  {getCurrentTimeInTimezone(selectedTimezoneInfo.value)}
                                </div>
                              )}
                              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[600px] p-0" align="start">
                          <CustomCommand>
                            <CustomCommandInput 
                              placeholder="Search timezones by city or country..." 
                              value={searchValue}
                              onValueChange={setSearchValue}
                            />
                            <CustomCommandList>
                              {Object.keys(groupedTimezones).length === 0 ? (
                                <CustomCommandEmpty>
                                  No timezone found matching "{searchValue}"
                                </CustomCommandEmpty>
                              ) : (
                                Object.entries(groupedTimezones).map(([groupName, timezones]) => (
                                  <CustomCommandGroup key={groupName} heading={groupName}>
                                    {timezones.map((timezone) => (
                                      <CustomCommandItem
                                        key={timezone.value}
                                        onSelect={() => {
                                          form.setValue("timezone", timezone.value);
                                          setSelectedTimezone(timezone.value);
                                          setSearchValue("");
                                          setIsPopoverOpen(false);
                                        }}
                                        isSelected={timezone.value === field.value}
                                        timezone={timezone.value}
                                        country={timezone.country}
                                      >
                                        {timezone.label}
                                      </CustomCommandItem>
                                    ))}
                                  </CustomCommandGroup>
                                ))
                              )}
                            </CustomCommandList>
                          </CustomCommand>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium" />
                    
                    {/* Timezone Info */}
                    {selectedTimezoneInfo && (
                      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-3 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-700 dark:text-blue-300 font-medium">
                            Current Time in Your Selected Zone
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-blue-800 dark:text-blue-200">
                              {getCurrentTimeInTimezone(selectedTimezoneInfo.value)}
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {new Date().toLocaleDateString('en-US', { 
                                timeZone: selectedTimezoneInfo.value,
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Time Gap Input */}
          <div className="px-8">
            <FormField
              name="timeGap"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-lg border border-purple-200/30 dark:border-purple-700/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <Label className="text-base font-semibold text-gray-800 dark:text-gray-200">
                            Time Gap Between Appointments
                          </Label>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Buffer time to prepare for your next meeting
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              {...field}
                              type="number"
                              className="w-[80px] h-10 text-center font-semibold rounded-lg border border-purple-200 dark:border-purple-600 focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800"
                              value={field.value || ""}
                              min="1"
                              onChange={(e) => {
                                const value = e.target.value.trim();
                                if (value === "") {
                                  field.onChange(null);
                                } else {
                                  const parsedValue = parseInt(value, 10);
                                  if (!isNaN(parsedValue) && parsedValue > 0) {
                                    field.onChange(parsedValue);
                                  }
                                }
                              }}
                            />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              minutes
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage className="absolute top-full left-0 mt-1 whitespace-nowrap text-red-500 text-xs" />
                      </div>
                    </div>
                    
                    {/* Quick Select Options */}
                    <div className="mt-3 flex gap-1 flex-wrap">
                      {[15, 30, 45, 60, 120].map((minutes) => (
                        <button
                          key={minutes}
                          type="button"
                          onClick={() => form.setValue("timeGap", minutes)}
                          className={cn(
                            "px-3 py-1 rounded text-xs font-medium transition-all duration-200",
                            field.value === minutes
                              ? "bg-purple-500 text-white shadow-sm"
                              : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                          )}
                        >
                          {minutes}m
                        </button>
                      ))}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Days Availability */}
          <div className="px-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Weekly Schedule
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Set your availability for each day of the week in your selected timezone
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50/30 to-blue-50/30 dark:from-green-900/5 dark:to-blue-900/5 p-4 rounded-lg border border-gray-200/40 dark:border-gray-700/40">
                <div className="space-y-2">
                  {form.watch("days").map((day, index) => (
                    <div key={day.day} className="transform transition-all duration-200 hover:scale-[1.01]">
                      <DayAvailability
                        day={day.day}
                        startTime={day.startTime}
                        endTime={day.endTime}
                        isAvailable={day.isAvailable}
                        index={index}
                        form={form}
                        dayMapping={dayMapping}
                        onRemove={onRemove}
                        onTimeSelect={handleTimeSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-8 pt-6">
            <Button 
              disabled={isPending} 
              type="submit" 
              className={cn(
                "w-full h-12 text-base font-semibold rounded-lg transition-all duration-300",
                "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700",
                "shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              )}
            >
              {isPending ? (
                <div className="flex items-center gap-3">
                  <Loader color="white" />
                  <span>Saving Changes...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  <span>Save Availability Settings</span>
                </div>
              )}
            </Button>
            
            {/* Additional Info */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your schedule will be saved in your selected timezone ({form.watch("timezone")})
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WeeklyHoursRow;