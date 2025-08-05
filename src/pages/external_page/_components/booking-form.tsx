import { z } from "zod";
import { addMinutes, parseISO, format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
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
import { CheckIcon, ExternalLink, User, Calendar, Globe } from "lucide-react";
import { scheduleMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

// Type definitions for the event object - matching your EventType
interface EventQuestion {
  id: number;
  question: string;
  type: string;
  required: boolean;
  options: string[];
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
  questions: EventQuestion[];
  slug?: string;
  timeSlotInterval?: number;
  timeZoneDisplay?: string;
  confirmationMessage?: string;
  redirectUrl?: string;
  user: EventUser;  
}

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

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

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

    // Handle email validation with blocked domains
    if (blockedDomainsArray.length > 0) {
      const blockedDomainsRegex = new RegExp(
        `@(${blockedDomainsArray.join("|").replace(/\./g, "\\.")})$`,
        "i"
      );
      schemaFields.guestEmail = z
        .string()
        .email("Invalid email address")
        .refine(
          (email) => !blockedDomainsRegex.test(email),
          {
            message: `Email domains ${blockedDomainsArray.join(", ")} are not allowed.`,
          }
        );
    } else {
      schemaFields.guestEmail = z.string().email("Invalid email address");
    }

    // Add guest emails field if allowed
    if (event.allowGuests) {
      schemaFields.guestEmails = z.string().optional();
    }

    // Add dynamic questions with proper validation based on type
    if (event.questions) {
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
    type DynamicFormType = z.infer<typeof dynamicSchema>;

    return { 
      schema: dynamicSchema, 
      FormType: {} as DynamicFormType 
    };
  }, [event]);

  // Create default values
  const defaultValues = useMemo(() => {
    const values: Record<string, unknown> = {
      guestName: "",
      guestEmail: "",
      additionalInfo: "",
    };

    if (event.allowGuests) {
      values.guestEmails = "";
    }

    if (event.questions) {
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

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur" as const,
  });

  const onSubmit = (values: Record<string, unknown>) => {
    if (!event.id || !selectedSlot || !selectedDate) return;

    const decodedSlotDate = decodeURIComponent(selectedSlot);
    const startTime = parseISO(decodedSlotDate);
    const endTime = addMinutes(startTime, event.duration);

    // Extract question answers with proper formatting for different types
    const questionAnswers = event.questions?.map((question) => {
      const fieldValue = values[`question_${question.id}`];
      let answer = "";
      
      if (question.type === "checkbox" && Array.isArray(fieldValue)) {
        // For checkboxes, join selected options with commas
        answer = fieldValue.join(", ");
      } else {
        // For other types, use the value as is
        answer = fieldValue || "";
      }
      
      return {
        questionId: question.id,
        answer,
      };
    }) || [];

    const payload = {
      guestName: values.guestName,
      guestEmail: values.guestEmail,
      additionalInfo: values.additionalInfo || "",
      ...(event.allowGuests && values.guestEmails && { guestEmails: values.guestEmails }),
      eventId: event.id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      questionAnswers,
    };

    if (isPending) return;
    console.log("payload sennt is ",payload);

    mutate(payload, {
      onSuccess: (response) => {
        setMeetLink(response.data.meetLink);
        setBookingDetails({
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          guestName: values.guestName,
        });
        handleSuccess(true);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to schedule event");
      },
    });
  };

  const handleOpenInvitation = () => {
    // This will open the default email client
    window.location.href = "mailto:";
  };

  const handleRedirect = () => {
    if (event.redirectUrl) {
      window.open(event.redirectUrl, '_blank');
    }
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

  // Enhanced function to render question fields based on type
  const renderQuestionField = (question: EventQuestion, field: any) => {
    switch (question.type) {
      case "text":
        return (
          <Input 
            placeholder="Enter your answer" 
            {...field} 
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder="Enter your answer"
            className="min-h-24"
            {...field}
          />
        );

      case "select":
        return (
          <select
            {...field}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select an option</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${question.id}_${index}`}
                  value={option}
                  checked={field.value === option}
                  onChange={() => field.onChange(option)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label
                  htmlFor={`${question.id}_${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
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
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor={`${question.id}_${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <Input 
            placeholder="Enter your answer" 
            {...field} 
          />
        );
    }
  };

  return (
    <div className="max-w-md pt-6 px-6">
      {isSuccess ? (
        <div className="text-center space-y-6">
          {/* Success Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="size-8 flex items-center justify-center rounded-full bg-green-600">
              <CheckIcon className="w-5 h-5 text-white stroke-2" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              You are scheduled
            </h2>
          </div>

          {/* Confirmation Message */}
          <p className="text-gray-600 mb-6">
            {event.confirmationMessage || "A calendar invitation has been sent to your email address."}
          </p>

          {/* Open Invitation Button */}
          <Button 
            variant="outline" 
            onClick={handleOpenInvitation}
            className="mb-6 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Invitation
          </Button>

          {/* Event Details Card */}
          <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">
              {event.title}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{event.user.name}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatBookingTime()}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{event.timeZoneDisplay || "India Standard Time"}</span>
              </div>
            </div>
          </div>

          {/* Redirect Button - Only show if redirectUrl exists */}
          {event.redirectUrl && (
            <Button 
              onClick={handleRedirect}
              className="w-full mt-4"
            >
              Continue
            </Button>
          )}
        </div>
      ) : (
        <Fragment>
          <h2 className="text-xl font-bold mb-6">Enter Details</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                name="guestName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-semibold !text-base text-[#0a2540]">
                      Name *
                    </Label>
                    <FormControl className="mt-1">
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                name="guestEmail"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-semibold !text-base text-[#0a2540]">
                      Email *
                    </Label>
                    <FormControl className="mt-1">
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic Questions - Enhanced to handle all types */}
              {event.questions?.map((question) => (
                <FormField
                  key={question.id}
                  name={`question_${question.id}`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-semibold !text-base text-[#0a2540]">
                        {question.question} {question.required && "*"}
                      </Label>
                      <FormControl className="mt-1">
                        {renderQuestionField(question, field)}
                      </FormControl>
                      <FormMessage />
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
                      <Label className="font-semibold !text-base text-[#0a2540]">
                        Guest Emails (Optional)
                      </Label>
                      <FormControl className="mt-1">
                        <Textarea
                          placeholder="Enter guest email addresses (comma-separated)"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                    <Label className="font-semibold !text-base text-[#0a2540] ">
                      Additional notes
                    </Label>
                    <FormControl className="mt-1">
                      <Textarea
                        placeholder="Please share anything that will help prepare for our meeting."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button disabled={isPending} type="submit">
                {isPending ? <Loader color="white" /> : "Schedule Meeting"}
              </Button>
            </form>
          </Form>
        </Fragment>
      )}
    </div>
  );
};

export default BookingForm;








// import { z } from "zod";
// import { addMinutes, parseISO, format } from "date-fns";
// import { useMutation } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { useBookingState } from "@/hooks/use-booking-state";
// import { Fragment, useState, useMemo } from "react";
// import { CheckIcon, ExternalLink, User, Calendar,  Globe } from "lucide-react";
// import { scheduleMeetingMutationFn } from "@/lib/api";
// import { toast } from "sonner";
// import { Loader } from "@/components/loader";

// // Type definitions for the event object - matching your EventType
// interface EventQuestion {
//   id: number;
//   question: string;
//   type: string;
//   required: boolean;
//   options: string[];
// }

// interface EventUser {
//   id: string;
//   name: string;
//   imageUrl: string | null;
// }

// interface Event {
//   id: string;
//   title: string;
//   accessSpecifier?: string;
//   description: string;
//   locationType: string;
//   allowGuests?: boolean;
//   blockedDomains?: string[] | string; // Handle both array and string
//   bufferAfter?: number;
//   bufferBefore?: number;
//   duration: number;
//   maxBookingsPerDay?: number | null;
//   questions: EventQuestion[];
//   slug?: string;
//   timeSlotInterval?: number;
//   timeZoneDisplay?: string;
//   confirmationMessage?: string;
//   redirectUrl?: string;
//   user: EventUser;  
// }

// const BookingForm = (props: { event: Event }) => {
//   const { event } = props;
//   const [meetLink, setMeetLink] = useState("");
//   const [bookingDetails, setBookingDetails] = useState<{
//     startTime: string;
//     endTime: string;
//     guestName: string;
//   } | null>(null);
// console.log(meetLink);
//   const { selectedDate, isSuccess, selectedSlot, handleSuccess } =
//     useBookingState();

//   const { mutate, isPending } = useMutation({
//     mutationFn: scheduleMeetingMutationFn,
//   });

//   // Create dynamic Zod schema and form type
//   const { schema } = useMemo(() => {
//     const schemaFields: Record<string, z.ZodTypeAny> = {
//       guestName: z.string().min(1, "Name is required"),
//       additionalInfo: z.string().optional(),
//     };

//     // Handle blocked domains - could be string or array
//     const blockedDomainsArray = Array.isArray(event.blockedDomains) 
//       ? event.blockedDomains 
//       : event.blockedDomains 
//         ? [event.blockedDomains] 
//         : [];

//     // Handle email validation with blocked domains
//     if (blockedDomainsArray.length > 0) {
//       const blockedDomainsRegex = new RegExp(
//         `@(${blockedDomainsArray.join("|").replace(/\./g, "\\.")})$`,
//         "i"
//       );
//       schemaFields.guestEmail = z
//         .string()
//         .email("Invalid email address")
//         .refine(
//           (email) => !blockedDomainsRegex.test(email),
//           {
//             message: `Email domains ${blockedDomainsArray.join(", ")} are not allowed.`,
//           }
//         );
//     } else {
//       schemaFields.guestEmail = z.string().email("Invalid email address");
//     }

//     // Add guest emails field if allowed
//     if (event.allowGuests) {
//       schemaFields.guestEmails = z.string().optional();
//     }

//     // Add dynamic questions
//     if (event.questions) {
//       event.questions.forEach((question) => {
//         const fieldName = `question_${question.id}`;
//         if (question.required) {
//           schemaFields[fieldName] = z.string().min(1, `${question.question} is required`);
//         } else {
//           schemaFields[fieldName] = z.string().optional();
//         }
//       });
//     }

//     const dynamicSchema = z.object(schemaFields);
//     type DynamicFormType = z.infer<typeof dynamicSchema>;

//     return { 
//       schema: dynamicSchema, 
//       FormType: {} as DynamicFormType 
//     };
//   }, [event]);

//   // Create default values
//   const defaultValues = useMemo(() => {
//     const values: Record<string, string> = {
//       guestName: "",
//       guestEmail: "",
//       additionalInfo: "",
//     };

//     if (event.allowGuests) {
//       values.guestEmails = "";
//     }

//     if (event.questions) {
//       event.questions.forEach((question) => {
//         values[`question_${question.id}`] = "";
//       });
//     }

//     return values;
//   }, [event]);

//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues,
//     mode: "onBlur" as const,
//   });

//   const onSubmit = (values: Record<string, string>) => {
//     if (!event.id || !selectedSlot || !selectedDate) return;

//     const decodedSlotDate = decodeURIComponent(selectedSlot);
//     const startTime = parseISO(decodedSlotDate);
//     const endTime = addMinutes(startTime, event.duration);

//     // Extract question answers
//     const questionAnswers = event.questions?.map((question) => ({
//       questionId: question.id,
//       answer: values[`question_${question.id}`] || "",
//     })) || [];

//     const payload = {
//       guestName: values.guestName,
//       guestEmail: values.guestEmail,
//       additionalInfo: values.additionalInfo || "",
//       ...(event.allowGuests && values.guestEmails && { guestEmails: values.guestEmails }),
//       eventId: event.id,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       questionAnswers,
//     };

//     if (isPending) return;

//     mutate(payload, {
//       onSuccess: (response) => {
//         setMeetLink(response.data.meetLink);
//         setBookingDetails({
//           startTime: startTime.toISOString(),
//           endTime: endTime.toISOString(),
//           guestName: values.guestName,
//         });
//         handleSuccess(true);
//       },
//       onError: (error) => {
//         toast.error(error.message || "Failed to schedule event");
//       },
//     });
//   };

//   const handleOpenInvitation = () => {
//     // This will open the default email client
//     window.location.href = "mailto:";
//   };

//   const handleRedirect = () => {
//     if (event.redirectUrl) {
//       window.open(event.redirectUrl, '_blank');
//     }
//   };

//   const formatBookingTime = () => {
//     if (!bookingDetails) return "";
    
//     const startTime = new Date(bookingDetails.startTime);
//     const endTime = new Date(bookingDetails.endTime);
    
//     const timeFormat = format(startTime, "h:mmaaa");
//     const endTimeFormat = format(endTime, "h:mmaaa");
//     const dateFormat = format(startTime, "EEEE, MMMM d, yyyy");
    
//     return `${timeFormat} - ${endTimeFormat}, ${dateFormat}`;
//   };

//   return (
//     <div className="max-w-md pt-6 px-6">
//       {isSuccess ? (
//         <div className="text-center space-y-6">
//           {/* Success Header */}
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <div className="size-8 flex items-center justify-center rounded-full bg-green-600">
//               <CheckIcon className="w-5 h-5 text-white stroke-2" />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-900">
//               You are scheduled
//             </h2>
//           </div>

//           {/* Confirmation Message */}
//           <p className="text-gray-600 mb-6">
//             {event.confirmationMessage || "A calendar invitation has been sent to your email address."}
//           </p>

//           {/* Open Invitation Button */}
//           <Button 
//             variant="outline" 
//             onClick={handleOpenInvitation}
//             className="mb-6 flex items-center gap-2"
//           >
//             <ExternalLink className="w-4 h-4" />
//             Open Invitation
//           </Button>

//           {/* Event Details Card */}
//           <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
//             <h3 className="font-semibold text-lg text-gray-900">
//               {event.title}
//             </h3>
            
//             <div className="space-y-3">
//               <div className="flex items-center gap-3 text-sm text-gray-600">
//                 <User className="w-4 h-4" />
//                 <span>{event.user.name}</span>
//               </div>
              
//               <div className="flex items-center gap-3 text-sm text-gray-600">
//                 <Calendar className="w-4 h-4" />
//                 <span>{formatBookingTime()}</span>
//               </div>
              
//               <div className="flex items-center gap-3 text-sm text-gray-600">
//                 <Globe className="w-4 h-4" />
//                 <span>{event.timeZoneDisplay || "India Standard Time"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Redirect Button - Only show if redirectUrl exists */}
//           {event.redirectUrl && (
//             <Button 
//               onClick={handleRedirect}
//               className="w-full mt-4"
//             >
//               Continue
//             </Button>
//           )}
//         </div>
//       ) : (
//         <Fragment>
//           <h2 className="text-xl font-bold mb-6">Enter Details</h2>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               {/* Name Field */}
//               <FormField
//                 name="guestName"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label className="font-semibold !text-base text-[#0a2540]">
//                       Name *
//                     </Label>
//                     <FormControl className="mt-1">
//                       <Input placeholder="Enter your name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Email Field */}
//               <FormField
//                 name="guestEmail"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label className="font-semibold !text-base text-[#0a2540]">
//                       Email *
//                     </Label>
//                     <FormControl className="mt-1">
//                       <Input placeholder="Enter your email" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Dynamic Questions */}
//               {event.questions?.map((question) => (
//                 <FormField
//                   key={question.id}
//                   name={`question_${question.id}`}
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem>
//                       <Label className="font-semibold !text-base text-[#0a2540]">
//                         {question.question} {question.required && "*"}
//                       </Label>
//                       <FormControl className="mt-1">
//                         {question.type === "text" ? (
//                           <Input 
//                             placeholder={`Enter your answer`} 
//                             {...field} 
//                           />
//                         ) : (
//                           <Textarea
//                             placeholder={`Enter your answer`}
//                             className="min-h-24"
//                             {...field}
//                           />
//                         )}
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}

//               {/* Guest Emails Field - only show if allowGuests is true */}
//               {event.allowGuests && (
//                 <FormField
//                   name="guestEmails"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem>
//                       <Label className="font-semibold !text-base text-[#0a2540]">
//                         Guest Emails (Optional)
//                       </Label>
//                       <FormControl className="mt-1">
//                         <Textarea
//                           placeholder="Enter guest email addresses (comma-separated)"
//                           className="min-h-24"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}

//               {/* Additional Info Field */}
//               <FormField
//                 name="additionalInfo"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label className="font-semibold !text-base text-[#0a2540] ">
//                       Additional notes
//                     </Label>
//                     <FormControl className="mt-1">
//                       <Textarea
//                         placeholder="Please share anything that will help prepare for our meeting."
//                         className="min-h-32"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Submit Button */}
//               <Button disabled={isPending} type="submit">
//                 {isPending ? <Loader color="white" /> : "Schedule Meeting"}
//               </Button>
//             </form>
//           </Form>
//         </Fragment>
//       )}
//     </div>
//   );
// };

// export default BookingForm;

