// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import {
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Separator } from "@/components/ui/separator";
// import { XIcon } from "lucide-react"; // Replace with your actual icon
// import TimeSelector from "@/components/TimeSelector";
// import { cn } from "@/lib/utils";

// interface DayAvailabilityProps {
//   day: string;
//   startTime: string;
//   endTime: string;
//   isAvailable: boolean;
//   index: number;
//   form: any;
//   dayMapping: Record<string, string>;
//   onRemove: (day: string) => void;
//   onTimeSelect: (
//     day: string,
//     field: "startTime" | "endTime",
//     time: string
//   ) => void;
// }

// const DayAvailability = ({
//   day,
//   isAvailable,
//   index,
//   form,
//   dayMapping,
//   onRemove,
//   onTimeSelect,
// }: DayAvailabilityProps) => {
//   return (
//     <div className="flex items-center gap-10 p-3 pb-5 px-0 min-h-[40px] relative">
//       <div className="w-[88px] mt-2.5">
//         <div className="inline-flex items-center cursor-pointer">
//           <Switch
//             checked={isAvailable}
//             onCheckedChange={(checked) => {
//               form.setValue(`days.${index}.isAvailable`, checked);
//               if (!checked) {
//                 form.setValue(`days.${index}.startTime`, "09:00");
//                 form.setValue(`days.${index}.endTime`, "17:00");
//               }
//             }}
//           />
//           <Label className="ml-2.5 text-[15px] font-semibold uppercase">
//             {dayMapping[day]}
//           </Label>
//         </div>
//       </div>

//       {isAvailable ? (
//         <>
//           <div className="flex-1 relative">
//             <div className="flex gap-2 relative">
//               <div className="flex items-center gap-[2px]">
//                 <FormField
//                   name={`days.${index}.startTime`}
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <TimeSelector
//                           name={`days.${index}.startTime`}
//                           defaultValue={field.value}
//                           timeGap={form.watch("timeGap")}
//                           register={form.register}
//                           className={cn(
//                             `end--time`,
//                             form.formState.errors.availability?.[index]
//                               ?.startTime &&
//                               "!border-destructive !ring-0 focus-visible:!ring-0"
//                           )}
//                           onSelect={(time) =>
//                             onTimeSelect(day, "startTime", time)
//                           }
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <Separator className="w-1 bg-[#0a2540]" />
//                 <FormField
//                   name={`days.${index}.endTime`}
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <TimeSelector
//                           name={`days.${index}.endTime`}
//                           defaultValue={field.value}
//                           timeGap={form.watch("timeGap")}
//                           register={form.register}
//                           className={cn(
//                             `end--time`,
//                             form.formState.errors.availability?.[index]
//                               ?.endTime &&
//                               "!border-destructive !ring-0 focus-visible:!ring-0"
//                           )}
//                           onSelect={(time) =>
//                             onTimeSelect(day, "endTime", time)
//                           }
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <button
//                 className="ml-2 cursor-pointer flex items-center justify-center size-[44px] p-1 rounded-[4px] text-center hover:bg-gray-50"
//                 onClick={() => onRemove(day)}
//               >
//                 <XIcon className="w-4 h-4" />
//               </button>
//             </div>

//             {(form.formState.errors.days?.[index]?.startTime ||
//               form.formState.errors.days?.[index]?.endTime) && (
//               <FormMessage
//                 className="w-full absolute top-full 
//                 left-0 !mt-1 mb-1 text-sm text-destructive"
//               >
//                 {form.formState.errors.days?.[index]?.startTime?.message ||
//                   form.formState.errors.days?.[index]?.endTime?.message}
//               </FormMessage>
//             )}
//           </div>
//         </>
//       ) : (
//         <span className="text-base mt-1 text-[rgba(26,26,26,0.61)]">
//           Unavailable
//         </span>
//       )}
//     </div>
//   );
// };

// export default DayAvailability;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { XIcon, Clock } from "lucide-react";
import TimeSelector from "@/components/TimeSelector";
import { cn } from "@/lib/utils";

interface DayAvailabilityProps {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  index: number;
  form: any;
  dayMapping: Record<string, string>;
  onRemove: (day: string) => void;
  onTimeSelect: (
    day: string,
    field: "startTime" | "endTime",
    time: string
  ) => void;
}

