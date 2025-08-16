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
import { TimezoneSelector } from "@/components/TimezoneSelector";
import { DayAvailabilityType } from "@/types/api.type";
import { updateUserAvailabilityMutationFn } from "@/lib/api";
import { Loader } from "@/components/loader";
import { 
  detectUserTimezone, 
  convertTimeToUTC, 
  convertTimeFromUTC,
  getTimezoneLabel 
} from "@/lib/timezone";

const WeeklyHoursRow = ({
  days,
  timeGap,
  initialTimezone,
}: {
  days: DayAvailabilityType[];
  timeGap: number;
  initialTimezone?: string;
}) => {
  const [userTimezone, setUserTimezone] = useState(() => 
    initialTimezone || detectUserTimezone()
  );

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

  // Convert UTC times from backend to local times for display
  useEffect(() => {
    if (days.length > 0 && userTimezone) {
      const localDays = days.map(day => ({
        ...day,
        startTime: day.isAvailable ? convertTimeFromUTC(day.startTime, userTimezone) : day.startTime,
        endTime: day.isAvailable ? convertTimeFromUTC(day.endTime, userTimezone) : day.endTime,
      }));
      
      form.setValue("days", localDays);
      form.setValue("timeGap", timeGap);
      form.setValue("timezone", userTimezone);
      form.trigger("days");
    }
  }, [days, form, timeGap, userTimezone]);

  const onSubmit = (values: WeeklyHoursFormData) => {
    console.log("Local form values:", values);
    if (isPending) return;

    // Convert local times to UTC for backend storage
    const utcDays = values.days.map(day => ({
      ...day,
      startTime: day.isAvailable ? convertTimeToUTC(day.startTime, values.timezone) : day.startTime,
      endTime: day.isAvailable ? convertTimeToUTC(day.endTime, values.timezone) : day.endTime,
    }));

    const payload = {
      ...values,
      days: utcDays,
    };

    console.log("UTC payload for backend:", payload);

    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response.message || "Availability updated successfully");
      },
      onError: (error) => {
        console.error("Error updating availability:", error);
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

  const handleTimezoneChange = (newTimezone: string) => {
    const currentDays = form.getValues("days");
    const currentTimezone = form.getValues("timezone");
    
    // Convert times from current timezone to new timezone
    const convertedDays = currentDays.map(day => {
      if (day.isAvailable) {
        // Convert current local time to UTC, then to new timezone
        const utcStartTime = convertTimeToUTC(day.startTime, currentTimezone);
        const utcEndTime = convertTimeToUTC(day.endTime, currentTimezone);
        
        return {
          ...day,
          startTime: convertTimeFromUTC(utcStartTime, newTimezone),
          endTime: convertTimeFromUTC(utcEndTime, newTimezone),
        };
      }
      return day;
    });

    setUserTimezone(newTimezone);
    form.setValue("timezone", newTimezone);
    form.setValue("days", convertedDays);
  };

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
                    <TimezoneSelector
                      value={field.value}
                      onValueChange={handleTimezoneChange}
                      className="w-full"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Your availability will be displayed in {getTimezoneLabel(field.value)} for attendees.
                  </p>
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
                    className="w-[100px] !py-[10px] min-h-[46px]
                     px-[14px] !h-auto"
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
              timezone={userTimezone}
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
