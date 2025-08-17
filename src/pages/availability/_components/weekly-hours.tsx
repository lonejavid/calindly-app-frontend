

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

// // Timezone options data
// const TIMEZONE_OPTIONS = [
//   // US & Canada
//   { value: 'America/New_York', label: 'Eastern Time - US & Canada', group: 'US/CANADA' },
//   { value: 'America/Chicago', label: 'Central Time - US & Canada', group: 'US/CANADA' },
//   { value: 'America/Denver', label: 'Mountain Time - US & Canada', group: 'US/CANADA' },
//   { value: 'America/Los_Angeles', label: 'Pacific Time - US & Canada', group: 'US/CANADA' },
//   { value: 'America/Anchorage', label: 'Alaska Time', group: 'US/CANADA' },
//   { value: 'Pacific/Honolulu', label: 'Hawaii Time', group: 'US/CANADA' },
//   { value: 'America/Toronto', label: 'Eastern Time - Toronto', group: 'US/CANADA' },
//   { value: 'America/Vancouver', label: 'Pacific Time - Vancouver', group: 'US/CANADA' },
  
//   // Europe
//   { value: 'Europe/London', label: 'Greenwich Mean Time - London', group: 'EUROPE' },
//   { value: 'Europe/Paris', label: 'Central European Time - Paris', group: 'EUROPE' },
//   { value: 'Europe/Berlin', label: 'Central European Time - Berlin', group: 'EUROPE' },
//   { value: 'Europe/Rome', label: 'Central European Time - Rome', group: 'EUROPE' },
//   { value: 'Europe/Madrid', label: 'Central European Time - Madrid', group: 'EUROPE' },
//   { value: 'Europe/Amsterdam', label: 'Central European Time - Amsterdam', group: 'EUROPE' },
  
//   // Asia
//   { value: 'Asia/Tokyo', label: 'Japan Standard Time - Tokyo', group: 'ASIA' },
//   { value: 'Asia/Shanghai', label: 'China Standard Time - Shanghai', group: 'ASIA' },
//   { value: 'Asia/Kolkata', label: 'India Standard Time - Kolkata', group: 'ASIA' },
//   { value: 'Asia/Dubai', label: 'Gulf Standard Time - Dubai', group: 'ASIA' },
//   { value: 'Asia/Singapore', label: 'Singapore Standard Time', group: 'ASIA' },
//   { value: 'Asia/Hong_Kong', label: 'Hong Kong Time', group: 'ASIA' },
  
//   // Australia & Pacific
//   { value: 'Australia/Sydney', label: 'Australian Eastern Time - Sydney', group: 'AUSTRALIA' },
//   { value: 'Australia/Melbourne', label: 'Australian Eastern Time - Melbourne', group: 'AUSTRALIA' },
//   { value: 'Australia/Perth', label: 'Australian Western Time - Perth', group: 'AUSTRALIA' },
//   { value: 'Pacific/Auckland', label: 'New Zealand Standard Time - Auckland', group: 'AUSTRALIA' },
// ];

// // Helper function to detect user timezone
// const detectUserTimezone = (): string => {
//   try {
//     return Intl.DateTimeFormat().resolvedOptions().timeZone;
//   } catch {
//     return 'UTC';
//   }
// };

// // Helper function to convert local time to UTC
// const convertLocalTimeToUTC = (localTime: string, timezone: string): string => {
//   if (!localTime) return localTime;
  
//   try {
//     const [hours, minutes] = localTime.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);
    
//     // Format the time in the specified timezone
//     const timeString = date.toLocaleTimeString('en-US', {
//       timeZone: timezone,
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit'
//     });
    
//     // Create a new date with the timezone-adjusted time
//     const [tzHours, tzMinutes] = timeString.split(':').map(Number);
//     const tzDate = new Date();
//     tzDate.setHours(tzHours, tzMinutes, 0, 0);
    
//     // Get UTC equivalent
//     const utcHours = tzDate.getUTCHours().toString().padStart(2, '0');
//     const utcMinutes = tzDate.getUTCMinutes().toString().padStart(2, '0');
    
//     return `${utcHours}:${utcMinutes}`;
//   } catch (error) {
//     console.error('Error converting time to UTC:', error);
//     return localTime; // fallback to original time if conversion fails
//   }
// };

// // Enhanced Custom Command Components with beautiful styling
// const CustomCommand = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <div className={cn(
//     "flex flex-col bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-900/90", 
//     "text-popover-foreground rounded-xl border border-gray-200/60 dark:border-gray-700/60 shadow-lg", 
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
//   <div className="p-3 border-b border-gray-100 dark:border-gray-700/50">
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => onValueChange?.(e.target.value)}
//       className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm font-medium focus:placeholder:opacity-50 transition-all"
//     />
//   </div>
// );

