

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { parseDate, today } from '@internationalized/date';
import { ErrorAlert } from "@/components/ErrorAlert";
import BookingForm from "./_components/booking-form";
import BookingCalendar from "./_components/booking-calendar";
import EventDetails from "./_components/event-details";
import { cn } from '@/lib/utils';
import { Loader } from "@/components/loader";
import { useBookingState } from "@/hooks/use-booking-state";
import PageContainer from "./_components/page-container";
import { getSinglePublicEventBySlugQueryFn } from "@/lib/api";

interface BookingWindow {
  startDate: Date | null;
  endDate: Date | null;
  minimumNotice: number;
  noticeType: 'hours' | 'days';
  windowType: 'rolling' | 'fixed' | 'indefinite';
  dateRangeLimit?: number;
  dateRangeType?: 'calendar days' | 'weeks' | 'months';
}

const UserSingleEventPage = () => {
  const params = useParams();
  const username = params.username as string;
  const slug = params.slug as string;
  const { next, timezone, selectedDate } = useBookingState();

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['public_single_event', username, slug],
    queryFn: () => getSinglePublicEventBySlugQueryFn({ username, slug }),
    select: (response) => ({
      ...response,
      event: {
        ...response.event,
        bookingStartDate: response.event.bookingStartDate 
          ? new Date(response.event.bookingStartDate) 
          : null,
        bookingEndDate: response.event.bookingEndDate 
          ? new Date(response.event.bookingEndDate) 
          : null,
      }
    })
  });

  const event = data?.event;
  console.log("Actual event is that needed to",event);

  const getAvailableDateRange = () => {
    if (!event) return { minDate: null, maxDate: null };

    const now = new Date();
    let minDate = new Date(now);
    let maxDate: Date | null = null;

    // Apply minimum notice period
    if (event.minimumNotice && event.noticeType) {
      if (event.noticeType === 'hours') {
        minDate.setHours(minDate.getHours() + event.minimumNotice);
      } else if (event.noticeType === 'days') {
        minDate.setDate(minDate.getDate() + event.minimumNotice);
      } else if (event.noticeType === 'minutes') {
        minDate.setMinutes(minDate.getMinutes() + event.minimumNotice);
      }
    }

    // Apply booking window constraints
    if (event.bookingWindowType === 'fixed') {
      // Set minimum date based on booking start date
      if (event.bookingStartDate) {
        const startDate = new Date(event.bookingStartDate);
        minDate = new Date(Math.max(minDate.getTime(), startDate.getTime()));
      }

      // CRITICAL: Set maximum date based on booking end date
      if (event.bookingEndDate) {
        maxDate = new Date(event.bookingEndDate);
        // Ensure we don't go beyond the end date regardless of other settings
      }
      // Only apply dateRangeLimit if there's no explicit bookingEndDate
      else if (event.dateRangeLimit && event.dateRangeType) {
        maxDate = new Date(minDate);
        switch (event.dateRangeType) {
          case 'calendar days':
            maxDate.setDate(maxDate.getDate() + event.dateRangeLimit);
            break;
          case 'weeks':
            maxDate.setDate(maxDate.getDate() + event.dateRangeLimit * 7);
            break;
          case 'months':
            maxDate.setMonth(maxDate.getMonth() + event.dateRangeLimit);
            break;
        }
      }
    }
    // Handle rolling or indefinite booking windows
    else if (event.bookingWindowType === 'rolling' || event.bookingWindowType === 'indefinite') {
      if (event.dateRangeLimit && event.dateRangeType) {
        maxDate = new Date(minDate);
        switch (event.dateRangeType) {
          case 'calendar days':
            maxDate.setDate(maxDate.getDate() + event.dateRangeLimit);
            break;
          case 'weeks':
            maxDate.setDate(maxDate.getDate() + event.dateRangeLimit * 7);
            break;
          case 'months':
            maxDate.setMonth(maxDate.getMonth() + event.dateRangeLimit);
            break;
        }
      }
    }

    return { minDate, maxDate };
  };

  // Helper function to format date for calendar (ensures consistent format)
  const formatDateForCalendar = (date: Date) => {
    try {
      // Create a new date in local timezone to avoid timezone issues
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      const year = localDate.getUTCFullYear();
      const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(localDate.getUTCDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;

      return formatted;
    } catch (error) {
      console.error('Error formatting date:', error, date);
      return null;
    }
  };

  // Helper function to normalize dates to start of day for comparison
  const normalizeDate = (date: Date): Date => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const { minDate, maxDate } = getAvailableDateRange();



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[15vh]">
        <Loader size="lg" color="black" />
      </div>
    );
  }

  if (isError || !event) {
    return <ErrorAlert isError={isError} error={error} />;
  }

  return (
    <PageContainer
      className={cn(
        '!min-w-auto sm:!w-auto',
        isFetching ? 'sm:!min-w-[72%]' : '',
        selectedDate && 'sm:!w-[98%]'
      )}
    >
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-stretch p-0 px-1 gap-4">
        <EventDetails
          eventTitle={event.title}
          description={event.description}
          user={event.user}
          eventLocationType={event.locationType}
          username={username}
          duration={event.duration}
          bookingWindow={{
            startDate: event.bookingStartDate,
            endDate: event.bookingEndDate,
            minimumNotice: event.minimumNotice,
            noticeType: event.noticeType,
            windowType: event.bookingWindowType,
            dateRangeLimit: event.dateRangeLimit,
            dateRangeType: event.dateRangeType,
          }}
        />

        <div className="min-w-sm max-w-3xl flex-shrink-0 flex-1">
          {next ? (
            <BookingForm event={event} />
          ) : (
            <>
             

<BookingCalendar
  eventId={event.id}
  minValue={
    minDate ? (() => {
      try {
        const formatted = formatDateForCalendar(minDate);

        const parsed = parseDate(formatted);
       
        return parsed || today(timezone);
      } catch (error) {
        console.error('Error parsing minDate:', error);
        return today(timezone);
      }
    })() : today(timezone)
  }
  maxValue={
    maxDate ? (() => {
      try {
        const formatted = formatDateForCalendar(maxDate);
   
        const parsed = parseDate(formatted);

        return parsed;
      } catch (error) {
        console.error('Error parsing maxDate:', error);
        return undefined;
      }
    })() : undefined
  }
  isDateUnavailable={(date) => {
    try {
      // Convert the calendar date to a proper Date object
      const dateStr = date.toString();
      const dateObj = new Date(dateStr);
      
      // Normalize to start of day for consistent comparison
      const normalizedDate = normalizeDate(dateObj);
      
      // Normalize min and max dates
      const compareMinDate = minDate ? normalizeDate(minDate) : null;
      const compareMaxDate = maxDate ? normalizeDate(maxDate) : null;

      
      // Return true if date should be unavailable (disabled)
      const isUnavailable = (
        (compareMinDate && normalizedDate < compareMinDate) ||
        (compareMaxDate && normalizedDate > compareMaxDate)
      );
      

      
      return isUnavailable;
    } catch (error) {
      console.error('Error in isDateUnavailable:', error, date);
      // If there's an error, make the date unavailable to be safe
      return true;
    }
  }}
/>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default UserSingleEventPage;