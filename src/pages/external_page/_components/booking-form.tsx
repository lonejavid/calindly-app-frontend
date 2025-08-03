import { z } from "zod";
import { addMinutes, parseISO } from "date-fns";
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
import { CheckIcon, ExternalLink } from "lucide-react";
import { scheduleMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

// Type definitions for the event object
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
  accessSpecifier: string;
  description: string;
  locationType: string;
  allowGuests: boolean;
  blockedDomains: string[];
  bufferAfter: number;
  bufferBefore: number;
  duration: number;
  maxBookingsPerDay: number | null;
  questions: EventQuestion[];
  slug: string;
  timeSlotInterval: number;
  timeZoneDisplay: string;
  user: EventUser;
}

const BookingForm = (props: { event: Event }) => {
  const { event } = props;
  const [meetLink, setMeetLink] = useState("");

  const { selectedDate, isSuccess, selectedSlot, handleSuccess } =
    useBookingState();

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

  // Create dynamic Zod schema based on event data
  const bookingFormSchema = useMemo(() => {
    const baseSchema = {
      guestName: z.string().min(1, "Name is required"),
      guestEmail: z.string().email("Invalid email address"),
      additionalInfo: z.string().optional(),
    };

    // Add email domain validation if blocked domains exist
    if (event.blockedDomains && event.blockedDomains.length > 0) {
      const blockedDomainsRegex = new RegExp(
        `@(${event.blockedDomains.join("|").replace(/\./g, "\\.")})$`,
        "i"
      );
      baseSchema.guestEmail = baseSchema.guestEmail.refine(
        (email) => !blockedDomainsRegex.test(email),
        {
          message: `Email domains ${event.blockedDomains.join(", ")} are not allowed.`,
        }
      );
    }

    // Add guest emails field if allowed
    if (event.allowGuests) {
      (baseSchema as any).guestEmails = z.string().optional();
    }

    // Add dynamic questions
    event.questions?.forEach((question) => {
      const fieldName = `question_${question.id}`;
      if (question.required) {
        (baseSchema as any)[fieldName] = z.string().min(1, `${question.question} is required`);
      } else {
        (baseSchema as any)[fieldName] = z.string().optional();
      }
    });

    return z.object(baseSchema);
  }, [event]);

  type BookingFormData = z.infer<typeof bookingFormSchema>;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      additionalInfo: "",
      ...(event.allowGuests && { guestEmails: "" }),
      ...event.questions?.reduce((acc, question) => {
        acc[`question_${question.id}`] = "";
        return acc;
      }, {} as Record<string, string>),
    },
    mode: "onBlur",
  });

  const onSubmit = (values: BookingFormData) => {
    if (!event.id || !selectedSlot || !selectedDate) return;

    const decodedSlotDate = decodeURIComponent(selectedSlot);
    const startTime = parseISO(decodedSlotDate);
    const endTime = addMinutes(startTime, event.duration);

    // Extract question answers
    const questionAnswers = event.questions?.map((question) => ({
      questionId: question.id,
      answer: values[`question_${question.id}` as keyof BookingFormData] || "",
    })) || [];

    const payload = {
      guestName: values.guestName,
      guestEmail: values.guestEmail,
      additionalInfo: values.additionalInfo,
      ...(event.allowGuests && { guestEmails: values.guestEmails }),
      eventId: event.id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      questionAnswers,
    };

    if (isPending) return;

    mutate(payload, {
      onSuccess: (response) => {
        setMeetLink(response.data.meetLink);
        handleSuccess(true);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to schedule event");
      },
    });
  };

  return (
    <div className="max-w-md pt-6 px-6">
      {isSuccess ? (
        <div className="text-center pt-4">
          <h2 className="text-2xl flex items-center justify-center gap-2 font-bold mb-4">
            <span className="size-5 flex items-center justify-center rounded-full bg-green-700">
              <CheckIcon className="w-3 h-3 !stroke-4 text-white " />
            </span>
            You are scheduled
          </h2>
          <p className="mb-4">Your meeting has been scheduled successfully.</p>
          <p className="flex items-center text-sm justify-center gap-2 mb-4">
            Copy link:
            <span className="font-normal text-primary">{meetLink}</span>
          </p>
          <a href={meetLink} target="_blank" rel="noopener noreferrer">
            <Button>
              <ExternalLink className="w-4 h-4" />
              <span>Join Google Meet</span>
            </Button>
          </a>
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

              {/* Dynamic Questions */}
              {event.questions?.map((question) => (
                <FormField
                  key={question.id}
                  name={`question_${question.id}` as any}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-semibold !text-base text-[#0a2540]">
                        {question.question} {question.required && "*"}
                      </Label>
                      <FormControl className="mt-1">
                        {question.type === "text" ? (
                          <Input 
                            placeholder={`Enter your answer for: ${question.question}`} 
                            {...field} 
                          />
                        ) : (
                          <Textarea
                            placeholder={`Enter your answer for: ${question.question}`}
                            className="min-h-24"
                            {...field}
                          />
                        )}
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