// const CustomCommandList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <div className={cn("overflow-y-auto overflow-x-hidden max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600", className)}>
//     {children}
//   </div>
// );

// const CustomCommandEmpty = ({ children }: { children: React.ReactNode }) => (
//   <div className="py-8 text-center text-sm text-muted-foreground font-medium">
//     {children}
//   </div>
// );

// const CustomCommandGroup = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
//   <div className="overflow-hidden">
//     <div className="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/30">
//       {heading}
//     </div>
//     <div className="[&>[cmdk-item]]:px-3 [&>[cmdk-item]]:py-2 [&>[cmdk-item]]:text-sm">
//       {children}
//     </div>
//   </div>
// );

// const CustomCommandItem = ({ 
//   children, 
//   onSelect, 
//   isSelected 
// }: { 
//   children: React.ReactNode; 
//   onSelect: () => void; 
//   isSelected: boolean 
// }) => (
//   <div
//     onClick={onSelect}
//     className={cn(
//       "relative flex cursor-pointer select-none items-center rounded-lg mx-2 my-1 px-3 py-2.5 text-sm outline-none transition-all duration-200",
//       isSelected 
//         ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" 
//         : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:shadow-sm"
//     )}
//   >
//     <Check className={cn("mr-3 h-4 w-4 transition-all", isSelected ? "opacity-100 scale-110" : "opacity-0 scale-95")} />
//     <span className="font-medium">{children}</span>
//   </div>
// );

// const WeeklyHoursRow = ({
//   days,
//   timeGap,
// }: {
//   days: DayAvailabilityType[];
//   timeGap: number;
// }) => {
//   const [userTimezone, setUserTimezone] = useState(detectUserTimezone());
//   const [searchValue, setSearchValue] = useState("");
//   const { mutate, isPending } = useMutation({
//     mutationFn: updateUserAvailabilityMutationFn,
//   });

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
//           if (item.endTime <= item.startTime) {
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
//       timeGap: 30,
//       timezone: userTimezone,
//       days: [],
//     },
//   });

//   useEffect(() => {
//     form.setValue("days", days);
//     form.setValue("timeGap", timeGap);
//     form.setValue("timezone", userTimezone);
//     form.trigger("days");
//   }, [days, form, timeGap, userTimezone]);

//   const onSubmit = (values: WeeklyHoursFormData) => {
//     if (isPending) return;
    
//     // Convert all times to UTC before sending to backend
//     const utcValues = {
//       ...values,
//       days: values.days.map(day => ({
//         ...day,
//         startTime: day.isAvailable ? convertLocalTimeToUTC(day.startTime, values.timezone) : day.startTime,
//         endTime: day.isAvailable ? convertLocalTimeToUTC(day.endTime, values.timezone) : day.endTime,
//       })),
//       originalTimezone: values.timezone, // Keep track of original timezone
//     };
    
//     mutate(utcValues, {
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
//         form.setValue(`days.${index}.startTime`, "09:00");
//         form.setValue(`days.${index}.endTime`, "17:00");
//       }
//     },
//     [form]
//   );

//   // Filter timezones based on search
//   const filteredTimezones = TIMEZONE_OPTIONS.filter(tz => 
//     tz.label.toLowerCase().includes(searchValue.toLowerCase()) ||
//     tz.value.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   // Group filtered timezones for the dropdown
//   const groupedTimezones = filteredTimezones.reduce((acc, timezone) => {
//     if (!acc[timezone.group]) {
//       acc[timezone.group] = [];
//     }
//     acc[timezone.group].push(timezone);
//     return acc;
//   }, {} as Record<string, typeof TIMEZONE_OPTIONS>);

//   return (
//     <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden">
//       {/* Header with gradient */}
//       <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
//         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
//         <div className="relative z-10 flex items-center gap-3">
//           <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
//             <Calendar className="h-6 w-6" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold">Weekly Availability</h2>
//             <p className="text-blue-100 text-sm font-medium">Configure your schedule and timezone preferences</p>
//           </div>
//           <Sparkles className="h-5 w-5 ml-auto opacity-80" />
//         </div>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Timezone Selector with enhanced styling */}
//           <div className="p-8 pb-4">
//             <FormField
//               name="timezone"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="space-y-4">
//                     <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
//                       <Globe className="h-5 w-5 text-blue-600" />
//                       Time Zone
//                     </Label>
//                     <FormControl>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             className={cn(
//                               "justify-between min-w-full h-auto p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700",
//                               "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300",
//                               "bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             <div className="flex items-center gap-3 text-left">
//                               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                                 <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                               </div>
//                               <div className="flex flex-col gap-1">
//                                 <span className="font-semibold text-gray-800 dark:text-gray-200">
//                                   {TIMEZONE_OPTIONS.find(
//                                     (tz) => tz.value === field.value
//                                   )?.label || "Select timezone..."}
//                                 </span>
//                                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                                   {field.value ? `UTC ${new Date().toLocaleString('en', {timeZone: field.value, timeZoneName: 'short'}).split(', ')[1]}` : "Choose your local timezone"}
//                                 </span>
//                               </div>
//                             </div>
//                             <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-[450px] p-0" align="start">
//                           <CustomCommand>
//                             <CustomCommandInput 
//                               placeholder="Search timezone..." 
//                               value={searchValue}
//                               onValueChange={setSearchValue}
//                             />
//                             <CustomCommandList>
//                               {Object.keys(groupedTimezones).length === 0 ? (
//                                 <CustomCommandEmpty>No timezone found.</CustomCommandEmpty>
//                               ) : (
//                                 Object.entries(groupedTimezones).map(([groupName, timezones]) => (
//                                   <CustomCommandGroup key={groupName} heading={groupName.replace('_', ' & ')}>
//                                     {timezones.map((timezone) => (
//                                       <CustomCommandItem
//                                         key={timezone.value}
//                                         onSelect={() => {
//                                           form.setValue("timezone", timezone.value);
//                                           setUserTimezone(timezone.value);
//                                           setSearchValue("");
//                                         }}
//                                         isSelected={timezone.value === field.value}
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
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Time Gap Input with enhanced styling */}
//           <div className="px-8">
//             <FormField
//               name="timeGap"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-3 flex-1">
//                         <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                           <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                           Time Gap (minutes)
//                         </Label>
//                       </div>
//                       <div className="relative">
//                         <FormControl>
//                           <Input
//                             {...field}
//                             type="number"
//                             className="w-[120px] h-12 text-center font-semibold text-lg rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 shadow-inner transition-all duration-200"
//                             value={field.value || ""}
//                             min="1"
//                             onChange={(e) => {
//                               const value = e.target.value.trim();
//                               if (value === "") {
//                                 field.onChange(null);
//                               } else {
//                                 const parsedValue = parseInt(value, 10);
//                                 if (!isNaN(parsedValue) && parsedValue > 0) {
//                                   field.onChange(parsedValue);
//                                 }
//                               }
//                             }}
//                           />
//                         </FormControl>
//                         <FormMessage className="absolute top-full left-0 mt-2 whitespace-nowrap text-red-500 font-medium" />
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 ml-12">
//                       Buffer time between appointments (15, 30, 45, 60, or 120 minutes)
//                     </p>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Days Availability with enhanced container */}
//           <div className="px-8">
//             <div className="space-y-3">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                   <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Daily Schedule</h3>
//               </div>
//               <div className="space-y-2">
//                 {form.watch("days").map((day, index) => (
//                   <div key={day.day} className="transform transition-all duration-200 hover:scale-[1.01]">
//                     <DayAvailability
//                       day={day.day}
//                       startTime={day.startTime}
//                       endTime={day.endTime}
//                       isAvailable={day.isAvailable}
//                       index={index}
//                       form={form}
//                       dayMapping={dayMapping}
//                       onRemove={onRemove}
//                       onTimeSelect={handleTimeSelect}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Submit button with enhanced styling */}
//           <div className="p-8 pt-4">
//             <Button 
//               disabled={isPending} 
//               type="submit" 
//               className={cn(
//                 "w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300",
//                 "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700",
//                 "shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
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
//                   <span>Save Changes</span>
//                 </div>
//               )}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default WeeklyHoursRow;







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

// // Helper function to detect user timezone
// const detectUserTimezone = (): string => {
//   try {
//     return Intl.DateTimeFormat().resolvedOptions().timeZone;
//   } catch {
//     return 'UTC';
//   }
// };

// // Helper function to convert local time to UTC
// const convertLocalTimeToUTC = (localTime: string, timezone: string): string => {
//   if (!localTime) return localTime;
  
//   try {
//     const [hours, minutes] = localTime.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);
    
//     const timeString = date.toLocaleTimeString('en-US', {
//       timeZone: timezone,
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit'
//     });
    
//     const [tzHours, tzMinutes] = timeString.split(':').map(Number);
//     const tzDate = new Date();
//     tzDate.setHours(tzHours, tzMinutes, 0, 0);
    
//     const utcHours = tzDate.getUTCHours().toString().padStart(2, '0');
//     const utcMinutes = tzDate.getUTCMinutes().toString().padStart(2, '0');
    
//     return `${utcHours}:${utcMinutes}`;
//   } catch (error) {
//     console.error('Error converting time to UTC:', error);
//     return localTime;
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
// }: {
//   days: DayAvailabilityType[];
//   timeGap: number;
// }) => {
//   const [userTimezone, setUserTimezone] = useState(detectUserTimezone());
//   const [searchValue, setSearchValue] = useState("");
//   const [currentTime, setCurrentTime] = useState(new Date());
  
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
//           if (item.endTime <= item.startTime) {
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
//       timeGap: 30,
//       timezone: userTimezone,
//       days: [],
//     },
//   });

//   useEffect(() => {
//     form.setValue("days", days);
//     form.setValue("timeGap", timeGap);
//     form.setValue("timezone", userTimezone);
//     form.trigger("days");
//   }, [days, form, timeGap, userTimezone]);

//   const onSubmit = (values: WeeklyHoursFormData) => {
//     if (isPending) return;
    
//     // Convert all times to UTC before sending to backend
//     const utcValues = {
//       ...values,
//       days: values.days.map(day => ({
//         ...day,
//         startTime: day.isAvailable ? convertLocalTimeToUTC(day.startTime, values.timezone) : day.startTime,
//         endTime: day.isAvailable ? convertLocalTimeToUTC(day.endTime, values.timezone) : day.endTime,
//       })),
//       originalTimezone: values.timezone,
//     };
    
//     mutate(utcValues, {
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
//         form.setValue(`days.${index}.startTime`, "09:00");
//         form.setValue(`days.${index}.endTime`, "17:00");
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

//   const selectedTimezone = TIMEZONE_OPTIONS.find(tz => tz.value === form.watch("timezone"));

//   return (
//     <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden">
//       {/* Enhanced Header */}
//       <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
//         <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
//         <div className="relative z-10 flex items-start justify-between">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
//               <Calendar className="h-8 w-8" />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold mb-2">Weekly Availability</h2>
//               <p className="text-blue-100 text-base font-medium">Configure your schedule and timezone preferences</p>
//               {selectedTimezone && (
//                 <div className="mt-3 flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
//                   <span className="text-lg">{selectedTimezone.country}</span>
//                   <span className="font-mono">{getCurrentTimeInTimezone(selectedTimezone.value)}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//           <Sparkles className="h-6 w-6 opacity-80 animate-pulse" />
//         </div>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Enhanced Timezone Selector */}
//           <div className="p-8 pb-4">
//             <FormField
//               name="timezone"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                         <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <Label className="text-xl font-bold text-gray-800 dark:text-gray-200">
//                         Select Your Timezone
//                       </Label>
//                     </div>
                    
//                     <FormControl>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             className={cn(
//                               "justify-between min-w-full h-auto p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700",
//                               "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300",
//                               "bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             <div className="flex items-center gap-4 text-left flex-1">
//                               {selectedTimezone ? (
//                                 <>
//                                   <div className="flex items-center gap-3">
//                                     <span className="text-2xl">{selectedTimezone.country}</span>
//                                     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                                       <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                                     </div>
//                                   </div>
//                                   <div className="flex flex-col gap-1 flex-1">
//                                     <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
//                                       {selectedTimezone.label}
//                                     </span>
//                                     <div className="flex items-center gap-3">
//                                       <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
//                                         {selectedTimezone.value}
//                                       </span>
//                                       <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
//                                         <span className="text-sm font-bold text-green-700 dark:text-green-400 font-mono">
//                                           {getCurrentTimeInTimezone(selectedTimezone.value)}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>
//                                   <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                                     <Globe className="h-5 w-5 text-gray-500" />
//                                   </div>
//                                   <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-gray-600 dark:text-gray-400">
//                                       Select your timezone...
//                                     </span>
//                                     <span className="text-xs text-gray-500 dark:text-gray-500">
//                                       Choose from {TIMEZONE_OPTIONS.length} worldwide locations
//                                     </span>
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                             <ChevronsUpDown className="ml-2 h-6 w-6 shrink-0 opacity-50" />
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
//                                           setUserTimezone(timezone.value);
//                                           setSearchValue("");
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
//                     {selectedTimezone && (
//                       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
//                               <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                             </div>
//                             <div>
//                               <p className="font-semibold text-blue-800 dark:text-blue-200">
//                                 Current Time in Your Zone
//                               </p>
//                               <p className="text-sm text-blue-600 dark:text-blue-400">
//                                 All times will be displayed in this timezone
//                               </p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 font-mono">
//                               {getCurrentTimeInTimezone(selectedTimezone.value)}
//                             </div>
//                             <div className="text-xs text-blue-600 dark:text-blue-400">
//                               {new Date().toLocaleDateString('en-US', { 
//                                 timeZone: selectedTimezone.value,
//                                 weekday: 'long',
//                                 month: 'short',
//                                 day: 'numeric'
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Enhanced Time Gap Input */}
//           <div className="px-8">
//             <FormField
//               name="timeGap"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200/60 dark:border-purple-700/60 shadow-sm">
//                     <div className="flex items-center gap-6">
//                       <div className="flex items-center gap-4 flex-1">
//                         <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
//                           <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <div>
//                           <Label className="text-xl font-bold text-gray-800 dark:text-gray-200">
//                             Time Gap Between Appointments
//                           </Label>
//                           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
//                               className="w-[140px] h-14 text-center font-bold text-xl rounded-xl border-2 border-purple-200 dark:border-purple-600 focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 shadow-inner transition-all duration-200"
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
//                             <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
//                               minutes
//                             </span>
//                           </div>
//                         </FormControl>
//                         <FormMessage className="absolute top-full left-0 mt-2 whitespace-nowrap text-red-500 font-medium" />
//                       </div>
//                     </div>
                    
//                     {/* Quick Select Options */}
//                     <div className="mt-4 flex gap-2 flex-wrap">
//                       {[15, 30, 45, 60, 120].map((minutes) => (
//                         <button
//                           key={minutes}
//                           type="button"
//                           onClick={() => form.setValue("timeGap", minutes)}
//                           className={cn(
//                             "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
//                             field.value === minutes
//                               ? "bg-purple-500 text-white shadow-md scale-105"
//                               : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600"
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

//           {/* Enhanced Days Availability */}
//           <div className="px-8">
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
//                   <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
//                     Weekly Schedule
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Set your availability for each day of the week
//                   </p>
//                 </div>
//               </div>
              
//               <div className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10 p-6 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
//                 <div className="space-y-3">
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

//           {/* Enhanced Submit Button */}
//           <div className="p-8 pt-4">
//             <Button 
//               disabled={isPending} 
//               type="submit" 
//               className={cn(
//                 "w-full h-16 text-xl font-bold rounded-xl transition-all duration-300",
//                 "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700",
//                 "shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
//                 "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               )}
//             >
//               {isPending ? (
//                 <div className="flex items-center gap-4">
//                   <Loader color="white" />
//                   <span>Saving Your Schedule...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-4">
//                   <Sparkles className="h-6 w-6" />
//                   <span>Save Availability Settings</span>
//                 </div>
//               )}
//             </Button>
            
//             {/* Additional Info */}
//             <div className="mt-4 text-center">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Your schedule will be converted to UTC and saved securely
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
import { useMutation } from "@tanstack/react-query";
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

// Comprehensive timezone options with all major world timezones
const TIMEZONE_OPTIONS = [
  // North America
  { value: 'America/New_York', label: 'Eastern Time (New York)', group: 'NORTH_AMERICA', country: '🇺🇸' },
  { value: 'America/Chicago', label: 'Central Time (Chicago)', group: 'NORTH_AMERICA', country: '🇺🇸' },
  { value: 'America/Denver', label: 'Mountain Time (Denver)', group: 'NORTH_AMERICA', country: '🇺🇸' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles)', group: 'NORTH_AMERICA', country: '🇺🇸' },
  { value: 'America/Anchorage', label: 'Alaska Time (Anchorage)', group: 'NORTH_AMERICA', country: '🇺🇸' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (Honolulu)', group: 'NORTH_AMERICA', country: '🇺🇸' },
  { value: 'America/Toronto', label: 'Eastern Time (Toronto)', group: 'NORTH_AMERICA', country: '🇨🇦' },
  { value: 'America/Vancouver', label: 'Pacific Time (Vancouver)', group: 'NORTH_AMERICA', country: '🇨🇦' },
  { value: 'America/Montreal', label: 'Eastern Time (Montreal)', group: 'NORTH_AMERICA', country: '🇨🇦' },
  { value: 'America/Mexico_City', label: 'Central Time (Mexico City)', group: 'NORTH_AMERICA', country: '🇲🇽' },
  { value: 'America/Tijuana', label: 'Pacific Time (Tijuana)', group: 'NORTH_AMERICA', country: '🇲🇽' },
  
  // South America
  { value: 'America/Sao_Paulo', label: 'Brasília Time (São Paulo)', group: 'SOUTH_AMERICA', country: '🇧🇷' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (Buenos Aires)', group: 'SOUTH_AMERICA', country: '🇦🇷' },
  { value: 'America/Lima', label: 'Peru Time (Lima)', group: 'SOUTH_AMERICA', country: '🇵🇪' },
  { value: 'America/Santiago', label: 'Chile Time (Santiago)', group: 'SOUTH_AMERICA', country: '🇨🇱' },
  { value: 'America/Bogota', label: 'Colombia Time (Bogotá)', group: 'SOUTH_AMERICA', country: '🇨🇴' },
  { value: 'America/Caracas', label: 'Venezuela Time (Caracas)', group: 'SOUTH_AMERICA', country: '🇻🇪' },
  
  // Europe
  { value: 'Europe/London', label: 'Greenwich Mean Time (London)', group: 'EUROPE', country: '🇬🇧' },
  { value: 'Europe/Paris', label: 'Central European Time (Paris)', group: 'EUROPE', country: '🇫🇷' },
  { value: 'Europe/Berlin', label: 'Central European Time (Berlin)', group: 'EUROPE', country: '🇩🇪' },
  { value: 'Europe/Rome', label: 'Central European Time (Rome)', group: 'EUROPE', country: '🇮🇹' },
  { value: 'Europe/Madrid', label: 'Central European Time (Madrid)', group: 'EUROPE', country: '🇪🇸' },
  { value: 'Europe/Amsterdam', label: 'Central European Time (Amsterdam)', group: 'EUROPE', country: '🇳🇱' },
  { value: 'Europe/Brussels', label: 'Central European Time (Brussels)', group: 'EUROPE', country: '🇧🇪' },
  { value: 'Europe/Vienna', label: 'Central European Time (Vienna)', group: 'EUROPE', country: '🇦🇹' },
  { value: 'Europe/Zurich', label: 'Central European Time (Zurich)', group: 'EUROPE', country: '🇨🇭' },
  { value: 'Europe/Stockholm', label: 'Central European Time (Stockholm)', group: 'EUROPE', country: '🇸🇪' },
  { value: 'Europe/Copenhagen', label: 'Central European Time (Copenhagen)', group: 'EUROPE', country: '🇩🇰' },
  { value: 'Europe/Oslo', label: 'Central European Time (Oslo)', group: 'EUROPE', country: '🇳🇴' },
  { value: 'Europe/Helsinki', label: 'Eastern European Time (Helsinki)', group: 'EUROPE', country: '🇫🇮' },
  { value: 'Europe/Warsaw', label: 'Central European Time (Warsaw)', group: 'EUROPE', country: '🇵🇱' },
  { value: 'Europe/Prague', label: 'Central European Time (Prague)', group: 'EUROPE', country: '🇨🇿' },
  { value: 'Europe/Budapest', label: 'Central European Time (Budapest)', group: 'EUROPE', country: '🇭🇺' },
  { value: 'Europe/Bucharest', label: 'Eastern European Time (Bucharest)', group: 'EUROPE', country: '🇷🇴' },
  { value: 'Europe/Athens', label: 'Eastern European Time (Athens)', group: 'EUROPE', country: '🇬🇷' },
  { value: 'Europe/Istanbul', label: 'Turkey Time (Istanbul)', group: 'EUROPE', country: '🇹🇷' },
  { value: 'Europe/Moscow', label: 'Moscow Standard Time', group: 'EUROPE', country: '🇷🇺' },
  { value: 'Europe/Kiev', label: 'Eastern European Time (Kyiv)', group: 'EUROPE', country: '🇺🇦' },
  { value: 'Europe/Dublin', label: 'Greenwich Mean Time (Dublin)', group: 'EUROPE', country: '🇮🇪' },
  { value: 'Europe/Lisbon', label: 'Western European Time (Lisbon)', group: 'EUROPE', country: '🇵🇹' },
  
  // Asia
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (Tokyo)', group: 'ASIA', country: '🇯🇵' },
  { value: 'Asia/Seoul', label: 'Korea Standard Time (Seoul)', group: 'ASIA', country: '🇰🇷' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (Shanghai)', group: 'ASIA', country: '🇨🇳' },
  { value: 'Asia/Beijing', label: 'China Standard Time (Beijing)', group: 'ASIA', country: '🇨🇳' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time', group: 'ASIA', country: '🇭🇰' },
  { value: 'Asia/Singapore', label: 'Singapore Standard Time', group: 'ASIA', country: '🇸🇬' },
  { value: 'Asia/Bangkok', label: 'Indochina Time (Bangkok)', group: 'ASIA', country: '🇹🇭' },
  { value: 'Asia/Jakarta', label: 'Western Indonesian Time (Jakarta)', group: 'ASIA', country: '🇮🇩' },
  { value: 'Asia/Manila', label: 'Philippine Standard Time (Manila)', group: 'ASIA', country: '🇵🇭' },
  { value: 'Asia/Kuala_Lumpur', label: 'Malaysia Time (Kuala Lumpur)', group: 'ASIA', country: '🇲🇾' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Indochina Time (Ho Chi Minh)', group: 'ASIA', country: '🇻🇳' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (Kolkata)', group: 'ASIA', country: '🇮🇳' },
  { value: 'Asia/Mumbai', label: 'India Standard Time (Mumbai)', group: 'ASIA', country: '🇮🇳' },
  { value: 'Asia/New_Delhi', label: 'India Standard Time (New Delhi)', group: 'ASIA', country: '🇮🇳' },
  { value: 'Asia/Dhaka', label: 'Bangladesh Standard Time (Dhaka)', group: 'ASIA', country: '🇧🇩' },
  { value: 'Asia/Karachi', label: 'Pakistan Standard Time (Karachi)', group: 'ASIA', country: '🇵🇰' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (Dubai)', group: 'ASIA', country: '🇦🇪' },
  { value: 'Asia/Riyadh', label: 'Arabia Standard Time (Riyadh)', group: 'ASIA', country: '🇸🇦' },
  { value: 'Asia/Kuwait', label: 'Arabia Standard Time (Kuwait)', group: 'ASIA', country: '🇰🇼' },
  { value: 'Asia/Doha', label: 'Arabia Standard Time (Doha)', group: 'ASIA', country: '🇶🇦' },
  { value: 'Asia/Tehran', label: 'Iran Standard Time (Tehran)', group: 'ASIA', country: '🇮🇷' },
  { value: 'Asia/Baghdad', label: 'Arabia Standard Time (Baghdad)', group: 'ASIA', country: '🇮🇶' },
  { value: 'Asia/Baku', label: 'Azerbaijan Time (Baku)', group: 'ASIA', country: '🇦🇿' },
  { value: 'Asia/Yerevan', label: 'Armenia Time (Yerevan)', group: 'ASIA', country: '🇦🇲' },
  { value: 'Asia/Tbilisi', label: 'Georgia Standard Time (Tbilisi)', group: 'ASIA', country: '🇬🇪' },
  { value: 'Asia/Almaty', label: 'Almaty Time', group: 'ASIA', country: '🇰🇿' },
  { value: 'Asia/Tashkent', label: 'Uzbekistan Time (Tashkent)', group: 'ASIA', country: '🇺🇿' },
  
  // Africa
  { value: 'Africa/Lagos', label: 'West Africa Time (Lagos)', group: 'AFRICA', country: '🇳🇬' },
  { value: 'Africa/Cairo', label: 'Eastern European Time (Cairo)', group: 'AFRICA', country: '🇪🇬' },
  { value: 'Africa/Johannesburg', label: 'South Africa Standard Time', group: 'AFRICA', country: '🇿🇦' },
  { value: 'Africa/Nairobi', label: 'East Africa Time (Nairobi)', group: 'AFRICA', country: '🇰🇪' },
  { value: 'Africa/Accra', label: 'Greenwich Mean Time (Accra)', group: 'AFRICA', country: '🇬🇭' },
  { value: 'Africa/Casablanca', label: 'Western European Time (Casablanca)', group: 'AFRICA', country: '🇲🇦' },
  { value: 'Africa/Algiers', label: 'Central European Time (Algiers)', group: 'AFRICA', country: '🇩🇿' },
  { value: 'Africa/Tunis', label: 'Central European Time (Tunis)', group: 'AFRICA', country: '🇹🇳' },
  { value: 'Africa/Addis_Ababa', label: 'East Africa Time (Addis Ababa)', group: 'AFRICA', country: '🇪🇹' },
  { value: 'Africa/Kampala', label: 'East Africa Time (Kampala)', group: 'AFRICA', country: '🇺🇬' },
  { value: 'Africa/Dar_es_Salaam', label: 'East Africa Time (Dar es Salaam)', group: 'AFRICA', country: '🇹🇿' },
  
  // Australia & Pacific
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (Sydney)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
  { value: 'Australia/Melbourne', label: 'Australian Eastern Time (Melbourne)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
  { value: 'Australia/Brisbane', label: 'Australian Eastern Time (Brisbane)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
  { value: 'Australia/Perth', label: 'Australian Western Time (Perth)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
  { value: 'Australia/Adelaide', label: 'Australian Central Time (Adelaide)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
  { value: 'Australia/Darwin', label: 'Australian Central Time (Darwin)', group: 'AUSTRALIA_PACIFIC', country: '🇦🇺' },
  { value: 'Pacific/Auckland', label: 'New Zealand Standard Time (Auckland)', group: 'AUSTRALIA_PACIFIC', country: '🇳🇿' },
  { value: 'Pacific/Fiji', label: 'Fiji Time', group: 'AUSTRALIA_PACIFIC', country: '🇫🇯' },
  { value: 'Pacific/Guam', label: 'Chamorro Standard Time (Guam)', group: 'AUSTRALIA_PACIFIC', country: '🇬🇺' },
  { value: 'Pacific/Tahiti', label: 'Tahiti Time', group: 'AUSTRALIA_PACIFIC', country: '🇵🇫' },
  
  // UTC
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)', group: 'UTC', country: '🌍' },
];

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

// Helper function to detect user timezone
const detectUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
};

// Helper function to convert local time to UTC
const convertLocalTimeToUTC = (localTime: string, timezone: string): string => {
  if (!localTime) return localTime;
  
  try {
    const [hours, minutes] = localTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    const timeString = date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const [tzHours, tzMinutes] = timeString.split(':').map(Number);
    const tzDate = new Date();
    tzDate.setHours(tzHours, tzMinutes, 0, 0);
    
    const utcHours = tzDate.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = tzDate.getUTCMinutes().toString().padStart(2, '0');
    
    return `${utcHours}:${utcMinutes}`;
  } catch (error) {
    console.error('Error converting time to UTC:', error);
    return localTime;
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
}: {
  days: DayAvailabilityType[];
  timeGap: number;
}) => {
  const [userTimezone, setUserTimezone] = useState(detectUserTimezone());
  const [searchValue, setSearchValue] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  
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
          if (item.endTime <= item.startTime) {
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
      timeGap: 30,
      timezone: userTimezone,
      days: [],
    },
  });

  useEffect(() => {
    form.setValue("days", days);
    form.setValue("timeGap", timeGap);
    form.setValue("timezone", userTimezone);
    form.trigger("days");
  }, [days, form, timeGap, userTimezone]);

  const onSubmit = (values: WeeklyHoursFormData) => {
    if (isPending) return;
    
    // Convert all times to UTC before sending to backend
    const utcValues = {
      ...values,
      days: values.days.map(day => ({
        ...day,
        startTime: day.isAvailable ? convertLocalTimeToUTC(day.startTime, values.timezone) : day.startTime,
        endTime: day.isAvailable ? convertLocalTimeToUTC(day.endTime, values.timezone) : day.endTime,
      })),
      originalTimezone: values.timezone,
    };
    
    mutate(utcValues, {
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
        form.setValue(`days.${index}.startTime`, "09:00");
        form.setValue(`days.${index}.endTime`, "17:00");
      }
    },
    [form]
  );

  // Filter timezones based on search
  const filteredTimezones = TIMEZONE_OPTIONS.filter(tz => 
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
  }, {} as Record<string, typeof TIMEZONE_OPTIONS>);

  const selectedTimezone = TIMEZONE_OPTIONS.find(tz => tz.value === form.watch("timezone"));

  return (
    <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calendar className="h-8 w-8" />
            </div>
            {/* <div>
              <h2 className="text-3xl font-bold mb-2">Weekly Availability</h2>
              <p className="text-blue-100 text-base font-medium">Configure your schedule and timezone preferences</p>
              {selectedTimezone && (
                <div className="mt-3 flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <span className="text-lg">{selectedTimezone.country}</span>
                  <span className="font-mono">{getCurrentTimeInTimezone(selectedTimezone.value)}</span>
                </div>
              )}
            </div> */}
          </div>
          <Sparkles className="h-6 w-6 opacity-80 animate-pulse" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Compact Timezone Selector */}
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
                      <Popover>
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
                              {selectedTimezone ? (
                                <>
                                  <span className="text-xl">{selectedTimezone.country}</span>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                      {selectedTimezone.label}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                      {selectedTimezone.value}
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
                              {selectedTimezone && (
                                <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs font-mono text-green-700 dark:text-green-400">
                                  {getCurrentTimeInTimezone(selectedTimezone.value)}
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
                                          setUserTimezone(timezone.value);
                                          setSearchValue("");
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
                    
                    {/* Compact Timezone Info - only show when timezone is selected */}
                    {selectedTimezone && (
                      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-3 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-700 dark:text-blue-300 font-medium">
                            Current Time in Your Zone
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-blue-800 dark:text-blue-200">
                              {getCurrentTimeInTimezone(selectedTimezone.value)}
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {new Date().toLocaleDateString('en-US', { 
                                timeZone: selectedTimezone.value,
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

          {/* Compact Time Gap Input */}
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
                    
                    {/* Compact Quick Select Options */}
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

          {/* Compact Days Availability */}
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
                    Set your availability for each day of the week
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

          {/* Compact Submit Button */}
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
            
            {/* Compact Additional Info */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your schedule will be converted to UTC and saved securely
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WeeklyHoursRow;