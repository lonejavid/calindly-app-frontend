import { z } from "zod";
import { addMinutes, parse, format, parseISO } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useBookingState } from "@/hooks/use-booking-state";
import { Fragment, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckIcon,
  ExternalLink,
  User,
  Calendar,
  Globe,
  ChevronDown,
} from "lucide-react";
import { getPublicAvailabilityByEventIdQueryFn, scheduleMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

// Type definitions for the event object - matching your EventType
interface EventQuestion {
  id: number;
  question: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface EventUser {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface Event {
  id: string;
  title: string;
  accessSpecifier?: string;
  description: string;
  locationType: string;
  allowGuests?: boolean;
  blockedDomains?: string[] | string; // Handle both array and string
  bufferAfter?: number;
  bufferBefore?: number;
  duration: number;
  maxBookingsPerDay?: number | null;
  /** API returns JSON string from DB; arrays also supported */
  questions?: EventQuestion[] | string | null;
  slug?: string;
  timeSlotInterval?: number;
  timeZoneDisplay?: string;
  confirmationMessage?: string;
  redirectUrl?: string;
  user: EventUser;
}

/** Backend stores questions as JSON text — must parse before .forEach/.map or React crashes. */
function parseEventQuestions(raw: unknown): EventQuestion[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.filter(
      (q): q is EventQuestion =>
        Boolean(q) && typeof q === "object" && "id" in q && "question" in q && "type" in q,
    );
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (q): q is EventQuestion =>
          Boolean(q) && typeof q === "object" && "id" in q && "question" in q && "type" in q,
      );
    } catch {
      return [];
    }
  }
  return [];
}

/** API may return JSON text: ["@gmail.com"] */
function parseEventBlockedDomains(raw: unknown): string[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.map((d) => String(d).toLowerCase()).filter(Boolean);
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((x) => String(x).toLowerCase()).filter(Boolean);
      }
      if (typeof parsed === "string" && parsed.trim()) {
        return [parsed.trim().toLowerCase()];
      }
    } catch {
      return [trimmed.toLowerCase()];
    }
    return [trimmed.toLowerCase()];
  }
  return [];
}

function emailMatchesBlockedList(email: string, blockedLowercase: string[]): boolean {
  if (!email) return false;
  const at = email.indexOf("@");
  if (at === -1) return false;
  const emailDomain = email.slice(at).toLowerCase();
  return blockedLowercase.some((d) => {
    const norm = d.startsWith("@") ? d : `@${d}`;
    return emailDomain === norm;
  });
}

type FormData = {
  guestName: string;
  guestEmail: string;
  additionalInfo?: string;
  guestEmails?: string;
  [key: string]: string | string[] | undefined; // For dynamic question fields
};


// Get browser timezone
const getBrowserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Convert calendar object to ISO date string
interface CalendarLike {
  year?: number;
  month?: number;
  day?: number;
}
const calendarObjectToISODate = (calendarObj: CalendarLike | null | undefined) => {
  if (!calendarObj || typeof calendarObj !== 'object') {
    return null;
  }

  // Handle the calendar object structure
  const year = calendarObj.year;
  const month = calendarObj.month;
  const day = calendarObj.day;

  if (!year || !month || !day) {
    return null;
  }

  // Create ISO date string (YYYY-MM-DD)
  const isoDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return isoDate;
};

