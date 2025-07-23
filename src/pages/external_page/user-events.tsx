import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, Calendar, User, Sparkles } from "lucide-react";
import PageContainer from "./_components/page-container";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicEventQueryFn } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";

const UserEventsPage = () => {
  const param = useParams();
  const username = param.username as string;

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["public_events"],
    queryFn: () => getAllPublicEventQueryFn(username),
  });

  const events = data?.events || [];
  const user = data?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <PageContainer isLoading={isLoading}>
        {/* Error Alert */}
        <ErrorAlert isError={isError} error={error} />

        {isFetching || isError ? (
          <div className="flex items-center justify-center min-h-[50vh] relative z-10">
            <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-xl">
              <Loader size="lg" color="white" />
            </div>
          </div>
        ) : (
          <div className="relative z-10 py-8 sm:py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/30 shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">Book a Meeting</span>
                </div>

                <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 max-w-md mx-auto mb-8 shadow-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-white drop-shadow-lg capitalize">
                    {user?.name || 'Professional'}
                  </h1>
                  
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                    Welcome to my scheduling page. Please select an event below 
                    to book a meeting that works for both of us.
                  </p>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white drop-shadow-md">
                  Available Meeting Types
                </h2>
                <p className="text-gray-300 font-medium">Choose the type of meeting that best fits your needs</p>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {events?.map((event, index) => (
                  <Link
                    key={index}
                    to={`/${username}/${event.slug}`}
                    className="group relative"
                  >
                    <div className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl min-h-[180px] flex flex-col justify-between shadow-xl">
                      {/* Event Content */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-xl border border-purple-400/40 shadow-lg">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 group-hover:text-purple-300 transition-all duration-300 group-hover:translate-x-1" />
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300 capitalize drop-shadow-sm">
                          {event.title}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed line-clamp-2 mb-4 font-medium">
                          {event.description || "Professional meeting - let's discuss your needs and how I can help you achieve your goals."}
                        </p>
                      </div>

                      {/* Duration Badge */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full border border-blue-400/40 shadow-lg">
                          <Clock className="w-4 h-4 mr-2 text-blue-200" />
                          <span className="text-sm font-semibold text-blue-100">
                            {event.duration} mins
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-semibold">
                          Click to book →
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty State */}
              {events.length === 0 && !isFetching && (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/30 max-w-md mx-auto shadow-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-500/30 to-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Calendar className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-sm">
                      No Events Available
                    </h3>
                    <p className="text-gray-200 font-medium">
                      This user hasn't set up any bookable events yet.
                    </p>
                  </div>
                </div>
              )}

              {/* Footer Note */}
              <div className="text-center mt-12 sm:mt-16">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                  <span className="text-xs sm:text-sm text-gray-200 font-medium">
                    Powered by <span className="text-purple-300 font-bold">Schedley</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default UserEventsPage;




// import { Link, useParams } from "react-router-dom";
// import { ArrowRight, Clock } from "lucide-react";
// import PageContainer from "./_components/page-container";
// import { useQuery } from "@tanstack/react-query";
// import { getAllPublicEventQueryFn } from "@/lib/api";
// import { ErrorAlert } from "@/components/ErrorAlert";
// import { Loader } from "@/components/loader";

// const UserEventsPage = () => {
//   const param = useParams();
//   const username = param.username as string;

//   const { data, isFetching, isLoading, isError, error } = useQuery({
//     queryKey: ["public_events"],
//     queryFn: () => getAllPublicEventQueryFn(username),
//   });

//   const events = data?.events || [];
//   const user = data?.user;

//   return (
//     <PageContainer isLoading={isLoading}>
//       {/* {Error Alert } */}
//       <ErrorAlert isError={isError} error={error} />

//       {isFetching || isError ? (
//         <div className="flex items-center justify-center min-h-[15vh]">
//           <Loader size="lg" color="black" />
//         </div>
//       ) : (
//         <>
//           {/* {Booking Content } */}
//           <div className="py-5">
//             <div className="w-full p-[25px_15px]">
//               <div className="m-[0px_auto_20px] text-center max-w-xs flex flex-col items-center justify-center">
//                 <h1 className="text-lg font-semibold mb-3 capitalize">
//                   {user?.name}
//                 </h1>
//                 <p className="px-5 text-sm font-light text-[rgba(26,26,26,0.61)]">
//                   Welcome to my scheduling page. Please follow the instructions
//                   to add an event to my calendar.
//                 </p>
//               </div>

//               {/* {Events List} */}
//               <div className="md:max-w-[800px] w-full mx-auto flex flex-wrap">
//                 {events?.map((event, index) => (
//                   <Link
//                     key={index}
//                     to={`/${username}/${event.slug}`}
//                     className="group flex-[0_1_calc(100%-40px)] md:flex-[0_1_calc(50%-40px)] min-h-[150px] m-5 p-5 pr-1 border-t border-[rgba(26,26,26,0.1)] transition-all hover:!bg-[#e5efff] hover:shadow-xs"
//                   >
//                     <div className="flex flex-col">
//                       <h2 className="flex items-center justify-between text-lg font-semibold">
//                         <span className="flex-1 capitalize">{event.title}</span>
//                         <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                       </h2>
//                       <p className="text-sm capitalize text-gray-600 line-clamp-2 min-h-5">
//                         {event.description
//                           ? event.description
//                           : "No description available"}
//                       </p>
//                       <p
//                         className="inline-flex items-center mt-3 text-sm bg-[#d2e1f9] 
//                       px-2 py-1 max-w-24 whitespace-nowrap rounded-sm"
//                       >
//                         <Clock className="w-4 h-4 mr-2" />
//                         <span>{event.duration} mins</span>
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </PageContainer>
//   );
// };

// export default UserEventsPage;

// import { ArrowRight, Clock, Calendar, User, Sparkles } from "lucide-react";

// const UserEventsPage = () => {
//   // Mock data for demonstration
//   const user = { name: "John Smith" };
//   const events = [
//     {
//       title: "Strategy Consultation",
//       description: "A comprehensive discussion about your business goals and how we can work together to achieve them through strategic planning.",
//       duration: 30,
//       slug: "strategy-consultation"
//     },
//     {
//       title: "Technical Review",
//       description: "Deep dive into technical requirements, architecture decisions, and implementation strategies for your project.",
//       duration: 45,
//       slug: "technical-review"
//     },
//     {
//       title: "Quick Connect",
//       description: "Brief introductory call to understand your needs and explore potential collaboration opportunities.",
//       duration: 15,
//       slug: "quick-connect"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
//       </div>

//       <div className="relative z-10 py-8 sm:py-16 px-4 sm:px-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Header Section */}
//           <div className="text-center mb-12 sm:mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/30 shadow-lg">
//               <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
//               <span className="text-sm font-semibold text-white">Book a Meeting</span>
//             </div>

//             <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 max-w-md mx-auto mb-8 shadow-2xl">
//               <div className="flex items-center justify-center mb-4">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//                   <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                 </div>
//               </div>
              
//               <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-white drop-shadow-lg">
//                 {user?.name || 'Professional'}
//               </h1>
              
//               <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
//                 Welcome to my scheduling page. Please select an event below 
//                 to book a meeting that works for both of us.
//               </p>
//             </div>

//             <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white drop-shadow-md">
//               Available Meeting Types
//             </h2>
//             <p className="text-gray-300 font-medium">Choose the type of meeting that best fits your needs</p>
//           </div>

//           {/* Events Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
//             {events?.map((event, index) => (
//               <div
//                 key={index}
//                 className="group relative cursor-pointer"
//               >
//                 <div className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl min-h-[200px] flex flex-col justify-between shadow-xl">
//                   {/* Event Content */}
//                   <div>
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="p-3 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-xl border border-purple-400/40 shadow-lg">
//                         <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200" />
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 group-hover:text-purple-300 transition-all duration-300 group-hover:translate-x-1" />
//                     </div>

//                     <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300 capitalize drop-shadow-sm">
//                       {event.title}
//                     </h3>

//                     <p className="text-sm sm:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed mb-4 font-medium">
//                       {event.description || "Professional meeting - let's discuss your needs and how I can help you achieve your goals."}
//                     </p>
//                   </div>

//                   {/* Duration Badge */}
//                   <div className="flex items-center justify-between">
//                     <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full border border-blue-400/40 shadow-lg">
//                       <Clock className="w-4 h-4 mr-2 text-blue-200" />
//                       <span className="text-sm font-semibold text-blue-100">
//                         {event.duration} mins
//                       </span>
//                     </div>
                    
//                     <div className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-semibold">
//                       Click to book →
//                     </div>
//                   </div>

//                   {/* Hover Effect Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer Note */}
//           <div className="text-center mt-12 sm:mt-16">
//             <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
//               <span className="text-xs sm:text-sm text-gray-200 font-medium">
//                 Powered by <span className="text-purple-300 font-bold">Schedley</span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserEventsPage;