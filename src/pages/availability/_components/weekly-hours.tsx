// import { z } from "zod";
// import { toast } from "sonner";
// import { useCallback, useEffect } from "react";
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

// const WeeklyHoursRow = ({
//   days,
//   timeGap,
// }: {
//   days: DayAvailabilityType[];
//   timeGap: number;
// }) => {
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
//             // Add error to both startTime and endTime fields
//             ctx.addIssue({
//               code: z.ZodIssueCode.custom,
//               message: "End time must be greater than start time",
//               path: ["availability", index, "startTime"],
//             });
//             ctx.addIssue({
//               code: z.ZodIssueCode.custom,
//               message: "End time must be greater than start time",
//               path: ["availability", index, "endTime"],
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
//       days: [],
//     },
//   });

//   useEffect(() => {
//     form.setValue("days", days);
//     form.setValue("timeGap", timeGap);
//     form.trigger("days");
//   }, [days, form, timeGap]);

//   const onSubmit = (values: WeeklyHoursFormData) => {
//     console.log("Form Data:", values);
//     if (isPending) return;

//     mutate(values, {
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

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pt-0">
//         {/* Time Gap Input */}
//         <FormField
//           name="timeGap"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-4 p-5 pb-1">
//               <Label className="text-[15px] font-medium shrink-0">
//                 Time Gap (mins):
//               </Label>
//               <div className="relative w-full">
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="number"
//                     className="w-[100px] !py-[10px] min-h-[46px]
//                      px-[14px] !h-auto"
//                     value={field.value || ""}
//                     min="1"
//                     onChange={(e) => {
//                       const value = e.target.value.trim();
//                       if (value === "") {
//                         field.onChange(null);
//                       } else {
//                         const parsedValue = parseInt(value, 10);
//                         if (!isNaN(parsedValue) && parsedValue > 0) {
//                           field.onChange(parsedValue);
//                         }
//                       }
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage className="absolute top-full left-0 mt-2" />
//               </div>
//             </FormItem>
//           )}
//         />

//         <div className="space-y-1">
//           {form.watch("days").map((day, index) => (
//             <DayAvailability
//               key={day.day}
//               day={day.day}
//               startTime={day.startTime}
//               endTime={day.endTime}
//               isAvailable={day.isAvailable}
//               index={index}
//               form={form}
//               dayMapping={dayMapping}
//               onRemove={onRemove}
//               onTimeSelect={handleTimeSelect}
//             />
//           ))}
//         </div>

//         <div className="w-full pt-4">
//           <Button disabled={isPending} type="submit" className=" !px-10">
//             {isPending ? <Loader color="white" /> : "Save changes"}
//           </Button>
//         </div>
//       </form>
//     </Form>
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

// Timezone options data
const TIMEZONE_OPTIONS = [
  // US & Canada
  { value: 'America/New_York', label: 'Eastern Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Chicago', label: 'Central Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Denver', label: 'Mountain Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Los_Angeles', label: 'Pacific Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Anchorage', label: 'Alaska Time', group: 'US/CANADA' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time', group: 'US/CANADA' },
  { value: 'America/Toronto', label: 'Eastern Time - Toronto', group: 'US/CANADA' },
  { value: 'America/Vancouver', label: 'Pacific Time - Vancouver', group: 'US/CANADA' },
  
  // Europe
  { value: 'Europe/London', label: 'Greenwich Mean Time - London', group: 'EUROPE' },
  { value: 'Europe/Paris', label: 'Central European Time - Paris', group: 'EUROPE' },
  { value: 'Europe/Berlin', label: 'Central European Time - Berlin', group: 'EUROPE' },
  { value: 'Europe/Rome', label: 'Central European Time - Rome', group: 'EUROPE' },
  { value: 'Europe/Madrid', label: 'Central European Time - Madrid', group: 'EUROPE' },
  { value: 'Europe/Amsterdam', label: 'Central European Time - Amsterdam', group: 'EUROPE' },
  
  // Asia
  { value: 'Asia/Tokyo', label: 'Japan Standard Time - Tokyo', group: 'ASIA' },
  { value: 'Asia/Shanghai', label: 'China Standard Time - Shanghai', group: 'ASIA' },
  { value: 'Asia/Kolkata', label: 'India Standard Time - Kolkata', group: 'ASIA' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time - Dubai', group: 'ASIA' },
  { value: 'Asia/Singapore', label: 'Singapore Standard Time', group: 'ASIA' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time', group: 'ASIA' },
  
  // Australia & Pacific
  { value: 'Australia/Sydney', label: 'Australian Eastern Time - Sydney', group: 'AUSTRALIA' },
  { value: 'Australia/Melbourne', label: 'Australian Eastern Time - Melbourne', group: 'AUSTRALIA' },
  { value: 'Australia/Perth', label: 'Australian Western Time - Perth', group: 'AUSTRALIA' },
  { value: 'Pacific/Auckland', label: 'New Zealand Standard Time - Auckland', group: 'AUSTRALIA' },
];

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
    
    // Format the time in the specified timezone
    const timeString = date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Create a new date with the timezone-adjusted time
    const [tzHours, tzMinutes] = timeString.split(':').map(Number);
    const tzDate = new Date();
    tzDate.setHours(tzHours, tzMinutes, 0, 0);
    
    // Get UTC equivalent
    const utcHours = tzDate.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = tzDate.getUTCMinutes().toString().padStart(2, '0');
    
    return `${utcHours}:${utcMinutes}`;
  } catch (error) {
    console.error('Error converting time to UTC:', error);
    return localTime; // fallback to original time if conversion fails
  }
};

// Enhanced Custom Command Components with beautiful styling
const CustomCommand = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "flex flex-col bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-900/90", 
    "text-popover-foreground rounded-xl border border-gray-200/60 dark:border-gray-700/60 shadow-lg", 
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
  <div className="p-3 border-b border-gray-100 dark:border-gray-700/50">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm font-medium focus:placeholder:opacity-50 transition-all"
    />
  </div>
);

const CustomCommandList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("overflow-y-auto overflow-x-hidden max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600", className)}>
    {children}
  </div>
);

const CustomCommandEmpty = ({ children }: { children: React.ReactNode }) => (
  <div className="py-8 text-center text-sm text-muted-foreground font-medium">
    {children}
  </div>
);

const CustomCommandGroup = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
  <div className="overflow-hidden">
    <div className="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/30">
      {heading}
    </div>
    <div className="[&>[cmdk-item]]:px-3 [&>[cmdk-item]]:py-2 [&>[cmdk-item]]:text-sm">
      {children}
    </div>
  </div>
);

const CustomCommandItem = ({ 
  children, 
  onSelect, 
  isSelected 
}: { 
  children: React.ReactNode; 
  onSelect: () => void; 
  isSelected: boolean 
}) => (
  <div
    onClick={onSelect}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg mx-2 my-1 px-3 py-2.5 text-sm outline-none transition-all duration-200",
      isSelected 
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" 
        : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:shadow-sm"
    )}
  >
    <Check className={cn("mr-3 h-4 w-4 transition-all", isSelected ? "opacity-100 scale-110" : "opacity-0 scale-95")} />
    <span className="font-medium">{children}</span>
  </div>
);

const WeeklyHoursRow = ({
  days,
  timeGap,
}: {
  days: DayAvailabilityType[];
  timeGap: number;
}) => {
  const [userTimezone, setUserTimezone] = useState(detectUserTimezone());
  const [searchValue, setSearchValue] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAvailabilityMutationFn,
  });

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
      originalTimezone: values.timezone, // Keep track of original timezone
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

  // Group filtered timezones for the dropdown
  const groupedTimezones = filteredTimezones.reduce((acc, timezone) => {
    if (!acc[timezone.group]) {
      acc[timezone.group] = [];
    }
    acc[timezone.group].push(timezone);
    return acc;
  }, {} as Record<string, typeof TIMEZONE_OPTIONS>);

  return (
    <div className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl backdrop-blur-sm overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Weekly Availability</h2>
            <p className="text-blue-100 text-sm font-medium">Configure your schedule and timezone preferences</p>
          </div>
          <Sparkles className="h-5 w-5 ml-auto opacity-80" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Timezone Selector with enhanced styling */}
          <div className="p-8 pb-4">
            <FormField
              name="timezone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Time Zone
                    </Label>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between min-w-full h-auto p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700",
                              "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300",
                              "bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3 text-left">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                  {TIMEZONE_OPTIONS.find(
                                    (tz) => tz.value === field.value
                                  )?.label || "Select timezone..."}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {field.value ? `UTC ${new Date().toLocaleString('en', {timeZone: field.value, timeZoneName: 'short'}).split(', ')[1]}` : "Choose your local timezone"}
                                </span>
                              </div>
                            </div>
                            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[450px] p-0" align="start">
                          <CustomCommand>
                            <CustomCommandInput 
                              placeholder="Search timezone..." 
                              value={searchValue}
                              onValueChange={setSearchValue}
                            />
                            <CustomCommandList>
                              {Object.keys(groupedTimezones).length === 0 ? (
                                <CustomCommandEmpty>No timezone found.</CustomCommandEmpty>
                              ) : (
                                Object.entries(groupedTimezones).map(([groupName, timezones]) => (
                                  <CustomCommandGroup key={groupName} heading={groupName.replace('_', ' & ')}>
                                    {timezones.map((timezone) => (
                                      <CustomCommandItem
                                        key={timezone.value}
                                        onSelect={() => {
                                          form.setValue("timezone", timezone.value);
                                          setUserTimezone(timezone.value);
                                          setSearchValue("");
                                        }}
                                        isSelected={timezone.value === field.value}
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
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Time Gap Input with enhanced styling */}
          <div className="px-8">
            <FormField
              name="timeGap"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Time Gap (minutes)
                        </Label>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="w-[120px] h-12 text-center font-semibold text-lg rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 shadow-inner transition-all duration-200"
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
                        </FormControl>
                        <FormMessage className="absolute top-full left-0 mt-2 whitespace-nowrap text-red-500 font-medium" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 ml-12">
                      Buffer time between appointments (15, 30, 45, 60, or 120 minutes)
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Days Availability with enhanced container */}
          <div className="px-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Daily Schedule</h3>
              </div>
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

          {/* Submit button with enhanced styling */}
          <div className="p-8 pt-4">
            <Button 
              disabled={isPending} 
              type="submit" 
              className={cn(
                "w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300",
                "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700",
                "shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
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
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WeeklyHoursRow;











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
// import { Check, ChevronsUpDown, Globe } from "lucide-react";
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

// // Custom Command Components
// const CustomCommand = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <div className={cn("flex flex-col bg-popover text-popover-foreground rounded-md border", className)}>
//     {children}
//   </div>
// );

// const CustomCommandInput = ({ placeholder, value, onValueChange }: { 
//   placeholder: string; 
//   value?: string; 
//   onValueChange?: (value: string) => void 
// }) => (
//   <div className="p-2 border-b">
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => onValueChange?.(e.target.value)}
//       className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
//     />
//   </div>
// );

// const CustomCommandList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <div className={cn("overflow-y-auto overflow-x-hidden max-h-[300px]", className)}>
//     {children}
//   </div>
// );

// const CustomCommandEmpty = ({ children }: { children: React.ReactNode }) => (
//   <div className="py-6 text-center text-sm text-muted-foreground">
//     {children}
//   </div>
// );

// const CustomCommandGroup = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
//   <div className="overflow-hidden">
//     <div className="py-1.5 px-2 text-xs font-medium text-muted-foreground uppercase">
//       {heading}
//     </div>
//     <div className="[&>[cmdk-item]]:px-2 [&>[cmdk-item]]:py-1.5 [&>[cmdk-item]]:text-sm">
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
//       "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
//       isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
//     )}
//   >
//     <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
//     {children}
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
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-0">
//         {/* Timezone Selector */}
//         <div className="px-5 pt-3">
//           <FormField
//             name="timezone"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <div className="space-y-2">
//                   <Label className="text-[15px] font-medium">
//                     Time zone
//                   </Label>
//                   <FormControl>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant="outline"
//                           role="combobox"
//                           className={cn(
//                             "justify-between min-w-[300px] h-auto p-3",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           <div className="flex items-start gap-2 text-left">
//                             <Globe className="h-4 w-4 mt-0.5 shrink-0" />
//                             <div className="flex flex-col gap-1">
//                               <span className="font-medium">
//                                 {TIMEZONE_OPTIONS.find(
//                                   (tz) => tz.value === field.value
//                                 )?.label || "Select timezone..."}
//                               </span>
//                             </div>
//                           </div>
//                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-[400px] p-0">
//                         <CustomCommand>
//                           <CustomCommandInput 
//                             placeholder="Search timezone..." 
//                             value={searchValue}
//                             onValueChange={setSearchValue}
//                           />
//                           <CustomCommandList>
//                             {Object.keys(groupedTimezones).length === 0 ? (
//                               <CustomCommandEmpty>No timezone found.</CustomCommandEmpty>
//                             ) : (
//                               Object.entries(groupedTimezones).map(([groupName, timezones]) => (
//                                 <CustomCommandGroup key={groupName} heading={groupName.replace('_', ' & ')}>
//                                   {timezones.map((timezone) => (
//                                     <CustomCommandItem
//                                       key={timezone.value}
//                                       onSelect={() => {
//                                         form.setValue("timezone", timezone.value);
//                                         setUserTimezone(timezone.value);
//                                         setSearchValue("");
//                                       }}
//                                       isSelected={timezone.value === field.value}
//                                     >
//                                       {timezone.label}
//                                     </CustomCommandItem>
//                                   ))}
//                                 </CustomCommandGroup>
//                               ))
//                             )}
//                           </CustomCommandList>
//                         </CustomCommand>
//                       </PopoverContent>
//                     </Popover>
//                   </FormControl>
//                   <FormMessage />
//                 </div>
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Time Gap Input */}
//         <FormField
//           name="timeGap"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex items-center gap-4 p-5 pb-1">
//               <Label className="text-[15px] font-medium shrink-0">
//                 Time Gap (mins):
//               </Label>
//               <div className="relative w-full">
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="number"
//                     className="w-[100px] !py-[10px] min-h-[46px] px-[14px] !h-auto"
//                     value={field.value || ""}
//                     min="1"
//                     onChange={(e) => {
//                       const value = e.target.value.trim();
//                       if (value === "") {
//                         field.onChange(null);
//                       } else {
//                         const parsedValue = parseInt(value, 10);
//                         if (!isNaN(parsedValue) && parsedValue > 0) {
//                           field.onChange(parsedValue);
//                         }
//                       }
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage className="absolute top-full left-0 mt-2" />
//               </div>
//             </FormItem>
//           )}
//         />

//         {/* Days Availability */}
//         <div className="space-y-1">
//           {form.watch("days").map((day, index) => (
//             <DayAvailability
//               key={day.day}
//               day={day.day}
//               startTime={day.startTime}
//               endTime={day.endTime}
//               isAvailable={day.isAvailable}
//               index={index}
//               form={form}
//               dayMapping={dayMapping}
//               onRemove={onRemove}
//               onTimeSelect={handleTimeSelect}
//             />
//           ))}
//         </div>

//         <div className="w-full pt-4 px-5">
//           <Button disabled={isPending} type="submit" className="!px-10">
//             {isPending ? <Loader color="white" /> : "Save changes"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default WeeklyHoursRow;


