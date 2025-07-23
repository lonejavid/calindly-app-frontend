import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, Calendar, User, Sparkles, Star, CheckCircle,  BookOpen, Zap, Target, Award } from "lucide-react";
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
      {/* Enhanced Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 py-8 md:py-12 lg:py-16 px-4 sm:px-6">
        {/* Error Alert */}
        <ErrorAlert isError={isError} error={error} />

        {isFetching ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader size="lg" color="white" />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* THE ULTIMATE PROFESSIONAL BOOKING CARD */}
            {events.length > 0 ? (
              <div className="relative">
                {/* Main Card Container */}
                <div className="bg-gradient-to-br from-slate-900/98 via-purple-900/95 to-indigo-900/98 backdrop-blur-3xl rounded-3xl md:rounded-4xl p-8 md:p-12 lg:p-16 border border-purple-400/60 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.01] ring-2 ring-purple-300/30 ring-offset-2 ring-offset-transparent relative overflow-hidden group">
                  
                  {/* Dynamic background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-violet-500/10 rounded-3xl md:rounded-4xl"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10">
                    
                    {/* Header Section - User Profile & Branding */}
                    <div className="text-center mb-10 md:mb-12 lg:mb-16">
                      {/* Premium Badge */}
                      <div className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-red-500/90 backdrop-blur-xl rounded-full mb-6 md:mb-8 border border-yellow-400/70 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 ring-2 ring-yellow-300/50">
                        <Award className="w-5 h-5 md:w-6 md:h-6 mr-3 text-white animate-pulse drop-shadow-lg" />
                        <span className="text-sm md:text-base lg:text-lg font-black text-white tracking-wide drop-shadow-lg">✨ PREMIUM CONSULTATION</span>
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 ml-3 text-white animate-spin drop-shadow-lg" style={{animationDuration: '3s'}} />
                      </div>

                      {/* Professional Avatar */}
                      <div className="flex items-center justify-center mb-6 md:mb-8">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-purple-300/40 ring-offset-4 ring-offset-transparent">
                            <User className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white drop-shadow-2xl" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full border-3 md:border-4 border-white flex items-center justify-center shadow-xl animate-pulse">
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                          <div className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 bg-yellow-500 rounded-full border-3 md:border-4 border-white flex items-center justify-center shadow-xl">
                            <Star className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Professional Title */}
                      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 text-white capitalize tracking-tight drop-shadow-2xl bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                        {user?.name || 'Expert Professional'}
                      </h1>
                      
                      {/* Professional Tagline */}
                      <p className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-bold max-w-3xl mx-auto drop-shadow-xl mb-6 md:mb-8">
                        🚀 Transform Your Success • Expert Guidance • Proven Results
                      </p>

                      {/* Stats Bar */}
                      <div className="flex items-center justify-center space-x-6 md:space-x-8 lg:space-x-12 mb-8 md:mb-10">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-300 drop-shadow-lg">{events.length}</div>
                          <div className="text-xs md:text-sm text-purple-200 font-semibold">Session Types</div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-black text-pink-300 drop-shadow-lg">⚡</div>
                          <div className="text-xs md:text-sm text-pink-200 font-semibold">Instant Booking</div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-black text-blue-300 drop-shadow-lg">🎯</div>
                          <div className="text-xs md:text-sm text-blue-200 font-semibold">Expert Level</div>
                        </div>
                      </div>
                    </div>

                    {/* Meeting Options Showcase */}
                    <div className="mb-10 md:mb-12 lg:mb-16">
                      <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                          🎯 Available Consultation Sessions
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-200 font-bold max-w-3xl mx-auto drop-shadow-xl">
                          Choose your preferred session format • All sessions include expert guidance and actionable insights
                        </p>
                      </div>

                      {/* Sessions Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                        {events.slice(0, 6).map((event, index) => (
                          <div key={event.id || index} className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-purple-400/40 hover:border-purple-300/70 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
                            <div className="flex items-start space-x-3 md:space-x-4">
                              <div className="p-2 md:p-3 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl border border-purple-300/60 shadow-lg flex-shrink-0">
                                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-lg" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm md:text-base lg:text-lg font-black text-white mb-1 md:mb-2 capitalize truncate" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
                                  {event.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium mb-2 md:mb-3 line-clamp-2">
                                  {event.description || "Professional consultation designed for your success"}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-300 flex-shrink-0" />
                                  <span className="text-xs md:text-sm font-bold text-blue-200">{event.duration} min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {events.length > 6 && (
                        <div className="text-center">
                          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800/80 to-purple-800/80 backdrop-blur-lg rounded-full border border-purple-400/50 shadow-lg">
                            <span className="text-sm font-bold text-purple-200">+{events.length - 6} more session types available</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ultimate Call to Action */}
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-lg rounded-3xl p-6 md:p-8 lg:p-10 border border-purple-400/60 shadow-2xl mb-6 md:mb-8">
                        <div className="flex items-center justify-center mb-4 md:mb-6">
                          <Target className="w-8 h-8 md:w-10 md:h-10 text-purple-300 mr-3 md:mr-4 animate-pulse" />
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white">Ready to Get Started?</h3>
                          <Zap className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 ml-3 md:ml-4 animate-bounce" />
                        </div>
                        
                        <p className="text-sm md:text-base lg:text-lg text-gray-200 font-bold mb-6 md:mb-8 max-w-2xl mx-auto">
                          🎉 Book your consultation now and take the first step towards achieving your goals. Expert guidance awaits!
                        </p>

                        <Link
                          to={`/${username}/${events[0]?.slug}`}
                          className="group inline-flex items-center px-10 py-5 md:px-12 md:py-6 lg:px-14 lg:py-7 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 rounded-2xl md:rounded-3xl font-black text-xl md:text-2xl lg:text-3xl text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 border-2 border-purple-300/60 hover:border-purple-200/80 relative overflow-hidden"
                          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}
                        >
                          {/* Button glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl"></div>
                          
                          <BookOpen className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-4 md:mr-5 lg:mr-6 drop-shadow-lg group-hover:animate-pulse relative z-10" />
                          <span className="drop-shadow-lg relative z-10">BOOK YOUR SESSION NOW</span>
                          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-4 md:ml-5 lg:ml-6 drop-shadow-lg group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                        </Link>
                        
                        <div className="flex items-center justify-center space-x-6 md:space-x-8 mt-6 md:mt-8">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                            <span className="text-xs md:text-sm text-green-300 font-semibold">Instant Confirmation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                            <span className="text-xs md:text-sm text-yellow-300 font-semibold">No Waiting Time</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                            <span className="text-xs md:text-sm text-purple-300 font-semibold">Expert Level</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer branding */}
                      <div className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-xl rounded-full border border-purple-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-1 ring-purple-300/30">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-3 text-purple-300 animate-pulse" />
                        <span className="text-sm md:text-base text-white font-black drop-shadow-lg">
                          Powered by <span className="text-purple-300 font-black tracking-wide drop-shadow-lg">Schedley</span> • Premium Booking Platform
                        </span>
                        <Star className="w-4 h-4 md:w-5 md:h-5 ml-3 text-yellow-400 animate-spin" style={{animationDuration: '4s'}} />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced card border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-violet-500/20 rounded-3xl md:rounded-4xl opacity-50 blur-xl"></div>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 md:py-20 lg:py-24">
                <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-3xl p-12 md:p-16 lg:p-20 border border-purple-400/50 max-w-2xl mx-auto shadow-2xl ring-1 ring-purple-300/20">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-600/80 to-gray-700/80 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl">
                    <Calendar className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 text-white drop-shadow-2xl">
                    🚧 Setting Up Something Amazing
                  </h3>
                  <p className="text-lg md:text-xl text-gray-100 font-bold drop-shadow-xl">
                    This professional is preparing their consultation services. Check back soon for premium booking options!
                  </p>
                </div>
              </div>
            )}
          </div>
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