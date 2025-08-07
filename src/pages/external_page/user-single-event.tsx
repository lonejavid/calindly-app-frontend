// import { Fragment } from "react";
// import { useParams } from "react-router-dom";
// import { today } from "@internationalized/date";
// import { useQuery } from "@tanstack/react-query";
// import PageContainer from "./_components/page-container";
// import BookingCalendar from "./_components/booking-calendar";
// import BookingForm from "./_components/booking-form";
// import { useBookingState } from "@/hooks/use-booking-state";
// import EventDetails from "./_components/event-details";
// import { getSinglePublicEventBySlugQueryFn } from "@/lib/api";
// import { cn } from "@/lib/utils";
// import { ErrorAlert } from "@/components/ErrorAlert";
// import { Loader } from "@/components/loader";

// const UserSingleEventPage = () => {
//   const param = useParams();
//   const username = param.username as string;
//   const slug = param.slug as string;

//   const { next, timezone, selectedDate } = useBookingState();

//   const { data, isFetching, isLoading, isError, error } = useQuery({
//     queryKey: ["public_single_event"],
//     queryFn: () =>
//       getSinglePublicEventBySlugQueryFn({
//         username,
//         slug,
//       }),
//   });

//   const event = data?.event;
//   console.log("event deataislare ",event);

//   return (
//     <PageContainer
//       isLoading={isLoading}
//       className={cn(
//         `!min-w-auto sm:!w-auto`,
//         isFetching || isError ? "sm:!min-w-[72%]" : "",
//         selectedDate && "sm:!w-[98%]"
//       )}
//     >
//       {/* {Error Alert } */}
//       <ErrorAlert isError={isError} error={error} />

//       {isFetching || isError ? (
//         <div className="flex items-center justify-center min-h-[15vh]">
//           <Loader size="lg" color="black" />
//         </div>
//       ) : (
//         event && (
//           <div className="w-full flex flex-col lg:flex-row items-stretch justify-stretch p-0 px-1">
//             {/* {Event Details} */}
//             <EventDetails
//               eventTitle={event?.title}
//               description={event?.description}
//               user={event?.user}
//               eventLocationType={event?.locationType}
//               username={username || ""}
//               duration={event?.duration}
//             />
//             {/* {Calendar & Booking form} */}
//             {/* {Calendar & Booking form} */}
//             <div className="min-w-sm max-w-3xl flex-shrink-0 flex-1">
//               {next ? (
//                 <Fragment>
                 
//                  <BookingForm event={event ?? undefined} />

//                 </Fragment>
//               ) : (
//                 <Fragment>
//                   {/* {Booking Calendar} */}
//                   <BookingCalendar
//                     eventId={event.id}
//                     minValue={today(timezone)}
//                     defaultValue={today(timezone)}
//                   />
//                 </Fragment>
//               )}
//             </div>
//           </div>
//         )
//       )}
//     </PageContainer>
//   );
// };

// export default UserSingleEventPage;

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { parseDate, today } from '@internationalized/date';
import { PageContainer, Loader, ErrorAlert } from '@/components';
import { EventDetails, BookingCalendar, BookingForm } from '@/features/booking';
import { cn } from '@/lib/utils';
import { useBookingState } from '@/stores/useBookingStore';

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

  const getAvailableDateRange = () => {
    if (!event) return { minDate: null, maxDate: null };

    const now = new Date();
    let minDate = now;
    let maxDate: Date | null = null;

    // Apply minimum notice period
    if (event.minimumNotice && event.noticeType) {
      minDate = new Date(now);
      if (event.noticeType === 'hours') {
        minDate.setHours(minDate.getHours() + event.minimumNotice);
      } else {
        minDate.setDate(minDate.getDate() + event.minimumNotice);
      }
    }

    // Apply booking window constraints
    if (event.bookingWindowType === 'fixed') {
      if (event.bookingStartDate) {
        const startDate = new Date(event.bookingStartDate);
        minDate = new Date(Math.max(minDate.getTime(), startDate.getTime()));
      }

      if (event.bookingEndDate) {
        maxDate = new Date(event.bookingEndDate);
      } else if (event.dateRangeLimit && event.dateRangeType) {
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
        {/* Event Details Section */}
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

        {/* Booking Section */}
        <div className="min-w-sm max-w-3xl flex-shrink-0 flex-1">
          {next ? (
            <BookingForm event={event} />
          ) : (
            <>
              <BookingCalendar
                eventId={event.id}
                minValue={
                  minDate
                    ? parseDate(minDate.toISOString().split('T')[0])
                    : today(timezone)
                }
                maxValue={
                  maxDate
                    ? parseDate(maxDate.toISOString().split('T')[0])
                    : undefined
                }
                isDateUnavailable={(date) => {
                  const dateObj = new Date(date.toString());
                  return (
                    (minDate && dateObj < minDate) ||
                    (maxDate && dateObj > maxDate) ||
                    (event.bookingStartDate &&
                      dateObj < new Date(event.bookingStartDate))
                  );
                }}
              />

              {/* Booking Window Information */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  Booking Availability
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>
                    <span className="font-medium">Earliest booking:</span>{' '}
                    {minDate
                      ? minDate.toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'Available immediately'}
                  </p>
                  <p>
                    <span className="font-medium">Latest booking:</span>{' '}
                    {maxDate
                      ? maxDate.toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'No end date'}
                  </p>
                  {event.minimumNotice > 0 && (
                    <p>
                      <span className="font-medium">Notice required:</span>{' '}
                      {event.minimumNotice} {event.noticeType}
                    </p>
                  )}
                  {event.bookingWindowType === 'fixed' && (
                    <p className="text-blue-800 font-medium">
                      Fixed booking window
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default UserSingleEventPage;