const BookingForm = (props: { event: Event }) => {
  const { event } = props;
  const { username } = useParams();
  const navigate = useNavigate();
  const questions = useMemo(() => parseEventQuestions(event.questions), [event.questions]);
  const blockedDomainsList = useMemo(
    () => parseEventBlockedDomains(event.blockedDomains),
    [event.blockedDomains],
  );
  const enforceBlockedDomains =
    event.accessSpecifier === "block_domains" && blockedDomainsList.length > 0;

  const [meetLink, setMeetLink] = useState("");
  const [bookingDetails, setBookingDetails] = useState<{
    startTime: string;
    endTime: string;
    guestName: string;
  } | null>(null);


  
  const { selectedDate, isSuccess, selectedSlot, handleSuccess, handleSelectSlot, handleBack } =
    useBookingState();
  const queryClient = useQueryClient();


  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

  const isEmailDomainBlocked = useCallback(
    (email: string): boolean => {
      if (!enforceBlockedDomains || !email) return false;
      return emailMatchesBlockedList(email.trim().toLowerCase(), blockedDomainsList);
    },
    [enforceBlockedDomains, blockedDomainsList],
  );

  // Create dynamic Zod schema and form type
  const { schema } = useMemo(() => {
    const schemaFields: Record<string, z.ZodTypeAny> = {
      guestName: z.string().min(1, "Name is required"),
      additionalInfo: z.string().optional(),
    };

    const list = parseEventBlockedDomains(event.blockedDomains);
    const enforce =
      event.accessSpecifier === "block_domains" && list.length > 0;

    if (enforce) {
      schemaFields.guestEmail = z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .refine((email) => !emailMatchesBlockedList(email.trim().toLowerCase(), list), {
          message: `This doesn't seem to be your work email.`,
        });
    } else {
      schemaFields.guestEmail = z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address");
    }

    // Add guest emails field if allowed
    if (event.allowGuests) {
      schemaFields.guestEmails = z.string().optional();
    }

    // Add dynamic questions with proper validation based on type
    if (questions.length > 0) {
      questions.forEach((question) => {
        const fieldName = `question_${question.id}`;
        
        if (question.type === "checkbox") {
          // For checkboxes, we expect an array of strings
          if (question.required) {
            schemaFields[fieldName] = z
              .array(z.string())
              .min(1, `${question.question} is required`);
          } else {
            schemaFields[fieldName] = z.array(z.string()).optional();
          }
        } else {
          // For other types (text, textarea, select, radio)
          if (question.required) {
            schemaFields[fieldName] = z.string().min(1, `${question.question} is required`);
          } else {
            schemaFields[fieldName] = z.string().optional();
          }
        }
      });
    }

    const dynamicSchema = z.object(schemaFields);

    return { 
      schema: dynamicSchema
    };
  }, [event.accessSpecifier, event.blockedDomains, questions]);

  // Create default values
  const defaultValues = useMemo(() => {
    const values: Record<string, string | string[]> = {
      guestName: "",
      guestEmail: "",
      additionalInfo: "",
    };

    if (event.allowGuests) {
      values.guestEmails = "";
    }

    if (questions.length > 0) {
      questions.forEach((question) => {
        const fieldName = `question_${question.id}`;
        if (question.type === "checkbox") {
          values[fieldName] = []; // Initialize as empty array for checkboxes
        } else {
          values[fieldName] = "";
        }
      });
    }

    return values;
  }, [event, questions]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur" as const,
  });

  // Watch email field to show real-time validation
  const watchedEmail = form.watch("guestEmail");

  const { data } = useQuery({
    queryKey: ["availbility_single_event", event.id],
    queryFn: () => getPublicAvailabilityByEventIdQueryFn(event.id),
  });

  // Extract availability array safely
  const availability = data?.data || [];


  

  const onSubmit = async (values: FormData) => {
    if (!event.id || !selectedSlot || !selectedDate) {
      console.error("Missing required data:", { eventId: event.id, selectedSlot, selectedDate });
      toast.error("Please select a date and time slot");
      return;
    }

    // Double-check email domain blocking before submission
    if (isEmailDomainBlocked(values.guestEmail)) {
      const displayDomains = blockedDomainsList.map((domain) =>
        domain.startsWith("@") ? domain.slice(1) : domain,
      );
      toast.error(
        `Email domain is blocked. Domains ${displayDomains.join(", ")} are not allowed for this event.`,
      );
      return;
    }

    try {
      const hostTimezone =
        availability.length > 0 ? availability[0].timezone : "UTC";
      const browserTimezone = getBrowserTimezone();

      // Convert calendar object to ISO date string
      const selectedDateISO = calendarObjectToISODate(selectedDate);
      if (!selectedDateISO) {
        throw new Error("Invalid date format from calendar");
      }

      const selectedDateObj = parseISO(selectedDateISO);
      if (isNaN(selectedDateObj.getTime())) {
        throw new Error("Invalid date format");
      }

      // Parse slot label (e.g. "3:00 pm") — try common patterns
      const slotStr = selectedSlot.toString().trim();
      let timeOnlyDate = parse(slotStr, "h:mm a", new Date());
      if (isNaN(timeOnlyDate.getTime())) {
        timeOnlyDate = parse(slotStr, "h:mma", new Date());
      }
      if (isNaN(timeOnlyDate.getTime())) {
        throw new Error("Invalid start time format");
      }

      // Local wall-clock in the visitor's timezone → JS Date is already the correct UTC instant.
      // (Avoids TimeZoneDB: invalid/expired keys return 400; keys must not live in client bundles.)
      const startTimeUTC = new Date(
        selectedDateObj.getFullYear(),
        selectedDateObj.getMonth(),
        selectedDateObj.getDate(),
        timeOnlyDate.getHours(),
        timeOnlyDate.getMinutes(),
        0,
        0,
      );

      if (isNaN(startTimeUTC.getTime())) {
        throw new Error("Invalid meeting start time");
      }

      const endTimeUTC = addMinutes(startTimeUTC, event.duration);


      // Extract question answers
      const questionAnswers = questions.map((question) => {
        const fieldValue = values[`question_${question.id}`];
        let answer = "";

        if (question.type === "checkbox" && Array.isArray(fieldValue)) {
          answer = fieldValue.join(", ");
        } else {
          answer = (fieldValue as string) || "";
        }

        return {
          question: question.question,
          answer,
        };
      }) || [];


      const title=event.title;
  


      
   
      const payload = {
        guestName: values.guestName,
        guestEmail: values.guestEmail,
      
         additionalInfo: `${values.additionalInfo || ""} (+selectedTime: ${selectedSlot}  selectedDate: ${selectedDate} duration: ${event.duration} title: ${title} guestTz: ${browserTimezone} hostTz: ${hostTimezone} }+)`,
        ...(event.allowGuests && values.guestEmails && { guestEmails: values.guestEmails }),
        eventId: event.id,
        startTime: startTimeUTC.toISOString(),
        endTime: endTimeUTC.toISOString(),
        questionAnswers,
      };

      if (isPending) return;


      mutate(payload, {
        onSuccess: (response: { meeting?: { meetLink?: string } }) => {
          const link = response?.meeting?.meetLink ?? "";
          setMeetLink(link);
          setBookingDetails({
            startTime: startTimeUTC.toISOString(),
            endTime: endTimeUTC.toISOString(),
            guestName: values.guestName,
          });
          void queryClient.invalidateQueries({
            queryKey: ["availbility_single_event", event.id],
          });
          if (link) toast.success("Meeting scheduled! Check your email for the meeting link.");
          handleSuccess(true);
          setTimeout(() => {
            if (event.redirectUrl) {
              window.location.href = event.redirectUrl;
            } else {
              window.location.href = "https://www.schedley.com";
            }
          }, 3000000);
        },
        onError: (error: unknown) => {
          console.error("Booking error:", error);
          let msg = "Failed to schedule event";
          if (error && typeof error === "object" && "message" in error) {
            const m = (error as { message: unknown }).message;
            if (typeof m === "string") msg = m;
            else if (Array.isArray(m)) msg = m.join(", ");
          } else if (error instanceof Error) {
            msg = error.message;
          }
          const status = (error as { response?: { status?: number } }).response?.status;
          void queryClient.invalidateQueries({
            queryKey: ["availbility_single_event", event.id],
          });
          if (status === 409 || /already booked/i.test(msg)) {
            handleSelectSlot(null);
            handleBack();
          }
          toast.error(msg);
        },
      });
    } catch (error) {
      console.error("Error processing datetime:", error);
      toast.error("Invalid date or time selection. Please try again.");
    }
  };

  const handleOpenInvitation = () => {
    // This will open the default email client
    window.location.href = "mailto:";
  };

