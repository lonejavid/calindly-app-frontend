


import { z } from "zod";
import { addMinutes, parse, format, parseISO } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Fragment, useState, useMemo } from "react";
import { CheckIcon, ExternalLink, User, Calendar, Globe, ChevronDown } from "lucide-react";
import { getPublicAvailabilityByEventIdQueryFn, scheduleMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

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
  questions?: EventQuestion[];
  slug?: string;
  timeSlotInterval?: number;
  timeZoneDisplay?: string;
  confirmationMessage?: string;
  redirectUrl?: string;
  user: EventUser;  
}

type FormData = {
  guestName: string;
  guestEmail: string;
  additionalInfo?: string;
  guestEmails?: string;
  [key: string]: string | string[] | undefined; // For dynamic question fields
};

const BookingForm = (props: { event: Event }) => {
  const { event } = props;
 
  const [meetLink, setMeetLink] = useState("");
  const [bookingDetails, setBookingDetails] = useState<{
    startTime: string;
    endTime: string;
    guestName: string;
  } | null>(null);

  console.log(meetLink);
  
  const { selectedDate, isSuccess, selectedSlot, handleSuccess } = useBookingState();

  console.log("user has selected the slot please checknit ",selectedSlot);

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

  // Helper function to extract domain from email
  const extractDomain = (email: string): string => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return '';
    return email.substring(atIndex);
  };

  // Helper function to check if email domain is blocked
  const isEmailDomainBlocked = (email: string): boolean => {
    if (!event.blockedDomains || !email) return false;
    
    const blockedDomainsArray = Array.isArray(event.blockedDomains) 
      ? event.blockedDomains 
      : [event.blockedDomains];
    
    const emailDomain = extractDomain(email.toLowerCase());
    
    return blockedDomainsArray.some(domain => {
      const normalizedDomain = domain.toLowerCase();
      // Handle domains with or without @ prefix
      const domainToCheck = normalizedDomain.startsWith('@') ? normalizedDomain : '@' + normalizedDomain;
      return emailDomain === domainToCheck;
    });
  };

  // Create dynamic Zod schema and form type
  const { schema } = useMemo(() => {
    const schemaFields: Record<string, z.ZodTypeAny> = {
      guestName: z.string().min(1, "Name is required"),
      additionalInfo: z.string().optional(),
    };

    // Handle blocked domains - could be string or array
    const blockedDomainsArray = Array.isArray(event.blockedDomains) 
      ? event.blockedDomains 
      : event.blockedDomains 
        ? [event.blockedDomains] 
        : [];

    // Enhanced email validation with proper blocked domains checking
    if (blockedDomainsArray.length > 0) {
      // Format blocked domains for display (remove @ if present)
      const displayDomains = blockedDomainsArray.map(domain => 
        domain.startsWith('@') ? domain.substring(1) : domain
      );

      schemaFields.guestEmail = z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .refine(
          (email) => !isEmailDomainBlocked(email),
          {
            message: `This doesn't seem to be your work email.`,
          }
        );
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
    if (event.questions && event.questions.length > 0) {
      event.questions.forEach((question) => {
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
  }, [event]);

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

    if (event.questions && event.questions.length > 0) {
      event.questions.forEach((question) => {
        const fieldName = `question_${question.id}`;
        if (question.type === "checkbox") {
          values[fieldName] = []; // Initialize as empty array for checkboxes
        } else {
          values[fieldName] = "";
        }
      });
    }

    return values;
  }, [event]);

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

  if (availability.length > 0) {
    console.log("Timezone:", availability[0].timezone);
  }

  console.log("Original availability from backend:", availability);

  const onSubmit = (values: FormData) => {
    if (!event.id || !selectedSlot || !selectedDate) {
      console.error("Missing required data:", { eventId: event.id, selectedSlot, selectedDate });
      toast.error("Please select a date and time slot");
      return;
    }

    // Double-check email domain blocking before submission
    if (isEmailDomainBlocked(values.guestEmail)) {
      const blockedDomainsArray = Array.isArray(event.blockedDomains)
        ? event.blockedDomains
        : event.blockedDomains
          ? [event.blockedDomains]
          : [];
      const displayDomains = blockedDomainsArray.map(domain =>
        domain.startsWith('@') ? domain.substring(1) : domain
      );
      toast.error(`Email domain is blocked. Domains ${displayDomains.join(", ")} are not allowed for this event.`);
      return;
    }

    try {
      console.log("Selected slot:", selectedSlot);
      console.log("Selected date:", selectedDate);

      // Get the timezone from availability data
      const eventTimezone = availability.length > 0 ? availability[0].timezone : "UTC";
      console.log("Event timezone:", eventTimezone);

      // Ensure we have valid string values
      if (!selectedDate || !selectedSlot) {
        throw new Error("Missing date or time slot");
      }

      // Parse the selected date (assumes selectedDate is in YYYY-MM-DD format)
      const selectedDateObj = parseISO(selectedDate.toString());
      if (isNaN(selectedDateObj.getTime())) {
        throw new Error("Invalid date format");
      }
      console.log("Parsed selected date:", selectedDateObj);

      // Parse the time slot (e.g., "2:30 pm") and combine with the selected date
      const timeOnlyDate = parse(selectedSlot.toString(), "h:mm a", new Date());
      if (isNaN(timeOnlyDate.getTime())) {
        throw new Error("Invalid start time format");
      }

      // Create a date object with the selected date and parsed time
      const combinedDateTime = new Date(
        selectedDateObj.getFullYear(),
        selectedDateObj.getMonth(),
        selectedDateObj.getDate(),
        timeOnlyDate.getHours(),
        timeOnlyDate.getMinutes(),
        0,
        0
      );

      console.log("Combined date time:", combinedDateTime);

      // Simple timezone conversion approach
      let startTimeUTC: Date;
      
      if (eventTimezone === "UTC") {
        startTimeUTC = combinedDateTime;
      } else {
        try {
          // Create a date string in the format that can be parsed correctly
          const dateString = `${selectedDate}T${timeOnlyDate.getHours().toString().padStart(2, '0')}:${timeOnlyDate.getMinutes().toString().padStart(2, '0')}:00`;
          console.log("Date string:", dateString);
          
          // Parse as if it's in the event timezone
          const tempDate = new Date(dateString);
          
          // Get timezone offset in minutes for the event timezone
          const eventTzOffset = getTimezoneOffset(eventTimezone, tempDate);
          const localTzOffset = tempDate.getTimezoneOffset();
          
          // Convert to UTC
          startTimeUTC = new Date(tempDate.getTime() + (localTzOffset - eventTzOffset) * 60000);
        } catch (tzError) {
          console.warn("Timezone conversion failed, using combined datetime:", tzError);
          startTimeUTC = combinedDateTime;
        }
      }
      
      console.log("Start time UTC:", startTimeUTC);

      // Calculate end time
      const endTimeUTC = addMinutes(startTimeUTC, event.duration);
      console.log("End time UTC:", endTimeUTC);

      // Extract question answers
      const questionAnswers = event.questions?.map((question) => {
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

      console.log("before sendig to the backedn i tested the time info",startTimeUTC);

      const payload = {
        guestName: values.guestName,
        guestEmail: values.guestEmail,
        additionalInfo: values.additionalInfo || "",
        ...(event.allowGuests && values.guestEmails && { guestEmails: values.guestEmails }),
        eventId: event.id,
        startTime: startTimeUTC.toISOString(),
        endTime: endTimeUTC.toISOString(),
        questionAnswers,
      };

      if (isPending) return;

      console.log("Final payload sent to backend:", payload);

      mutate(payload, {
        onSuccess: (response: any) => {
          setMeetLink(response.data.meetLink);
          setBookingDetails({
            startTime: startTimeUTC.toISOString(),
            endTime: endTimeUTC.toISOString(),
            guestName: values.guestName,
          });
          handleSuccess(true);
          setTimeout(() => {
            if (event.redirectUrl) {
              window.location.href = event.redirectUrl;
            } else {
              window.location.href = "https://www.schedley.com";
            }
          }, 300000);
        },
        onError: (error: unknown) => {
          console.error("Booking error:", error);
          toast.error(error.message || "Failed to schedule event");
        },
      });
    } catch (error) {
      console.error("Error processing datetime:", error);
      toast.error("Invalid date or time selection. Please try again.");
    }
  };

  // Helper function to get timezone offset
  const getTimezoneOffset = (timezone: string, date: Date): number => {
    try {
      const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
      return (utcDate.getTime() - tzDate.getTime()) / (1000 * 60);
    } catch (error) {
      console.warn('Failed to get timezone offset, using 0:', error);
      return 0;
    }
  };

  const handleOpenInvitation = () => {
    // This will open the default email client
    window.location.href = "mailto:";
  };

  const formatBookingTime = () => {
    if (!bookingDetails) return "";
    
    const startTime = new Date(bookingDetails.startTime);
    const endTime = new Date(bookingDetails.endTime);
    
    const timeFormat = format(startTime, "h:mmaaa");
    const endTimeFormat = format(endTime, "h:mmaaa");
    const dateFormat = format(startTime, "EEEE, MMMM d, yyyy");
    
    return `${timeFormat} - ${endTimeFormat}, ${dateFormat}`;
  };

  // Enhanced function to render question fields based on type with improved styling
  const renderQuestionField = (question: EventQuestion, field: any) => {
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
    <div className="w-full flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none">
        {isSuccess ? (
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Success Header */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="size-7 sm:size-8 flex items-center justify-center rounded-full bg-green-600">
                <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-2" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                You are scheduled
              </h2>
            </div>

            {/* Confirmation Message */}
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
              {event.confirmationMessage || "A calendar invitation has been sent to your email address."}
            </p>

            {/* Open Invitation Button */}
            <Button 
              variant="outline" 
              onClick={handleOpenInvitation}
              className="mb-4 sm:mb-6 flex items-center gap-2 h-10 sm:h-11 text-sm sm:text-base px-4 sm:px-6"
            >
              <ExternalLink className="w-4 h-4" />
              Open Invitation
            </Button>

            {/* Event Details Card */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-left space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
                {event.title}
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-words">{event.user.name}</span>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{formatBookingTime()}</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-words">{event.timeZoneDisplay || "India Standard Time"}</span>
                </div>
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
                {event.questions?.map((question) => (
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