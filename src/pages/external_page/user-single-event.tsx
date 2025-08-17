

// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import { parseDate, today } from '@internationalized/date';
// import { ErrorAlert } from "@/components/ErrorAlert";
// import BookingForm from "./_components/booking-form";
// import BookingCalendar from "./_components/booking-calendar";
// import EventDetails from "./_components/event-details";
// import { cn } from '@/lib/utils';
// import { Loader } from "@/components/loader";
// import { useBookingState } from "@/hooks/use-booking-state";
// import PageContainer from "./_components/page-container";
// import { getSinglePublicEventBySlugQueryFn } from "@/lib/api";

// interface BookingWindow {
//   startDate: Date | null;
//   endDate: Date | null;
//   minimumNotice: number;
//   noticeType: 'hours' | 'days';
//   windowType: 'rolling' | 'fixed' | 'indefinite';
//   dateRangeLimit?: number;
//   dateRangeType?: 'calendar days' | 'weeks' | 'months';
// }

// const UserSingleEventPage = () => {
//   const params = useParams();
//   const username = params.username as string;
//   const slug = params.slug as string;
//   const { next, timezone, selectedDate } = useBookingState();

//   const { data, isFetching, isLoading, isError, error } = useQuery({
//     queryKey: ['public_single_event', username, slug],
//     queryFn: () => getSinglePublicEventBySlugQueryFn({ username, slug }),
//     select: (response) => ({
//       ...response,
//       event: {
//         ...response.event,
//         bookingStartDate: response.event.bookingStartDate 
//           ? new Date(response.event.bookingStartDate) 
//           : null,
//         bookingEndDate: response.event.bookingEndDate 
//           ? new Date(response.event.bookingEndDate) 
//           : null,
//       }
//     })
//   });

//   const event = data?.event;

//   const getAvailableDateRange = () => {
//     if (!event) return { minDate: null, maxDate: null };

//     const now = new Date();
//     let minDate = new Date(now);
//     let maxDate: Date | null = null;

//     // Apply minimum notice period
//     if (event.minimumNotice && event.noticeType) {
//       if (event.noticeType === 'hours') {
//         minDate.setHours(minDate.getHours() + event.minimumNotice);
//       } else {
//         minDate.setDate(minDate.getDate() + event.minimumNotice);
//       }
//     }

//     // Apply booking window constraints
//     if (event.bookingWindowType === 'fixed') {
//       // Set minimum date based on booking start date
//       if (event.bookingStartDate) {
//         const startDate = new Date(event.bookingStartDate);
//         minDate = new Date(Math.max(minDate.getTime(), startDate.getTime()));
//       }

//       // CRITICAL: Set maximum date based on booking end date
//       if (event.bookingEndDate) {
//         maxDate = new Date(event.bookingEndDate);
//         // Ensure we don't go beyond the end date regardless of other settings
//       }
//       // Only apply dateRangeLimit if there's no explicit bookingEndDate
//       else if (event.dateRangeLimit && event.dateRangeType) {
//         maxDate = new Date(minDate);
//         switch (event.dateRangeType) {
//           case 'calendar days':
//             maxDate.setDate(maxDate.getDate() + event.dateRangeLimit);
//             break;
//           case 'weeks':
//             maxDate.setDate(maxDate.getDate() + event.dateRangeLimit * 7);
//             break;
//           case 'months':
//             maxDate.setMonth(maxDate.getMonth() + event.dateRangeLimit);
//             break;
//         }
//       }
//     }
//     // Handle rolling or indefinite booking windows
//     else if (event.bookingWindowType === 'rolling' || event.bookingWindowType === 'indefinite') {
//       if (event.dateRangeLimit && event.dateRangeType) {
//         maxDate = new Date(minDate);
//         switch (event.dateRangeType) {
//           case 'calendar days':
//             maxDate.setDate(maxDate.getDate() + event.dateRangeLimit);
//             break;
//           case 'weeks':
//             maxDate.setDate(maxDate.getDate() + event.dateRangeLimit * 7);
//             break;
//           case 'months':
//             maxDate.setMonth(maxDate.getMonth() + event.dateRangeLimit);
//             break;
//         }
//       }
//     }

//     return { minDate, maxDate };
//   };

//   // Helper function to format date for calendar
//   const formatDateForCalendar = (date: Date) => {
//     try {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const formatted = `${year}-${month}-${day}`;
//       console.log('Formatting date:', date, 'to:', formatted);
//       return formatted;
//     } catch (error) {
//       console.error('Error formatting date:', error, date);
//       return null;
//     }
//   };

//   const { minDate, maxDate } = getAvailableDateRange();

//   // Debug logging
//   console.log('Event data:', {
//     bookingStartDate: event?.bookingStartDate,
//     bookingEndDate: event?.bookingEndDate,
//     bookingWindowType: event?.bookingWindowType,
//     minimumNotice: event?.minimumNotice,
//     noticeType: event?.noticeType,
//     bookingEndDateType: typeof event?.bookingEndDate,
//     bookingEndDateValue: event?.bookingEndDate?.toString(),
//     isValidEndDate: event?.bookingEndDate instanceof Date
//   });
//   console.log('Calculated date range:', { minDate, maxDate });
//   console.log('Parsed dates for calendar:', {
//     minValue: minDate ? parseDate(minDate.toISOString().split('T')[0]) : today(timezone),
//     maxValue: maxDate ? parseDate(maxDate.toISOString().split('T')[0]) : undefined
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[15vh]">
//         <Loader size="lg" color="black" />
//       </div>
//     );
//   }

//   if (isError || !event) {
//     return <ErrorAlert isError={isError} error={error} />;
//   }

//   return (
//     <PageContainer
//       className={cn(
//         '!min-w-auto sm:!w-auto',
//         isFetching ? 'sm:!min-w-[72%]' : '',
//         selectedDate && 'sm:!w-[98%]'
//       )}
//     >
//       <div className="w-full flex flex-col lg:flex-row items-stretch justify-stretch p-0 px-1 gap-4">
//         <EventDetails
//           eventTitle={event.title}
//           description={event.description}
//           user={event.user}
//           eventLocationType={event.locationType}
//           username={username}
//           duration={event.duration}
//           bookingWindow={{
//             startDate: event.bookingStartDate,
//             endDate: event.bookingEndDate,
//             minimumNotice: event.minimumNotice,
//             noticeType: event.noticeType,
//             windowType: event.bookingWindowType,
//             dateRangeLimit: event.dateRangeLimit,
//             dateRangeType: event.dateRangeType,
//           }}
//         />

//         <div className="min-w-sm max-w-3xl flex-shrink-0 flex-1">
//           {next ? (
//             <BookingForm event={event} />
//           ) : (
//             <>
//               <BookingCalendar
//                 eventId={event.id}
//                 minValue={
//                   minDate ? (() => {
//                     try {
//                       const formatted = formatDateForCalendar(minDate);
//                       console.log('Attempting to parse minDate:', formatted);
//                       const parsed = parseDate(formatted);
//                       console.log('Parsed minDate result:', parsed);
//                       return parsed || today(timezone);
//                     } catch (error) {
//                       console.error('Error parsing minDate:', error);
//                       return today(timezone);
//                     }
//                   })() : today(timezone)
//                 }
//                 maxValue={
//                   maxDate ? (() => {
//                     try {
//                       const formatted = formatDateForCalendar(maxDate);
//                       console.log('Attempting to parse maxDate:', formatted);
//                       const parsed = parseDate(formatted);
//                       console.log('Parsed maxDate result:', parsed);
//                       return parsed;
//                     } catch (error) {
//                       console.error('Error parsing maxDate:', error);
//                       return undefined;
//                     }
//                   })() : undefined
//                 }
//                 isDateUnavailable={(date) => {
//                   const dateObj = new Date(date.toString());
//                   dateObj.setHours(0, 0, 0, 0);
                  
//                   const compareMinDate = minDate ? new Date(minDate) : null;
//                   const compareMaxDate = maxDate ? new Date(maxDate) : null;
                  
//                   if (compareMinDate) compareMinDate.setHours(0, 0, 0, 0);
//                   if (compareMaxDate) compareMaxDate.setHours(0, 0, 0, 0);

//                   return (
//                     (compareMinDate && dateObj < compareMinDate) ||
//                     (compareMaxDate && dateObj > compareMaxDate)
//                   );
//                 }}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </PageContainer>
//   );
// };

// export default UserSingleEventPage;






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
import { useMemo } from 'react';

interface BookingWindow {
  startDate: Date | null;
  endDate: Date | null;
  minimumNotice: number;
  noticeType: 'hours' | 'days';
  windowType: 'rolling' | 'fixed' | 'indefinite';
  dateRangeLimit?: number;
  dateRangeType?: 'calendar days' | 'weeks' | 'months';
}

// Helper function to detect user timezone
const detectUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
};

// Helper function to convert UTC date to local timezone
const convertUTCDateToLocal = (utcDate: Date | string | null, timezone: string): Date | null => {
  if (!utcDate) {
    console.log('⚠️ No date provided for conversion');
    return null;
  }
  
  try {
    // Ensure we have a Date object
    const dateObj = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
    
    if (isNaN(dateObj.getTime())) {
      console.error('❌ Invalid date provided:', utcDate);
      return null;
    }

    // Log the conversion process
    console.log(`🌍 Converting date: ${dateObj.toISOString()} UTC → Local time in ${timezone}`);
    
    // The date object already represents the correct time, just return it
    // The browser will automatically display it in the user's timezone
    return dateObj;
    
  } catch (error) {
    console.error('❌ Error converting UTC date to local:', error);
    return null;
  }
};

// Helper function to convert UTC time string to local time
const convertUTCTimeToLocalTime = (utcTimeString: string, timezone: string, referenceDate?: Date): Date | null => {
  if (!utcTimeString) return null;
  
  try {
    // Parse time string (assuming format like "14:30" or "14:30:00")
    const timeParts = utcTimeString.split(':').map(Number);
    const hours = timeParts[0] || 0;
    const minutes = timeParts[1] || 0;
    const seconds = timeParts[2] || 0;
    
    // Use reference date or today
    const baseDate = referenceDate || new Date();
    
    // Create UTC date with the time
    const utcDate = new Date(Date.UTC(
      baseDate.getUTCFullYear(),
      baseDate.getUTCMonth(),
      baseDate.getUTCDate(),
      hours,
      minutes,
      seconds
    ));
    
    // Convert to local timezone by creating a new date that represents the local time
    const localTime = new Date(utcDate.toLocaleString('en-US', { timeZone: timezone }));
    
    console.log(`🕐 Converting time: ${utcTimeString} UTC → ${localTime.toLocaleTimeString()} ${timezone}`);
    
    return localTime;
  } catch (error) {
    console.error('Error converting UTC time to local:', error);
    return null;
  }
};

const UserSingleEventPage = () => {
  const params = useParams();
  const username = params.username as string;
  const slug = params.slug as string;
  const { next, timezone, selectedDate } = useBookingState();

  // Get user's timezone
  const userTimezone = useMemo(() => timezone || detectUserTimezone(), [timezone]);

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['public_single_event', username, slug],
    queryFn: () => getSinglePublicEventBySlugQueryFn({ username, slug }),
    select: (response) => {
      console.log('🔍 FULL API RESPONSE:', response);
      console.log('🔍 Raw event data from API:', response.event);
      console.log('🔍 Event keys:', Object.keys(response.event || {}));
      
      // Check for different possible field names
      console.log('🔍 Checking booking date fields:');
      console.log('  - bookingStartDate:', response.event?.bookingStartDate);
      console.log('  - booking_start_date:', response.event?.booking_start_date);
      console.log('  - startDate:', response.event?.startDate);
      console.log('  - start_date:', response.event?.start_date);
      console.log('  - bookingEndDate:', response.event?.bookingEndDate);
      console.log('  - booking_end_date:', response.event?.booking_end_date);
      console.log('  - endDate:', response.event?.endDate);
      console.log('  - end_date:', response.event?.end_date);
      console.log('  - bookingWindowType:', response.event?.bookingWindowType);
      console.log('  - booking_window_type:', response.event?.booking_window_type);
      
      if (!response.event) {
        console.error('❌ No event data received from API');
        return response;
      }

      // Try to identify the correct field names and convert them
      const eventData = response.event;
      
      const convertedEvent = {
        ...eventData,
        // Try different possible field names for booking start date
        bookingStartDate: eventData.bookingStartDate 
          ? convertUTCDateToLocal(eventData.bookingStartDate, userTimezone)
          : eventData.booking_start_date 
            ? convertUTCDateToLocal(eventData.booking_start_date, userTimezone)
            : eventData.startDate
              ? convertUTCDateToLocal(eventData.startDate, userTimezone)
              : eventData.start_date
                ? convertUTCDateToLocal(eventData.start_date, userTimezone)
                : null,
        
        // Try different possible field names for booking end date
        bookingEndDate: eventData.bookingEndDate 
          ? convertUTCDateToLocal(eventData.bookingEndDate, userTimezone)
          : eventData.booking_end_date 
            ? convertUTCDateToLocal(eventData.booking_end_date, userTimezone)
            : eventData.endDate
              ? convertUTCDateToLocal(eventData.endDate, userTimezone)
              : eventData.end_date
                ? convertUTCDateToLocal(eventData.end_date, userTimezone)
                : null,
        
        // Handle other possible field name variations
        bookingWindowType: eventData.bookingWindowType || eventData.booking_window_type || undefined,
        minimumNotice: eventData.minimumNotice || eventData.minimum_notice || undefined,
        noticeType: eventData.noticeType || eventData.notice_type || undefined,
        dateRangeLimit: eventData.dateRangeLimit || eventData.date_range_limit || undefined,
        dateRangeType: eventData.dateRangeType || eventData.date_range_type || undefined,
        
        // Convert other date fields if they exist
        createdAt: eventData.createdAt 
          ? convertUTCDateToLocal(eventData.createdAt, userTimezone)
          : eventData.created_at
            ? convertUTCDateToLocal(eventData.created_at, userTimezone)
            : null,
        updatedAt: eventData.updatedAt 
          ? convertUTCDateToLocal(eventData.updatedAt, userTimezone)
          : eventData.updated_at
            ? convertUTCDateToLocal(eventData.updated_at, userTimezone)
            : null,
      };

      console.log('✨ Converted event data (Local times):', convertedEvent);
      console.log('🌍 Using timezone:', userTimezone);
      console.log('🔍 Final booking dates:', {
        bookingStartDate: convertedEvent.bookingStartDate,
        bookingEndDate: convertedEvent.bookingEndDate,
        bookingWindowType: convertedEvent.bookingWindowType
      });
      
      return {
        ...response,
        event: convertedEvent
      };
    }
  });

  const event = data?.event;

  const getAvailableDateRange = () => {
    if (!event) return { minDate: null, maxDate: null };

    console.log('📅 Calculating available date range...');
    console.log('Event booking dates (already converted to local):', {
      bookingStartDate: event.bookingStartDate,
      bookingEndDate: event.bookingEndDate,
      bookingWindowType: event.bookingWindowType
    });

    const now = new Date();
    let minDate = new Date(now);
    let maxDate: Date | null = null;

    // Apply minimum notice period
    if (event.minimumNotice && event.noticeType) {
      if (event.noticeType === 'hours') {
        minDate.setHours(minDate.getHours() + event.minimumNotice);
      } else {
        minDate.setDate(minDate.getDate() + event.minimumNotice);
      }
    }

    console.log('⏰ After applying minimum notice:', { minDate });

    // Apply booking window constraints
    if (event.bookingWindowType === 'fixed') {
      // Set minimum date based on booking start date
      if (event.bookingStartDate) {
        const startDate = new Date(event.bookingStartDate);
        minDate = new Date(Math.max(minDate.getTime(), startDate.getTime()));
        console.log('📍 Applied booking start date constraint:', { minDate });
      }

      // CRITICAL: Set maximum date based on booking end date
      if (event.bookingEndDate) {
        maxDate = new Date(event.bookingEndDate);
        console.log('📍 Applied booking end date constraint:', { maxDate });
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
        console.log('📍 Applied date range limit:', { maxDate, limit: event.dateRangeLimit, type: event.dateRangeType });
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
        console.log('📍 Applied rolling/indefinite range:', { maxDate });
      }
    }

    console.log('✅ Final calculated date range:', { minDate, maxDate });
    return { minDate, maxDate };
  };

  // Helper function to format date for calendar
  const formatDateForCalendar = (date: Date) => {
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      console.log('📅 Formatting date:', date, 'to:', formatted);
      return formatted;
    } catch (error) {
      console.error('❌ Error formatting date:', error, date);
      return null;
    }
  };

  const { minDate, maxDate } = getAvailableDateRange();

  // Enhanced debug logging
  console.log('🚀 EVENT PAGE DEBUG INFO:');
  console.log('==========================================');
  console.log('🌍 User timezone:', userTimezone);
  console.log('📊 Event data (converted to local):', {
    id: event?.id,
    title: event?.title,
    bookingStartDate: event?.bookingStartDate,
    bookingEndDate: event?.bookingEndDate,
    bookingWindowType: event?.bookingWindowType,
    minimumNotice: event?.minimumNotice,
    noticeType: event?.noticeType,
    dateRangeLimit: event?.dateRangeLimit,
    dateRangeType: event?.dateRangeType,
  });
  console.log('📅 Calculated date range (local):', { minDate, maxDate });
  console.log('📅 Parsed dates for calendar:', {
    minValue: minDate ? parseDate(minDate.toISOString().split('T')[0]) : today(userTimezone),
    maxValue: maxDate ? parseDate(maxDate.toISOString().split('T')[0]) : undefined
  });
  console.log('==========================================');

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
                      console.log('🗓️ Attempting to parse minDate:', formatted);
                      const parsed = parseDate(formatted);
                      console.log('✅ Parsed minDate result:', parsed);
                      return parsed || today(userTimezone);
                    } catch (error) {
                      console.error('❌ Error parsing minDate:', error);
                      return today(userTimezone);
                    }
                  })() : today(userTimezone)
                }
                maxValue={
                  maxDate ? (() => {
                    try {
                      const formatted = formatDateForCalendar(maxDate);
                      console.log('🗓️ Attempting to parse maxDate:', formatted);
                      const parsed = parseDate(formatted);
                      console.log('✅ Parsed maxDate result:', parsed);
                      return parsed;
                    } catch (error) {
                      console.error('❌ Error parsing maxDate:', error);
                      return undefined;
                    }
                  })() : undefined
                }
                isDateUnavailable={(date) => {
                  const dateObj = new Date(date.toString());
                  dateObj.setHours(0, 0, 0, 0);
                  
                  const compareMinDate = minDate ? new Date(minDate) : null;
                  const compareMaxDate = maxDate ? new Date(maxDate) : null;
                  
                  if (compareMinDate) compareMinDate.setHours(0, 0, 0, 0);
                  if (compareMaxDate) compareMaxDate.setHours(0, 0, 0, 0);

                  const isUnavailable = (
                    (compareMinDate && dateObj < compareMinDate) ||
                    (compareMaxDate && dateObj > compareMaxDate)
                  );

                  // Debug log for date availability checking
                  if (dateObj.getDate() === new Date().getDate()) {
                    console.log('🔍 Checking date availability for:', dateObj, {
                      compareMinDate,
                      compareMaxDate,
                      isUnavailable
                    });
                  }

                  return isUnavailable;
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