const DayAvailability = ({
  day,
  isAvailable,
  index,
  form,
  dayMapping,
  onRemove,
  onTimeSelect,
}: DayAvailabilityProps) => {
  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-200",
      isAvailable 
        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50" 
        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50"
    )}>
      {/* Day Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Switch
            checked={isAvailable}
            onCheckedChange={(checked) => {
              form.setValue(`days.${index}.isAvailable`, checked);
              if (!checked) {
                form.setValue(`days.${index}.startTime`, "09:00");
                form.setValue(`days.${index}.endTime`, "17:00");
              }
            }}
            className="data-[state=checked]:bg-green-500"
          />
          <div>
            <Label className="text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
              {dayMapping[day]}
            </Label>
            {isAvailable && (
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Available for meetings
                </span>
              </div>
            )}
          </div>
        </div>
        
        {isAvailable && (
          <button
            type="button"
            onClick={() => onRemove(day)}
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            title="Remove availability"
          >
            <XIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* Time Selection or Unavailable State */}
      {isAvailable ? (
        <div className="space-y-3">
          {/* Working Hours Label */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Working Hours</span>
            {form.watch("days")?.[index]?.startTime && form.watch("days")?.[index]?.endTime && (
              <span className="ml-auto text-green-600 dark:text-green-400 font-mono">
                Toggle the switch above to set working hours
              </span>
            )}
          </div>

          {/* Time Range Selectors */}
          <div className="flex items-center gap-3">
            <FormField
              name={`days.${index}.startTime`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <TimeSelector
                      name={`days.${index}.startTime`}
                      defaultValue={field.value}
                      timeGap={form.watch("timeGap")}
                      register={form.register}
                      className={cn(
                        "h-10 text-sm font-semibold rounded-lg border-2 w-full",
                        "border-green-200 dark:border-green-600 bg-white dark:bg-gray-800",
                        "focus:border-green-400 dark:focus:border-green-500 focus:ring-0",
                        form.formState.errors.days?.[index]?.startTime &&
                          "!border-red-400"
                      )}
                      onSelect={(time) => onTimeSelect(day, "startTime", time)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex items-center px-2">
              <Separator className="w-6 bg-green-300 dark:bg-green-600" />
            </div>
            
            <FormField
              name={`days.${index}.endTime`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <TimeSelector
                      name={`days.${index}.endTime`}
                      defaultValue={field.value}
                      timeGap={form.watch("timeGap")}
                      register={form.register}
                      className={cn(
                        "h-10 text-sm font-semibold rounded-lg border-2 w-full",
                        "border-green-200 dark:border-green-600 bg-white dark:bg-gray-800",
                        "focus:border-green-400 dark:focus:border-green-500 focus:ring-0",
                        form.formState.errors.days?.[index]?.endTime &&
                          "!border-red-400"
                      )}
                      onSelect={(time) => onTimeSelect(day, "endTime", time)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Duration Display */}
          {form.watch(`days.${index}.startTime`) && form.watch(`days.${index}.endTime`) && (
            <div className="text-center pt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Duration:{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {(() => {
                    const start = form.watch(`days.${index}.startTime`);
                    const end = form.watch(`days.${index}.endTime`);
                    if (!start || !end) return "0h";
                    
                    const [startHour, startMin] = start.split(':').map(Number);
                    const [endHour, endMin] = end.split(':').map(Number);
                    
                    const startMinutes = startHour * 60 + startMin;
                    const endMinutes = endHour * 60 + endMin;
                    
                    if (endMinutes <= startMinutes) return "Invalid";
                    
                    const diffMinutes = endMinutes - startMinutes;
                    const hours = Math.floor(diffMinutes / 60);
                    const minutes = diffMinutes % 60;
                    
                    if (hours === 0) return `${minutes}m`;
                    if (minutes === 0) return `${hours}h`;
                    return `${hours}h ${minutes}m`;
                  })()}
                </span>{" "}
                of availability
              </span>
            </div>
          )}

          {/* Error Messages */}
          {(form.formState.errors.days?.[index]?.startTime ||
            form.formState.errors.days?.[index]?.endTime) && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
              <FormMessage className="text-red-600 dark:text-red-400 text-sm">
                {form.formState.errors.days?.[index]?.startTime?.message ||
                  form.formState.errors.days?.[index]?.endTime?.message}
              </FormMessage>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <XIcon className="h-4 w-4" />
            <span className="text-sm">Not available on this day</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          </p>
        </div>
      )}
    </div>
  );
};

export default DayAvailability;