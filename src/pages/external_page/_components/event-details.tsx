// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
// import { locationOptions } from "@/lib/types";
// import { useBookingState } from "@/hooks/use-booking-state";
// import { formatSelectedSlot } from "@/lib/helper";
// import { UserType } from "@/types/api.type";

// const EventDetails = (props: {
//   eventTitle: string;
//   description: string;
//   user?: UserType;
//   username: string;
//   duration: number;
//   eventLocationType: string;
// }) => {
//   const {
//     eventTitle,
//     description,
//     duration,
//     username,
//     user,
//     eventLocationType,
//   } = props;

//   const navigate = useNavigate();
//   const { timezone, hourType, next, isSuccess, selectedSlot, handleBack } =
//     useBookingState();

//   const handleClick = () => {
//     if (isSuccess) {
//       navigate(`/${username}`);
//     }
//     if (next) {
//       handleBack();
//       return;
//     }
//     navigate(`/${username}`);
//   };

//   const locationOption = locationOptions.find(
//     (option) => option.value === eventLocationType
//   );

//   return (
//     <div
//       className="lg:w-[350px] flex-shrink-0 border-b border-r-0 lg:border-r md:border-b
//          border-[rgba(26,26,26,0.1)] lg:min-h-[550px]"
//     >
//       <div
//         className="relative flex flex-row  items-start justify-start 
//           md:justify-center md:flex-col z-10 p-6"
//       >
//         <button
//           type="button"
//           onClick={handleClick}
//           className="flex justify-center items-center cursor-pointer w-[43px] h-[43px]
//                border border-[rgba(26,26,26,0.1)] rounded-full 
//                bg-clip-padding
//                text-[rgb(0,105,255)] text-[24px]"
//         >
//           <ArrowLeft />
//         </button>

//         <div
//           className="flex flex-1 flex-col justify-start text-center
//              md:justify-center md:text-left"
//         >
//           <div
//             className="text-muted-foreground capitalize mt-4 text-base 
//             font-semibold"
//           >
//             {user?.name}
//           </div>
//           <h1 className="font-bold text-2xl my-2 mb-1 leading-[32px] text-[#0a2540]">
//             {eventTitle}
//           </h1>
//           <p className="font-normal text-base mb-3">{description}</p>

//           <div className="space-y-2 w-full max-w-52 m-auto md:m-0 font-medium mt-1 text-[#3c3e44]">
//             {/* {Meeting Date and time} */}

//             {next && (
//               <div className="flex justify-start text-[15px] gap-2 items-start">
//                 <CalendarIcon className="w-4 h-4 shrink-0 mt-1" />
//                 <span className="font-medium">
//                   {selectedSlot
//                     ? formatSelectedSlot(
//                         selectedSlot,
//                         duration,
//                         timezone,
//                         hourType
//                       )
//                     : "No slot selected"}
//                 </span>
//               </div>
//             )}

//             {duration && (
//               <div className="flex justify-start text-[15px] gap-2 items-center">
//                 <Clock className="w-4 h-4" />
//                 <span className="font-medium">{duration} Minutes</span>
//               </div>
//             )}

//             <div className="flex items-center mr-6">
//               {locationOption && (
//                 <>
//                   <img
//                     src={locationOption?.logo as string}
//                     alt={locationOption?.label}
//                     className="w-5 h-5 mr-2"
//                   />
//                   <span className="mt-1">{locationOption?.label}</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;


import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { locationOptions } from "@/lib/types";
import { useBookingState } from "@/hooks/use-booking-state";
import { formatSelectedSlot } from "@/lib/helper";
import { UserType } from "@/types/api.type";
import { format } from "date-fns";

const EventDetails = (props: {
  eventTitle: string;
  description: string;
  user?: UserType;
  username: string;
  duration: number;
  eventLocationType: string;
}) => {
  const {
    eventTitle,
    description,
    duration,
    username,
    user,
    eventLocationType,
  } = props;

  const navigate = useNavigate();
  const { 
    timezone, 
    hourType, 
    next, 
    isSuccess, 
    selectedSlot, 
    selectedDate, 
    handleBack 
  } = useBookingState();

  const handleClick = () => {
    if (isSuccess) {
      navigate(`/${username}`);
    }
    if (next) {
      handleBack();
      return;
    }
    navigate(`/${username}`);
  };

  // Helper function to safely format the selected date without timezone issues
  const getFormattedDateAndSlot = () => {
    if (!selectedDate || !selectedSlot) return "No slot selected";
    
    try {
      // Create date using CalendarDate components directly to avoid timezone conversion
      const displayDate = new Date(
        selectedDate.year, 
        selectedDate.month - 1, 
        selectedDate.day,
        12, // Use noon to avoid any DST issues
        0, 
        0
      );
      
      // Format the date part
      const formattedDate = format(displayDate, "EEEE, MMMM d, yyyy");
      
      // For the time part, we can still use the formatSelectedSlot function
      // but we need to pass the correct date
      const timeFormatted = formatSelectedSlot(
        selectedSlot,
        duration,
        timezone,
        hourType,
        selectedDate // Pass the CalendarDate to avoid internal conversion issues
      );
      
      // If formatSelectedSlot returns the full date+time, extract just the time part
      // Otherwise combine date and time
      if (timeFormatted.includes(',')) {
        // If it already includes date, extract the time part after the comma
        const timePart = timeFormatted.split(',').slice(1).join(',').trim();
        return `${timePart}, ${formattedDate}`;
      } else {
        // If it's just time, combine with our correctly formatted date
        return `${timeFormatted}, ${formattedDate}`;
      }
      
    } catch (error) {
      console.error('Error formatting date and slot:', error);
      return `${selectedSlot} - Error formatting date`;
    }
  };

  // Alternative simpler approach - just format the date correctly
  const getSimpleFormattedSlot = () => {
    if (!selectedDate || !selectedSlot) return "No slot selected";
    
    try {
      // Create date using CalendarDate components directly
      const displayDate = new Date(
        selectedDate.year, 
        selectedDate.month - 1, 
        selectedDate.day
      );
      
      const formattedDate = format(displayDate, "EEEE, MMMM d, yyyy");
      
      // Simple combination of slot time and correctly formatted date
      return `${selectedSlot}, ${formattedDate}`;
      
    } catch (error) {
      console.error('Error in simple format:', error);
      return selectedSlot || "No slot selected";
    }
  };

  const locationOption = locationOptions.find(
    (option) => option.value === eventLocationType
  );

  // Debug logging
  console.log("=== EventDetails Debug ===");
  console.log("selectedDate:", selectedDate?.toString());
  console.log("selectedSlot:", selectedSlot);
  console.log("next:", next);
  console.log("=========================");

  return (
    <div
      className="lg:w-[350px] flex-shrink-0 border-b border-r-0 lg:border-r md:border-b
         border-[rgba(26,26,26,0.1)] lg:min-h-[550px]"
    >
      <div
        className="relative flex flex-row  items-start justify-start 
          md:justify-center md:flex-col z-10 p-6"
      >
        <button
          type="button"
          onClick={handleClick}
          className="flex justify-center items-center cursor-pointer w-[43px] h-[43px]
               border border-[rgba(26,26,26,0.1)] rounded-full 
               bg-clip-padding
               text-[rgb(0,105,255)] text-[24px]"
        >
          <ArrowLeft />
        </button>

        <div
          className="flex flex-1 flex-col justify-start text-center
             md:justify-center md:text-left"
        >
          <div
            className="text-muted-foreground capitalize mt-4 text-base 
            font-semibold"
          >
            {user?.name}
          </div>
          <h1 className="font-bold text-2xl my-2 mb-1 leading-[32px] text-[#0a2540]">
            {eventTitle}
          </h1>
          <p className="font-normal text-base mb-3">{description}</p>

          <div className="space-y-2 w-full max-w-52 m-auto md:m-0 font-medium mt-1 text-[#3c3e44]">
            {/* Meeting Date and time - FIXED */}
            {next && (
              <div className="flex justify-start text-[15px] gap-2 items-start">
                <CalendarIcon className="w-4 h-4 shrink-0 mt-1" />
                <span className="font-medium">
                  {getSimpleFormattedSlot()}
                </span>
              </div>
            )}

            {duration && (
              <div className="flex justify-start text-[15px] gap-2 items-center">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{duration} Minutes</span>
              </div>
            )}

            <div className="flex items-center mr-6">
              {locationOption && (
                <>
                  <img
                    src={locationOption?.logo as string}
                    alt={locationOption?.label}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="mt-1">{locationOption?.label}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;