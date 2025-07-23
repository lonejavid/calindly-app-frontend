import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, Calendar, User, Sparkles, Star, CheckCircle, BookOpen } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950">
        <Loader size="lg" color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6 md:p-8">
        {/* Error Alert */}
        <ErrorAlert isError={isError} error={error} />

        {isFetching ? (
          <div className="flex items-center justify-center">
            <Loader size="lg" color="white" />
          </div>
        ) : (
          <>
            {events.length > 0 ? (
              /* THE CENTRAL PROFESSIONAL CARD */
              <div className="w-full max-w-2xl">
                <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-3xl rounded-3xl p-8 md:p-12 border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                  
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    
                    {/* Professional Header */}
                    <div className="mb-8">
                      {/* Avatar */}
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-xl ring-4 ring-purple-300/30">
                            <User className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Professional Name */}
                      <h1 className="text-3xl md:text-4xl font-black mb-3 text-white capitalize tracking-tight drop-shadow-2xl">
                        {user?.name || 'Professional'}
                      </h1>
                      
                      {/* Professional Tagline */}
                      <p className="text-lg md:text-xl text-gray-200 font-semibold mb-6 max-w-lg mx-auto">
                        Expert consultation • Personalized guidance • Proven results
                      </p>

                      {/* Premium Badge */}
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-lg rounded-full border border-purple-300/50 shadow-lg">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-sm font-bold text-white">Premium Consultation Available</span>
                        <Sparkles className="w-4 h-4 ml-2 text-yellow-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Event Details Section */}
                    <div className="mb-10">
                      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 mb-6">
                        <div className="flex items-center justify-center mb-4">
                          <Calendar className="w-6 h-6 text-purple-300 mr-3" />
                          <h2 className="text-xl md:text-2xl font-black text-white">Available Sessions</h2>
                        </div>
                        
                        {/* Event List */}
                        <div className="space-y-4">
                          {events.slice(0, 3).map((event, index) => (
                            <div key={event.id || index} className="text-left">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-bold text-white capitalize flex-1">
                                  {event.title}
                                </h3>
                                <div className="flex items-center ml-4 flex-shrink-0">
                                  <Clock className="w-4 h-4 text-blue-300 mr-1" />
                                  <span className="text-sm font-semibold text-blue-200">{event.duration} min</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {event.description || "Professional consultation session designed to help you achieve your goals with expert guidance and actionable insights."}
                              </p>
                              {index < events.slice(0, 3).length - 1 && (
                                <div className="mt-3 border-b border-purple-400/20"></div>
                              )}
                            </div>
                          ))}
                          
                          {events.length > 3 && (
                            <div className="text-center pt-2">
                              <span className="text-sm text-purple-300 font-semibold">
                                +{events.length - 3} more session types available
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div>
                      <p className="text-base text-gray-200 font-medium mb-6">
                        Ready to get started? Book your consultation now and take the next step forward.
                      </p>
                      
                      <Link
                        to={`/${username}/${events[0]?.slug}`}
                        className="group inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 rounded-2xl font-black text-lg md:text-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-300/50"
                      >
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-3 drop-shadow-lg" />
                        <span className="drop-shadow-lg">Book Your Session</span>
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-3 drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                      
                      <div className="flex items-center justify-center space-x-6 mt-6">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-300 font-medium">Instant Booking</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-yellow-300 font-medium">Expert Level</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-purple-300 font-medium">No Waiting</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card enhancement glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-3xl opacity-100 pointer-events-none"></div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-xl rounded-full border border-purple-400/40 shadow-lg">
                    <span className="text-xs text-white font-semibold">
                      Powered by <span className="text-purple-300 font-bold">Schedley</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="w-full max-w-lg">
                <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-3xl p-10 border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600/80 to-gray-700/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Calendar className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-white drop-shadow-2xl">
                    Setting Up Services
                  </h3>
                  <p className="text-base text-gray-100 font-medium">
                    This professional is preparing their consultation services. Please check back soon!
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;
 


// import { Link, useParams } from "react-router-dom";
// import { ArrowRight, Clock, Calendar, User, Sparkles, Star, CheckCircle, Users, BookOpen } from "lucide-react";
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

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950">
//         <Loader size="lg" color="white" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white overflow-hidden relative">
//       {/* Background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
//         <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-40 animate-ping"></div>
//         <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-ping" style={{animationDelay: '1s'}}></div>
//         <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-ping" style={{animationDelay: '3s'}}></div>
//       </div>

//       <div className="fixed inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>

//       <div className="relative z-10 py-8 md:py-12 lg:py-16 px-4 sm:px-6">
//         {/* Error Alert */}
//         <ErrorAlert isError={isError} error={error} />

//         {isFetching ? (
//           <div className="flex items-center justify-center min-h-[50vh]">
//             <Loader size="lg" color="white" />
//           </div>
//         ) : (
//           <div className="max-w-4xl mx-auto">
//             {/* Header Section */}
//             <div className="text-center mb-12 md:mb-16 lg:mb-20">
//               {/* Top badge */}
//               <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-xl rounded-full mb-6 md:mb-8 border border-purple-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-1 ring-purple-300/30">
//                 <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-yellow-400 animate-pulse drop-shadow-lg" />
//                 <span className="text-sm md:text-base font-black text-white tracking-wide drop-shadow-lg">✨ Schedule Your Meeting</span>
//                 <Star className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-3 text-yellow-400 drop-shadow-lg" />
//               </div>

//               {/* User profile card */}
//               <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-purple-400/40 max-w-md mx-auto mb-8 md:mb-10 lg:mb-12 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] ring-1 ring-purple-300/20">
//                 <div className="flex items-center justify-center mb-4 md:mb-6">
//                   <div className="relative">
//                     <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-purple-300/30 ring-offset-2 ring-offset-transparent">
//                       <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg" />
//                     </div>
//                     <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 md:border-3 border-white flex items-center justify-center shadow-lg">
//                       <CheckCircle className="w-2 h-2 md:w-3 md:h-3 text-white" />
//                     </div>
//                   </div>
//                 </div>
                
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3 lg:mb-4 text-white capitalize tracking-tight drop-shadow-2xl text-shadow-lg">
//                   {user?.name || 'Professional'}
//                 </h1>
                
//                 <p className="text-sm md:text-base lg:text-lg text-gray-100 leading-relaxed font-bold max-w-md mx-auto drop-shadow-xl">
//                   🚀 Ready to connect? Choose your preferred meeting type below.
//                 </p>

//                 {/* User stats/info if available */}
//                 {user && (
//                   <div className="flex items-center justify-center space-x-4 mt-4 md:mt-6">
//                     <div className="flex items-center space-x-1">
//                       <Users className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
//                       <span className="text-xs md:text-sm text-purple-200 font-semibold">{events.length} Meeting Type{events.length !== 1 ? 's' : ''} Available</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Section heading */}
//               <div className="space-y-2 md:space-y-3">
//                 <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white drop-shadow-2xl">
//                   📅 Book Your Meeting
//                 </h2>
//                 <p className="text-sm md:text-base lg:text-lg text-gray-200 font-bold max-w-2xl mx-auto drop-shadow-xl">
//                   {events.length > 0 
//                     ? `Choose from ${events.length} available session${events.length !== 1 ? 's' : ''} designed to help you succeed.`
//                     : "Setting up meeting options for you."
//                   }
//                 </p>
//               </div>
//             </div>

//             {/* Single Event Card - Enhanced */}
//             {events.length > 0 && (
//               <div className="max-w-2xl mx-auto mb-12 md:mb-16">
//                 <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 border border-purple-400/50 shadow-2xl ring-1 ring-purple-300/20 relative overflow-hidden">
                  
//                   {/* Background glow */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl md:rounded-3xl"></div>
                  
//                   {/* Content */}
//                   <div className="relative z-10">
//                     {/* Header with icon */}
//                     <div className="flex items-center mb-6 md:mb-8">
//                       <div className="p-4 md:p-5 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl md:rounded-2xl border border-purple-300/60 shadow-xl mr-4 md:mr-6">
//                         <Calendar className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white drop-shadow-lg" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white drop-shadow-2xl mb-1" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
//                           Available Sessions
//                         </h3>
//                         <p className="text-sm md:text-base text-purple-200 font-semibold">
//                           {events.length} meeting option{events.length !== 1 ? 's' : ''} to choose from
//                         </p>
//                       </div>
//                     </div>

//                     {/* Events List */}
//                     <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
//                       {events.map((event, index) => (
//                         <div key={event.id || index} className="bg-slate-800/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-400/30 hover:border-purple-300/60 transition-all duration-300">
//                           <div className="flex items-start justify-between mb-3 md:mb-4">
//                             <div className="flex-1">
//                               <h4 className="text-lg md:text-xl font-black text-white mb-2 capitalize" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
//                                 {event.title}
//                               </h4>
//                               <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium mb-3" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
//                                 {event.description || "Professional meeting session designed to help you achieve your goals."}
//                               </p>
//                               <div className="flex items-center space-x-4">
//                                 <div className="flex items-center space-x-2">
//                                   <Clock className="w-4 h-4 text-blue-300" />
//                                   <span className="text-sm font-semibold text-blue-200">{event.duration} minutes</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Call to Action */}
//                     <div className="text-center">
//                       <Link
//                         to={`/${username}/${events[0]?.slug}`}
//                         className="group inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 rounded-xl md:rounded-2xl font-black text-lg md:text-xl text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-purple-300/50 hover:border-purple-200/70"
//                       >
//                         <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4 drop-shadow-lg group-hover:animate-pulse" />
//                         <span className="drop-shadow-lg">Book Your Meeting</span>
//                         <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-3 md:ml-4 drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300" />
//                       </Link>
                      
//                       <p className="text-xs md:text-sm text-gray-300 mt-4 md:mt-6 font-medium">
//                         ⚡ Instant booking • No waiting • Professional service
//                       </p>
//                     </div>
//                   </div>

//                   {/* Enhanced hover glow */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl md:rounded-3xl opacity-100 pointer-events-none"></div>
//                 </div>
//               </div>
//             )}

//             {/* Empty State */}
//             {events.length === 0 && (
//               <div className="text-center py-12 md:py-16 lg:py-20">
//                 <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 border border-purple-400/50 max-w-md mx-auto shadow-2xl ring-1 ring-purple-300/20">
//                   <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-600/80 to-gray-700/80 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
//                     <Calendar className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
//                   </div>
//                   <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 lg:mb-4 text-white drop-shadow-2xl">
//                     🚧 No Events Yet
//                   </h3>
//                   <p className="text-sm md:text-base lg:text-lg text-gray-100 font-bold drop-shadow-xl">
//                     This user is setting up their calendar. Check back soon!
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Footer */}
//             <div className="text-center">
//               <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-xl rounded-full border border-purple-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-1 ring-purple-300/30">
//                 <span className="text-xs md:text-sm text-white font-black drop-shadow-lg">
//                   ⚡ Powered by <span className="text-purple-300 font-black tracking-wide drop-shadow-lg">Schedley</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserEventsPage;