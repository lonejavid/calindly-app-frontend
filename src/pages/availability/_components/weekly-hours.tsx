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
import { Check, ChevronsUpDown, Globe } from "lucide-react";
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

// Custom Command Components (replacing the missing ones)
const CustomCommand = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col bg-popover text-popover-foreground rounded-md border", className)}>
    {children}
  </div>
);

const CustomCommandInput = ({ placeholder, value, onValueChange }: { 
  placeholder: string; 
  value?: string; 
  onValueChange?: (value: string) => void 
}) => (
  <div className="p-2 border-b">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
    />
  </div>
);

const CustomCommandList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("overflow-y-auto overflow-x-hidden max-h-[300px]", className)}>
    {children}
  </div>
);

const CustomCommandEmpty = ({ children }: { children: React.ReactNode }) => (
  <div className="py-6 text-center text-sm text-muted-foreground">
    {children}
  </div>
);

const CustomCommandGroup = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
  <div className="overflow-hidden">
    <div className="py-1.5 px-2 text-xs font-medium text-muted-foreground uppercase">
      {heading}
    </div>
    <div className="[&>[cmdk-item]]:px-2 [&>[cmdk-item]]:py-1.5 [&>[cmdk-item]]:text-sm">
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
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
    )}
  >
    <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
    {children}
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
    mutate(values, {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-0">
        {/* Timezone Selector */}
        <div className="px-5 pt-3">
          <FormField
            name="timezone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <Label className="text-[15px] font-medium">
                    Time zone
                  </Label>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between min-w-[300px] h-auto p-3",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="flex items-start gap-2 text-left">
                            <Globe className="h-4 w-4 mt-0.5 shrink-0" />
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">
                                {TIMEZONE_OPTIONS.find(
                                  (tz) => tz.value === field.value
                                )?.label || "Select timezone..."}
                              </span>
                            </div>
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
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
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Time Gap Input */}
        <FormField
          name="timeGap"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 p-5 pb-1">
              <Label className="text-[15px] font-medium shrink-0">
                Time Gap (mins):
              </Label>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-[100px] !py-[10px] min-h-[46px] px-[14px] !h-auto"
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
                <FormMessage className="absolute top-full left-0 mt-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Days Availability */}
        <div className="space-y-1">
          {form.watch("days").map((day, index) => (
            <DayAvailability
              key={day.day}
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
          ))}
        </div>

        <div className="w-full pt-4 px-5">
          <Button disabled={isPending} type="submit" className="!px-10">
            {isPending ? <Loader color="white" /> : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WeeklyHoursRow;