const formatBookingTime = () => {
  if (!selectedSlot || !selectedDate) return "";
  
  // Convert calendar object to ISO date string
  const selectedDateISO = calendarObjectToISODate(selectedDate);
  if (!selectedDateISO) return "";
  
  // Parse the selected date
  const selectedDateObj = parseISO(selectedDateISO);
  

  const timeOnlyDate = parse(selectedSlot.toString(), "h:mm a", new Date());
  
  // Create a date object with the selected date and parsed time (user's original selection)
  const originalDateTime = new Date(
    selectedDateObj.getFullYear(),
    selectedDateObj.getMonth(),
    selectedDateObj.getDate(),
    timeOnlyDate.getHours(),
    timeOnlyDate.getMinutes(),
    0,
    0
  );
  
  // Calculate end time based on event duration
  const originalEndTime = addMinutes(originalDateTime, event.duration);
  
  // Format the times in user's local timezone (original selection)
  const timeFormat = format(originalDateTime, "h:mmaaa");
  const endTimeFormat = format(originalEndTime, "h:mmaaa");
  const dateFormat = format(originalDateTime, "EEEE, MMMM d, yyyy");
  
  return `${timeFormat} - ${endTimeFormat}, ${dateFormat}`;
};

  // Enhanced function to render question fields based on type with improved styling
  const renderQuestionField = (question: EventQuestion, field: { value: unknown; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; ref: React.RefCallback<unknown> }) => {
    switch (question.type) {
      case "text":
        return (
          <Input 
            placeholder="Enter your answer" 
            className="h-11 sm:h-12 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500"
            {...field} 
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder="Enter your answer"
            className="min-h-20 sm:min-h-24 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
            {...field}
          />
        );

      case "select":
        return (
          <div className="relative">
            <select
              {...field}
              className="flex h-11 sm:h-12 w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-900 appearance-none cursor-pointer transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="" className="text-gray-500">Select an option</option>
              {question.options?.map((option, index) => (
                <option key={index} value={option} className="text-gray-900 py-2">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2 sm:space-y-3 bg-gray-50/50 rounded-lg p-3 sm:p-4 border border-gray-200">
            {question.options?.map((option, index) => (
              <div key={index} className="relative">
                <label
                  htmlFor={`${question.id}_${index}`}
                  className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group p-2 sm:p-3 rounded-lg transition-colors duration-200 hover:bg-white/80 hover:shadow-sm"
                >
                  <div className="relative flex-shrink-0">
                    <input
                      type="radio"
                      id={`${question.id}_${index}`}
                      value={option}
                      checked={field.value === option}
                      onChange={() => field.onChange(option)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 ${
                      field.value === option 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {field.value === option && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900 flex-1 break-words">
                    {option}
                  </span>
                </label>
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2 sm:space-y-3 bg-gray-50/50 rounded-lg p-3 sm:p-4 border border-gray-200">
            {question.options?.map((option, index) => (
              <div key={index} className="relative">
                <label
                  htmlFor={`${question.id}_${index}`}
                  className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group p-2 sm:p-3 rounded-lg transition-colors duration-200 hover:bg-white/80 hover:shadow-sm"
                >
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      id={`${question.id}_${index}`}
                      checked={field.value?.includes(option) || false}
                      onChange={(e) => {
                        const currentValue = field.value || [];
                        if (e.target.checked) {
                          field.onChange([...currentValue, option]);
                        } else {
                          field.onChange(currentValue.filter((val: string) => val !== option));
                        }
                      }}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                      field.value?.includes(option)
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {field.value?.includes(option) && (
                        <CheckIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900 flex-1 break-words">
                    {option}
                  </span>
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <Input 
            placeholder="Enter your answer" 
            className="h-11 sm:h-12 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500"
            {...field} 
          />
        );
    }
  };

  // Check if form has validation errors or if email domain is blocked
  const hasValidationErrors = !form.formState.isValid;
  const isEmailBlocked = watchedEmail && isEmailDomainBlocked(watchedEmail);
  const canSubmit = !hasValidationErrors && !isEmailBlocked && !isPending;

  return (
    <div
      className={cn(
        "w-full flex-1",
        isSuccess
          ? "px-4 py-8 sm:py-8 sm:px-8 pb-12"
          : "px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          isSuccess ? "max-w-[480px]" : "max-w-lg lg:mx-0 lg:max-w-none"
        )}
      >
        {isSuccess ? (
          <div className="w-full">
            {username ? (
              <button
                type="button"
                onClick={() => navigate(`/${username}`)}
                aria-label="Back to all event types"
                className="mb-3 flex h-[43px] w-[43px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(26,26,26,0.1)] bg-clip-padding text-[24px] text-[rgb(0,105,255)]"
              >
                <ArrowLeft className="h-6 w-6" strokeWidth={2} />
              </button>
            ) : null}

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00a878] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                  aria-hidden
                >
                  <CheckIcon className="h-7 w-7 text-white stroke-[2.5]" />
                </div>
              </div>

              <h1 className="text-[1.65rem] sm:text-[1.75rem] font-bold leading-tight tracking-tight text-[#0f3554]">
                You are scheduled
              </h1>

              <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-[#476788] sm:text-base">
                {event.confirmationMessage ||
                  "A calendar invitation has been sent to your email address."}
              </p>

              {meetLink ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(meetLink, "_blank", "noopener,noreferrer")}
                  className="mt-5 flex h-11 items-center gap-2 rounded-full border-2 border-[#0f3554] bg-white px-7 text-[0.9375rem] font-semibold text-[#0f3554] shadow-none hover:bg-[#f4f8fb]"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Open Meeting Link
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleOpenInvitation}
                  className="mt-5 flex h-11 items-center gap-2 rounded-full border-2 border-[#0f3554] bg-white px-7 text-[0.9375rem] font-semibold text-[#0f3554] shadow-none hover:bg-[#f4f8fb]"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Open Invitation
                </Button>
              )}

              <div className="mt-5 w-full rounded-xl border border-[#e8ecf1] bg-white p-5 text-left shadow-[0_1px_2px_rgba(15,53,84,0.06)]">
                <h2 className="text-lg font-bold text-[#0f3554]">{event.title}</h2>
                <ul className="mt-3 space-y-3">
                  <li className="flex gap-3 text-[0.9375rem] text-[#3d5d7a]">
                    <User
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#9aa8b6]"
                      strokeWidth={1.5}
                    />
                    <span className="break-words leading-snug">{event.user.name}</span>
                  </li>
                  <li className="flex gap-3 text-[0.9375rem] text-[#3d5d7a]">
                    <Calendar
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#9aa8b6]"
                      strokeWidth={1.5}
                    />
                    <span className="break-words leading-snug">{formatBookingTime()}</span>
                  </li>
                  {bookingDetails ? (
                    <li className="pl-8 text-[0.875rem] leading-snug text-[#6b7c8f]">
                      Scheduled for {bookingDetails.guestName}
                    </li>
                  ) : null}
                  <li className="flex gap-3 text-[0.9375rem] text-[#3d5d7a]">
                    <Globe
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#9aa8b6]"
                      strokeWidth={1.5}
                    />
                    <span className="break-words leading-snug">
                      {event.timeZoneDisplay || getBrowserTimezone()}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 w-full border-t border-[#e8ecf1] pt-5">
                <p className="text-lg font-semibold text-[#0f3554]">
                  Schedule your own meetings with Schedley
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#476788]">
                  Eliminate the back-and-forth emails for finding time.
                </p>
                <Button
                  asChild
                  className="mt-4 h-11 rounded-full bg-[#006bff] px-8 text-sm font-semibold text-white shadow-none hover:bg-[#0058db]"
                >
                  <a
                    href="https://www.schedley.com/sign-up"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get started free
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Enter Details</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <FormField
                  name="guestName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-semibold text-sm sm:text-base text-[#0a2540] block mb-2">
                        Name *
                      </Label>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          className="h-11 sm:h-12 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  name="guestEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-semibold text-sm sm:text-base text-[#0a2540] block mb-2">
                        Email *
                      </Label>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          type="email"
                          className={`h-11 sm:h-12 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500 ${
                            isEmailBlocked ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                          }`}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                      {isEmailBlocked && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1">
                       
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Dynamic Questions - Enhanced with better styling */}
                {questions.map((question) => (
                  <FormField
                    key={question.id}
                    name={`question_${question.id}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-semibold text-sm sm:text-base text-[#0a2540] block mb-2 sm:mb-3 break-words">
                          {question.question} {question.required && <span className="text-red-500">*</span>}
                        </Label>
                        <FormControl>
                          {renderQuestionField(question, field)}
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Guest Emails Field - only show if allowGuests is true */}
                {event.allowGuests && (
                  <FormField
                    name="guestEmails"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-semibold text-sm sm:text-base text-[#0a2540] block mb-2">
                          Guest Emails (Optional)
                        </Label>
                        <FormControl>
                          <Textarea
                            placeholder="Enter guest email addresses (comma-separated)"
                            className="min-h-20 sm:min-h-24 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                )}

                {/* Additional Info Field */}
                <FormField
                  name="additionalInfo"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-semibold text-sm sm:text-base text-[#0a2540] block mb-2">
                        Additional notes
                      </Label>
                      <FormControl>
                        <Textarea
                          placeholder="Please share anything that will help prepare for our meeting."
                          className="min-h-24 sm:min-h-32 text-sm sm:text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button 
                  disabled={!canSubmit} 
                  type="submit"
                  className={`w-full h-11 sm:h-12 mt-6 sm:mt-8 font-semibold text-sm sm:text-base transition-all duration-200 ${
                    !canSubmit 
                      ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isPending ? <Loader color="white" /> : "Schedule Meeting"}
                </Button>
                
                {/* Show message when email is blocked */}
                {isEmailBlocked && (
                  <p className="text-sm text-red-600 text-center">
            
                  </p>
                )}
              </form>
            </Form>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default BookingForm;